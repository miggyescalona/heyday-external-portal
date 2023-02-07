/**
 * HEYDAY_LIB_ClientExternalPortal.js
 * Author: Louis Dumlao
 * Date: 2023-01-19
 *
 * Date         Modified By            Notes
 * 2023-01-19   Louis Dumlao           Initial File Creation
 */

/**
 * @NApiVersion 2.1
 * @NModuleScope Public
 */

define(['N/currentRecord', 'N/ui/dialog', 'N/url', './HEYDAY_LIB_ConfExternalPortal.js'], (currentRecord, dialog, url, ConfEPLib) => {

    const _CONFIG = ConfEPLib._CONFIG;

    _CONFIG.SCAN_TYPE = {
        RECEIVED : 'custpage_cwgp_received_scan_btn',
        DAMAGED  : 'custpage_cwgp_damaged_scan_btn',
        ADJUST   : 'custpage_cwgp_adjustqty_scan_btn',
        ENDING   : 'custpage_cwgp_endingqty_scan_btn',
        BACKBAR  : 'custpage_cwgp_backbar_scan_btn',
        TESTER   : 'custpage_cwgp_add_scan_btn'
        
    }

    //Calls the authentication suitelet
    const getAuthenticationScript = () => {

        const objAuthUrl = _CONFIG.AUTH_PAGE[_CONFIG.ENVIRONMENT]
        
        let stAuthBaseUrl = url.resolveScript({
            deploymentId        : objAuthUrl.DEPLOY_ID,
            scriptId            : objAuthUrl.SCRIPT_ID,
            returnExternalUrl   : true
        });

        const validateToken = async (token) => {
            const result = await fetch(stAuthBaseUrl, {
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
                window.location = stRenderBaseURL;

                return;
            }

            const objRenderUrl = _CONFIG.RENDER_PAGE[_CONFIG.ENVIRONMENT]

            let stRenderBaseURL = url.resolveScript({
                deploymentId        : objRenderUrl.DEPLOY_ID,
                scriptId            : objRenderUrl.SCRIPT_ID,
                returnExternalUrl   : true
            });

            const stToken = window.localStorage.getItem('token');
       
            if (stToken) {
                const stDecodeToken = atob(stToken.split('.')[1]);
                const { accessType } = JSON.parse(stDecodeToken);

                const stQuery = window.location.search;
                const objParams = new URLSearchParams(stQuery);
                const stAccessTypeURL = objParams.get('accesstype');

                const bIsAccessTypeMismatched = (stAccessTypeURL != accessType);

                if (bIsAccessTypeMismatched) {
                    window.localStorage.removeItem('token');
                    window.location = stRenderBaseURL;

                    return;
                }
            }

            const stBody = document.querySelector('body');
            stBody.style.filter = 'none';
            stBody.style.pointerEvents = 'auto';
        });
    };


    //BEGIN SCANNER FUNCTIONS 
    const processScannerInput = (options) => {
        const {
            stScannerInput
        } = options;

        //Split scanner input string by any whitespace (from space, tab, enter), and filter only elements that are not empty 
        let arrItemUpcCodes = stScannerInput.split(/\s+/).filter(el => el)
        let arrItemLines = [];
        for(var ii = 0; ii < arrItemUpcCodes.length; ii++){ 
            let intItemUpcCode = arrItemUpcCodes[ii];
            
            const checkIfExisting = (objItemLine) => intItemUpcCode == objItemLine.upc_code;

            let objItemLine = arrItemLines.find(checkIfExisting);

            if(objItemLine){
                objItemLine.qty++;
            }
            else{
                arrItemLines.push({
                    upc_code    : intItemUpcCode,
                    qty         : 1,
                    error       : ''
                })
            }
            

            // //increment quantity based on scanned input
            // if(!(objItemLines.hasOwnProperty(intItemUpcCode))){
            //     objItemLines[intItemUpcCode] = {linenum: intLineCount, qty: 1};
            //     intLineCount++;
            // }
            // else{
            //     objItemLines[intItemUpcCode]?.qty++;
            // }
        }

        return arrItemLines;
    }

    //Processes scanner input into sublist lines
    const addScannedItemsToLines = (options) => {
        const {
            stUpcMap,
            stScannerInput,
            stScanType,
            stRecType,
            stSubType,
            recCurrent
        } = options;

        let stPageType = stRecType;
        if(stSubType){
            stPageType += `_${stSubType}`
        }

        let UI_CONFIG = {}

        //Map sublist fields based on record type
        switch(stPageType){
            case 'intercompanypo'   :   
            case 'franchisepo'      :
                UI_CONFIG = {
                    SUBLIST_ID      : 'custpage_interpo_items',
                    SUBLIST_FIELDS  : {
                        ITEM_ID : 'custpage_cwgp_itemid',
                        ITEM    : 'custpage_cwgp_item',
                        QTY     : 'custpage_cwgp_quantity'
                    }
                }
                break;
            case 'itemreceipt'      :   
                UI_CONFIG = {
                    SUBLIST_ID      : 'custpage_itemreceipt_items',
                    SUBLIST_FIELDS  : {
                        ITEM_ID         : 'custpage_cwgp_itemid',
                        ITEM            : 'custpage_cwgp_item',
                    }
                }    
                if(stScanType == _CONFIG.SCAN_TYPE.RECEIVED){
                    UI_CONFIG.SUBLIST_FIELDS['QTY']     = 'custpage_cwgp_quantity'
                    UI_CONFIG.SUBLIST_FIELDS['MAX_QTY'] = 'custpage_cwgp_shippedquantity'
                    
                }
                else if(stScanType == _CONFIG.SCAN_TYPE.DAMAGED){
                    UI_CONFIG.SUBLIST_FIELDS['QTY']     = 'custpage_cwgp_damagedquantity'
                    UI_CONFIG.SUBLIST_FIELDS['MAX_QTY'] = 'custpage_cwgp_quantity'
                }
                break;
            case 'inventoryadjustment_standard':   
                UI_CONFIG = {
                    SUBLIST_ID      : 'custpage_inventorayadjustment_items',
                    SUBLIST_FIELDS  : {
                        ITEM_ID     : 'custpage_cwgp_itemid',
                        ITEM        : 'custpage_cwgp_item',
                        ADJUST_QTY  : 'custpage_cwgp_adjustqtyby',
                        ENDING_QTY  : 'custpage_cwgp_endinginventoryqty'
                    }
                }
                if(stScanType == _CONFIG.SCAN_TYPE.ADJUST){
                    UI_CONFIG.SUBLIST_FIELDS['QTY']     = 'custpage_cwgp_adjustqtyby'
                }
                else if(stScanType == _CONFIG.SCAN_TYPE.ENDING){
                    UI_CONFIG.SUBLIST_FIELDS['QTY']     = 'custpage_cwgp_endinginventoryqty'
                }
                break;
        }

        //console.table(UI_CONFIG)

        const addItemLine = (options) => {
            const {
                recCurrent,
                objUpcToItemIdMap,
                stPageType,
                objCurrItemLine,
                stScanType,
                UI_CONFIG
            } = options;


            console.log(objUpcToItemIdMap[objCurrItemLine.upc_code]);

            if(!(objUpcToItemIdMap.hasOwnProperty(objCurrItemLine.upc_code))){
                throw {
                    name    : 'NO_UPC_CODE_MATCH',
                    message : 'No item matched the UPC Code entered.'
                }
            }

            if(stPageType == 'intercompanypo' || stPageType == 'franchisepo'){

                let index = recCurrent.findSublistLineWithValue({
                    sublistId   : UI_CONFIG.SUBLIST_ID,
                    fieldId     : UI_CONFIG.SUBLIST_FIELDS.ITEM_ID,
                    value       : objUpcToItemIdMap[objCurrItemLine.upc_code]
                })
                let intQty = 0;
                let intScannedQty = 0;

                //If line already exists, just update it
                if(index > -1){
                    recCurrent.selectLine({
                        sublistId   : UI_CONFIG.SUBLIST_ID,
                        line        : index

                    })
                    intQty = recCurrent.getCurrentSublistValue({
                        sublistId   : UI_CONFIG.SUBLIST_ID,
                        fieldId     : UI_CONFIG.SUBLIST_FIELDS.QTY,
                    });
                }
                else{
                    recCurrent.selectNewLine({ 
                        sublistId   : UI_CONFIG.SUBLIST_ID,
                    })
                    recCurrent.setCurrentSublistValue({
                        sublistId   : UI_CONFIG.SUBLIST_ID,
                        fieldId     : UI_CONFIG.SUBLIST_FIELDS.ITEM,
                        value       : objUpcToItemIdMap[objCurrItemLine.upc_code]
                    });
                }

                try{
                    intQty          = parseInt(intQty)
                    intScannedQty   = parseInt(objCurrItemLine.qty)
                    
                    //Default all falsy values to 0
                    if(!intScannedQty){
                        intScannedQty = 0;
                    }
                    if(!intQty){
                        intQty = 0;
                    }
                }
                catch(e){
                    console.error(e)
                    throw {
                        name    : 'CANNOT_PROCESS_QTY',
                        message : 'Existing line quantity, and/or scanned quantity is/are invalid.'
                    }
                }
                recCurrent.setCurrentSublistValue({
                    sublistId   : UI_CONFIG.SUBLIST_ID,
                    fieldId     : UI_CONFIG.SUBLIST_FIELDS.QTY,
                    value       : intQty + intScannedQty
                });
                recCurrent.commitLine({
                    sublistId   : UI_CONFIG.SUBLIST_ID
                })

            }
            else if(stPageType == 'itemreceipt'){
                let index = recCurrent.findSublistLineWithValue({
                    sublistId   : UI_CONFIG.SUBLIST_ID,
                    fieldId     : UI_CONFIG.SUBLIST_FIELDS.ITEM_ID,
                    value       : objUpcToItemIdMap[objCurrItemLine.upc_code]
                })

                // console.table({
                //     intItem: objUpcToItemIdMap[objCurrItemLine.upc_code],
                //     index
                // })
                

                if(index > -1){
                    // recCurrent.selectLine({ 
                    //     sublistId   : UI_CONFIG.SUBLIST_ID,
                    //     line        : index
                    // })      
                    
                    let intMaxQty = recCurrent.getSublistValue({
                        sublistId   : UI_CONFIG.SUBLIST_ID,
                        fieldId     : UI_CONFIG.SUBLIST_FIELDS.MAX_QTY,
                        line        : index
                    });
                    
                    let intQty = recCurrent.getSublistValue({
                        sublistId   : UI_CONFIG.SUBLIST_ID,
                        fieldId     : UI_CONFIG.SUBLIST_FIELDS.QTY,
                        line        : index
                    });

                    let intScannedQty = objCurrItemLine.qty

                    try{
                        intMaxQty = parseInt(intMaxQty)
                        intQty          = parseInt(intQty)
                        intScannedQty   = parseInt(intScannedQty)
                        
                        //Default all falsy values to 0
                        if(!intMaxQty){
                            intMaxQty = 0;
                        }
                        if(!intQty){
                            intQty = 0;
                        }
                    }
                    catch(e){
                        throw {
                            name    : 'CANNOT_PROCESS_QTY',
                            message : 'Quantity, scanned quantity, and/or quantity remaining is/are invalid.'
                        }
                    }
                    let intNewQty = intScannedQty + intQty;
                    let intQtyToSet;
                    let blOverRcvd = false;

                    if(intMaxQty >= intNewQty){
                        intQtyToSet = intNewQty
                    }
                    //If received quantity exceeds quantity remaining
                    else{
                        intQtyToSet = intMaxQty
                        objCurrItemLine.qty = intNewQty - intMaxQty
                        blOverRcvd = true;
                    }
                    // console.table({
                    //     intMaxQty,
                    //     intQty,
                    //     intScannedQty,
                    //     intNewQty,
                    //     intQtyToSet
                    // })

                    recCurrent.selectLine({
                        sublistId   : UI_CONFIG.SUBLIST_ID,
                        line        : index
                    });

                    recCurrent.setCurrentSublistValue({
                        sublistId   : UI_CONFIG.SUBLIST_ID,
                        fieldId     : UI_CONFIG.SUBLIST_FIELDS.QTY,
                        value       : intQtyToSet,
                    });
                    recCurrent.commitLine({
                        sublistId   : UI_CONFIG.SUBLIST_ID
                    })
                    if(blOverRcvd){
                        let objError = {
                            name    : 'EXCESS_SCANNED_QTY',
                            message : ''
                        }
                        if(stScanType == _CONFIG.SCAN_TYPE.RECEIVED){
                            objError['message'] = 'Total received quantity exceeds shipped quantity. Only the maximum allowed receivable quantity was set.'
                        }
                        else if(stScanType == _CONFIG.SCAN_TYPE.DAMAGED){
                            objError['message'] = 'Total damaged quantity exceeds received quantity. Only the maximum allowed damaged quantity was set.'
                        }
                        throw objError;
                    }
                }
                else{
                    throw {
                        name    : 'NO_ITEM_LINE_MATCH',
                        message : 'The scanned code does not match any item to be received. Otherwise, verify that the UPC Code is not shared by other items.'
                    }
                }
            }
            else if(stPageType == 'inventoryadjustment_standard'){
                let index = recCurrent.findSublistLineWithValue({
                    sublistId   : UI_CONFIG.SUBLIST_ID,
                    fieldId     : UI_CONFIG.SUBLIST_FIELDS.ITEM_ID,
                    value       : objUpcToItemIdMap[objCurrItemLine.upc_code]
                })
                let intQty = 0;
                let intScannedQty = 0;

                //If line already exists, just update it
                if(index > -1){
                    recCurrent.selectLine({
                        sublistId   : UI_CONFIG.SUBLIST_ID,
                        line        : index

                    })
                    intQty = recCurrent.getCurrentSublistValue({
                        sublistId   : UI_CONFIG.SUBLIST_ID,
                        fieldId     : UI_CONFIG.SUBLIST_FIELDS.QTY,
                    });
                }
                else{
                    recCurrent.selectNewLine({ 
                        sublistId   : UI_CONFIG.SUBLIST_ID,
                    })
                    recCurrent.setCurrentSublistValue({
                        sublistId   : UI_CONFIG.SUBLIST_ID,
                        fieldId     : UI_CONFIG.SUBLIST_FIELDS.ITEM,
                        value       : objUpcToItemIdMap[objCurrItemLine.upc_code]
                    });
                }

                try{
                    intQty          = parseInt(intQty)
                    intScannedQty   = parseInt(objCurrItemLine.qty)
                    
                    //Default all falsy values to 0
                    if(!intScannedQty){
                        intScannedQty = 0;
                    }
                    if(!intQty){
                        intQty = 0;
                    }
                }
                catch(e){
                    console.error(e)
                    throw {
                        name    : 'CANNOT_PROCESS_QTY',
                        message : 'Existing line quantity, and/or scanned quantity is/are invalid.'
                    }
                }
                recCurrent.setCurrentSublistValue({
                    sublistId   : UI_CONFIG.SUBLIST_ID,
                    fieldId     : UI_CONFIG.SUBLIST_FIELDS.QTY,
                    value       : intQty + intScannedQty
                });
                recCurrent.commitLine({
                    sublistId   : UI_CONFIG.SUBLIST_ID
                })
            }
            else if(stPageType == 'inventoryadjustment_backbar'){

                let intScannedQty = 0;

                try{
                    intScannedQty   = parseInt(objCurrItemLine.qty)
                }
                catch(e){
                    console.error(e)
                    throw {
                        name    : 'CANNOT_PROCESS_QTY',
                        message : 'Existing line quantity, and/or scanned quantity is/are invalid.'
                    }
                }

                for(var ii = 0; ii < intScannedQty; ii++){
                    recCurrent.selectNewLine({ 
                        sublistId   : UI_CONFIG.SUBLIST_ID,
                    })
                    recCurrent.setCurrentSublistValue({
                        sublistId   : UI_CONFIG.SUBLIST_ID,
                        fieldId     : UI_CONFIG.SUBLIST_FIELDS.ITEM,
                        value       : objUpcToItemIdMap[objCurrItemLine.upc_code]
                    });
    
                    recCurrent.setCurrentSublistValue({
                        sublistId   : UI_CONFIG.SUBLIST_ID,
                        fieldId     : UI_CONFIG.SUBLIST_FIELDS.QTY,
                        value       : -1
                    });
                    recCurrent.commitLine({
                        sublistId   : UI_CONFIG.SUBLIST_ID
                    })
                }
                
            }
        }

        let stFailedCodes = ''
        
        let objFailedIndices = {};

        // var recCurrent = currentRecord.get();

        try{

            let objUpcToItemIdMap = JSON.parse(stUpcMap);
            let arrItemLines = processScannerInput({stScannerInput})

            for(var ii = 0; ii < arrItemLines.length; ii++){
                
                let objCurrItemLine = arrItemLines[ii]
                //{upc_code: 12345, qty: 5}

                try{
                    addItemLine({
                        recCurrent,
                        objUpcToItemIdMap,
                        stPageType,
                        objCurrItemLine,
                        stScanType,
                        UI_CONFIG
                    })
                }
                catch(e){
                    objFailedIndices[ii] = e
                }

            }

            //Get array of lines that failed and map error to them
            //Map first to preserve index reference
            arrItemLines.map((element, index) => { 
                if(objFailedIndices.hasOwnProperty(index)){
                    element.error = objFailedIndices[index]
                }
            })
            let arrRemainingLines = arrItemLines.filter((element, index) => objFailedIndices.hasOwnProperty(index))

            if(arrRemainingLines.length > 0){
                stFailedCodes = generateScanErrorSummary({arrRemainingLines})
            }
            return stFailedCodes;
        }
        catch(e){
            console.log('addScannedItemsToLines - Error', e)
            return null;
        }
    }

    //Creates a string of all remaining UPC Codes that were not successfully added to the lines
    const generateScanErrorSummary = (options) => {
        const {
            arrRemainingLines
        } = options;
        console.table(arrRemainingLines)
        let stFailedCodes = '';
        let stErrorSummary = ''

        try{
            
            for(var ii = 0 ; ii < arrRemainingLines.length; ii++){
                let objCurrLine = arrRemainingLines[ii]
                for(var jj = 0; jj < objCurrLine.qty; jj++){
                    stFailedCodes +=    objCurrLine.upc_code
                    if(jj < objCurrLine.qty - 1){
                        stFailedCodes   += ' '
                    }
                }
                stErrorSummary+=    `<b>${objCurrLine.upc_code}: ${objCurrLine.error.name}</b>
                                    <br />
                                    ${objCurrLine.error.message}`
                if(ii < arrRemainingLines.length - 1){
                    stFailedCodes   += ' '
                    stErrorSummary  += '<br /><br />'

                }
            }

            if(stErrorSummary){
                dialog.alert({
                    title: 'UPC Code Errors',
                    message: stErrorSummary
                })
            }
        }
        catch(e){
            console.error('generateScanErrorSummary - Error', e)
        }
        return stFailedCodes;
    }

    const scanInputViaBtn = (stScanType) => {
        let recCurrent = currentRecord.get();

        let stScannerInput = recCurrent.getValue({fieldId: 'custpage_cwgp_scanupccodes'})
        let stUpcMap = recCurrent.getValue({fieldId: 'custpage_cwgp_upccodemap'})
        if(stScannerInput){

            let urlParams = new URL(window.location).searchParams;

            let stFailedCodes = addScannedItemsToLines({
                stUpcMap,
                stScannerInput,
                stScanType,
                stRecType: urlParams.get('rectype'),
                stSubType: urlParams.get('subtype'),
                recCurrent
            })

            if(stScannerInput != stFailedCodes){
                
                recCurrent.setValue({
                    fieldId             : 'custpage_cwgp_scanupccodes',
                    value               : stFailedCodes,
                    ignoreFieldChange   : true,
                })
            }
        }
    }

    const setScanBtnOnClick = () => {
        try{
            const stQuery = window.location.search;
            const objParams = new URLSearchParams(stQuery);
            let stRecType  = objParams.get('rectype')
            let stSubType  = objParams.get('subtype')

            console.log('stRecType', stRecType)
            console.log('stSubType', subtype)

            let stPageType = stRecType;
            if(stSubType){
                stPageType += `_${stSubType}`
            }

            if(stPageType == 'itemreceipt'){
                console.log('IR Scan Buttons Set')
                addBtnListener({stBtnAction: 'RECEIVED'})
                addBtnListener({stBtnAction: 'DAMAGED'})
            }

            else if(stPageType == 'inventoryadjustment_standard'){
                console.log('IA Scan Buttons Set')
                addBtnListener({stBtnAction: 'ADJUST'})
                addBtnListener({stBtnAction: 'ENDING'})
            }
            else if(stPageType == 'inventoryadjustment_backbar'){
                console.log('IA Scan Buttons Set')
                addBtnListener({stBtnAction: 'BACKBAR'})
            }
        }catch(e){
            console.warn('Cannot Set Scanner Button Functions', e)
        }

        const addBtnListener = (options) => {
            const {
                stBtnAction
            } = options;

            let objScanButton = document.getElementById(_CONFIG.SCAN_TYPE[stBtnAction]);
            if(objScanButton){
                objScanButton.addEventListener('click', function(){
                    scanInputViaBtn(_CONFIG.SCAN_TYPE[stBtnAction])
                })
            }
            return objScanButton;
        }
    }

    //END SCANNER FUNCTIONS

    return {
        _CONFIG,
        getAuthenticationScript,
        addScannedItemsToLines,
        generateScanErrorSummary,
        setScanBtnOnClick,
        scanInputViaBtn
    }
});

