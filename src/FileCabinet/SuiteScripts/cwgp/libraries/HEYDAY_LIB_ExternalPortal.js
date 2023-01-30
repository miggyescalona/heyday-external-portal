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

define(['N/search', 'N/ui/serverWidget', './HEYDAY_LIB_ConfExternalPortal.js'], (search, serverWidget, ConfEPLib) => {
    const _CONFIG = ConfEPLib._CONFIG

    const SCANNER_UI = {
        FIELD: {
            SCAN_UPC_CODES: {
                id          : 'custpage_cwgp_scanupccodes',
                type        : serverWidget.FieldType.LONGTEXT,
                label       : 'Scan UPC Codes',
                container   : 'SCAN',
            },
            SCAN_BUTTON: {
                id: 'custpage_cwgp_scanbtnhtml',
                type: serverWidget.FieldType.INLINEHTML,
                label: 'Scan UPC Codes',
                container: 'SCAN',
            },
            MAP_UPC_CODES: {
                id          : 'custpage_cwgp_upccodemap',
                type        : serverWidget.FieldType.LONGTEXT,
                label       : 'UPC Codes Map',
                container   : 'SCAN',
                displayType : 'hidden'
            },
        },
        FIELD_GROUP: {
            SCAN: {
                id      : 'custpage_interpo_scan_grp',
                label   : 'Scanner'
            }
        },
        // SCAN_BUTTON: {
        //     id          : 'custpage_cwgp_scanbtn',
        //     label       : 'Scan UPC Codes',
        //     functionName: `scanInputViaBtn()`
        // }
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
                    }),
                     search.createFilter({
                        name: 'type',
                        operator: search.Operator.ANYOF,
                        values: 'InvtPart'
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
            stType,
            stSubsidiary,
            _CONFIG
        } = options

        let objItemResultSet = {};
        let objUpcMap = {};

        try{

            //Get UPC Mapping
            try{

                objItemResultSet = getInvItemsBySubsidiary({stSubsidiary});

                
                objItemResultSet.each(function (result) {
                    objUpcMap[result.getValue({ name: 'custitemheyday_upccode' })] = result.id;
                    
                    return true;
                });
                
                //SCANNER_UI.FIELD.MAP_UPC_CODES['defaultValue'] = JSON.stringify(objUpcMap)

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
           
            log.debug('_CONFIG', _CONFIG.FIELD[stType].SCAN_UPC_CODES)
            
            return  {
                objItemResultSet,
                objUpcMap,
            };
        }catch(e){
            log.error('initScanner  - Error', e)
        }
    }

    const getScanButtonCss = () => {
        const stBtnCss = 
        `<input id="custpage_cwgp_scan_button" type="button">Process Codes</input>
        
        <style>

        input#custpage_cwgp_scan_button, 
        input#custpage_cwgp_scan_button {
            background-color: white !important;
            color: #105368 !important;
            font-family: 'Roboto Mono', monospace;
        }

        </style>`;

        return stBtnCss;
    };
    
        
    return {
        _CONFIG,
        SCANNER_UI,
        initScanner,
        getInvItemsBySubsidiary,
        getScanButtonCss
    }
});