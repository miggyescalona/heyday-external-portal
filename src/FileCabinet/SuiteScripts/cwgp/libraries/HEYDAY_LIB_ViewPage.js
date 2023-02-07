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

define(['N/ui/serverWidget', './HEYDAY_LIB_Util.js'], (serverWidget, utilLib) => {
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
                    label: 'pageMode',
                    displayType: 'hidden'
                },
                ACCESS_TYPE: {
                    id: 'custpage_cwgp_accesstype',
                    type: serverWidget.FieldType.TEXT,
                    label: 'accessType',
                    displayType: 'hidden'
                },
                VENDOR: {
                    id: 'custpage_cwgp_vendor',
                    type: serverWidget.FieldType.SELECT,
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
                    mandatory: true,
                    displayType: 'inline'
                },
                MEMO: {
                    id: 'custpage_cwgp_memomain',
                    type: serverWidget.FieldType.TEXT,
                    label: 'Memo',
                    container: 'PRIMARY',
                    displayType: 'inline',
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
                    displayType: 'inline',
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
                    displayType: 'inline'
                },
                AMOUNT: {
                    id: 'custpage_cwgp_totalamount',
                    type: serverWidget.FieldType.TEXT,
                    label: 'Amount',
                    container: 'PRIMARY',
                    displayType: 'inline',
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
                    mandatory: true,
                    displayType: 'inline'
                },
                MEMO: {
                    id: 'custpage_cwgp_memomain',
                    type: serverWidget.FieldType.TEXT,
                    label: 'Memo',
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
                AMS_TRACKING_NUMBER: {
                    id: 'custpage_cwgp_sointercoid',
                    type: serverWidget.FieldType.TEXT,
                    label: 'AMS Tracking Number',
                    container: 'PRIMARY',
                    displayType: 'inline',
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
                ADJUSTMENT_ACCOUNT: {
                    id: 'custpage_cwgp_adjustmentaccount',
                    type: serverWidget.FieldType.TEXT,
                    label: 'Adjustment Account',
                    container: 'PRIMARY',
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
                POSTING_PERIOD: {
                    id: 'custpage_cwgp_postingperiod',
                    type: serverWidget.FieldType.TEXT,
                    label: 'Posting Period',
                    container: 'PRIMARY',
                    displayType: 'inline'
                },
                MEMO: {
                    id: 'custpage_cwgp_memomain',
                    type: serverWidget.FieldType.TEXT,
                    label: 'Memo',
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
                    type: serverWidget.FieldType.TEXT,
                    label: 'Subsidiary',
                    container: 'CLASS',
                    displayType: 'inline'
                },
                BUSINESS_LINE: {
                    id: 'custpage_cwgp_businessline',
                    type: serverWidget.FieldType.TEXT,
                    label: 'Business Line',
                    container: 'CLASS',
                    displayType: 'inline'
                },
                ADJUSTMENT_LOCATION: {
                    id: 'custpage_cwgp_adjustmentlocation',
                    type: serverWidget.FieldType.TEXT,
                    label: 'Adjustment Location',
                    container: 'CLASS',
                    displayType: 'inline'
                },
            },
        },
        COLUMN: {
            ITEMS: {
                intercompanypo:{
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
                        label: 'Description'
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
                    EXPECTED_RECEIPT_DATE: {
                        id: 'custpage_cwgp_expectedreceiptdate',
                        type: serverWidget.FieldType.DATE,
                        label: 'Expected Receipt Date',
                    }
                },
                itemreceipt: {
                    ITEM: {
                        id: 'custpage_cwgp_item',
                        type: serverWidget.FieldType.TEXT,
                        label: 'Items',
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
                        id: 'custpage_cwgp_businesslinetext',
                        type: serverWidget.FieldType.TEXT,
                        label: 'Business Line',
                        displayType:'hidden'
                    },
                    TRANSFER_LOCATION: {
                        id: 'custpage_cwgp_transferlocationtext',
                        type: serverWidget.FieldType.TEXT,
                        label: 'Location',
                    },
                    QUANTITY: {
                        id: 'custpage_cwgp_quantity',
                        type: serverWidget.FieldType.INTEGER,
                        label: 'Received Quantity'
                    },
                    /*RATE: {
                        id: 'custpage_cwgp_rate',
                        type: serverWidget.FieldType.FLOAT,
                        label: 'Rate'
                    },*/
                },
                inventoryadjustment: {
                    ITEM: {
                        id: 'custpage_cwgp_item',
                        type: serverWidget.FieldType.TEXT,
                        label: 'Items',
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
                    LOCATION: {
                        id: 'custpage_cwgp_location',
                        type: serverWidget.FieldType.TEXT,
                        label: 'Location',
                    },
                    UNITS: {
                        id: 'custpage_cwgp_units',
                        type: serverWidget.FieldType.TEXT,
                        label: 'Units',
                    },
                    QTY_ON_HAND: {
                        id: 'custpage_cwgp_qtyonhand',
                        type: serverWidget.FieldType.TEXT,
                        label: 'Quantity On Hand'
                    },
                    ADJUST_QUANTITY_BY: {
                        id: 'custpage_cwgp_adjustqtyby',
                        type: serverWidget.FieldType.TEXT,
                        label: 'Adjust Inventory Quantity'
                    },
                    NEW_QUANTITY: {
                        id: 'custpage_cwgp_newquantity',
                        type: serverWidget.FieldType.TEXT,
                        label: 'New Quantity'
                    },
                    ESTIMATED_UNIT_COST: {
                        id: 'custpage_cwgp_estimatedunitcost',
                        type: serverWidget.FieldType.TEXT,
                        label: 'Est Unit Cost'
                    },
                    BUSINESS_LINE: {
                        id: 'custpage_cwgp_businessline',
                        type: serverWidget.FieldType.TEXT,
                        label: 'Business Line'
                    },
                    ADJUSTMENT_REASON: {
                        id: 'custpage_cwgp_adjustmentreason',
                        type: serverWidget.FieldType.TEXT,
                        label: 'Adjustment Reason'
                    }
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
                    label: 'Primary Information'
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
        CLIENT_SCRIPT: '../client/HEYDAY_CS_ViewPage.js'
    }

    const render = (options) => {
        log.debug('===VIEW===','===View Intercompany PO===');
        const {
            response,
            stType,
            stPageMode,
            stUserId,
            stPoId,
            stAccessType,
            stTranId
        } = options;

        const form = serverWidget.createForm({ title: _CONFIG.TITLE[stType]+stTranId});

        form.clientScriptModulePath = _CONFIG.CLIENT_SCRIPT;

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
        objPO.body.custpage_cwgp_pagemode = stPageMode;
        objPO.body.custpage_cwgp_userid = stUserId;
        objPO.body.custpage_cwgp_accesstype = stAccessType
        objPO.body.custpage_cwgp_htmlcss = htmlCss();
        //log.debug('objPO', objPO);

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
                displayType,
                breakType
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

            if (breakType) {
                fld.updateBreakType({ breakType });
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

        log.debug('objPOValues', JSON.stringify(objPOValues));

        if(objPOValues.stApprovalStatus != 'Approved'){
                form.addButton({
                id: 'custpage_edit_btn',
                label: 'Edit',
                functionName: `toEdiTransaction(${stUserId}, ${stPoId}, ${stAccessType},${stTranId},'intercompanypo')`
            });
        }

        form.addButton({
            id: 'custpage_back_button',
            label: 'Back',
            functionName: `back(${stUserId}, ${stAccessType}, 'intercompanypo')`
        });

        if(objPOValues.stApprovalStatus == 'Approved' && (objPOValues.stPairedIntercoStatus == 'pendingBilling' || objPOValues.stPairedIntercoStatus == 'pendingBillingPartFulfilled') && (objPOValues.stDocumentStatus == 'pendingBillPartReceived' || objPOValues.stDocumentStatus == 'pendingReceipt')){
            form.addButton({
                id: 'custpage_receive_btn',
                label: 'Receive',
                functionName: `toReceive(${stUserId}, ${stPoId}, ${stAccessType}, ${stTranId}, 'itemreceipt')`
            });
        }

        response.writePage(form);
    };

    const renderItemReceipt = (options) => {
        log.debug('===VIEW===','===View Item Receipt===');
        const {
            response,
            stType,
            stPageMode,
            stUserId,
            stPoId,
            stAccessType,
            stTranId,
        } = options;


        const form = serverWidget.createForm({ title: _CONFIG.TITLE[stType]+stTranId});

        form.clientScriptModulePath = _CONFIG.CLIENT_SCRIPT;

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
        objPO.body.custpage_cwgp_pagemode = stPageMode;
        objPO.body.custpage_cwgp_userid = stUserId;
        objPO.body.custpage_cwgp_accesstype = stAccessType
        objPO.body.custpage_cwgp_htmlcss = htmlCss();
        //log.debug('objPO', objPO);

        let stDamageIAid = objPO.body.custpage_cwgp_damagediaid;

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

        //render item sublist
        form.addSubtab({
            id: _CONFIG.TAB[stType],
            label: 'Received'
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

        
        log.debug('ir id',stPoId);
        //utilLib.setSublistValues(sbl, objPO);
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

        form.addButton({
            id: 'custpage_edit_btn',
            label: 'Edit',
            functionName: `toEdiTransaction(${stUserId}, ${stPoId}, ${stAccessType},${stTranId},'itemreceipt')`
        });

        form.addButton({
            id: 'custpage_back_button',
            label: 'Back',
            functionName: `back(${stUserId}, ${stAccessType}, 'itemreceipt')`
        });


        response.writePage(form);

        
    };

    const renderInventoryAdjustment = (options) => {
        log.debug('===VIEW===','===View Inventory Adjustment ===');
        const {
            response,
            stType,
            stPageMode,
            stUserId,
            stPoId,
            stAccessType,
            stTranId,
        } = options;


        const form = serverWidget.createForm({ title: _CONFIG.TITLE[stType]+stTranId});

        form.clientScriptModulePath = _CONFIG.CLIENT_SCRIPT;

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
        let objPO = utilLib.mapInventoryAdjustmentValues(stPoId);
        objPO.body.custpage_cwgp_pagemode = stPageMode;
        objPO.body.custpage_cwgp_userid = stUserId;
        objPO.body.custpage_cwgp_accesstype = stAccessType
        objPO.body.custpage_cwgp_htmlcss = htmlCss();
        //log.debug('objPO', objPO);

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

        //render items sublist
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

        form.addButton({
            id: 'custpage_back_button',
            label: 'Back',
            functionName: `back(${stUserId}, ${stAccessType}, 'inventoryadjustment')`
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
    
        input#custpage_edit_btn, input#secondarycustpage_edit_btn {
            background-color: #105368 !important;
            color: white !important;
            font-family: 'Roboto Mono', monospace;
        }
    
        input#custpage_back_button, input#secondarycustpage_back_button {
            background-color: white !important;
            color: #105368 !important;
            font-family: 'Roboto Mono', monospace;
        }

        input#custpage_receive_btn, input#secondarycustpage_receive_btn {
            background-color: #105368 !important;
            color: white !important;
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

        #custpage_cwgp_totalamount_val {
            font-weight: bold !important;
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

