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

 define(['N/ui/serverWidget', 'N/search', 'N/util','N/record', './HEYDAY_LIB_ExternalPortal'], (serverWidget, search, util,record, EPLib) => {
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
                CREATED_FROM: {
                    id: 'custpage_cwgp_createdfrom',
                    type: serverWidget.FieldType.TEXT,
                    label: 'Created From'
                }
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
            'inventoryadjustment': mapInventoryAdjustment
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
            const stViewLink = `<a href='${stUrl}'>Purchase Order# ${stTranId}</a>`;

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

        log.debug('mapItemReceipt')

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
                    search.createColumn({ name: 'periodname' })
                ]
        }).run().each(function (result) {
            fld.addSelectOption({
                value: result.id,
                text: result.getValue({ name: 'periodname' })
            });
            return true;
        });
    };

    const addOptionsVendorsBySubsidiary = (fld, stSubsidiary) => {
        fld.addSelectOption({
            value: '',
            text: ''
        });

        search.create({
            type: search.Type.VENDOR,
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

    const addOptionsItemBySubsidiary = (fld, stSubsidiary) => {
        fld.addSelectOption({
            value: '',
            text: ''
        });
        search.create({
            type: "item",
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
                    search.createColumn({ name: 'itemid' })
                ]
        }).run().each(function (result) {
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
                    search.createColumn({ name: 'amount' })
                ]
        }).run().each((result) => {
            const stMainLine = result.getValue({ name: 'mainline' });

            if (stMainLine == '*') {
                objPO.body.custpage_cwgp_vendor = result.getValue({ name: 'entity' });
                objPO.body.custpage_cwgp_memomain = result.getValue({ name: 'memomain' });
                objPO.body.custpage_cwgp_date = result.getValue({ name: 'trandate' });
                objPO.body.custpage_cwgp_subsidiary = result.getValue({ name: 'subsidiary' });
                objPO.body.custpage_cwgp_location = result.getValue({ name: 'location' });
            } else {
                objPO.item.push({
                    custpage_cwgp_item: result.getValue({ name: 'item' }),
                    custpage_cwgp_description: result.getValue({ name: 'memo' }),
                    custpage_cwgp_quantity: result.getValue({ name: 'quantity' }),
                    custpage_cwgp_rate: result.getValue({ name: 'rate' }),
                    custpage_cwgp_amount: result.getValue({ name: 'amount' }),
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
                    fieldId: 'description',
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
                custpage_cwgp_item: objItemReceipt.getSublistValue({
                    sublistId: 'item',
                    fieldId: 'description',
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
        objPO.body.custpage_cwgp_department = objInventoryAdjustment.getText('department');
        objPO.body.custpage_cwgp_businessline = objInventoryAdjustment.getText('class');
        objPO.body.custpage_cwgp_adjustmentlocation = objInventoryAdjustment.getText('adjlocation');

        const intLineCount = objInventoryAdjustment.getLineCount('inventory');

        for(var x = 0; x < intLineCount; x++){
            log.debug('qty on hand', parseInt(objInventoryAdjustment.getSublistValue({
                sublistId: 'inventory',
                fieldId: 'quantityonhand',
                line: x
            })));
            objPO.item.push({
                custpage_cwgp_item: objInventoryAdjustment.getSublistValue({
                    sublistId: 'inventory',
                    fieldId: 'description',
                    line: x
                }),
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
                })),
                custpage_cwgp_adjustqtyby: parseInt(objInventoryAdjustment.getSublistValue({
                    sublistId: 'inventory',
                    fieldId: 'adjustqtyby',
                    line: x
                })),
                custpage_cwgp_newquantity: parseInt(objInventoryAdjustment.getSublistValue({
                    sublistId: 'inventory',
                    fieldId: 'newquantity',
                    line: x
                })),
                custpage_cwgp_department: objInventoryAdjustment.getSublistValue({
                    sublistId: 'inventory',
                    fieldId: 'department',
                    line: x
                }),
                custpage_cwgp_businessline: objInventoryAdjustment.getSublistValue({
                    sublistId: 'inventory',
                    fieldId: 'class',
                    line: x
                })
            });
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

    return {
        mapValues,
        addOptionsVendorsBySubsidiary,
        addOptionsItemBySubsidiary,
        addOptionsLocationBySubsidiary,
        addOptionsUnits,
        addOptionsBusinessLine,
        addOptionsPostingPeriod,
        addOptionsDepartmentBySubsidiary,
        addOptionsAccountsBySubsidiary,
        mapPOValues,
        mapItemReceiptValues,
        mapPOtoItemReceiptValues,
        mapInventoryAdjustmentValues,
        setSublistValues
    }
});
