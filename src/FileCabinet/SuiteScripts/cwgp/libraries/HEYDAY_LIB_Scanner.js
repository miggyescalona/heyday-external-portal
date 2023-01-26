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

define(['N/currentRecord', 'N/url', './HEYDAY_LIB_ClientExternalPortal', './HEYDAY_LIB_ExternalPortal'], (currentRecord, url, ClientEPLib, EPLib) => {

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
        processScannerInput,
        addScannedItemsToLines,
        generateFailedScannerString,
    }
});

