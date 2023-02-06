/**
 * Author: Patricia Naguit
 * Date: 2022-12-10
 *
 * Date         Modified By            Notes
 * 2022-12-10   Patricia Naguit        Initial File Creation
 */

/**
 * @NApiVersion 2.1
 * @NScriptType Suitelet
 */

define(['N/search'], (search) => {

    /**
     * Definition of the Suitelet script trigger point.
     *
     * @param {Object} context
     */
    const onRequest = (context) => {
        const { request, response } = context;

        if (context.request.method === 'GET') {
            const stItem = request.parameters['item'];
            const stLocation = request.parameters['itemlocation'];
            const stCustomer = request.parameters['customer'];

            if(stItem&&!stLocation&&!stCustomer){
                const objItem = getItemDetail(stItem);

                response.write(JSON.stringify({ item: objItem }))
            }
            if(stItem&&stLocation&&!stCustomer){
                const stQtyOnHand = getQtyOnHand(stItem,stLocation);

                response.write(JSON.stringify({ stQtyOnHand: stQtyOnHand }))
            }
            if(stItem&&stCustomer){
                const stQtyOnHand = getQtyOnHandFranchise(stItem,stCustomer);
                response.write(JSON.stringify({ stQtyOnHand: stQtyOnHand }))
            }
        }
    };

    const getItemDetail = (stItem) => {
        let objLookup = search.lookupFields({
            type: search.Type.ITEM,
            id: stItem,
            columns: ['itemid','salesdescription', 'cost', 'custitem_heyday_sku', 'custitemheyday_upccode']
        });
      
        objLookup['franchiseprice'] = getFranchisePrice(stItem);

        log.debug('objLookup', objLookup);

        return objLookup
    };

    const getQtyOnHand = (stItem,stLocation) => {
        var stQtyOnHand;
        var itemSearchObj = search.create({
            type: "item",
            filters:
            [
               ["internalid","anyof",stItem], 
               "AND", 
               ["inventorylocation","anyof",stLocation]
            ],
            columns:
            [
               search.createColumn({name: "locationquantityonhand", label: "Location On Hand"}),
            ]
         });
         itemSearchObj.run().each(function(result){
            stQtyOnHand = result.getValue({ name: 'locationquantityonhand' })
            return true;
         });
         return stQtyOnHand;
    };

    const getQtyOnHandFranchise  = (stItem,stCustomer) => {

        var qtyOnHand = 0;

        var IRLineSearch = search.create({
            type: "customrecord_cwgp_franchise_tranline",
            filters:
            [
               ["custrecord_cwgp_ftl_item","anyof",stItem], 
               "AND", 
               ["custrecord_cwgp_ftl_customer","anyof",stCustomer]
            ],
            columns:
            [
               search.createColumn({
                  name: "custrecord_cwgp_frl_quantity",
                  summary: "SUM",
                  label: "Quantity"
               })
            ]
         });
         IRLineSearch.run().each(function(result){
            // .run().each has a limit of 4,000 results
            
            var qtyIR = result.getValue({
                name: 'custrecord_cwgp_ftl_actualqty',
                summary: "SUM"
            });
            log.debug("qtyIR",qtyIR);
            if(!isNaN(qtyIR) && qtyIR != ''){
                qtyOnHand += parseFloat(qtyIR);
            }
            
            return true;
         });

         return qtyOnHand;

    };

    const getFranchisePrice  = (stItem) => {
        var franchisePrice = 0;

        var itemSearchObj = search.create({
            type: "item",
            filters:
            [
               ["internalidnumber","equalto",stItem], 
               "AND", 
               ["pricing.pricelevel","anyof","6"]
            ],
            columns:
            [
               search.createColumn({
                  name: "unitprice",
                  join: "pricing",
                  label: "Unit Price"
               })
            ]
         });
         var searchResultCount = itemSearchObj.runPaged().count;
         log.debug("itemSearchObj result count",searchResultCount);
         itemSearchObj.run().each(function(result){
            // .run().each has a limit of 4,000 results
            log.debug("result",result);
            franchisePrice = result.getValue({
                name: 'unitprice',
                join: 'pricing'
            });
            return true;
         });
        log.debug("franchisePrice",franchisePrice);
        return franchisePrice;
    };

    

    return { onRequest };
});
