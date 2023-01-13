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

 define(['N/ui/serverWidget', 'N/search', 'N/util','N/record'], (serverWidget, search, util,record) => {
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
            'itemreceipt': mapItemReceipt
        };
        const mapValues = MAP_VALUES[stType];

        return mapValues(stUserId, stAccessType, arrPagedData);
    };

    const mapIntercompanyPO = (stUserId, stAccessType, arrPagedData) => {
        let arrMapIntercompanyPO = [];

        arrPagedData.forEach((result, index) => {
            const stDateCreated = result.getValue({ name: 'datecreated' });
            const stStatus = result.getText({ name: 'statusref' });
            const stTranId = result.getValue({ name: 'tranid' });
            const stID = result.id;
            const stUrl = `https://5530036-sb1.extforms.netsuite.com/app/site/hosting/scriptlet.nl?script=686&deploy=1&compid=5530036_SB1&h=b8a78be5c27a4d76e7a8&pageMode=view&&userId=${stUserId}&accesstype=${stAccessType}&poid=${stID}&rectype=intercompanypo&tranid=${stTranId}`;
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
        let arrMapItemReceipt= [];

        arrPagedData.forEach((result, index) => {
            const stDateCreated = result.getValue({ name: 'datecreated' });
            const stTranId = result.getValue({ name: 'tranid' });
            const stID = result.id;
            const stUrl = `https://5530036-sb1.extforms.netsuite.com/app/site/hosting/scriptlet.nl?script=686&deploy=1&compid=5530036_SB1&h=b8a78be5c27a4d76e7a8&pageMode=view&&userId=${stUserId}&accesstype=${stAccessType}&itemreceiptid=${stID}&rectype=itemreceipt&tranid=${stTranId}`;
            const stViewLink = `<a href='${stUrl}'>Item Receipt# ${stTranId}</a>`;

            arrMapItemReceipt.push({
                [_CONFIG.COLUMN.LIST.TRAN_NO.id]: stViewLink,
                [_CONFIG.COLUMN.LIST.DATE.id]: stDateCreated
            })
        });

        return arrMapItemReceipt;
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

    const setPOSublist = (sbl, objPO) => {
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
    
    const setItemReceiptSublist = (sbl, objPO) => {
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
        addOptionsBusinessLine,
        mapPOValues,
        mapItemReceiptValues,
        mapPOtoItemReceiptValues,
        setPOSublist,
        setItemReceiptSublist,
    }
});

