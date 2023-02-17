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

define(['N/https', 'N/util', 'N/url', '../libraries/HEYDAY_LIB_ClientExternalPortal.js', 'N/currentRecord', 'N/ui/message','N/runtime'], (https, util, url, ClientEPLib, currentRecord, message, runtime) => {
    
    /**
     * Function to be executed after page is initialized.
     *
     * @param {Object} context
     */
    const pageInit = (context) => {
        ClientEPLib.getAuthenticationScript();
        ClientEPLib.setScanBtnOnClick();

        const stQuery = window.location.search;
        const objParams = new URLSearchParams(stQuery);
        const stSubType = objParams.get('subtype');
        const stRecType = objParams.get('rectype');
        const stPageMode = objParams.get('pageMode');
        const stStep = objParams.get('step');

        if(stRecType == 'intercompanypo' && stPageMode == 'create'){
            let messageUI = message.create({
                title: 'Reminder',
                message: 'Item and Quantity requested are subject for approval.',
                type: message.Type.WARNING,
            });
            messageUI.show(); // will disappear after 20s
        }
        /*if(stRecType == 'inventorycount' && stPageMode == 'create' && stStep != '1'){
            var currentRecord = context.currentRecord;
            console.log('session val'+ sessionStorage.getItem("objIC"));
            //const stBodyFields = ['custpage_cwgp_scanbtnhtml','custpage_cwgp_userid','custpage_cwgp_htmlcss','custpage_cwgp_pagemode','custpage_cwgp_accesstype','custpage_cwgp_rectype','custpage_cwgp_adjustmentaccount','custpage_cwgp_date','custpage_cwgp_memomain','custpage_cwgp_operator','custpage_cwgp_operatorhidden','custpage_cwgp_subsidiary','custpage_cwgp_businessline','custpage_cwgp_adjustmentlocation',]
            let objIC = sessionStorage.getItem("objIC");

        }*/
    };

     const saveRecord = (context) => {
        const { currentRecord } = context;

        

        let stQuery = window.location.search;
        let objParams = new URLSearchParams(stQuery);
        let stRecType = objParams.get('rectype');
        let stPageMode = objParams.get('pageMode');
        let stStep = objParams.get('step');
        

        if(stRecType == 'inventorycount' && stPageMode == 'create'){
            if(stStep == '4'){
                let intDiscrepancy;
                let stAdjustmentReason;
                let stItemId;
                let stItemName;
                let intTotalDiscrepancy = 0;
                let arrHasDiscrepancy = [];

                const intICLineCount = currentRecord.getLineCount('custpage_inventoryadjustmentinventorycount_items');
                for(let x = 0; x < intICLineCount;x++){
                    
                    stItemId = currentRecord.getSublistValue({
                        sublistId: 'custpage_inventoryadjustmentinventorycount_items',
                        fieldId: 'custpage_cwgp_itemid',
                        line: x
                    });

                    stItemName = currentRecord.getSublistValue({
                        sublistId: 'custpage_inventoryadjustmentinventorycount_items',
                        fieldId: 'custpage_cwgp_item',
                        line: x
                    });


                    intDiscrepancy = parseInt(currentRecord.getSublistValue({
                        sublistId: 'custpage_inventoryadjustmentinventorycount_items',
                        fieldId: 'custpage_cwgp_discrepancy',
                        line: x
                    }));

                    intTotalDiscrepancy += intDiscrepancy;

                    stAdjustmentReason = currentRecord.getSublistValue({
                        sublistId: 'custpage_inventoryadjustmentinventorycount_items',
                        fieldId: 'custpage_cwgp_adjustmentreason',
                        line: x
                    });
                    if((intDiscrepancy > 0 || intDiscrepancy < 0) && !stAdjustmentReason){
                        arrHasDiscrepancy.push(x+1);
                    }
                }

                //If has discrepancy
                if(arrHasDiscrepancy.length > 0){
                    alert('Please enter an adjustment reason for line/s: ' + arrHasDiscrepancy.toString())
                    return false;
                }
                currentRecord.setValue('custpage_cwgp_totaldiscrepancy', intTotalDiscrepancy);
            }
        }


        
        //Interco PO
        if(stRecType == 'intercompanypo' && (stPageMode == 'create' || stPageMode == 'edit')){
            const stDate = new Date(currentRecord.getValue({
                fieldId: 'custpage_cwgp_date'
            }));

            const stDeliverByDate = new Date(currentRecord.getValue({
                fieldId: 'custpage_cwgp_deliverbydate'
            }));
            
            console.log('stDate', stDate);
            console.log('stDeliverByDate', stDeliverByDate);

            if(stDeliverByDate <= stDate){
                alert('You cannot set a Deliver By Date before or on Transaction Date.');
                return false;
            }
            return true    ;  
        }


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

        ///Inventory Adjustment Standard
        if(intIaLineCountStandard > 0){
                //default item details
                let blNegativeQuantity = [];
                let blEmptyQuantity = [];
                let blBothWithQuantity = [];
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

                    if((intQuantity == 0 && intEndingQty == 0) || (isNaN(intQuantity) && isNaN(intEndingQty))){
                        blEmptyQuantity.push(x+1);
                    }

                    
                    if(!isNaN(intQuantity) && !isNaN(intEndingQty)){
                        blBothWithQuantity.push(x+1);
                    }

                    if(!stAdjustmentReason){
                        blAdjustmentReason.push(x+1)
                    }

                }
                console.log(JSON.stringify({
                    blEmptyQuantity: blEmptyQuantity,
                    blAdjustmentReason: blAdjustmentReason
                }));
                if(blEmptyQuantity.length > 0 || blAdjustmentReason.length > 0 || blNegativeQuantity.length > 0 || blBothWithQuantity.length > 0){
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
                    if(blBothWithQuantity.length > 0){
                        alert('You have quantities in both Adjust Inventory Quantity and Ending Inventory Quantity at line/s: ' +blBothWithQuantity.toString());
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

        ///Interco PO Sublist
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

                /*let stQuery = window.location.search;
                let objParams = new URLSearchParams(stQuery);
                let stSubType = objParams.get('subtype');*/
            }

        }


        /// Interco Create/Edit
        let stQuery = window.location.search;
        let objParams = new URLSearchParams(stQuery);
        let stType = objParams.get('rectype');
        let stPageMode = objParams.get('pageMode');

        if(stType == 'intercompanypo' && (stPageMode == 'create' || stPageMode == 'edit')){
            if (fieldId === 'custpage_cwgp_date') {
                const stDate = currentRecord.getValue({
                    fieldId: 'custpage_cwgp_date'
                });
                
                console.log('stDate', stDate);

                let d = new Date(stDate);
                let n = 6;
                var day = d.getDay();
                d.setDate(d.getDate() + n + (day === 6 ? 2 : +!day) + (Math.floor((n - 1 + (day % 6 || 1)) / 5) * 2));
                
                currentRecord.setValue({
                    fieldId: 'custpage_cwgp_deliverbydate',
                    value: d,
                });
            }

            if (fieldId === 'custpage_cwgp_deliverbydate') {
                alert('Changing the Deliver by Date will result to changes in Shipping fees.')
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

                
                if(sublistId != 'custpage_inventorayadjustment_items' && sublistId != 'custpage_inventoryadjustmentinventorycountinitial_items'){
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

        ///Inventory Count
        if(sublistId === 'custpage_inventoryadjustmentinventorycount_items'){
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

                /*const objQtyOnHand = getItemQtyOnHand(stItem,stLocation);
                console.log('objQtyOnHand', objQtyOnHand);

                currentRecord.setCurrentSublistValue({
                    sublistId: sublistId,
                    fieldId: 'custpage_cwgp_qtyonhand',
                    value: objQtyOnHand || 0
                });

                
                if(sublistId != 'custpage_inventorayadjustment_items' && sublistId != 'custpage_inventoryadjustmentinventorycountinitial_items'){
                    currentRecord.setCurrentSublistValue({
                        sublistId: sublistId,
                        fieldId: 'custpage_cwgp_adjustqtyby',
                        value: 1
                    });
                }*/
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
        

        ///Inventory Adjustment Backbar/DamageTesterTheft
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

            stTextAreaVal += '<div><table style="width:100%; border-collapse: collapse;" border="1px solid black" ">'
            stTextAreaVal+= '<tr><td style="font-weight: bold;padding:3px">Type</td><td style="font-weight: bold;padding:3px">Quantity</tr>';
            for(let x = 0; x < result.length; x++){
                stTextAreaVal+= '<tr><td style="padding:3px">'+ result[x].Id+'</td><td style="padding:3px">'+result[x].intQty+'</tr>';
            }
            stTextAreaVal += '</div></table>'

            currRec.setValue('custpage_cwgp_totaladjustment',stTextAreaVal)
        }

           
        if(itemSummary.length > 0){
            let result = []

            ///Merge Similar Items and Add up Qty
            itemSummary.reduce(function(res, value) {
            if (!res[value.stItem]) {
                res[value.stItem] = { Id: value.stItem, intQty: 0, intQtyOnHand: value.intQtyOnHand, intFinalOnHand: value.intFinalOnHand  };
                result.push(res[value.stItem])
            }
            res[value.stItem].intQty += value.intQty;
                return res;
            }, {});

            ///Subtract Quantity to Quantity on Hand to get Final Quantity On Hand
            result.map(function(item){
                item.intFinalOnHand = item.intQtyOnHand - item.intQty;
                return item;
            })

            console.log(result);

            let stTextAreaVal = '';

            stTextAreaVal += '<div><table style="width:100%;border-collapse: collapse;" border="1px solid black">'
            stTextAreaVal+= '<tr><td colspan ="2" style="font-weight: bold;padding:3px">Starting Location On Hand</tr>';
            stTextAreaVal+= '<tr><td style="font-weight: bold;padding:3px">Item</td><td style="font-weight: bold;padding:3px">Quantity</tr>';
            for(let x = 0; x < result.length; x++){
                stTextAreaVal+= '<tr><td style="padding:3px">'+ result[x].Id+'</td><td style="padding:3px">'+result[x].intQtyOnHand+'</tr>';
            }
            stTextAreaVal += '</div></table><br></br>'

            stTextAreaVal += '<div><table style="width:100%; border-collapse: collapse;" border="1px solid black">'
            stTextAreaVal+= '<tr><td colspan ="2" style="font-weight: bold;padding:3px">Final Location On Hand</tr>';
            stTextAreaVal+= '<tr><td style="font-weight: bold;padding:3px">Item</td><td style="font-weight: bold;padding:3px">Quantity</tr>';
            for(let x = 0; x < result.length; x++){
                stTextAreaVal+= '<tr><td style="padding:3px">'+ result[x].Id+'</td><td style="padding:3px">'+result[x].intFinalOnHand+'</tr>';
            }
            stTextAreaVal += '</div></table>'

            currRec.setValue('custpage_cwgp_itemsummary',stTextAreaVal)
        }
    };

    function nextStep(stUserId,stAccessType,stStep, objICprevious, objDefaultValues,stRecType){
        console.log('nextStep');

        const blReturnError = validateInventoryCount(stStep);
        if(blReturnError[0]){
            alert(blReturnError[1]);
            return false;
        }

        const currRec = currentRecord.get();
        let objIC = {
            body: {},
            item: []
        };

        /*console.log(objDefaultValues);
        console.log(JSON.stringify(objDefaultValues));*/

        objIC.body = objDefaultValues;
        const stBodyFields = ['custpage_cwgp_adjustmentaccount','custpage_cwgp_date','custpage_cwgp_memomain']
        if(stStep == 1){
            for(let x = 0; x < stBodyFields.length;x++){
                console.log(stBodyFields[x]+'|'+currRec.getValue(stBodyFields[x]));
                objIC.body[stBodyFields[x]] = currRec.getValue(stBodyFields[x]);
            }
        }
        else{
            for(let x = 0; x < stBodyFields.length;x++){
                objICprevious.body[stBodyFields[x]] = currRec.getValue(stBodyFields[x]);
            }
            objICprevious.body['custpage_cwgp_adjustmentsubtypeid'] = 1;
        }

        console.log(JSON.stringify(objDefaultValues));
       
        const intICLineCount = currRec.getLineCount('custpage_inventoryadjustmentinventorycount_items');
        for(let x = 0; x < intICLineCount;x++){
            currRec.selectLine({
                sublistId: 'custpage_inventoryadjustmentinventorycount_items',
                line: x
            });
            if(stStep == 1){
                objIC.item.push({
                    custpage_cwgp_item: parseInt(currRec.getCurrentSublistValue({
                        sublistId: 'custpage_inventoryadjustmentinventorycount_items',
                        fieldId: 'custpage_cwgp_item'
                    })),
                    custpage_cwgp_description: currRec.getCurrentSublistValue({
                        sublistId: 'custpage_inventoryadjustmentinventorycount_items',
                        fieldId: 'custpage_cwgp_description'
                    }),
                    custpage_cwgp_internalsku: currRec.getCurrentSublistValue({
                        sublistId: 'custpage_inventoryadjustmentinventorycount_items',
                        fieldId: 'custpage_cwgp_internalsku'
                    }),
                    custpage_cwgp_upccode: currRec.getCurrentSublistValue({
                        sublistId: 'custpage_inventoryadjustmentinventorycount_items',
                        fieldId: 'custpage_cwgp_upccode'
                    }),
                })
            }
            else if(stStep == 2){
                const stQty = parseInt(currRec.getCurrentSublistValue({
                    sublistId: 'custpage_inventoryadjustmentinventorycount_items',
                    fieldId: 'custpage_cwgp_adjustqtyby'
                }));
                const stItemId = objICprevious.item[x].custpage_cwgp_item;
                const stLocation = objICprevious.body.custpage_cwgp_adjustmentlocation;
                objICprevious.item[x].custpage_cwgp_adjustqtyby = stQty;
                objICprevious.item[x].custpage_cwgp_hasdiscrepancy = parseInt(getItemQtyOnHand(stItemId, stLocation)) != stQty ? 'Yes' : 'No';
            }
            else if(stStep == 3){
                const stFinalQty = parseInt(currRec.getCurrentSublistValue({
                    sublistId: 'custpage_inventoryadjustmentinventorycount_items',
                    fieldId: 'custpage_cwgp_newquantity'
                }));
                const stItemId = objICprevious.item[x].custpage_cwgp_item;
                const stLocation = objICprevious.body.custpage_cwgp_adjustmentlocation;

                if(!isNaN(stFinalQty)){
                    objICprevious.item[x].custpage_cwgp_adjustqtyby = stFinalQty;
                }

                objICprevious.item[x].custpage_cwgp_enteredcount=  objICprevious.item[x].custpage_cwgp_adjustqtyby ;
                objICprevious.item[x].custpage_cwgp_discrepancy =  objICprevious.item[x].custpage_cwgp_adjustqtyby - parseInt(getItemQtyOnHand(stItemId, stLocation));
            }
            else if(stStep == 4){
                const stQty = parseInt(currRec.getCurrentSublistValue({
                    sublistId: 'custpage_inventoryadjustmentinventorycount_items',
                    fieldId: 'custpage_cwgp_adjustqtyby'
                }));
                /*const stItemId = objICprevious.item[x].custpage_cwgp_item;
                const stLocation = objICprevious.body.custpage_cwgp_adjustmentlocation;*/
                
                objICprevious.item[x].custpage_cwgp_businessline = objICprevious.body.custpage_cwgp_businessline;;
                objICprevious.item[x].custpage_cwgp_location = objICprevious.body.custpage_cwgp_adjustmentlocation;
                objICprevious.item[x].custpage_cwgp_adjustmenttype = 1;
                objICprevious.item[x].custpage_cwgp_adjustmentsubtypeid= 1;
                objICprevious.item[x].custpage_cwgp_adjustqtyby = stQty;
                objICprevious.item[x].custpage_cwgp_adjustmentreason = currRec.getCurrentSublistValue({
                    sublistId: 'custpage_inventoryadjustmentinventorycount_items',
                    fieldId: 'custpage_cwgp_adjustmentreason'
                });                
                objICprevious.item[x].custpage_cwgp_discrepancy = currRec.getCurrentSublistValue({
                    sublistId: 'custpage_inventoryadjustmentinventorycount_items',
                    fieldId: 'custpage_cwgp_discrepancy'
                });
            }
        }

        objIC = stStep != 1 ? objICprevious : objIC;
        
        const objRetailUrl = ClientEPLib._CONFIG.RETAIL_PAGE[ClientEPLib._CONFIG.ENVIRONMENT]
        


        console.log(JSON.stringify({
            pageMode: 'create',
            userId: stUserId,
            accesstype: stAccessType,
            rectype: stRecType,
            step: parseInt(stStep)+1,
            objIC: objIC
        }));

        sessionStorage.setItem("objIC", JSON.stringify(objIC));

        let stRetailUrl = url.resolveScript({
            deploymentId        : objRetailUrl.DEPLOY_ID,
            scriptId            : objRetailUrl.SCRIPT_ID,
            returnExternalUrl   : true,
            params: {
                pageMode    : 'create',
                userId      : stUserId,
                accesstype  : stAccessType,
                rectype     : stRecType,
                step: parseInt(stStep)+1,
                objIC: JSON.stringify(objIC)
            }
        });

        if (window.onbeforeunload) {
            window.onbeforeunload = function () {
                null;
            };
        };

        window.location = stRetailUrl;
        

   
    }
    function validateInventoryCount(intStep){
        const currRec = currentRecord.get();
        let stErrorMessage = '';
        let stEmptyField = 'You have empty values for the following field(s): '
        let stNegativeQty = 'You have a negative quantity for: '
        let stAddMissingLine = 'Please add at least one item to process.'
        let stHasDuplicates = 'You have entered duplicate items for: ';
        let blEmptyField;
        let blNegativeQty;
        let blAddMissingLine;
        let blHasDuplicates;
        let blIsError = false;

        const objBodyMandatoryFields = {
            ITEM: {
                id: 'custpage_cwgp_adjustmentaccount',
                label: 'Adjustment Account',
                steps: [1]
            },
            ITEM_ID: {
                id: 'custpage_cwgp_date',
                label: 'Date',
                steps: [1]
            }
        }

        const objItemMandatoryFields = {
            ITEM: {
                id: 'custpage_cwgp_item',
                label: 'Items',
                steps: [1]
            },
            QUANTITY: {
                id: 'custpage_cwgp_adjustqtyby',
                label: 'Quantity',
                steps: [2]
            },
        }

        const objQtyFields = {
            QUANTITY: {
                id: 'custpage_cwgp_adjustqtyby',
                label: 'Quantity',
                steps: [2]
            },
            NEW_QUANTITY: {
                id: 'custpage_cwgp_newquantity',
                label: 'New Quantity',
                steps: [3]
            }
        }
        


        const arrBodyMandatoryFieldsGrp = Object.keys(objBodyMandatoryFields);
        const arrItemMandatoryFieldsGrp = Object.keys(objItemMandatoryFields);
        const arrQtyFieldsFieldsGrp = Object.keys(objQtyFields);
        let objHasDuplicates = [];
        let stItemName;

        arrBodyMandatoryFieldsGrp.forEach((stCol) => {
            const { id, label, steps} = objBodyMandatoryFields[stCol];

            let stBodyFieldVal= currRec.getValue(id);
            if(steps.includes(intStep)){
                if(!stBodyFieldVal){
                    console.log(id)
                    blEmptyField = true;
                    stEmptyField += '\n -' + label;
                }
            }
        });

        const intInventoryCountLine = currRec.getLineCount('custpage_inventoryadjustmentinventorycount_items')
        for(var x = 0; x < intInventoryCountLine;x++){
            currRec.selectLine({
                sublistId: 'custpage_inventoryadjustmentinventorycount_items',
                line: x
            });
            arrItemMandatoryFieldsGrp.forEach((stCol) => {
                const { id, label, steps} = objItemMandatoryFields[stCol];
                if(steps.includes(intStep)){
                    let stItemFieldVal = currRec.getCurrentSublistValue({
                        sublistId: 'custpage_inventoryadjustmentinventorycount_items',
                        fieldId: id
                    })
                    if(!stItemFieldVal){
                        blEmptyField = true;
                        stEmptyField += '\n -' + label;
                    }

                    if(id == 'custpage_cwgp_item'){
                        stItemName= currRec.getCurrentSublistText({
                            sublistId: 'custpage_inventoryadjustmentinventorycount_items',
                            fieldId: id,
                        });


                        objHasDuplicates.push({
                            itemName: stItemName,
                        });
                    }

                }
            });

            arrQtyFieldsFieldsGrp.forEach((stCol) => {
                const { id, label, steps} = objQtyFields[stCol];
                if(steps.includes(intStep)){
                    let stItemFieldVal = currRec.getCurrentSublistValue({
                        sublistId: 'custpage_inventoryadjustmentinventorycount_items',
                        fieldId: id
                    })
                    if(!isNaN(stItemFieldVal)){
                        if(stItemFieldVal < 0){
                            blNegativeQty = true;
                            stNegativeQty += '\n -' + label;
                        }
                    }
                }
            });
            
        }
        
        if(intInventoryCountLine < 1){
            blAddMissingLine = true;
        }

        //Fine duplicate items
        var valueArr = objHasDuplicates.map(function(item){ return item.itemName });
        valueArr.some(function(item, idx){ 
            if(valueArr.indexOf(item) != idx){
                stHasDuplicates += '\n' + item;
                blHasDuplicates = true;
            }
        });

        console.log(JSON.stringify({
            blEmptyField: blEmptyField,
            blNegativeQty: blNegativeQty,
            blAddMissingLine: blAddMissingLine,
            blHasDuplicates: blHasDuplicates
        }));


        blIsError = blEmptyField == true ? blEmptyField : blNegativeQty == true ? blNegativeQty : blAddMissingLine == true ? blAddMissingLine : blHasDuplicates == true ? blHasDuplicates : blIsError;
        stErrorMessage += blEmptyField == true ? stEmptyField : blNegativeQty == true ? stNegativeQty : blAddMissingLine == true  ? stAddMissingLine : blHasDuplicates == true ? stHasDuplicates : '';

        console.log(JSON.stringify({
            blIsError: blIsError,
            stErrorMessage: stErrorMessage
        }));

        return [blIsError,stErrorMessage]
    }

    const scanInputViaBtn = ClientEPLib.scanInputViaBtn;


    return {
        pageInit,
        saveRecord,
        validateField,
        fieldChanged,
        lineInit,
        back,
        calculateSummary,
        nextStep,
        validateInventoryCount,
        scanInputViaBtn,
    };
});