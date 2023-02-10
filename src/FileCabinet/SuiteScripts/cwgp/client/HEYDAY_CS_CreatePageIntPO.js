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

define(['N/https', 'N/util', 'N/url', '../libraries/HEYDAY_LIB_ClientExternalPortal.js', 'N/currentRecord'], (https, util, url, ClientEPLib, currentRecord) => {
    
    /**
     * Function to be executed after page is initialized.
     *
     * @param {Object} context
     */
    const pageInit = (context) => {
        ClientEPLib.getAuthenticationScript();
        ClientEPLib.setScanBtnOnClick();

        let stQuery = window.location.search;
        let objParams = new URLSearchParams(stQuery);
        let stSubType = objParams.get('subtype');


        /*if(stSubType == 'damagetestertheft'){
            jQuery('#custpage_cwgp_totaladjustment_fs_lbl').hide();
            jQuery('#custpage_cwgp_itemsummary_fs_lbl').hide();
        }*/
    };

     const saveRecord = (context) => {
        const { currentRecord } = context;


        ///Get Line Count for All Types
        const intPoLineCount = currentRecord.getLineCount('custpage_interpo_items');
        const intIrLineCount = currentRecord.getLineCount('custpage_itemreceipt_items');
        const intIaLineCountStandard= currentRecord.getLineCount('custpage_inventorayadjustment_items');
        const intIaLineCountBackbar= currentRecord.getLineCount('custpage_inventorayadjustmentbackbar_items');
        const intIaLineCountDamageTesterTheft = currentRecord.getLineCount('custpage_inventoryadjustmentdamagetestertheft_items');

        if(intPoLineCount == 0 || intIaLineCountStandard == 0 || intIaLineCountBackbar == 0 || intIaLineCountDamageTesterTheft == 0){
            alert('Please enter a line before saving.')
            return false;
        }

        if(intPoLineCount > 0){
            let blAllZeroQuantity = [];
            for(let x = 0; x < intPoLineCount; x++){
                currentRecord.selectLine({
                    sublistId: 'custpage_interpo_items',
                    line: x
                });
                let intQuantity = parseInt(currentRecord.getCurrentSublistValue({
                    sublistId: 'custpage_interpo_items',
                    fieldId: 'custpage_cwgp_quantity'
                }));
                if(intQuantity == 0 || intQuantity < 0){
                    blAllZeroQuantity.push(x+1);
                }
                console.log(intQuantity);
                console.log(blAllZeroQuantity);
                console.log(blAllZeroQuantity.length);
            }
            if(blAllZeroQuantity.length > 0){
                alert('You have a zero/negative quantity entered at line/s: '+blAllZeroQuantity.toString()+ '\nPlease enter only non-zero/positive values for quantity.')
                return false;
            }
            return true;
        }

        if(intIrLineCount > 0){
            let blZeroQuantity = true;
            let blNotReceived= true;
            let pageMode = getParameterFromURL('pageMode');
            let intDamagedAccountLine = [];

                function getParameterFromURL(param){
                    var query = window.location.search.substring(1);
                    var vars = query.split("&");
                    for (var i = 0; i < vars.length; i++){
                        var pair = vars[i].split("=");
                        if (pair[0] == param){
                            return decodeURIComponent(pair[1]);
                        }
                    }
                    return (false);
                }
           

            for(let x = 0; x < intIrLineCount; x++){
                currentRecord.selectLine({
                    sublistId: 'custpage_itemreceipt_items',
                    line: x
                });
                let intQuantity = parseInt(currentRecord.getCurrentSublistValue({
                    sublistId: 'custpage_itemreceipt_items',
                    fieldId: 'custpage_cwgp_quantity'
                }));

                let blReceived = currentRecord.getCurrentSublistValue({
                    sublistId: 'custpage_itemreceipt_items',
                    fieldId: 'custpage_cwgp_receive'
                });

                
                let intDamagedQuantity = currentRecord.getCurrentSublistValue({
                    sublistId: 'custpage_itemreceipt_items',
                    fieldId: 'custpage_cwgp_damagedquantity'
                });

                let intDamagedAdjustingAccount = currentRecord.getCurrentSublistValue({
                    sublistId: 'custpage_itemreceipt_items',
                    fieldId: 'custpage_cwgp_damagedadjustingaccount'
                });

                if(intDamagedQuantity && !intDamagedAdjustingAccount){
                    intDamagedAccountLine.push(x+1);
                }

                if(intQuantity > 0){
                    blZeroQuantity = false;
                }

                if(blReceived){
                    blNotReceived = false;
                }

                if(intQuantity < 0 || intDamagedQuantity < 0){
                    alert('You have a negative quantity at line number ' + (x+1) + '. Please only enter positive values when entering any quantity.')
                    return false;
                }
            }

            if(intDamagedAccountLine.length > 0){
                alert('You need to select a Damaged Adjusting Account on the following lines: '+ intDamagedAccountLine.toString());
                return false;
            }

            if((blZeroQuantity || blNotReceived) && pageMode!='edit'){
                if(blZeroQuantity){
                    alert('You cannot save a record without setting a received quantity.')
                    return false;
                }
                else if(blNotReceived){
                    alert('You cannot save a record without receiving at least one line.');
                    return false;
                }
            }
            return true;
        }

       /* if(intIaLineCountStandard > 0){
            for(let x = 0; x < intPoLineCount; x++){
                currentRecord.selectLine({
                    sublistId: 'custpage_inventorayadjustment_items',
                    line: x
                });
                let intQuantity = parseInt(currentRecord.getCurrentSublistValue({
                    sublistId: 'custpage_inventorayadjustment_items',
                    fieldId: 'custpage_cwgp_quantity'
                }));
                if(intQuantity < 0){
                    alert('You have a negative quantity at line number ' + (x+1) + '. Please only enter positive values when entering a quantity.')
                    return false;
                }
            }
            return true;
        }*/

        ///Inventory Adjustment Standard
        if(intIaLineCountStandard > 0){
                //default item details
                let blNegativeQuantity = [];
                let blEmptyQuantity = [];
                let blAdjustmentReason = [];
                for(let x = 0; x < intIaLineCountStandard; x++){
                    currentRecord.selectLine({
                        sublistId: 'custpage_inventorayadjustment_items',
                        line: x
                    });

                    //QTY_ON_HAND (STARTINGQUANTITY)
                    let intStartingQty = parseInt(currentRecord.getCurrentSublistValue({
                        sublistId: 'custpage_inventorayadjustment_items',
                        fieldId: 'custpage_cwgp_qtyonhand'
                    }));

                    //ADJUST_QUANTITY_BY (ADJUST INVENTORY QUANTITY)
                    let intQuantity = parseInt(currentRecord.getCurrentSublistValue({
                        sublistId: 'custpage_inventorayadjustment_items',
                        fieldId: 'custpage_cwgp_adjustqtyby'
                    }));

                    ///ENDING_INVENTORY_QUANTITY (ENDING INVENTORY QUANTITY)
                    let intEndingQty = parseInt(currentRecord.getCurrentSublistValue({
                        sublistId: 'custpage_inventorayadjustment_items',
                        fieldId: 'custpage_cwgp_endinginventoryqty'
                    }));

                    let stAdjustmentReason = currentRecord.getCurrentSublistValue({
                        sublistId: 'custpage_inventorayadjustment_items',
                        fieldId: 'custpage_cwgp_adjustmentreason'
                    });

                    console.log(JSON.stringify({
                        intStartingQty: intStartingQty,
                        intQuantity: intQuantity,
                        intEndingQty: intEndingQty,
                        stAdjustmentReason: stAdjustmentReason
                    }));


                    if(intEndingQty < 0){
                        blNegativeQuantity.push(x+1);
                    }

                    if(!intQuantity && !intEndingQty){
                        blEmptyQuantity.push(x+1);
                    }

                    if(!stAdjustmentReason){
                        blAdjustmentReason.push(x+1)
                    }

                }
                console.log(JSON.stringify({
                    blEmptyQuantity: blEmptyQuantity,
                    blAdjustmentReason: blAdjustmentReason
                }));
                if(blEmptyQuantity.length > 0 || blAdjustmentReason.length > 0 || blNegativeQuantity.length > 0){
                    /*if(blAllZeroQuantity){
                        alert('You have zero quantity for both Adjust Inventory Quantity and Ending Inventory Quantity at line/s: ' +blAllZeroQuantity.toString())
                        return false;
                    }*/
                    if(blNegativeQuantity.length > 0){
                        alert('You cannot enter negative Ending Inventory Quantity at line/s: ' +blNegativeQuantity.toString());
                        return false;
                    }
                    if(blEmptyQuantity.length > 0){
                        alert('You need to enter either Adjust Inventory Quantity or Ending Inventory Quantity at line/s: ' +blEmptyQuantity.toString());
                        return false;
                    }
                    else if(blAdjustmentReason){
                        alert('You have no adjustment reason at line/s: ' +blAdjustmentReason.toString());
                        return false;
                    }
                    
                }
            return true;
        }

        ///Inventory Adjustment Backbar
        if(intIaLineCountBackbar > 0){
            //default item details
            let blNegativeQuantity = [];
            let blEmptyFields = [];
            for(let x = 0; x < intIaLineCountBackbar; x++){
                currentRecord.selectLine({
                    sublistId: 'custpage_inventorayadjustmentbackbar_items',
                    line: x
                });
                let intQuantity = parseInt(currentRecord.getCurrentSublistValue({
                    sublistId: 'custpage_inventorayadjustmentbackbar_items',
                    fieldId: 'custpage_cwgp_adjustqtyby'
                }));

                let stRoomNum = currentRecord.getCurrentSublistValue({
                    sublistId: 'custpage_inventorayadjustmentbackbar_items',
                    fieldId: 'custpage_cwgp_roomnumber'
                });

                let stAssign = currentRecord.getCurrentSublistValue({
                    sublistId: 'custpage_inventorayadjustmentbackbar_items',
                    fieldId: 'custpage_cwgp_stassignment'
                });

                let dtDateTime = currentRecord.getCurrentSublistValue({
                    sublistId: 'custpage_inventorayadjustmentbackbar_items',
                    fieldId: 'custpage_cwgp_datetime'
                });

                let stAdjustmentReason = currentRecord.getCurrentSublistValue({
                    sublistId: 'custpage_inventorayadjustmentbackbar_items',
                    fieldId: 'custpage_cwgp_adjustmentreason'
                });

                if(!stRoomNum || !stAssign || !dtDateTime || !stAdjustmentReason || !intQuantity){
                    blEmptyFields.push(x+1);
                }


                console.log(JSON.stringify({
                    intQuantity: intQuantity,
                }));

                if(intQuantity< 0){
                    blNegativeQuantity.push(x+1);
                }

            }
            console.log(JSON.stringify({
                blNegativeQuantity: blNegativeQuantity,
                blEmptyFields: blEmptyFields
            }));
            if(blNegativeQuantity.length > 0 || blEmptyFields.length>0){
                if(blNegativeQuantity.length > 0){
                    alert('You have negative Quantity Removed at line/s: ' +blNegativeQuantity.toString());
                    return false;
                }
                else if(blEmptyFields.length > 0){
                    alert('You have empty values at line/s: ' +blEmptyFields.toString() + '\nPlease enter values on all column fields.');
                    return false;
                }
                
            }
            return true;
        }

        ///Inventory Adjustment DamageTesterTheft
        if(intIaLineCountDamageTesterTheft > 0){
            //default item details
            let blNegativeQuantity = [];
            let blEmptyFields = [];
            let itemSummary = [];
            for(let x = 0; x < intIaLineCountDamageTesterTheft; x++){
                currentRecord.selectLine({
                    sublistId: 'custpage_inventoryadjustmentdamagetestertheft_items',
                    line: x
                });
                let intQuantity = parseInt(currentRecord.getCurrentSublistValue({
                    sublistId: 'custpage_inventoryadjustmentdamagetestertheft_items',
                    fieldId: 'custpage_cwgp_adjustqtyby'
                }));

                let dtDateTime = currentRecord.getCurrentSublistValue({
                    sublistId: 'custpage_inventoryadjustmentdamagetestertheft_items',
                    fieldId: 'custpage_cwgp_datetime'
                });

                let stAdjustmentType = currentRecord.getCurrentSublistValue({
                    sublistId: 'custpage_inventoryadjustmentdamagetestertheft_items',
                    fieldId: 'custpage_cwgp_adjustmenttype'
                });

                let stAdjustmentReason = currentRecord.getCurrentSublistValue({
                    sublistId: 'custpage_inventoryadjustmentdamagetestertheft_items',
                    fieldId: 'custpage_cwgp_adjustmentreason'
                });

                let intQtyOnHand = parseInt(currentRecord.getCurrentSublistValue({
                    sublistId: 'custpage_inventoryadjustmentdamagetestertheft_items',
                    fieldId: 'custpage_cwgp_qtyonhand'
                })) || 0

                itemSummary.push({
                    stItem: currentRecord.getCurrentSublistText({
                        sublistId: 'custpage_inventoryadjustmentdamagetestertheft_items',
                        fieldId: 'custpage_cwgp_item'
                    }),
                    intQty: intQuantity || 0,
                    stAdjustType: currentRecord.getCurrentSublistText({
                        sublistId: 'custpage_inventoryadjustmentdamagetestertheft_items',
                        fieldId: 'custpage_cwgp_adjustmenttype'
                    })
                });

                if(!dtDateTime || !stAdjustmentReason || !stAdjustmentType || !intQuantity){
                    blEmptyFields.push(x+1);
                }


                console.log(JSON.stringify({
                    intQuantity: intQuantity,
                }));

                if(intQuantity< 0){
                    blNegativeQuantity.push(x+1);
                }

            }
            console.log('itemSummary: ' + JSON.stringify(itemSummary));
            let result = []
            if(itemSummary){
                itemSummary.reduce(function(res, value) {
                if (!res[value.stAdjustType]) {
                    res[value.stAdjustType] = { Id: value.stAdjustType, intQty: 0 };
                    result.push(res[value.stAdjustType])
                }
                res[value.stAdjustType].intQty += value.intQty;
                    return res;
                }, {});
            }
            currentRecord.setValue('custpage_cwgp_totaladjustmenthidden',JSON.stringify(result));
            console.log(currentRecord.getValue('custpage_cwgp_totaladjustmenthidden'));
            console.log(JSON.stringify({
                blNegativeQuantity: blNegativeQuantity,
                blEmptyFields: blEmptyFields,
                itemSummary: itemSummary
            }));
            if(blNegativeQuantity.length > 0 || blEmptyFields.length>0){
                if(blNegativeQuantity.length > 0){
                    alert('You have negative Quantity Removed at line/s: ' +blNegativeQuantity.toString());
                    return false;
                }
                else if(blEmptyFields.length > 0){
                    alert('You have empty values at line/s: ' +blEmptyFields.toString() + '\nPlease enter values on all column fields.');
                    return false;
                }
                
            }
            return true;
        }



        return true;
    };
    
    
    /**
     * Function to be executed when field is changed.
     *
     * @param {Object} context
     */
    const fieldChanged = (context) => {
        const { currentRecord, fieldId, sublistId } = context;

        // if(fieldId === 'custpage_cwgp_scanupccodes'){
        //     let stScannerInput = currentRecord.getValue({fieldId})
        //     let stUpcMap = currentRecord.getValue({fieldId: 'custpage_cwgp_upccodemap'})
        //     if(stScannerInput){

        //         let urlParams = new URL(window.location).searchParams;

        //         let stFailedCodes = ClientEPLib.addScannedItemsToLines({
        //             stUpcMap,
        //             stScannerInput,
        //             stPageType: urlParams.get('rectype')
        //         })

        //         // console.log('stScannerInput', stScannerInput)
        //         // console.log('stFailedCodes', stFailedCodes)
        //         // console.log(stScannerInput != stFailedCodes)
        //         if(stScannerInput != stFailedCodes){
                    
        //             currentRecord.setValue({
        //                 fieldId,
        //                 value               : stFailedCodes,
        //                 ignoreFieldChange   : true
        //             })
        //         }
        //     }
        // }

        ///Interco PO
        if (sublistId === 'custpage_interpo_items') {
            //default item details
            if (fieldId === 'custpage_cwgp_item') {
                const stItem = currentRecord.getCurrentSublistValue({
                    sublistId: 'custpage_interpo_items',
                    fieldId: 'custpage_cwgp_item'
                });
                console.log('stItem', stItem);

                const objItem = getItemDetails(stItem);
                console.log('objItem1', JSON.stringify(objItem));

                util.each(objItem, function (value, fieldId) {
                    currentRecord.setCurrentSublistValue({
                        sublistId: 'custpage_interpo_items',
                        fieldId: fieldId,
                        value: value
                    });
                });
            }

            if (fieldId === 'custpage_cwgp_quantity' || fieldId === 'custpage_cwgp_rate') {
                const intQty = currentRecord.getCurrentSublistValue({
                    sublistId: 'custpage_interpo_items',
                    fieldId: 'custpage_cwgp_quantity'
                });
                console.log('intQty', intQty);

                const flRate = currentRecord.getCurrentSublistValue({
                    sublistId: 'custpage_interpo_items',
                    fieldId: 'custpage_cwgp_rate'
                });
                console.log('flRate', flRate);

                currentRecord.setCurrentSublistValue({
                    sublistId: 'custpage_interpo_items',
                    fieldId: 'custpage_cwgp_amount',
                    value: flRate * intQty
                });

                let stQuery = window.location.search;
                let objParams = new URLSearchParams(stQuery);
                let stSubType = objParams.get('subtype');
            }

        }

           ///Item Receipt
        if (sublistId === 'custpage_itemreceipt_items') {
            //default item details

            if (fieldId === 'custpage_cwgp_quantity' || fieldId === 'custpage_cwgp_damagedquantity' || fieldId === 'custpage_cwgp_finalquantity') {
                const intStartingQty = parseInt(currentRecord.getCurrentSublistValue({
                    sublistId: 'custpage_itemreceipt_items',
                    fieldId: 'custpage_cwgp_startingquantityhidden'
                }));
                
                const intReceivedQty = parseInt(currentRecord.getCurrentSublistValue({
                    sublistId: 'custpage_itemreceipt_items',
                    fieldId: 'custpage_cwgp_quantity'
                }));

                const intDamagedQty = parseInt(currentRecord.getCurrentSublistValue({
                    sublistId: 'custpage_itemreceipt_items',
                    fieldId: 'custpage_cwgp_damagedquantity'
                }));

                console.log(JSON.stringify({
                    intStartingQty:intStartingQty,
                    intReceivedQty:intReceivedQty,
                    intDamagedQty:intDamagedQty
                }));

                const intFinalQty = intStartingQty+intReceivedQty-intDamagedQty

                if(intFinalQty){
                    currentRecord.setCurrentSublistValue({
                        sublistId: 'custpage_itemreceipt_items',
                        fieldId: 'custpage_cwgp_finalquantity',
                        value: intFinalQty,
                        ignoreFieldChange: true
                    });
                }
            }

            if (fieldId === 'custpage_cwgp_quantity' || fieldId === 'custpage_cwgp_variance' ){
                const intQty = parseInt(currentRecord.getCurrentSublistValue({
                    sublistId: 'custpage_itemreceipt_items',
                    fieldId: 'custpage_cwgp_quantity'
                }));
                console.log('intQty'+ intQty);

                const intShippedQty = parseInt(currentRecord.getCurrentSublistValue({
                    sublistId: 'custpage_itemreceipt_items',
                    fieldId: 'custpage_cwgp_shippedquantityhidden'
                }));

                console.log('intShippedQty'+ intShippedQty);
           
                const intVariance = intShippedQty-intQty;

                if(intVariance){
                    currentRecord.setCurrentSublistValue({
                        sublistId: 'custpage_itemreceipt_items',
                        fieldId: 'custpage_cwgp_variance',
                        value: intVariance,
                        ignoreFieldChange: true
                    });
                }
            }

        }

        ///Inventory Adjustment Standard/Backbar/DamageTesterTheft
        if (sublistId === 'custpage_inventorayadjustment_items' || sublistId === 'custpage_inventorayadjustmentbackbar_items' || sublistId === 'custpage_inventoryadjustmentdamagetestertheft_items') {
            //default item details
            if (fieldId === 'custpage_cwgp_item') {
                const stItem = currentRecord.getCurrentSublistValue({
                    sublistId: sublistId,
                    fieldId: 'custpage_cwgp_item'
                });
                console.log('stItem', stItem);

                const objItem = getItemDetails(stItem);
                console.log('objItem', objItem);

                util.each(objItem, function (value, fieldId) {
                    currentRecord.setCurrentSublistValue({
                        sublistId: sublistId,
                        fieldId: fieldId,
                        value: value
                    });
                });       

                const stLocation = currentRecord.getCurrentSublistValue({
                    sublistId: sublistId,
                    fieldId: 'custpage_cwgp_location'
                });
                console.log('stItem', stItem);

                const objQtyOnHand = getItemQtyOnHand(stItem,stLocation);
                console.log('objQtyOnHand', objQtyOnHand);

                currentRecord.setCurrentSublistValue({
                    sublistId: sublistId,
                    fieldId: 'custpage_cwgp_qtyonhand',
                    value: objQtyOnHand || 0
                });

                
                if(sublistId != 'custpage_inventorayadjustment_items'){
                    currentRecord.setCurrentSublistValue({
                        sublistId: sublistId,
                        fieldId: 'custpage_cwgp_adjustqtyby',
                        value: 1
                    });
                }
            }

            const objSublist = currentRecord.getSublist({sublistId: sublistId});
            const objAdjQtyByCol = objSublist.getColumn({ fieldId: "custpage_cwgp_adjustqtyby" });
            const objEndingInvCol = objSublist.getColumn({ fieldId: "custpage_cwgp_endinginventoryqty" });
            if (fieldId === 'custpage_cwgp_adjustqtyby'){
                const stAdjustQtyBy = currentRecord.getCurrentSublistValue({
                    sublistId: sublistId,
                    fieldId: 'custpage_cwgp_adjustqtyby'
                });

                const stQtyOnHand = currentRecord.getCurrentSublistValue({
                    sublistId: sublistId,
                    fieldId: 'custpage_cwgp_qtyonhand'
                });

             
                let stNewQty;

                if(sublistId == 'custpage_inventorayadjustment_items'){
                    stNewQty = stAdjustQtyBy + stQtyOnHand;
                }
                else{
                    stNewQty = stQtyOnHand - stAdjustQtyBy;
                }
                currentRecord.setCurrentSublistValue({
                    sublistId: sublistId,
                    fieldId: 'custpage_cwgp_newquantity',
                    value: stNewQty || 0
                });

                if(sublistId === 'custpage_inventorayadjustment_items'){
                    const stAdjQtyBy = currentRecord.getCurrentSublistValue({ sublistId: sublistId, fieldId: "custpage_cwgp_adjustqtyby" });
            
                    if(stAdjQtyBy && stAdjQtyBy != 0){
                        objEndingInvCol.isDisabled = true;
                    }
                    else{
                        objEndingInvCol.isDisabled = false;
                    }
                }
            }
            if(fieldId === 'custpage_cwgp_endinginventoryqty' && sublistId === 'custpage_inventorayadjustment_items'){
                const stEndingInvCol = currentRecord.getCurrentSublistValue({ sublistId: sublistId, fieldId: "custpage_cwgp_endinginventoryqty" });
        
                
                if(stEndingInvCol && stEndingInvCol != 0){
                    objAdjQtyByCol.isDisabled = true;
                }
                else{
                    objAdjQtyByCol.isDisabled = false;
                }

                currentRecord.setCurrentSublistValue({
                    sublistId: sublistId,
                    fieldId: 'custpage_cwgp_newquantity',
                    value: stEndingInvCol || 0
                });
            }
            
        }
    };

    function validateField(context) {
        const { currentRecord, fieldId, sublistId } = context;

        //Item Receipt
        if (sublistId === 'custpage_itemreceipt_items') {
            //default item details
            if (fieldId === 'custpage_cwgp_quantity') {
                const intRemainingQuantity = parseInt(currentRecord.getCurrentSublistValue({
                    sublistId: 'custpage_itemreceipt_items',
                    fieldId: 'custpage_cwgp_quantityremaininghidden'
                }));

                                
                const intReceivedQty = parseInt(currentRecord.getCurrentSublistValue({
                    sublistId: 'custpage_itemreceipt_items',
                    fieldId: 'custpage_cwgp_quantity'
                }));
                

                if(intReceivedQty > intRemainingQuantity){
                    alert('The quantity you entered is more than the remaining quantity.')
                    return false;
                }
                return true;
            }
            if (fieldId === 'custpage_cwgp_damagedquantity') {
                const intReceivedQty = parseInt(currentRecord.getCurrentSublistValue({
                    sublistId: 'custpage_itemreceipt_items',
                    fieldId: 'custpage_cwgp_quantity'
                }));

                                
                const intDamagedQty = parseInt(currentRecord.getCurrentSublistValue({
                    sublistId: 'custpage_itemreceipt_items',
                    fieldId: 'custpage_cwgp_damagedquantity'
                }));
                

                if(intDamagedQty > intReceivedQty){
                    alert('You cannot enter more Damaged Quantity than Received Quantity.')
                    return false;
                }
                return true;
            }
            
            return true;
        }

        ///Inventory Adjustment Backbar
        if (sublistId === 'custpage_inventorayadjustmentbackbar_items' || sublistId == 'custpage_inventoryadjustmentdamagetestertheft_items') {
            //default item details
            if (fieldId === 'custpage_cwgp_adjustqtyby') {
                const intQtyBy = parseInt(currentRecord.getCurrentSublistValue({
                    sublistId: sublistId,
                    fieldId: 'custpage_cwgp_adjustqtyby'
                }));

                if(intQtyBy > 1 || intQtyBy < 0){
                    alert('There should be only 1 quantity per line.');
                    return false;
                }
             
            }
            
            return true;
        }

        return true;
    }

    const lineInit = (context) => {
        const { currentRecord, fieldId, sublistId } = context;

        /*var intLineCount = currentRecord.getLineCount("custpage_inventorayadjustment_items");
        var intCurrentLine = currentRecord.getCurrentSublistIndex({ sublistId: "custpage_inventorayadjustment_items" });
        var quantity = currentRecord.getCurrentSublistValue({ sublistId: "item", fieldId: "quantity" });*/

        if(sublistId == 'custpage_inventorayadjustment_items'){

            const objSublist = currentRecord.getSublist({sublistId: "custpage_inventorayadjustment_items"});
            const objAdjQtyByCol = objSublist.getColumn({ fieldId: "custpage_cwgp_adjustqtyby" });
            const objEndingInvCol = objSublist.getColumn({ fieldId: "custpage_cwgp_endinginventoryqty" });

            const stAdjQtyBy = currentRecord.getCurrentSublistValue({ sublistId: sublistId, fieldId: "custpage_cwgp_adjustqtyby" });
            const stEndingInvCol = currentRecord.getCurrentSublistValue({ sublistId: sublistId, fieldId: "custpage_cwgp_endinginventoryqty" });
        
            if(stAdjQtyBy && stAdjQtyBy != 0){
                objEndingInvCol.isDisabled = true;
            }
            else{
                objEndingInvCol.isDisabled = false;
            }

               
            if(stEndingInvCol && stEndingInvCol != 0){
                objAdjQtyByCol.isDisabled = true;
            }
            else{
                objAdjQtyByCol.isDisabled = false;
            }
        }
    }

    



    const getItemDetails = (stItem) => {

        const objCreateIntPOUrl = ClientEPLib._CONFIG.CREATE_INTPO_PAGE[ClientEPLib._CONFIG.ENVIRONMENT]

        let stCreateIntPOBaseUrl = url.resolveScript({
            deploymentId        : objCreateIntPOUrl.DEPLOY_ID,
            scriptId            : objCreateIntPOUrl.SCRIPT_ID,
            returnExternalUrl   : true,
            params: {
                item:   stItem,
                type: 'retail',
            }
        });

        const objResponse = https.get({
            url: stCreateIntPOBaseUrl,
        });

        const { item } = JSON.parse(objResponse.body);

        return {
            'custpage_cwgp_description': item.purchasedescription,
            'custpage_cwgp_rate': item.franchiseprice || 0,
            'custpage_cwgp_quantity': 1,
            'custpage_cwgp_amount': item.franchiseprice || 0,
            'custpage_cwgp_internalsku': item.custitem_heyday_sku || '',
            'custpage_cwgp_upccode': item.custitemheyday_upccode,
            'custpage_cwgp_itemid': item.internalid[0].value
        };
    };

    const getItemQtyOnHand = (stItem,stLocation) =>{
        const objCreateIntPOUrl = ClientEPLib._CONFIG.CREATE_INTPO_PAGE[ClientEPLib._CONFIG.ENVIRONMENT]

        
        let stCreateIntPOBaseUrl = url.resolveScript({
            deploymentId        : objCreateIntPOUrl.DEPLOY_ID,
            scriptId            : objCreateIntPOUrl.SCRIPT_ID,
            returnExternalUrl   : true,
            params: {
                item: stItem,
                itemlocation: stLocation
            }
        });

        const objResponse = https.get({
            url: stCreateIntPOBaseUrl,
        });

        const { stQtyOnHand } = JSON.parse(objResponse.body);

        return stQtyOnHand;
    };

    const back = (stUserId, stAccessType, stRecType) =>{
   
        const objRetailUrl = ClientEPLib._CONFIG.RETAIL_PAGE[ClientEPLib._CONFIG.ENVIRONMENT]

        let stRetailUrl = url.resolveScript({
            deploymentId        : objRetailUrl.DEPLOY_ID,
            scriptId            : objRetailUrl.SCRIPT_ID,
            returnExternalUrl   : true,
            params: {
                pageMode    : 'list',
                userId      : stUserId,
                accesstype  : stAccessType,
                rectype     : stRecType
            }
        });

        window.location = stRetailUrl;
   
    };

    const calculateSummary = (context) =>{
        const currRec = currentRecord.get();
    
       const intIaLineCountDamageTesterTheft = currRec.getLineCount('custpage_inventoryadjustmentdamagetestertheft_items');
       let qtyByType = [];
       let itemSummary = [];

       for(let x = 0; x < intIaLineCountDamageTesterTheft; x++){
        currRec.selectLine({
                sublistId: 'custpage_inventoryadjustmentdamagetestertheft_items',
                line: x
            });
            qtyByType.push({
                stItem: currRec.getCurrentSublistText({
                    sublistId: 'custpage_inventoryadjustmentdamagetestertheft_items',
                    fieldId: 'custpage_cwgp_item'
                }),
                 intQty: parseInt(currRec.getCurrentSublistValue({
                    sublistId: 'custpage_inventoryadjustmentdamagetestertheft_items',
                    fieldId: 'custpage_cwgp_adjustqtyby'
                })) || 0,
                 stAdjustType: currRec.getCurrentSublistText({
                    sublistId: 'custpage_inventoryadjustmentdamagetestertheft_items',
                    fieldId: 'custpage_cwgp_adjustmenttype'
                })
            });
            let qtyTempQtyOnHand = parseInt(currRec.getCurrentSublistValue({
                sublistId: 'custpage_inventoryadjustmentdamagetestertheft_items',
                fieldId: 'custpage_cwgp_qtyonhand'
            })) || 0

            let qtyTempIntQty = parseInt(currRec.getCurrentSublistValue({
                sublistId: 'custpage_inventoryadjustmentdamagetestertheft_items',
                fieldId: 'custpage_cwgp_adjustqtyby'
            })) || 0
            itemSummary.push({
                stItem: currRec.getCurrentSublistText({
                    sublistId: 'custpage_inventoryadjustmentdamagetestertheft_items',
                    fieldId: 'custpage_cwgp_item'
                }),
                intQtyOnHand: parseInt(currRec.getCurrentSublistValue({
                    sublistId: 'custpage_inventoryadjustmentdamagetestertheft_items',
                    fieldId: 'custpage_cwgp_qtyonhand'
                })) || 0,
                intQty: parseInt(currRec.getCurrentSublistText({
                    sublistId: 'custpage_inventoryadjustmentdamagetestertheft_items',
                    fieldId: 'custpage_cwgp_adjustqtyby'
                })),
                intFinalOnHand: qtyTempQtyOnHand-qtyTempIntQty
            });
        }
          console.log(JSON.stringify(qtyByType));
          console.log(JSON.stringify(itemSummary));

        if(qtyByType.length > 0){
            let result = []
            qtyByType.reduce(function(res, value) {
            if (!res[value.stAdjustType]) {
                res[value.stAdjustType] = { Id: value.stAdjustType, intQty: 0 };
                result.push(res[value.stAdjustType])
            }
            res[value.stAdjustType].intQty += value.intQty;
                return res;
            }, {});

            let stTextAreaVal = '';

            stTextAreaVal += '<div><table style="width:100%; border-collapse: collapse" border="1px solid black" ">'
            stTextAreaVal+= '<tr><td style="font-weight: bold">Type</td><td style="font-weight: bold">Quantity</tr>';
            for(let x = 0; x < result.length; x++){
                stTextAreaVal+= '<tr><td>'+ result[x].Id+'</td><td>'+result[x].intQty+'</tr>';
            }
            stTextAreaVal += '</div></table>'

            currRec.setValue('custpage_cwgp_totaladjustment',stTextAreaVal)
        }

           
        if(itemSummary.length > 0){
            let stTextAreaVal = '';

            stTextAreaVal += '<div><table style="width:100%;  border-collapse: collapse" border="1px solid black">'
            stTextAreaVal+= '<tr><td colspan ="2" style="font-weight: bold">Starting Location On Hand</tr>';
            stTextAreaVal+= '<tr><td style="font-weight: bold">Item</td><td style="font-weight: bold">Quantity</tr>';
            for(let x = 0; x < itemSummary.length; x++){
                stTextAreaVal+= '<tr><td>'+ itemSummary[x].stItem+'</td><td>'+itemSummary[x].intQtyOnHand+'</tr>';
            }
            stTextAreaVal += '</div></table><br></br>'

            stTextAreaVal += '<div><table style="width:100%; border-collapse: collapse" border="1px solid black">'
            stTextAreaVal+= '<tr><td colspan ="2" style="font-weight: bold">Final Location On Hand</tr>';
            stTextAreaVal+= '<tr><td style="font-weight: bold">Item</td><td style="font-weight: bold">Quantity</tr>';
            for(let x = 0; x < itemSummary.length; x++){
                stTextAreaVal+= '<tr><td>'+ itemSummary[x].stItem+'</td><td>'+itemSummary[x].intFinalOnHand+'</tr>';
            }
            stTextAreaVal += '</div></table>'

            currRec.setValue('custpage_cwgp_itemsummary',stTextAreaVal)
        }
    };

    const scanInputViaBtn = ClientEPLib.scanInputViaBtn;


    return {
        pageInit,
        saveRecord,
        validateField,
        fieldChanged,
        lineInit,
        back,
        calculateSummary,
        scanInputViaBtn
    };
});