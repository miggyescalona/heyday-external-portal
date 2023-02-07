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

define(['N/https', 'N/util', 'N/url', '../libraries/HEYDAY_LIB_ClientExternalPortal.js'], (https, util, url, ClientEPLib) => {
    
    /**
     * Function to be executed after page is initialized.
     *
     * @param {Object} context
     */
    const pageInit = (context) => {

        const setScanBtnOnClick = () => {
            try{
                var objScanReceivedButton = document.getElementById('custpage_cwgp_received_scan_btn');
                objScanReceivedButton.addEventListener('click', function(){
                    ClientEPLib.scanInputViaBtn(ClientEPLib._CONFIG.SCAN_TYPE.RECEIVED)
                })
                var objScanDamagedButton = document.getElementById('custpage_cwgp_damaged_scan_btn');
                objScanDamagedButton.addEventListener('click', function(){
                    ClientEPLib.scanInputViaBtn(ClientEPLib._CONFIG.SCAN_TYPE.DAMAGED)
                })
            }catch(e){
                console.warn('Cannot set button click')
            }
        }

        ClientEPLib.getAuthenticationScript();
        setScanBtnOnClick();
    };

     const saveRecord = (context) => {
        const { currentRecord } = context;


        const intPoLineCount = currentRecord.getLineCount('custpage_interpo_items');
        const intIaLineCount = currentRecord.getLineCount('custpage_inventorayadjustment_items');
        const intIrLineCount = currentRecord.getLineCount('custpage_itemreceipt_items');

        if(intPoLineCount == 0 || intIaLineCount == 0){
            alert('Please enter a line before saving.')
            return false;
        }

        if(intPoLineCount > 0){
            let blAllZeroQuantity = true;
            for(let x = 0; x < intPoLineCount; x++){
                currentRecord.selectLine({
                    sublistId: 'custpage_interpo_items',
                    line: x
                });
                let intQuantity = parseInt(currentRecord.getCurrentSublistValue({
                    sublistId: 'custpage_interpo_items',
                    fieldId: 'custpage_cwgp_quantity'
                }));
                if(intQuantity < 0){
                    alert('You have a negative quantity at line number ' + (x+1) + '. Please only enter positive values when entering any quantity.')
                    return false;
                }

                if(intQuantity != 0 && intQuantity && intQuantity != ''){
                    blAllZeroQuantity = false;
                }
            }
            if(blAllZeroQuantity){
                alert('Please enter only non-zero/positive values for quantity.')
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

       /* if(intIaLineCount > 0){
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

                currentRecord.setCurrentSublistValue({
                    sublistId: 'custpage_itemreceipt_items',
                    fieldId: 'custpage_cwgp_finalquantity',
                    value: intFinalQty,
                    ignoreFieldChange: true
                });
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

                currentRecord.setCurrentSublistValue({
                    sublistId: 'custpage_itemreceipt_items',
                    fieldId: 'custpage_cwgp_variance',
                    value: intVariance,
                    ignoreFieldChange: true
                });
            }

        }

        ///Inventory Adjustment
        if (sublistId === 'custpage_inventorayadjustment_items') {
            //default item details
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

                const stLocation = currentRecord.getCurrentSublistValue({
                    sublistId: 'custpage_inventorayadjustment_items',
                    fieldId: 'custpage_cwgp_location'
                });
                console.log('stItem', stItem);

                const objQtyOnHand = getItemQtyOnHand(stItem,stLocation);
                console.log('objQtyOnHand', objQtyOnHand);

                currentRecord.setCurrentSublistValue({
                    sublistId: 'custpage_inventorayadjustment_items',
                    fieldId: 'custpage_cwgp_qtyonhand',
                    value: objQtyOnHand || 0
                });
            }

            const objSublist = currentRecord.getSublist({sublistId: "custpage_inventorayadjustment_items"});
            const objAdjQtyByCol = objSublist.getColumn({ fieldId: "custpage_cwgp_adjustqtyby" });
            const objEndingInvCol = objSublist.getColumn({ fieldId: "custpage_cwgp_endinginventoryqty" });
            if (fieldId === 'custpage_cwgp_adjustqtyby'){
                const stAdjustQtyBy = currentRecord.getCurrentSublistValue({
                    sublistId: 'custpage_inventorayadjustment_items',
                    fieldId: 'custpage_cwgp_adjustqtyby'
                });

                const stQtyOnHand = currentRecord.getCurrentSublistValue({
                    sublistId: 'custpage_inventorayadjustment_items',
                    fieldId: 'custpage_cwgp_qtyonhand'
                });

                const stNewQty = stAdjustQtyBy + stQtyOnHand;

                currentRecord.setCurrentSublistValue({
                    sublistId: 'custpage_inventorayadjustment_items',
                    fieldId: 'custpage_cwgp_newquantity',
                    value: stNewQty || 0
                });

                const stAdjQtyBy = currentRecord.getCurrentSublistValue({ sublistId: sublistId, fieldId: "custpage_cwgp_adjustqtyby" });
           
                if(stAdjQtyBy && stAdjQtyBy != 0){
                    objEndingInvCol.isDisabled = true;
                }
                else{
                    objEndingInvCol.isDisabled = false;
                }
            }
            if(fieldId === 'custpage_cwgp_endinginventoryqty'){
                const stEndingInvCol = currentRecord.getCurrentSublistValue({ sublistId: sublistId, fieldId: "custpage_cwgp_endinginventoryqty" });
        
                
                if(stEndingInvCol && stEndingInvCol != 0){
                    objAdjQtyByCol.isDisabled = true;
                }
                else{
                    objAdjQtyByCol.isDisabled = false;
                }

                currentRecord.setCurrentSublistValue({
                    sublistId: 'custpage_inventorayadjustment_items',
                    fieldId: 'custpage_cwgp_newquantity',
                    value: stEndingInvCol || 0
                });
            }
            
        }
    };

    function validateField(context) {
        const { currentRecord, fieldId, sublistId } = context;
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
                type: 'retail'
            }
        });

        const objResponse = https.get({
            url: `https://5530036-sb1.extforms.netsuite.com/app/site/hosting/scriptlet.nl?script=689&deploy=1&compid=5530036_SB1&h=2f0abb66a0cbb01e8d05&item=${stItem}`,
        });

        const { item } = JSON.parse(objResponse.body);

        return {
            'custpage_cwgp_description': item.purchasedescription,
            'custpage_cwgp_rate': item.franchiseprice || 0,
            'custpage_cwgp_quantity': 1,
            'custpage_cwgp_amount': item.cost || 0,
            'custpage_cwgp_internalsku': item.custitem_heyday_sku || '',
            'custpage_cwgp_upccode': item.custitemheyday_upccode,
            'custpage_cwgp_itemid': item.internalid[0].value
        };
    };

    const getItemQtyOnHand = (stItem,stLocation) =>{
        const objResponse = https.get({
            url: `https://5530036-sb1.extforms.netsuite.com/app/site/hosting/scriptlet.nl?script=689&deploy=1&compid=5530036_SB1&h=2f0abb66a0cbb01e8d05&item=${stItem}&itemlocation=${stLocation}`,
        });

        const { stQtyOnHand } = JSON.parse(objResponse.body);

        return stQtyOnHand;
    };

    const back = (stUserId, stAccessType, stRecType) =>{
        window.location = `https://5530036-sb1.extforms.netsuite.com/app/site/hosting/scriptlet.nl?script=686&deploy=1&compid=5530036_SB1&h=b8a78be5c27a4d76e7a8&pageMode=list&userId=${stUserId}&accesstype=${stAccessType}&rectype=${stRecType}`;
    };

    const getAuthenticationScript = () => {
        const validateToken = async (token) => {
            const result = await fetch('https://5530036-sb1.extforms.netsuite.com/app/site/hosting/scriptlet.nl?script=683&deploy=1&compid=5530036_SB1&h=13bf4568597809ee949b', {
                method: 'POST',
                body: JSON.stringify({
                    token: token,
                    requestType: 'validateToken'
                })
            });

            const objData = await result.json();

            if (objData.message != 'success') {
                return false;
            }

            return true;
        };

        const isLoggedIn = async () => {
            const stToken = window.localStorage.getItem('token');

            if (!stToken) { return false; }

            const isValidToken = await validateToken(stToken);

            if (isValidToken) {
                window.localStorage.setItem('token', stToken);
            }

            return isValidToken;
        };

        isLoggedIn().then((result) => {
            // If no token or not successful in validation, redirect to login page
            if (!result) {
                window.localStorage.removeItem('token');
                window.location = 'https://5530036-sb1.extforms.netsuite.com/app/site/hosting/scriptlet.nl?script=682&deploy=1&compid=5530036_SB1&h=3eb96116ea1325a68f66';

                return;
            }

            const stToken = window.localStorage.getItem('token');
       
            if (stToken) {
                const stDecodeToken = atob(stToken.split('.')[1]);
                const { accessType } = JSON.parse(stDecodeToken);

                const stQuery = window.location.search;
                const objParams = new URLSearchParams(stQuery);
                const stAccessTypeURL = objParams.get('accesstype');
                console.log('stAccessTypeURL', stAccessTypeURL);

                const bIsAccessTypeMismatched = (stAccessTypeURL != accessType);

                if (bIsAccessTypeMismatched) {
                    window.localStorage.removeItem('token');
                    window.location = 'https://5530036-sb1.extforms.netsuite.com/app/site/hosting/scriptlet.nl?script=682&deploy=1&compid=5530036_SB1&h=3eb96116ea1325a68f66';

                    return;
                }
            }

            const stBody = document.querySelector('body');
            stBody.style.filter = 'none';
            stBody.style.pointerEvents = 'auto';
        });
    };

    const scanInputViaBtn = ClientEPLib.scanInputViaBtn;


    return {
        pageInit,
        saveRecord,
        validateField,
        fieldChanged,
        lineInit,
        back,
        scanInputViaBtn
    };
});