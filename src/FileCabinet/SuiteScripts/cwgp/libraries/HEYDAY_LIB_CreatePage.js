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

define(['N/ui/serverWidget', './HEYDAY_LIB_Util.js', './HEYDAY_LIB_ExternalPortal.js','N/file', 'N/record', 'N/search'], (serverWidget, utilLib, EPLib, file, record, search) => {
    let _CONFIG = {
        PARAMETER: {
            PAGE: 'custparam_cwgp_page'
        },
        TITLE: {
            intercompanypo: 'Purchase Order',
            itemreceipt: 'Receive Items',
            inventoryadjustment_standard: 'Inventory Adjustment',
            inventoryadjustment_backbar: 'Backbar Usage',
            inventoryadjustment_damage: 'Inventory Adjustment - Damage',
            inventoryadjustment_tester: 'Inventory Adjustment - Tester',
            inventoryadjustment_theft: 'Inventory Adjustment - Theft',
            inventorycount: 'Inventory Count'
        },
        TAB: {
            intercompanypo: 'custpage_interpo_itemstab',
            itemreceipt: 'custpage_itemreceipt_itemstab',
            inventoryadjustment_standard: 'custpage_inventoryadjustment_itemstab',
            inventoryadjustment_backbar: 'custpage_inventoryadjustmentbackbar_itemstab',
            inventoryadjustment_damage: 'custpage_inventoryadjustmentdamagetestertheft_itemstab',
            inventoryadjustment_tester: 'custpage_inventoryadjustmentdamagetestertheft_itemstab',
            inventoryadjustment_theft: 'custpage_inventoryadjustmentdamagetestertheft_itemstab',
            inventorycount: 'custpage_inventoryadjustmentinventorycount_itemstab'
        },
        SUBLIST: {
            intercompanypo: 'custpage_interpo_items',
            itemreceipt: 'custpage_itemreceipt_items',
            inventoryadjustment_standard: 'custpage_inventorayadjustment_items',
            inventoryadjustment_backbar: 'custpage_inventorayadjustmentbackbar_items',
            inventoryadjustment_damage: 'custpage_inventoryadjustmentdamagetestertheft_items',
            inventoryadjustment_tester: 'custpage_inventoryadjustmentdamagetestertheft_items',
            inventoryadjustment_theft: 'custpage_inventoryadjustmentdamagetestertheft_items',
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
                    displayType: 'inline'
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
                    displayType: 'inline'
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
                    //source: 'account',
                    isInline: ['1','2','3','4']
                },
                DATE: {
                    id: 'custpage_cwgp_date',
                    type: serverWidget.FieldType.DATE,
                    label: 'Date',
                    container: 'PRIMARY',
                    mandatory: true,
                    isInline: ['1','2','3','4']
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
                    label: 'Total No. Of Items With Discrepancy',
                    container: 'ITEM_SUMMARY',
                    displayType: 'inline'
                },
                TOTAL_DISCREPANCY_HTMLHIDDEN: {
                    id: 'custpage_cwgp_totaldiscrepancy',
                    type: serverWidget.FieldType.LONGTEXT,
                    label: 'Total Discrepancy Hidden',
                    container: 'PRIMARY',
                    isHidden: ['1','2','3'],
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
                        label: 'St Assignment',
                    },
                    /*DATE_TIME: {
                        id: 'custpage_cwgp_datetime',
                        type: serverWidget.FieldType.DATETIMETZ,
                        label: '*Date/Time (M/D/YYYY hhmm)',
                    },*/
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
                inventoryadjustment_damage: {
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
                        label: 'Starting Quantity in Saleable Inventory',
                        displayType: 'disabled'
                    },
                    ADJUST_QUANTITY_BY: {
                        id: 'custpage_cwgp_adjustqtyby',
                        type: serverWidget.FieldType.INTEGER,
                        label: '*Quantity Removed'
                    },
                    ESTIMATED_REPLACEMENT_VALUE:{
                        id: 'custpage_cwgp_estimatedreplacementvalue',
                        type: serverWidget.FieldType.FLOAT,
                        label: 'Estimated Replacement Value',
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
                        label: '*Adjustment Type',
                        displayType:'disabled'
                    },
                    ADJUSTMENT_REASON: {
                        id: 'custpage_cwgp_adjustmentreason',
                        type: serverWidget.FieldType.TEXTAREA,
                        label: '*Adjustment Reason',
                    }
                },
                inventoryadjustment_tester: {
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
                        label: 'Starting Quantity in Saleable Inventory',
                        displayType: 'disabled'
                    },
                    ADJUST_QUANTITY_BY: {
                        id: 'custpage_cwgp_adjustqtyby',
                        type: serverWidget.FieldType.INTEGER,
                        label: '*Quantity Removed'
                    },
                    ESTIMATED_REPLACEMENT_VALUE:{
                        id: 'custpage_cwgp_estimatedreplacementvalue',
                        type: serverWidget.FieldType.FLOAT,
                        label: 'Estimated Replacement Value',
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
                        label: '*Adjustment Type',
                        displayType:'disabled'
                    },
                    ADJUSTMENT_REASON: {
                        id: 'custpage_cwgp_adjustmentreason',
                        type: serverWidget.FieldType.TEXTAREA,
                        label: '*Adjustment Reason',
                    }
                },
                inventoryadjustment_theft: {
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
                        label: 'Starting Quantity in Saleable Inventory',
                        displayType: 'disabled'
                    },
                    ADJUST_QUANTITY_BY: {
                        id: 'custpage_cwgp_adjustqtyby',
                        type: serverWidget.FieldType.INTEGER,
                        label: '*Quantity Removed'
                    },
                    ESTIMATED_REPLACEMENT_VALUE:{
                        id: 'custpage_cwgp_estimatedreplacementvalue',
                        type: serverWidget.FieldType.FLOAT,
                        label: 'Estimated Replacement Value',
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
                        label: '*Adjustment Type',
                        displayType:'disabled'
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
                        isInline: ['1','2','3','4']
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
                        isHidden: ['1','2']
                        //displayType: 'hidden'
                    },
                    FIRST_COUNT: {
                        id: 'custpage_cwgp_firstcount',
                        type: serverWidget.FieldType.INTEGER,
                        label: '*First Count',
                        //isInline: ['3','4'],
                        isHidden: ['3'],
                        isEntry: ['1']
                    },
                    SECOND_COUNT: {
                        id: 'custpage_cwgp_secondcount',
                        type: serverWidget.FieldType.INTEGER,
                        label: '*Second Count',
                        //isInline: ['3','4'],
                        isHidden: ['1','3'],
                        isEntry: ['2']
                    },
                    ENTERED_QUANTITY: {
                        id: 'custpage_cwgp_enteredquantity',
                        type: serverWidget.FieldType.INTEGER,
                        label: 'Entered Quantity',
                        //isInline: ['3','4'],
                        isHidden: ['1','2'],
                        //isEntry: ['3']
                    },
                    FINAL_COUNT: {
                        id: 'custpage_cwgp_finalquantity',
                        type: serverWidget.FieldType.INTEGER,
                        label: 'Final Quantity',
                        //isInline: ['3','4'],
                        isHidden: ['1','2','3'],
                        //isEntry: ['3']
                    },
                    DISCREPANCY: {
                        id: 'custpage_cwgp_discrepancy',
                        type: serverWidget.FieldType.TEXT,
                        label: 'Discrepancy',
                        displayType: 'inline',
                        isHidden: ['1','2']
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
                        isHidden: ['1','2'],
                        isEntry: ['3']
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
            inventoryadjustment_damage: {
                PRIMARY: {
                    id: 'custpage_inventoryadjustmentdamage_pi_grp',
                    label: 'Primary Information'
                },
                CLASS: {
                    id: 'custpage_inventoryadjustmentdamage_class_grp',
                    label: 'Classification'
                },
                TOTAL_ADJUSTMENT: {
                    id: 'custpage_inventoryadjustmentdamage_total_grp',
                    label: 'Total Quantity by Adjustment Type Summary'
                },
                ITEM_SUMMARY: {
                    id: 'custpage_inventoryadjustmentdamage_itemsum_grp',
                    label: 'Item Summary'
                }
            },
            inventoryadjustment_tester: {
                PRIMARY: {
                    id: 'custpage_inventoryadjustmentester_pi_grp',
                    label: 'Primary Information'
                },
                CLASS: {
                    id: 'custpage_inventoryadjustmenttester_class_grp',
                    label: 'Classification'
                },
                TOTAL_ADJUSTMENT: {
                    id: 'custpage_inventoryadjustmenttester_total_grp',
                    label: 'Total Quantity by Adjustment Type Summary'
                },
                ITEM_SUMMARY: {
                    id: 'custpage_inventoryadjustmenttester_itemsum_grp',
                    label: 'Item Summary'
                }
            },
            inventoryadjustment_theft: {
                PRIMARY: {
                    id: 'custpage_inventoryadjustmenttheft_pi_grp',
                    label: 'Primary Information'
                },
                CLASS: {
                    id: 'custpage_inventoryadjustmenttheft_class_grp',
                    label: 'Classification'
                },
                TOTAL_ADJUSTMENT: {
                    id: 'custpage_inventoryadjustmenttheft_total_grp',
                    label: 'Total Quantity by Adjustment Type Summary'
                },
                ITEM_SUMMARY: {
                    id: 'custpage_inventoryadjustmenttheft_itemsum_grp',
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
                ITEM_SUMMARY: {
                    id: 'custpage_inventoryadjustmentinventorycountinitial_totalsku_grp',
                    label: 'Discrepancy'
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

        //Search Bar
        addSearchBar(form);

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
            if ((id =='custpage_cwgp_totaladjustment' || id == 'custpage_cwgp_itemsummary') && (stSubType != 'damage' && stSubType != 'tester' && stSubType != 'theft')) {
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

        log.debug('arrCols',arrCols);

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

        if(stSubType == 'damage' || stSubType == 'tester' || stSubType == 'theft'){
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
            stSubType,
            stStep,
            objOperator,
            requestParams,
            customRecordId,
            stDraft
        } = options;

        log.debug('requestParams',requestParams);
        log.debug('stStep',stStep);
        log.debug('stSubType',stSubType);
        
        log.debug('customRecordId',customRecordId)
        let objICBodyFlds;
        let objICItemFlds;
        if(customRecordId){
            var objRecord = record.load({
                type: 'customrecord_cwgp_icobjectstorage',
                id: customRecordId,
                isDynamic: true,
            });

            objICBodyFlds = JSON.parse(objRecord.getValue('custrecord_cwgp_icobjectstorage_field1'));
            log.debug('objICBodyFlds',JSON.stringify(JSON.stringify(objICBodyFlds)));
            objICItemFlds = JSON.parse(objRecord.getValue('custrecord_cwgp_icobjectstorage_field2'));
            log.debug('objICItemFlds',JSON.stringify(JSON.stringify(objICItemFlds)));
        }
        const stTitle = stStep == 1 ? 'First Count' : stStep == 2 ? 'Second Count' : 'Final Review';
        const form = serverWidget.createForm({ title: _CONFIG.TITLE[stType]+' '+stSubType+' - '+stTitle});

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
        
        log.debug('objItemResultSet',objItemResultSet);
            

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

        const stOperator = objOperator[0].stOperator;
        const stOperatorId = objOperator[0].stOperatorId;
        let intAdjustmentAccount;
        if(stSubType=='Retail'){
            intAdjustmentAccount = 972;
        }
        else if(stSubType=='Backbar'){
            intAdjustmentAccount = 973;
        }
        const objDefaultValues = mapDefaultValues({
            intAdjustmentAccount,
            stSubsidiary, 
            stLocation,
            stPageMode, 
            stUserId,
            stAccessType,
            stSubType,
            stType,
            stUpcMap,
            stOperator,
            stOperatorId,
            stStep,
        });

        log.debug('objDefaultValues',objDefaultValues);

       /* var fileObj2 = file.create({
            name: 'test3.txt',
            fileType: file.Type.PLAINTEXT,
            contents: JSON.stringify(objDefaultValues)
        });
        fileObj2.folder = -15;
        var id = fileObj2.save();*/

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
                isHidden,
            } = objBodyFields[stCol];



            let fld = form.addField({
                id,
                type,
                label,
                source,
                isInline,
                isHidden,
                container: _CONFIG.FIELD_GROUP[stType][container]?.id
            });
            //log.debug('fld',fld);

            if (mandatory) {
                fld.isMandatory = true;
            }
            
            if (displayType) {
                fld.updateDisplayType({ displayType });
            }
            
            if (id == 'custpage_cwgp_adjustmentaccount') {
                log.debug('custpage_cwgp_adjustmentaccount','');
                
                utilLib.addDamagedAdjustingAccount(fld);
                /*if(stSubType=='Retail'){
                    form.updateDefaultValues({
                        custpage_cwgp_adjustmentaccount : 972
                    })
                    fld.addSelectOption({
                        value: 972,
                        text: '53001 Inventory and Warehousing : Retail Product Variance',
                        isSelected: true
                    });
                    //fld.updateDisplayType({ displayType: 'inline' });
                }
                else if(stSubType=='Backbar'){
                    fld.addSelectOption({
                        value: 973,
                        text: '53002 Inventory and Warehousing : Backbar Product Variance',
                        isSelected: true
                    });
                    //fld.updateDisplayType({ displayType: 'inline' });
                }*/
                log.debug('fld',fld);
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

            if(isHidden){
                if(isHidden.includes(stStep)){
                    fld.updateDisplayType({ displayType: 'hidden' });
                };
            }


            if (objDefaultValues[fld.id] != 'undefined') {
                fld.defaultValue = objDefaultValues[fld.id]
            }

        });

        //Search Bar
        addSearchBar(form);

        
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

        populateFirstCountLines(stSubsidiary,stLocation,form,sbl,stSubType,stDraft,stUserId);

        form.addSubmitButton({ label: 'Submit First Count' });

        form.addButton({
            id: 'custpage_back_button',
            label: 'Cancel',
            functionName: `back(${stUserId}, ${stAccessType}, 'inventorycount')`
        });

        const arrCredentialList = utilLib.getInventoryCountDraftCredentialList(stAccessType,stLocation);
        form.addButton({
            id: 'custpage_savedraft_button',
            label: 'Save as Draft',
            functionName: `saveDraftIC(${stUserId}, ${stAccessType} ,${stStep} ,`+JSON.stringify(arrCredentialList)+`)`
        });

        log.debug('form',form);
        log.debug('response',response);
        response.writePage(form);
        log.debug('===CREATE===','===End of Create Inventory Count===');
    };

    const renderInventoryCountSecond = (request,response) => {
        log.debug('===CREATE===','===Create Inventory Second Count===');
        log.debug('request', request);
        var rec = request;
        var arrItemFirstCount = [];
        var arrQtyFirstCount = [];
        var numLines = rec.getLineCount({
            group: 'custpage_inventoryadjustmentinventorycount_items'
        });
        for(var i=0; i<numLines; i++){
            var stItem = rec.getSublistValue({
                group: 'custpage_inventoryadjustmentinventorycount_items',
                name: 'custpage_cwgp_item',
                line: i
            });
            log.debug('stItem', stItem);
            var inFirstCount = rec.getSublistValue({
                group: 'custpage_inventoryadjustmentinventorycount_items',
                name: 'custpage_cwgp_firstcount',
                line: i
            });
            arrItemFirstCount.push(stItem);
            arrQtyFirstCount.push(inFirstCount);
        }
        const intAdjustmentAccount = rec.parameters.custpage_cwgp_adjustmentaccount;
        const stSubsidiary = rec.parameters.custpage_cwgp_subsidiary;
        let stStep = '2';
        const stUserId = rec.parameters.custpage_cwgp_userid;	
        const stAccessType = rec.parameters.custpage_cwgp_accesstype;
        const stPageMode = 'create';
        const stLocation = rec.parameters.custpage_cwgp_adjustmentlocation;
        const stMemo = rec.parameters.custpage_cwgp_memomain;
        const stType = rec.parameters.custpage_cwgp_rectype;
        const stSubType = rec.parameters.custpage_cwgp_adjustmentsubtype;
        const stOperator = rec.parameters.custpage_cwgp_operator;
        const stOperatorId = rec.parameters.custpage_cwgp_operatorhidden;
        log.debug('stOperatorId', stOperatorId);
        const stDraft = rec.parameters.draft;
        const form = serverWidget.createForm({ title: _CONFIG.TITLE[stType]+' '+stSubType+' - Second Count'});
        log.debug('second count params',JSON.stringify({
            intAdjustmentAccount: intAdjustmentAccount,
            stSubsidiary: stSubsidiary,
            stUserId: stUserId,
            stAccessType: stAccessType,
            stPageMode: stPageMode,
            stLocation: stLocation,
            stMemo: stMemo,
            stType: stType,
            stOperator: stOperator,
            stOperatorId: stOperatorId            
        }));

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

        //const stOperator = objOperator[0].stOperator;
        //const stOperatorId = objOperator[0].stOperatorId;
        const objDefaultValues = mapDefaultValues({
            intAdjustmentAccount,
            stSubsidiary,
            stLocation, 
            stPageMode, 
            stUserId,
            stAccessType,
            stSubType,
            stType,
            stUpcMap,
            stOperator,
            stOperatorId,
            stStep,
            stMemo
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
                isHidden,
            } = objBodyFields[stCol];



            let fld = form.addField({
                id,
                type,
                label,
                source,
                isInline,
                isHidden,
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
        
            if(isHidden){
                if(isHidden.includes(stStep)){
                    fld.updateDisplayType({ displayType: 'hidden' });
                };
            }
        

            if (objDefaultValues[fld.id] != 'undefined') {
                fld.defaultValue = objDefaultValues[fld.id]
            }
            

        });

        //Search Bar
        addSearchBar(form);

        
        //render sublist
        form.addSubtab({
            id: _CONFIG.TAB[stType],
            label: 'Items'
        });

        
        //const subListType = stStep == 1 ? serverWidget.SublistType.INLINEEDITOR : serverWidget.SublistType.LIST;
        const sbl = form.addSublist({
            id: _CONFIG.SUBLIST[stType],
            label: ' ',
            type: serverWidget.SublistType.LIST,
            tab: _CONFIG.TAB[stType]
        });



        const objItemCols = _CONFIG.COLUMN.ITEMS[stType];

        const arrCols = Object.keys(objItemCols);

        log.debug('arrCols',arrCols);

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

        if(stDraft){
            log.debug('populateSecondCountLinesDraft', '');
            populateSecondCountLinesDraft(arrItemFirstCount,sbl,stLocation,stSubsidiary,form,stSubType,stUserId);
        }
        else{
            log.debug('populateSecondCountLines', '');
            populateSecondCountLines(arrItemFirstCount,rec,sbl,stLocation,stSubsidiary,form,stSubType);
        }

        utilLib.createICLineBackupFile(stOperator, 1, rec);
        form.addSubmitButton({ label: 'Submit Second Count' });

        form.addButton({
            id: 'custpage_back_button',
            label: 'Cancel',
            functionName: `back(${stUserId}, ${stAccessType}, 'inventorycount')`
        });

        const arrCredentialList = utilLib.getInventoryCountDraftCredentialList(stAccessType,stLocation);
        form.addButton({
            id: 'custpage_savedraft_button',
            label: 'Save as Draft',
            functionName: `saveDraftIC(${stUserId}, ${stAccessType} ,${stStep} ,`+JSON.stringify(arrCredentialList)+`)`
        });

        log.debug('form',form);
        log.debug('response',response);
        response.writePage(form);
        log.debug('===CREATE===','===End Create Inventory Second Count===');
    };

    const renderInventoryCountFinal = (request,response) => {
        log.debug('===CREATE===','===Create Inventory Count Final===');
        log.debug('request', request);
        var rec = request;
        var arrItemFirstCount = [];
        var arrQtyFirstCount = [];
        var numLines = rec.getLineCount({
            group: 'custpage_inventoryadjustmentinventorycount_items'
        });
        for(var i=0; i<numLines; i++){
            var stItem = rec.getSublistValue({
                group: 'custpage_inventoryadjustmentinventorycount_items',
                name: 'custpage_cwgp_item',
                line: i
            });
            log.debug('stItem', stItem);
            var inFirstCount = rec.getSublistValue({
                group: 'custpage_inventoryadjustmentinventorycount_items',
                name: 'custpage_cwgp_firstcount',
                line: i
            });
            arrItemFirstCount.push(stItem);
            arrQtyFirstCount.push(inFirstCount);
        }
        const intAdjustmentAccount = rec.parameters.custpage_cwgp_adjustmentaccount;
        const stSubsidiary = rec.parameters.custpage_cwgp_subsidiary;
        let stStep = '3';
        const stUserId = rec.parameters.custpage_cwgp_userid;	
        const stAccessType = rec.parameters.custpage_cwgp_accesstype;
        const stPageMode = 'create';
        const stLocation = rec.parameters.custpage_cwgp_adjustmentlocation;
        const stMemo = rec.parameters.custpage_cwgp_memomain;
        const stType = rec.parameters.custpage_cwgp_rectype;
        const stSubType = rec.parameters.custpage_cwgp_adjustmentsubtype;
        const stOperator = rec.parameters.custpage_cwgp_operator;
        const stOperatorId = rec.parameters.custpage_cwgp_operatorhidden;
        const stDraft = rec.parameters.draft;
        log.debug('stOperatorId', stOperatorId);
        //Add scanner UI for step 2 and 3 only

        const objItemResultSet = EPLib.getInvItemsBySubsidiary({stSubsidiary});
        log.debug('objItemResultSet',objItemResultSet);
            

        const form = serverWidget.createForm({ title: _CONFIG.TITLE[stType]+' '+stSubType+' - Final Review'});
        log.debug('last count params',JSON.stringify({
            intAdjustmentAccount: intAdjustmentAccount,
            stSubsidiary: stSubsidiary,
            stUserId: stUserId,
            stAccessType: stAccessType,
            stPageMode: stPageMode,
            stLocation: stLocation,
            stMemo: stMemo,
            stType: stType,
            stOperator: stOperator,
            stOperatorId: stOperatorId            
        }));

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

        //render body fields
        const objBodyFields = _CONFIG.FIELD[stType];

        const arrFlds = Object.keys(objBodyFields);

        //const stOperator = objOperator[0].stOperator;
        //const stOperatorId = objOperator[0].stOperatorId;
        //let stSubType = 'inventorycount';
        const objDefaultValues = mapDefaultValues({
            intAdjustmentAccount,
            stSubsidiary,
            stLocation, 
            stPageMode, 
            stUserId,
            stAccessType,
            stType,
            //stUpcMap,
            stOperator,
            stOperatorId,
            stStep,
            stMemo,
            stSubType
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
                isHidden,
            } = objBodyFields[stCol];



            let fld = form.addField({
                id,
                type,
                label,
                source,
                isInline,
                isHidden,
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

           
            
            if(isHidden){
                if(isHidden.includes(stStep)){
                    fld.updateDisplayType({ displayType: 'hidden' });
                }
            };

            if(isInline){	
                if(isInline.includes(stStep)){	
                    fld.updateDisplayType({ displayType: 'inline' });	
                };	
            }

            if (objDefaultValues[fld.id] != 'undefined') {
                fld.defaultValue = objDefaultValues[fld.id]
            }


        });

        //Search Bar
        addSearchBar(form);

        
        //render sublist
        form.addSubtab({
            id: _CONFIG.TAB[stType],
            label: 'Items'
        });

        
        //const subListType = stStep == 1 ? serverWidget.SublistType.INLINEEDITOR : serverWidget.SublistType.LIST;
        const sbl = form.addSublist({
            id: _CONFIG.SUBLIST[stType],
            label: ' ',
            type: serverWidget.SublistType.LIST,
            tab: _CONFIG.TAB[stType]
        });



        const objItemCols = _CONFIG.COLUMN.ITEMS[stType];

        const arrCols = Object.keys(objItemCols);

        log.debug('arrCols',arrCols);

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

        if(stDraft){
            log.debug('populateFinalCountLinesDraft', '');
            populateFinalCountLinesDraft(arrItemFirstCount,sbl,stLocation,stSubsidiary,form,stSubType,stUserId);
        }
        else{
            log.debug('populateFinalCountLines', '');
            populateFinalCountLines(arrItemFirstCount,rec,sbl,form,stSubType);
            
            
            
        }
        utilLib.createICLineBackupFile(stOperator, 2, rec);
        form.addSubmitButton({ label: 'Submit Final Count' });

        form.addButton({
            id: 'custpage_back_button',
            label: 'Cancel',
            functionName: `back(${stUserId}, ${stAccessType}, 'inventorycount')`
        });

        const arrCredentialList = utilLib.getInventoryCountDraftCredentialList(stAccessType,stLocation);
        form.addButton({
            id: 'custpage_savedraft_button',
            label: 'Save as Draft',
            functionName: `saveDraftIC(${stUserId}, ${stAccessType} ,${stStep} ,`+JSON.stringify(arrCredentialList)+`)`
        });

        log.debug('form',form);
        log.debug('response',response);
        response.writePage(form);
        log.debug('===CREATE===','===End Create Inventory Count Final===');
    };

    const populateFirstCountLines = (stSubsidiary,stLocation,form,itemLines,stSubType,stDraft,stUserId) => {

        const ssItemPerLocationIC = search.load({ id: "customsearch_cwgp_retail_icitemsearch", type: "item" });
        if(stSubType=='Retail'){
            ssItemPerLocationIC.filters.push(search.createFilter({
                name: 'name',
                operator: 'doesnotcontain',
                values: 'backbar',
            }));
        }
        else if(stSubType=='Backbar'){
            ssItemPerLocationIC.filters.push(search.createFilter({
                name: 'name',
                operator: 'contains',
                values: 'backbar',
            }));
        }

        ssItemPerLocationIC.filters.push(search.createFilter({
            name: 'inventorylocation',
            operator: 'anyof',
            values: stLocation,
        }));

        ssItemPerLocationIC.filters.push(search.createFilter({
            name: 'subsidiary',
            operator: 'anyof',
            values: stSubsidiary,
        }));

        var results = [];
        var count = 0;
        var pageSize = 1000;
        var start = 0;
        do {
            var subresults = ssItemPerLocationIC.run().getRange({
                start: start,
                end: start + pageSize
            });
            results = results.concat(subresults);
            count = subresults.length;
            start += pageSize;
        } while (count == pageSize);

        //If load from Draft
        let objDraft = {};
        if(stDraft){
            if(stSubType=='Retail'){
                objDraft = JSON.parse(utilLib.getInventoryCountDraft(stUserId).stDraftRetail);
            }
            else if(stSubType=='Backbar'){
                objDraft = JSON.parse(utilLib.getInventoryCountDraft(stUserId).stDraftBackbar);
            }
        }
        
        let inCounter = 0;
        for(var i=0; i<results.length; i++){
            var result = results[i];
            var stItem = result.getValue(result.columns[0]);
            itemLines.setSublistValue({
                id : 'custpage_cwgp_item',
                line : inCounter,
                value: result.id
            });
            itemLines.setSublistValue({
                id : 'custpage_cwgp_itemid',
                line : inCounter,
                value: result.id
            });
            /*itemLines.setSublistValue({
                id : 'custpage_cwgp_description',
                line : inCounter,
                value: arrDescFirstCount[index] || ' '
            });*/
            itemLines.setSublistValue({
                id : 'custpage_cwgp_internalsku',
                line : inCounter,
                value: result.getValue(result.columns[2]) || ' '
            });
            itemLines.setSublistValue({
                id : 'custpage_cwgp_upccode',
                line : inCounter,
                value: result.getValue(result.columns[3]) || ' '
            });
            itemLines.setSublistValue({
                id : 'custpage_cwgp_description',
                line : inCounter,
                value: result.getValue(result.columns[1]) || ' '
            });

            if(stDraft){
                if(objDraft.hasOwnProperty(result.id)){
                    itemLines.setSublistValue({
                        id : 'custpage_cwgp_firstcount',
                        line : inCounter,
                        value: objDraft[result.id]
                    });
                }
                
            }

            inCounter++;
        }
    };
    const populateSecondCountLines = (arrItemFirstCount,rec,itemLines,stLocation,stSubsidiary,form,stSubType) => {
        var arrItemFirstCount = [];
        var arrQtyFirstCount = [];
        var arrIndexFirstCount = [];
        var arrDescFirstCount = [];
        var numLines = rec.getLineCount({
            group: 'custpage_inventoryadjustmentinventorycount_items'
        });
        for(var i=0; i<numLines; i++){
            var stItem = rec.getSublistValue({
                group: 'custpage_inventoryadjustmentinventorycount_items',
                name: 'custpage_cwgp_item',
                line: i
            });
            
            var inFirstCount = rec.getSublistValue({
                group: 'custpage_inventoryadjustmentinventorycount_items',
                name: 'custpage_cwgp_firstcount',
                line: i
            });
            var stDescFirstCount = rec.getSublistValue({
                group: 'custpage_inventoryadjustmentinventorycount_items',
                name: 'custpage_cwgp_description',
                line: i
            });
            arrItemFirstCount.push(stItem);
            arrQtyFirstCount.push(inFirstCount);
            arrDescFirstCount.push(stDescFirstCount);
            arrIndexFirstCount.push(i);
        }

        const ssItemPerLocationIC = search.load({ id: "customsearch_cwgp_retail_icitemsearch", type: "item" });
        if(stSubType=='Retail'){
            ssItemPerLocationIC.filters.push(search.createFilter({
                name: 'name',
                operator: 'doesnotcontain',
                values: 'backbar',
            }));
        }
        else if(stSubType=='Backbar'){
            ssItemPerLocationIC.filters.push(search.createFilter({
                name: 'name',
                operator: 'contains',
                values: 'backbar',
            }));
        }

        ssItemPerLocationIC.filters.push(search.createFilter({
            name: 'inventorylocation',
            operator: 'anyof',
            values: stLocation,
        }));

        ssItemPerLocationIC.filters.push(search.createFilter({
            name: 'subsidiary',
            operator: 'anyof',
            values: stSubsidiary,
        }));



        var results = [];
        var count = 0;
        var pageSize = 1000;
        var start = 0;

        do {
            var subresults = ssItemPerLocationIC.run().getRange({
                start: start,
                end: start + pageSize
            });

            results = results.concat(subresults);
            count = subresults.length;
            start += pageSize;
        } while (count == pageSize);

        let inCounter = 0;
        for(var i=0; i<results.length; i++){
            var result = results[i];
            var stItem = result.getValue(result.columns[0]);
            var intQtyOnhand = result.getValue(result.columns[4]);
            var index = arrItemFirstCount.indexOf(stItem);

            /*log.debug('stItem0',JSON.stringify({
                stItem: stItem,
                intQtyOnhand: intQtyOnhand,
                index: index,
                arrQtyFirstCounindex:arrQtyFirstCount[index]
            }));*/
            
            if(index != -1 && intQtyOnhand != arrQtyFirstCount[index] && arrQtyFirstCount[index]){
                log.debug('stItem1', JSON.stringify({
                    stItem: stItem,
                    index: index,
                    intQtyOnhand: intQtyOnhand,
                    arrQtyFirstCountindex: arrQtyFirstCount[index],
                }));;
                itemLines.setSublistValue({
                    id : 'custpage_cwgp_firstcount',
                    line : inCounter,
                    value: arrQtyFirstCount[index]
                });
                itemLines.setSublistValue({
                    id : 'custpage_cwgp_item',
                    line : inCounter,
                    value: stItem
                });
                itemLines.setSublistValue({
                    id : 'custpage_cwgp_itemid',
                    line : inCounter,
                    value: stItem
                });
                itemLines.setSublistValue({
                    id : 'custpage_cwgp_description',
                    line : inCounter,
                    value: arrDescFirstCount[index] || ' '
                });
                itemLines.setSublistValue({
                    id : 'custpage_cwgp_internalsku',
                    line : inCounter,
                    value: result.getValue(result.columns[2]) || ' '
                });
                itemLines.setSublistValue({
                    id : 'custpage_cwgp_upccode',
                    line : inCounter,
                    value: result.getValue(result.columns[3]) || ' '
                });

                itemLines.setSublistValue({
                    id : 'custpage_cwgp_qtyonhand',
                    line : inCounter,
                    value: intQtyOnhand
                });
                inCounter++;
                arrItemFirstCount.splice(index,1);
                arrQtyFirstCount.splice(index,1);
                arrDescFirstCount.splice(index,1);
                arrIndexFirstCount.splice(index,1);
            }
            else if(index != -1 && intQtyOnhand != 0 && !arrQtyFirstCount[index]){
                log.debug('stItem2', stItem);

                itemLines.setSublistValue({
                    id : 'custpage_cwgp_firstcount',
                    line : inCounter,
                    value: arrQtyFirstCount[index]
                });

                itemLines.setSublistValue({
                    id : 'custpage_cwgp_item',
                    line : inCounter,
                    value: stItem
                });
                itemLines.setSublistValue({
                    id : 'custpage_cwgp_itemid',
                    line : inCounter,
                    value: stItem
                });
                itemLines.setSublistValue({
                    id : 'custpage_cwgp_description',
                    line : inCounter,
                    value: result.getValue(result.columns[1]) || ' '
                });
                itemLines.setSublistValue({
                    id : 'custpage_cwgp_internalsku',
                    line : inCounter,
                    value: result.getValue(result.columns[2]) || ' '
                });
                itemLines.setSublistValue({
                    id : 'custpage_cwgp_upccode',
                    line : inCounter,
                    value: result.getValue(result.columns[3]) || ' '
                });

                  itemLines.setSublistValue({
                    id : 'custpage_cwgp_qtyonhand',
                    line : inCounter,
                    value: intQtyOnhand
                });
                inCounter++;
                arrItemFirstCount.splice(index,1);
                arrQtyFirstCount.splice(index,1);
                arrDescFirstCount.splice(index,1);
                arrIndexFirstCount.splice(index,1);
            }
            else if(index == -1 && stItem != '' && intQtyOnhand != 0){
                log.debug('B', '');
                itemLines.setSublistValue({
                    id : 'custpage_cwgp_item',
                    line : inCounter,
                    value: stItem
                });
                itemLines.setSublistValue({
                    id : 'custpage_cwgp_itemid',
                    line : inCounter,
                    value: stItem
                });
                itemLines.setSublistValue({
                    id : 'custpage_cwgp_description',
                    line : inCounter,
                    value: result.getValue(result.columns[1]) || ' '
                });
                itemLines.setSublistValue({
                    id : 'custpage_cwgp_internalsku',
                    line : inCounter,
                    value: result.getValue(result.columns[4]) || ' '
                });
                itemLines.setSublistValue({
                    id : 'custpage_cwgp_upccode',
                    line : inCounter,
                    value: result.getValue(result.columns[3]) || ' '
                });
                itemLines.setSublistValue({
                    id : 'custpage_cwgp_qtyonhand',
                    line : inCounter,
                    value: intQtyOnhand
                });
                inCounter++;
            }
            else if(index != -1 && intQtyOnhand == arrQtyFirstCount[index]){
                arrItemFirstCount.splice(index,1);
                arrQtyFirstCount.splice(index,1);
                arrDescFirstCount.splice(index,1);
                arrIndexFirstCount.splice(index,1);
            }
        }
        var fieldTotalSku = form.getField({
            id : 'custpage_cwgp_itemsummary'
        });
        fieldTotalSku.defaultValue = inCounter;


    };

    const populateSecondCountLinesDraft = (arrItemFirstCount,itemLines,stLocation,stSubsidiary,form,stSubType,stUserId) => {
        var arrItemFirstCount = [];
        var arrQtyFirstCount = [];
        var arrQtySecondCount = [];
        var arrDescFirstCount = [];
        var arrSkuFirstCount = [];
        var arrUpcFirstCount = [];
        var arrQtyOH = [];



        const ssItemPerLocationIC = search.load({ id: "customsearch_cwgp_retail_icitemsearch", type: "item" });
        if(stSubType=='Retail'){
            ssItemPerLocationIC.filters.push(search.createFilter({
                name: 'name',
                operator: 'doesnotcontain',
                values: 'backbar',
            }));
        }
        else if(stSubType=='Backbar'){
            ssItemPerLocationIC.filters.push(search.createFilter({
                name: 'name',
                operator: 'contains',
                values: 'backbar',
            }));
        }

        ssItemPerLocationIC.filters.push(search.createFilter({
            name: 'inventorylocation',
            operator: 'anyof',
            values: stLocation,
        }));

        ssItemPerLocationIC.filters.push(search.createFilter({
            name: 'subsidiary',
            operator: 'anyof',
            values: stSubsidiary,
        }));

        var results = [];
        var count = 0;
        var pageSize = 1000;
        var start = 0;
        do {
            var subresults = ssItemPerLocationIC.run().getRange({
                start: start,
                end: start + pageSize
            });
            results = results.concat(subresults);
            count = subresults.length;
            start += pageSize;
        } while (count == pageSize);

        //If load from Draft
        let objDraft = {};
        if(stSubType=='Retail'){
            objDraft = JSON.parse(utilLib.getInventoryCountDraft(stUserId).stDraftRetail);
        }
        else if(stSubType=='Backbar'){
            objDraft = JSON.parse(utilLib.getInventoryCountDraft(stUserId).stDraftBackbar);
        }
        
        let inCounter = 0;
        for(var i=0; i<results.length; i++){
            var result = results[i];
            var stItem = result.getValue(result.columns[0]);
            var intQtyOnhand = result.getValue(result.columns[4] || 0);
            if(objDraft.hasOwnProperty(stItem)){
                log.debug('result', result);
                arrItemFirstCount.push(stItem);
                arrQtyFirstCount.push(objDraft[stItem][0] || '');
                arrQtySecondCount.push(objDraft[stItem][1] || '');
                arrDescFirstCount.push(result.getValue(result.columns[1]) || ' ');
                arrSkuFirstCount.push(result.getValue(result.columns[2]) || ' ');
                arrUpcFirstCount.push(result.getValue(result.columns[3]) || ' ');
                arrQtyOH.push(intQtyOnhand);
                inCounter++;
            }
            
        }

        for(var i=0; i<arrItemFirstCount.length; i++){
            //if(arrQtyFirstCount[i]){
                log.debug('item as', arrItemFirstCount[i]);
                if(arrQtyFirstCount[i] != ''){
                    itemLines.setSublistValue({
                        id : 'custpage_cwgp_firstcount',
                        line : i,
                        value: arrQtyFirstCount[i]
                    });
                }
                if(arrQtySecondCount[i] != ''){
                    itemLines.setSublistValue({
                        id : 'custpage_cwgp_secondcount',
                        line : i,
                        value: arrQtySecondCount[i]
                    });
                }
                
                itemLines.setSublistValue({
                    id : 'custpage_cwgp_item',
                    line : i,
                    value: arrItemFirstCount[i]
                });
                itemLines.setSublistValue({
                    id : 'custpage_cwgp_itemid',
                    line : i,
                    value: arrItemFirstCount[i]
                });
                
                log.debug('desc', arrDescFirstCount[i]);
                itemLines.setSublistValue({
                    id : 'custpage_cwgp_description',
                    line : i,
                    value: arrDescFirstCount[i]
                });
                log.debug('sku', arrSkuFirstCount[i]);
                itemLines.setSublistValue({
                    id : 'custpage_cwgp_internalsku',
                    line : i,
                    value: arrSkuFirstCount[i]
                });
                log.debug('upc', arrUpcFirstCount[i]);
                itemLines.setSublistValue({
                    id : 'custpage_cwgp_upccode',
                    line : i,
                    value: arrUpcFirstCount[i]
                });
                itemLines.setSublistValue({
                    id : 'custpage_cwgp_qtyonhand',
                    line : i,
                    value: arrQtyOH[i]
                });
            //}
            
        }


        var fieldTotalSku = form.getField({
            id : 'custpage_cwgp_itemsummary'
        });
        fieldTotalSku.defaultValue = inCounter;


    };
    //= (arrItemFirstCount,itemLines,stLocation,stSubsidiary,form,stSubType,stUserId) => {
    const populateFinalCountLines = (arrItemFirstCount,rec,itemLines,form,stSubType) => {
        var arrItemFirstCount = [];
        var arrQtyFirstCount = [];
        var numLines = rec.getLineCount({
            group: 'custpage_inventoryadjustmentinventorycount_items'
        });
        let inCounter = 0;
        let totalDiscrepancy = 0;
        for(var i=0; i<numLines; i++){

            var inSecondCount = rec.getSublistValue({
                group: 'custpage_inventoryadjustmentinventorycount_items',
                name: 'custpage_cwgp_secondcount',
                line: i
            });

            var inFirstCount = rec.getSublistValue({
                group: 'custpage_inventoryadjustmentinventorycount_items',
                name: 'custpage_cwgp_firstcount',
                line: i
            });

            var intQtyOnhand = rec.getSublistValue({
                group: 'custpage_inventoryadjustmentinventorycount_items',
                name: 'custpage_cwgp_qtyonhand',
                line: i
            });

            if(inSecondCount != intQtyOnhand){
                var stItem = rec.getSublistValue({
                    group: 'custpage_inventoryadjustmentinventorycount_items',
                    name: 'custpage_cwgp_item',
                    line: i
                });
                var stDesc = rec.getSublistValue({
                    group: 'custpage_inventoryadjustmentinventorycount_items',
                    name: 'custpage_cwgp_description',
                    line: i
                });
                var stSku = rec.getSublistValue({
                    group: 'custpage_inventoryadjustmentinventorycount_items',
                    name: 'custpage_cwgp_internalsku',
                    line: i
                });
                var stUpc = rec.getSublistValue({
                    group: 'custpage_inventoryadjustmentinventorycount_items',
                    name: 'custpage_cwgp_upccode',
                    line: i
                });
    
                /*itemLines.setSublistValue({
                    id : 'custpage_cwgp_discrepancy',
                    line : inCounter,
                    value: inSecondCount - intQtyOnhand
                });*/

                totalDiscrepancy += Math.abs(inSecondCount) + Math.abs(intQtyOnhand)

                if(inSecondCount){
                    itemLines.setSublistValue({
                        id : 'custpage_cwgp_item',
                        line : inCounter,
                        value: stItem
                    });
                    itemLines.setSublistValue({
                        id : 'custpage_cwgp_itemid',
                        line : inCounter,
                        value: stItem
                    });
                    itemLines.setSublistValue({
                        id : 'custpage_cwgp_description',
                        line : inCounter,
                        value: stDesc || ' '
                    });
                    itemLines.setSublistValue({
                        id : 'custpage_cwgp_internalsku',
                        line : inCounter,
                        value: stSku || ' '
                    });
                    itemLines.setSublistValue({
                        id : 'custpage_cwgp_upccode',
                        line : inCounter,
                        value: stUpc || ' '
                    });
        
                    itemLines.setSublistValue({
                        id : 'custpage_cwgp_qtyonhand',
                        line : inCounter,
                        value: intQtyOnhand
                    });
                    itemLines.setSublistValue({
                        id : 'custpage_cwgp_finalquantity',
                        line : inCounter,
                        value: inSecondCount
                    });
                    itemLines.setSublistValue({
                        id : 'custpage_cwgp_enteredquantity',
                        line : inCounter,
                        value: inSecondCount
                    });

                    itemLines.setSublistValue({
                        id : 'custpage_cwgp_discrepancy',
                        line : inCounter,
                        value: inSecondCount - intQtyOnhand
                    });
                }
                else if(!inSecondCount && inFirstCount){
                    itemLines.setSublistValue({
                        id : 'custpage_cwgp_item',
                        line : inCounter,
                        value: stItem
                    });
                    itemLines.setSublistValue({
                        id : 'custpage_cwgp_itemid',
                        line : inCounter,
                        value: stItem
                    });
                    itemLines.setSublistValue({
                        id : 'custpage_cwgp_description',
                        line : inCounter,
                        value: stDesc || ' '
                    });
                    itemLines.setSublistValue({
                        id : 'custpage_cwgp_internalsku',
                        line : inCounter,
                        value: stSku || ' '
                    });
                    itemLines.setSublistValue({
                        id : 'custpage_cwgp_upccode',
                        line : inCounter,
                        value: stUpc || ' '
                    });
        
                    itemLines.setSublistValue({
                        id : 'custpage_cwgp_qtyonhand',
                        line : inCounter,
                        value: intQtyOnhand
                    });
                    itemLines.setSublistValue({
                        id : 'custpage_cwgp_finalquantity',
                        line : inCounter,
                        value: inFirstCount
                    });
                    itemLines.setSublistValue({
                        id : 'custpage_cwgp_enteredquantity',
                        line : inCounter,
                        value: inFirstCount
                    });
                    itemLines.setSublistValue({
                        id : 'custpage_cwgp_discrepancy',
                        line : inCounter,
                        value: inFirstCount - intQtyOnhand
                    });
                }else if(!inSecondCount && !inFirstCount && intQtyOnhand !=0){
                    log.debug('stItem3', JSON.stringify({
                        stItem: stItem,
                        intQtyOnhand: intQtyOnhand,
                        inSecondCount: inSecondCount,
                        inFirstCount: inFirstCount,
                    }));;
                    itemLines.setSublistValue({
                        id : 'custpage_cwgp_item',
                        line : inCounter,
                        value: stItem
                    });
                    itemLines.setSublistValue({
                        id : 'custpage_cwgp_itemid',
                        line : inCounter,
                        value: stItem
                    });
                    itemLines.setSublistValue({
                        id : 'custpage_cwgp_description',
                        line : inCounter,
                        value: stDesc || ' '
                    });
                    itemLines.setSublistValue({
                        id : 'custpage_cwgp_internalsku',
                        line : inCounter,
                        value: stSku || ' '
                    });
                    itemLines.setSublistValue({
                        id : 'custpage_cwgp_upccode',
                        line : inCounter,
                        value: stUpc || ' '
                    });
        
                    itemLines.setSublistValue({
                        id : 'custpage_cwgp_qtyonhand',
                        line : inCounter,
                        value: intQtyOnhand
                    });
                    log.debug('C', stItem);
                    itemLines.setSublistValue({
                        id : 'custpage_cwgp_finalquantity',
                        line : inCounter,
                        value: intQtyOnhand
                    });
                    itemLines.setSublistValue({
                        id : 'custpage_cwgp_discrepancy',
                        line : inCounter,
                        value: 0-intQtyOnhand
                    });
                }
                /*else{
                    itemLines.setSublistValue({
                        id : 'custpage_cwgp_finalquantity',
                        line : inCounter,
                        value: intQtyOnhand
                    }); 
                    itemLines.setSublistValue({
                        id : 'custpage_cwgp_discrepancy',
                        line : inCounter,
                        value: 0 - intQtyOnhand
                    });
                    itemLines.setSublistValue({
                        id : 'custpage_cwgp_finalquantity',
                        line : inCounter,
                        value: 0
                    });
                }*/
                inCounter++;
            }
            
        }

        
        var fieldTotalSku = form.getField({
            id : 'custpage_cwgp_itemsummary'
        });
        fieldTotalSku.defaultValue = inCounter;

        var fieldTotalDiscrepancy = form.getField({
            id : 'custpage_cwgp_totaldiscrepancy'
        });
        fieldTotalDiscrepancy.defaultValue = parseInt(totalDiscrepancy);


    };

    const populateFinalCountLinesDraft = (arrItemFirstCount,itemLines,stLocation,stSubsidiary,form,stSubType,stUserId) => {
        var arrItemFirstCount = [];
        var arrQtyEnteredCount = [];
        var arrAdjustmentReason = [];
        var arrDescFirstCount = [];
        var arrSkuFirstCount = [];
        var arrUpcFirstCount = [];
        var arrQtyOH = [];



        const ssItemPerLocationIC = search.load({ id: "customsearch_cwgp_retail_icitemsearch", type: "item" });
        if(stSubType=='Retail'){
            ssItemPerLocationIC.filters.push(search.createFilter({
                name: 'name',
                operator: 'doesnotcontain',
                values: 'backbar',
            }));
        }
        else if(stSubType=='Backbar'){
            ssItemPerLocationIC.filters.push(search.createFilter({
                name: 'name',
                operator: 'contains',
                values: 'backbar',
            }));
        }

        ssItemPerLocationIC.filters.push(search.createFilter({
            name: 'inventorylocation',
            operator: 'anyof',
            values: stLocation,
        }));

        ssItemPerLocationIC.filters.push(search.createFilter({
            name: 'subsidiary',
            operator: 'anyof',
            values: stSubsidiary,
        }));

        var results = [];
        var count = 0;
        var pageSize = 1000;
        var start = 0;
        do {
            var subresults = ssItemPerLocationIC.run().getRange({
                start: start,
                end: start + pageSize
            });
            results = results.concat(subresults);
            count = subresults.length;
            start += pageSize;
        } while (count == pageSize);

        //If load from Draft
        let objDraft = {};
        if(stSubType=='Retail'){
            objDraft = JSON.parse(utilLib.getInventoryCountDraft(stUserId).stDraftRetail);
        }
        else if(stSubType=='Backbar'){
            objDraft = JSON.parse(utilLib.getInventoryCountDraft(stUserId).stDraftBackbar);
        }
        
        let inCounter = 0;
        for(var i=0; i<results.length; i++){
            var result = results[i];
            var stItem = result.getValue(result.columns[0]);
            var intQtyOnhand = result.getValue(result.columns[4] || 0);
            if(objDraft.hasOwnProperty(stItem)){
                
                arrItemFirstCount.push(stItem);
                arrQtyEnteredCount.push(objDraft[stItem][0] || '');
                arrAdjustmentReason.push(objDraft[stItem][1] || '');
                arrDescFirstCount.push(result.getValue(result.columns[1]) || ' ');
                arrSkuFirstCount.push(result.getValue(result.columns[2]) || ' ');
                arrUpcFirstCount.push(result.getValue(result.columns[3]) || ' ');
                arrQtyOH.push(intQtyOnhand);
                inCounter++;
            }
            
        }
        log.debug('arrAdjustmentReason', arrAdjustmentReason);
        log.debug('arrQtyOH', arrQtyOH);
        log.debug('arrQtyEnteredCount', arrQtyEnteredCount);
        for(var i=0; i<arrItemFirstCount.length; i++){
            //if(arrQtyEnteredCount[i]){
                log.debug('item as', arrItemFirstCount[i]);
                
                itemLines.setSublistValue({
                    id : 'custpage_cwgp_item',
                    line : i,
                    value: arrItemFirstCount[i]
                });
                itemLines.setSublistValue({
                    id : 'custpage_cwgp_itemid',
                    line : i,
                    value: arrItemFirstCount[i]
                });
                
                log.debug('desc', arrDescFirstCount[i]);
                itemLines.setSublistValue({
                    id : 'custpage_cwgp_description',
                    line : i,
                    value: arrDescFirstCount[i]
                });
                log.debug('sku', arrSkuFirstCount[i]);
                itemLines.setSublistValue({
                    id : 'custpage_cwgp_internalsku',
                    line : i,
                    value: arrSkuFirstCount[i]
                });
                log.debug('upc', arrUpcFirstCount[i]);
                itemLines.setSublistValue({
                    id : 'custpage_cwgp_upccode',
                    line : i,
                    value: arrUpcFirstCount[i]
                });
                itemLines.setSublistValue({
                    id : 'custpage_cwgp_qtyonhand',
                    line : i,
                    value: arrQtyOH[i]
                });
                
                if(arrQtyEnteredCount[i] != ''){
                    itemLines.setSublistValue({
                        id : 'custpage_cwgp_enteredquantity',
                        line : i,
                        value: arrQtyEnteredCount[i]
                    });
                    itemLines.setSublistValue({
                        id : 'custpage_cwgp_finalquantity',
                        line : i,
                        value: arrQtyEnteredCount[i]
                    });
                }
                

                if(arrAdjustmentReason[i] != ''){
                    itemLines.setSublistValue({
                        id : 'custpage_cwgp_adjustmentreason',
                        line : i,
                        value: arrAdjustmentReason[i]
                    });
                }

                

                itemLines.setSublistValue({
                    id : 'custpage_cwgp_discrepancy',
                    line : i,
                    value: arrQtyEnteredCount[i] - arrQtyOH[i]
                });
            //}
            
        }


        var fieldTotalSku = form.getField({
            id : 'custpage_cwgp_itemsummary'
        });
        fieldTotalSku.defaultValue = inCounter;


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
                stPageType: stType
            });
            stMapVendor = 19082;
            log.debug('scanbhtml', scanbhtml)
        }
        else{
            scanbhtml= EPLib.getScanButtonCss({stPageType: `${stType}_${stSubType}`})
            stMapVendor = 19082;
        }
        stSubTypeId = stSubType == 'standard' ? '6' : stSubType == 'backbar' ? '2' : stSubType == 'damage' ? '3' : stSubType == 'tester' ? '4' : stSubType == 'theft' ? '5' : stSubType == 'Retail' ? '1': stSubType == 'Backbar' ? '1': '' ;

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
    
    function addSearchBar(form){

        form.addFieldGroup({
            id: 'custpage_inventoryadjustmentinventorycount_search_grp',
            label: 'Item Search'
        });

        let fldInlineHtm = form.addField({
            id: 'custpage_inlinehtm',
            label: 'Inline HTML',
            type: serverWidget.FieldType.INLINEHTML,
            source: null,
            container: 'custpage_inventoryadjustmentinventorycount_search_grp'
        });
        fldInlineHtm.defaultValue = ``;
        fldInlineHtm.defaultValue += `<div style="padding:5px;">`;
        fldInlineHtm.defaultValue += `<input type="search" size="50" id="find-input"/>&nbsp;&nbsp;&nbsp;`;
        fldInlineHtm.defaultValue += `<button id="find-button" class="search-button" type="button" onClick='findString(document.getElementById("find-input").value.trim())'>&#x1F50D;</button>`;
        fldInlineHtm.defaultValue += `</div>`;
        fldInlineHtm.defaultValue += `<script>`;
        fldInlineHtm.defaultValue += `function findString(text) { window.find(text); var arrElementRes = getElementsByText(text, 'tr');}`;
        fldInlineHtm.defaultValue += `function getElementsByText(str, tag = 'a') { return Array.prototype.slice.call(document.getElementsByTagName(tag)).filter(el => el.textContent.trim() === str.trim());}`;
        fldInlineHtm.defaultValue += `</script>`;

    }

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
    
        input#submitter, input#secondarysubmitter, input#custpage_interpo_items_addedit , input#custpage_savedraft_button, input#secondarycustpage_savedraft_button, input#custpage_back_calculatesummary, input#secondarycustpage_back_calculatesummary{
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
        renderInventoryCount,
        renderInventoryCountSecond,
        renderInventoryCountFinal
    }
});
