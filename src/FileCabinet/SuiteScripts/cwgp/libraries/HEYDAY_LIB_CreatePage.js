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
            intercompanypo: 'Purchase Order',
            itemreceipt: 'Receive Items',
            inventoryadjustment_standard: 'Inventory Adjustment',
            inventoryadjustment_backbar: 'Backbar Usage',
            inventoryadjustment_damagetestertheft: 'Damage/Tester/Theft',
            inventorycount: 'Inventory Count'
        },
        TAB: {
            intercompanypo: 'custpage_interpo_itemstab',
            itemreceipt: 'custpage_itemreceipt_itemstab',
            inventoryadjustment_standard: 'custpage_inventoryadjustment_itemstab',
            inventoryadjustment_backbar: 'custpage_inventoryadjustmentbackbar_itemstab',
            inventoryadjustment_damagetestertheft: 'custpage_inventoryadjustmentdamagetestertheft_itemstab',
            inventorycount: 'custpage_inventoryadjustmentinventorycount_itemstab'
        },
        SUBLIST: {
            intercompanypo: 'custpage_interpo_items',
            itemreceipt: 'custpage_itemreceipt_items',
            inventoryadjustment_standard: 'custpage_inventorayadjustment_items',
            inventoryadjustment_backbar: 'custpage_inventorayadjustmentbackbar_items',
            inventoryadjustment_damagetestertheft: 'custpage_inventoryadjustmentdamagetestertheft_items',
            inventorycount: 'custpage_inventoryadjustmentinventorycount_items',
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
                    displayType: 'inline'
                },
                DATE: {
                    id: 'custpage_cwgp_date',
                    type: serverWidget.FieldType.DATE,
                    label: 'Date',
                    container: 'PRIMARY',
                    mandatory: true
                },
                DELIVER_BY_DATE: {
                    id: 'custpage_cwgp_deliverbydate',
                    type: serverWidget.FieldType.DATE,
                    label: 'Deliver By Date',
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
                OPERATOR_HIDDEN: {
                    id: 'custpage_cwgp_operatorhidden',
                    type: serverWidget.FieldType.TEXT,
                    label: 'Operator Hidden',
                    container: 'PRIMARY',
                    displayType: 'hidden'
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
                    container: 'CLASS',
                    displayType: 'hidden'
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
                    mandatory: true,
                },
                CREATEDFROM: {
                    id: 'custpage_cwgp_createdfrom',
                    type: serverWidget.FieldType.TEXT,
                    label: 'Created From',
                    container: 'PRIMARY',
                    displayType: 'inline',
                    breakType: 'STARTCOL'
                },
                AMS_TRACKING_NUMBER: {
                    id: 'custpage_cwgp_sointercoid',
                    type: serverWidget.FieldType.TEXT,
                    label: 'AMS Tracking Number',
                    container: 'PRIMARY',
                    displayType: 'inline',
                },
                MEMO: {
                    id: 'custpage_cwgp_memomain',
                    type: serverWidget.FieldType.TEXT,
                    label: 'Memo',
                    container: 'PRIMARY',
                    breakType: 'STARTCOL'
                },
                OPERATOR: {
                    id: 'custpage_cwgp_operator',
                    type: serverWidget.FieldType.TEXT,
                    label: 'Operator',
                    container: 'PRIMARY',
                    displayType: 'inline'
                },
                OPERATOR_HIDDEN: {
                    id: 'custpage_cwgp_operatorhidden',
                    type: serverWidget.FieldType.TEXT,
                    label: 'Operator Hidden',
                    container: 'PRIMARY',
                    displayType: 'hidden'
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
                    mandatory: true,
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
                    container: 'PRIMARY',
                    displayType: 'hidden'
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
                OPERATOR_HIDDEN: {
                    id: 'custpage_cwgp_operatorhidden',
                    type: serverWidget.FieldType.TEXT,
                    label: 'Operator Hidden',
                    container: 'PRIMARY',
                    displayType: 'hidden'
                },
                SUBSIDIARY: {
                    id: 'custpage_cwgp_subsidiary',
                    type: serverWidget.FieldType.SELECT,
                    label: 'Subsidiary',
                    container: 'CLASS',
                    source: 'subsidiary',
                    displayType: 'inline'
                },
                BUSINESS_LINE: {
                    id: 'custpage_cwgp_businessline',
                    type: serverWidget.FieldType.SELECT,
                    label: 'Business Line',
                    container: 'CLASS',
                    displayType: 'hidden'
                },
                ADJUSTMENT_LOCATION: {
                    id: 'custpage_cwgp_adjustmentlocation',
                    type: serverWidget.FieldType.SELECT,
                    label: 'Location',
                    container: 'CLASS',
                    source: 'location',
                    displayType: 'inline'
                },
                SUBTYPE: {
                    id: 'custpage_cwgp_adjustmentsubtype',
                    type: serverWidget.FieldType.TEXT,
                    label: 'Inventory Adjustment Subtype',
                    container: 'CLASS',
                    displayType: 'hidden'
                },
                TOTAL_ADJUSTMENT_HTML: {
                    id: 'custpage_cwgp_totaladjustment',
                    type: serverWidget.FieldType.TEXTAREA,
                    label: '   ',
                    container: 'TOTAL_ADJUSTMENT',
                    displayType:'inline'
                },
                TOTAL_ADJUSTMENT_HTMLHIDDEN: {
                    id: 'custpage_cwgp_totaladjustmenthidden',
                    type: serverWidget.FieldType.LONGTEXT,
                    label: 'Total Adjustment Hidden',
                    container: 'TOTAL_ADJUSTMENT',
                    displayType: 'hidden'
                },
                ITEM_SUMMARY_HTML: {
                    id: 'custpage_cwgp_itemsummary',
                    type: serverWidget.FieldType.TEXTAREA,
                    label: '   ',
                    container: 'ITEM_SUMMARY',
                    displayType: 'inline'
                },
                SUBTYPE_ID: {
                    id: 'custpage_cwgp_adjustmentsubtypeid',
                    type: serverWidget.FieldType.TEXT,
                    label: 'Inventory Adjustment Subtype Id',
                    container: 'PRIMARY',
                    displayType: 'hidden'
                },             
            },
            inventorycount:{
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
                    mandatory: true,
                    isInline: ['2','3','4']
                },
                DATE: {
                    id: 'custpage_cwgp_date',
                    type: serverWidget.FieldType.DATE,
                    label: 'Date',
                    container: 'PRIMARY',
                    mandatory: true,
                    isInline: ['2','3','4']
                },
                POSTING_PERIOD: {
                    id: 'custpage_cwgp_postingperiod',
                    type: serverWidget.FieldType.SELECT,
                    label: 'Posting Period',
                    container: 'PRIMARY',
                    displayType: 'hidden'
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
                OPERATOR_HIDDEN: {
                    id: 'custpage_cwgp_operatorhidden',
                    type: serverWidget.FieldType.TEXT,
                    label: 'Operator Hidden',
                    container: 'PRIMARY',
                    displayType: 'hidden'
                },
                SUBSIDIARY: {
                    id: 'custpage_cwgp_subsidiary',
                    type: serverWidget.FieldType.SELECT,
                    label: 'Subsidiary',
                    container: 'CLASS',
                    source: 'subsidiary',
                    displayType: 'inline'
                },
                BUSINESS_LINE: {
                    id: 'custpage_cwgp_businessline',
                    type: serverWidget.FieldType.SELECT,
                    label: 'Business Line',
                    container: 'CLASS',
                    displayType: 'hidden'
                },
                ADJUSTMENT_LOCATION: {
                    id: 'custpage_cwgp_adjustmentlocation',
                    type: serverWidget.FieldType.SELECT,
                    label: 'Location',
                    container: 'CLASS',
                    source: 'location',
                    displayType: 'inline'
                },
                SUBTYPE: {
                    id: 'custpage_cwgp_adjustmentsubtype',
                    type: serverWidget.FieldType.TEXT,
                    label: 'Inventory Adjustment Subtype',
                    container: 'CLASS',
                    displayType: 'hidden'
                },
                SUBTYPE_ID: {
                    id: 'custpage_cwgp_adjustmentsubtypeid',
                    type: serverWidget.FieldType.TEXT,
                    label: 'Inventory Adjustment Subtype Id',
                    container: 'PRIMARY',
                    displayType: 'hidden'
                },          
                STEP: {
                    id: 'custpage_cwgp_step',
                    type: serverWidget.FieldType.TEXT,
                    label: 'Step',
                    displayType: 'hidden'
                },
                ITEM_SUBLIST: {
                    id: 'custpage_cwgp_itemlist',
                    type: serverWidget.FieldType.LONGTEXT,
                    label: 'Item List',
                    displayType: 'hidden'
                },
                ITEM_SUMMARY_HTML: {
                    id: 'custpage_cwgp_itemsummary',
                    type: serverWidget.FieldType.TEXTAREA,
                    label: '   ',
                    container: 'ITEM_SUMMARY',
                    displayType: 'inline'
                },
                TOTAL_DISCREPANCY_HTMLHIDDEN: {
                    id: 'custpage_cwgp_totaldiscrepancy',
                    type: serverWidget.FieldType.LONGTEXT,
                    label: 'Total Discrepancy Hidden',
                    container: 'PRIMARY',
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
                        displayType:'disabled'
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
                        displayType: 'disabled',
                    },
                    AMOUNT: {
                        id: 'custpage_cwgp_amount',
                        type: serverWidget.FieldType.CURRENCY,
                        label: 'Amount',
                        displayType: 'disabled'
                    },
                    /*EXPECTED_RECEIPT_DATE: {
                        id: 'custpage_cwgp_expectedreceiptdate',
                        type: serverWidget.FieldType.DATE,
                        label: 'Expected Receipt Date',
                    },*/
                    BUSINESS_LINE: {
                        id: 'custpage_cwgp_businessline',
                        type: serverWidget.FieldType.SELECT,
                        label: 'Business Line',
                        displayType: 'hidden'
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
                    STARTING_QUANTITY: {
                        id: 'custpage_cwgp_startingquantity',
                        type: serverWidget.FieldType.INTEGER,
                        label: 'Starting Quantity',
                    },
                    STARTING_QUANTITY_HIDDEN: {
                        id: 'custpage_cwgp_startingquantityhidden',
                        type: serverWidget.FieldType.INTEGER,
                        label: 'Starting Quantity Hidden',
                        displayType: 'hidden'
                    },
                    SHIPPED_QUANTITY: {
                        id: 'custpage_cwgp_shippedquantity',
                        type: serverWidget.FieldType.INTEGER,
                        label: 'Shipped Quantity'
                    },
                    SHIPPED_QUANTITY_HIDDEN: {
                        id: 'custpage_cwgp_shippedquantityhidden',
                        type: serverWidget.FieldType.INTEGER,
                        label: 'Shipped Quantity Hidden',
                        displayType: 'hidden'
                    },
                    REMAINING_QUANTITY: {
                        id: 'custpage_cwgp_quantityremaining',
                        type: serverWidget.FieldType.INTEGER,
                        label: 'Remaining Quantity'
                    },
                    REMAINING_QUANTITY_HIDDEN: {
                        id: 'custpage_cwgp_quantityremaininghidden',
                        type: serverWidget.FieldType.INTEGER,
                        label: 'Remaining Quantity',
                        displayType:'hidden'
                    },
                    QUANTITY: {
                        id: 'custpage_cwgp_quantity',
                        type: serverWidget.FieldType.INTEGER,
                        label: 'Received Quantity',
                        displayType: 'ENTRY'
                    },
                    DAMAGED_QUANTITY: {
                        id: 'custpage_cwgp_damagedquantity',
                        type: serverWidget.FieldType.INTEGER,
                        label: 'Damaged Quantity',
                        displayType: 'ENTRY'
                    },
                    DAMAGED_ADJUSTING_ACCOUNT: {
                        id: 'custpage_cwgp_damagedadjustingaccount',
                        type: serverWidget.FieldType.SELECT,
                        label: 'Damaged Adjusting Account',
                        displayType: 'ENTRY'
                    },
                    VARIANCE: {
                        id: 'custpage_cwgp_variance',
                        type: serverWidget.FieldType.INTEGER,
                        label: 'Variance',
                        displayType: 'ENTRY'
                    },
                    FINAL_QUANTITY: {
                        id: 'custpage_cwgp_finalquantity',
                        type: serverWidget.FieldType.INTEGER,
                        label: 'Final Quantity',
                        displayType: 'ENTRY'
                    },

                },
                inventoryadjustment_standard: {
                    ITEM: {
                        id: 'custpage_cwgp_item',
                        type: serverWidget.FieldType.SELECT,
                        label: 'Items',
                        mandatory: true
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
                        displayType:'disabled'
                    },
                    UPC_CODE: {
                        id: 'custpage_cwgp_upccode',
                        type: serverWidget.FieldType.TEXT,
                        label: 'UPC Code',
                        displayType:'disabled'
                    },
                    LOCATION: {
                        id: 'custpage_cwgp_location',
                        type: serverWidget.FieldType.SELECT,
                        label: 'Location',
                        displayType: 'hidden'
                    },
                    QTY_ON_HAND: {
                        id: 'custpage_cwgp_qtyonhand',
                        type: serverWidget.FieldType.INTEGER,
                        label: 'Starting Quantity',
                        displayType: 'disabled'
                    },
                    ADJUST_QUANTITY_BY: {
                        id: 'custpage_cwgp_adjustqtyby',
                        type: serverWidget.FieldType.INTEGER,
                        label: '*Adjust Inventory Quantity'
                    },
                    ENDING_INVENTORY_QUANTITY: {
                        id: 'custpage_cwgp_endinginventoryqty',
                        type: serverWidget.FieldType.INTEGER,
                        label: '*Ending Inventory Quantity'
                    },
                    NEW_QUANTITY: {
                        id: 'custpage_cwgp_newquantity',
                        type: serverWidget.FieldType.INTEGER,
                        label: 'Final Quantity',
                        displayType: 'disabled'
                    },
                    BUSINESS_LINE: {
                        id: 'custpage_cwgp_businessline',
                        type: serverWidget.FieldType.SELECT,
                        label: 'Business Line',
                        displayType: 'hidden'
                    },
                    ADJUSTMENT_TYPE: {
                        id: 'custpage_cwgp_adjustmenttype',
                        type: serverWidget.FieldType.SELECT,
                        label: 'Adjustment Type',
                        displayType:'disabled'
                    },
                    ADJUSTMENT_REASON: {
                        id: 'custpage_cwgp_adjustmentreason',
                        type: serverWidget.FieldType.TEXTAREA,
                        label: '*Adjustment Reason',
                    }
                },
                inventoryadjustment_backbar: {
                    ITEM: {
                        id: 'custpage_cwgp_item',
                        type: serverWidget.FieldType.SELECT,
                        label: 'Items',
                        mandatory: true
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
                        displayType:'disabled'
                    },
                    UPC_CODE: {
                        id: 'custpage_cwgp_upccode',
                        type: serverWidget.FieldType.TEXT,
                        label: 'UPC Code',
                        displayType:'disabled'
                    },
                    LOCATION: {
                        id: 'custpage_cwgp_location',
                        type: serverWidget.FieldType.SELECT,
                        label: 'Location',
                        displayType: 'hidden'
                    },
                    QTY_ON_HAND: {
                        id: 'custpage_cwgp_qtyonhand',
                        type: serverWidget.FieldType.INTEGER,
                        label: 'Starting Quantity',
                        displayType: 'disabled'
                    },
                    ADJUST_QUANTITY_BY: {
                        id: 'custpage_cwgp_adjustqtyby',
                        type: serverWidget.FieldType.INTEGER,
                        label: '*Quantity Removed'
                    },
                    ROOM_NUMBER: {
                        id: 'custpage_cwgp_roomnumber',
                        type: serverWidget.FieldType.TEXT,
                        label: '*Room # Assignment',
                    },
                    ST_ASSIGNMENT: {
                        id: 'custpage_cwgp_stassignment',
                        type: serverWidget.FieldType.TEXT,
                        label: '*St Assignment',
                    },
                    DATE_TIME: {
                        id: 'custpage_cwgp_datetime',
                        type: serverWidget.FieldType.DATETIMETZ,
                        label: '*Date/Time (M/D/YYYY hhmm)',
                    },
                    BUSINESS_LINE: {
                        id: 'custpage_cwgp_businessline',
                        type: serverWidget.FieldType.SELECT,
                        label: 'Business Line',
                        displayType: 'hidden'
                    },
                    NEW_QUANTITY: {
                        id: 'custpage_cwgp_newquantity',
                        type: serverWidget.FieldType.INTEGER,
                        label: 'Final Quantity',
                        displayType: 'disabled'
                    },
                    ADJUSTMENT_TYPE: {
                        id: 'custpage_cwgp_adjustmenttype',
                        type: serverWidget.FieldType.SELECT,
                        label: 'Adjustment Type',
                        displayType: 'disabled'
                    },
                    ADJUSTMENT_REASON: {
                        id: 'custpage_cwgp_adjustmentreason',
                        type: serverWidget.FieldType.TEXTAREA,
                        label: '*Adjustment Reason',
                    }
                },
                inventoryadjustment_damagetestertheft: {
                    ITEM: {
                        id: 'custpage_cwgp_item',
                        type: serverWidget.FieldType.SELECT,
                        label: 'Items',
                        mandatory: true
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
                        displayType:'disabled'
                    },
                    UPC_CODE: {
                        id: 'custpage_cwgp_upccode',
                        type: serverWidget.FieldType.TEXT,
                        label: 'UPC Code',
                        displayType:'disabled'
                    },
                    LOCATION: {
                        id: 'custpage_cwgp_location',
                        type: serverWidget.FieldType.SELECT,
                        label: 'Location',
                        displayType: 'hidden'
                    },
                    DATE_TIME: {
                        id: 'custpage_cwgp_datetime',
                        type: serverWidget.FieldType.DATETIMETZ,
                        label: '*Date/Time (M/D/YYYY hhmm)',
                    },
                    QTY_ON_HAND: {
                        id: 'custpage_cwgp_qtyonhand',
                        type: serverWidget.FieldType.INTEGER,
                        label: 'Starting Quantity in Saleable Inventory',
                        displayType: 'disabled'
                    },
                    ADJUST_QUANTITY_BY: {
                        id: 'custpage_cwgp_adjustqtyby',
                        type: serverWidget.FieldType.INTEGER,
                        label: '*Quantity Removed'
                    },
                    BUSINESS_LINE: {
                        id: 'custpage_cwgp_businessline',
                        type: serverWidget.FieldType.SELECT,
                        label: 'Business Line',
                        displayType: 'hidden'
                    },
                    ADJUSTMENT_TYPE: {
                        id: 'custpage_cwgp_adjustmenttype',
                        type: serverWidget.FieldType.SELECT,
                        label: '*Adjustment Type',
                    },
                    ADJUSTMENT_REASON: {
                        id: 'custpage_cwgp_adjustmentreason',
                        type: serverWidget.FieldType.TEXTAREA,
                        label: '*Adjustment Reason',
                    }
                },
                inventorycount: {
                    ITEM: {
                        id: 'custpage_cwgp_item',
                        type: serverWidget.FieldType.SELECT,
                        label: 'Items',
                        mandatory: true,
                        isInline: ['2','3','4']
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
                        displayType:'disabled'
                    },
                    UPC_CODE: {
                        id: 'custpage_cwgp_upccode',
                        type: serverWidget.FieldType.TEXT,
                        label: 'UPC Code',
                        displayType:'disabled'
                    },
                    LOCATION: {
                        id: 'custpage_cwgp_location',
                        type: serverWidget.FieldType.SELECT,
                        label: 'Location',
                        displayType: 'hidden'
                    },
                    ADJUST_QUANTITY_BY: {
                        id: 'custpage_cwgp_adjustqtyby',
                        type: serverWidget.FieldType.INTEGER,
                        label: '*Quantity',
                        isInline: ['3','4'],
                        isHidden: ['1'],
                        isEntry: ['2']
                    },
                    ENTERED_COUNT: {
                        id: 'custpage_cwgp_enteredcount',
                        type: serverWidget.FieldType.INTEGER,
                        label: '*Entered Count',
                        isHidden: ['1','2','3','4'],
                    },
                    HAS_DISCREPANCY: {
                        id: 'custpage_cwgp_hasdiscrepancy',
                        type: serverWidget.FieldType.TEXT,
                        label: 'Has Discrepancy',
                        displayType: 'inline',
                        isHidden: ['2','4'],
                    },
                    DISCREPANCY: {
                        id: 'custpage_cwgp_discrepancy',
                        type: serverWidget.FieldType.TEXT,
                        label: 'Discrepancy',
                        displayType: 'inline',
                        isHidden: ['2','3']
                    },
                    NEW_QUANTITY: {
                        id: 'custpage_cwgp_newquantity',
                        type: serverWidget.FieldType.INTEGER,
                        label: 'New Quantity',
                        isHidden: ['1','2','4'],
                        isEntry: ['3']
                    },
                    BUSINESS_LINE: {
                        id: 'custpage_cwgp_businessline',
                        type: serverWidget.FieldType.SELECT,
                        label: 'Business Line',
                        displayType: 'hidden'
                    },
                    ADJUSTMENT_TYPE: {
                        id: 'custpage_cwgp_adjustmenttype',
                        type: serverWidget.FieldType.SELECT,
                        label: '*Adjustment Type',
                        displayType: 'hidden'
                    },
                    ADJUSTMENT_REASON: {
                        id: 'custpage_cwgp_adjustmentreason',
                        type: serverWidget.FieldType.TEXTAREA,
                        label: '*Adjustment Reason',
                        isHidden: ['1','2','3'],
                        isEntry: ['4']
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
                },
                
            },
            inventoryadjustment_standard: {
                PRIMARY: {
                    id: 'custpage_inventoryadjustment_pi_grp',
                    label: 'Primary Information'
                },
                CLASS: {
                    id: 'custpage_inventoryadjustment_class_grp',
                    label: 'Classification'
                }
            },
            inventoryadjustment_backbar: {
                PRIMARY: {
                    id: 'custpage_inventoryadjustmentbackbar_pi_grp',
                    label: 'Primary Information'
                },
                CLASS: {
                    id: 'custpage_inventoryadjustmentbackbar_class_grp',
                    label: 'Classification'
                }
            },
            inventoryadjustment_damagetestertheft: {
                PRIMARY: {
                    id: 'custpage_inventoryadjustmentdamagetestertheft_pi_grp',
                    label: 'Primary Information'
                },
                CLASS: {
                    id: 'custpage_inventoryadjustmentdamagetestertheft_class_grp',
                    label: 'Classification'
                },
                TOTAL_ADJUSTMENT: {
                    id: 'custpage_inventoryadjustmentdamagetestertheft_total_grp',
                    label: 'Total Quantity by Adjustment Type Summary'
                },
                ITEM_SUMMARY: {
                    id: 'custpage_inventoryadjustmentdamagetestertheft_itemsum_grp',
                    label: 'Item Summary'
                }
            },
            inventorycount: {
                PRIMARY: {
                    id: 'custpage_inventoryadjustmentinventorycountinitial_pi_grp',
                    label: 'Primary Information'
                },
                CLASS: {
                    id: 'custpage_inventoryadjustmentinventorycountinitial_class_grp',
                    label: 'Classification'
                },
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
            stLocation,
            stPageMode,
            stUserId,
            stAccessType,
            objOperator
        } = options;

        const form = serverWidget.createForm({ title: _CONFIG.TITLE[stType] });

        form.clientScriptModulePath = _CONFIG.CLIENT_SCRIPT;

        objItemResultSet = EPLib.getInvItemsBySubsidiary({stSubsidiary});

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
                utilLib.addOptionsBusinessLine(fld);
            }
            if (id == 'custpage_cwgp_vendor') {
                utilLib.addOptionsVendorsBySubsidiary(fld, stSubsidiary);
            }
            if (id == 'custpage_cwgp_location') {
                utilLib.addOptionsLocationBySubsidiary(fld, stSubsidiary);
            }

            const stOperator = objOperator[0].stOperator;
            const stOperatorId = objOperator[0].stOperatorId;
            const objDefaultValues = mapDefaultValues({
                stSubsidiary, 
                stLocation,
                stPageMode, 
                stUserId,
                stAccessType,
                stType,
                stOperator,
                stOperatorId
                // stUpcMap

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
                col.defaultValue = 1;
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
            stTranId,
            stAccessType,
            objOperator
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
        log.debug('objPO',objPO);

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

            /*objPO.body.custpage_cwgp_rectype = stType;
            objPO.body.custpage_cwgp_pagemode = stPageMode;
            objPO.body.custpage_cwgp_userid = stUserId;
            objPO.body.custpage_cwgp_poid = stPoId;
            objPO.body.custpage_cwgp_accesstype = stAccessType;
            objPO.body.custpage_cwgp_htmlcss = htmlCss();
            objPO.body.custpage_cwgp_upccodemap = stUpcMap;
            objPO.body.custpage_cwgp_createdfrom = 'Purchase Order #'+stTranId;
            objPO.body.custpage_cwgp_scanbtnhtml = EPLib.getScanButtonCss({stPageType: stType});
            objPO.body.custpage_cwgp_operator = stOperator;
            objPO.body.custpage_cwgp_operatorhidden = stOperatorId;*/
            
            const stCreatedFrom = 'Purchase Order #'+stTranId;
            const stOperator = objOperator[0].stOperator;
            const stOperatorId = objOperator[0].stOperatorId;
            const stIntercoId = objPO.body.custpage_cwgp_sointercoid;
            const stMemo =  objPO.body.custpage_cwgp_memomain;
            const stVendor = objPO.body.custpage_cwgp_vendor;

            const objDefaultValues = mapDefaultValues({
                stSubsidiary, 
                stPageMode, 
                stUserId,
                stPoId,
                stAccessType,
                stType,
                stUpcMap,
                stCreatedFrom,
                stOperator,
                stOperatorId,
                stIntercoId,
                stMemo,
                stVendor
            });

            if (objDefaultValues[fld.id] != 'undefined') {
                fld.defaultValue = objDefaultValues[fld.id]
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

            if(id == 'custpage_cwgp_damagedadjustingaccount'){
                utilLib.addDamagedAdjustingAccount(col);
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
            stAccessType,
            stSubType,
            objOperator
        } = options;

        log.debug(stType+'_'+stSubType);
        const form = serverWidget.createForm({ title: _CONFIG.TITLE[stType+'_'+stSubType] });

        form.clientScriptModulePath = _CONFIG.CLIENT_SCRIPT;

        const {
            objItemResultSet,
            objUpcMap,
        }= EPLib.initScanner({
            stType,
            stSubType,
            stSubsidiary,
            _CONFIG
        })
        
        let stUpcMap = ''
        if(objUpcMap){
            stUpcMap = JSON.stringify(objUpcMap)
        }

        //add field group
        const objFldGrp = _CONFIG.FIELD_GROUP[stType+'_'+stSubType];

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
                displayType,
            } = objBodyFields[stCol];



            let fld = form.addField({
                id,
                type,
                label,
                source,
                container: _CONFIG.FIELD_GROUP[stType+'_'+stSubType][container]?.id
            });

            if (mandatory) {
                fld.isMandatory = true;
            }
            
            if (displayType) {
                fld.updateDisplayType({ displayType });
            }

            log.debug('stSubType',stSubType);
            if ((id =='custpage_cwgp_totaladjustment' || id == 'custpage_cwgp_itemsummary') && stSubType != 'damagetestertheft') {
                fld.updateDisplayType({ displayType: 'hidden' });
            }

            
            if (id == 'custpage_cwgp_adjustmentaccount') {
                utilLib.addDamagedAdjustingAccount(fld);
            }

            if (id == 'custpage_cwgp_businessline') {
                utilLib.addOptionsBusinessLine(fld);
            }

            if (id == 'custpage_cwgp_postingperiod') {
                utilLib.addOptionsPostingPeriod(fld);
            }

            let intAdjustmentAccount;
            if (id == 'custpage_cwgp_adjustmentaccount' && stSubType =='backbar') {
                fld.updateDisplayType({ displayType: 'inline' });
                intAdjustmentAccount = 973;
            }


            const stOperator = objOperator[0].stOperator;
            const stOperatorId = objOperator[0].stOperatorId;
            const objDefaultValues = mapDefaultValues({
                stSubsidiary, 
                stLocation,
                stPageMode, 
                stUserId,
                stAccessType,
                stType,
                stUpcMap,
                stSubType,
                stOperator,
                stOperatorId,
                intAdjustmentAccount
            });


            if (objDefaultValues[fld.id] != 'undefined') {
                fld.defaultValue = objDefaultValues[fld.id]
            }
        });

        
        //render sublist

        form.addSubtab({
            id: _CONFIG.TAB[stType+'_'+stSubType],
            label: 'Items'
        });

        const sbl = form.addSublist({
            id: _CONFIG.SUBLIST[stType+'_'+stSubType],
            label: ' ',
            type: serverWidget.SublistType.INLINEEDITOR,
            tab: _CONFIG.TAB[stType+'_'+stSubType]
        });



        const objItemCols = _CONFIG.COLUMN.ITEMS[stType+'_'+stSubType];

        const arrCols = Object.keys(objItemCols);

        arrCols.forEach((stCol) => {
            const { id, type, label, displayType, source, mandatory} = objItemCols[stCol];


            let col = sbl.addField({
                id,
                type,
                label,
                source,
                mandatory
            });

            if (mandatory) {
                col.isMandatory = true;
            }

            if (id == 'custpage_cwgp_item') {
                utilLib.addOptionsItemBySubsidiary({
                    fld: col, 
                    objResultSet: objItemResultSet
                });
            }

            if (id == 'custpage_cwgp_location') {
                utilLib.addOptionsLocationBySubsidiary(col, stSubsidiary);
                col.defaultValue = stLocation;
            }

            if (id == 'custpage_cwgp_businessline') {
                utilLib.addOptionsBusinessLine(col);
                col.defaultValue = 1;
            }

            if(id == 'custpage_cwgp_adjustmenttype'){
                utilLib.addOptionsAdjusmentType(col,stSubType);
                if(stSubType == 'standard'){
                    col.defaultValue = 6;
                }
                else if(stSubType == 'backbar'){
                    col.defaultValue = 2;
                }
            }

            if (displayType) {
                col.updateDisplayType({ displayType });
            }


        });

        form.addSubmitButton({ label: 'Save' });

        if(stSubType == 'damagetestertheft'){
            form.addButton({
                id: 'custpage_back_calculatesummary',
                label: 'Calculate Summary',
                functionName: 'calculateSummary()'
            });
        }

        form.addButton({
            id: 'custpage_back_button',
            label: 'Back',
            functionName: `back(${stUserId}, ${stAccessType}, 'inventoryadjustment')`
        });

        response.writePage(form);
    };

    const renderInventoryCount = (options) => {
        log.debug('===CREATE===','===Create Inventory Count===');
        const {
            response,
            stType,
            stSubsidiary,
            stLocation,
            stPageMode,
            stUserId,
            stAccessType,
            stStep,
            objOperator,
            objIC,
            requestParams
        } = options;

        log.debug('requestParams',requestParams);
        log.debug('stStep',stStep);

        log.debug('objIC',objIC);
        let objICparsed;
        if(objIC){
            objICparsed = JSON.parse(objIC);
            log.debug('objIC parsed',objICparsed);
        }
        const stTitle = stStep == 1 ? 'Select Items' : stStep == 2 ? 'Add Quantity' : stStep == 3 ? 'Count Review' : 'Final Review';
        const form = serverWidget.createForm({ title: _CONFIG.TITLE[stType]+' - '+stTitle});

        form.clientScriptModulePath = _CONFIG.CLIENT_SCRIPT;

        //Add scanner UI for step 2 and 3 only
        if(stStep == 2 || stStep == 3){
            var {
                objItemResultSet,
                objUpcMap,
            }= EPLib.initScanner({
                stType,
                stSubsidiary,
                _CONFIG
            })
        }
        else{
            var objItemResultSet = EPLib.getInvItemsBySubsidiary({stSubsidiary});
        }
            
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

        const stOperator = objOperator[0].stOperator;
        const stOperatorId = objOperator[0].stOperatorId;
        const objDefaultValues = mapDefaultValues({
            stSubsidiary, 
            stLocation,
            stPageMode, 
            stUserId,
            stAccessType,
            stType,
            stUpcMap,
            stOperator,
            stOperatorId,
            stStep
        });

        log.debug('objDefaultValues',objDefaultValues);

        arrFlds.forEach((stCol) => {
            const {
                id,
                type,
                label,
                source,
                container,
                mandatory,
                defaultValue,
                displayType,
                isInline,
            } = objBodyFields[stCol];



            let fld = form.addField({
                id,
                type,
                label,
                source,
                isInline,
                container: _CONFIG.FIELD_GROUP[stType][container]?.id
            });

            if (mandatory) {
                fld.isMandatory = true;
            }
            
            if (displayType) {
                fld.updateDisplayType({ displayType });
            }
            
            if (id == 'custpage_cwgp_adjustmentaccount') {
                utilLib.addDamagedAdjustingAccount(fld);
            }

            if (id == 'custpage_cwgp_businessline') {
                utilLib.addOptionsBusinessLine(fld);
            }

            if (id == 'custpage_cwgp_postingperiod') {
                utilLib.addOptionsPostingPeriod(fld);
            }

            if(isInline){
                if(isInline.includes(stStep)){
                    fld.updateDisplayType({ displayType: 'inline' });
                };
            }

            if (objDefaultValues[fld.id] != 'undefined') {
                fld.defaultValue = objDefaultValues[fld.id]
            }

            if(objICparsed && stStep != 1){
                if (objICparsed.body[fld.id] != 'undefined') {
                    if(id != 'custpage_cwgp_date'){
                        fld.defaultValue = objICparsed.body[fld.id]
                    }
                    else{
                        fld.defaultValue = new Date(objICparsed.body[fld.id]);
                    }
                }
            }

        });

        
        //render sublist

        form.addSubtab({
            id: _CONFIG.TAB[stType],
            label: 'Items'
        });

        
        const subListType = stStep == 1 ? serverWidget.SublistType.INLINEEDITOR : serverWidget.SublistType.LIST;
        const sbl = form.addSublist({
            id: _CONFIG.SUBLIST[stType],
            label: ' ',
            type: subListType,
            tab: _CONFIG.TAB[stType]
        });



        const objItemCols = _CONFIG.COLUMN.ITEMS[stType];

        const arrCols = Object.keys(objItemCols);

        arrCols.forEach((stCol) => {
            const { id, type, label, displayType, source, mandatory, isInline, isHidden, isEntry} = objItemCols[stCol];


            let col = sbl.addField({
                id,
                type,
                label,
                source,
                mandatory,
                isInline,
                isHidden,
                isEntry
            });

            if (mandatory) {
                col.isMandatory = true;
            }

            if (id == 'custpage_cwgp_item') {
                utilLib.addOptionsItemBySubsidiary({
                    fld: col, 
                    objResultSet: objItemResultSet
                });
            }

            if (id == 'custpage_cwgp_location') {
                utilLib.addOptionsLocationBySubsidiary(col, stSubsidiary);
                col.defaultValue = stLocation;
            }

            if (id == 'custpage_cwgp_businessline') {
                utilLib.addOptionsBusinessLine(col);
                col.defaultValue = 1;
            }

            if(id == 'custpage_cwgp_adjustmenttype'){
                utilLib.addOptionsAdjusmentType(col);
                col.defaultValue = 1;
            }

            if (displayType) {
                col.updateDisplayType({ displayType });
            }

            if(isHidden){
                if(isHidden.includes(stStep)){
                    col.updateDisplayType({ displayType: 'hidden' });
                }
            };
            if(isInline){
                if(isInline.includes(stStep)){
                    col.updateDisplayType({ displayType: 'inline' });
                };
            }
            if(isEntry){
                if(isEntry.includes(stStep)){
                    col.updateDisplayType({ displayType: 'entry' });
                };
            }
     

        });

        if(objICparsed && stStep != 1){
            utilLib.setSublistValues(sbl, objICparsed);
        }

        //Create Buttons
       
        if(stStep == 4){form.addSubmitButton({ label: 'Save' });}
        //form.addSubmitButton({ label: 'Save' });

        let stNextButton = stStep == 1 ? 'Submit Items' : stStep == 2 ? 'Submit Qty' : stStep == 3 ? 'Submit' : 'Complete Count';

        if(stStep == 1 || stStep == 2 || stStep == 3){ 
            form.addButton({
                id: 'custpage_next_button',
                label: stNextButton,
                functionName: `nextStep(${stUserId}, ${stAccessType}, ${stStep}, ${JSON.stringify(objICparsed)}, ${JSON.stringify(objDefaultValues)},'inventorycount')`
            });
        }

        form.addButton({
            id: 'custpage_back_button',
            label: 'Cancel',
            functionName: `back(${stUserId}, ${stAccessType}, 'inventorycount')`
        });
        response.writePage(form);
    };


    const mapDefaultValues = (options) => {
        const {
            stLocation,
            stSubsidiary, 
            stPageMode, 
            stUserId,
            stPoId,
            stAccessType,
            stType,
            stSubType,
            stUpcMap,
            stCreatedFrom,
            stOperator,
            stOperatorId,
            intAdjustmentAccount,
            stIntercoId,
            stMemo,
            stVendor,
            stStep
        } = options;

        let scanbhtml;
        let stMapVendor;
        let stSubTypeId;
        if(stType == 'itemreceipt'){
            scanbhtml = EPLib.getScanButtonCss({stPageType: stType});
            stMapVendor = stVendor;
        }
        else if(stType == 'inventorycount'){
            scanbhtml = EPLib.getScanButtonCss({
                stPageType: stType,
                stStep
            });
            stMapVendor = 19082;
            log.debug('scanbhtml', scanbhtml)
        }
        else{
            scanbhtml= EPLib.getScanButtonCss({stPageType: `${stType}_${stSubType}`})
            stMapVendor = 19082;
        }
        stSubTypeId = stSubType == 'standard' ? '1' : stSubType == 'backbar' ? '2' : '3';

        return {
            custpage_cwgp_adjustmentlocation: stLocation,
            custpage_cwgp_subsidiary        : stSubsidiary,
            custpage_cwgp_pagemode          : stPageMode,
            custpage_cwgp_userid            : stUserId,
            custpage_cwgp_poid              : stPoId,
            custpage_cwgp_accesstype        : stAccessType,
            custpage_cwgp_htmlcss           : htmlCss(),
            custpage_cwgp_scanbtnhtml       : scanbhtml,
            custpage_cwgp_upccodemap        : stUpcMap,
            custpage_cwgp_createdfrom       : stCreatedFrom,
            custpage_cwgp_date              : new Date(),
            custpage_cwgp_deliverbydate     : utilLib.setDeliverByDate(),
            custpage_cwgp_rectype           : stType,
            custpage_cwgp_businessline      : 1,
            custpage_cwgp_location: stLocation,
            custpage_cwgp_vendor: stMapVendor,
            custpage_cwgp_operator: stOperator,
            custpage_cwgp_operatorhidden: stOperatorId,
            custpage_cwgp_adjustmentaccount: intAdjustmentAccount,
            custpage_cwgp_adjustmentsubtype: stSubType,
            custpage_cwgp_sointercoid : stIntercoId,
            custpage_cwgp_memomain: stMemo,
            custpage_cwgp_adjustmentsubtypeid: stSubTypeId,
            custpage_cwgp_step: stStep
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
        renderInventoryAdjustment,
        renderInventoryCount
    }
});
