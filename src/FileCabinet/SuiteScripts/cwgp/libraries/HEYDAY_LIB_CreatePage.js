/**
 * Author: Patricia Naguit
 * Date: 2022-10-22
 *
 * Date         Modified By            Notes
 * 2022-12-08   Patricia Naguit        Initial File Creation
 */

/**
 * @NApiVersion 2.1
 * @NModuleScope Public
 */

define(['N/ui/serverWidget', './HEYDAY_LIB_Util.js', './HEYDAY_LIB_ExternalPortal.js'], (serverWidget, utilLib, EPLib) => {
    let _CONFIG = {
        PARAMETER: {
            PAGE: 'custparam_cwgp_page'
        },
        TITLE: {
            intercompanypo: 'Intercompany P.O.',
            itemreceipt: 'Item Receipt',
            inventoryadjustment: 'Inventory Adjustment'
        },
        TAB: {
            intercompanypo: 'custpage_interpo_itemstab',
            itemreceipt: 'custpage_itemreceipt_itemstab',
            inventoryadjustment: 'custpage_inventoryadjustment_itemstab'
        },
        SUBLIST: {
            intercompanypo: 'custpage_interpo_items',
            itemreceipt: 'custpage_itemreceipt_items',
            inventoryadjustment: 'custpage_inventorayadjustment_items'
        },
        FIELD: {
            intercompanypo: {
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
                VENDOR: {
                    id: 'custpage_cwgp_vendor',
                    type: serverWidget.FieldType.SELECT,
                    label: 'Vendor',
                    container: 'PRIMARY',
                    mandatory: true
                },
                DATE: {
                    id: 'custpage_cwgp_date',
                    type: serverWidget.FieldType.DATE,
                    label: 'Date',
                    container: 'PRIMARY',
                    mandatory: true
                },
                MEMO: {
                    id: 'custpage_cwgp_memomain',
                    type: serverWidget.FieldType.TEXT,
                    label: 'Memo',
                    container: 'PRIMARY',
                },
                SUBSIDIARY: {
                    id: 'custpage_cwgp_subsidiary',
                    type: serverWidget.FieldType.SELECT,
                    label: 'Subsidiary',
                    source: 'subsidiary',
                    container: 'CLASS',
                    displayType: 'inline'
                },
                BUSINESS_LINE: {
                    id: 'custpage_cwgp_businessline',
                    type: serverWidget.FieldType.SELECT,
                    label: 'Business Line',
                    container: 'CLASS'
                },
                LOCATION: {
                    id: 'custpage_cwgp_location',
                    type: serverWidget.FieldType.SELECT,
                    label: 'Location',
                    container: 'CLASS',
                    mandatory: true
                }
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
                VENDOR: {
                    id: 'custpage_cwgp_vendor',
                    type: serverWidget.FieldType.TEXT,
                    label: 'Vendor',
                    container: 'PRIMARY',
                    mandatory: true,
                    displayType: 'inline',
                    source: 'vendor'
                },
                DATE: {
                    id: 'custpage_cwgp_date',
                    type: serverWidget.FieldType.DATE,
                    label: 'Date',
                    container: 'PRIMARY',
                    mandatory: true
                },
                MEMO: {
                    id: 'custpage_cwgp_memomain',
                    type: serverWidget.FieldType.TEXT,
                    label: 'Memo',
                    container: 'PRIMARY'
                },
                SUBSIDIARY: {
                    id: 'custpage_cwgp_subsidiary',
                    type: serverWidget.FieldType.SELECT,
                    label: 'Subsidiary',
                    source: 'subsidiary',
                    container: 'CLASS',
                    displayType: 'inline'
                },
            },
            inventoryadjustment:{
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
                REC_TYPE: {
                    id: 'custpage_cwgp_rectype',
                    type: serverWidget.FieldType.TEXT,
                    label: 'recType',
                    displayType: 'hidden'
                },
                ADJUSTMENT_ACCOUNT: {
                    id: 'custpage_cwgp_adjustmentaccount',
                    type: serverWidget.FieldType.SELECT,
                    label: 'Adjustment Account',
                    container: 'PRIMARY',
                },
                DATE: {
                    id: 'custpage_cwgp_date',
                    type: serverWidget.FieldType.DATE,
                    label: 'Date',
                    container: 'PRIMARY',
                    mandatory: true,
                },
                POSTING_PERIOD: {
                    id: 'custpage_cwgp_postingperiod',
                    type: serverWidget.FieldType.SELECT,
                    label: 'Posting Period',
                    container: 'PRIMARY'
                },
                MEMO: {
                    id: 'custpage_cwgp_memomain',
                    type: serverWidget.FieldType.TEXT,
                    label: 'Memo',
                    container: 'PRIMARY',
                },
                SUBSIDIARY: {
                    id: 'custpage_cwgp_subsidiary',
                    type: serverWidget.FieldType.SELECT,
                    label: 'Subsidiary',
                    container: 'CLASS',
                    source: 'subsidiary',
                    displayType: 'inline'
                },
                DEPARTMENT: {
                    id: 'custpage_cwgp_department',
                    type: serverWidget.FieldType.SELECT,
                    label: 'Department',
                    container: 'CLASS',
                },
                BUSINESS_LINE: {
                    id: 'custpage_cwgp_businessline',
                    type: serverWidget.FieldType.SELECT,
                    label: 'Business Line',
                    container: 'CLASS'
                },
                ADJUSTMENT_LOCATION: {
                    id: 'custpage_cwgp_adjustmentlocation',
                    type: serverWidget.FieldType.SELECT,
                    label: 'Adjustment Location',
                    container: 'CLASS',
                    source: 'location',
                    displayType: 'inline'
                },
            }
        },
        COLUMN: {
            ITEMS: {
                intercompanypo:{
                    ITEM: {
                        id: 'custpage_cwgp_item',
                        type: serverWidget.FieldType.SELECT,
                        label: 'Items',
                    },
                    DESCRIPTION: {
                        id: 'custpage_cwgp_description',
                        type: serverWidget.FieldType.TEXT,
                        label: 'Description',
                        displayType:'inline'
                    },
                    QUANTITY: {
                        id: 'custpage_cwgp_quantity',
                        type: serverWidget.FieldType.INTEGER,
                        label: 'Quantity'
                    },
                    RATE: {
                        id: 'custpage_cwgp_rate',
                        type: serverWidget.FieldType.FLOAT,
                        label: 'Rate'
                    },
                    AMOUNT: {
                        id: 'custpage_cwgp_amount',
                        type: serverWidget.FieldType.FLOAT,
                        label: 'Amount'
                    },
                    BUSINESS_LINE: {
                        id: 'custpage_cwgp_businessline',
                        type: serverWidget.FieldType.SELECT,
                        label: 'Business Line'
                    }
                },    
                itemreceipt: {
                    RECEIVE: {
                        id: 'custpage_cwgp_receive',
                        type: serverWidget.FieldType.CHECKBOX,
                        label: 'Receive'
                    },
                    ITEM: {
                        id: 'custpage_cwgp_item',
                        type: serverWidget.FieldType.TEXT,
                        label: 'Items',
                    },
                    ITEM_ID: {
                        id: 'custpage_cwgp_itemid',
                        type: serverWidget.FieldType.TEXT,
                        label: 'Item Id',
                        displayType: 'hidden'
                    },
                    DESCRIPTION: {
                        id: 'custpage_cwgp_description',
                        type: serverWidget.FieldType.TEXT,
                        label: 'Description',
                        displayType: 'inline'
                    },
                    BUSINESS_LINE: {
                        id: 'custpage_cwgp_businessline',
                        type: serverWidget.FieldType.SELECT,
                        label: 'Business Line',
                        displayType: 'ENTRY'
                    },
                    TRANSFER_LOCATION: {
                        id: 'custpage_cwgp_transferlocation',
                        type: serverWidget.FieldType.SELECT,
                        label: 'Transfer Location',
                        displayType: 'ENTRY'
                    },
                    QUANTITY_REMAINING: {
                        id: 'custpage_cwgp_quantityremaining',
                        type: serverWidget.FieldType.INTEGER,
                        label: 'Remaining'
                    },
                    QUANTITY: {
                        id: 'custpage_cwgp_quantity',
                        type: serverWidget.FieldType.INTEGER,
                        label: 'Quantity',
                        displayType: 'ENTRY'
                    },
                    RATE: {
                        id: 'custpage_cwgp_rate',
                        type: serverWidget.FieldType.FLOAT,
                        label: 'Rate'
                    }
                },
                inventoryadjustment: {
                    ITEM: {
                        id: 'custpage_cwgp_item',
                        type: serverWidget.FieldType.SELECT,
                        label: 'Items',
                    },
                    DESCRIPTION: {
                        id: 'custpage_cwgp_description',
                        type: serverWidget.FieldType.TEXT,
                        label: 'Description',
                        displayType: 'disabled'
                    },
                    LOCATION: {
                        id: 'custpage_cwgp_location',
                        type: serverWidget.FieldType.SELECT,
                        label: 'Location',
                    },
                    /*UNITS: {
                        id: 'custpage_cwgp_units',
                        type: serverWidget.FieldType.SELECT,
                        label: 'UNITS',
                    },*/
                    QTY_ON_HAND: {
                        id: 'custpage_cwgp_qtyonhand',
                        type: serverWidget.FieldType.INTEGER,
                        label: 'Quantity On Hand',
                        displayType: 'disabled'
                    },
                    ADJUST_QUANTITY_BY: {
                        id: 'custpage_cwgp_adjustqtyby',
                        type: serverWidget.FieldType.INTEGER,
                        label: 'Adjust Qty. By'
                    },
                    NEW_QUANTITY: {
                        id: 'custpage_cwgp_newquantity',
                        type: serverWidget.FieldType.INTEGER,
                        label: 'New Quantity',
                        displayType: 'disabled'
                    },
                    DEPARTMENT: {
                        id: 'custpage_cwgp_department',
                        type: serverWidget.FieldType.SELECT,
                        label: 'Department'
                    },
                    BUSINESS_LINE: {
                        id: 'custpage_cwgp_businessline',
                        type: serverWidget.FieldType.SELECT,
                        label: 'Business Line'
                    }
                }
            }
        },
        FIELD_GROUP: {
            intercompanypo: {
                PRIMARY: {
                    id: 'custpage_interpo_pi_grp',
                    label: 'Primary Infromation'
                },
                CLASS: {
                    id: 'custpage_interpo_class_grp',
                    label: 'Classification'
                }
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
            },
            inventoryadjustment: {
                PRIMARY: {
                    id: 'custpage_inventoryadjustment_pi_grp',
                    label: 'Primary Information'
                },
                CLASS: {
                    id: 'custpage_inventoryadjustment_class_grp',
                    label: 'Classification'
                }
            }
        },
        CLIENT_SCRIPT: '../client/HEYDAY_CS_CreatePageIntPO.js'
    }


    const render = (options) => {
        log.debug('===CREATE===','===Create Intercompany PO===');
        const {
            response,
            stType,
            stSubsidiary,
            stPageMode,
            stUserId,
            stAccessType
        } = options;

        const form = serverWidget.createForm({ title: _CONFIG.TITLE[stType] });

        form.clientScriptModulePath = _CONFIG.CLIENT_SCRIPT;

        //Initialize Add Scanner Field Group and Fields
        const {
            objItemResultSet,
            objUpcMap,
        }= EPLib.initScanner({
            stType,
            stSubsidiary,
            _CONFIG
        })

        let stUpcMap = ''
        if(objUpcMap){
            stUpcMap = JSON.stringify(objUpcMap)
        }

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
            if (id == 'custpage_cwgp_businessline') {
                utilLib.addOptionsBusinessLine(col);
                fld.defaultValue = 1;
            }
            if (id == 'custpage_cwgp_vendor') {
                utilLib.addOptionsVendorsBySubsidiary(fld, stSubsidiary);
            }

            if (id == 'custpage_cwgp_location') {
                utilLib.addOptionsLocationBySubsidiary(fld, stSubsidiary);
            }

            const objDefaultValues = mapDefaultValues({
                stSubsidiary, 
                stPageMode, 
                stUserId,
                stAccessType,
                stType,
                stUpcMap
            });

            if (objDefaultValues[fld.id] != 'undefined') {
                fld.defaultValue = objDefaultValues[fld.id]
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

        arrCols.forEach((stCol) => {
            const { id, type, label, displayType } = objItemCols[stCol];

            let col = sbl.addField({
                id,
                type,
                label
            });

            if (id == 'custpage_cwgp_item') {
                utilLib.addOptionsItemBySubsidiary({
                    fld: col, 
                    objResultSet: objItemResultSet
                });
            }
            if (id == 'custpage_cwgp_businessline') {
                utilLib.addOptionsBusinessLine(col);
                fld.defaultValue = 1;
            }

            if (displayType) {
                col.updateDisplayType({ displayType });
            }
        });

        form.addSubmitButton({ label: 'Save' });

        form.addButton({
            id: 'custpage_back_button',
            label: 'Back',
            functionName: `back(${stUserId}, ${stAccessType}, 'intercompanypo')`
        });

        response.writePage(form);
    };

    const renderItemReceipt = (options) => {
        log.debug('===Create===','===Create Item Receipt===');
        const {
            response,
            stType,
            stSubsidiary,
            stPageMode,
            stUserId,
            stPoId,
            stAccessType
        } = options;


        const form = serverWidget.createForm({ title: _CONFIG.TITLE[stType] });

        form.clientScriptModulePath = _CONFIG.CLIENT_SCRIPT;

        //Initialize Add Scanner Field Group and Fields
        const {
            objItemResultSet,
            objUpcMap,
        }= EPLib.initScanner({
            stType,
            stSubsidiary,
            _CONFIG
        })

        let stUpcMap = ''
        if(objUpcMap){
            stUpcMap = JSON.stringify(objUpcMap)
        }

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

        let objPO = utilLib.mapPOtoItemReceiptValues(stPoId);
        objPO.body.custpage_cwgp_rectype = stType;
        objPO.body.custpage_cwgp_pagemode = stPageMode;
        objPO.body.custpage_cwgp_userid = stUserId;
        objPO.body.custpage_cwgp_poid = stPoId;
        objPO.body.custpage_cwgp_accesstype = stAccessType;
        objPO.body.custpage_cwgp_htmlcss = htmlCss();
        objPO.body.custpage_cwgp_upccodemap = stUpcMap;

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
            else if(defaultValue){
                fld.defaultValue = defaultValue;
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
            if (id == 'custpage_cwgp_businessline') {
                utilLib.addOptionsBusinessLine(col);
            }
            
            if (id == 'custpage_cwgp_transferlocation') {
                utilLib.addOptionsLocationBySubsidiary(col, stSubsidiary);
            }

            if(id == 'custpage_cwgp_receive'){
                col.defaultValue ='T';
            }

        });

        utilLib.setSublistValues(sbl, objPO);

        form.addSubmitButton({ label: 'Save' });
        
        form.addButton({
            id: 'custpage_back_button',
            label: 'Back',
            functionName: `back(${stUserId}, ${stAccessType}, 'intercompanypo')`
        });

        response.writePage(form);
    };

    const renderInventoryAdjustment = (options) => {
        log.debug('===CREATE===','===Create Inventory Adjustment===');
        const {
            response,
            stType,
            stSubsidiary,
            stLocation,
            stPageMode,
            stUserId,
            stAccessType
        } = options;

        const form = serverWidget.createForm({ title: _CONFIG.TITLE[stType] });

        form.clientScriptModulePath = _CONFIG.CLIENT_SCRIPT;

        const {
            objItemResultSet,
            objUpcMap,
        }= EPLib.initScanner({
            stType,
            stSubsidiary,
            _CONFIG
        })
        
        let stUpcMap = ''
        if(objUpcMap){
            stUpcMap = JSON.stringify(objUpcMap)
        }

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

            if (id == 'custpage_cwgp_businessline') {
                utilLib.addOptionsBusinessLine(fld);
            }

            if (id == 'custpage_cwgp_postingperiod') {
                utilLib.addOptionsPostingPeriod(fld);
            }

            if (id == 'custpage_cwgp_department') {
                utilLib.addOptionsDepartmentBySubsidiary(fld, stSubsidiary);
            }

            if (id == 'custpage_cwgp_adjustmentaccount') {
                utilLib.addOptionsAccountsBySubsidiary(fld, stSubsidiary);
            }


            const objDefaultValues = mapDefaultValues({
                stSubsidiary, 
                stLocation,
                stPageMode, 
                stUserId,
                stAccessType,
                stType,
                stUpcMap
            });

            if (objDefaultValues[fld.id] != 'undefined') {
                fld.defaultValue = objDefaultValues[fld.id]
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

        arrCols.forEach((stCol) => {
            const { id, type, label, displayType } = objItemCols[stCol];


            let col = sbl.addField({
                id,
                type,
                label,
            });

            if (id == 'custpage_cwgp_item') {
                utilLib.addOptionsItemBySubsidiary({
                    fld: col, 
                    objResultSet: objItemResultSet
                });
            }
            if (id == 'custpage_cwgp_location') {
                utilLib.addOptionsLocationBySubsidiary(col, stSubsidiary);
            }
            if (id == 'custpage_cwgp_department') {
                utilLib.addOptionsDepartmentBySubsidiary(col, stSubsidiary);
            }
            if (id == 'custpage_cwgp_businessline') {
                utilLib.addOptionsBusinessLine(col);
            }
            /*if (id == 'custpage_cwgp_units') {
                log.debug('id',id);
                utilLib.addOptionsUnits(col);
            }*/
            if (displayType) {
                col.updateDisplayType({ displayType });
            }


        });

        form.addSubmitButton({ label: 'Save' });

        form.addButton({
            id: 'custpage_back_button',
            label: 'Back',
            functionName: `back(${stUserId}, ${stAccessType}, 'inventoryadjustment')`
        });

        response.writePage(form);
    };

    const mapDefaultValues = (options) => {
        const {
            stLocation,
            stSubsidiary, 
            stPageMode, 
            stUserId,
            stAccessType,
            stType,
            stUpcMap
        } = options;

        return {
            custpage_cwgp_adjustmentlocation: stLocation,
            custpage_cwgp_subsidiary: stSubsidiary,
            custpage_cwgp_pagemode: stPageMode,
            custpage_cwgp_userid: stUserId,
            custpage_cwgp_accesstype: stAccessType,
            custpage_cwgp_htmlcss: htmlCss(),
            custpage_cwgp_date: new Date(),
            custpage_cwgp_rectype: stType,
            custpage_cwgp_upccodemap: stUpcMap
        }
    };

    const htmlCss = () => {
        const stHtmlCss = `<style>
        @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Roboto+Mono:ital,wght@0,300;1,200&family=Roboto:wght@300&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Libre+Baskerville&display=swap');
    
        body {
            font-family: 'Roboto', sans-serif !important;
            filter: blur(100px);
            pointer-events: none;
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
    
        input#submitter, input#secondarysubmitter, input#custpage_interpo_items_addedit {
            background-color: #105368 !important;
            color: white !important;
            font-family: 'Roboto Mono', monospace;
        }
    
        input#custpage_back_button, input#secondarycustpage_back_button, input#custpage_interpo_items_clear {
            background-color: white !important;
            color: #105368 !important;
            font-family: 'Roboto Mono', monospace;
        }

        input#custpage_interpo_items_remove{
            font-family: 'Roboto Mono', monospace;
        }
        
        div#custpage_interpo_itemstab_pane_hd {
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
        renderItemReceipt,
        renderInventoryAdjustment
    }
});

