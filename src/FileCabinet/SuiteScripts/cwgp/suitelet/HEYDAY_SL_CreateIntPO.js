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

            if(stItem&&!stLocation){
                const objItem = getItemDetail(stItem);

                response.write(JSON.stringify({ item: objItem }))
            }
            if(stItem&&stLocation){
                const stQtyOnHand = getQtyOnHand(stItem,stLocation);

                response.write(JSON.stringify({ stQtyOnHand: stQtyOnHand }))
            }
        }
    };

    const getItemDetail = (stItem) => {
        const objLookup = search.lookupFields({
            type: search.Type.ITEM,
            id: stItem,
            columns: ['itemid', 'cost']
        });

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

    return { onRequest };
});
