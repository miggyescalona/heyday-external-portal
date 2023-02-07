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

define(['N/ui/serverWidget', './HEYDAY_LIB_Util.js', './HEYDAY_LIB_ExternalPortal.js'], (serverWidget, utilLib, EPLib) => {
    let _CONFIG = {
        PARAMETER: {
            PAGE: 'custparam_cwgp_page'
        },
        TITLE: {
            intercompanypo: 'Purchase Order #',
            itemreceipt: 'Item Receipt #',
            inventoryadjustment: 'Inventory Adjustment #'
        },
        TAB: {
            intercompanypo: 'custpage_interpo_itemstab',
            itemreceipt: 'custpage_itemreceipt_itemstab',
            inventoryadjustment: 'custpage_inventoryadjustment_itemstab',
            inventoryadjustment_damaged: 'custpage_inventoryadjustmentdamaged_itemstab',
            inventoryadjustment_variance: 'custpage_inventoryadjustmentvariance_itemstab',
        },
        SUBLIST: {
            intercompanypo: 'custpage_interpo_items',
            itemreceipt: 'custpage_itemreceipt_items',
            inventoryadjustment: 'custpage_inventoryadjustment_items',
            inventoryadjustment_damaged: 'custpage_inventoryadjustmentdamaged_items',
            inventoryadjustment_variance: 'custpage_inventoryadjustmentvariance_items'
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
                TRAN_ID: {
                    id: 'custpage_cwgp_tranid',
                    type: serverWidget.FieldType.TEXT,
                    label: 'tranId',
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
                    mandatory: true,
                    displayType: 'inline',
                },
                DATE: {
                    id: 'custpage_cwgp_date',
                    type: serverWidget.FieldType.DATE,
                    label: 'Date',
                    container: 'PRIMARY',
                    mandatory: true,
                    defaultValue: new Date()
                },
                MEMO: {
                    id: 'custpage_cwgp_memomain',
                    type: serverWidget.FieldType.TEXT,
                    label: 'Memo',
                    container: 'PRIMARY',
                },
                APPROVAL_STATUS: {
                    id: 'custpage_cwgp_approvalstatus',
                    type: serverWidget.FieldType.TEXT,
                    label: 'Approval Status',
                    container: 'PRIMARY',
                    displayType: 'inline'
                },
                AMS_TRACKING_NUMBER: {
                    id: 'custpage_cwgp_sointercoid',
                    type: serverWidget.FieldType.TEXT,
                    label: 'AMS Tracking Number',
                    container: 'PRIMARY',
                    displayType: 'inline'
                },
                FOR_RECEIVING: {
                    id: 'custpage_cwgp_forreceiving',
                    type: serverWidget.FieldType.TEXT,
                    label: 'For Receiving',
                    container: 'PRIMARY',
                    displayType: 'inline'
                },
                OPERATOR: {
                    id: 'custpage_cwgp_operator',
                    type: serverWidget.FieldType.TEXT,
                    label: 'Operator',
                    container: 'PRIMARY',
                    displayType: 'inline',
                    breakType: 'STARTCOL'
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
                    displayType: 'inline'
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
                ITEMRECEIPT_ID: {
                    id: 'custpage_cwgp_itemreceiptid',
                    type: serverWidget.FieldType.TEXT,
                    label: 'poId',
                    displayType: 'hidden'
                },
                TRAN_ID: {
                    id: 'custpage_cwgp_tranid',
                    type: serverWidget.FieldType.TEXT,
                    label: 'tranId',
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
                AMS_TRACKING_NUMBER: {
                    id: 'custpage_cwgp_sointercoid',
                    type: serverWidget.FieldType.TEXT,
                    label: 'AMS Tracking Number',
                    container: 'PRIMARY',
                    displayType:'inline'
                },
                SUBSIDIARY: {
                    id: 'custpage_cwgp_subsidiary',
                    type: serverWidget.FieldType.SELECT,
                    label: 'Subsidiary',
                    source: 'subsidiary',
                    container: 'CLASS',
                    displayType: 'inline'
                },
                CREATEDFROM: {
                    id: 'custpage_cwgp_createdfrom',
                    type: serverWidget.FieldType.TEXT,
                    label: 'Created From',
                    container: 'CLASS',
                    displayType: 'inline'
                },
                DAMAGED_INVENTORY_ID:{
                    id: 'custpage_cwgp_damagediaid',
                    type: serverWidget.FieldType.TEXT,
                    label: 'Damaged Inventory Adjustment',
                    container: 'CLASS',
                    displayType: 'hidden'
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
                        displayType: 'disabled'
                    },
                    INTERNAL_SKU: {
                        id: 'custpage_cwgp_internalsku',
                        type: serverWidget.FieldType.TEXT,
                        label: 'Internal SKU',
                        displayType: 'disabled'
                    },
                    UPC_CODE: {
                        id: 'custpage_cwgp_upccode',
                        type: serverWidget.FieldType.TEXT,
                        label: 'UPC Code',
                        displayType: 'disabled'
                    },
                    BUSINESS_LINE: {
                        id: 'custpage_cwgp_businessline',
                        type: serverWidget.FieldType.SELECT,
                        label: 'Business Line',
                        displayType: 'hidden'
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
                        displayType: 'disabled',
                    },
                    AMOUNT: {
                        id: 'custpage_cwgp_amount',
                        type: serverWidget.FieldType.FLOAT,
                        label: 'Amount',
                        displayType: 'disabled'
                    },
                    EXPECTED_RECEIPT_DATE: {
                        id: 'custpage_cwgp_expectedreceiptdate',
                        type: serverWidget.FieldType.DATE,
                        label: 'Expected Receipt Date',
                    }
                },    
                itemreceipt: {
                    RECEIVE: {
                        id: 'custpage_cwgp_receive',
                        type: serverWidget.FieldType.CHECKBOX,
                        label: 'Receive',
                        displayType: 'inline'
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
                    BUSINESS_LINE: {
                        id: 'custpage_cwgp_businessline',
                        type: serverWidget.FieldType.SELECT,
                        label: 'Business Line',
                        displayType: 'hidden'
                    },
                    TRANSFER_LOCATION: {
                        id: 'custpage_cwgp_transferlocation',
                        type: serverWidget.FieldType.SELECT,
                        label: 'Location',
                        displayType: 'inline'
                    },
                    QUANTITY_REMAINING: {
                        id: 'custpage_cwgp_quantityremaining',
                        type: serverWidget.FieldType.INTEGER,
                        label: 'REMAINING',
                    },
                    QUANTITY: {
                        id: 'custpage_cwgp_quantity',
                        type: serverWidget.FieldType.INTEGER,
                        label: 'Received Quantity',
                        displayType: 'inline'
                    },
                    /*RATE: {
                        id: 'custpage_cwgp_rate',
                        type: serverWidget.FieldType.FLOAT,
                        label: 'Rate'
                    },*/
                },
                inventoryadjustment_damaged:{
                    INVENTORY_ADJUSTMENT: {
                        id: 'custpage_cwgp_inventoryadjustment',
                        type: serverWidget.FieldType.TEXT,
                        label: 'Inventory Adjustment #',
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
                    DAMAGED_QUANTITY:{
                        id: 'custpage_cwgp_adjustqtyby',
                        type: serverWidget.FieldType.TEXT,
                        label: 'Damaged Quantity',
                    },
                    DAMAGED_ADJUSTING_ACCOUNT: {
                        id: 'custpage_cwgp_damagedadjustingaccount',
                        type: serverWidget.FieldType.TEXT,
                        label: 'Inventory Adjustment Account',
                    },
                },inventoryadjustment_variance:{
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
                    },
                    OPERATOR: {
                        id: 'custpage_cwgp_operator',
                        type: serverWidget.FieldType.TEXT,
                        label: 'Operator',
                    },
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
            }
        },
        CLIENT_SCRIPT: '../client/HEYDAY_CS_CreatePageIntPO.js',
    }


    const render = (options) => {
        log.debug('===VIEW===','===Edit Intercompany PO===');
        const {
            response,
            stType,
            stSubsidiary,
            stPageMode,
            stUserId,
            stPoId,
            stAccessType,
            stTranId
        } = options;

        const form = serverWidget.createForm({ title: _CONFIG.TITLE[stType]+stTranId});

        form.clientScriptModulePath = _CONFIG.CLIENT_SCRIPT;

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

        let objPO = utilLib.mapPOValues(stPoId);
        objPO.body.custpage_cwgp_rectype = stType;
        objPO.body.custpage_cwgp_pagemode = stPageMode;
        objPO.body.custpage_cwgp_userid = stUserId;
        objPO.body.custpage_cwgp_poid = stPoId;
        objPO.body.custpage_cwgp_accesstype = stAccessType;
        objPO.body.custpage_cwgp_tranid = stTranId;
        objPO.body.custpage_cwgp_htmlcss = htmlCss();
        // objPO.body.custpage_cwgp_upccodemap = stUpcMap;
        // objPO.body.custpage_cwgp_scanbtnhtml = EPLib.getScanButtonCss();
        //log.debug('objPO', objPO);

        let objPOValues = utilLib.getPOValues(stPoId);
        log.debug('objPOValuesButton',JSON.stringify({
            stApprovalStatus: objPOValues.stApprovalStatus,
            stPairedInterco: objPOValues.stPairedIntercoStatus,
            stDocumentStatus: objPOValues.stDocumentStatus
        }));
        if(objPOValues.stApprovalStatus == 'Approved' && (objPOValues.stPairedIntercoStatus == 'pendingBilling' || objPOValues.stPairedIntercoStatus == 'pendingBillingPartFulfilled') && (objPOValues.stDocumentStatus == 'pendingBillPartReceived' || objPOValues.stDocumentStatus == 'pendingReceipt')){
            objPO.body.custpage_cwgp_forreceiving = 'Yes'
        }
        else{
            objPO.body.custpage_cwgp_forreceiving = 'No'
        }

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

            if (id == 'custpage_cwgp_vendor') {
                utilLib.addOptionsVendorsBySubsidiary(fld, stSubsidiary);
            }

            if (id == 'custpage_cwgp_location') {
                utilLib.addOptionsLocationBySubsidiary(fld, stSubsidiary);
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
                utilLib.addOptionsItemBySubsidiary(col, stSubsidiary);
            }
        });

        utilLib.setSublistValues(sbl, objPO);

        form.addSubmitButton({ label: 'Save' });
        
        form.addButton({
            id: 'custpage_back_button',
            label: 'Back',
            functionName: `back(${stUserId}, ${stAccessType}, 'intercompanypo')`
        });

        // form.addButton(EPLib.SCANNER_UI.SCAN_BUTTON);

        response.writePage(form);
    };

    const renderItemReceipt = (options) => {
        log.debug('===Edit===','===Edit Item Receipt===');
        const {
            response,
            stType,
            stSubsidiary,
            stPageMode,
            stUserId,
            stPoId,
            stAccessType,
            stTranId
        } = options;

        const form = serverWidget.createForm({ title: _CONFIG.TITLE[stType]+stTranId});

        form.clientScriptModulePath = _CONFIG.CLIENT_SCRIPT;

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

        let objPO = utilLib.mapItemReceiptValues(stPoId);
        objPO.body.custpage_cwgp_rectype = stType;
        objPO.body.custpage_cwgp_pagemode = stPageMode;
        objPO.body.custpage_cwgp_userid = stUserId;
        objPO.body.custpage_cwgp_itemreceiptid = stPoId;
        objPO.body.custpage_cwgp_accesstype = stAccessType;
        objPO.body.custpage_cwgp_tranid = stTranId;
        objPO.body.custpage_cwgp_htmlcss = htmlCss();
        // objPO.body.custpage_cwgp_upccodemap = stUpcMap;
        // objPO.body.custpage_cwgp_scanbtnhtml = EPLib.getScanButtonCss();

       // let stDamageIAid = objPO.body.custpage_cwgp_damagediaid;
        

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
        });

        //render item sublist
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

        log.debug('ir id',stPoId);
        utilLib.setSublistValues(sbl, objPO);
        let arrMapDamagedInventoryAdjustment = utilLib.mapDamagedInventoryAdjustment(stPoId);
        log.debug('arrMapDamagedInventoryAdjustment',arrMapDamagedInventoryAdjustment.item)
         log.debug('arrMapDamagedInventoryAdjustment length',arrMapDamagedInventoryAdjustment.item.length)
        ////render damaged sublist
        if(arrMapDamagedInventoryAdjustment.item.length>0){
            const stType = 'inventoryadjustment_damaged';

            //let objPO = utilLib.mapInventoryAdjustmentValues(stDamageIAid);

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
    
            utilLib.setSublistValues(sbl, arrMapDamagedInventoryAdjustment);
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


        form.addSubmitButton({ label: 'Save' });
        
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
    
        input#custpage_back_button, 
        input#secondarycustpage_back_button, 
        input#custpage_interpo_items_clear, 
        input#custpage_interpo_items_remove {
            background-color: white !important;
            color: #105368 !important;
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

