/**
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

define(['N/currentRecord', 'N/url', './HEYDAY_LIB_ExternalPortal'], (currentRecord, url, EPLib) => {

    //
    const getAuthenticationScript = () => {

        const objAuthUrl = EPLib._CONFIG.AUTH_PAGE[EPLib._CONFIG.ENVIRONMENT]
        
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

            const objRenderUrl = EPLib._CONFIG.RENDER_PAGE[EPLib._CONFIG.ENVIRONMENT]

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

    const processScannerInput = (options) => {
        const {
            strScannerInput
        } = options;
        let arrItemUpcCodes = strScannerInput.split(' ');
        let arrItemLines = [];
        let intLineCount = 0;
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

        return arrItemLines;
    }

    const addScannedItemsToLines = (options) => {
        const {
            strUpcMap,
            strScannerInput,
            strPageType
        } = options
        let objUpcToItemIdMap = JSON.parse(strUpcMap);
        let arrItemLines = processScannerInput({strScannerInput})

        let arrFailedIndices = [];

        for(var ii = 0; ii < arrItemLines.length; ii++){
            
            let objCurrItemLine = arrItemLines[ii]
            //{upc_code: 12345, qty: 5}

            try{
                currentRecord.selectNewLine({
                    sublistId   : 'custpage_interpo_items',
                })
                currentRecord.setCurrentSublistValue({
                    sublistId   : 'custpage_interpo_items',
                    fieldId     : 'item',
                    value       : objUpcToItemIdMap[objCurrItemLine.upc_code]
                });
                
                currentRecord.setCurrentSublistValue({
                    sublistId   : 'custpage_interpo_items',
                    fieldId     : 'quantity',
                    value       : objCurrItemLine.qty
                });
                currentRecord.commitLine({
                    sublistId   : 'custpage_interpo_items'
                })

            }
            catch(e){
                arrFailedIndices.push[ii]
            }

        }

        //Get array of lines that failed
        let arrRemainingLines = arrItemLines.filter((element, index) => arrFailedIndices.includes(index))

        if(arrRemainingLines.length > 0){
            var strFailedCodes = generateFailedScannerString({arrRemainingLines})
            
            currentRecord.setFieldValue({
                id      : 'custpage_cwgp_scanupccodes',
                value   : strFailedCodes
            })
        }
    }

    const generateFailedScannerString = (options) => {
        const {
            arrRemainingLines
        } = options;
        
        let strFailedCodes = '';

        for(var ii = 0 ; ii < arrRemainingLines.length; ii++){
            let objCurrLine = arrRemainingLines[ii]
            for(var jj = 0; jj < objCurrLine.qty; jj++){
                strFailedCodes += objCurrLine.upc_code
                if(jj < objCurrLine.qty - 1){
                    strFailedCodes += ' '
                }
            }
            if(ii < arrRemainingLines.length - 1){
                strFailedCodes += ' '
            }
        }
        return 
    }

    return {
        getAuthenticationScript,
        processScannerInput,
        addScannedItemsToLines,
        generateFailedScannerString,
    }
});

