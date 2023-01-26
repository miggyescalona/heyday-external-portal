/**
 * HEYDAY_LIB_ExternalPortal.js
 * Author: Louis Dumlao
 * Date: 2023-01-24
 *
 * Date         Modified By            Notes
 * 2023-01-24   Louis Dumlao           Initial File Creation
 */

/**
 * @NApiVersion 2.1
 * @NModuleScope Public
 */

define(['N/ui/serverWidget', './HEYDAY_LIB_ConfExternalPortal.js'], (serverWidget, ConfEPLib) => {
    const _CONFIG = ConfEPLib._CONFIG

    const SCANNER_UI = {
        FIELD: {
            SCAN_UPC_CODES: {
                id: 'custpage_cwgp_scanupccodes',
                type: serverWidget.FieldType.LONGTEXT,
                label: 'Scan UPC Codes',
                container: 'SCAN',
            },
            MAP_UPC_CODES: {
                id: 'custpage_cwgp_upccodemap',
                type: serverWidget.FieldType.LONGTEXT,
                label: 'UPC Codes Map',
                container: 'SCAN',
                displayType: 'hidden'
            },
        },
        FIELD_GROUP: {
            SCAN: {
                id: 'custpage_interpo_scan_grp',
                label: 'Scanner'
            }
        },
    }

    //Adds fields and field group into main _CONFIG file
    const appendScannerUiToConfig = (options) => {
        const {
            objConfig,
            objConfProperty,
            stType,
        } = options;
        try{
            
            objConfig[objConfProperty][stType] = {
                ...objConfig[objConfProperty][stType],
                ...SCANNER_UI[objConfProperty]
            }

        }catch(e){
            log.error('appendScannerFieldsToConfig Error', e)
        }
        return objConfig;
    }

    const buildSearch = (options) => {
        const {
            type, 
            filters,
            columns,
        } = options

        const objSearch = search.create({
            type,
            filters,
            columns
        })

        return objSearch;
    }

    const getInvItemsBySubsidiary = (options) => {
        const {
            stSubsidiary
        } = options

        try{
            let objItemSearchProps = {
                type: search.Type.INVENTORY_ITEM,
                filters:
                [
                    search.createFilter({
                        name: 'subsidiary',
                        operator: search.Operator.ANYOF,
                        values: stSubsidiary
                    })
                ],
                columns:
                [
                    search.createColumn({ name: 'itemid' }),
                    search.createColumn({ name: 'custitemheyday_upccode' })
                ]
            }
            
            return buildSearch(objItemSearchProps).run();
        }catch(e){
            log.error('getInvItemsBySubsidiary - Error', e)
            throw e;
        }
    }

    //Adds scanner UI, UPC Map into hidden fields, and searches inventory items by subsidiaary
    const initScanner = (options) => {
        const {
            stSubsidiary,
            _CONFIG
        } = options

        try{

            //Get UPC Mapping
            try{

                let objItemResultSet = getInvItemsBySubsidiary({stSubsidiary});
                
                let objUpcMap = {};
                
                objItemResultSet.each(function (result) {
                    objUpcMap[result.getValue({ name: 'custitemheyday_upccode' })] = result.id;
                    
                    return true;
                });
                
                SCANNER_UI.FIELD.SCAN_UPC_CODES['defaultValue'] = JSON.stringify(objUpcMap)
            }catch(e){
                log.error('getUpcMap - Error', e)
            }
            
            appendScannerUiToConfig({
                objConfig       : _CONFIG,
                objConfProperty : 'FIELD_GROUP',
                stType         
            })
            
            appendScannerUiToConfig({
                objConfig       : _CONFIG,
                objConfProperty : 'FIELD',
                stType         
            })
            
            return  {
                objItemResultSet,
                objUpcMap,
            };
        }catch(e){
            log.error('initScanner  - Error', e)
        }
    }
        
    return {
        _CONFIG,
        initScanner,
        getInvItemsBySubsidiary,
    }
});