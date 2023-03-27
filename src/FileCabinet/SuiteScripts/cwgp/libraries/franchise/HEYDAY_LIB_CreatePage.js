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

define(['N/ui/serverWidget', 'N/search','N/file' ,'./HEYDAY_LIB_Util.js', '../HEYDAY_LIB_ExternalPortal.js'], (serverWidget, search, file, utilLib, EPLib) => {
    const _CONFIG = {
        PARAMETER: {
            PAGE: 'custparam_cwgp_page'
        },
        TITLE: {

            franchisepo: 'Purchase Order',
            itemreceipt: 'Item Receipt',
            inventoryadjustment_standard: 'Inventory Adjustment',
            inventoryadjustment_backbar: 'Backbar Usage',
            inventoryadjustment_damagetestertheft: 'Damage/Tester/Theft',
            inventorycount: 'Inventory Count'
        },
        TAB: {
            franchisepo: 'custpage_franchisepo_itemstab',
            itemreceipt: 'custpage_itemreceipt_itemstab',
            inventoryadjustment_standard: 'custpage_inventoryadjustment_itemstab',
            inventoryadjustment_backbar: 'custpage_inventoryadjustmentbackbar_itemstab',
            inventoryadjustment_damagetestertheft: 'custpage_inventoryadjustmentdamagetestertheft_itemstab',
            inventorycount: 'custpage_inventoryadjustmentinventorycount_itemstab'
        },
        SUBLIST: {
            franchisepo: 'custpage_franchisepo_items',
            itemreceipt: 'custpage_itemreceipt_items',
            inventoryadjustment_standard: 'custpage_inventorayadjustment_items',
            inventoryadjustment_backbar: 'custpage_inventorayadjustmentbackbar_items',
            inventoryadjustment_damagetestertheft: 'custpage_inventoryadjustmentdamagetestertheft_items',
            inventorycount: 'custpage_inventoryadjustmentinventorycount_items',
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
                    isInline: ['1','2','3','4']
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
                LOCATION: {
                    id: 'custpage_cwgp_location',
                    type: serverWidget.FieldType.SELECT,
                    label: 'Location',
                    container: 'CLASS',
                    source: 'location',
                    displayType: 'inline',
                    mandatory: true
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
                /*TOTAL_DISCREPANCY_HTMLHIDDEN: {
                    id: 'custpage_cwgp_totaldiscrepancy',
                    type: serverWidget.FieldType.LONGTEXT,
                    label: 'Total Discrepancy Hidden',
                    container: 'PRIMARY',
                    displayType: 'hidden'
                },*/
                TOTAL_DISCREPANCY: {
                    id: 'custpage_cwgp_totaldiscrepancy',
                    type: serverWidget.FieldType.TEXT,
                    label: 'Total No. of Items with Discrepancy',
                    container: 'DISCREPANCY',
                    displayType: 'inline',
                    isHidden: ['1']
                },
                
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
                    /*QUANTITY_STARTING: {
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
                    },*/
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
                    FINAL_QUANTITY: {
                        id: 'custpage_cwgp_finalquantity',
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
                    QTY_ON_HAND: {
                        id: 'custpage_cwgp_qtyonhand',
                        type: serverWidget.FieldType.INTEGER,
                        label: 'Quantity On Hand',
                        displayType: 'disabled'
                    },
                    ADJUST_QUANTITY_BY: {
                        id: 'custpage_cwgp_adjustqtyby',
                        type: serverWidget.FieldType.INTEGER,
                        label: 'Adjust Inventory Quantity'
                    },
                    ENDING_INVENTORY_QUANTITY: {
                        id: 'custpage_cwgp_endinginventoryqty',
                        type: serverWidget.FieldType.INTEGER,
                        label: 'Ending Inventory Quantity'
                    },
                    NEW_QUANTITY: {
                        id: 'custpage_cwgp_newquantity',
                        type: serverWidget.FieldType.INTEGER,
                        label: 'New Quantity',
                        displayType: 'disabled'
                    },
                    ADJUSTMENT_TYPE: {
                        id: 'custpage_cwgp_adjustmenttype',
                        type: serverWidget.FieldType.SELECT,
                        label: 'Adjustment Type'
                    },
                    ADJUSTMENT_REASON: {
                        id: 'custpage_cwgp_adjustmentreason',
                        type: serverWidget.FieldType.TEXTAREA,
                        label: 'Adjustment Reason'
                    }
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
                        label: '*Items'
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
                        label: '*Room # Assignment'
                    },
                    ST_ASSIGNMENT: {
                        id: 'custpage_cwgp_stassignment',
                        type: serverWidget.FieldType.TEXT,
                        label: 'St Assignment'
                    },
                    /*DATE_TIME: {
                        id: 'custpage_cwgp_datetime',
                        type: serverWidget.FieldType.DATETIMETZ,
                        label: 'Date/Time (M/D/YYYY hhmm)'
                    },*/
                    NEW_QUANTITY: {
                        id: 'custpage_cwgp_finalquantity',
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
                        label: '*Adjustment Reason'
                    }
                },
                inventoryadjustment_damagetestertheft: {
                    ITEM: {
                        id: 'custpage_cwgp_item',
                        type: serverWidget.FieldType.SELECT,
                        label: 'Items'
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
                    QTY_ON_HAND: {
                        id: 'custpage_cwgp_qtyonhand',
                        type: serverWidget.FieldType.INTEGER,
                        label: 'Starting Quantity in Saleable Inventory',
                        displayType: 'disabled'
                    },
                    /*DATE_TIME: {
                        id: 'custpage_cwgp_datetime',
                        type: serverWidget.FieldType.DATETIMETZ,
                        label: 'Date/Time (M/D/YYYY hhmm)',
                    },*/
                    RATE: {
                        id: 'custpage_cwgp_estimatedreplacementvalue',
                        type: serverWidget.FieldType.CURRENCY,
                        label: 'Estimated Replacement Value',
                        displayType:'disabled'
                    },
                    ADJUST_QUANTITY_BY: {
                        id: 'custpage_cwgp_adjustqtyby',
                        type: serverWidget.FieldType.INTEGER,
                        label: 'Quantity Removed'
                    },
                    
                    
                    /*ROOM_NUMBER: {
                        id: 'custpage_cwgp_roomnumber',
                        type: serverWidget.FieldType.TEXT,
                        label: 'Room # Assignment',
                    },
                    ST_ASSIGNMENT: {
                        id: 'custpage_cwgp_stassignment',
                        type: serverWidget.FieldType.TEXT,
                        label: 'St Assignment',
                    },
                    /*ENDING_INVENTORY_QUANTITY: {
                        id: 'custpage_cwgp_endinginventoryqty',
                        type: serverWidget.FieldType.INTEGER,
                        label: 'Ending Inventory Quantity'
                    },
                    BUSINESS_LINE: {
                        id: 'custpage_cwgp_businessline',
                        type: serverWidget.FieldType.SELECT,
                        label: 'Business Line',
                        displayType: 'hidden'
                    },*/
                    /*DATE_TIME: {
                        id: 'custpage_cwgp_datetime',
                        type: serverWidget.FieldType.DATETIMETZ,
                        label: 'Business Line',
                        displayType: 'hidden'
                    },
                    NEW_QUANTITY: {
                        id: 'custpage_cwgp_newquantity',
                        type: serverWidget.FieldType.INTEGER,
                        label: 'Final Quantity',
                        displayType: 'disabled'
                    },*/
                    ADJUSTMENT_TYPE: {
                        id: 'custpage_cwgp_adjustmenttype',
                        type: serverWidget.FieldType.SELECT,
                        label: 'Adjustment Type'
                    },
                    ADJUSTMENT_REASON: {
                        id: 'custpage_cwgp_adjustmentreason',
                        type: serverWidget.FieldType.TEXTAREA,
                        label: 'Adjustment Reason'
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
                    QTY_ON_HAND: {
                        id: 'custpage_cwgp_qtyonhand',
                        type: serverWidget.FieldType.INTEGER,
                        label: 'Starting Quantity',
                        //displayType: 'hidden'
                        isHidden: ['1','2']
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
                    /*ADJUST_QUANTITY_BY: {
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
                    },*/
                    DISCREPANCY: {
                        id: 'custpage_cwgp_discrepancy',
                        type: serverWidget.FieldType.TEXT,
                        label: 'Discrepancy',
                        displayType: 'inline',
                        isHidden: ['1','2']
                    },
                    
                    /*NEW_QUANTITY: {
                        id: 'custpage_cwgp_newquantity',
                        type: serverWidget.FieldType.INTEGER,
                        label: 'New Quantity',
                        isHidden: ['1','2','4'],
                        isEntry: ['3']
                    },*/
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
                    id: 'custpage_inventoryadjustmentinventorycount_pi_grp',
                    label: 'Primary Information'
                },
                CLASS: {
                    id: 'custpage_inventoryadjustmentinventorycount_class_grp',
                    label: 'Classification'
                },
                DISCREPANCY: {
                    id: 'custpage_inventoryadjustmentinventorycount_discrepancy_grp',
                    label: 'Discrepancy'
                },
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
            stAccessType,
            stOperator
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
        objPO.body.custpage_cwgp_operator = stOperator;
        objPO.body.custpage_cwgp_upccodemap = stUpcMap;
        objPO.body.custpage_cwgp_scanbtnhtml = EPLib.getScanButtonCss({stPageType: 'itemreceipt'});

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

        utilLib.setSublistValues(sbl, objPO);

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
            stLocation,
            stSubType,
            stOperator
        } = options;
        const form = serverWidget.createForm({ title: _CONFIG.TITLE[stType+'_'+stSubType] });
        form.clientScriptModulePath = _CONFIG.CLIENT_SCRIPT;

        //Initialize Add Scanner Field Group and Fields
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
                displayType
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

            if ((id =='custpage_cwgp_totaladjustment' || id == 'custpage_cwgp_itemsummary') && stSubType != 'damagetestertheft') {
                fld.updateDisplayType({ displayType: 'hidden' });
            }

            const objDefaultValues = mapDefaultValues({
                stSubsidiary, 
                stLocation,
                stPageMode, 
                stUserId,
                stAccessType,
                stCustomer,
                stType,
                stUpcMap,
                stSubType,
                stOperator
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
        log.debug('arrCols IA', arrCols);
        log.debug('stSubType', stSubType);
        arrCols.forEach((stCol) => {
            const { id, type, label, displayType, mandatory} = objItemCols[stCol];
            let col = sbl.addField({
                id,
                type,
                label,
                displayType,
                mandatory
            });
            
            if (displayType) {
                col.updateDisplayType({ displayType });
            }
            if (mandatory) {
                col.isMandatory = true;
            }
            if (id == 'custpage_cwgp_item') {
                utilLib.addOptionsItemBySubsidiary({
                    fld: col, 
                    objResultSet: objItemResultSet
                });
            }
            if(id == 'custpage_cwgp_adjustmenttype'){
                utilLib.addOptionsAdjusmentTypeFiltered(col,stSubType);
                /*if(stSubType == 'damagetestertheft'){
                    col.removeSelectOption({
                        value: 1,
                    });
                    col.removeSelectOption({
                        value: 2,
                    });
                    col.removeSelectOption({
                        value: 6,
                    });
                }*/
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
            stCustomer,
            stPageMode,
            stUserId,
            stAccessType,
            stStep,
            objOperator,
            objIC
        } = options;


        
        const stTitle = 'First Count';
        const form = serverWidget.createForm({ title: _CONFIG.TITLE[stType]+' - '+stTitle});

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
        log.debug('arrFlds', arrFlds);

        const stOperator = objOperator[0].stOperator;
        const stOperatorId = objOperator[0].stOperatorId;
        const objDefaultValues = mapDefaultValues({
            stSubsidiary,
            stLocation, 
            stCustomer,
            stPageMode, 
            stUserId,
            stAccessType,
            stType,
            stUpcMap,
            stOperator,
            stOperatorId,
            stStep
        });

        

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
                isHidden
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
            


            
            if(isInline){	
                if(isInline.includes(stStep)){	
                    fld.updateDisplayType({ displayType: 'inline' });	
                };	
            }

            if (objDefaultValues[fld.id] != 'undefined') {
                fld.defaultValue = objDefaultValues[fld.id]
            }
            if(isHidden){
                if(isHidden.includes(stStep)){
                    fld.updateDisplayType({ displayType: 'hidden' });
                }
            };

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

            if(id == 'custpage_cwgp_adjustmenttype'){
                utilLib.addOptionsAdjusmentType(col);
                col.defaultValue = 1;
            }

            if (displayType) {
                col.updateDisplayType({ displayType });
            }

            if (id == 'custpage_cwgp_item') {
                utilLib.addOptionsItemBySubsidiary({
                    fld: col, 
                    objResultSet: objItemResultSet
                });
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

        /*if(objICparsed && stStep != 1){
            utilLib.setSublistValues(sbl, objICparsed);
        }*/
        populateFirstCountLines(stCustomer,form,sbl);

        form.addSubmitButton({ label: 'Submit - First Count' });

        form.addButton({
            id: 'custpage_back_button',
            label: 'Cancel',
            functionName: `back(${stUserId}, ${stAccessType}, 'inventorycount')`
        });

        response.writePage(form);
    };

    const renderInventoryCountSecond = (request,response) => {
        log.debug('request', request);
        var rec = request;
        

        var stCustomer = rec.parameters.custpage_cwgp_customer;
        log.debug('stCustomer', stCustomer);
        var stSubsidiary = rec.parameters.custpage_cwgp_subsidiary;
        log.debug('stSubsidiary', stSubsidiary);
        var stStep = '2';
        log.debug('stStep', stStep);
        var stUserId = rec.parameters.custpage_cwgp_userid;
        log.debug('stUserId', stUserId);
        // var objItemResultSet = EPLib.getInvItemsBySubsidiary({stSubsidiary});	
        var stAccessType = rec.parameters.custpage_cwgp_accesstype;
        log.debug('stAccessType', stAccessType);
        var stPageMode = rec.parameters.custpage_cwgp_pagemode;
        log.debug('stPageMode', stPageMode);
        var stType = 'inventorycount';
        var stOperator = rec.parameters.custpage_cwgp_operator;
        var stLocation = rec.parameters.custpage_cwgp_location;
        var stMemo = rec.parameters.custpage_cwgp_memomain;
        var stType = rec.parameters.custpage_cwgp_rectype;
        var stAccessType = rec.parameters.custpage_cwgp_accesstype;
        log.debug('stOperator', stOperator);
        const form = serverWidget.createForm({ title: _CONFIG.TITLE[stType]+' - Second Count'});

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
        log.debug('arrFlds', arrFlds);

        //const stOperator = objOperator[0].stOperator;
        //const stOperatorId = objOperator[0].stOperatorId;
        const objDefaultValues = mapDefaultValues({
            stSubsidiary,
            stLocation, 
            stCustomer,
            stPageMode, 
            stUserId,
            stAccessType,
            stType,
            stUpcMap,
            stOperator,
            //stOperatorId,
            stStep,
            stMemo
        });

        

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
                isHidden
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
           


            
            if(isInline){	
                if(isInline.includes(stStep)){	
                    fld.updateDisplayType({ displayType: 'inline' });	
                };	
            }

            if (objDefaultValues[fld.id] != 'undefined') {
                fld.defaultValue = objDefaultValues[fld.id]
            }
            if(isHidden){
                if(isHidden.includes(stStep)){
                    fld.updateDisplayType({ displayType: 'hidden' });
                }
            };
            /*if(objICparsed && stStep != 1){
                if (objICparsed.body[fld.id] != 'undefined') {
                    if(id != 'custpage_cwgp_date'){
                        fld.defaultValue = objICparsed.body[fld.id]
                    }
                    else{
                        fld.defaultValue = new Date(objICparsed.body[fld.id]);
                    }
                }
            }*/

        });

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

            if(id == 'custpage_cwgp_adjustmenttype'){
                utilLib.addOptionsAdjusmentType(col);
                col.defaultValue = 1;
            }

            if (displayType) {
                col.updateDisplayType({ displayType });
            }

            if (id == 'custpage_cwgp_item') {
                utilLib.addOptionsItemBySubsidiary({
                    fld: col, 
                    objResultSet: objItemResultSet
                });
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
        
        populateSecondCountLines(stCustomer,rec,sbl,form);
        utilLib.createICLineBackupFile(stOperator, 1, rec);
        form.addSubmitButton({ label: 'Submit - Second Count' });

        form.addButton({
            id: 'custpage_back_button',
            label: 'Cancel',
            functionName: `back(${stUserId}, ${stAccessType}, 'inventorycount')`
        });
        response.writePage(form);
    };

    const renderInventoryCountFinal = (request,response) => {
        log.debug('request', request);
        var rec = request;
        var arrItemFirstCount = [];
        var arrQtyFirstCount = [];
        var numLines = rec.getLineCount({
            group: 'custpage_inventoryadjustmentinventorycount_items'
        });
        log.debug('numLines', numLines);
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

        var stCustomer = rec.parameters.custpage_cwgp_customer;
        log.debug('stCustomer', stCustomer);
        var stSubsidiary = rec.parameters.custpage_cwgp_subsidiary;
        log.debug('stSubsidiary', stSubsidiary);
        var stStep = '3';
        log.debug('stStep', stStep);
        var stUserId = rec.parameters.custpage_cwgp_userid;
        log.debug('stUserId', stUserId);
        var objItemResultSet = EPLib.getInvItemsBySubsidiary({stSubsidiary});	
        var stAccessType = rec.parameters.custpage_cwgp_accesstype;
        log.debug('stAccessType', stAccessType);
        var stPageMode = rec.parameters.custpage_cwgp_pagemode;
        log.debug('stPageMode', stPageMode);
        var stType = 'inventorycount';
        var stOperator = rec.parameters.custpage_cwgp_operator;
        var stLocation = rec.parameters.custpage_cwgp_location;
        var stMemo = rec.parameters.custpage_cwgp_memomain;
        var stType = rec.parameters.custpage_cwgp_rectype;
        var stAccessType = rec.parameters.custpage_cwgp_accesstype;
        // var stUpcMap = rec.parameters.custpage_cwgp_upccodemap;
        log.debug('stOperator', stOperator);
        const form = serverWidget.createForm({ title: _CONFIG.TITLE[stType]+' - Final Review'});

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
        log.debug('arrFlds', arrFlds);

        //const stOperator = objOperator[0].stOperator;
        //const stOperatorId = objOperator[0].stOperatorId;
        const objDefaultValues = mapDefaultValues({
            stSubsidiary,
            stLocation, 
            stCustomer,
            stPageMode, 
            stUserId,
            stAccessType,
            stType,
            // stUpcMap,
            stOperator,
            //stOperatorId,
            stStep,
            stMemo
        });

        

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
                isHidden
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
           


            
            if(isInline){	
                if(isInline.includes(stStep)){	
                    fld.updateDisplayType({ displayType: 'inline' });	
                };	
            }

            if (objDefaultValues[fld.id] != 'undefined') {
                fld.defaultValue = objDefaultValues[fld.id]
            }
            if(isHidden){
                if(isHidden.includes(stStep)){
                    fld.updateDisplayType({ displayType: 'hidden' });
                }
            };
            /*if(objICparsed && stStep != 1){
                if (objICparsed.body[fld.id] != 'undefined') {
                    if(id != 'custpage_cwgp_date'){
                        fld.defaultValue = objICparsed.body[fld.id]
                    }
                    else{
                        fld.defaultValue = new Date(objICparsed.body[fld.id]);
                    }
                }
            }*/

        });

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

            if(id == 'custpage_cwgp_adjustmenttype'){
                utilLib.addOptionsAdjusmentType(col);
                col.defaultValue = 1;
            }

            if (displayType) {
                col.updateDisplayType({ displayType });
            }

            if (id == 'custpage_cwgp_item') {
                utilLib.addOptionsItemBySubsidiary({
                    fld: col, 
                    objResultSet: objItemResultSet
                });
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
        
        //populateFinalCountLines(stCustomer,arrItemFirstCount,arrQtyFirstCount,sbl);
        populateFinalCountLines(request,sbl,form);
        utilLib.createICLineBackupFile(stOperator, 2, rec);
        form.addSubmitButton({ label: 'Submit - Final Review' });

        form.addButton({
            id: 'custpage_back_button',
            label: 'Cancel',
            functionName: `back(${stUserId}, ${stAccessType}, 'inventorycount')`
        });
        response.writePage(form);
    };

    const populateFirstCountLines = (stCustomer,form,itemLines) => {
        const ssItemPerLocationIC = search.load({ id: "customsearch_cwgp_franchise_itemlist", type: "inventoryitem" });

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
                value: result.getValue(result.columns[6]) || ' '
            });
            inCounter++;
        }
    };

    const populateSecondCountLines = (stCustomer,rec,itemLines,form) => {
        var arrItemFirstCount = [];
        var arrQtyFirstCount = [];
        var arrIndexFirstCount = [];
        var arrDescFirstCount = [];
        var arrSkuFirstCount = [];
        var arrUpcFirstCount = [];
        var numLines = rec.getLineCount({
            group: 'custpage_inventoryadjustmentinventorycount_items'
        });
        log.debug('numLines', numLines);
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
            var stSkuFirstCount = rec.getSublistValue({
                group: 'custpage_inventoryadjustmentinventorycount_items',
                name: 'custpage_cwgp_internalsku',
                line: i
            });
            var stUpcFirstCount = rec.getSublistValue({
                group: 'custpage_inventoryadjustmentinventorycount_items',
                name: 'custpage_cwgp_upccode',
                line: i
            });
            arrItemFirstCount.push(stItem);
            arrQtyFirstCount.push(inFirstCount);
            arrDescFirstCount.push(stDescFirstCount);
            arrIndexFirstCount.push(i);
            arrSkuFirstCount.push(stSkuFirstCount);
            arrUpcFirstCount.push(stUpcFirstCount)
        }
        log.debug('arrItemFirstCount', arrItemFirstCount);
        log.debug('arrQtyFirstCount', arrQtyFirstCount);
        const ssItemPerLocationIC = search.load({ id: "customsearch_cwgp_franchise_itemperlocic", type: "customrecord_cwgp_franchise_tranline" });

        ssItemPerLocationIC.filters.push(search.createFilter({
            name: 'custrecord_cwgp_ftl_customer',
            operator: 'anyof',
            values: stCustomer,
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
            var intQtyOnhand = result.getValue(result.columns[2]);
            var index = arrItemFirstCount.indexOf(stItem);
            log.debug('stItem', stItem);
            log.debug('intQtyOnhand', intQtyOnhand);
            log.debug('index', index);
            log.debug('arrQtyFirstCount[index]', arrQtyFirstCount[index]);
            
            if(arrQtyFirstCount[index]){
                log.debug('arrQtyFirstCount[index] exists', '');
            }
            if(index != -1 && intQtyOnhand != arrQtyFirstCount[index] && arrQtyFirstCount[index]){
                log.debug('A', '');
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
                    value: result.getValue(result.columns[4]) || ' '
                });
                itemLines.setSublistValue({
                    id : 'custpage_cwgp_upccode',
                    line : inCounter,
                    value: result.getValue(result.columns[5]) || ' '
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
                arrSkuFirstCount.splice(index,1);
                arrUpcFirstCount.splice(index,1);
                //log.debug('arrItemFirstCount', arrItemFirstCount);
                //log.debug('index', index);
            }
            else if(index != -1 && intQtyOnhand != 0 && !arrQtyFirstCount[index]){
                log.debug('B', '');
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
                    value: result.getValue(result.columns[4]) || ' '
                });
                itemLines.setSublistValue({
                    id : 'custpage_cwgp_upccode',
                    line : inCounter,
                    value: result.getValue(result.columns[5]) || ' '
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
                arrSkuFirstCount.splice(index,1);
                arrUpcFirstCount.splice(index,1);
                
            }
            else if(index == -1 && stItem != '' && intQtyOnhand != 0){
                log.debug('C', '');
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
                    value: result.getValue(result.columns[3]) || ' '
                });
                itemLines.setSublistValue({
                    id : 'custpage_cwgp_internalsku',
                    line : inCounter,
                    value: result.getValue(result.columns[4]) || ' '
                });
                itemLines.setSublistValue({
                    id : 'custpage_cwgp_upccode',
                    line : inCounter,
                    value: result.getValue(result.columns[5]) || ' '
                });

                itemLines.setSublistValue({
                    id : 'custpage_cwgp_qtyonhand',
                    line : inCounter,
                    value: intQtyOnhand
                });
                inCounter++;
            }
            else if(index != -1 && intQtyOnhand == arrQtyFirstCount[index]){
                log.debug('D', '');
                arrItemFirstCount.splice(index,1);
                arrQtyFirstCount.splice(index,1);
                arrDescFirstCount.splice(index,1);
                arrIndexFirstCount.splice(index,1);
                arrSkuFirstCount.splice(index,1);
                arrUpcFirstCount.splice(index,1);
            }
        }

        for(var i=0; i<arrItemFirstCount.length; i++){
            if(arrQtyFirstCount[i]){
                log.debug('item', arrItemFirstCount[i]);
                itemLines.setSublistValue({
                    id : 'custpage_cwgp_firstcount',
                    line : inCounter,
                    value: arrQtyFirstCount[i]
                });
                itemLines.setSublistValue({
                    id : 'custpage_cwgp_item',
                    line : inCounter,
                    value: arrItemFirstCount[i]
                });
                log.debug('desc', arrDescFirstCount[i]);
                itemLines.setSublistValue({
                    id : 'custpage_cwgp_description',
                    line : inCounter,
                    value: arrDescFirstCount[i]
                });
                log.debug('sku', arrSkuFirstCount[i]);
                itemLines.setSublistValue({
                    id : 'custpage_cwgp_internalsku',
                    line : inCounter,
                    value: arrSkuFirstCount[i]
                });
                log.debug('upc', arrUpcFirstCount[i]);
                itemLines.setSublistValue({
                    id : 'custpage_cwgp_upccode',
                    line : inCounter,
                    value: arrUpcFirstCount[i]
                });

                //arrSkuFirstCount.splice(index,1);
                //arrUpcFirstCount.splice(index,1);
                inCounter++;
            }
            
        }

        


        var fldTotalDiscrepancy = form.getField({
            id : 'custpage_cwgp_totaldiscrepancy'
        });
        fldTotalDiscrepancy.defaultValue = inCounter;

    };

    const populateFinalCountLines = (request,itemLines,form) => {
        var rec = request;
        var arrItemFirstCount = [];
        var arrQtyFirstCount = [];
        var numLines = rec.getLineCount({
            group: 'custpage_inventoryadjustmentinventorycount_items'
        });
        log.debug('numLines', numLines);
        let inCounter = 0;
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

            if(inSecondCount && inSecondCount != intQtyOnhand){
                
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
                inCounter++;
            }
            else if(!inSecondCount && inFirstCount && inFirstCount != intQtyOnhand){
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
                log.debug('B', stItem);
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
                inCounter++;
            }
            else if(!inSecondCount && !inFirstCount && intQtyOnhand !=0){
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
                    value: 0 - intQtyOnhand
                });
                inCounter++;
            }
        }
        
        var fldTotalDiscrepancy = form.getField({
            id : 'custpage_cwgp_totaldiscrepancy'
        });
        fldTotalDiscrepancy.defaultValue = inCounter;

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
            stOperator,
            stSubType,
            stStep,
            stMemo
        } = options;

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
        stSubTypeId = stSubType == 'standard' ? '1' : stSubType == 'backbar' ? '2' : '3';

        return {
            custpage_cwgp_subsidiary    : stSubsidiary,
            custpage_cwgp_pagemode      : stPageMode,
            custpage_cwgp_userid        : stUserId,
            custpage_cwgp_accesstype    : stAccessType,
            custpage_cwgp_htmlcss       : htmlCss(),
            custpage_cwgp_scanbtnhtml   : scanbhtml,
            custpage_cwgp_upccodemap    : stUpcMap,
            custpage_cwgp_date          : new Date(),
            custpage_cwgp_deliverbydate : addBusinessDays(new Date(),6),
            custpage_cwgp_customer      : stCustomer,
            custpage_cwgp_location      : stLocation,
            custpage_cwgp_rectype       : stType,
            custpage_cwgp_operator      : stOperator,
            custpage_cwgp_memomain      : stMemo,
            custpage_cwgp_adjustmentsubtype : stSubType,
            custpage_cwgp_step: stStep
        }
    };
    

    

    function addBusinessDays(d,n) {
        d = new Date(d.getTime());
        var day = d.getDay();
        d.setDate(d.getDate() + n + (day === 6 ? 2 : +!day) + (Math.floor((n - 1 + (day % 6 || 1)) / 5) * 2));
        return d;
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
    
        input#submitter, input#secondarysubmitter, input#custpage_back_calculatesummary, input#secondarycustpage_back_calculatesummary, input#custpage_franchisepo_items_addedit {
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
        div#custpage_inventoryadjustmentbackbar_itemstab_pane_hd {
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
        renderInventoryCountFinal,
    }
});
