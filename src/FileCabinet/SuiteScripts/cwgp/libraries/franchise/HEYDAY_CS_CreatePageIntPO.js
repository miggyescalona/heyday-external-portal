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

define(['N/https', 'N/util', 'N/url', 'N/currentRecord', '../HEYDAY_LIB_ClientExternalPortal.js'], (https, util, url, currentRecord, ClientEPLib) => {
    /**
     * Function to be executed when field is changed.
     *
     * @param {Object} context
     */
    
    const pageInit = (context) => {
        ClientEPLib.getAuthenticationScript();
        ClientEPLib.setScanBtnOnClick();
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

        const objCreateIntPOUrl = ClientEPLib._CONFIG.CREATE_INTPO_PAGE[ClientEPLib._CONFIG.ENVIRONMENT]
        
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

    const saveRecord = (context) => {
        const { currentRecord } = context;
        //console.log('context: ' + JSON.stringify(context));
        //console.log('mode: ' + JSON.stringify(context.mode));
        let stRecType = getParameterFromURL('rectype');
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

    return {
        pageInit,
        fieldChanged,
        lineInit,
        back,
        validateField,
        validateLine,
        saveRecord,
        calculateSummary
    };
});