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
        let arrItemUpcCodes = stScannerInput.split(' ');
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
                    qty         : 1
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

        let stSublistId = ''
        let stFailedCodes = ''

        var recCurrent = currentRecord.get();

        try{

            switch(stPageType){
                case 'intercompanypo'   :   stSublistId = 'custpage_interpo_itemstab'
                                            break;
                case 'itemreceipt'      :   stSublistId = 'custpage_itemreceipt_itemstab'
                                            break;
            }

            let objUpcToItemIdMap = JSON.parse(stUpcMap);
            let arrItemLines = processScannerInput({stScannerInput})

            let arrFailedIndices = [];

            for(var ii = 0; ii < arrItemLines.length; ii++){
                
                let objCurrItemLine = arrItemLines[ii]
                //{upc_code: 12345, qty: 5}

                try{

                    objUpcToItemIdMap[objCurrItemLine.upc_code]


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
                catch(e){
                    arrFailedIndices.push(ii)
                }

            }

            //Get array of lines that failed
            let arrRemainingLines = arrItemLines.filter((element, index) => arrFailedIndices.includes(index))

            if(arrRemainingLines.length > 0){
                stFailedCodes = generateFailedScannerString({arrRemainingLines})
                
                recCurrent.setFieldValue({
                    id      : 'custpage_cwgp_scanupccodes',
                    value   : stFailedCodes
                })
            }
            return stFailedCodes;
        }
        catch(e){
            log.error('addScannedItemsToLines - Error', e)
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

