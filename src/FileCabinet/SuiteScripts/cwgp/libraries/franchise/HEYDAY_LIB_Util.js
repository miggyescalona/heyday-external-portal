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

define(['N/ui/serverWidget', 'N/search', 'N/util', 'N/record', 'N/url', 'N/format', '../HEYDAY_LIB_ExternalPortal'], (serverWidget, search, util, record, url, format, EPLib) => {
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
                CUSTOMER: {
                    id: 'custpage_cwgp_customer',
                    type: serverWidget.FieldType.TEXT,
                    label: 'Customer'
                },
                FOR_RECEiVING: {
                    id: 'custpage_cwgp_forreceiving',
                    type: serverWidget.FieldType.SELECT,
                    label: 'For Receiving'
                },
                TYPE: {
                    id: 'custpage_cwgp_type',
                    type: serverWidget.FieldType.TEXT,
                    label: 'Type'
                },
                OPERATOR: {
                    id: 'custpage_cwgp_operator',
                    type: serverWidget.FieldType.TEXT,
                    label: 'Operator'
                },
                NAME: {
                    id: 'custpage_cwgp_name',
                    type: serverWidget.FieldType.TEXT,
                    label: 'Item Name'
                },
                ON_HAND: {
                    id: 'custpage_cwgp_onhand',
                    type: serverWidget.FieldType.TEXT,
                    label: 'On Hand'
                },
                INTERNAL_SKU: {
                    id: 'custpage_cwgp_internalsku',
                    type: serverWidget.FieldType.TEXT,
                    label: 'Internal SKU',
                },
                UPC_CODE: {
                    id: 'custpage_cwgp_upccode',
                    type: serverWidget.FieldType.TEXT,
                    label: 'UPC Code',
                },
                QUANTITY_TESTER: {
                    id: 'custpage_cwgp_tester',
                    type: serverWidget.FieldType.TEXT,
                    label: 'Tester'
                },
                QUANTITY_BACKBAR: {
                    id: 'custpage_cwgp_backbar',
                    type: serverWidget.FieldType.TEXT,
                    label: 'Backbar'
                },
                QUANTITY_DAMAGE: {
                    id: 'custpage_cwgp_damage',
                    type: serverWidget.FieldType.TEXT,
                    label: 'Damage'
                },
                QUANTITY_THEFT: {
                    id: 'custpage_cwgp_theft',
                    type: serverWidget.FieldType.TEXT,
                    label: 'Sold'
                },
                QUANTITY_SOLD: {
                    id: 'custpage_cwgp_sold',
                    type: serverWidget.FieldType.TEXT,
                    label: 'Sold'
                },
                QUANTITY_DISCREPANCY: {
                    id: 'custpage_cwgp_discrepancy',
                    type: serverWidget.FieldType.TEXT,
                    label: 'Discrepancy'
                },
                RATE: {
                    id: 'custpage_cwgp_rate',
                    type: serverWidget.FieldType.CURRENCY,
                    label: 'Estimated Cost Per Unit',
                },
                TOTAL: {
                    id: 'custpage_cwgp_total',
                    type: serverWidget.FieldType.CURRENCY,
                    label: 'Total Estimated Value',
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
            arrPagedData,
            dtAsof,
            dtFrom,
            dtTo
        } = options;

        const MAP_VALUES = {
            'franchisepo': mapFranchisePO,
            'itemreceipt': mapItemReceipt,
            'inventoryadjustment': mapInventoryAdjustment,
            'itemperlocation': mapItemPerLocation,
            'inventorycount': mapInventoryCount
        };
        const mapValues = MAP_VALUES[stType];

        return mapValues(stUserId, stAccessType, arrPagedData,dtAsof,dtFrom,dtTo);
    };

    const mapFranchisePO = (stUserId, stAccessType, arrPagedData) => {
        let arrMapIntercompanyPO = [];

        const objFranchiseUrl = EPLib._CONFIG.FRANCHISE_PAGE[EPLib._CONFIG.ENVIRONMENT]

        let stBaseUrl = url.resolveScript({
            deploymentId        : objFranchiseUrl.DEPLOY_ID,
            scriptId            : objFranchiseUrl.SCRIPT_ID,
            returnExternalUrl   : true
        });
        
        arrPagedData.forEach((result, index) => {
            const stDateCreated = result.getValue({ name: 'datecreated' });
            const stStatus = result.getValue({ name: 'custbody_cwgp_franchiseapprovalstatus' });
            const stReceivable = result.getValue({ name: 'custbody_cwgp_canreceive' });
            const stOperator = result.getValue({ name: 'custbody_cwgp_externalportaloperator' });
            const stDocumentStatus = result.getValue({ name: 'statusref' });
            const stID = result.id;
            const stTranId = result.getValue({ name: 'tranid' });
            const stUrl = `${stBaseUrl}&pageMode=view&&userId=${stUserId}&accesstype=${stAccessType}&poid=${stID}&rectype=franchisepo`;
            const stViewLink = `<a href='${stUrl}'>Purchase Order # ${stID}</a>`;
            let arrForReceivingStatuses = ["pendingBilling","pendingBillingPartFulfilled","partiallyFulfilled"];
            let stForReceiving = 1;
            log.debug('stReceivable', stReceivable);
            if(stReceivable == true){
                stForReceiving = 2;
            }
            
            arrMapIntercompanyPO.push({
                [_CONFIG.COLUMN.LIST.TRAN_NO.id]: stViewLink,
                [_CONFIG.COLUMN.LIST.DATE.id]: stDateCreated,
                [_CONFIG.COLUMN.LIST.STATUS.id]: stStatus,
                [_CONFIG.COLUMN.LIST.FOR_RECEiVING.id]: stForReceiving,
                [_CONFIG.COLUMN.LIST.OPERATOR.id]: stOperator,
            })
        });
        return arrMapIntercompanyPO;
    };
    
    const mapItemReceipt = (stUserId, stAccessType, arrPagedData) => {
        
        const objFranchiseUrl = EPLib._CONFIG.FRANCHISE_PAGE[EPLib._CONFIG.ENVIRONMENT]

        let stBaseUrl = url.resolveScript({
            deploymentId        : objFranchiseUrl.DEPLOY_ID,
            scriptId            : objFranchiseUrl.SCRIPT_ID,
            returnExternalUrl   : true
        });

        let arrMapIntercompanyPO = [];
        arrPagedData.forEach((result, index) => {
            const stDate = result.getValue({ name: 'custrecord_cwgp_fr_date' });
            const stCustomer = result.getText({ name: 'custrecord_cwgp_fr_customer' });
            const stTranId = result.getValue({ name: 'tranid' });
            const stOperator = result.getValue({ name: 'custrecord_cwgp_fr_operator' });
            const stID = result.id;
            const stUrl =  `${stBaseUrl}&pageMode=view&&userId=${stUserId}&accesstype=${stAccessType}&poid=${stID}&rectype=itemreceipt`;
            const stViewLink = `<a href='${stUrl}'>Item Receipt# ${stID}</a>`;
            arrMapIntercompanyPO.push({
                [_CONFIG.COLUMN.LIST.TRAN_NO.id]: stViewLink,
                [_CONFIG.COLUMN.LIST.DATE.id]: stDate,
                [_CONFIG.COLUMN.LIST.CUSTOMER.id]: stCustomer,
                [_CONFIG.COLUMN.LIST.OPERATOR.id]: stOperator,
            })
        });
        return arrMapIntercompanyPO;
    };

    const mapInventoryAdjustment = (stUserId, stAccessType, arrPagedData) => {
        
        const objFranchiseUrl = EPLib._CONFIG.FRANCHISE_PAGE[EPLib._CONFIG.ENVIRONMENT]

        let stBaseUrl = url.resolveScript({
            deploymentId        : objFranchiseUrl.DEPLOY_ID,
            scriptId            : objFranchiseUrl.SCRIPT_ID,
            returnExternalUrl   : true
        });

        let arrMapIntercompanyPO = [];
        arrPagedData.forEach((result, index) => {
            const stDate = result.getValue({ name: 'custrecord_cwgp_fia_date' });
            const stCustomer = result.getText({ name: 'custrecord_cwgp_fia_customer' });
            const stTranId = result.getValue({ name: 'recordid' });
            const stID = result.id;
            const stUrl =  `${stBaseUrl}&pageMode=view&&userId=${stUserId}&accesstype=${stAccessType}&tranid=${stID}&rectype=inventoryadjustment`;
            const stViewLink = `<a href='${stUrl}'>Inventory Adjustment # ${stID}</a>`;
            const stSubtype = result.getValue({ name: 'custrecord_cwgp_fia_subtype' });
            const stOperator = result.getValue({ name: 'custrecord_cwgp_fia_operator' });
            let stType = '';
            switch (stSubtype) {
                case 'standard':
                    stType = 'Standard';
    
                    break;
                case 'backbar':
                    stType = 'Backbar';
                    break;
                case 'damagetestertheft':
                    stType = 'Damage/Tester/Theft'
                    break;
                default:
                    stType = 'Standard'
            }


            arrMapIntercompanyPO.push({
                [_CONFIG.COLUMN.LIST.TRAN_NO.id]: stViewLink,
                [_CONFIG.COLUMN.LIST.DATE.id]: stDate,
                [_CONFIG.COLUMN.LIST.CUSTOMER.id]: stCustomer,
                [_CONFIG.COLUMN.LIST.TYPE.id]: stType,
                [_CONFIG.COLUMN.LIST.OPERATOR.id]: stOperator
            })
        });
        return arrMapIntercompanyPO;
    };

    const mapInventoryCount = (stUserId, stAccessType, arrPagedData) => {
        
        const objFranchiseUrl = EPLib._CONFIG.FRANCHISE_PAGE[EPLib._CONFIG.ENVIRONMENT]

        let stBaseUrl = url.resolveScript({
            deploymentId        : objFranchiseUrl.DEPLOY_ID,
            scriptId            : objFranchiseUrl.SCRIPT_ID,
            returnExternalUrl   : true
        });


        let arrMapInventoryAdjustment= [];

        arrPagedData.forEach((result, index) => {
            const stDateCreated = result.getValue({ name: 'custrecord_cwgp_fia_date' });
            const stTranId = result.getValue({ name: 'tranid' });
            const stID = result.id;
            const stOperator = result.getValue({ name: 'custrecord_cwgp_fia_operator' });
            const stUrl = `${stBaseUrl}&pageMode=view&&userId=${stUserId}&accesstype=${stAccessType}&rectype=inventorycount&tranid=${stID}`;
            const stViewLink = `<a href='${stUrl}'>Inventory Adjustment # ${stID}</a>`;

            arrMapInventoryAdjustment.push({
                [_CONFIG.COLUMN.LIST.TRAN_NO.id]: stViewLink,
                [_CONFIG.COLUMN.LIST.DATE.id]: stDateCreated,
                [_CONFIG.COLUMN.LIST.OPERATOR.id]: stOperator
            })
        });

        return arrMapInventoryAdjustment;
    };

    const mapItemPerLocation = (stUserId, stAccessType, arrPagedData, dtAsof, dtFron, dtTo) => {

        let arrMapItemperLocation= [];
        let arrItemIdList = [];
        let arrItemNameList = [];
        let arrSkuList = [];
        let arrUpcList = [];
        let arrPriceList = [];
        const stCustomer = getCustomer(stUserId);
        arrPagedData.forEach((result, index) => {
            log.debug('result', result);
            const stItemName = result.getValue({ name: 'itemid'});
            const stSKU= result.getValue({ name: 'custitem_heyday_sku' });
            const stUPC= result.getValue({ name: 'custitemheyday_upccode' });
            const stPrice = result.getValue(result.columns[5]);
            arrItemIdList.push(result.id);
            arrItemNameList.push(stItemName);
            arrSkuList.push(stSKU);
            arrUpcList.push(stUPC);
            arrPriceList.push(stPrice);
            
            //log.debug('itemPerLocColumns', itemPerLocColumns);
            /*arrMapItemperLocation.push({
                [_CONFIG.COLUMN.LIST.NAME.id]: stItemName,
                [_CONFIG.COLUMN.LIST.INTERNAL_SKU.id]: stSKU,
                [_CONFIG.COLUMN.LIST.UPC_CODE.id]: stUPC,
                [_CONFIG.COLUMN.LIST.ON_HAND.id]: parseInt(itemPerLocColumns.onhand) || '0',
                [_CONFIG.COLUMN.LIST.QUANTITY_TESTER.id]: parseInt(itemPerLocColumns.tester) || '0',
                [_CONFIG.COLUMN.LIST.QUANTITY_BACKBAR.id]: parseInt(itemPerLocColumns.backbar) || '0',
                [_CONFIG.COLUMN.LIST.QUANTITY_DAMAGE.id]: parseInt(itemPerLocColumns.damage) || '0',
                [_CONFIG.COLUMN.LIST.QUANTITY_SOLD.id]: parseInt(itemPerLocColumns.sold) || '0',
                [_CONFIG.COLUMN.LIST.QUANTITY_THEFT.id]: parseInt(itemPerLocColumns.theft) || '0',
                [_CONFIG.COLUMN.LIST.QUANTITY_DISCREPANCY.id]: parseInt(itemPerLocColumns.discrepancy) || '0',
                //[_CONFIG.COLUMN.LIST.QUANTITY_SOLD.id]: parseInt(getQtyCashSaleTypeFranchise(result.id,stCustomer)) || '0',
                //[_CONFIG.COLUMN.LIST.LOCATION.id]: stLocation,
                //[_CONFIG.COLUMN.LIST.AVAILABLE.id]: stAvailable,
                //[_CONFIG.COLUMN.LIST.ON_HAND.id]: stOnHand,
                //[_CONFIG.COLUMN.LIST.COMMITTED.id]: stCommitted
            })*/
        });
        const itemPerLocColumns = getItemPerLocationColumns(arrItemIdList,stCustomer,dtAsof, dtFron, dtTo);
        for(var i =0; i<arrItemIdList.length; i++){

            let inOnhand = 0;
            let inDamage = 0;
            let inTester = 0;
            let inTheft = 0;
            let inBackbar = 0;
            let inSold = 0;
            let inDiscrepancy = 0;
            let flRate = arrPriceList[i];
            if(itemPerLocColumns.hasOwnProperty(arrItemIdList[i])){
                if(itemPerLocColumns[arrItemIdList[i]].hasOwnProperty('onhand')){
                    inOnhand = itemPerLocColumns[arrItemIdList[i]]['onhand'];
                }
                if(itemPerLocColumns[arrItemIdList[i]].hasOwnProperty('damage')){
                    inDamage = itemPerLocColumns[arrItemIdList[i]]['damage'];
                }
                if(itemPerLocColumns[arrItemIdList[i]].hasOwnProperty('tester')){
                    inTester = itemPerLocColumns[arrItemIdList[i]]['tester'];
                }
                if(itemPerLocColumns[arrItemIdList[i]].hasOwnProperty('theft')){
                    inTheft = itemPerLocColumns[arrItemIdList[i]]['theft'];
                }
                if(itemPerLocColumns[arrItemIdList[i]].hasOwnProperty('backbar')){
                    inBackbar = itemPerLocColumns[arrItemIdList[i]]['backbar'];
                }
                if(itemPerLocColumns[arrItemIdList[i]].hasOwnProperty('sold')){
                    inSold = itemPerLocColumns[arrItemIdList[i]]['sold'];
                }
                if(itemPerLocColumns[arrItemIdList[i]].hasOwnProperty('discrepancy')){
                    inDiscrepancy = itemPerLocColumns[arrItemIdList[i]]['discrepancy'];
                }

            }



            let flTotal = inOnhand * flRate;
            arrMapItemperLocation.push({
                [_CONFIG.COLUMN.LIST.NAME.id]: arrItemNameList[i],
                [_CONFIG.COLUMN.LIST.INTERNAL_SKU.id]: arrSkuList[i],
                [_CONFIG.COLUMN.LIST.UPC_CODE.id]: arrUpcList[i],
                [_CONFIG.COLUMN.LIST.RATE.id]: parseFloat(flRate) || '0',
                [_CONFIG.COLUMN.LIST.TOTAL.id]: parseFloat(flTotal) || '0',
                [_CONFIG.COLUMN.LIST.ON_HAND.id]: parseInt(inOnhand) || '0',
                [_CONFIG.COLUMN.LIST.QUANTITY_DAMAGE.id]: parseInt(inDamage) || '0',
                [_CONFIG.COLUMN.LIST.QUANTITY_TESTER.id]: parseInt(inTester) || '0',
                [_CONFIG.COLUMN.LIST.QUANTITY_THEFT.id]: parseInt(inTheft) || '0',
                [_CONFIG.COLUMN.LIST.QUANTITY_BACKBAR.id]: parseInt(inBackbar) || '0',
                [_CONFIG.COLUMN.LIST.QUANTITY_SOLD.id]: parseInt(inSold) || '0',
                [_CONFIG.COLUMN.LIST.QUANTITY_DISCREPANCY.id]: parseInt(inDiscrepancy) || '0',
                //[_CONFIG.COLUMN.LIST.QUANTITY_SOLD.id]: parseInt(getQtyCashSaleTypeFranchise(result.id,stCustomer)) || '0',
                //[_CONFIG.COLUMN.LIST.LOCATION.id]: stLocation,
                //[_CONFIG.COLUMN.LIST.AVAILABLE.id]: stAvailable,
                //[_CONFIG.COLUMN.LIST.ON_HAND.id]: stOnHand,
                //[_CONFIG.COLUMN.LIST.COMMITTED.id]: stCommitted
            })

        }
        log.debug('arrItemIdList', arrItemIdList);
        log.debug('arrPriceList', arrPriceList);
        return arrMapItemperLocation;
    };

    const getCustomer = (stId) => {
        const ssCredentials = search.create({
            type: 'customrecord_cwgp_externalsl_creds',
            filters:
                [
                    search.createFilter({
                        name: 'internalid',
                        operator: search.Operator.ANYOF,
                        values: parseInt(stId)
                    })
                ],
            columns:
                [
                    search.createColumn({ name: 'custrecord_cwgp_customer' })
                ]
        }).run().getRange({
            start: 0,
            end: 1
        });

        if (ssCredentials.length > 0) {
            return ssCredentials[0].getValue({ name: 'custrecord_cwgp_customer' });
        }
    };


    const buildSearch = (options) => {
        const {
            type, 
            filters,
            columns,
        } = options

        const objSearch = search.create({
            type,
            filters,
            columns
        })

        return objSearch;
    }

    const getInvItemsBySubsidiary = (stSubsidiary) => {

        let objItemSearchProps = {
            type: search.Type.INVENTORY_ITEM,
            filters:
                [
                    search.createFilter({
                        name: 'subsidiary',
                        operator: search.Operator.ANYOF,
                        values: stSubsidiary
                    }),
                    search.createFilter({
                        name: 'custitem_cwgp_item_extportal',
                        operator: search.Operator.IS,
                        values: 'T'
                    })

                ],
            columns:
                [
                    search.createColumn({ name: 'itemid' }),
                    search.createColumn({ name: 'custitemheyday_upccode' })
                ]
        }

        return buildSearch(objItemSearchProps).run();
    }

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

    const addOptionsItemBySubsidiary = (options) => {

        log.debug('options', options)

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
    
    const mapPOValues = (stPoId) => {
        let objPO = {
            body: {},
            item: []
        };

        search.create({
            type: search.Type.SALES_ORDER,
            filters:
                [
                    search.createFilter({
                        name: 'internalid',
                        operator: search.Operator.ANYOF,
                        values: stPoId
                    }),
                    search.createFilter({
                        name: 'taxline',
                        operator: search.Operator.IS,
                        values: false
                    })
                    
                ],
            columns:
                [
                    search.createColumn({ name: 'mainline' }),
                    search.createColumn({ name: 'entity' }),
                    search.createColumn({ name: 'memomain' }),
                    search.createColumn({ name: 'trandate' }),
                    search.createColumn({ name: 'shipdate' }),
                    search.createColumn({ name: 'subsidiary' }),
                    search.createColumn({ name: 'location' }),
                    search.createColumn({ name: 'item' }),
                    search.createColumn({ name: 'memo' }),
                    search.createColumn({ name: 'quantity' }),
                    search.createColumn({ name: 'rate' }),
                    search.createColumn({ name: 'amount' }),
                    search.createColumn({ name: 'tranid' }),
                    search.createColumn({ name: 'custitem_heyday_sku', join: 'item' }),
                    search.createColumn({ name: 'custitemheyday_upccode', join: 'item' }),
                    search.createColumn({ name: 'salesdescription', join: 'item' }),
                    search.createColumn({ name: 'custbody_cwgp_franchiseitemreceipt' }),
                    search.createColumn({ name: 'custcol_cwgp_remaining' }),
                    search.createColumn({ name: 'custbody_cwgp_franchiseapprovalstatus' }),
                    search.createColumn({ name: 'custbody_cwgp_canreceive' }),
                    search.createColumn({ name: 'custbody_cwgp_externalportaloperator' }),
                    search.createColumn({ name: 'amount' }),
                    
                ]
        }).run().each((result) => {
            const stMainLine = result.getValue({ name: 'mainline' });
            log.debug('result id', result.id);
            objPO.body.custpage_cwgp_forreceivingcount = 0;
            if (stMainLine == '*') {
                objPO.body.custpage_cwgp_customer = result.getValue({ name: 'entity' });
                objPO.body.custpage_cwgp_memomain = result.getValue({ name: 'memomain' });
                objPO.body.custpage_cwgp_date = result.getValue({ name: 'trandate' });
                objPO.body.custpage_cwgp_deliverbydate = result.getValue({ name: 'shipdate' });
                objPO.body.custpage_cwgp_subsidiary = result.getValue({ name: 'subsidiary' });
                objPO.body.custpage_cwgp_location = result.getValue({ name: 'location' });
                objPO.body.custpage_cwgp_orderno = stPoId;
                objPO.body.custpage_cwgp_operator = result.getValue({ name: 'custbody_cwgp_externalportaloperator' });
                objPO.body.custpage_cwgp_status = result.getText({ name: 'custbody_cwgp_franchiseapprovalstatus' });
                objPO.body.custpage_cwgp_totalamount = result.getValue({ name: 'amount' });
                if(result.getValue({ name: 'custbody_cwgp_canreceive' })){
                    objPO.body.custpage_cwgp_forreceiving = 'T'
                }
                //objPO.body.custpage_cwgp_forreceiving = result.getValue({ name: 'custbody_cwgp_canreceive' });
            } else {
                log.debug('result id', result.id);
                log.debug('status', result.getValue({ name: 'custbody_cwgp_franchiseapprovalstatus' }));
                log.debug('remaining', result.getValue({ name: 'custcol_cwgp_remaining' }));
                if(result.getValue({ name: 'custbody_cwgp_franchiseapprovalstatus' })== 3 && result.getValue({ name: 'custcol_cwgp_remaining' })>0){
                    objPO.body.custpage_cwgp_forreceivingcount++;
                }

                objPO.item.push({
                    custpage_cwgp_itemid: result.getValue({ name: 'item' }),
                    custpage_cwgp_item: result.getValue({ name: 'item' }),
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
    
    const mapIRValuesCreate = (stPoId) => {
        let objPO = {
            body: {},
            item: []
        };

        search.create({
            type: search.Type.SALES_ORDER,
            filters:
                [
                    search.createFilter({
                        name: 'internalid',
                        operator: search.Operator.ANYOF,
                        values: stPoId
                    }),
                    search.createFilter({
                        name: 'taxline',
                        operator: search.Operator.IS,
                        values: false
                    }),
                    search.createFilter({
                        name: 'custcol_cwgp_remaining',
                        operator: search.Operator.GREATERTHAN,
                        values: 0
                    }),
                    
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
                    search.createColumn({ name: "quantity" }),
                    search.createColumn({ name: 'memo' }),
                    search.createColumn({ name: 'quantity' }),
                    search.createColumn({ name: 'rate' }),
                    search.createColumn({ name: 'amount' }),
                    search.createColumn({ name: 'tranid' }),
                    search.createColumn({ name: "custcol_cwgp_remaining"}),
                    search.createColumn({ name: "lineuniquekey"}),
                    search.createColumn({ name: 'custitem_heyday_sku', join: 'item' }),
                    search.createColumn({ name: 'custitemheyday_upccode', join: 'item' }),
                    search.createColumn({ name: 'salesdescription', join: 'item' })
                    
                ]
        }).run().each((result) => {
        	objPO.body.custpage_cwgp_orderno = result.id;
            objPO.body.custpage_cwgp_customer = result.getValue({ name: 'entity' });
            objPO.body.custpage_cwgp_subsidiary = result.getValue({ name: 'subsidiary' });
            let qtyOnhand = getQtyOnHandFranchise(result.getValue({ name: 'item' }), result.getValue({ name: 'entity' }));
            log.debug('qtyOnhand', qtyOnhand);
            objPO.item.push({
                
                
                custpage_cwgp_itemid: result.getValue({ name: 'item' }),
                custpage_cwgp_item: result.getValue({ name: 'item' }),
                custpage_cwgp_description: result.getValue({ name: 'memo' }),
                custpage_cwgp_quantityremaining: result.getValue({ name: 'custcol_cwgp_remaining' }),
                custpage_cwgp_quantityremaininghidden: result.getValue({ name: 'custcol_cwgp_remaining' }),
                custpage_cwgp_shippedquantity: result.getValue({ name: 'quantity' }),
                custpage_cwgp_shippedquantityhidden: result.getValue({ name: 'quantity' }),
                custpage_cwgp_startingquantity: parseInt(qtyOnhand),
                custpage_cwgp_startingquantityhidden: parseInt(qtyOnhand),
                custpage_cwgp_finalquantity: parseInt(qtyOnhand),
                custpage_cwgp_quantity: '0',
                custpage_cwgp_damagedquantity: '0',
                custpage_cwgp_variance: '0',
                custpage_cwgp_rate: result.getValue({ name: 'rate' }),
                custpage_cwgp_amount: result.getValue({ name: 'amount' }),
                custpage_cwgp_line: result.getValue({ name: 'lineuniquekey' }),
                custpage_cwgp_internalsku: result.getValue({ name: 'custitem_heyday_sku', join: 'item' }),
                custpage_cwgp_upccode: result.getValue({ name: 'custitemheyday_upccode', join: 'item' }),
                
            });

            return true;
        });

        return objPO;
    };
    
    const mapIRValuesViewEdit = (stPoId) => {
        let objPO = {
            body: {},
            item: []
        };

        const objItemReceipt = record.load({
            type: 'customrecord_cwgp_franchisereciept',
            id: stPoId
        });
        
        objPO.body.custpage_cwgp_customer = objItemReceipt.getValue({ fieldId: 'custrecord_cwgp_fr_customer' });
        objPO.body.custpage_cwgp_subsidiary = objItemReceipt.getValue({ fieldId: 'custrecord_cwgp_fr_subsidiary' });
        objPO.body.custpage_cwgp_date = objItemReceipt.getValue({ fieldId: 'custrecord_cwgp_fr_date' });
        objPO.body.custpage_cwgp_poid = objItemReceipt.getValue({ fieldId: 'custrecord_cwgp_fr_so' });
        objPO.body.custpage_cwgp_memomain = objItemReceipt.getValue({ fieldId: 'custrecord_cwgp_fr_memo' });
        objPO.body.custpage_cwgp_damagediaid = objItemReceipt.getValue('custrecord_cwgp_fr_ia');
        objPO.body.custpage_cwgp_operator = objItemReceipt.getValue('custrecord_cwgp_fr_operator');
        
        var franchiseIRLineSearch = search.create({
            type: "customrecord_cwgp_franchise_tranline",
            filters:
            [
               ["custrecord_cwgp_ftl_type","anyof","1"], 
               "AND", 
               ["custrecord_cwgp_ftl_parentir","anyof",stPoId]
            ],
            columns:
            [
               search.createColumn({
                  name: "id",
                  sort: search.Sort.ASC,
                  label: "ID"
               }),
               search.createColumn({name: "custrecord_cwgp_ftl_parentir", label: "Parent Item Receipt"}),
               search.createColumn({name: "custrecord_cwgp_ftl_type", label: "Franchise Transaction Type"}),
               search.createColumn({name: "custrecord_cwgp_ftl_item", label: "Item"}),
               search.createColumn({
                  name: "custitemheyday_upccode",
                  join: "CUSTRECORD_CWGP_FTL_ITEM",
                  label: "UPC Code"
               }),
               search.createColumn({
                  name: "custitem_heyday_sku",
                  join: "CUSTRECORD_CWGP_FTL_ITEM",
                  label: "Internal SKU"
               }),
               search.createColumn({name: "custrecord_cwgp_ftl_receivedqty", label: "Quantity Recieved"}),
               search.createColumn({name: "custrecord_cwgp_ftl_damagedqty", label: "Quantity Damaged"}),
               search.createColumn({name: "custrecord_cwgp_ftl_variance", label: "Variance"}),
               search.createColumn({name: "custrecord_cwgp_ftl_description", label: "Description"}),
            ]
         });
        franchiseIRLineSearch.run().each(function(result){
            log.debug('result.id', result.id);
        	objPO.item.push({
        		custpage_cwgp_id: result.id,
                custpage_cwgp_item: result.getValue({ name: 'custrecord_cwgp_ftl_item' }),
                custpage_cwgp_quantity: result.getValue({ name: 'custrecord_cwgp_ftl_receivedqty' }),
                custpage_cwgp_damagedquantity: result.getValue({ name: 'custrecord_cwgp_ftl_damagedqty' }),
                custpage_cwgp_variance: result.getValue({ name: 'custrecord_cwgp_ftl_variance' }),
                custpage_cwgp_description: result.getValue({ name: 'custrecord_cwgp_ftl_description' }),
                custpage_cwgp_internalsku: result.getValue({ name: 'custitem_heyday_sku', join: 'CUSTRECORD_CWGP_FTL_ITEM' }),
                custpage_cwgp_upccode: result.getValue({ name: 'custitemheyday_upccode', join: 'CUSTRECORD_CWGP_FTL_ITEM' }),
            });
        	   // .run().each has a limit of 4,000 results
    	   return true;
    	});        

        return objPO;
    };

    const mapInventoryAdjustmentValues = (stPoId) => {
        let objPO = {
            body: {},
            item: []
        };
        
        var franchiseIRLineSearch = search.create({
            type: "customrecord_cwgp_franchise_tranline",
            filters:
            [
               ["custrecord_cwgp_ftl_type","anyof","2"], 
               "AND", 
               ["custrecord_cwgp_ftl_parentia","anyof",stPoId]
            ],
            columns:
            [
               search.createColumn({
                  name: "id",
                  sort: search.Sort.ASC,
                  label: "ID"
               }),
               search.createColumn({name: "custrecord_cwgp_ftl_parentir"}),
               search.createColumn({name: "custrecord_cwgp_ftl_parentia"}),
               search.createColumn({name: "custrecord_cwgp_ftl_type"}),
               search.createColumn({name: "custrecord_cwgp_ftl_item"}),
               search.createColumn({
                  name: "custitemheyday_upccode",
                  join: "CUSTRECORD_CWGP_FTL_ITEM",
                  label: "UPC Code"
               }),
               search.createColumn({
                  name: "custitem_heyday_sku",
                  join: "CUSTRECORD_CWGP_FTL_ITEM",
                  label: "Internal SKU"
               }),
               search.createColumn({name: "custrecord_cwgp_ftl_receivedqty"}),
               search.createColumn({name: "custrecord_cwgp_ftl_damagedqty"}),
               search.createColumn({name: "custrecord_cwgp_ftl_variance"}),
               search.createColumn({name: "custrecord_cwgp_ftl_description"}),
               search.createColumn({name: "custrecord_cwgp_ftl_actualqty"}),
               search.createColumn({name: "custrecord_cwgp_ftl_displayqty"}),
            ]
         });
        franchiseIRLineSearch.run().each(function(result){
        	objPO.item.push({
        		custpage_cwgp_id: result.id,
                custpage_cwgp_inventoryadjustment: 'IA# ' +result.getValue({ name: 'custrecord_cwgp_ftl_parentia' }),
                custpage_cwgp_item: result.getValue({ name: 'custrecord_cwgp_ftl_item' }),
                custpage_cwgp_adjustqtyby: result.getValue({ name: 'custrecord_cwgp_ftl_displayqty' }),
                custpage_cwgp_damagedquantity: Math.abs(result.getValue({ name: 'custrecord_cwgp_ftl_displayqty' })),
                custpage_cwgp_variance: result.getValue({ name: 'custrecord_cwgp_ftl_variance' }),
                custpage_cwgp_description: result.getValue({ name: 'custrecord_cwgp_ftl_description' }),
                custpage_cwgp_internalsku: result.getValue({ name: 'custitem_heyday_sku', join: 'CUSTRECORD_CWGP_FTL_ITEM' }),
                custpage_cwgp_upccode: result.getValue({ name: 'custitemheyday_upccode', join: 'CUSTRECORD_CWGP_FTL_ITEM' }),
            });
        	   // .run().each has a limit of 4,000 results
    	   return true;
    	});        

        return objPO;
    };

    

    const mapInvAdjValues = (stPoId) => {
        let objPO = {
            body: {},
            item: []
        };

        const objItemReceipt = record.load({
            type: 'customrecord_cwgp_franchiseinvadjustment',
            id: stPoId
        });
        
        objPO.body.custpage_cwgp_customer = objItemReceipt.getValue({ fieldId: 'custrecord_cwgp_fia_customer' });
        objPO.body.custpage_cwgp_date = objItemReceipt.getValue({ fieldId: 'custrecord_cwgp_fia_date' });
        objPO.body.custpage_cwgp_memomain = objItemReceipt.getValue({ fieldId: 'custrecord_cwgp_fia_memo' });
        objPO.body.custpage_cwgp_operator = objItemReceipt.getValue({ fieldId: 'custrecord_cwgp_fia_operator' });
        objPO.body.custbody_cwgp_itemsummary = objItemReceipt.getValue({ fieldId: 'custrecord_cwgp_fia_itemsummary' });

        objItemSummary = objItemReceipt.getValue({ fieldId: 'custrecord_cwgp_fia_itemsummary' });
        subType = objItemReceipt.getValue({ fieldId: 'custrecord_cwgp_fia_subtype' });

        if(objItemSummary){
            objItemSummary =  JSON.parse(objItemSummary);
        }

        if(objItemSummary.length > 0){
            let stTextAreaVal = '';

            stTextAreaVal += '<div><table style="width:100%; border-collapse: collapse" border="1px solid black" ">'
            stTextAreaVal+= '<tr><td style="font-weight: bold;padding:3px">Type</td><td style="font-weight: bold;padding:3px">Quantity</td><td style="font-weight: bold;padding:3px">Total Estimated Replacement Value</td>';
            for(let x = 0; x < objItemSummary.length; x++){
                let totalEstRepVal = objItemSummary[x].totalEstRepVal || 0;
                stTextAreaVal+= '<tr><td style="padding:3px">'+ objItemSummary[x].Id+'</td><td style="padding:3px">'+objItemSummary[x].intQty+'</td><td>'+totalEstRepVal.toFixed(2)+'</td></tr>';
            }
            stTextAreaVal += '</div></table>'

            objPO.body.custpage_cwgp_totaladjustment = stTextAreaVal;
        }
        var franchiseIRLineSearch = search.create({
        	   type: "customrecord_cwgp_franchise_tranline",
        	   filters:
        	   [
        	      ["custrecord_cwgp_ftl_parentia","anyof",stPoId]
        	   ],
        	   columns:
        	   [
        	      search.createColumn({
        	         name: "id",
        	         sort: search.Sort.ASC,
        	         label: "ID"
        	      }),
        	      search.createColumn({name: "custrecord_cwgp_ftl_item"}),
                  search.createColumn({
                    name: "custitemheyday_upccode",
                    join: "CUSTRECORD_CWGP_FTL_ITEM",
                    label: "UPC Code"
                 }),
                 search.createColumn({
                    name: "custitem_heyday_sku",
                    join: "CUSTRECORD_CWGP_FTL_ITEM",
                    label: "Internal SKU"
                 }),
                 search.createColumn({name: "custrecord_cwgp_ftl_actualqty"}),
                 search.createColumn({name: "custrecord_cwgp_ftl_adjustmentreason"}),
                 search.createColumn({name: "custrecord_cwgp_ftl_adjustmenttype"}),
                 search.createColumn({name: "custrecord_cwgp_ftl_description"}),
                 search.createColumn({name: "custrecord_cwgp_ftl_roomno"}),
                 search.createColumn({name: "custrecord_cwgp_ftl_st"}),
                 search.createColumn({name: "custrecord_cwgp_ftl_datetime"}),
                 search.createColumn({name: "custrecord_cwgp_ftl_displayqty"}),
                 search.createColumn({name: "custrecord_cwgp_ftl_endingqty"}),
                 
                 
        	   ]
        	});
        franchiseIRLineSearch.run().each(function(result){
            let stDateTime = result.getValue({ name: 'custrecord_cwgp_ftl_datetime' });
            if(stDateTime){
                stDateTime = format.format({value: new Date(stDateTime), type: format.Type.DATETIMETZ})
            }

            let arrNegative = ['2','3','4','5'];
            let stadjustmentType = result.getValue({ name: 'custrecord_cwgp_ftl_adjustmenttype' });
            log.debug('staDjustmentType',stadjustmentType);
            log.debug('objDamagedIA',arrNegative.indexOf('stadjustmentType'));
            let stAdjustQtyBy = 0;
            if(arrNegative.indexOf(stadjustmentType) == -1){
                stAdjustQtyBy = result.getValue({ name: 'custrecord_cwgp_ftl_actualqty' });
            }
            else{
                stAdjustQtyBy = result.getValue({ name: 'custrecord_cwgp_ftl_displayqty' });
            }

        	objPO.item.push({
        		custpage_cwgp_id: result.id,
                custpage_cwgp_item: result.getValue({ name: 'custrecord_cwgp_ftl_item' }),
                //custpage_cwgp_inventoryadjustment: 'IA# '+ objInventoryAdjustment.getText('tranid'),
                custpage_cwgp_description: result.getValue({ name: 'custrecord_cwgp_ftl_description' }),
                custpage_cwgp_adjustqtyby: stAdjustQtyBy,
                custpage_cwgp_internalsku: result.getValue({ name: 'custitem_heyday_sku', join: 'CUSTRECORD_CWGP_FTL_ITEM' }),
                custpage_cwgp_upccode: result.getValue({ name: 'custitemheyday_upccode', join: 'CUSTRECORD_CWGP_FTL_ITEM' }),
                custpage_cwgp_upccode: result.getValue({ name: 'custitemheyday_upccode', join: 'CUSTRECORD_CWGP_FTL_ITEM' }),
                custpage_cwgp_adjustmentreason: result.getValue({ name: 'custrecord_cwgp_ftl_adjustmentreason' }),
                custpage_cwgp_adjustmenttype: result.getValue({ name: 'custrecord_cwgp_ftl_adjustmenttype' }),
                custpage_cwgp_roomnumber: result.getValue({ name: 'custrecord_cwgp_ftl_roomno' }),
                custpage_cwgp_stassignment: result.getValue({ name: 'custrecord_cwgp_ftl_st' }),
                custpage_cwgp_newquantity: result.getValue({ name: 'custrecord_cwgp_ftl_endingqty' }),
                custpage_cwgp_datetime: stDateTime,
                
                
            });
        	   // .run().each has a limit of 4,000 results
    	   return true;
    	});        

        return objPO;
    };

    const mapInvCountValues = (stPoId) => {
        let objPO = {
            body: {},
            item: []
        };

        const objItemReceipt = record.load({
            type: 'customrecord_cwgp_franchiseinvadjustment',
            id: stPoId
        });
        
        objPO.body.custpage_cwgp_customer = objItemReceipt.getValue({ fieldId: 'custrecord_cwgp_fia_customer' });
        objPO.body.custpage_cwgp_date = objItemReceipt.getValue({ fieldId: 'custrecord_cwgp_fia_date' });
        objPO.body.custpage_cwgp_memomain = objItemReceipt.getValue({ fieldId: 'custrecord_cwgp_fia_memo' });
        objPO.body.custpage_cwgp_operator = objItemReceipt.getValue({ fieldId: 'custrecord_cwgp_fia_operator' });
        objPO.body.custpage_cwgp_subsidiary = objItemReceipt.getValue({ fieldId: 'custrecord_cwgp_fia_subsidiary' });
        objPO.body.custpage_cwgp_location = objItemReceipt.getValue({ fieldId: 'custrecord_cwgp_fia_location' });
        objPO.body.custpage_cwgp_totaldiscrepancy = objItemReceipt.getValue({ fieldId: 'custrecord_cwgp_fia_totaldiscrepancy' });
        objDiscrepancySummary = objItemReceipt.getText('custrecord_cwgp_fia_totaldiscrepancy');

        if(objDiscrepancySummary){
            let stTextAreaVal = '';

            stTextAreaVal += '<div><br><table style="width:100%; border-collapse: collapse" border="1px solid black" ">'
            stTextAreaVal+= '<tr><td style="font-weight: bold;padding:3px">Total Discrepancy</td></tr>';
            stTextAreaVal+= '<tr><td style="padding:3px">'+ objDiscrepancySummary+'</td></tr>';
            stTextAreaVal += '</table></div><br>'

            objPO.body.custpage_cwgp_totaladjustment = stTextAreaVal;
        }

        var franchiseIRLineSearch = search.create({
        	   type: "customrecord_cwgp_franchise_tranline",
        	   filters:
        	   [
        	      ["custrecord_cwgp_ftl_parentia","anyof",stPoId]
        	   ],
        	   columns:
        	   [
        	      search.createColumn({
        	         name: "id",
        	         sort: search.Sort.ASC,
        	         label: "ID"
        	      }),
        	      search.createColumn({name: "custrecord_cwgp_ftl_item"}),
                  search.createColumn({
                    name: "custitemheyday_upccode",
                    join: "CUSTRECORD_CWGP_FTL_ITEM",
                    label: "UPC Code"
                 }),
                 search.createColumn({
                    name: "custitem_heyday_sku",
                    join: "CUSTRECORD_CWGP_FTL_ITEM",
                    label: "Internal SKU"
                 }),
                 search.createColumn({name: "custrecord_cwgp_ftl_actualqty"}),
                 search.createColumn({name: "custrecord_cwgp_ftl_adjustmentreason"}),
                 search.createColumn({name: "custrecord_cwgp_ftl_adjustmenttype"}),
                 search.createColumn({name: "custrecord_cwgp_ftl_description"}),
                 search.createColumn({name: "custrecord_cwgp_ftl_roomno"}),
                 search.createColumn({name: "custrecord_cwgp_ftl_st"}),
                 search.createColumn({name: "custrecord_cwgp_ftl_datetime"}),
                 search.createColumn({name: "custrecord_cwgp_ftl_displayqty"}),
                 search.createColumn({name: "custrecord_cwgp_ftl_endingqty"}),
                 search.createColumn({name: "custrecord_cwgp_ftl_discrepancy"}),
                 search.createColumn({name: "custrecord_cwgp_ftl_enteredqty"}),
                 search.createColumn({name: "custrecord_cwgp_ftl_finalqty"}),
                 search.createColumn({name: "custrecord_cwgp_ftl_startingqty"}),
        	   ]
        	});
        franchiseIRLineSearch.run().each(function(result){

        	objPO.item.push({
        		custpage_cwgp_id: result.id,
                custpage_cwgp_item: result.getValue({ name: 'custrecord_cwgp_ftl_item' }),
                //custpage_cwgp_inventoryadjustment: 'IA# '+ objInventoryAdjustment.getText('tranid'),
                custpage_cwgp_description: result.getValue({ name: 'custrecord_cwgp_ftl_description' }),
                custpage_cwgp_adjustqtyby: result.getValue({ name: 'custrecord_cwgp_ftl_displayqty' }),
                custpage_cwgp_internalsku: result.getValue({ name: 'custitem_heyday_sku', join: 'CUSTRECORD_CWGP_FTL_ITEM' }),
                custpage_cwgp_upccode: result.getValue({ name: 'custitemheyday_upccode', join: 'CUSTRECORD_CWGP_FTL_ITEM' }),
                custpage_cwgp_newquantity: result.getValue({ name: 'custrecord_cwgp_ftl_endingqty' }),
                custpage_cwgp_discrepancy: result.getValue({ name: 'custrecord_cwgp_ftl_discrepancy' }),
                custpage_cwgp_adjustmenttype: result.getValue({ name: 'custrecord_cwgp_ftl_adjustmenttype' }),
                custpage_cwgp_adjustmentreason: result.getValue({ name: 'custrecord_cwgp_ftl_adjustmentreason' }),
                custpage_cwgp_enteredcount: result.getValue({ name: 'custrecord_cwgp_ftl_enteredqty' }),
                custpage_cwgp_icfinalqty: result.getValue({ name: 'custrecord_cwgp_ftl_endingqty' }),
                custpage_cwgp_qtyonhand: result.getValue({ name: 'custrecord_cwgp_ftl_startingqty' }),
                
            });
        	   // .run().each has a limit of 4,000 results
    	   return true;
    	});        

        return objPO;
    };

    const mapItemReceiptVariance = (stPoId) => {
        let objIA = {
            item: []
        };
        let stDamagedAccount;
        search.create({
            type: 'customrecord_cwgp_ext_irvar',
            filters:
                [
                    search.createFilter({
                        name: 'custrecord_cwgp_ext_irvar_franchisetxn',
                        operator: search.Operator.ANYOF,
                        values: stPoId
                    })
                ],
            columns:
                [
                    search.createColumn({
                        name: "id",
                        sort: search.Sort.ASC,
                        label: "ID"
                     }),
                     search.createColumn({name: "custrecord_cwgp_ext_irvar_item", label: "Item"}),
                     search.createColumn({name: "custrecord_cwgp_ext_irvar_qty", label: "Quantity"}),
                     search.createColumn({
                        name: "custitem_heyday_sku",
                        join: "CUSTRECORD_CWGP_EXT_IRVAR_ITEM",
                        label: "Internal SKU"
                     }),
                     search.createColumn({
                        name: "custitemheyday_upccode",
                        join: "CUSTRECORD_CWGP_EXT_IRVAR_ITEM",
                        label: "UPC Code"
                     }),
                     search.createColumn({
                        name: "custrecord_cwgp_username",
                        join: "CUSTRECORD_CWGP_EXT_IRVAR_OPERATOR",
                        label: "Username"
                     })
                ]
        }).run().each((result) => {
            let stMainLine = result.getValue({ name: 'mainline' });
                if (stMainLine == '*') {
                    stDamagedAccount = result.getText({ name: 'account' });      
                } 
                else{
                    objIA.item.push({
                        custpage_cwgp_itemreceiptvariance: result.getValue({ name: 'id' }),
                        custpage_cwgp_item: result.getText({ name: 'custrecord_cwgp_ext_irvar_item' }),   
                        custpage_cwgp_internalsku: result.getValue({ name: 'custitem_heyday_sku', join:'CUSTRECORD_CWGP_EXT_IRVAR_ITEM' }),
                        custpage_cwgp_upccode: result.getValue({ name: 'custitemheyday_upccode', join: 'CUSTRECORD_CWGP_EXT_IRVAR_ITEM'}),
                        custpage_cwgp_quantity: result.getValue({ name: 'custrecord_cwgp_ext_irvar_qty' }),
                        custpage_cwgp_operator: result.getValue({ name: 'custrecord_cwgp_username', join:'CUSTRECORD_CWGP_EXT_IRVAR_OPERATOR' }),
                    });
                }
            return true;
        });

        log.debug('objDamagedIA',objIA);

        return objIA;
    };

    const franchisePOReceivable = (stPoId) => {
    	let isReceivable = false;
        let count = search.create({
            type: search.Type.SALES_ORDER,
            filters:
                [
                    search.createFilter({
                        name: 'internalid',
                        operator: search.Operator.ANYOF,
                        values: stPoId
                    }),
                    search.createFilter({
                        name: 'taxline',
                        operator: search.Operator.IS,
                        values: false
                    }),
                    search.createFilter({
                        name: 'custbody_cwgp_franchiseapprovalstatus',
                        operator: search.Operator.ANYOF,
                        values: 3
                    }),
                    search.createFilter({
                        name: 'status',
                        operator: search.Operator.ANYOF,
                        values: ["SalesOrd:D","SalesOrd:F","SalesOrd:E"]
                    }),
                    search.createFilter({
                        name: 'custbody_cwgp_canreceive',
                        operator: search.Operator.IS,
                        values: 'T'
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
                    search.createColumn({ name: 'tranid' }),
                    search.createColumn({name: "custcol_cwgp_remaining"}),
                    search.createColumn({name: "lineuniquekey"}),
                    
                ]
        }).runPaged().count;
        
        if(count > 0){
        	isReceivable = true;
        }
        return isReceivable;
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
    
    const getPOFieldValue = (stId,field) => {
        const ssFranchisePO = search.create({
    	   type: "salesorder",
    	   filters:
    	   [
    	      ["type","anyof","SalesOrd"], 
    	      "AND", 
    	      ["mainline","is","T"], 
    	      "AND", 
    	      ["internalid","anyof",stId]
    	   ],
    	   columns:
    	   [
    	      search.createColumn({name: field})
    	   ]
    	}).run().getRange({
            start: 0,
            end: 1
        });
        
        if (ssFranchisePO.length > 0) {
            return ssFranchisePO[0].getValue({ name: field });
        }
    };
    
    const setSublistValues = (sbl, objPO, stType) => {
        const arrListValues = stType == 'inventorycount' ? objPO : objPO.item;
        log.debug('arrListValues', arrListValues);
        log.debug('sbl',sbl);

        arrListValues.forEach((objItem, i) => {
            util.each(objItem, function (value, fieldId) {
                if(fieldId == 'custpage_cwgp_datetime'){
                    sbl.setSublistValue({
                        id: fieldId,
                        line: i,
                        value: value || null 
                    });
                }
                else if(Number.isInteger(value)){
                    sbl.setSublistValue({
                        id: fieldId,
                        line: i,
                        value: parseInt(value).toFixed(0)
                    });
                }
                else{
                    sbl.setSublistValue({
                        id: fieldId,
                        line: i,
                        value: value || ' '
                    });
                }
            });
        });
    };

    const getQtyOnHandFranchise  = (stItem,stCustomer) => {

        var qtyOnHand = 0;

        var IRLineSearch = search.create({
            type: "customrecord_cwgp_franchise_tranline",
            filters:
            [
               ["custrecord_cwgp_ftl_item","anyof",stItem], 
               "AND", 
               ["custrecord_cwgp_ftl_customer","anyof",stCustomer]
            ],
            columns:
            [
               search.createColumn({
                  name: "custrecord_cwgp_ftl_actualqty",
                  summary: "SUM",
                  label: "Quantity"
               })
            ]
         });
         IRLineSearch.run().each(function(result){
            // .run().each has a limit of 4,000 results
            
            var qtyIR = result.getValue({
                name: 'custrecord_cwgp_ftl_actualqty',
                summary: "SUM"
            });
            if(!isNaN(qtyIR) && qtyIR != ''){
                qtyOnHand += parseFloat(qtyIR);
            }
            
            return true;
         });

         return qtyOnHand;

    };

    const getQtyPerAdjustmentTypeFranchise  = (stItem,stCustomer,inType) => {

        var qtyOnHand = 0;

        var IRLineSearch = search.create({
            type: "customrecord_cwgp_franchise_tranline",
            filters:
            [
               ["custrecord_cwgp_ftl_item","anyof",stItem], 
               "AND", 
               ["custrecord_cwgp_ftl_customer","anyof",stCustomer],
               "AND", 
               ["custrecord_cwgp_ftl_adjustmenttype","anyof",inType]
            ],
            columns:
            [
               search.createColumn({
                  name: "custrecord_cwgp_ftl_displayqty",
                  summary: "SUM",
                  label: "Quantity"
               })
            ]
         });
         IRLineSearch.run().each(function(result){
            // .run().each has a limit of 4,000 results
            
            var qtyIR = result.getValue({
                name: 'custrecord_cwgp_ftl_displayqty',
                summary: "SUM"
            });
            if(!isNaN(qtyIR) && qtyIR != ''){
                qtyOnHand += parseFloat(qtyIR);
            }
            
            return true;
         });

         return qtyOnHand;

    };

    const getQtyCashSaleTypeFranchise  = (stItem,stCustomer) => {

        var qtyOnHand = 0;

        var IRLineSearch = search.create({
            type: "customrecord_cwgp_franchise_tranline",
            filters:
            [
               ["custrecord_cwgp_ftl_item","anyof",stItem], 
               "AND", 
               ["custrecord_cwgp_ftl_customer","anyof",stCustomer],
               "AND", 
               ["custrecord_cwgp_ftl_type","anyof",3]
            ],
            columns:
            [
               search.createColumn({
                  name: "custrecord_cwgp_ftl_actualqty",
                  summary: "SUM",
                  label: "Quantity"
               })
            ]
         });
         IRLineSearch.run().each(function(result){
            // .run().each has a limit of 4,000 results
            
            var qtyIR = result.getValue({
                name: 'custrecord_cwgp_ftl_actualqty',
                summary: "SUM"
            });
            if(!isNaN(qtyIR) && qtyIR != ''){
                qtyOnHand += parseFloat(qtyIR);
            }
            
            return true;
         });

         return qtyOnHand;

    };

    const getItemPerLocationColumns = (arrItemIdList, stCustomer, dtAsof, dtFrom , dtTo) => {
        /*let inOnhand = 0;
        let inTester = 0;
        let inBackbar = 0;
        let inDamage = 0;
        let inTheft = 0;
        let inSold = 0;
        let inDiscrepancy = 0;

        let arrOnhand = 0;
        let arrTester = 0;
        let arrBackbar = 0;
        let arrDamage = 0;
        let arrTheft = 0;
        let arrSold = 0;
        let arrDiscrepancy = 0;*/

        let objItemList = {};


        //qty on hand column
        const ssItemPerLocOnhand = search.load({ id: "customsearch_cwgp_franchise_itemperloc", type: "customrecord_cwgp_franchise_tranline" });
        
        if(dtAsof){
            ssItemPerLocOnhand.filters.push(search.createFilter({
                name: 'created',
                operator: 'onorbefore',
                values: dtAsof,
            }));
        }

        ssItemPerLocOnhand.filters.push(search.createFilter({
            name: 'custrecord_cwgp_ftl_customer',
            operator: 'anyof',
            values: stCustomer,
        }));

        ssItemPerLocOnhand.filters.push(search.createFilter({
            name: 'custrecord_cwgp_ftl_item',
            operator: 'anyof',
            values: arrItemIdList,
        }));

        ssItemPerLocOnhand.run().each(function(result){
            // .run().each has a limit of 4,000 results
            let stItem = result.getValue(result.columns[0]);
            let inOnhand = result.getValue(result.columns[2]);
            log.debug('stItem', stItem);
            log.debug('inOnhand', inOnhand);
            //objItemList[stItem] = {};
            
            if(!objItemList.hasOwnProperty(stItem)){
                objItemList[stItem] = {};
                objItemList[stItem]['onhand'] = inOnhand;
            }
            else{
                objItemList[stItem]['onhand'] = inOnhand;
            }
            return true;
         });

         //Other columns
         const ssItemPerLocOthers = search.load({ id: "customsearch_cwgp_franchise_itemperloc", type: "customrecord_cwgp_franchise_tranline" });
         
         if(dtFrom && dtTo){
            ssItemPerLocOthers.filters.push(search.createFilter({
                name: 'created',
                operator: 'within',
                values: [dtFrom,dtTo],
            }));
        }

        ssItemPerLocOthers.filters.push(search.createFilter({
            name: 'custrecord_cwgp_ftl_customer',
            operator: 'anyof',
            values: stCustomer,
        }));

        ssItemPerLocOthers.filters.push(search.createFilter({
            name: 'custrecord_cwgp_ftl_item',
            operator: 'anyof',
            values: arrItemIdList,
        }));

        ssItemPerLocOthers.run().each(function(result){

            let stItem = result.getValue(result.columns[0]);
            let inDamage = result.getValue(result.columns[3]);
            let inTester = result.getValue(result.columns[4]);
            let inTheft = result.getValue(result.columns[5]);
            let inBackbar = result.getValue(result.columns[6]);
            let inSold = result.getValue(result.columns[7]);
            let inDiscrepancy = result.getValue(result.columns[8]);
            
            if(!objItemList.hasOwnProperty(stItem)){
                objItemList[stItem] = {};
                objItemList[stItem]['damage'] = inDamage;
                objItemList[stItem]['tester'] = inTester;
                objItemList[stItem]['theft'] = inTheft;
                objItemList[stItem]['backbar'] = inBackbar;
                objItemList[stItem]['sold'] = inSold;
                objItemList[stItem]['discrepancy'] = inDiscrepancy;
            }
            else{
                objItemList[stItem]['damage'] = inDamage;
                objItemList[stItem]['tester'] = inTester;
                objItemList[stItem]['theft'] = inTheft;
                objItemList[stItem]['backbar'] = inBackbar;
                objItemList[stItem]['sold'] = inSold;
                objItemList[stItem]['discrepancy'] = inDiscrepancy;
            }
            // .run().each has a limit of 4,000 results
            

            return true;
         });
         

         return objItemList;
    };


    const getItemPerLocationTotalColumns = (stCustomer,dtAsof,dtFrom,dtTo) => {
        let inOnhand = 0;
        let inTester = 0;
        let inBackbar = 0;
        let inDamage = 0;
        let inTheft = 0;
        let inSold = 0;
        let inDiscrepancy = 0;
        //qty on hand column
        let ssItemPerLocTotalOnhand = search.load({ id: "customsearch_cwgp_franchise_itemperloct", type: "customrecord_cwgp_franchise_tranline" });
        ssItemPerLocTotalOnhand.filters.push(search.createFilter({
            name: 'custrecord_cwgp_ftl_customer',
            operator: 'anyof',
            values: stCustomer,
        }));
        if(dtAsof){
            ssItemPerLocTotalOnhand.filters.push(search.createFilter({
                name: 'created',
                operator: 'onorbefore',
                values: dtAsof,
            }));
        }
        ssItemPerLocTotalOnhand.run().each(function(result){
            // .run().each has a limit of 4,000 results
            inOnhand = result.getValue(result.columns[1]);
            return true;
         });




        //Other columns
        let ssItemPerLocTotalOthers = search.load({ id: "customsearch_cwgp_franchise_itemperloct", type: "customrecord_cwgp_franchise_tranline" });
        ssItemPerLocTotalOthers.filters.push(search.createFilter({
            name: 'custrecord_cwgp_ftl_customer',
            operator: 'anyof',
            values: stCustomer,
        }));
        if(dtFrom && dtTo){
            ssItemPerLocTotalOthers.filters.push(search.createFilter({
                name: 'created',
                operator: 'within',
                values: [dtFrom,dtTo],
            }));
        }
        ssItemPerLocTotalOthers.run().each(function(result){
            // .run().each has a limit of 4,000 results
            inDamage = result.getValue(result.columns[2]);
            inTester = result.getValue(result.columns[3]);
            inTheft = result.getValue(result.columns[4]);
            inBackbar = result.getValue(result.columns[5]);
            inSold = result.getValue(result.columns[6]);
            inDiscrepancy = result.getValue(result.columns[7]);

            return true;
         });
         

         return {
            'onhand': inOnhand,
            'tester': inTester,
            'backbar': inBackbar,
            'damage': inDamage,
            'theft': inTheft,
            'sold': inSold,
            'discrepancy': inDiscrepancy
          };
    };

    const getTotalQtyFranchise  = (stCustomer) => {

        var qtyOnHand = 0;

        var IRLineSearch = search.create({
            type: "customrecord_cwgp_franchise_tranline",
            filters:
            [
               ["custrecord_cwgp_ftl_customer","anyof",stCustomer]
            ],
            columns:
            [
               search.createColumn({
                  name: "custrecord_cwgp_ftl_actualqty",
                  summary: "SUM",
                  label: "Quantity"
               })
            ]
         });
         IRLineSearch.run().each(function(result){
            // .run().each has a limit of 4,000 results
            
            var qtyIR = result.getValue({
                name: 'custrecord_cwgp_ftl_actualqty',
                summary: "SUM"
            });
            log.debug("qtyIR",qtyIR);
            if(!isNaN(qtyIR) && qtyIR != ''){
                qtyOnHand += parseFloat(qtyIR);
            }
            
            return true;
         });

         return qtyOnHand;

    };

    const getTotalQtyPerAdjustmentTypeFranchise  = (stCustomer,inType) => {

        var qtyOnHand = 0;

        var IRLineSearch = search.create({
            type: "customrecord_cwgp_franchise_tranline",
            filters:
            [
               ["custrecord_cwgp_ftl_customer","anyof",stCustomer],
               "AND", 
               ["custrecord_cwgp_ftl_adjustmenttype","anyof",inType]
            ],
            columns:
            [
               search.createColumn({
                  name: "custrecord_cwgp_ftl_displayqty",
                  summary: "SUM",
                  label: "Quantity"
               })
            ]
         });
         IRLineSearch.run().each(function(result){
            // .run().each has a limit of 4,000 results
            
            var qtyIR = result.getValue({
                name: 'custrecord_cwgp_ftl_displayqty',
                summary: "SUM"
            });
            log.debug("qtyIR",qtyIR);
            if(!isNaN(qtyIR) && qtyIR != ''){
                qtyOnHand += parseFloat(qtyIR);
            }
            
            return true;
         });

         return qtyOnHand;

    };

    const addOptionsFranchiseApprovalStatus= (fld) => {
        fld.addSelectOption({
            value: '',
            text: ''
        });
        search.create({
            type: "customlist_cwgp_franchiseapprovalstat",
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

    const addOptionsForReceiving= (fld) => {
        fld.addSelectOption({
            value: 1,
            text: 'No'
        });
        fld.addSelectOption({
            value: 2,
            text: 'Yes'
        });
    };


    const addOptionsAdjusmentType = (fld) => {
        fld.addSelectOption({
            value: '',
            text: ''
        });
        search.create({
            type: "customlist_cwgp_adjustmenttype",
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

    const addOptionsAdjusmentTypeFiltered = (fld,stSubType) => {
        fld.addSelectOption({
            value: '',
            text: ''
        });

        let stTypes;
        if(stSubType == 'damagetestertheft'){
            stTypes = [3,4,5];
        }
        else if(stSubType =='standard'){
            stTypes = [6];
        }
        else{
            stTypes = [2];
        }
        search.create({
            type: "customlist_cwgp_adjustmenttype",
            filters:
                [
                    search.createFilter({
                        name: 'internalid',
                        operator: search.Operator.ANYOF,
                        values: stTypes
                    })
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

    

    

    

    return {
        mapValues,
        buildSearch,
        getInvItemsBySubsidiary,
        addOptionsVendorsBySubsidiary,
        addOptionsItemBySubsidiary,
        addOptionsLocationBySubsidiary,
        mapPOValues,
        setPOSublist,
        getPOFieldValue,
        mapIRValuesCreate,
        mapInventoryAdjustmentValues,
        mapItemReceiptVariance,
        franchisePOReceivable,
        mapItemReceipt,
        mapInventoryAdjustment,
        mapIRValuesViewEdit,
        mapInvAdjValues,
        mapInvCountValues,
        setSublistValues,
        addOptionsFranchiseApprovalStatus,
        addOptionsForReceiving,
        addOptionsAdjusmentType,
        addOptionsAdjusmentTypeFiltered,
        getCustomer,
        getTotalQtyPerAdjustmentTypeFranchise,
        getTotalQtyFranchise,
        getItemPerLocationColumns,
        getItemPerLocationTotalColumns
    }
});
