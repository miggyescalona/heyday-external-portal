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

define(['N/https', 'N/util', 'N/url', '../HEYDAY_LIB_ClientExternalPortal.js', 'N/currentRecord', 'N/ui/message','N/runtime'], (https, util, url, ClientEPLib, currentRecord, message, runtime) => {
    /**
     * Function to be executed when field is changed.
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


        /*if(stSubType == 'damagetestertheft'){
            jQuery('#custpage_cwgp_totaladjustment_fs_lbl').hide();
            jQuery('#custpage_cwgp_itemsummary_fs_lbl').hide();
        }*/

        if(stRecType == 'franchisepo' && stPageMode == 'create'){
            let messageUI = message.create({
                title: 'Reminder',
                message: 'Item and Quantity requested are subject for approval.',
                type: message.Type.WARNING,
            });
            messageUI.show(); // will disappear after 20s
        }
        if(stRecType == 'inventorycount' && stPageMode == 'create' && stStep == '2'){
            console.log(sessionStorage.getItem("objIC"));
        }
    };

    const saveRecord = (context) => {
        const { currentRecord } = context;
        //console.log('context: ' + JSON.stringify(context));
        //console.log('mode: ' + JSON.stringify(context.mode));
        let stQuery = window.location.search;
        let objParams = new URLSearchParams(stQuery);
        let stRecType = objParams.get('rectype');
        let stPageMode = objParams.get('pageMode');
        let stStep = objParams.get('step');
        
        let intDiscrepancy;
        let stAdjustmentReason;
        let intTotalDiscrepancy = 0;

        if(stRecType == 'inventorycount' && stPageMode == 'create' && stStep == '4'){
            let arrHasDiscrepancy = [];

            const intICLineCount = currentRecord.getLineCount('custpage_inventoryadjustmentinventorycount_items');
            for(let x = 0; x < intICLineCount;x++){
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
                if(intDiscrepancy > 0 && !stAdjustmentReason){
                    arrHasDiscrepancy.push(x+1);
                }
            }
            if(arrHasDiscrepancy.length > 0){
                alert('Please enter an adjustment reason for line/s: ' + arrHasDiscrepancy.toString())
                return false;
            }
            currentRecord.setValue('custpage_cwgp_totaldiscrepancy', intTotalDiscrepancy);
        }


        //let stRecType = getParameterFromURL('rectype');
        console.log('stRecType '+stRecType);
             
        if(stRecType == 'franchisepo'){
            let pageMode = getParameterFromURL('pageMode');
            let numLines = currentRecord.getLineCount({
                sublistId: 'custpage_franchisepo_items'
            });
            if(numLines == 0){
                alert('Please select at least one item');
                return false;
            }

            if(pageMode == 'create'){
                alert('Item and Quantity requested are still subject for approval.');
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
                if(!stReceive){
                    inMarkCount = 1;
                }
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
            if(inMarkCount<1 && numLines>0){
                    
                alert('Please select an Item to receive');
                //break;
                return false;
            }

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

            /*if(intDamagedAccountLine.length > 0){
                alert('You need to select a Damaged Adjusting Account on the following lines: '+ intDamagedAccountLine.toString());
                return false;
            }*/

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
    
    const fieldChanged = (context) => {
        const { currentRecord, fieldId, sublistId, line} = context;

        if(fieldId == 'custpage_cwgp_date'){
            const dtDate = currentRecord.getValue({fieldId: 'custpage_cwgp_date'});
            if(dtDate){
                const dtDeliveryDate = addBusinessDays(dtDate,6);
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
                
                const dtDeliveryDateTemp = addBusinessDays(dtDate,6);
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
        /*if(sublistId === 'custpage_inventorayadjustment_items'){
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

        }*/

        ///Item Receipt
        if (sublistId === 'custpage_itemreceipt_items') {
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

                const stCustomer = currentRecord.getValue({fieldId: 'custpage_cwgp_customer'});
                console.log('stCustomer', stCustomer);
                const qtyOnHand = getQtyOnHandFranchise(stItem,stCustomer);
                
                currentRecord.setCurrentSublistValue({
                    sublistId: sublistId,
                    fieldId: 'custpage_cwgp_qtyonhand',
                    value: qtyOnHand
                });
                
            }

            if (fieldId === 'custpage_cwgp_quantity' || fieldId === 'custpage_cwgp_damagedquantity' || fieldId === 'custpage_cwgp_finalquantity') {
                const intStartingQty = parseInt(currentRecord.getSublistValue({
                    sublistId: 'custpage_itemreceipt_items',
                    fieldId: 'custpage_cwgp_startingquantityhidden',
                    line: line
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

                const stCustomer = currentRecord.getValue({fieldId: 'custpage_cwgp_customer'});
                console.log('stCustomer', stCustomer);
                const qtyOnHand = getQtyOnHandFranchise(stItem,stCustomer);
                
                currentRecord.setCurrentSublistValue({
                    sublistId: sublistId,
                    fieldId: 'custpage_cwgp_qtyonhand',
                    value: qtyOnHand
                });

                if(sublistId === 'custpage_inventorayadjustmentbackbar_items'){
                    currentRecord.setCurrentSublistValue({
                        sublistId: sublistId,
                        fieldId: 'custpage_cwgp_adjustmenttype',
                        value: 2
                    });
                }
                if(sublistId === 'custpage_inventorayadjustment_items'){
                    currentRecord.setCurrentSublistValue({
                        sublistId: sublistId,
                        fieldId: 'custpage_cwgp_adjustmenttype',
                        value: 6
                    });
                }

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
            'custpage_cwgp_upccode': item.custitemheyday_upccode,
            'custpage_cwgp_itemid': item.internalid[0].value
        };
    };

    const getQtyOnHandFranchise = (stItem,stCustomer) => {

        const objCreateIntPOUrl = ClientEPLib._CONFIG.CREATE_INTPO_PAGE[ClientEPLib._CONFIG.ENVIRONMENT];
        
        let stCreateIntPOBaseUrl = url.resolveScript({
            deploymentId        : objCreateIntPOUrl.DEPLOY_ID,
            scriptId            : objCreateIntPOUrl.SCRIPT_ID,
            returnExternalUrl   : true,
            params: {
                item:   stItem,
                customer: stCustomer
            }
        });

        const objResponse = https.get({
            url: stCreateIntPOBaseUrl,
        });

        const { stQtyOnHand } = JSON.parse(objResponse.body);
        console.log('qtyOnHandFranchise '+stQtyOnHand);

        return stQtyOnHand;

        /*return {
            'custpage_cwgp_description': item.salesdescription,
            'custpage_cwgp_rate': item.franchiseprice || 0,
            'custpage_cwgp_quantity': 1,
            'custpage_cwgp_amount': item.franchiseprice || 0,
            'custpage_cwgp_internalsku': item.custitem_heyday_sku || '',
            'custpage_cwgp_upccode': item.custitemheyday_upccode
        };*/
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
                    currentRecord.setCurrentSublistValue({
                        sublistId: sublistId,
                        fieldId: 'custpage_cwgp_adjustqtyby',
                        value: 1
                    });
                    return false;
                }
             
            }
            
            return true;
        }

        return true;
    }

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

    const getParameterFromURL = (param) => {
        if (param = (new RegExp('[?&]' + encodeURIComponent(param) + '=([^&]*)')).exec(location.search))
            return decodeURIComponent(param[1].replace(/\+/g, ' '));
    };

    /*function getParameterFromURL(param){
        var query = window.location.search.substring(1);
        var vars = query.split("&");
        for (var i = 0; i < vars.length; i++){
            var pair = vars[i].split("=");
            if (pair[0] == param){
                return decodeURIComponent(pair[1]);
            }
        }
        return (false);
    }*/

    function nextStep(stUserId,stAccessType,stStep, objICprevious, stRecType){

        const blReturnError = validateInventoryCount(stStep);
        if(blReturnError[0]){
            alert(blReturnError[1]);
            return false;
        }

        console.log('nextStep');
        const currRec = currentRecord.get();
        let objIC = {
            body: {},
            item: []
        };

        const stBodyFields = ['custpage_cwgp_userid','custpage_cwgp_htmlcss','custpage_cwgp_pagemode','custpage_cwgp_accesstype','custpage_cwgp_rectype','custpage_cwgp_location','custpage_cwgp_customer','custpage_cwgp_date','custpage_cwgp_memomain','custpage_cwgp_operator','custpage_cwgp_operatorhidden','custpage_cwgp_subsidiary']
        if(stStep == 1){
            for(let x = 0; x < stBodyFields.length;x++){
                objIC.body[stBodyFields[x]] = currRec.getValue(stBodyFields[x]);
            }
        }
        else{
            for(let x = 0; x < stBodyFields.length;x++){
                objICprevious.body[stBodyFields[x]] = currRec.getValue(stBodyFields[x]);
            }
            objICprevious.body['custpage_cwgp_adjustmentsubtypeid'] = 1;
        }
       
        const stCustomer = currRec.getValue({fieldId: 'custpage_cwgp_customer'});
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
                objICprevious.item[x].custpage_cwgp_hasdiscrepancy = parseInt(getQtyOnHandFranchise(stItemId, stCustomer)) != stQty ? 'Yes' : 'No';
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
                objICprevious.item[x].custpage_cwgp_qtyonhand = parseInt(getQtyOnHandFranchise(stItemId, stCustomer)) || 0;
                objICprevious.item[x].custpage_cwgp_enteredcount=  objICprevious.item[x].custpage_cwgp_adjustqtyby;
                objICprevious.item[x].custpage_cwgp_discrepancy =  objICprevious.item[x].custpage_cwgp_adjustqtyby - parseInt(getQtyOnHandFranchise(stItemId, stCustomer));
                console.log('custpage_cwgp_discrepancy '+objICprevious.item[x].custpage_cwgp_discrepancy);
                if(!objICprevious.item[x].custpage_cwgp_discrepancy){
                    objICprevious.item[x].custpage_cwgp_discrepancy =0;
                }
            }
            else if(stStep == 4){
                const stQty = parseInt(currRec.getCurrentSublistValue({
                    sublistId: 'custpage_inventoryadjustmentinventorycount_items',
                    fieldId: 'custpage_cwgp_adjustqtyby'
                }));
                /*const stItemId = objICprevious.item[x].custpage_cwgp_item;
                const stLocation = objICprevious.body.custpage_cwgp_adjustmentlocation;*/
                objICprevious.item[x].custpage_cwgp_qtyonhand = parseInt(getQtyOnHandFranchise(stItemId, stCustomer)) || 0;

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
            
            /*if(stStep == 1){
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

                objICprevious.item[x].custpage_cwgp_adjustqtyby = stQty;
                objICprevious.item[x].custpage_cwgp_hasdiscrepancy = parseInt(getQtyOnHandFranchise(stItemId, stCustomer)) != stQty ? 'Yes' : 'No';
            }
            else if(stStep == 3){
                const stFinalQty = parseInt(currRec.getCurrentSublistValue({
                    sublistId: 'custpage_inventoryadjustmentinventorycount_items',
                    fieldId: 'custpage_cwgp_newquantity'
                }));

                const stCount = parseInt(currRec.getSublistValue({
                    sublistId: 'custpage_inventoryadjustmentinventorycount_items',
                    fieldId: 'custpage_cwgp_adjustqtyby',
                    line: x
                }));

                const stItemId = objICprevious.item[x].custpage_cwgp_item;
                console.log('3 getQtyOnHandFranchise '+getQtyOnHandFranchise(stItemId, stCustomer));
                if(!isNaN(stFinalQty)){
                    console.log('stFinalQty '+stFinalQty);
                    objICprevious.item[x].custpage_cwgp_adjustqtyby = stFinalQty;
                }
                else{
                    console.log('stCount '+stCount);
                    objICprevious.item[x].custpage_cwgp_adjustqtyby = stCount;
                    
                }

                //objICprevious.item[x].custpage_cwgp_adjustqtyby = stFinalQty;
                
                objICprevious.item[x].custpage_cwgp_qtyonhand = parseInt(getQtyOnHandFranchise(stItemId, stCustomer));
                objICprevious.item[x].custpage_cwgp_discrepancy = parseInt(getQtyOnHandFranchise(stItemId, stCustomer)) - stFinalQty;
            }
            else if(stStep == 4){
                const stQty = parseInt(currRec.getCurrentSublistValue({
                    sublistId: 'custpage_inventoryadjustmentinventorycount_items',
                    fieldId: 'custpage_cwgp_adjustqtyby'
                }));
                const stItemId = objICprevious.item[x].custpage_cwgp_item;
                console.log('4 getQtyOnHandFranchise '+getQtyOnHandFranchise(stItemId, stCustomer));
                if(stQty){
                    objICprevious.item[x].custpage_cwgp_adjustqtyby = stQty;
                }
                objICprevious.item[x].custpage_cwgp_adjustqtyby = stQty;
                objICprevious.item[x].custpage_cwgp_adjustmenttype = 1;
                objICprevious.item[x].custpage_cwgp_adjustmentsubtypeid= 1;
                objICprevious.item[x].custpage_cwgp_qtyonhand = parseInt(getQtyOnHandFranchise(stItemId, stCustomer));

                objICprevious.item[x].custpage_cwgp_adjustmentreason = currRec.getCurrentSublistValue({
                    sublistId: 'custpage_inventoryadjustmentinventorycount_items',
                    fieldId: 'custpage_cwgp_adjustmentreason'
                });
            }*/
        }

        objIC = stStep != 1 ? objICprevious : objIC;

        const objFranchiseUrl = ClientEPLib._CONFIG.FRANCHISE_PAGE[ClientEPLib._CONFIG.ENVIRONMENT];
        console.log(JSON.stringify({
            pageMode: 'create',
            userId: stUserId,
            accesstype: stAccessType,
            rectype: stRecType,
            step: parseInt(stStep)+1,
            objIC: JSON.stringify(objIC)
        }));

        let stFranchiseUrl = url.resolveScript({
            deploymentId        : objFranchiseUrl.DEPLOY_ID,
            scriptId            : objFranchiseUrl.SCRIPT_ID,
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
        //console.log(parseInt(getQtyOnHandFranchise(stItemId, stCustomer)));
        window.location = stFranchiseUrl;
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
            /*ITEM: {
                id: 'custpage_cwgp_adjustmentaccount',
                label: 'Adjustment Account',
                steps: [1]
            },*/
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
        fieldChanged,
        lineInit,
        back,
        validateField,
        validateLine,
        saveRecord,
        calculateSummary,
        nextStep,
        validateInventoryCount,
        scanInputViaBtn
    };
});