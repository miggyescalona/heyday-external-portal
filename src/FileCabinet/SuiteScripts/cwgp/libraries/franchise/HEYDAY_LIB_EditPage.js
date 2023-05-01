/**
 * Author: Patricia Naguit
 * Date: 2022-12-13
 *
 * Date         Modified By            Notes
 * 2022-12-13   Patricia Naguit        Initial File Creation
 */

/**
 * @NApiVersion 2.1
 * @NModuleScope Public
 */

define(['N/ui/serverWidget', './HEYDAY_LIB_Util.js', '../HEYDAY_LIB_ExternalPortal.js'], (serverWidget, utilLib, EPLib) => {
    let _CONFIG = {
        PARAMETER: {
            PAGE: 'custparam_cwgp_page'
        },
        TITLE: {
            franchisepo: 'Purchase Order',
            itemreceipt: 'Item Receipt'
        },
        TAB: {
            franchisepo: 'custpage_franchisepo_itemstab',
            itemreceipt: 'custpage_itemreceipt_itemstab',
            inventoryadjustment_damaged: 'custpage_inventoryadjustmentdamaged_itemstab',
            inventoryadjustment_variance: 'custpage_inventoryadjustmentvariance_itemstab',
        },
        SUBLIST: {
            franchisepo: 'custpage_franchisepo_items',
            itemreceipt: 'custpage_itemreceipt_items',
            inventoryadjustment_damaged: 'custpage_inventoryadjustmentdamaged_items',
            inventoryadjustment_variance: 'custpage_inventoryadjustmentvariance_items'
        },
        FIELD: {
            franchisepo: {
                HTML_CSS: {
                    id: 'custpage_cwgp_htmlcss',
                    type: serverWidget.FieldType.INLINEHTML,
                    label: 'Html Css',
                },
                PAGE_MODE: {
                    id: 'custpage_cwgp_pagemode',
                    type: serverWidget.FieldType.TEXT,
                    label: 'pageMode',
                    displayType: 'hidden'
                },
                USER_ID: {
                    id: 'custpage_cwgp_userid',
                    type: serverWidget.FieldType.TEXT,
                    label: 'userId',
                    displayType: 'hidden'
                },
                ACCESS_TYPE: {
                    id: 'custpage_cwgp_accesstype',
                    type: serverWidget.FieldType.TEXT,
                    label: 'accessType',
                    displayType: 'hidden'
                },
                PO_ID: {
                    id: 'custpage_cwgp_poid',
                    type: serverWidget.FieldType.TEXT,
                    label: 'poId',
                    displayType: 'hidden'
                },
                REC_TYPE: {
                    id: 'custpage_cwgp_rectype',
                    type: serverWidget.FieldType.TEXT,
                    label: 'recType',
                    displayType: 'hidden'
                },
                ORDERNO: {
                    id: 'custpage_cwgp_orderno',
                    type: serverWidget.FieldType.TEXT,
                    label: 'Order #',
                    container: 'PRIMARY',
                    displayType: 'inline'
                },
                CUSTOMER: {
                    id: 'custpage_cwgp_customer',
                    type: serverWidget.FieldType.SELECT,
                    label: 'Customer',
                    container: 'PRIMARY',
                    source: 'customer',
                    mandatory: true,
                    displayType: 'inline'
                },
                DATE: {
                    id: 'custpage_cwgp_date',
                    type: serverWidget.FieldType.DATE,
                    label: 'Date',
                    container: 'PRIMARY',
                    mandatory: true,
                    displayType: 'inline'
                    //defaultValue: new Date()
                },
                DELIVERY_BY_DATE: {
                    id: 'custpage_cwgp_deliverbydate',
                    type: serverWidget.FieldType.DATE,
                    label: 'Deliver by Date',
                    container: 'PRIMARY',
                    mandatory: true,
                    //defaultValue: new Date()
                },
                MEMO: {
                    id: 'custpage_cwgp_memomain',
                    type: serverWidget.FieldType.TEXT,
                    label: 'Memo',
                    container: 'PRIMARY',
                },
                STATUS: {
                    id: 'custpage_cwgp_status',
                    type: serverWidget.FieldType.TEXT,
                    label: 'Approval Status',
                    container: 'PRIMARY',
                    displayType: 'inline'
                },
                FOR_RECEIVING: {
                    id: 'custpage_cwgp_forreceiving',
                    type: serverWidget.FieldType.CHECKBOX,
                    label: 'For Receiving',
                    container: 'PRIMARY',
                    displayType: 'inline'
                },
                OPERATOR: {
                    id: 'custpage_cwgp_operator',
                    type: serverWidget.FieldType.TEXT,
                    label: 'Operator',
                    container: 'PRIMARY',
                    displayType: 'inline'
                },
                SUBSIDIARY: {
                    id: 'custpage_cwgp_subsidiary',
                    type: serverWidget.FieldType.SELECT,
                    label: 'Subsidiary',
                    source: 'subsidiary',
                    container: 'CLASS',
                    displayType: 'inline'
                },
                LOCATION: {
                    id: 'custpage_cwgp_location',
                    type: serverWidget.FieldType.SELECT,
                    label: 'Location',
                    container: 'CLASS',
                    source: 'location',
                    displayType: 'inline',
                    mandatory: true
                },
            },
            itemreceipt: {
                HTML_CSS: {
                    id: 'custpage_cwgp_htmlcss',
                    type: serverWidget.FieldType.INLINEHTML,
                    label: 'Html Css',
                },
                PAGE_MODE: {
                    id: 'custpage_cwgp_pagemode',
                    type: serverWidget.FieldType.TEXT,
                    label: 'pageMode',
                    displayType: 'hidden'
                },
                USER_ID: {
                    id: 'custpage_cwgp_userid',
                    type: serverWidget.FieldType.TEXT,
                    label: 'pageMode',
                    displayType: 'hidden'
                },
                ACCESS_TYPE: {
                    id: 'custpage_cwgp_accesstype',
                    type: serverWidget.FieldType.TEXT,
                    label: 'accessType',
                    displayType: 'hidden'
                },
                ITEMRECEIPT_ID: {
                    id: 'custpage_cwgp_itemreceiptid',
                    type: serverWidget.FieldType.TEXT,
                    label: 'poId',
                    displayType: 'hidden'
                },
                PO_ID: {
                    id: 'custpage_cwgp_poid',
                    type: serverWidget.FieldType.TEXT,
                    label: 'Created From',
                    container: 'PRIMARY',
                    displayType: 'inline'
                },
                REC_TYPE: {
                    id: 'custpage_cwgp_rectype',
                    type: serverWidget.FieldType.TEXT,
                    label: 'recType',
                    displayType: 'hidden'
                },
                CUSTOMER: {
                    id: 'custpage_cwgp_customer',
                    type: serverWidget.FieldType.SELECT,
                    label: 'Customer',
                    container: 'PRIMARY',
                    source: 'customer',
                    mandatory: true,
                    displayType: 'inline'
                },
                DATE: {
                    id: 'custpage_cwgp_date',
                    type: serverWidget.FieldType.DATE,
                    label: 'Date',
                    container: 'PRIMARY',
                    mandatory: true,
                    displayType: 'inline'
                },
                MEMO: {
                    id: 'custpage_cwgp_memomain',
                    type: serverWidget.FieldType.TEXT,
                    label: 'Memo',
                    container: 'PRIMARY'
                },
                OPERATOR: {
                    id: 'custpage_cwgp_operator',
                    type: serverWidget.FieldType.TEXT,
                    label: 'Operator',
                    container: 'PRIMARY',
                    displayType: 'inline'
                },
                SUBSIDIARY: {
                    id: 'custpage_cwgp_subsidiary',
                    type: serverWidget.FieldType.SELECT,
                    label: 'Subsidiary',
                    source: 'subsidiary',
                    container: 'CLASS',
                    displayType: 'inline'
                },
                LOCATION: {
                    id: 'custpage_cwgp_location',
                    type: serverWidget.FieldType.SELECT,
                    label: 'Location',
                    container: 'CLASS',
                    source: 'location',
                    displayType: 'inline',
                    mandatory: true
                },
                DAMAGED_INVENTORY_ID:{
                    id: 'custpage_cwgp_damagediaid',
                    type: serverWidget.FieldType.TEXT,
                    label: 'Damaged Inventory Adjustment',
                    container: 'CLASS',
                    displayType: 'hidden'
                }
            },
        },
        COLUMN: {
            ITEMS: {
            	franchisepo:{
                    ITEM_ID: {
                        id: 'custpage_cwgp_itemid',
                        type: serverWidget.FieldType.TEXT,
                        label: 'Item ID',
                        displayType:'hidden'
                    },
                    ITEM: {
                        id: 'custpage_cwgp_item',
                        type: serverWidget.FieldType.SELECT,
                        label: 'Items',
                        //displayType: 'inline'
                    },
                    DESCRIPTION: {
                        id: 'custpage_cwgp_description',
                        type: serverWidget.FieldType.TEXT,
                        label: 'Description'
                    },
                    INTERNAL_SKU: {
                        id: 'custpage_cwgp_internalsku',
                        type: serverWidget.FieldType.TEXT,
                        label: 'Internal SKU',
                        displayType:'disabled'
                    },
                    UPC_CODE: {
                        id: 'custpage_cwgp_upccode',
                        type: serverWidget.FieldType.TEXT,
                        label: 'UPC Code',
                        displayType:'disabled'
                    },
                    QUANTITY: {
                        id: 'custpage_cwgp_quantity',
                        type: serverWidget.FieldType.INTEGER,
                        label: 'Quantity'
                    },
                    RATE: {
                        id: 'custpage_cwgp_rate',
                        type: serverWidget.FieldType.FLOAT,
                        label: 'Rate',
                        displayType: 'disabled'
                    },
                    AMOUNT: {
                        id: 'custpage_cwgp_amount',
                        type: serverWidget.FieldType.FLOAT,
                        label: 'Amount',
                        displayType: 'disabled'
                    }
                },    
                itemreceipt: {
                    ITEM: {
                        id: 'custpage_cwgp_item',
                        type: serverWidget.FieldType.SELECT,
                        label: 'Items',
                        displayType: 'inline',
                        source: 'item',
                    },
                    DESCRIPTION: {
                        id: 'custpage_cwgp_description',
                        type: serverWidget.FieldType.TEXT,
                        label: 'Description',
                    },
                    INTERNAL_SKU: {
                        id: 'custpage_cwgp_internalsku',
                        type: serverWidget.FieldType.TEXT,
                        label: 'Internal SKU',
                        displayType:'disabled'
                    },
                    UPC_CODE: {
                        id: 'custpage_cwgp_upccode',
                        type: serverWidget.FieldType.TEXT,
                        label: 'UPC Code',
                        displayType:'disabled'
                    },
                    QUANTITY: {
                        id: 'custpage_cwgp_quantity',
                        type: serverWidget.FieldType.INTEGER,
                        label: 'Received Quantity',
                        displayType: 'inline'
                    },
                    /*DAMAGED: {
                        id: 'custpage_cwgp_damagedquantity',
                        type: serverWidget.FieldType.INTEGER,
                        label: 'Damaged Quantity',
                        displayType: 'inline'
                    },
                    VARIANCE: {
                        id: 'custpage_cwgp_variance',
                        type: serverWidget.FieldType.INTEGER,
                        label: 'Variance',
                        displayType: 'inline'
                    },
                    LINE: {
                        id: 'custpage_cwgp_line',
                        type: serverWidget.FieldType.INTEGER,
                        label: 'Line',
                        displayType: 'hidden'
                    }*/
                },
                inventoryadjustment_damaged:{
                    INVENTORY_ADJUSTMENT: {
                        id: 'custpage_cwgp_inventoryadjustment',
                        type: serverWidget.FieldType.TEXT,
                        label: 'Inventory Adjustment #',
                    },
                    ITEM: {
                        id: 'custpage_cwgp_item',
                        type: serverWidget.FieldType.SELECT,
                        label: 'Items',
                        displayType: 'inline',
                        source: 'item',
                    },
                    INTERNAL_SKU: {
                        id: 'custpage_cwgp_internalsku',
                        type: serverWidget.FieldType.TEXT,
                        label: 'Internal SKU'
                    },
                    UPC_CODE: {
                        id: 'custpage_cwgp_upccode',
                        type: serverWidget.FieldType.TEXT,
                        label: 'UPC Code'
                    },
                    DAMAGED_QUANTITY:{
                        id: 'custpage_cwgp_damagedquantity',
                        type: serverWidget.FieldType.TEXT,
                        label: 'Damaged Quantity',
                    },
                },
                inventoryadjustment_variance:{
                    ITEM_RECEIPT_VARIANCE: {
                        id: 'custpage_cwgp_itemreceiptvariance',
                        type: serverWidget.FieldType.TEXT,
                        label: 'Item Receipt Variance #',
                    },
                    ITEM: {
                        id: 'custpage_cwgp_item',
                        type: serverWidget.FieldType.TEXT,
                        label: 'Items',
                    },
                    INTERNAL_SKU: {
                        id: 'custpage_cwgp_internalsku',
                        type: serverWidget.FieldType.TEXT,
                        label: 'Internal SKU'
                    },
                    UPC_CODE: {
                        id: 'custpage_cwgp_upccode',
                        type: serverWidget.FieldType.TEXT,
                        label: 'UPC Code'
                    },
                    QUANTITY:{
                        id: 'custpage_cwgp_quantity',
                        type: serverWidget.FieldType.TEXT,
                        label: 'Quantity',
                    }
                }
            }
        },
        FIELD_GROUP: {
            franchisepo: {
                PRIMARY: {
                    id: 'custpage_franchisepo_pi_grp',
                    label: 'Primary Information'
                },
                CLASS: {
                    id: 'custpage_franchisepo_class_grp',
                    label: 'Classification'
                },
            },
            itemreceipt: {
                PRIMARY: {
                    id: 'custpage_itemreceipt_pi_grp',
                    label: 'Primary Information'
                },
                CLASS: {
                    id: 'custpage_itemreceipt_class_grp',
                    label: 'Classification'
                }
            }
        },
        CLIENT_SCRIPT: {
            franchisepo: '../franchise/HEYDAY_CS_CreatePageIntPO.js',
            itemreceipt: '../franchise/HEYDAY_CS_CreatePageIntPO.js',
        }
    }

    const render = (options) => {
        const {
            response,
            stType,
            stAccessType,
            stSubsidiary,
            stPageMode,
            stUserId,
            stPoId,
            stOperator
        } = options;
      
        objItemResultSet = EPLib.getInvItemsBySubsidiary({stSubsidiary});
        // const {
        //     objItemResultSet,
        //     objUpcMap,
        // } = EPLib.initScanner({
        //     stType,
        //     stSubsidiary,
        //     _CONFIG
        // })

        // let stUpcMap = ''
        // if(objUpcMap){
        //     stUpcMap = JSON.stringify(objUpcMap)
        // }
        
        let objPO = utilLib.mapPOValues(stPoId);
        objPO.body.custpage_cwgp_rectype = stType;
        objPO.body.custpage_cwgp_pagemode = stPageMode;
        objPO.body.custpage_cwgp_userid = stUserId;
        objPO.body.custpage_cwgp_accesstype = stAccessType;
        objPO.body.custpage_cwgp_poid = stPoId;
        if(objPO.body.custpage_cwgp_operator==''){
            objPO.body.custpage_cwgp_operator = stOperator;
        }
        objPO.body.custpage_cwgp_htmlcss = htmlCss();
        // objPO.body.custpage_cwgp_upccodemap = stUpcMap;
        // objPO.body.custpage_cwgp_scanbtnhtml = EPLib.getScanButtonCss();

        const form = serverWidget.createForm({ title: _CONFIG.TITLE[stType] + ' ' + objPO.body.custpage_cwgp_orderno });

        form.clientScriptModulePath = _CONFIG.CLIENT_SCRIPT[stType];
        //add field group
        const objFldGrp = _CONFIG.FIELD_GROUP[stType];

        const arrFldGrp = Object.keys(objFldGrp);
        log.debug('arrFldGrp', arrFldGrp);

        arrFldGrp.forEach((stCol) => {
            const { id, label } = objFldGrp[stCol];

            form.addFieldGroup({
                id,
                label
            });
        });

        //render body fields
        const objBodyFields = _CONFIG.FIELD[stType];

        const arrFlds = Object.keys(objBodyFields);
        log.debug('arrFlds', arrFlds);

        arrFlds.forEach((stCol) => {
            const {
                id,
                type,
                label,
                source,
                container,
                mandatory,
                defaultValue,
                displayType
            } = objBodyFields[stCol];
            log.debug('mandatory', mandatory);

            let fld = form.addField({
                id,
                type,
                label,
                source,
                container: _CONFIG.FIELD_GROUP[stType][container]?.id
            });

            if (mandatory) {
                fld.isMandatory = true;
            }

            if (displayType) {
                fld.updateDisplayType({ displayType });
            }

            if (objPO.body[fld.id] != 'undefined') {
                fld.defaultValue = objPO.body[fld.id]
            }
        });

        //render sublist
        form.addSubtab({
            id: _CONFIG.TAB[stType],
            label: 'Items'
        });

        const sbl = form.addSublist({
            id: _CONFIG.SUBLIST[stType],
            label: ' ',
            type: serverWidget.SublistType.INLINEEDITOR,
            tab: _CONFIG.TAB[stType]
        });

        const objItemCols = _CONFIG.COLUMN.ITEMS[stType];

        const arrCols = Object.keys(objItemCols);
        log.debug('arrCols', arrCols);

        arrCols.forEach((stCol) => {
            const { id, type, label, source, displayType } = objItemCols[stCol];

            let col = sbl.addField({
                id,
                type,
                label,
                source,
                displayType
            });

            if (displayType) {
                col.updateDisplayType({ displayType });
            }

            if (id == 'custpage_cwgp_item') {
                utilLib.addOptionsItemBySubsidiary({
                    fld: col, 
                    objResultSet: objItemResultSet
                });
                //utilLib.addOptionsItemBySubsidiary(col, stSubsidiary);
            }
        });

        utilLib.setSublistValues(sbl, objPO);

        form.addSubmitButton({ label: 'Submit' });
        
        form.addButton({
            id: 'custpage_back_button',
            label: 'Back',
            functionName: `back(${stUserId}, ${stAccessType}, 'franchisepo')`
        });

        response.writePage(form);
    };
    
    const renderItemReceipt = (options) => {
        log.debug('===EDIT===','===Edit Item Receipt===');
        const {
            response,
            stType,
            stPageMode,
            stUserId,
            stPoId,
            stAccessType,
            stTranId
        } = options;
       
        // const {
        //     objItemResultSet,
        //     objUpcMap,
        // } = EPLib.initScanner({
        //     stType,
        //     stSubsidiary: '',
        //     _CONFIG
        // })

        // let stUpcMap = ''
        // if(objUpcMap){
        //     stUpcMap = JSON.stringify(objUpcMap)
        // }

        let objPO = utilLib.mapIRValuesViewEdit(stPoId);
        objPO.body.custpage_cwgp_itemreceiptid = stPoId;
        objPO.body.custpage_cwgp_rectype = stType;
        objPO.body.custpage_cwgp_pagemode = stPageMode;
        objPO.body.custpage_cwgp_userid = stUserId;
        objPO.body.custpage_cwgp_accesstype = stAccessType
        objPO.body.custpage_cwgp_poid = 'Purchase Order #'+objPO.body.custpage_cwgp_poid;
        objPO.body.custpage_cwgp_location = 230;
        objPO.body.custpage_cwgp_htmlcss = htmlCss();
        let stDamageIAid = objPO.body.custpage_cwgp_damagediaid;
        // objPO.body.custpage_cwgp_upccodemap = stUpcMap;
        // objPO.body.custpage_cwgp_scanbtnhtml = EPLib.getScanButtonCss();
        log.debug('objPO', objPO);
        
        const form = serverWidget.createForm({ title: _CONFIG.TITLE[stType] + ' ' + stPoId });
        form.clientScriptModulePath = _CONFIG.CLIENT_SCRIPT[stType];
        

        //add field group
        const objFldGrp = _CONFIG.FIELD_GROUP[stType];

        const arrFldGrp = Object.keys(objFldGrp);
        log.debug('arrFldGrp', arrFldGrp);

        arrFldGrp.forEach((stCol) => {
            const { id, label } = objFldGrp[stCol];

            form.addFieldGroup({
                id,
                label
            });
        });
        
        
        

        //render body fields
        const objBodyFields = _CONFIG.FIELD[stType];

        const arrFlds = Object.keys(objBodyFields);
        log.debug('arrFlds', arrFlds)
        

        arrFlds.forEach((stCol) => {
            const {
                id,
                type,
                label,
                source,
                container,
                mandatory,
                displayType
            } = objBodyFields[stCol];

            let fld = form.addField({
                id,
                type,
                label,
                source,
                container: _CONFIG.FIELD_GROUP[stType][container]?.id
            });

            if (mandatory) {
                fld.isMandatory = true;
            }

            if (displayType) {
                fld.updateDisplayType({ displayType });
            }

            if (objPO.body[fld.id] != 'undefined') {
                fld.defaultValue = objPO.body[fld.id]
            }
        });

        //render sublist
        form.addSubtab({
            id: _CONFIG.TAB[stType],
            label: 'Items'
        });

        const sbl = form.addSublist({
            id: _CONFIG.SUBLIST[stType],
            label: ' ',
            type: serverWidget.SublistType.LIST,
            tab: _CONFIG.TAB[stType]
        });

        const objItemCols = _CONFIG.COLUMN.ITEMS[stType];

        const arrCols = Object.keys(objItemCols);
        log.debug('arrCols', arrCols);

        arrCols.forEach((stCol) => {
            const { id, type, label, source, displayType } = objItemCols[stCol];

            let col = sbl.addField({
                id,
                type,
                label,
                source,
                displayType
            });

            if (displayType) {
                col.updateDisplayType({ displayType });
            }
        });

        utilLib.setSublistValues(sbl, objPO);

        log.debug('stDamageIAid',stDamageIAid);
        if(stDamageIAid){
            const stType = 'inventoryadjustment_damaged';

            let objPO = utilLib.mapInventoryAdjustmentValues(stDamageIAid);
            log.debug('objPO',objPO);
            form.addSubtab({
                id: _CONFIG.TAB[stType],
                label: 'Damaged'
            });
    
            const sbl = form.addSublist({
                id: _CONFIG.SUBLIST[stType],
                label: ' ',
                type: serverWidget.SublistType.LIST,
                tab: _CONFIG.TAB[stType]
            });
    
            const objItemCols = _CONFIG.COLUMN.ITEMS[stType];
    
            const arrCols = Object.keys(objItemCols);
            log.debug('arrCols', arrCols);
    
            arrCols.forEach((stCol) => {
                const { id, type, label, source, displayType, dsiplaySize } = objItemCols[stCol];
    
                let col = sbl.addField({
                    id,
                    type,
                    label,
                    source,
                    displayType,
                    dsiplaySize
                });
    
                if (displayType) {
                    col.updateDisplayType({ displayType });
                }
            });
    
            utilLib.setSublistValues(sbl, objPO);
        }

        let arrMapItemReceiptVariance = utilLib.mapItemReceiptVariance(stPoId);
        log.debug('mapItemReceiptVariance',arrMapItemReceiptVariance)
         log.debug('mapItemReceiptVariance length',arrMapItemReceiptVariance.length)
        ////render damaged sublist
        if(arrMapItemReceiptVariance.item.length>0){
            const stType = 'inventoryadjustment_variance';

            //let objPO = utilLib.mapInventoryAdjustmentValues(stDamageIAid);

            form.addSubtab({
                id: _CONFIG.TAB[stType],
                label: 'Variance'
            });
    
            const sbl = form.addSublist({
                id: _CONFIG.SUBLIST[stType],
                label: ' ',
                type: serverWidget.SublistType.LIST,
                tab: _CONFIG.TAB[stType]
            });
    
            const objItemCols = _CONFIG.COLUMN.ITEMS[stType];
    
            const arrCols = Object.keys(objItemCols);
            log.debug('arrCols', arrCols);
    
            arrCols.forEach((stCol) => {
                const { id, type, label, source, displayType, dsiplaySize } = objItemCols[stCol];
    
                let col = sbl.addField({
                    id,
                    type,
                    label,
                    source,
                    displayType,
                    dsiplaySize
                });
    
                if (displayType) {
                    col.updateDisplayType({ displayType });
                }
            });
    
            utilLib.setSublistValues(sbl, arrMapItemReceiptVariance);
        }
        
        
        form.addSubmitButton({ label: 'Submit' });
        form.addButton({
            id: 'custpage_back_button',
            label: 'Back',
            functionName: `back(${stUserId}, ${stAccessType}, 'itemreceipt')`
        });

        
        response.writePage(form);

        
    };

    const htmlCss = () => {
        const stHtmlCss = `<style>
        @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Roboto+Mono:ital,wght@0,300;1,200&family=Roboto:wght@300&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Libre+Baskerville&display=swap');
    
        body {
            font-family: 'Roboto', sans-serif !important;
        }
    
        div#div__body {
            margin: 15px !important;
        }

        td {
            font-family: 'Roboto', sans-serif !important;
            font-size: 14px !important;
        }

        h1.uir-record-type {
            color: #105368 !important;
            font-family: 'Libre Baskerville', serif;
            font-weight: 200 !important;
        }
   
        input#submitter, input#secondarysubmitter, input#custpage_franchisepo_items_addedit {
            background-color: #105368 !important;
            color: white !important;
            font-family: 'Roboto Mono', monospace;
        }
    
        input#custpage_back_button, 
        input#secondarycustpage_back_button, 
        input#custpage_franchisepo_items_clear, 
        input#custpage_franchisepo_items_remove {
            background-color: white !important;
            color: #105368 !important;
            font-family: 'Roboto Mono', monospace;
        }
        
        div#custpage_franchisepo_itemstab_pane_hd {
            background-color: #dbc8b6 !important;
        }
        
        div#custpage_itemreceipt_itemstab_pane_hd {
            background-color: #dbc8b6 !important;
        }
        div#custpage_inventoryadjustmentdamaged_itemstab_pane_hd {
            background-color: #dbc8b6 !important;
        }
        div#custpage_inventoryadjustmentvariance_itemstab_pane_hd {
            background-color: #dbc8b6 !important;
        }

        td.fgroup_title {
            padding: 4px;
            background: #f8f2ed;
        }

        input#inpt_custpage_cwgp_vendor1, 
        input#custpage_cwgp_date, 
        input#custpage_cwgp_memomain, 
        input#inpt_custpage_cwgp_location2, 
        input#inpt_custpage_cwgp_item3,
        input#inpt_custpage_cwgp_page1 {
            font-family: 'Roboto', sans-serif !important;
            font-size: 14px !important;
        }

        a.dottedlink {
            font-size: 14px !important;
            pointer-events: none;
            cursor: default;
            text-decoration: none;
        }

        a.smallgraytextnolink {
            font-size: 14px !important;
        }

        div.fgroup_title {
            font-size: 14px !important;
        }

    </style>`;

        return stHtmlCss;
    };
    
    return {
        render,
        renderItemReceipt
    }
});
