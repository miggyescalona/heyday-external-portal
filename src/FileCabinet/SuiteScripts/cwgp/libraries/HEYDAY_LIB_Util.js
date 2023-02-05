/**
 * Author: Patricia Naguit
 * Date: 2022-10-22
 *
 * Date         Modified By            Notes
 * 2022-10-22   Patricia Naguit        Initial File Creation
 */

/**
 * @NApiVersion 2.1
 * @NModuleScope Public
 */

define(['N/ui/serverWidget', 'N/search', 'N/util','N/record', 'N/url', './HEYDAY_LIB_ExternalPortal'], (serverWidget, search, util,record, url, EPLib) => {
    const _CONFIG = {
        COLUMN: {
            LIST: {
                TRAN_NO: {
                    id: 'custpage_cwgp_tranid',
                    type: serverWidget.FieldType.TEXT,
                    label: 'Transaction No'
                },
                DATE: {
                    id: 'custpage_cwgp_trandate',
                    type: serverWidget.FieldType.TEXT,
                    label: 'Date'
                },
                STATUS: {
                    id: 'custpage_cwgp_trandstatus',
                    type: serverWidget.FieldType.TEXT,
                    label: 'Status'
                },
                CREATED_FROM: {
                    id: 'custpage_cwgp_createdfrom',
                    type: serverWidget.FieldType.TEXT,
                    label: 'Created From'
                },
                NAME: {
                    id: 'custpage_cwgp_name',
                    type: serverWidget.FieldType.TEXT,
                    label: 'Item Name'
                },
                LOCATION: {
                    id: 'custpage_cwgp_location',
                    type: serverWidget.FieldType.TEXT,
                    label:  'Location'
                },
                AVAILABLE: {
                    id: 'custpage_cwgp_available',
                    type: serverWidget.FieldType.TEXT,
                    label: 'Available'
                },
                ON_HAND: {
                    id: 'custpage_cwgp_onhand',
                    type: serverWidget.FieldType.TEXT,
                    label: 'On Hand'
                },
                COMMITTED: {
                    id: 'custpage_cwgp_committed',
                    type: serverWidget.FieldType.TEXT,
                    label: 'Committed'
                },
            }
        },
        SCRIPT:{
            ID: 'customscript_cwgp_sl_retailpages',
            DEPLOY: 'customdeploy_cwgp_sl_retailpages'
        }
    };
    
    const mapValues = (options) => {
        const {
            stType, 
            stAccessType, 
            stUserId,
            arrPagedData
        } = options;

        const MAP_VALUES = {
            'intercompanypo': mapIntercompanyPO,
            'itemreceipt': mapItemReceipt,
            'inventoryadjustment': mapInventoryAdjustment,
            'itemperlocation': mapItemPerLocation
        };
        const mapValues = MAP_VALUES[stType];

        return mapValues(stUserId, stAccessType, arrPagedData);
    };

    const mapIntercompanyPO = (stUserId, stAccessType, arrPagedData) => {
        let arrMapIntercompanyPO = [];

        const objRetailUrl = EPLib._CONFIG.RETAIL_PAGE[EPLib._CONFIG.ENVIRONMENT]

        let stBaseUrl = url.resolveScript({
            deploymentId        : objRetailUrl.DEPLOY_ID,
            scriptId            : objRetailUrl.SCRIPT_ID,
            returnExternalUrl   : true
        });

        arrPagedData.forEach((result, index) => {
            const stDateCreated = result.getValue({ name: 'datecreated' });
            const stStatus = result.getText({ name: 'statusref' });
            const stTranId = result.getValue({ name: 'tranid' });
            const stID = result.id;
            const stUrl = `${stBaseUrl}&pageMode=view&&userId=${stUserId}&accesstype=${stAccessType}&poid=${stID}&rectype=intercompanypo&tranid=${stTranId}`;
            const stViewLink = `<a href='${stUrl}'>Replenishment Purchase Order# ${stTranId}</a>`;

            arrMapIntercompanyPO.push({
                [_CONFIG.COLUMN.LIST.TRAN_NO.id]: stViewLink,
                [_CONFIG.COLUMN.LIST.DATE.id]: stDateCreated,
                [_CONFIG.COLUMN.LIST.STATUS.id]: stStatus
            })
        });

        return arrMapIntercompanyPO;
    };

    const mapItemReceipt = (stUserId, stAccessType, arrPagedData) => {

        const objRetailUrl = EPLib._CONFIG.RETAIL_PAGE[EPLib._CONFIG.ENVIRONMENT]

        let stBaseUrl = url.resolveScript({
            deploymentId        : objRetailUrl.DEPLOY_ID,
            scriptId            : objRetailUrl.SCRIPT_ID,
            returnExternalUrl   : true
        });

        let arrMapItemReceipt= [];

        arrPagedData.forEach((result, index) => {
            const stDateCreated = result.getValue({ name: 'datecreated' });
            const stTranId = result.getValue({ name: 'tranid' });
            const stCreatedFrom = result.getText({ name: 'createdfrom' });
            const stID = result.id;
            const stUrl = `${stBaseUrl}&pageMode=view&&userId=${stUserId}&accesstype=${stAccessType}&itemreceiptid=${stID}&rectype=itemreceipt&tranid=${stTranId}`;
            const stViewLink = `<a href='${stUrl}'>Item Receipt# ${stTranId}</a>`;

            log.debug(stCreatedFrom);

            arrMapItemReceipt.push({
                [_CONFIG.COLUMN.LIST.TRAN_NO.id]: stViewLink,
                [_CONFIG.COLUMN.LIST.CREATED_FROM.id]: stCreatedFrom,
                [_CONFIG.COLUMN.LIST.DATE.id]: stDateCreated
            })
        });

        return arrMapItemReceipt;
    };

    const mapInventoryAdjustment = (stUserId, stAccessType, arrPagedData) => {
        
        const objRetailUrl = EPLib._CONFIG.RETAIL_PAGE[EPLib._CONFIG.ENVIRONMENT]

        let stBaseUrl = url.resolveScript({
            deploymentId        : objRetailUrl.DEPLOY_ID,
            scriptId            : objRetailUrl.SCRIPT_ID,
            returnExternalUrl   : true
        });


        let arrMapInventoryAdjustment= [];

        arrPagedData.forEach((result, index) => {
            const stDateCreated = result.getValue({ name: 'datecreated' });
            const stTranId = result.getValue({ name: 'tranid' });
            const stID = result.id;
            const stUrl = `${stBaseUrl}&pageMode=view&&userId=${stUserId}&accesstype=${stAccessType}&inventoryadjustmentid=${stID}&rectype=inventoryadjustment&tranid=${stTranId}`;
            const stViewLink = `<a href='${stUrl}'>Inventory Adjustment# ${stTranId}</a>`;

            arrMapInventoryAdjustment.push({
                [_CONFIG.COLUMN.LIST.TRAN_NO.id]: stViewLink,
                [_CONFIG.COLUMN.LIST.DATE.id]: stDateCreated
            })
        });

        return arrMapInventoryAdjustment;
    };

    const mapItemPerLocation = (stUserId, stAccessType, arrPagedData) => {

        let arrMapItemperLocation= [];

        arrPagedData.forEach((result, index) => {
            const stItemName = result.getValue({ name: 'itemid' });
            const stLocation = result.getText({ name: 'inventorylocation' });
            const stAvailable = result.getValue({ name: 'locationquantityavailable' });
            const stOnHand = result.getValue({ name: 'locationquantityonhand' });
            const stCommitted = result.getValue({ name: 'locationquantitycommitted' });
          
            arrMapItemperLocation.push({
                [_CONFIG.COLUMN.LIST.NAME.id]: stItemName,
                [_CONFIG.COLUMN.LIST.LOCATION.id]: stLocation,
                [_CONFIG.COLUMN.LIST.AVAILABLE.id]: stAvailable,
                [_CONFIG.COLUMN.LIST.ON_HAND.id]: stOnHand,
                [_CONFIG.COLUMN.LIST.COMMITTED.id]: stCommitted
            })
        });

        return arrMapItemperLocation;
    };


    

    const addOptionsUnits = (fld) => {
        fld.addSelectOption({
            value: '2',
            text: 'Ea'
        });

        fld.addSelectOption({
            value: '2',
            text: ''
        });

        fld.addSelectOption({
            value: '2',
            text: ''
        });

        return true;
    };

    const addOptionsBusinessLine = (fld) => {
        fld.addSelectOption({
            value: '',
            text: ''
        });
        search.create({
            type: "classification",
            filters:
                [
                ],
            columns:
                [
                    search.createColumn({ name: 'name' })
                ]
        }).run().each(function (result) {
            fld.addSelectOption({
                value: result.id,
                text: result.getValue({ name: 'name' })
            });
            return true;
        });
    };

    const addOptionsPostingPeriod= (fld) => {
        fld.addSelectOption({
            value: '',
            text: ''
        });
        search.create({
            type: "accountingperiod",
            filters:
            [
                search.createFilter({
                    name: 'isquarter',
                    operator: search.Operator.IS,
                    values: false
                }),
                search.createFilter({
                    name: 'isyear',
                    operator: search.Operator.IS,
                    values: false
                }),
                search.createFilter({
                    name: 'closed',
                    operator: search.Operator.IS,
                    values: false
                })
            ],
            columns:
                [
                    search.createColumn({ name: 'periodname' }),
                    search.createColumn({
                        name: "internalid",
                        sort: search.Sort.ASC,
                        label: "Internal ID"
                     })
                ]
        }).run().each(function (result) {
            fld.addSelectOption({
                value: result.id,
                text: result.getValue({ name: 'periodname' })
            });
            return true;
        });
    };

    const addOptionsAdjusmentReason= (fld) => {
        fld.addSelectOption({
            value: '',
            text: ''
        });
        search.create({
            type: "customlist_cwgp_adjustmentreason",
            filters:
                [
                ],
            columns:
                [
                    search.createColumn({ name: 'name' })
                ]
        }).run().each(function (result) {
            fld.addSelectOption({
                value: result.id,
                text: result.getValue({ name: 'name' })
            });
            return true;
        });
    };

    const addOptionsVendorsBySubsidiary = (fld, stSubsidiary) => {
        log.debug('addOptionsVendorsBySubsidiary', JSON.stringify({
            'fld': fld,
            'stSubsidiary': stSubsidiary
        }));
        fld.addSelectOption({
            value: '',
            text: ''
        });

        search.create({
            type: search.Type.VENDOR,
            filters:
                [
                    search.createFilter({
                        name: 'internalid',
                        operator: search.Operator.ANYOF,
                        values: '19082'
                    })
                ],
            columns:
                [
                    search.createColumn({ name: 'entityid' })
                ]
        }).run().each((result) => {
            fld.addSelectOption({
                value: result.id,
                text: result.getValue({ name: 'entityid' })
            });

            return true;
        });
    };

    const addOptionsItemBySubsidiary = (options) => {   

        const {
            fld, 
            objResultSet
        } = options
        fld.addSelectOption({
            value: '',
            text: ''
        });

        log.debug('objResultSet', objResultSet)

        objResultSet.each(function (result) {
            fld.addSelectOption({
                value: result.id,
                text: result.getValue({ name: 'itemid' })
            });
            return true;
        });
    };

    const addOptionsLocationBySubsidiary = (fld, stSubsidiary) => {
        fld.addSelectOption({
            value: '',
            text: ''
        });

        search.create({
            type: search.Type.LOCATION,
            filters:
                [
                    search.createFilter({
                        name: 'subsidiary',
                        operator: search.Operator.ANYOF,
                        values: stSubsidiary
                    })
                ],
            columns:
                [
                    search.createColumn({ name: 'name' })
                ]
        }).run().each((result) => {
            fld.addSelectOption({
                value: result.id,
                text: result.getValue({ name: 'name' })
            });

            return true;
        });

    };

    const addOptionsDepartmentBySubsidiary = (fld, stSubsidiary) => {
        fld.addSelectOption({
            value: '',
            text: ''
        });

        search.create({
            type: search.Type.DEPARTMENT,
            filters:
                [
                    search.createFilter({
                        name: 'subsidiary',
                        operator: search.Operator.ANYOF,
                        values: stSubsidiary
                    }),
                    search.createFilter({
                        name: 'isinactive',
                        operator: search.Operator.IS,
                        values: false
                    }),
                ],
            columns:
                [
                    search.createColumn({ name: 'name' })
                ]
        }).run().each((result) => {
            fld.addSelectOption({
                value: result.id,
                text: result.getValue({ name: 'name' })
            });

            return true;
        });

    };

    const addOptionsAccountsBySubsidiary= (fld, stSubsidiary) => {
        fld.addSelectOption({
            value: '',
            text: ''
        });

        search.create({
            type: search.Type.ACCOUNT,
            filters:
                [
                    search.createFilter({
                        name: 'subsidiary',
                        operator: search.Operator.ANYOF,
                        values: stSubsidiary
                    }),
                ],
            columns:
                [
                    search.createColumn({ name: 'displayname' })
                ]
        }).run().each((result) => {
            fld.addSelectOption({
                value: result.id,
                text: result.getValue({ name: 'displayname' })
            });

            return true;
        });

    };

    const mapPOValues = (stPoId) => {
        let objPO = {
            body: {},
            item: []
        };

        search.create({
            type: search.Type.PURCHASE_ORDER,
            filters:
                [
                    search.createFilter({
                        name: 'internalid',
                        operator: search.Operator.ANYOF,
                        values: stPoId
                    })
                ],
            columns:
                [
                    search.createColumn({ name: 'mainline' }),
                    search.createColumn({ name: 'entity' }),
                    search.createColumn({ name: 'memomain' }),
                    search.createColumn({ name: 'trandate' }),
                    search.createColumn({ name: 'subsidiary' }),
                    search.createColumn({ name: 'location' }),
                    search.createColumn({ name: 'item' }),
                    search.createColumn({ name: 'memo' }),
                    search.createColumn({ name: 'quantity' }),
                    search.createColumn({ name: 'rate' }),
                    search.createColumn({ name: 'amount' }),
                    search.createColumn({ name: 'approvalstatus' }),
                    search.createColumn({ name: 'custitem_heyday_sku', join: 'item' }),
                    search.createColumn({ name: 'custitemheyday_upccode', join: 'item' })
                ]
        }).run().each((result) => {
            const stMainLine = result.getValue({ name: 'mainline' });

            if (stMainLine == '*') {
                objPO.body.custpage_cwgp_vendor = result.getValue({ name: 'entity' });
                objPO.body.custpage_cwgp_memomain = result.getValue({ name: 'memomain' });
                objPO.body.custpage_cwgp_date = result.getValue({ name: 'trandate' });
                objPO.body.custpage_cwgp_subsidiary = result.getValue({ name: 'subsidiary' });
                objPO.body.custpage_cwgp_location = result.getValue({ name: 'location' });
                objPO.body.custpage_cwgp_approvalstatus= result.getText({ name: 'approvalstatus' });
                objPO.body.custpage_cwgp_totalamount = result.getValue({ name: 'amount' });
            } else {
                objPO.item.push({
                    custpage_cwgp_item: result.getValue({ name: 'item' }),
                    custpage_cwgp_itemid: result.getValue({ name: 'item' }),
                    custpage_cwgp_description: result.getValue({ name: 'memo' }),
                    custpage_cwgp_quantity: result.getValue({ name: 'quantity' }),
                    custpage_cwgp_rate: result.getValue({ name: 'rate' }),
                    custpage_cwgp_amount: result.getValue({ name: 'amount' }),
                    custpage_cwgp_internalsku: result.getValue({ name: 'custitem_heyday_sku', join: 'item' }),
                    custpage_cwgp_upccode: result.getValue({ name: 'custitemheyday_upccode', join: 'item' }),
                });
            }

            return true;
        });

        return objPO;
    };

    const mapItemReceiptValues = (stPoId) => {
        let objPO = {
            body: {},
            item: []
        };

        const objItemReceipt = record.load({
            type: 'itemreceipt',
            id: stPoId,
            isDynamic: true
        });

        objPO.body.custpage_cwgp_vendor = objItemReceipt.getText('entity');
        objPO.body.custpage_cwgp_memomain = objItemReceipt.getValue('memo');
        objPO.body.custpage_cwgp_date = objItemReceipt.getValue('trandate');
        objPO.body.custpage_cwgp_subsidiary = objItemReceipt.getValue('subsidiary');
        objPO.body.custpage_cwgp_createdfrom = objItemReceipt.getText('createdfrom');
        objPO.body.custpage_cwgp_damagediaid = objItemReceipt.getValue('custbody_cwgp_damagediaid');

        const intLineCount = objItemReceipt.getLineCount('item');

        for(var x = 0; x < intLineCount; x++){
            objPO.item.push({
                custpage_cwgp_itemid: objItemReceipt.getSublistValue({
                    sublistId: 'item',
                    fieldId: 'item',
                    line: x
                }),
                custpage_cwgp_item: objItemReceipt.getSublistValue({
                    sublistId: 'item',
                    fieldId: 'sitemname',
                    line: x
                }),
                custpage_cwgp_description: objItemReceipt.getSublistValue({
                    sublistId: 'item',
                    fieldId: 'description',
                    line: x
                }),
                custpage_cwgp_transferlocation: objItemReceipt.getSublistValue({
                    sublistId: 'item',
                    fieldId: 'location',
                    line: x
                }),
                custpage_cwgp_businessline: objItemReceipt.getSublistValue({
                    sublistId: 'item',
                    fieldId: 'class',
                    line: x
                }),  
                custpage_cwgp_transferlocationtext: objItemReceipt.getSublistText({
                    sublistId: 'item',
                    fieldId: 'location',
                    line: x
                }),
                custpage_cwgp_businesslinetext: objItemReceipt.getSublistText({
                    sublistId: 'item',
                    fieldId: 'class',
                    line: x
                }),
                custpage_cwgp_quantityremaining: parseInt(objItemReceipt.getSublistValue({
                    sublistId: 'item',
                    fieldId: 'quantityremaining',
                    line: x
                })),
                custpage_cwgp_quantity: parseInt(objItemReceipt.getSublistValue({
                    sublistId: 'item',
                    fieldId: 'quantity',
                    line: x
                })),
                custpage_cwgp_rate: objItemReceipt.getSublistValue({
                    sublistId: 'item',
                    fieldId: 'rate',
                    line: x
                }),
                custpage_cwgp_internalsku: objItemReceipt.getSublistValue({
                    sublistId: 'item',
                    fieldId: 'custcol_cwgp_hiddeninternalsku',
                    line: x
                }),
                custpage_cwgp_upccode: objItemReceipt.getSublistValue({
                    sublistId: 'item',
                    fieldId: 'custcol_cwgp_hiddenupccode',
                    line: x
                })
            });
        }

        return objPO;
    };

    const mapPOtoItemReceiptValues = (stPoId) => {
        let objPO = {
            body: {},
            item: []
        };

        const objItemReceipt = record.transform({
            fromType: 'purchaseorder',
            fromId: stPoId,
            toType: 'itemreceipt',
        });

        objPO.body.custpage_cwgp_vendor = objItemReceipt.getText('entity');
        objPO.body.custpage_cwgp_memomain = objItemReceipt.getValue('memo');
        objPO.body.custpage_cwgp_date = objItemReceipt.getValue('trandate');
        objPO.body.custpage_cwgp_subsidiary = objItemReceipt.getValue('subsidiary');
        objPO.body.custpage_cwgp_createdfrom = objItemReceipt.getText('createdfrom');

        const intLineCount = objItemReceipt.getLineCount('item');

        for(var x = 0; x < intLineCount; x++){
            objPO.item.push({
                custpage_cwgp_itemid: objItemReceipt.getSublistValue({
                    sublistId: 'item',
                    fieldId: 'item',
                    line: x
                }),
                custpage_cwgp_item: objItemReceipt.getSublistValue({
                    sublistId: 'item',
                    fieldId: 'sitemname',
                    line: x
                }),
                custpage_cwgp_description: objItemReceipt.getSublistValue({
                    sublistId: 'item',
                    fieldId: 'description',
                    line: x
                }),
                custpage_cwgp_transferlocation: objItemReceipt.getSublistValue({
                    sublistId: 'item',
                    fieldId: 'location',
                    line: x
                }),
                custpage_cwgp_businessline: objItemReceipt.getSublistValue({
                    sublistId: 'item',
                    fieldId: 'class',
                    line: x
                }),
                custpage_cwgp_quantityremaining: parseInt(objItemReceipt.getSublistValue({
                    sublistId: 'item',
                    fieldId: 'quantityremaining',
                    line: x
                })),
                custpage_cwgp_quantity: parseInt(objItemReceipt.getSublistValue({
                    sublistId: 'item',
                    fieldId: 'quantity',
                    line: x
                })),
                custpage_cwgp_rate: objItemReceipt.getSublistValue({
                    sublistId: 'item',
                    fieldId: 'rate',
                    line: x
                })
            });
        }

        return objPO;
    };

    const mapInventoryAdjustmentValues = (stPoId) => {
        let objPO = {
            body: {},
            item: []
        };

        const objInventoryAdjustment = record.load({
            type: 'inventoryadjustment',
            id: stPoId,
            isDynamic: true
        });

        objPO.body.custpage_cwgp_adjustmentaccount = objInventoryAdjustment.getText('account');
        objPO.body.custpage_cwgp_date = objInventoryAdjustment.getText('trandate');
        objPO.body.custpage_cwgp_postingperiod = objInventoryAdjustment.getText('postingperiod');
        objPO.body.custpage_cwgp_memomain = objInventoryAdjustment.getValue('memo');
        objPO.body.custpage_cwgp_subsidiary = objInventoryAdjustment.getText('subsidiary');
        objPO.body.custpage_cwgp_businessline = objInventoryAdjustment.getText('class');
        objPO.body.custpage_cwgp_adjustmentlocation = objInventoryAdjustment.getText('adjlocation');

        const intLineCount = objInventoryAdjustment.getLineCount('inventory');

        for(var x = 0; x < intLineCount; x++){
            objPO.item.push({
                custpage_cwgp_inventoryadjustment: 'IA# '+ objInventoryAdjustment.getText('tranid'),
                custpage_cwgp_item: objInventoryAdjustment.getSublistValue({
                    sublistId: 'inventory',
                    fieldId: 'item_display',
                    line: x
                }),
                custpage_cwgp_internalsku: lookUpItem(objInventoryAdjustment.getSublistValue({
                    sublistId: 'inventory',
                    fieldId: 'item',
                    line: x
                }), 'sku'),
                custpage_cwgp_upccode: lookUpItem(objInventoryAdjustment.getSublistValue({
                    sublistId: 'inventory',
                    fieldId: 'item',
                    line: x
                }), 'upc'),
                custpage_cwgp_description: objInventoryAdjustment.getSublistValue({
                    sublistId: 'inventory',
                    fieldId: 'description',
                    line: x
                }),
                custpage_cwgp_location: objInventoryAdjustment.getSublistText({
                    sublistId: 'inventory',
                    fieldId: 'location',
                    line: x
                }),
                custpage_cwgp_units: objInventoryAdjustment.getSublistValue({
                    sublistId: 'inventory',
                    fieldId: 'units_display',
                    line: x
                }),  
                custpage_cwgp_qtyonhand: parseInt(objInventoryAdjustment.getSublistValue({
                    sublistId: 'inventory',
                    fieldId: 'quantityonhand',
                    line: x
                })) || '0',
                custpage_cwgp_adjustqtyby: parseInt(objInventoryAdjustment.getSublistValue({
                    sublistId: 'inventory',
                    fieldId: 'adjustqtyby',
                    line: x
                })) || 0,
                custpage_cwgp_newquantity: parseInt(objInventoryAdjustment.getSublistValue({
                    sublistId: 'inventory',
                    fieldId: 'newquantity',
                    line: x
                })) || 0.00,
                custpage_cwgp_estimatedunitcost: objInventoryAdjustment.getSublistValue({
                    sublistId: 'inventory',
                    fieldId: 'unitcost',
                    line: x
                }) || '0.00',
                custpage_cwgp_businessline: objInventoryAdjustment.getSublistText({
                    sublistId: 'inventory',
                    fieldId: 'class',
                    line: x
                }),
                custpage_cwgp_adjustmentreason: objInventoryAdjustment.getSublistText({
                    sublistId: 'inventory',
                    fieldId: 'custcol_cwgp_adjustmentreason',
                    line: x
                }),
            });
        }

        function lookUpItem(itemId, type){
            if(itemId){
                let fieldLookUp = search.lookupFields({
                    type: search.Type.ITEM,
                    id: itemId,
                    columns: ['custitem_heyday_sku','custitemheyday_upccode']
                });
                
                if(type == 'sku'){
                    return fieldLookUp.custitem_heyday_sku;
                }
                else if(type == 'upc'){
                    return fieldLookUp.custitemheyday_upccode;
                }
            }
        }
        return objPO;
    }

    const setSublistValues = (sbl, objPO) => {
        const arrListValues = objPO.item;
        log.debug('arrListValues', arrListValues);

        arrListValues.forEach((objItem, i) => {
            util.each(objItem, function (value, fieldId) {
                sbl.setSublistValue({
                    id: fieldId,
                    line: i,
                    value: value || ' '
                });
            });
        });
    };

    const getPOValues = (stPoId) => {
        let stApprovalStatus;
        let stPairedInterco;
        let stPairedIntercoStatus = null;
        let objPO ={};

        search.create({
            type: search.Type.PURCHASE_ORDER,
            filters:
                [
                    search.createFilter({
                        name: 'internalid',
                        operator: search.Operator.ANYOF,
                        values: stPoId
                    }),
                    search.createFilter({
                        name: 'mainline',
                        operator: search.Operator.IS,
                        values: "T"
                    }),
                ],
            columns:
                [
                    search.createColumn({ name: 'approvalstatus' }),
                    search.createColumn({ name: 'intercotransaction' }),
                ]
        }).run().each((result) => {
            stApprovalStatus = result.getText({ name: 'approvalstatus' });
            stPairedInterco = result.getValue({ name: 'intercotransaction' });
            return true;
        });

        log.debug('search results', JSON.stringify({
            'stApprovalStatus': stApprovalStatus,
            'stPairedInterco': stPairedInterco
        }));

        if(stPairedInterco){
            stPairedIntercoStatus = search.lookupFields({
                type: search.Type.SALES_ORDER,
                id: stPairedInterco,
                columns: ['statusref']
            });

            stPairedIntercoStatus = stPairedIntercoStatus.statusref[0].value
            log.debug('stPairedIntercoStatus',stPairedIntercoStatus);
        }

        objPO.stApprovalStatus = stApprovalStatus;
        objPO.stPairedIntercoStatus = stPairedIntercoStatus;

        return objPO;
    };
    

    return {
        mapValues,
        addOptionsVendorsBySubsidiary,
        addOptionsItemBySubsidiary,
        addOptionsLocationBySubsidiary,
        addOptionsUnits,
        addOptionsBusinessLine,
        addOptionsPostingPeriod,
        addOptionsAdjusmentReason,
        addOptionsDepartmentBySubsidiary,
        addOptionsAccountsBySubsidiary,
        mapPOValues,
        mapItemReceiptValues,
        mapPOtoItemReceiptValues,
        mapInventoryAdjustmentValues,
        setSublistValues,
        getPOValues
    }
});