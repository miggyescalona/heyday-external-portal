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

define(['N/ui/serverWidget', 'N/search', './HEYDAY_LIB_Util.js'], (serverWidget, search, utilLib) => {
    let _CONFIG = {
        PARAMETER: {
            PAGE: 'custparam_cwgp_page'
        },
        TITLE: {
        	franchisepo: 'Purchase Order',
            itemreceipt: 'Item Receipt',
            inventoryadjustment: 'Inventory Adjustment',
            inventoryadjustment_standard: 'Inventory Adjustment',
            inventoryadjustment_backbar: 'Backbar Usage',
            inventoryadjustment_damagetestertheft: 'Damage/Tester/Theft',
            inventorycount: 'Inventory Count #'
        },
        TAB: {
        	franchisepo: 'custpage_interpo_itemstab',
            itemreceipt: 'custpage_itemreceipt_itemstab',
            inventoryadjustment: 'custpage_inventoryadjustment_itemstab',
            inventoryadjustment_standard: 'custpage_inventoryadjustment_itemstab',
            inventoryadjustment_damaged: 'custpage_inventoryadjustmentdamaged_itemstab',
            inventoryadjustment_backbar: 'custpage_inventoryadjustmentbackbar_itemstab',
            inventoryadjustment_damagetestertheft: 'custpage_inventoryadjustmentdamagetestertheft_itemstab',
            inventoryadjustment_variance: 'custpage_inventoryadjustmentvariance_itemstab',
            inventorycount: 'custpage_inventoryadjustmentinventorycount_itemstab',
            
        		
        },
        SUBLIST: {
        	franchisepo: 'custpage_interpo_items',
            itemreceipt: 'custpage_itemreceipt_items',
            inventoryadjustment: 'custpage_inventoryadjustment_items',
            inventoryadjustment_damaged: 'custpage_inventorayadjustmentdamaged_items',
            inventoryadjustment_standard: 'custpage_inventorayadjustment_items',
            inventoryadjustment_backbar: 'custpage_inventorayadjustmentbackbar_items',
            inventoryadjustment_damagetestertheft: 'custpage_inventorayadjustmentdamagetestertheft_items',
            inventoryadjustment_variance: 'custpage_inventoryadjustmentvariance_items',
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
                    label: 'pageMode',
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
                    displayType: 'inline'
                },
                DELIVERY_BY_DATE: {
                    id: 'custpage_cwgp_deliverbydate',
                    type: serverWidget.FieldType.DATE,
                    label: 'Deliver by Date',
                    container: 'PRIMARY',
                    displayType: 'inline'
                },
                MEMO: {
                    id: 'custpage_cwgp_memomain',
                    type: serverWidget.FieldType.TEXT,
                    label: 'Memo',
                    container: 'PRIMARY',
                    displayType: 'inline',
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
                    source: 'location',
                    container: 'CLASS',
                    displayType: 'inline'
                },
                DAMAGED_INVENTORY_ID:{
                    id: 'custpage_cwgp_damagediaid',
                    type: serverWidget.FieldType.TEXT,
                    label: 'Damaged Inventory Adjustment',
                    container: 'CLASS',
                    displayType: 'hidden'
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
                ADJUSTMENT_TYPE: {
                    id: 'custpage_cwgp_adjustmenttype',
                    type: serverWidget.FieldType.TEXT,
                    label: 'Adjustment Type',
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
                    displayType: 'inline'
                }
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
                ADJUSTMENT_TYPE: {
                    id: 'custpage_cwgp_adjustmenttype',
                    type: serverWidget.FieldType.TEXT,
                    label: 'Adjustment Type',
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
                },
                TOTAL_DISCREPANCY: {
                    id: 'custpage_cwgp_totaldiscrepancy',
                    type: serverWidget.FieldType.INTEGER,
                    label: 'Total No. of Items with Discrepancy',
                    container: 'DISCREPANCY',
                    displayType: 'inline',
                    isHidden: ['1']
                },
                /*TOTAL_DISCREPANCY_HTML: {
                    id: 'custpage_cwgp_totaladjustment',
                    type: serverWidget.FieldType.TEXTAREA,
                    label: ' ',
                    container: 'TOTAL_DISCREPANCY',
                    displayType:'inline'
                },*/
            },
        },
        COLUMN: {
            ITEMS: {
                franchisepo:{
                    ITEM: {
                        id: 'custpage_cwgp_item',
                        type: serverWidget.FieldType.SELECT,
                        label: 'Items',
                        displayType: 'inline',
                        //source: 'item',
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
                        label: 'Rate'
                    },
                    AMOUNT: {
                        id: 'custpage_cwgp_amount',
                        type: serverWidget.FieldType.FLOAT,
                        label: 'Amount'
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
                    },*/
                    LINE: {
                        id: 'custpage_cwgp_line',
                        type: serverWidget.FieldType.INTEGER,
                        label: 'Line',
                        displayType: 'hidden'
                    }
                },
                inventoryadjustment_standard: {
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
                        label: 'Internal SKU'
                    },
                    UPC_CODE: {
                        id: 'custpage_cwgp_upccode',
                        type: serverWidget.FieldType.TEXT,
                        label: 'UPC Code'
                    },
                    UNITS: {
                        id: 'custpage_cwgp_units',
                        type: serverWidget.FieldType.TEXT,
                        label: 'Units',
                        displayType: 'hidden'
                    },
                    ADJUST_QUANTITY_BY: {
                        id: 'custpage_cwgp_adjustqtyby',
                        type: serverWidget.FieldType.TEXT,
                        label: 'Adjust Inventory Quantity'
                    },
                    /*EW_QUANTITY: {
                        id: 'custpage_cwgp_newquantity',
                        type: serverWidget.FieldType.TEXT,
                        label: 'Final Quantity'
                    },*/
                    ADJUSTMENT_TYPE: {
                        id: 'custpage_cwgp_adjustmenttype',
                        type: serverWidget.FieldType.SELECT,
                        label: 'Adjustment Type',
                        displayType: 'inline'
                    },
                    ADJUSTMENT_REASON: {
                        id: 'custpage_cwgp_adjustmentreason',
                        type: serverWidget.FieldType.TEXTAREA,
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
                        id: 'custpage_cwgp_adjustqtyby',
                        type: serverWidget.FieldType.TEXT,
                        label: 'Damaged Quantity',
                    },
                },
                inventoryadjustment_backbar: {
                    ITEM: {
                        id: 'custpage_cwgp_item',
                        type: serverWidget.FieldType.SELECT,
                        label: 'Items',
                        displayType: 'inline',
                        source: 'item',
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
                    ADJUST_QUANTITY_BY: {
                        id: 'custpage_cwgp_adjustqtyby',
                        type: serverWidget.FieldType.INTEGER,
                        label: 'Quantity Removed'
                    },
                    ROOM_NUMBER: {
                        id: 'custpage_cwgp_roomnumber',
                        type: serverWidget.FieldType.TEXT,
                        label: 'Room # Assignment',
                    },
                    ST_ASSIGNMENT: {
                        id: 'custpage_cwgp_stassignment',
                        type: serverWidget.FieldType.TEXT,
                        label: 'St Assignment',
                    },
                    ADJUSTMENT_TYPE: {
                        id: 'custpage_cwgp_adjustmenttype',
                        type: serverWidget.FieldType.SELECT,
                        label: 'Adjustment Type',
                        displayType: 'inline'
                    },
                    ADJUSTMENT_REASON: {
                        id: 'custpage_cwgp_adjustmentreason',
                        type: serverWidget.FieldType.TEXTAREA,
                        label: 'Adjustment Reason',
                    }
                },
                inventoryadjustment_damagetestertheft: {
                    ITEM: {
                        id: 'custpage_cwgp_item',
                        type: serverWidget.FieldType.SELECT,
                        label: 'Items',
                        displayType: 'inline',
                        source: 'item',
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
                        displayType: 'hidden'
                    },
                    ADJUST_QUANTITY_BY: {
                        id: 'custpage_cwgp_adjustqtyby',
                        type: serverWidget.FieldType.INTEGER,
                        label: 'Quantity Removed'
                    },
                    ADJUSTMENT_TYPE: {
                        id: 'custpage_cwgp_adjustmenttype',
                        type: serverWidget.FieldType.SELECT,
                        label: 'Adjustment Type',
                        displayType: 'inline'
                    },
                    ADJUSTMENT_REASON: {
                        id: 'custpage_cwgp_adjustmentreason',
                        type: serverWidget.FieldType.TEXTAREA,
                        label: 'Adjustment Reason',
                    }
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
                },
                inventorycount: {
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
                        displayType: 'hidden'
                    },
                    UNITS: {
                        id: 'custpage_cwgp_units',
                        type: serverWidget.FieldType.TEXT,
                        label: 'Units',
                        displayType: 'hidden'
                    },
                    QTY_ON_HAND: {
                        id: 'custpage_cwgp_qtyonhand',
                        type: serverWidget.FieldType.TEXT,
                        label: 'Starting Quantity',
                    },
                    ADJUST_QUANTITY_BY: {
                        id: 'custpage_cwgp_enteredcount',
                        type: serverWidget.FieldType.TEXT,
                        label: 'Entered Quantity'
                    },
                    DISREPANCY: {
                        id: 'custpage_cwgp_discrepancy',
                        type: serverWidget.FieldType.TEXT,
                        label: 'Discrepancy'
                    },
                    FINAL_QTY: {
                        id: 'custpage_cwgp_icfinalqty',
                        type: serverWidget.FieldType.TEXT,
                        label: 'Final Quantity'
                    },
                    ADJUSTMENT_REASON: {
                        id: 'custpage_cwgp_adjustmentreason',
                        type: serverWidget.FieldType.TEXTAREA,
                        label: 'Adjustment Reason'
                    },
                    TOTAL_DISCREPANCY: {
                        id: 'custpage_cwgp_totaldiscrepancy',
                        type: serverWidget.FieldType.TEXT,
                        label: 'Total No. of Items with Discrepancy',
                        container: 'DISCREPANCY',
                        displayType: 'inline',
                        isHidden: ['1']
                    },
                },
            }
        },
        FIELD_GROUP: {
            franchisepo: {
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
            },
        },
        CLIENT_SCRIPT: '../franchise/HEYDAY_CS_ViewPage.js'
    }

    const render = (options) => {
        const {
            response,
            stType,
            stPageMode,
            stUserId,
            stPoId,
            stAccessType,
            stSubsidiary,
            stAction
        } = options;
        
        let objPO = utilLib.mapPOValues(stPoId);
        objPO.body.custpage_cwgp_pagemode = stPageMode;
        objPO.body.custpage_cwgp_userid = stUserId;
        objPO.body.custpage_cwgp_accesstype = stAccessType;
        objPO.body.custpage_cwgp_poid = stPoId;
        objPO.body.custpage_cwgp_htmlcss = htmlCss();

        const form = serverWidget.createForm({ title: _CONFIG.TITLE[stType] + ' #' + stPoId });
        form.clientScriptModulePath = _CONFIG.CLIENT_SCRIPT;

        log.debug('stAction', stAction);
        

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
        
        //get inventory items and map UPC codes for scanning
        let objItemResultSet = utilLib.getInvItemsBySubsidiary(stSubsidiary);
        let objUpcMap = {};
        objItemResultSet.each(function (result) {
            let strUpcCode = result.getValue({ name: 'custitemheyday_upccode' });
            if(strUpcCode){
                objUpcMap[strUpcCode] = result.id;
            }
            
            return true;
        });

        
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
            if (id == 'custpage_cwgp_item') {
                utilLib.addOptionsItemBySubsidiary({
                    fld: col,
                    objResultSet: objItemResultSet
                });
                //utilLib.addOptionsItemBySubsidiary(col, stSubsidiary);
            }
        });

        utilLib.setPOSublist(sbl, objPO);
        const stApprovalStatus = utilLib.getPOFieldValue(stPoId,'custbody_cwgp_franchiseapprovalstatus');
        if(stApprovalStatus != '3'){
	        form.addButton({
	            id: 'custpage_edit_btn',
	            label: 'Edit',
	            functionName: `toEdiTransaction(${stUserId}, ${stPoId}, ${stAccessType}, 'franchisepo')`
	        });
        }
        
        log.debug('stApprovalStatus', stApprovalStatus);
        if(stApprovalStatus == '2'){
        	form.addButton({
                id: 'custpage_approve_btn',
                label: 'Approve',
                functionName: `approveTransaction(${stUserId}, ${stPoId}, ${stAccessType}, 'franchisepo')`
            });
        }
        
        const isReceivable = utilLib.franchisePOReceivable(stPoId);
        if(isReceivable){
        	form.addButton({
                id: 'custpage_recieve_btn',
                label: 'Receive',
                functionName: `receiveTransaction(${stUserId}, ${stPoId}, ${stAccessType}, 'itemreceipt')`
            });
        }
        
        

        form.addButton({
            id: 'custpage_back_button',
            label: 'Back',
            functionName: `back(${stUserId}, ${stAccessType}, 'franchisepo')`
        });

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
            stTranId
        } = options;
        
        let objPO = utilLib.mapIRValuesViewEdit(stPoId);
        log.debug('objPO', objPO);
        objPO.body.custpage_cwgp_rectype = stType;
        objPO.body.custpage_cwgp_pagemode = stPageMode;
        objPO.body.custpage_cwgp_userid = stUserId;
        objPO.body.custpage_cwgp_accesstype = stAccessType
        objPO.body.custpage_cwgp_poid = 'Purchase Order #'+objPO.body.custpage_cwgp_poid ;
        objPO.body.custpage_cwgp_location = 230;
        objPO.body.custpage_cwgp_htmlcss = htmlCss();
        //log.debug('objPO', objPO);
        let stDamageIAid = objPO.body.custpage_cwgp_damagediaid;

        
        const form = serverWidget.createForm({ title: _CONFIG.TITLE[stType] + ' #' + stPoId });
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
            log.debug('objPO DAMAGED',objPO);
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
        log.debug('stPoId',stPoId)

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
            functionName: `toEdiTransaction(${stUserId}, ${stPoId}, ${stAccessType}, 'itemreceipt')`
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
            stTranId
        } = options;
        log.debug('stTranId',stTranId);
        let stSubType = search.lookupFields({type: 'customrecord_cwgp_franchiseinvadjustment',id:parseInt(stTranId), columns: 'custrecord_cwgp_fia_subtype'});
        log.debug('stSubType',stSubType);
        stSubType = stSubType.custrecord_cwgp_fia_subtype;
        
        if(!stSubType || stSubType == ''){
            stSubType = 'standard'
        }
        log.debug('before',stType+'_'+stSubType);
        //const form = serverWidget.createForm({ title: _CONFIG.TITLE[stType]+ ' #' +stTranId});
        const form = serverWidget.createForm({ title: _CONFIG.TITLE[stType+'_'+stSubType] + ' #' +stTranId});

        form.clientScriptModulePath = _CONFIG.CLIENT_SCRIPT;

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

        let stAdjustmentType = '';

        switch (stSubType) {
            case 'standard':
                stAdjustmentType = 'Standard';

                break;
            case 'backbar':
                stAdjustmentType = 'Backbar';
                break;
            case 'damagetestertheft':
                stAdjustmentType = 'Damage/Tester/Theft'
                break;
            default:
                stAdjustmentType = 'Standard'
        }

        let objPO = utilLib.mapInvAdjValues(stTranId);
        objPO.body.custpage_cwgp_pagemode = stPageMode;
        objPO.body.custpage_cwgp_userid = stUserId;
        objPO.body.custpage_cwgp_accesstype = stAccessType
        objPO.body.custpage_cwgp_rectype = stType;
        objPO.body.custpage_cwgp_htmlcss = htmlCss();
        objPO.body.custpage_cwgp_adjustmenttype = stAdjustmentType;
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
                container: _CONFIG.FIELD_GROUP[stType+'_'+stSubType][container]?.id
            });

            if (mandatory) {
                fld.isMandatory = true;
            }

            if (displayType) {
                fld.updateDisplayType({ displayType });
            }
            if (id == 'custpage_cwgp_itemsummary' && stSubType != 'damagetestertheft') {
                fld.updateDisplayType({ displayType:'hidden' });
            }
            

            if (objPO.body[fld.id] != 'undefined') {
                fld.defaultValue = objPO.body[fld.id]
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
            type: serverWidget.SublistType.LIST,
            tab: _CONFIG.TAB[stType+'_'+stSubType]
        });

        log.debug('stType', stType);
        const objItemCols = _CONFIG.COLUMN.ITEMS[stType+'_'+stSubType];
        log.debug('objItemCols', objItemCols);
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
            if(id == 'custpage_cwgp_adjustmenttype'){
                utilLib.addOptionsAdjusmentType(col);
            }
            /*if(id == 'custpage_cwgp_adjustmenttype'){
                utilLib.addOptionsAdjusmentReason(col);
            }*/
        });

        utilLib.setSublistValues(sbl, objPO);

        form.addButton({
            id: 'custpage_back_button',
            label: 'Back',
            functionName: `back(${stUserId}, ${stAccessType}, 'inventoryadjustment')`
        });


        response.writePage(form);

        
    };

    const renderInventoryCount = (options) => {
        log.debug('===VIEW===','===View Inventory Count ===');
        const {
            response,
            stType,
            stPageMode,
            stUserId,
            stPoId,
            stAccessType,
            stTranId,
        } = options;

        log.debug('stPoId',stPoId);
        const form = serverWidget.createForm({ title: _CONFIG.TITLE[stType]+stPoId });

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
        let objPO = utilLib.mapInvCountValues(stPoId);
        objPO.body.custpage_cwgp_pagemode = stPageMode;
        objPO.body.custpage_cwgp_userid = stUserId;
        objPO.body.custpage_cwgp_accesstype = stAccessType
        objPO.body.custpage_cwgp_htmlcss = htmlCss();
        objPO.body.custpage_cwgp_adjustmenttype = 'Inventory Recount';
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
            functionName: `back(${stUserId}, ${stAccessType}, 'inventorycount')`
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
    
        input#custpage_edit_btn, input#secondarycustpage_edit_btn {
            background-color: #105368 !important;
            color: white !important;
            font-family: 'Roboto Mono', monospace;
        }
        
        input#custpage_approve_btn, input#secondarycustpage_approve_btn {
            background-color: #105368 !important;
            color: white !important;
            font-family: 'Roboto Mono', monospace;
        }
        
        input#custpage_recieve_btn, input#secondarycustpage_recieve_btn {
            background-color: #105368 !important;
            color: white !important;
            font-family: 'Roboto Mono', monospace;
        }
    
        input#custpage_back_button, input#secondarycustpage_back_button {
            background-color: white !important;
            color: #105368 !important;
            font-family: 'Roboto Mono', monospace;
        }

        div#custpage_interpo_itemstab_pane_hd {
            background-color: #dbc8b6 !important;
        }
        
        div#custpage_itemreceipt_itemstab_pane_hd {
            background-color: #dbc8b6 !important;
        }

        div#custpage_inventoryadjustment_itemstab_pane_hd {
            background-color: #dbc8b6 !important;
        }
        div#custpage_inventoryadjustmentdamaged_itemstab_pane_hd {
            background-color: #dbc8b6 !important;
        }
        div#custpage_inventoryadjustmentvariance_itemstab_pane_hd {
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
        renderItemReceipt,
        renderInventoryAdjustment,
        renderInventoryCount
    }
});
