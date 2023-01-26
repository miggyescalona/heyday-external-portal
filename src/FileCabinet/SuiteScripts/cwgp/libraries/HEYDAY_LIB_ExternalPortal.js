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

define(['N/ui/serverWidget', './HEYDAY_LIB_ConfExternalPortal'], (serverWidget, ConfEPLib) => {
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

    return {
        _CONFIG,
        appendScannerUiToConfig
    }
});