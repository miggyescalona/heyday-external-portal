/**
 * Author: Patricia Naguit
 * Date: 2022-12-10
 *
 * Date         Modified By            Notes
 * 2022-12-10   Patricia Naguit        Initial File Creation
 */

/**
 * @NApiVersion 2.1
 * @NScriptType ClientScript
 */

define(['N/https', 'N/util', 'N/url', '../HEYDAY_LIB_ClientExternalPortal.js'], (https, util, url, ClientEPLib) => {
    /**
     * Function to be executed when field is changed.
     *
     * @param {Object} context
     */
	
	const pageInit = (context) => {
        ClientEPLib.getAuthenticationScript();
        //ClientEPLib.setScanBtnOnClick();
    };
	
    const fieldChanged = (context) => {
        const { currentRecord, fieldId, sublistId, line} = context;

        if(fieldId == 'custpage_cwgp_date'){
            const dtDate = currentRecord.getValue({fieldId: 'custpage_cwgp_date'});
            if(dtDate){
                const dtDeliveryDate = addBusinessDays(dtDate,8);
                currentRecord.setValue({
                    fieldId: 'custpage_cwgp_deliverbydate',
                    value: dtDeliveryDate
                });
            }
        }

        if(fieldId == 'custpage_cwgp_deliverbydate'){
            const dtDate = currentRecord.getValue({fieldId: 'custpage_cwgp_date'});
            const dtDeliveryDate = currentRecord.getValue({fieldId: 'custpage_cwgp_deliverbydate'});

            if(dtDate){
                
                const dtDeliveryDateTemp = addBusinessDays(dtDate,8);
                console.log('dtDeliveryDate', dtDeliveryDate);
                console.log('dtDeliveryDateTemp', dtDeliveryDateTemp);
                if(dtDeliveryDateTemp.getTime() != dtDeliveryDate.getTime()){
                    alert("Changing the Deliver by Date will result to changes in Shipping fees.");
                }
        
            }
            
        }

        if (sublistId === 'custpage_franchisepo_items') {
            //default item details
            if (fieldId === 'custpage_cwgp_item') {
                const stItem = currentRecord.getCurrentSublistValue({
                    sublistId: 'custpage_franchisepo_items',
                    fieldId: 'custpage_cwgp_item'
                });
                console.log('stItem', stItem);

                const objItem = getItemDetails(stItem);
                console.log('objItem', objItem);

                util.each(objItem, function (value, fieldId) {
                    currentRecord.setCurrentSublistValue({
                        sublistId: 'custpage_franchisepo_items',
                        fieldId: fieldId,
                        value: value
                    });
                });

                currentRecord.setCurrentSublistValue({
                    sublistId: 'custpage_franchisepo_items',
                    fieldId: 'custpage_cwgp_itemid',
                    value: stItem
                });
            }

            if (fieldId === 'custpage_cwgp_quantity' || fieldId === 'custpage_cwgp_rate') {
                const intQty = currentRecord.getCurrentSublistValue({
                    sublistId: 'custpage_franchisepo_items',
                    fieldId: 'custpage_cwgp_quantity'
                });
                console.log('intQty', intQty);
                

                const flRate = currentRecord.getCurrentSublistValue({
                    sublistId: 'custpage_franchisepo_items',
                    fieldId: 'custpage_cwgp_rate'
                });
                console.log('flRate', flRate);

                currentRecord.setCurrentSublistValue({
                    sublistId: 'custpage_franchisepo_items',
                    fieldId: 'custpage_cwgp_amount',
                    value: flRate * intQty
                });

            }
        }
        if(sublistId === 'custpage_inventorayadjustment_items'){
            if (fieldId === 'custpage_cwgp_item') {
                const stItem = currentRecord.getCurrentSublistValue({
                    sublistId: 'custpage_inventorayadjustment_items',
                    fieldId: 'custpage_cwgp_item'
                });
                console.log('stItem', stItem);

                const objItem = getItemDetails(stItem);
                console.log('objItem', objItem);

                util.each(objItem, function (value, fieldId) {
                    currentRecord.setCurrentSublistValue({
                        sublistId: 'custpage_inventorayadjustment_items',
                        fieldId: fieldId,
                        value: value
                    });
                });

                const stCustomer = currentRecord.getValue({fieldId: 'custpage_cwgp_customer'});
                console.log('stCustomer', stCustomer);
                const qtyOnHand = getQtyOnHandFranchise(stItem,stCustomer);
                
                currentRecord.setCurrentSublistValue({
                    sublistId: 'custpage_inventorayadjustment_items',
                    fieldId: 'custpage_cwgp_qtyonhand',
                    value: qtyOnHand
                });
                

            }

            if (fieldId === 'custpage_cwgp_qtyonhand' || fieldId === 'custpage_cwgp_adjustqtyby') {

                
                const flQtyOnHand = currentRecord.getCurrentSublistValue({
                    sublistId: 'custpage_inventorayadjustment_items',
                    fieldId: 'custpage_cwgp_qtyonhand'
                });

                const flAdjustQtyBy = currentRecord.getCurrentSublistValue({
                    sublistId: 'custpage_inventorayadjustment_items',
                    fieldId: 'custpage_cwgp_adjustqtyby'
                });

                const flNewQty = flQtyOnHand + flAdjustQtyBy;
                currentRecord.setCurrentSublistValue({
                    sublistId: 'custpage_inventorayadjustment_items',
                    fieldId: 'custpage_cwgp_newquantity',
                    value: flNewQty
                });
            }

        }


    };

    const getItemDetails = (stItem) => {

        const objCreateIntPOUrl = ClientEPLib._CONFIG.CREATE_INTPO_PAGE[ClientEPLib._CONFIG.ENVIRONMENT]
        
        let stCreateIntPOBaseUrl = url.resolveScript({
            deploymentId        : objCreateIntPOUrl.DEPLOY_ID,
            scriptId            : objCreateIntPOUrl.SCRIPT_ID,
            returnExternalUrl   : true,
            params: {
                item:   stItem
            }
        });

        const objResponse = https.get({
            url: stCreateIntPOBaseUrl,
        });

        const { item } = JSON.parse(objResponse.body);

        return {
            'custpage_cwgp_description': item.salesdescription,
            'custpage_cwgp_rate': item.franchiseprice || 0,
            'custpage_cwgp_quantity': 1,
            'custpage_cwgp_amount': item.franchiseprice || 0,
            'custpage_cwgp_internalsku': item.custitem_heyday_sku || '',
            'custpage_cwgp_upccode': item.custitemheyday_upccode
        };
    };

    const back = (stUserId, stAccessType, stRecType) =>{
        
        const objFranchiseUrl = ClientEPLib._CONFIG.FRANCHISE_PAGE[ClientEPLib._CONFIG.ENVIRONMENT]
        
        let stFranchiseUrl = url.resolveScript({
            deploymentId        : objFranchiseUrl.DEPLOY_ID,
            scriptId            : objFranchiseUrl.SCRIPT_ID,
            returnExternalUrl   : true,
            params: {
                pageMode    : 'list',
                userId      : stUserId,
                accesstype  : stAccessType,
                rectype     : stRecType
            }
        });

        window.location = stFranchiseUrl;
    };
  
    function addBusinessDays(d,n) {
        d = new Date(d.getTime());
        var day = d.getDay();
        d.setDate(d.getDate() + n + (day === 6 ? 2 : +!day) + (Math.floor((n - 1 + (day % 6 || 1)) / 5) * 2));
        return d;
    }

    const validateField = (context) => {
        const { currentRecord, fieldId, sublistId, line} = context;

        if(sublistId === 'custpage_itemreceipt_items'){
            
            
            if (fieldId === 'custpage_cwgp_quantity' || fieldId === 'custpage_cwgp_damagedquantity' || fieldId === 'custpage_cwgp_variance' || fieldId === 'custpage_cwgp_quantityfinal'){
                
                const stValue = currentRecord.getCurrentSublistValue({
                    sublistId: 'custpage_itemreceipt_items',
                    fieldId: fieldId
                });
                if(stValue == ''){
                    currentRecord.setCurrentSublistValue({
                        sublistId: 'custpage_itemreceipt_items',
                        fieldId: fieldId,
                        value: 0,
                        ignoreFieldChange: true,
                    });
                }

                const inQtyShipped = currentRecord.getSublistValue({
                    sublistId: 'custpage_itemreceipt_items',
                    fieldId: 'custpage_cwgp_shippedquantity',
                    line: line
                }); 
                const inQtyStarting = currentRecord.getSublistValue({
                    sublistId: 'custpage_itemreceipt_items',
                    fieldId: 'custpage_cwgp_quantitystarting',
                    line: line
                });
                const inQtyRecieved = currentRecord.getCurrentSublistValue({
                    sublistId: 'custpage_itemreceipt_items',
                    fieldId: 'custpage_cwgp_quantity'
                });
                const inQtyDamaged = currentRecord.getCurrentSublistValue({
                    sublistId: 'custpage_itemreceipt_items',
                    fieldId: 'custpage_cwgp_damagedquantity'
                });
                let inQtyFinal = parseInt(inQtyStarting) + parseInt(inQtyRecieved) - parseInt(inQtyDamaged);

                


                console.log('context ' + JSON.stringify(context));
                console.log('line ' + line);
                
                

                if(inQtyRecieved > inQtyShipped){
                    alert('Cannot receive more than the Shipped Quantity');
                    currentRecord.setCurrentSublistValue({
                        sublistId: 'custpage_itemreceipt_items',
                        fieldId: fieldId,
                        value: 0,
                        ignoreFieldChange: true,
                    });
                    return false;

                }
                if(inQtyDamaged > inQtyShipped){
                    alert('Damaged Quantity cannot be more than the Shipped Quantity');
                    currentRecord.setCurrentSublistValue({
                        sublistId: 'custpage_itemreceipt_items',
                        fieldId: fieldId,
                        value: 0,
                        ignoreFieldChange: true,
                    });
                    return false;

                }

                if(inQtyRecieved < 0){
                    alert('Received Quantity must not be negative');
                    currentRecord.setCurrentSublistValue({
                        sublistId: 'custpage_itemreceipt_items',
                        fieldId: fieldId,
                        value: 0,
                        ignoreFieldChange: true,
                    });
                    return false;
                }

                if(inQtyDamaged > inQtyRecieved){
                    alert('Damaged Quantity must not be greater than Received Quantity');
                    currentRecord.setCurrentSublistValue({
                        sublistId: 'custpage_itemreceipt_items',
                        fieldId: fieldId,
                        value: 0,
                        ignoreFieldChange: true,
                    });
                    return false;
                }


                console.log('inQtyShipped ' + inQtyShipped);
                console.log('inQtyStarting ' + inQtyStarting);
                console.log('inQtyRecieved ' + inQtyRecieved);
                console.log('inQtyDamaged ' + inQtyDamaged);
                //if(inQtyStarting != ''){
                    //let inQtyFinal = parseInt(inQtyStarting) + parseInt(inQtyRecieved) - parseInt(inQtyDamaged);
                    console.log('inQtyFinal ' + inQtyFinal);
                    currentRecord.setCurrentSublistValue({
                        sublistId: 'custpage_itemreceipt_items',
                        fieldId: 'custpage_cwgp_variance',
                        value: inQtyShipped - inQtyRecieved,
                        ignoreFieldChange: true
                    });

                    currentRecord.setCurrentSublistValue({
                        sublistId: 'custpage_itemreceipt_items',
                        fieldId: 'custpage_cwgp_quantityfinal',
                        value: inQtyFinal,
                        ignoreFieldChange: true,
                    });
                    /*currentRecord.selectLine({
                        sublistId: 'custpage_itemreceipt_items',
                        line: line
                    });
                    currentRecord.setCurrentSublistValue({
                        sublistId: 'custpage_itemreceipt_items',
                        fieldId: 'custpage_cwgp_quantityfinal',
                        value: inQtyFinal
                    });
                    currentRecord.commitLine({sublistId: 'custpage_itemreceipt_items'});*/

                //}
            }
            /*
            if (fieldId === 'custpage_cwgp_variance'){
                currentRecord.setCurrentSublistValue({
                    sublistId: 'custpage_itemreceipt_items',
                    fieldId: 'custpage_cwgp_variance',
                    value: inQtyShipped - inQtyRecieved
                });
            }

            if (fieldId === 'custpage_cwgp_damagedquantity'){
                
                currentRecord.setCurrentSublistValue({
                    sublistId: 'custpage_itemreceipt_items',
                    fieldId: 'custpage_cwgp_quantityfinal',
                    value: inQtyFinal
                });
            }*/

            
        }

        return true;
    };

    const validateLine = (context) => {
        const { currentRecord, sublistId } = context;

        let stRecType = getParameterFromURL('rectype');
        console.log('stRecType '+stRecType);

        if(stRecType == 'franchisepo'){
            if (sublistId === 'custpage_franchisepo_items'){
                const intQty = currentRecord.getCurrentSublistValue({
                    sublistId: 'custpage_franchisepo_items',
                    fieldId: 'custpage_cwgp_quantity'
                });
                console.log('intQty', intQty);
                if(parseInt(intQty)<1 || intQty==''){
                    alert('Please enter a positive quantity.');
                    return false;
                }
            }
        }
        return true;
    };

    const saveRecord = (context) => {
        const { currentRecord } = context;

        let stRecType = getParameterFromURL('rectype');
        console.log('stRecType '+stRecType);

        
        
        if(stRecType == 'franchisepo'){
            let numLines = currentRecord.getLineCount({
                sublistId: 'custpage_franchisepo_items'
            });
            if(numLines == 0){
                alert('Please select at least one item');
                return false;
            }

        }

        if(stRecType == 'itemreceipt'){
            let inMarkCount = 0;  
            let numLines = currentRecord.getLineCount({
                sublistId: 'custpage_itemreceipt_items'
            });
            console.log('numLines '+numLines);
            
            for(let i = 0; i < numLines; i++){

                let stReceive = currentRecord.getSublistValue({
                    sublistId: 'custpage_itemreceipt_items',
                    fieldId: 'custpage_cwgp_receive',
                    line: i
                });
                console.log('stReceive '+stReceive);
                if(stReceive){
                    inMarkCount++;
                    let intQuantity = currentRecord.getSublistValue({
                        sublistId: 'custpage_itemreceipt_items',
                        fieldId: 'custpage_cwgp_quantity',
                        line: i
                    });
                    console.log('intQuantity '+intQuantity);
                    if(intQuantity<1){
                        
                        alert('Recieved Quantity must not be zero');
                        //break;
                        return false;
                    }
                }

                

            } 
            if(inMarkCount<1){
                    
                alert('Please select an Item to receive');
                //break;
                return false;
            }

        }

        if(stRecType == 'inventoryadjustment'){
            let numLines = currentRecord.getLineCount({
                sublistId: 'custpage_inventorayadjustment_items'
            });
            if(numLines == 0){
                alert('Please select at least one item');
                return false;
            }

        }

        return true;
    };

    const getParameterFromURL = (param) => {
        if (param = (new RegExp('[?&]' + encodeURIComponent(param) + '=([^&]*)')).exec(location.search))
            return decodeURIComponent(param[1].replace(/\+/g, ' '));
    };

    return {
    	pageInit,
        fieldChanged,
        back,
        validateField,
        validateLine,
        saveRecord
    };
});