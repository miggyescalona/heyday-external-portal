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

define(['N/ui/serverWidget', './HEYDAY_LIB_Util.js', '../HEYDAY_LIB_ExternalPortal.js'], (serverWidget, utilLib, EPLib) => {
    const _CONFIG = {
        PARAMETER: {
            PAGE: 'custparam_cwgp_page'
        },
        TITLE: {

            franchisepo: 'Purchase Order',
            itemreceipt: 'Item Receipt',
            inventoryadjustment: 'Inventory Adjustment'
        },
        TAB: {
            franchisepo: 'custpage_franchisepo_itemstab',
            itemreceipt: 'custpage_itemreceipt_itemstab',
            inventoryadjustment: 'custpage_inventoryadjustment_itemstab'
        },
        SUBLIST: {
            franchisepo: 'custpage_franchisepo_items',
            itemreceipt: 'custpage_itemreceipt_items',
            inventoryadjustment: 'custpage_inventorayadjustment_items'
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
                    mandatory: true
                },
                DELIVERY_BY_DATE: {
                    id: 'custpage_cwgp_deliverbydate',
                    type: serverWidget.FieldType.DATE,
                    label: 'Deliver by Date',
                    container: 'PRIMARY',
                    mandatory: true
                },
                MEMO: {
                    id: 'custpage_cwgp_memomain',
                    type: serverWidget.FieldType.TEXT,
                    label: 'Memo',
                    container: 'PRIMARY',
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
                    label: 'Created From',
                    container: 'PRIMARY',
                    displayType: 'hidden'
                },
                CREATED_FROM: {
                    id: 'custpage_cwgp_createdfrom',
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
                    mandatory: true
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
                    source: 'location',
                    container: 'CLASS',
                    displayType: 'inline'
                }
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
                    mandatory: true
                },
                MEMO: {
                    id: 'custpage_cwgp_memomain',
                    type: serverWidget.FieldType.TEXT,
                    label: 'Memo',
                    container: 'PRIMARY'
                }
            }
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
                    },
                    DESCRIPTION: {
                        id: 'custpage_cwgp_description',
                        type: serverWidget.FieldType.TEXT,
                        label: 'Description',
                        displayType: 'disabled'
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
                        displayType: 'DISABLED'
                    },
                    AMOUNT: {
                        id: 'custpage_cwgp_amount',
                        type: serverWidget.FieldType.CURRENCY,
                        label: 'Amount',
                        displayType: 'DISABLED'
                    }
                },    
                itemreceipt: {
                    RECEIVE: {
                        id: 'custpage_cwgp_receive',
                        type: serverWidget.FieldType.CHECKBOX,
                        label: 'Receive',
                        //displayType:'disabled'
                    },
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
                        source: 'item',
                        displayType: 'inline'
                    },
                    DESCRIPTION: {
                        id: 'custpage_cwgp_description',
                        type: serverWidget.FieldType.TEXT,
                        label: 'Description',
                        displayType: 'inline'
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
                    QUANTITY_STARTING: {
                        id: 'custpage_cwgp_quantitystarting',
                        type: serverWidget.FieldType.INTEGER,
                        label: 'Starting Quantity',
                        displayType:'disabled'
                    },
                    QUANTITY_REMAINING: {
                        id: 'custpage_cwgp_quantityremaining',
                        type: serverWidget.FieldType.INTEGER,
                        label: 'Shipped Quantity',
                        displayType:'inline'
                    },
                    QUANTITY: {
                        id: 'custpage_cwgp_quantity',
                        type: serverWidget.FieldType.INTEGER,
                        label: 'Received Quantity',
                        displayType: 'ENTRY'
                    },
                    DAMAGED: {
                        id: 'custpage_cwgp_damagedquantity',
                        type: serverWidget.FieldType.INTEGER,
                        label: 'Damaged Quantity',
                        displayType: 'ENTRY'
                    },
                    VARIANCE: {
                        id: 'custpage_cwgp_variance',
                        type: serverWidget.FieldType.INTEGER,
                        label: 'Variance',
                        displayType: 'ENTRY'
                    },
                    QUANTITY_FINAL: {
                        id: 'custpage_cwgp_quantityfinal',
                        type: serverWidget.FieldType.INTEGER,
                        label: 'Final Quantity',
                        displayType: 'ENTRY'
                    },
                    LINE: {
                        id: 'custpage_cwgp_line',
                        type: serverWidget.FieldType.INTEGER,
                        label: 'Line',
                        displayType: 'hidden'
                    },
                    RATE: {
                        id: 'custpage_cwgp_rate',
                        type: serverWidget.FieldType.FLOAT,
                        label: 'Rate',
                        displayType: 'hidden'
                    }
                },
                inventoryadjustment: {
                    ITEM: {
                        id: 'custpage_cwgp_item',
                        type: serverWidget.FieldType.SELECT,
                        label: 'Items',
                        source: 'item',
                    },
                    DESCRIPTION: {
                        id: 'custpage_cwgp_description',
                        type: serverWidget.FieldType.TEXT,
                        label: 'Description',
                        displayType: 'inline'
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
                    QTY_ON_HAND: {
                        id: 'custpage_cwgp_qtyonhand',
                        type: serverWidget.FieldType.FLOAT,
                        label: 'Quantity On Hand',
                        displayType: 'disabled'
                    },
                    ADJUST_QUANTITY_BY: {
                        id: 'custpage_cwgp_adjustqtyby',
                        type: serverWidget.FieldType.FLOAT,
                        label: 'Adjust Qty. By'
                    },
                    ENDING_QTY: {
                        id: 'custpage_cwgp_endingqty',
                        type: serverWidget.FieldType.FLOAT,
                        label: 'Ending Inventory Balance'
                    },
                    NEW_QUANTITY: {
                        id: 'custpage_cwgp_newquantity',
                        type: serverWidget.FieldType.FLOAT,
                        label: 'New Quantity',
                        displayType: 'DISABLED'
                    }
                },
                inventoryadjustment: {
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
                    QTY_ON_HAND: {
                        id: 'custpage_cwgp_qtyonhand',
                        type: serverWidget.FieldType.TEXT,
                        label: 'Quantity On Hand'
                    },
                    ADJUST_QUANTITY_BY: {
                        id: 'custpage_cwgp_adjustqtyby',
                        type: serverWidget.FieldType.TEXT,
                        label: 'Adjust Qty. By'
                    },
                    NEW_QUANTITY: {
                        id: 'custpage_cwgp_newquantity',
                        type: serverWidget.FieldType.TEXT,
                        label: 'New Quantity'
                    }
                }
            }
        },
        FIELD_GROUP: {
            franchisepo: {
                PRIMARY: {
                    id: 'custpage_franchisepo_pi_grp',
                    label: 'Primary Infromation'
                },
                CLASS: {
                    id: 'custpage_franchisepo_class_grp',
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
            inventoryadjustment:{
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
        CLIENT_SCRIPT: '../franchise/HEYDAY_CS_CreatePageIntPO.js'
        
    }

    const render = (options) => {
        const {
            response,
            stType,
            stSubsidiary,
            stPageMode,
            stUserId,
            stAccessType,
            stCustomer,
            stLocation,
            stOperator
        } = options;

        const form = serverWidget.createForm({ title: _CONFIG.TITLE[stType] });

        form.clientScriptModulePath = _CONFIG.CLIENT_SCRIPT;
        
        //Initialize Add Scanner Field Group and Fields
        objItemResultSet = EPLib.getInvItemsBySubsidiary({stSubsidiary});
        // const {
        //     objItemResultSet,
        //     objUpcMap,
        // }= EPLib.initScanner({
        //     stType,
        //     stSubsidiary,
        //     _CONFIG
        // })

        // let stUpcMap = ''
        // if(objUpcMap){
        //     stUpcMap = JSON.stringify(objUpcMap)
        // }

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

            if (id == 'custpage_cwgp_vendor') {
                utilLib.addOptionsVendorsBySubsidiary(fld, stSubsidiary);
            }
            if (id == 'custpage_cwgp_scanupccodes' || id == 'custpage_cwgp_upccodemap') {
               // fld.updateDisplayType('hidden');
            }
            

            /*if (id == 'custpage_cwgp_location') {
                utilLib.addOptionsLocationBySubsidiary(fld, stSubsidiary);
            }*/

            const objDefaultValues = mapDefaultValues({
                stSubsidiary, 
                stPageMode, 
                stUserId,
                stAccessType,
                stCustomer,
                stLocation,
                stType,
                stOperator
                //stUpcMap
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
        log.debug('arrCols', arrCols);

        arrCols.forEach((stCol) => {
            const { id, type, label, displayType } = objItemCols[stCol];

            let col = sbl.addField({
                id,
                type,
                label,
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
            }
        });

        form.addSubmitButton({ label: 'Save' });

        form.addButton({
            id: 'custpage_back_button',
            label: 'Back',
            functionName: `back(${stUserId}, ${stAccessType}, 'franchisepo')`
        });

        response.writePage(form);
    };
    
    const renderItemReceipt = (options) => {
        const {
            response,
            stType,
            stSubsidiary,
            stPageMode,
            stUserId,
            stPoId,
            stAccessType
        } = options;
        log.debug('options',options);
        log.debug('stType',stType);
        
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

        //let objPO = utilLib.mapPOtoItemReceiptValues(stPoId);
        /*let objPO = {
                body: {},
                item: []
            };*/
        let objPO = utilLib.mapIRValuesCreate(stPoId);
        log.debug('objPO',objPO);
        //let objPO = utilLib.mapPOValues(stPoId);
        
        objPO.body.custpage_cwgp_rectype = stType;
        objPO.body.custpage_cwgp_pagemode = stPageMode;
        objPO.body.custpage_cwgp_userid = stUserId;
        objPO.body.custpage_cwgp_poid = stPoId;
        objPO.body.custpage_cwgp_createdfrom = 'Purchase Order #'+stPoId;
        objPO.body.custpage_cwgp_accesstype = stAccessType;
        objPO.body.custpage_cwgp_location = 230;
        objPO.body.custpage_cwgp_htmlcss = htmlCss();
        objPO.body.custpage_cwgp_upccodemap = stUpcMap;
        objPO.body.custpage_cwgp_scanbtnhtml = EPLib.getScanButtonCss();

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
            if (id == 'custpage_cwgp_date') {
            	fld.defaultValue = new Date();
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

            if(id == 'custpage_cwgp_receive'){
                col.defaultValue ='T';
            }

        });

        utilLib.setPOSublist(sbl, objPO);

        form.addSubmitButton({ label: 'Save' });
        
        form.addButton({
            id: 'custpage_back_button',
            label: 'Back',
            functionName: `back(${stUserId}, ${stAccessType}, 'franchisepo')`
        });

        response.writePage(form);
    };

    const renderInventoryAdjustment = (options) => {
        const {
            response,
            stType,
            stSubsidiary,
            stPageMode,
            stUserId,
            stAccessType,
            stCustomer,
            stLocation
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
        log.debug('arrFlds', arrFlds);
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
            const objDefaultValues = mapDefaultValues({
                stSubsidiary, 
                stPageMode, 
                stUserId,
                stAccessType,
                stCustomer,
                stLocation,
                stType
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
        log.debug('arrCols', arrCols);
        arrCols.forEach((stCol) => {
            const { id, type, label, displayType} = objItemCols[stCol];
            let col = sbl.addField({
                id,
                type,
                label,
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
            stSubsidiary, 
            stPageMode, 
            stUserId,
            stAccessType,
            stCustomer,
            stLocation,
            stType,
            stUpcMap,
            stOperator
        } = options;

        return {
            custpage_cwgp_subsidiary    : stSubsidiary,
            custpage_cwgp_pagemode      : stPageMode,
            custpage_cwgp_userid        : stUserId,
            custpage_cwgp_accesstype    : stAccessType,
            custpage_cwgp_htmlcss       : htmlCss(),
            custpage_cwgp_scanbtnhtml   : EPLib.getScanButtonCss(),
            custpage_cwgp_upccodemap    : stUpcMap,
            custpage_cwgp_dat           : new Date(),
            custpage_cwgp_customer      : stCustomer,
            custpage_cwgp_location      : stLocation,
            custpage_cwgp_rectype       : stType,
            custpage_cwgp_operator      : stOperator
        }
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
    
        input#custpage_back_button, input#secondarycustpage_back_button, input#custpage_franchisepo_items_clear {
            background-color: white !important;
            color: #105368 !important;
            font-family: 'Roboto Mono', monospace;
        }

        input#custpage_franchisepo_items_remove{
            font-family: 'Roboto Mono', monospace;
        }
        
        div#custpage_franchisepo_itemstab_pane_hd {
            background-color: #dbc8b6 !important;
        }
        
        div#custpage_itemreceipt_itemstab_pane_hd {
            background-color: #dbc8b6 !important;
        }

        div#custpage_inventoryadjustment_itemstab_pane_hd {
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

