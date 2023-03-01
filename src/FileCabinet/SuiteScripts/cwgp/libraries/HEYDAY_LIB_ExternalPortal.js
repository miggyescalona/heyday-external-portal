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
        }
    }

    //Adds fields and field group into main _CONFIG file
    const appendScannerUiToConfig = (options) => {
        const {
            objConfig,
            objConfProperty,
            stType,
            stSubType
        } = options;
        try{
            let stPageType = stType;
            if(stSubType){
                stPageType += `_${stSubType}`
            }

            objConfig[objConfProperty][stPageType] = {
                ...objConfig[objConfProperty][stPageType],
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
            stSubsidiary,
            stSubType
        } = options
        

        try{
            let filters = [
                 search.createFilter({
                    name: 'type',
                    operator: search.Operator.ANYOF,
                    values: 'InvtPart'
                }),
                search.createFilter({
                    name: 'isinactive',
                    operator: search.Operator.IS,
                    values: 'F'
                }),
                search.createFilter({
                    name: 'custitem_cwgp_item_extportal',
                    operator: search.Operator.IS,
                    values: 'T'
                }),
                
            ]

            if(stSubsidiary){
                filters.push(search.createFilter({
                    name: 'subsidiary',
                    operator: search.Operator.ANYOF,
                    values: stSubsidiary
                }))
            }

            if(stSubType == 'backbar'){
                filters.push(search.createFilter({
                    name: 'name',
                    operator: search.Operator.HASKEYWORDS,
                    values: 'Backbar'
                }))
            }
 

            let objItemSearchProps = {
                type: search.Type.INVENTORY_ITEM,
                filters,
                columns:
                [
                    search.createColumn({ name: 'itemid' }),
                    search.createColumn({ name: 'custitemheyday_upccode' }),
                    search.createColumn({ name: 'created' })
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
            stSubType,
            stSubsidiary,
            _CONFIG
        } = options

        let objItemResultSet = {};
        let objUpcMap = {};

        try{

            //Get UPC Mapping
            try{

                objItemResultSet = getInvItemsBySubsidiary({stSubsidiary,stSubType});

                
                objItemResultSet.each(function (result) {
                    let stUpcCode = result.getValue({ name: 'custitemheyday_upccode' })
                    if(!(objUpcMap.hasOwnProperty(stUpcCode))){
                        objUpcMap[stUpcCode] = result.id;
                    }
                    
                    return true;
                });
                
                //SCANNER_UI.FIELD.MAP_UPC_CODES['defaultValue'] = JSON.stringify(objUpcMap)

            }catch(e){
                log.error('getUpcMap - Error', e)
            }
            
            appendScannerUiToConfig({
                objConfig       : _CONFIG,
                objConfProperty : 'FIELD_GROUP',
                stType,
                stSubType
            })
            
            appendScannerUiToConfig({
                objConfig       : _CONFIG,
                objConfProperty : 'FIELD',
                stType       
            })
           
            log.debug('_CONFIG', _CONFIG.FIELD)
            
            return  {
                objItemResultSet,
                objUpcMap,
            };
        }catch(e){
            log.error('initScanner  - Error', e)
        }
    }

    const getScanButtonCss = (options) => {
        const {
            stPageType
        } = options;
        
        let stBtnDefCss = ''
        let stBtnCss    = '';
        
        try{    
            switch(stPageType){
                case 'itemreceipt': 
                    stBtnDefCss = `
                        <button id="custpage_cwgp_received_scan_btn" type="button" class="scanbutton">Add as<br />Received</button>
                        <button id="custpage_cwgp_damaged_scan_btn" type="button" class="scanbutton">Add as<br />Damaged</button>
                    `
                    break;
                case 'inventoryadjustment_standard':
                    stBtnDefCss = `
                        <button id="custpage_cwgp_add_adjustqty_scan_btn" type="button" class="scanbutton">Add<br />Quantity</button>
                        <button id="custpage_cwgp_subtract_adjustqty_scan_btn" type="button" class="scanbutton">Subtract<br />Quantity</button>
                        <button id="custpage_cwgp_endingqty_scan_btn" type="button" class="scanbutton">Ending<br />Quantity</button>
                    `
                    break;
                case 'inventoryadjustment_backbar':
                    stBtnDefCss = `
                        <button id="custpage_cwgp_backbar_scan_btn" type="button" class="scanbutton">Add to<br />Backbar Usage</button>
                    `
                    break;
                case 'inventoryadjustment_damagetestertheft':
                    stBtnDefCss = `
                        <button id="custpage_cwgp_dtt_scan_btn" type="button" class="scanbutton">Remove<br />Item</button>
                    `
                    break;
                case 'inventorycount':
                    log.debug('inventorycount', 'here')
                    stBtnDefCss = `
                        <button id="custpage_cwgp_count_scan_btn" type="button" class="scanbutton">Add to<br />Count</button>
                    `
                    break;
            }

            stBtnCss = `
                
                <span>
                    ${stBtnDefCss}
                </span>
                
                <style>

                .scanbutton {
                    font-family: 'Roboto', sans-serif;
                    font-family: 'Roboto Mono', monospace;
                    font-size: 14px !important;
                    font-weight: 600;
                    padding: 20px 15px;
                    margin: 20px 5px;
                    color: #105368;
                    background-color: transparent;
                    transition-duration: 0.4s;
                    background-position-x: 0%;
                    background-position-y: 0%;
                    background-repeat: repeat;
                    background-attachment: scroll;
                    background-image: none;
                    background-size: auto;
                    background-origin: padding-box;
                    background-clip: border-box;
                }

                .scanbutton:hover {
                    background-color: #105368;
                    color: white;
                }
                
                tr#tr_fg_custpage_interpo_scan_grp > td:first-child {
                    width: 1%
                }


                tr#tr_fg_custpage_interpo_scan_grp > td:nth-child(2) > table.table_fields>tbody{
                    display: grid;
                    height: 165px;
                    align-items: center;
                }

                </style>`;
        }catch(e){
            log.error('getScanButtonCss - Error', e)
        }

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