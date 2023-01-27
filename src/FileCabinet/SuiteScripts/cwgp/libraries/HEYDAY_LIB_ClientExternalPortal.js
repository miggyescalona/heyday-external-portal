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

define(['N/currentRecord', 'N/url', './HEYDAY_LIB_ConfExternalPortal.js'], (currentRecord, url, ConfEPLib) => {

    const _CONFIG = ConfEPLib._CONFIG;

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
                console.log('stAccessTypeURL', stAccessTypeURL);

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
        console.log(arrItemLines)

        return arrItemLines;
    }

    const addScannedItemsToLines = (options) => {
        const {
            stUpcMap,
            stScannerInput,
            stPageType
        } = options;

        const addItemLine = (options) => {
            const {
                recCurrent,
                objUpcToItemIdMap,
                stPageType,
                objCurrItemLine,
                stSublistId,
            } = options;

            console.log(stSublistId);
            console.log(objUpcToItemIdMap[objCurrItemLine.upc_code]);

            if(!(objUpcToItemIdMap.hasOwnProperty(objCurrItemLine.upc_code))){
                throw {
                    name    : 'NO_UPC_CODE_MATCH',
                    message : 'No valid item was found for the UPC Code entered'
                }
            }

            if(stPageType == 'intercompanypo'){

                recCurrent.selectNewLine({ 
                    sublistId   : stSublistId,
                })
                recCurrent.setCurrentSublistValue({
                    sublistId   : stSublistId,
                    fieldId     : 'custpage_cwgp_item',
                    value       : objUpcToItemIdMap[objCurrItemLine.upc_code]
                });
                
                recCurrent.setCurrentSublistValue({
                    sublistId   : stSublistId,
                    fieldId     : 'custpage_cwgp_quantity',
                    value       : objCurrItemLine.qty
                });
                recCurrent.commitLine({
                    sublistId   : stSublistId
                })

            }
            else if(stPageType == 'itemreceipt'){
                let index = recCurrent.findSublistLineWithValue({
                    sublistId   : stSublistId,
                    fieldId     : 'custpage_cwgp_itemid',
                    value       : objUpcToItemIdMap[objCurrItemLine.upc_code]
                })

                console.table({
                    intItem: objUpcToItemIdMap[objCurrItemLine.upc_code],
                    index
                })
                

                if(index > -1){
                    // recCurrent.selectLine({ 
                    //     sublistId   : stSublistId,
                    //     line        : index
                    // })      
                    
                    let intQtyRemaining = recCurrent.getSublistValue({
                        sublistId   : stSublistId,
                        fieldId     : 'custpage_cwgp_quantityremaining',
                        line        : index
                    });

                    console.log('intQtyRemaining', intQtyRemaining)
                    
                    let intQty = recCurrent.getSublistValue({
                        sublistId   : stSublistId,
                        fieldId     : 'custpage_cwgp_quantity',
                        line        : index
                    });

                    let intScannedQty = objCurrItemLine.qty

                    try{
                        intQtyRemaining = parseInt(intQtyRemaining)
                        intQty          = parseInt(intQty)
                        intScannedQty   = parseInt(intScannedQty)
                        
                        //Default all falsy values to 0
                        if(!intQtyRemaining){
                            intQtyRemaining = 0;
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
                    let intRcvdQty = intScannedQty + intQty;
                    let intQtyToSet;
                    let blOverRcvd = false;

                    if(intQtyRemaining > intRcvdQty){
                        intQtyToSet = intRcvdQty
                    }
                    //If received quantity exceeds quantity remaining
                    else{
                        intQtyToSet = intQtyRemaining
                        objCurrItemLine.qty = intRcvdQty - intQtyRemaining
                        blOverRcvd = true;
                    }
                    console.table({
                        intQtyRemaining,
                        intQty,
                        intScannedQty,
                        intRcvdQty,
                        intQtyToSet
                    })

                    recCurrent.selectLine({
                        sublistId   : stSublistId,
                        line        : index
                    });

                    recCurrent.setCurrentSublistValue({
                        sublistId   : stSublistId,
                        fieldId     : 'custpage_cwgp_quantity',
                        value       : intQtyToSet,
                    });
                    recCurrent.commitLine({
                        sublistId   : stSublistId
                    })
                    if(blOverRcvd){
                        throw {
                            name    : 'EXCESS_SCANNED_QTY',
                            message : 'Total received quantity exceeds quantity remaining. Only the maximum allowed receivable quantity was set.'
                        }
                    }
                }
                else{
                    throw {
                        name    : 'NO_ITEM_LINE_MATCH',
                        message : 'The scanned item was not found in the list of items to be received.'
                    }
                }
            }
        }

        let stSublistId = ''
        let stFailedCodes = ''
        
        let objFailedIndices = {};

        var recCurrent = currentRecord.get();

        try{

            switch(stPageType){
                case 'intercompanypo'       :   stSublistId = 'custpage_interpo_items'
                                                break;
                case 'itemreceipt'          :   stSublistId = 'custpage_itemreceipt_items'
                                                break;
                case 'inventoryadjustment'  :   stSublistId = 'custpage_inventorayadjustment_items';
            }

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
                        stSublistId,
                    })
                }
                catch(e){
                    console.log(e)
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
            console.log('arrRemainingLines', arrRemainingLines)
            console.log('objFailedIndices', objFailedIndices)

            if(arrRemainingLines.length > 0){
                stFailedCodes = generateFailedScannerString({arrRemainingLines})
            }
            return stFailedCodes;
        }
        catch(e){
            console.log('addScannedItemsToLines - Error', e)
            return null;
        }
    }

    const generateFailedScannerString = (options) => {
        const {
            arrRemainingLines
        } = options;
        
        let stFailedCodes = '';

        try{
            
            for(var ii = 0 ; ii < arrRemainingLines.length; ii++){
                let objCurrLine = arrRemainingLines[ii]
                for(var jj = 0; jj < objCurrLine.qty; jj++){
                    stFailedCodes += objCurrLine.upc_code
                    if(jj < objCurrLine.qty - 1){
                        stFailedCodes += ' '
                    }
                }
                if(ii < arrRemainingLines.length - 1){
                    stFailedCodes += ' '
                }
            }
        }
        catch(e){
            log.error('generateFailedScannerString - Error', e)
        }
        return stFailedCodes;
    }

    //END SCANNER FUNCTIONS

    return {
        _CONFIG,
        getAuthenticationScript,
        addScannedItemsToLines,
        generateFailedScannerString,
    }
});

