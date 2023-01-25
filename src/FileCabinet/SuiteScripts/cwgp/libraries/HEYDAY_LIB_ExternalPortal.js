/**
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

define(['N/ui/serverWidget'], (serverWidget) => {
    const _CONFIG = {
        ENVIRONMENT: 'DEV',

        AUTH_PAGE: {
            DEV: {
                SCRIPT_ID: 701,
                DEPLOY_ID: 1
            },
            SB: {
                SCRIPT_ID: 683,
                DEPLOY_ID: 1
            },
            PROD: {
                SCRIPT_ID: 9999,
                DEPLOY_ID: 1
            }
        },
        RENDER_PAGE: {
            DEV: {
                SCRIPT_ID: 706,
                DEPLOY_ID: 1
            },
            SB: {
                SCRIPT_ID: 682,
                DEPLOY_ID: 1
            },
            PROD: {
                SCRIPT_ID: 9999,
                DEPLOY_ID: 1
            }
        },
        FRANCHISE_PAGE: {
            SB: {
                SCRIPT_ID: 690,
                DEPLOY_ID: 1
            },
            DEV: {
                SCRIPT_ID: 703,
                DEPLOY_ID: 1
            },
            PROD: {
                SCRIPT_ID: 9999,
                DEPLOY_ID: 1
            }
        },
        RETAIL_PAGE: {
            DEV: {
                SCRIPT_ID: 705,
                DEPLOY_ID: 1
            },
            SB: {
                SCRIPT_ID: 686,
                DEPLOY_ID: 1
            },
            PROD: {
                SCRIPT_ID: 9999,
                DEPLOY_ID: 1
            }
        },
        CREATE_INTPO_PAGE: {
            DEV: {
                SCRIPT_ID: 702,
                DEPLOY_ID: 1
            },
            SB: {
                SCRIPT_ID: 689,
                DEPLOY_ID: 1
            },
            PROD: {
                SCRIPT_ID: 9999,
                DEPLOY_ID: 1
            }
        }

        
    };

    const SCANNER_UI = {
        FIELD: {
            SCAN_UPC_CODES: {
                id: 'custpage_cwgp_scanupccodes',
                type: serverWidget.FieldType.LONGTEXT,
                label: 'Scan UPC Codes',
                container: 'SCAN',
                displayType: 'inline'
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

    return {
        _CONFIG,
        appendScannerUiToConfig
    }
});