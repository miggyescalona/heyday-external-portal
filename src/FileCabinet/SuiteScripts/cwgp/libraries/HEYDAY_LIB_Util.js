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

define(['N/ui/serverWidget', 'N/search', 'N/util','N/record', 'N/url', './HEYDAY_LIB_ExternalPortal', 'N/file', 'N/format'], (serverWidget, search, util,record, url, EPLib, file, format) => {
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
                SO_INTERCOID: {
                    id: 'custpage_cwgp_sointercoid',
                    type: serverWidget.FieldType.TEXT,
                    label: 'SO Interco ID'
                },
                SO_INTERCOSTATUS: {
                    id: 'custpage_cwgp_sointercostatus',
                    type: serverWidget.FieldType.TEXT,
                    label: 'SO Interco Status'
                },
                PO_STATUSREF: {
                    id: 'custpage_cwgp_postatusref',
                    type: serverWidget.FieldType.TEXT,
                    label: 'PO Status Ref'
                },
                AMS_TRACKING_NUMBER: {
                    id: 'custpage_cwgp_sointercoid',
                    type: serverWidget.FieldType.TEXT,
                    label: 'SO Interco ID'
                },
                OPERATOR: {
                    id: 'custpage_cwgp_operator',
                    type: serverWidget.FieldType.TEXT,
                    label: 'Operator'
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
            arrPagedData,
            blForReceiving,
            stApprovalStatus
        } = options;

        const MAP_VALUES = {
            'intercompanypo': mapIntercompanyPO,
            'itemreceipt': mapItemReceipt,
            'inventoryadjustment': mapInventoryAdjustment,
            'itemperlocation': mapItemPerLocation
        };
        const mapValues = MAP_VALUES[stType];

        return mapValues(stUserId, stAccessType, arrPagedData, blForReceiving, stApprovalStatus);
    };

    const mapIntercompanyPO = (stUserId, stAccessType, arrPagedData, blForReceiving, stApprovalStatus) => {
        let arrMapIntercompanyPO = [];
        let arrFinalMapIntercoPO = [];

        const objRetailUrl = EPLib._CONFIG.RETAIL_PAGE[EPLib._CONFIG.ENVIRONMENT]

        let stBaseUrl = url.resolveScript({
            deploymentId        : objRetailUrl.DEPLOY_ID,
            scriptId            : objRetailUrl.SCRIPT_ID,
            returnExternalUrl   : true
        });

        let intPairedIntercoIds = [];

        arrPagedData.forEach((result, index) => {
            const stPairedIntercoId = result.getValue({ name: 'intercotransaction' });
            if(stPairedIntercoId){
                intPairedIntercoIds.push(stPairedIntercoId);
            }
            const stStatusRef = result.getValue({ name: 'statusref' });
            const stDateCreated = result.getValue({ name: 'datecreated' });
            const stStatus = result.getText({ name: 'approvalstatus' });
            const stTranId = result.getValue({ name: 'tranid' });
            const stID = result.id;
            const stUrl = `${stBaseUrl}&pageMode=view&&userId=${stUserId}&accesstype=${stAccessType}&poid=${stID}&rectype=intercompanypo&tranid=${stTranId}`;
            const stViewLink = `<a href='${stUrl}'>Purchase Order# ${stTranId}</a>`;

            arrMapIntercompanyPO.push({
                [_CONFIG.COLUMN.LIST.SO_INTERCOID.id]: stPairedIntercoId,
                [_CONFIG.COLUMN.LIST.TRAN_NO.id]: stViewLink,
                [_CONFIG.COLUMN.LIST.DATE.id]: stDateCreated,
                [_CONFIG.COLUMN.LIST.STATUS.id]: stStatus,
                [_CONFIG.COLUMN.LIST.PO_STATUSREF.id]: stStatusRef
            });
        });

        arrFinalMapIntercoPO = getPairedIntercoStatus(intPairedIntercoIds, arrMapIntercompanyPO, blForReceiving, stApprovalStatus)

        function getPairedIntercoStatus(intPairedIntercoIds, arrMapIntercompanyPO, blForReceiving, stApprovalStatus){
            let arrPairedSOs = [];
            const ssPairedIntercoSo = search.load({ id: "600", type: "salesorder" });


            if(intPairedIntercoIds.length!=0){;
                ssPairedIntercoSo.filters.push(search.createFilter({
                    name: 'internalid',
                    operator: 'anyof',
                    values: intPairedIntercoIds,
                }));

                var searchResultCount = ssPairedIntercoSo.runPaged().count;
                ssPairedIntercoSo.run().each(function(result){
                    ///Push into Array
                    arrPairedSOs.push({
                        [_CONFIG.COLUMN.LIST.SO_INTERCOID.id]: result.getValue({name: "internalid"}),
                        [_CONFIG.COLUMN.LIST.SO_INTERCOSTATUS.id]: result.getValue({name: "statusRef"})
                    });					
                    return true;
                });
                    
                let arrMerged = []
                for(let i = 0;i<arrMapIntercompanyPO.length;i++){
                    arrMerged.push({
                    ...arrMapIntercompanyPO[i],
                    ...(arrPairedSOs.find((itmInner)=>itmInner.custpage_cwgp_sointercoid===arrMapIntercompanyPO[i].custpage_cwgp_sointercoid))});
                    if(arrMerged[i].custpage_cwgp_trandstatus == 'Approved' && (arrMerged[i].custpage_cwgp_sointercostatus == 'pendingBilling' || arrMerged[i].custpage_cwgp_sointercostatus == 'pendingBillingPartFulfilled') && (arrMerged[i].custpage_cwgp_postatusref == 'pendingReceipt' || arrMerged[i].custpage_cwgp_postatusref== 'pendingBillPartReceived')){        
                        arrMerged[i].custpage_cwgp_forreceiving = 'Yes';
                    }
                    else{
                        arrMerged[i].custpage_cwgp_forreceiving = 'No';
                    }
                };
                for(let i = arrMerged.length-1;i>=0;i--){
                    log.debug('arrMerged[i]',JSON.stringify({
                        blForReceiving: blForReceiving,
                        stApprovalStatus: stApprovalStatus,
                        custpage_cwgp_forreceiving: arrMerged[i].custpage_cwgp_forreceiving,
                        custpage_cwgp_postatusref: arrMerged[i].custpage_cwgp_postatusref
                    }));
                    if(blForReceiving == '2' && arrMerged[i].custpage_cwgp_forreceiving == 'Yes' && (stApprovalStatus == '1' || stApprovalStatus == '3')){
                        arrMerged.splice(i,1);
                    }
                    else if(blForReceiving == '2' && arrMerged[i].custpage_cwgp_forreceiving == 'Yes' && stApprovalStatus == '2'){
                        arrMerged.splice(i,1);
                    }
                    else if(blForReceiving == '1' && arrMerged[i].custpage_cwgp_forreceiving == 'No' && stApprovalStatus == '2'){
                        arrMerged.splice(i,1);
                    }
                    else if(blForReceiving == '2' && arrMerged[i].custpage_cwgps_forreceiving == 'Yes' && stApprovalStatus == '2'){
                        arrMerged.splice(i,1);
                    }
                    else if(blForReceiving == '1' && arrMerged[i].custpage_cwgp_forreceiving == '' && stApprovalStatus == '1'){
                        arrMerged.splice(i,1);
                    }
                    else if(blForReceiving == '1' && arrMerged[i].custpage_cwgp_forreceiving == 'No' && stApprovalStatus == ''){
                        arrMerged.splice(i,1);
                    }
                    else if(blForReceiving == '2' && arrMerged[i].custpage_cwgp_forreceiving == 'Yes' && stApprovalStatus == ''){
                        arrMerged.splice(i,1);
                    }       
                }
                return arrMerged;
            }
            else{
                for(let i = arrMapIntercompanyPO.length-1;i>=0;i--){
                    log.debug('arrMapIntercompanyPO[i]',JSON.stringify({
                        blForReceiving: blForReceiving,
                        stApprovalStatus: stApprovalStatus,
                    }));
                    if(blForReceiving == '1' && stApprovalStatus == '1'){
                        arrMapIntercompanyPO.splice(i,1);
                    }
                    
                    
                }
                return arrMapIntercompanyPO;
            }
        }

        return arrFinalMapIntercoPO;
    }

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
            const stViewLink = `<a href='${stUrl}'>Item Receipt # ${stTranId}</a>`;

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
            const stOperator = result.getValue({ name: 'custbody_cwgp_externalportaloperator' });
            const stUrl = `${stBaseUrl}&pageMode=view&&userId=${stUserId}&accesstype=${stAccessType}&inventoryadjustmentid=${stID}&rectype=inventoryadjustment&tranid=${stTranId}`;
            const stViewLink = `<a href='${stUrl}'>Inventory Adjustment# ${stTranId}</a>`;

            arrMapInventoryAdjustment.push({
                [_CONFIG.COLUMN.LIST.TRAN_NO.id]: stViewLink,
                [_CONFIG.COLUMN.LIST.DATE.id]: stDateCreated,
                [_CONFIG.COLUMN.LIST.OPERATOR.id]: stOperator
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


    const addOptionsForReceiving = (fld) => {
        fld.addSelectOption({
            value: '',
            text: ''
        });

        fld.addSelectOption({
            value: '1',
            text: 'Yes'
        });

        fld.addSelectOption({
            value: '2',
            text: 'No'
        });
        return true;
    };


    const addOptionsApprovalStatus = (fld) => {
        fld.addSelectOption({
            value: '',
            text: ''
        });

        fld.addSelectOption({
            value: '1',
            text: 'Pending Approval'
        });

        fld.addSelectOption({
            value: '2',
            text: 'Approved'
        });

        fld.addSelectOption({
            value: '3',
            text: 'Rejected'
        });

        return true;
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

      const addDamagedAdjustingAccount= (fld) => {
        fld.addSelectOption({
            value: '',
            text: ''
        });
        search.create({
            type: "account",
            filters:
            [
                search.createFilter({
                    name: 'custrecord_cwgp_account_extretail',
                    operator: search.Operator.IS,
                    values: "T"
                }),
            ],
            columns:
                [
                    search.createColumn({ name: 'internalid' }),
                    search.createColumn({
                        name: "name",
                        sort: search.Sort.ASC,
                        label: "Name"
                     }),
                     search.createColumn({ name: 'displayname' }),
                ]
        }).run().each(function (result) {
            fld.addSelectOption({
                value: result.id,
                text: result.getValue({ name: 'displayname' })
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

    const addOptionsAdjusmentType = (fld,stSubType) => {
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

    
    const mapDamagedInventoryAdjustment = (stPoId) => {
        let objIA = {
            item: []
        };
        let stDamagedAccount;
        search.create({
            type: search.Type.INVENTORY_ADJUSTMENT,
            filters:
                [
                    search.createFilter({
                        name: 'custbody_cwgp_createdfromir',
                        operator: search.Operator.ANYOF,
                        values: stPoId
                    })
                ],
            columns:
                [
                    search.createColumn({name: "mainline", label: "*"}),
                    search.createColumn({name: "tranid", label: "Document Number"}),
                    search.createColumn({name: "item", label: "Item"}),
                    search.createColumn({
                        name: "custitem_heyday_sku",
                        join: "item",
                        label: "Internal SKU"
                     }),
                     search.createColumn({
                        name: "custitemheyday_upccode",
                        join: "item",
                        label: "UPC Code"
                     }),
                    search.createColumn({name: "quantity", label: "Quantity"}),
                    search.createColumn({name: "account", label: "Account"})
                ]
        }).run().each((result) => {
            let stMainLine = result.getValue({ name: 'mainline' });
                if (stMainLine == '*') {
                    stDamagedAccount = result.getText({ name: 'account' });      
                } 
                else{
                    objIA.item.push({
                        custpage_cwgp_item: result.getText({ name: 'item' }),
                        custpage_cwgp_damagedadjustingaccount: stDamagedAccount,   
                        custpage_cwgp_internalsku: result.getValue({ name: 'custitem_heyday_sku', join:'item' }),
                        custpage_cwgp_upccode: result.getValue({ name: 'custitemheyday_upccode', join: 'item'}),
                        custpage_cwgp_adjustqtyby: Math.abs(result.getValue({ name: 'quantity' })),
                        custpage_cwgp_inventoryadjustment: 'IA# ' + result.getValue({ name: 'tranid' }),
                    });
                }
            return true;
        });

        log.debug('objDamagedIA',objIA);

        return objIA;
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
                        name: 'custrecord_cwgp_ext_irvar_retailtxn',
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
                    search.createColumn({ name: 'custitemheyday_upccode', join: 'item' }),
                    search.createColumn({ name: 'intercotransaction' }),
                    search.createColumn({ name: 'expectedreceiptdate' }),
                    search.createColumn({ name: 'custbody_cwgp_externalportaloperator' }),
                    search.createColumn({ name: 'class' }),
                    search.createColumn({ name: 'custbody_cwgp_deliverbydate' }),
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
                objPO.body.custpage_cwgp_sointercoid = result.getValue({ name: 'intercotransaction' });
                objPO.body.custpage_cwgp_operator = result.getValue({ name: 'custbody_cwgp_externalportaloperator' });
                objPO.body.custpage_cwgp_deliverbydate = result.getValue({ name: 'custbody_cwgp_deliverbydate' });
            } else {
                objPO.item.push({
                    custpage_cwgp_businessline: result.getValue({ name: 'class' }),
                    custpage_cwgp_item: result.getValue({ name: 'item' }),
                    custpage_cwgp_itemid: result.getValue({ name: 'item' }),
                    custpage_cwgp_description: result.getValue({ name: 'memo'}),
                    custpage_cwgp_quantity: result.getValue({ name: 'quantity' }),
                    custpage_cwgp_rate: result.getValue({ name: 'rate' }),
                    custpage_cwgp_amount: result.getValue({ name: 'amount' }),
                    custpage_cwgp_internalsku: result.getValue({ name: 'custitem_heyday_sku', join: 'item' }) || null,
                    custpage_cwgp_upccode: result.getValue({ name: 'custitemheyday_upccode', join: 'item' }) || null,
                    //custpage_cwgp_expectedreceiptdate: result.getValue({ name: 'expectedreceiptdate'}) || null
                });
            }

            return true;
        });

        log.debug('objPO2',objPO);

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
        const intInterco = search.lookupFields({type: search.Type.PURCHASE_ORDER,id: objItemReceipt.getValue('createdfrom'),columns: ['intercotransaction']});
        objPO.body.custpage_cwgp_sointercoid = intInterco.intercotransaction; 
        objPO.body.custpage_cwgp_damagediaid = objItemReceipt.getValue('custbody_cwgp_damagediaid');
        objPO.body.custpage_cwgp_operator = objItemReceipt.getValue('custbody_cwgp_externalportaloperator');

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
                custpage_cwgp_description: lookUpItem(objItemReceipt.getSublistValue({
                    sublistId: 'item',
                    fieldId: 'item',
                    line: x
                }), 'purchasedescription') || null,
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

        log.debug('mapItemReceiptValues',objPO)
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

        let objPOQuantity = getPOQuantity(stPoId)

        objPO.body.custpage_cwgp_vendor = objItemReceipt.getText('entity');
        objPO.body.custpage_cwgp_memomain = objItemReceipt.getValue('memo');
        objPO.body.custpage_cwgp_date = objItemReceipt.getValue('trandate');
        objPO.body.custpage_cwgp_subsidiary = objItemReceipt.getValue('subsidiary');
        objPO.body.custpage_cwgp_createdfrom = objItemReceipt.getText('createdfrom');
        const intInterco = search.lookupFields({type: search.Type.PURCHASE_ORDER,id: objItemReceipt.getValue('createdfrom'),columns: ['intercotransaction']});
        objPO.body.custpage_cwgp_sointercoid = intInterco.intercotransaction; 
        objPO.body.custpage_cwgp_createdfrom = objItemReceipt.getValue('createdfrom');

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
                custpage_cwgp_description: lookUpItem(objItemReceipt.getSublistValue({
                    sublistId: 'item',
                    fieldId: 'item',
                    line: x
                }), 'purchasedescription') || null,
                custpage_cwgp_internalsku: lookUpItem(objItemReceipt.getSublistValue({
                    sublistId: 'item',
                    fieldId: 'item',
                    line: x
                }), 'sku'),
                custpage_cwgp_upccode: lookUpItem(objItemReceipt.getSublistValue({
                    sublistId: 'item',
                    fieldId: 'item',
                    line: x
                }), 'upc'),
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
                custpage_cwgp_shippedquantity: parseInt(objItemReceipt.getSublistValue({
                    sublistId: 'item',
                    fieldId: 'custcol_cwgp_shippedquantity',
                    line: x
                })),
                custpage_cwgp_shippedquantityhidden: parseInt(objItemReceipt.getSublistValue({
                    sublistId: 'item',
                    fieldId: 'custcol_cwgp_shippedquantity',
                    line: x
                })),
                custpage_cwgp_startingquantity: parseInt(objItemReceipt.getSublistValue({
                    sublistId: 'item',
                    fieldId: 'onhand',
                    line: x
                })),
                custpage_cwgp_startingquantityhidden: parseInt(objItemReceipt.getSublistValue({
                    sublistId: 'item',
                    fieldId: 'onhand',
                    line: x
                })),
                custpage_cwgp_quantityremaining: parseInt(objItemReceipt.getSublistValue({
                    sublistId: 'item',
                    fieldId: 'quantityremaining',
                    line: x
                })),
                custpage_cwgp_quantityremaininghidden: parseInt(objItemReceipt.getSublistValue({
                    sublistId: 'item',
                    fieldId: 'quantityremaining',
                    line: x
                })),
                custpage_cwgp_variance: parseInt(objItemReceipt.getSublistValue({
                    sublistId: 'item',
                    fieldId: 'custcol_cwgp_shippedquantity',
                    line: x
                })),
                custpage_cwgp_quantity: 0,
                custpage_cwgp_damagedquantity: 0,
                custpage_cwgp_rate: objItemReceipt.getSublistValue({
                    sublistId: 'item',
                    fieldId: 'rate',
                    line: x
                })
            });
        }


        let merged = {
            body: {},
            item: []
        };
        for(let i = 0;i<objPO['item'].length;i++){
            merged.item.push({
            ...objPO['item'][i],
            ...(objPOQuantity.find((itmInner)=>itmInner.custpage_cwgp_itemid===objPO['item'][i].custpage_cwgp_itemid))});
        };

        Object.assign(merged.body,objPO.body);

        log.debug('merged',merged);
        return merged;
    };

    const mapInventoryAdjustmentValues = (stPoId) => {
        let objPO = {
            body: {},
            item: []
        };
        let objItemSummary;
        let subType;
        let intAdjQtyBy;
        let stDateTime 

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
        objPO.body.custpage_cwgp_operator = objInventoryAdjustment.getText('custbody_cwgp_externalportaloperator');
        
        objItemSummary = objInventoryAdjustment.getValue('custbody_cwgp_itemsummary');
        subType = objInventoryAdjustment.getValue('custbody_cwgp_adjustmentsubtype');

        if(objItemSummary){
            objItemSummary =  JSON.parse(objItemSummary);
        }

        if(objItemSummary.length > 0){
            let stTextAreaVal = '';

            stTextAreaVal += '<div><table style="width:100%; border-collapse: collapse" border="1px solid black" ">'
            stTextAreaVal+= '<tr><td style="font-weight: bold;padding:3px">Type</td><td style="font-weight: bold;padding:3px">Quantity</tr>';
            for(let x = 0; x < objItemSummary.length; x++){
                stTextAreaVal+= '<tr><td style="padding:3px">'+ objItemSummary[x].Id+'</td><td style="padding:3px">'+objItemSummary[x].intQty+'</tr>';
            }
            stTextAreaVal += '</div></table>'

            objPO.body.custpage_cwgp_totaladjustment = stTextAreaVal;
        }

        const intLineCount = objInventoryAdjustment.getLineCount('inventory');

        for(var x = 0; x < intLineCount; x++){
            stDateTime = objInventoryAdjustment.getSublistValue({
                sublistId: 'inventory',
                fieldId: 'custcol_cwgp_datetime',
                line: x
            });
            
            if(stDateTime){
                stDateTime = format.format({value: new Date(stDateTime), type: format.Type.DATETIMETZ})
            }

            intAdjQtyBy = parseInt(objInventoryAdjustment.getSublistValue({
                sublistId: 'inventory',
                fieldId: 'adjustqtyby',
                line: x
            })) || 0
            if(subType != 'standard'){
                intAdjQtyBy = Math.abs(intAdjQtyBy);
            }

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
                custpage_cwgp_adjustqtyby: intAdjQtyBy,
                custpage_cwgp_newquantity: parseInt(objInventoryAdjustment.getSublistValue({
                    sublistId: 'inventory',
                    fieldId: 'newquantity',
                    line: x
                })) || 0.00,
               /* custpage_cwgp_estimatedunitcost: objInventoryAdjustment.getSublistValue({
                    sublistId: 'inventory',
                    fieldId: 'unitcost',
                    line: x
                }) || '0.00',*/
                custpage_cwgp_businessline: objInventoryAdjustment.getSublistText({
                    sublistId: 'inventory',
                    fieldId: 'class',
                    line: x
                }),
                custpage_cwgp_adjustmenttype: objInventoryAdjustment.getSublistText({
                    sublistId: 'inventory',
                    fieldId: 'custcol_cwgp_adjustmenttype',
                    line: x
                }),
                custpage_cwgp_adjustmentreason: objInventoryAdjustment.getSublistValue({
                    sublistId: 'inventory',
                    fieldId: 'custcol_cwgp_adjustmentreason',
                    line: x
                }),
                custpage_cwgp_roomnumber: objInventoryAdjustment.getSublistValue({
                    sublistId: 'inventory',
                    fieldId: 'custcol_cwgp_roomnumber',
                    line: x
                }),
                custpage_cwgp_stassignment: objInventoryAdjustment.getSublistValue({
                    sublistId: 'inventory',
                    fieldId: 'custcol_cwgp_stassignment',
                    line: x
                }),
                custpage_cwgp_datetime: stDateTime,
            });
        }

        log.debug('mapInventoryAdjustmentValues',objPO);
        return objPO;
    }

    const setSublistValues = (sbl, objPO) => {
        const arrListValues = objPO.item;
        log.debug('arrListValues', arrListValues);

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
                    log.debug('integer', value +'|'+fieldId)
                    sbl.setSublistValue({
                        id: fieldId,
                        line: i,
                        value: parseInt(value) 
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

    const getPOValues = (stPoId) => {
        let stApprovalStatus;
        let stDocumentStatus;
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
                    search.createColumn({ name: 'statusRef' }),
                ]
        }).run().each((result) => {
            stApprovalStatus = result.getText({ name: 'approvalstatus' });
            stPairedInterco = result.getValue({ name: 'intercotransaction' });
            stDocumentStatus = result.getValue({ name: 'statusRef' });
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
        objPO.stDocumentStatus = stDocumentStatus;

        return objPO;
    };

    const getPOQuantity = (stPoId) => {
        let intId;
        let intQuantity;
        let objPO = [];

        search.create({
            type: search.Type.PURCHASE_ORDER,
            filters:
                [
                    search.createFilter({
                        name: 'internalid',
                        operator: search.Operator.ANYOF,
                        values: stPoId
                    }),
                ],
            columns:
                [
                    search.createColumn({name: "mainline", label: "*"}),
                    search.createColumn({name: "item", label: "Item"}),
                    search.createColumn({name: "quantity", label: "Quantity"})
                ]
        }).run().each((result) => {
            if(result.getValue({ name: 'mainline' })!='*'){
                objPO.push({
                    custpage_cwgp_itemid: result.getValue({ name: 'item' }),
                    custpage_cwgp_shippedquantity: result.getValue({ name: 'quantity' }),
                    custpage_cwgp_shippedquantityhidden: result.getValue({ name: 'quantity' }),
                    custpage_cwgp_variance:  result.getValue({ name: 'quantity' }),
                });
            }
            return true;
        });

        objPO.intId = intId;
        objPO.intQuantity = intQuantity;

        log.debug('getPOQuantity',objPO);
        return objPO;
    };

    function lookUpItem(itemId, type){
        if(itemId){
            let fieldLookUp = search.lookupFields({
                type: search.Type.ITEM,
                id: itemId,
                columns: ['custitem_heyday_sku','custitemheyday_upccode','purchasedescription']
            });
            
            if(type == 'sku'){
                return fieldLookUp.custitem_heyday_sku;
            }
            else if(type == 'upc'){
                return fieldLookUp.custitemheyday_upccode;
            }
            else if(type == 'purchasedescription'){
                return fieldLookUp.purchasedescription;
            }
        }
    }

    function setDeliverByDate(){
        const d = new Date();
        const n = 6;
        var day = d.getDay();
        d.setDate(d.getDate() + n + (day === 6 ? 2 : +!day) + (Math.floor((n - 1 + (day % 6 || 1)) / 5) * 2));
        return d;
    }
    

    return {
        mapValues,
        mapDamagedInventoryAdjustment,
        mapItemReceiptVariance,
        addDamagedAdjustingAccount,
        addOptionsVendorsBySubsidiary,
        addOptionsItemBySubsidiary,
        addOptionsLocationBySubsidiary,
        addOptionsForReceiving,
        addOptionsApprovalStatus,
        addOptionsUnits,
        addOptionsBusinessLine,
        addOptionsPostingPeriod,
        addOptionsAdjusmentType,
        addOptionsDepartmentBySubsidiary,
        addOptionsAccountsBySubsidiary,
        mapPOValues,
        mapItemReceiptValues,
        mapPOtoItemReceiptValues,
        mapInventoryAdjustmentValues,
        setSublistValues,
        getPOValues,
        lookUpItem,
        setDeliverByDate
    }
});