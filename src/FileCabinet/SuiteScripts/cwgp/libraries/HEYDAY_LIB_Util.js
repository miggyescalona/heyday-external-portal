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
                },
                ADJUSTMENT_TYPE: {
                    id: 'custpage_cwgp_adjustmenttype',
                    type: serverWidget.FieldType.TEXT,
                    label: 'Adjustment Type'
                },
                SKU: {
                    id: 'custpage_cwgp_internalsku',
                    type: serverWidget.FieldType.TEXT,
                    label:  'Internal SKU'
                },
                ESTIMATED_COST_PER_UNIT:{
                    id: 'custpage_cwgp_estimatedcostperunit',
                    type: serverWidget.FieldType.FLOAT,
                    label:  'Estimated Cost Per Unit'
                },
                TOTAL_ESTIMATED_VALUE:{
                    id: 'custpage_cwgp_totalestimatedvalue',
                    type: serverWidget.FieldType.FLOAT,
                    label:  'Total Estimated Value'
                },
                UPC:{
                    id: 'custpage_cwgp_upccode',
                    type: serverWidget.FieldType.TEXT,
                    label:  'UPC Code'
                },
                SUBSIDIARY:{
                    id: 'custpage_cwgp_subsidiary',
                    type: serverWidget.FieldType.TEXT,
                    label:  'Subsidiary'
                },
                BACKBAR:{
                    id: 'custpage_cwgp_backbar',
                    type: serverWidget.FieldType.TEXT,
                    label:  'Backbar'
                },
                DAMAGE:{
                    id: 'custpage_cwgp_damage',
                    type: serverWidget.FieldType.TEXT,
                    label:  'Damage'
                },
                TESTER:{
                    id: 'custpage_cwgp_tester',
                    type: serverWidget.FieldType.TEXT,
                    label:  'Tester'
                },
                THEFT:{
                    id: 'custpage_cwgp_theft',
                    type: serverWidget.FieldType.TEXT,
                    label:  'Theft'
                },
                SOLD:{
                    id: 'custpage_cwgp_sold',
                    type: serverWidget.FieldType.TEXT,
                    label:  'Sold'
                },
                DISCREPANCY:{
                    id: 'custpage_cwgp_discrepancy',
                    type: serverWidget.FieldType.TEXT,
                    label:  'Discrepancy'
                },
                ON_HAND_TOTAL: {
                    id: 'custpage_cwgp_onhand_total',
                    type: serverWidget.FieldType.INTEGER,
                    label: 'On Hand'
                },
                QUANTITY_TESTER_TOTAL: {
                    id: 'custpage_cwgp_tester_total',
                    type: serverWidget.FieldType.INTEGER,
                    label: 'Tester'
                },
                QUANTITY_BACKBAR_TOTAL: {
                    id: 'custpage_cwgp_backbar_total',
                    type: serverWidget.FieldType.INTEGER,
                    label: 'Backbar'
                },
                QUANTITY_DAMAGE_TOTAL: {
                    id: 'custpage_cwgp_damage_total',
                    type: serverWidget.FieldType.INTEGER,
                    label: 'Damage'
                },
                QUANTITY_THEFT_TOTAL: {
                    id: 'custpage_cwgp_theft_total',
                    type: serverWidget.FieldType.INTEGER,
                    label: 'Theft'
                },
                QUANTITY_SOLD_TOTAL: {
                    id: 'custpage_cwgp_sold_total',
                    type: serverWidget.FieldType.INTEGER,
                    label: 'Quantity Sold'
                },
                QUANTITY_DISCREPANCY_TOTAL: {
                    id: 'custpage_cwgp_sold_discrepancy',
                    type: serverWidget.FieldType.INTEGER,
                    label: 'Discrepancy'
                },
                TYPE: {
                    id: 'custpage_cwgp_type',
                    type: serverWidget.FieldType.TEXT,
                    label: 'Type'
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
            arrPagedQoH,
            arrPagedDataExport,
            arrPagedDataQoHExport,
            blForReceiving,
            stApprovalStatus,
            blItermPerLocTotal
        } = options;
        let newStType = stType;

        if(blItermPerLocTotal){
            newStType = 'itemperlocationtotal'
        }
        log.debug('newStType',newStType);
        const MAP_VALUES = {
            'intercompanypo': mapIntercompanyPO,
            'itemreceipt': mapItemReceipt,
            'inventoryadjustment': mapInventoryAdjustment,
            'itemperlocation': mapItemPerLocation,
            'inventorycount': mapInventoryCount,
            'itemperlocationtotal': mapItemPerLocationTotal
        };
        const mapValues = MAP_VALUES[newStType];

        return mapValues(stUserId, stAccessType, arrPagedData, blForReceiving, stApprovalStatus,arrPagedQoH,arrPagedDataExport,arrPagedDataQoHExport);
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
            const stOperator = result.getValue({ name: 'custbody_cwgp_externalportaloperator' });

            arrMapIntercompanyPO.push({
                [_CONFIG.COLUMN.LIST.SO_INTERCOID.id]: stPairedIntercoId,
                [_CONFIG.COLUMN.LIST.TRAN_NO.id]: stViewLink,
                [_CONFIG.COLUMN.LIST.DATE.id]: stDateCreated,
                [_CONFIG.COLUMN.LIST.STATUS.id]: stStatus,
                [_CONFIG.COLUMN.LIST.PO_STATUSREF.id]: stStatusRef,
                [_CONFIG.COLUMN.LIST.OPERATOR.id]: stOperator
            });
        });

        arrFinalMapIntercoPO = getPairedIntercoStatus(intPairedIntercoIds, arrMapIntercompanyPO, blForReceiving, stApprovalStatus)

        function getPairedIntercoStatus(intPairedIntercoIds, arrMapIntercompanyPO, blForReceiving, stApprovalStatus){
            let arrPairedSOs = [];
            const ssPairedIntercoSo = search.load({ id: "customsearch_cwgp_retail_getpairedso", type: "salesorder" });

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

        return [arrFinalMapIntercoPO,null];
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
            const stOperator = result.getValue({ name: 'custbody_cwgp_externalportaloperator' });

            arrMapItemReceipt.push({
                [_CONFIG.COLUMN.LIST.TRAN_NO.id]: stViewLink,
                [_CONFIG.COLUMN.LIST.CREATED_FROM.id]: stCreatedFrom,
                [_CONFIG.COLUMN.LIST.DATE.id]: stDateCreated,
                [_CONFIG.COLUMN.LIST.OPERATOR.id]: stOperator
            })
        });

        return [arrMapItemReceipt,null];
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
            const stAdjustmentType = result.getValue({ name: 'custbody_cwgp_adjustmentsubtype' });

            arrMapInventoryAdjustment.push({
                [_CONFIG.COLUMN.LIST.TRAN_NO.id]: stViewLink,
                [_CONFIG.COLUMN.LIST.DATE.id]: stDateCreated,
                [_CONFIG.COLUMN.LIST.OPERATOR.id]: stOperator,
                [_CONFIG.COLUMN.LIST.ADJUSTMENT_TYPE.id]: stAdjustmentType == 'backbar' ? 'Backbar' : stAdjustmentType == 'standard' ? 'Standard' : 'Damage/Tester/Theft'
            })
        });

        return [arrMapInventoryAdjustment,null];
    };

    const mapInventoryCount = (stUserId, stAccessType, arrPagedData) => {
        
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
            const stUrl = `${stBaseUrl}&pageMode=view&&userId=${stUserId}&accesstype=${stAccessType}&inventoryadjustmentid=${stID}&rectype=inventorycount&tranid=${stTranId}`;
            const stViewLink = `<a href='${stUrl}'>Inventory Adjustment# ${stTranId}</a>`;
            const stSubtype = result.getValue({ name: 'custbody_cwgp_adjustmentsubtype' });
            arrMapInventoryAdjustment.push({
                [_CONFIG.COLUMN.LIST.TRAN_NO.id]: stViewLink,
                [_CONFIG.COLUMN.LIST.DATE.id]: stDateCreated,
                [_CONFIG.COLUMN.LIST.OPERATOR.id]: stOperator,
                [_CONFIG.COLUMN.LIST.TYPE.id]: stSubtype,
            })
        });

        return [arrMapInventoryAdjustment,null];
    };


    const mapItemPerLocation = (stUserId, stAccessType, arrPagedData, blForReceiving,stApprovalStatus,arrPagedQoH,arrPagedDataExport,arrPagedDataQoHExport) => {
        log.debug('mapItemPerLocation');
        log.debug('mapItemPerLocation arrPagedData', arrPagedData); 
        log.debug('mapItemPerLocation arrPagedQoH', arrPagedQoH);
        log.debug('mapItemPerLocation arrPagedDataExport', arrPagedDataExport);
        log.debug('mapItemPerLocation arrPagedDataQoHExport', arrPagedDataQoHExport);
        let arrMapItemperLocation = [];
        let arrMapItemperLocationCSV = [];
        let arrMapItemQoH = [];
        let arrMapItemQoHCSV = [];
        let arrItemList = [];
        let arrItemListCSV = [];
        let arrFinalItemPerLocation;
        let arrFinalItemPerLocationCSV;
        const keysCheck = ['custpage_cwgp_onhand','custpage_cwgp_backbar','custpage_cwgp_damage','custpage_cwgp_tester','custpage_cwgp_theft','custpage_cwgp_sold','custpage_cwgp_discrepancy'];

        if(arrPagedData){
            arrPagedData.forEach((result, index) => {
                const stItemName = result.getText({ name: 'item' , summary: 'GROUP'});
                const stItemId = result.getValue({ name: 'item' , summary: 'GROUP'});
                const stInternalSku = result.getValue({ name: 'custitem_heyday_sku', join: 'item', summary: 'GROUP' });
                const stUPCode = result.getValue({ name: 'custitemheyday_upccode', join: 'item', summary: 'GROUP' });
                const stBackbar =result.getValue(result.columns[3]);
                const stDamage = result.getValue(result.columns[4]);
                const stTester = result.getValue(result.columns[5]);
                const stTheft = result.getValue(result.columns[6]);
                const stSold = result.getValue(result.columns[7]);
                const stDiscrepancy = result.getValue(result.columns[8]);
                arrItemList.push(stItemId);
    

            
                arrMapItemperLocation.push({
                    [_CONFIG.COLUMN.LIST.NAME.id]: stItemName,
                    [_CONFIG.COLUMN.LIST.SKU.id]: stInternalSku,
                    [_CONFIG.COLUMN.LIST.UPC.id]: stUPCode,
                    [_CONFIG.COLUMN.LIST.BACKBAR.id]: stBackbar != '0' ? Math.abs(parseInt(stBackbar)) : '0',
                    [_CONFIG.COLUMN.LIST.DAMAGE.id]: stDamage != '0' ? Math.abs(parseInt(stDamage)) : '0',
                    [_CONFIG.COLUMN.LIST.TESTER.id]: stTester != '0' ? Math.abs(parseInt(stTester)) : '0',
                    [_CONFIG.COLUMN.LIST.THEFT.id]: stTheft != '0' ? Math.abs(parseInt(stTheft)) : '0',
                    [_CONFIG.COLUMN.LIST.SOLD.id]: stSold,
                    [_CONFIG.COLUMN.LIST.DISCREPANCY.id]: stDiscrepancy != 0 ? Math.abs(parseInt(stDiscrepancy)) : '0',
                })
            });

            //arrPagedDataExport.forEach((result, index) => {
            arrPagedDataExport.run().each(function(result){
                const stItemName = result.getText({ name: 'item' , summary: 'GROUP'});
                const stItemId = result.getValue({ name: 'item' , summary: 'GROUP'});
                const stInternalSku = result.getValue({ name: 'custitem_heyday_sku', join: 'item', summary: 'GROUP' });
                const stUPCode = result.getValue({ name: 'custitemheyday_upccode', join: 'item', summary: 'GROUP' });
                const stBackbar =result.getValue(result.columns[3]);
                const stDamage = result.getValue(result.columns[4]);
                const stTester = result.getValue(result.columns[5]);
                const stTheft = result.getValue(result.columns[6]);
                const stSold = result.getValue(result.columns[7]);
                const stDiscrepancy = result.getValue(result.columns[8]);
                arrItemListCSV.push(stItemId);
    

            
                arrMapItemperLocationCSV.push({
                    [_CONFIG.COLUMN.LIST.NAME.id]: stItemName,
                    [_CONFIG.COLUMN.LIST.SKU.id]: stInternalSku,
                    [_CONFIG.COLUMN.LIST.UPC.id]: stUPCode,
                    [_CONFIG.COLUMN.LIST.BACKBAR.id]: stBackbar != '0' ? Math.abs(parseInt(stBackbar)) : '0',
                    [_CONFIG.COLUMN.LIST.DAMAGE.id]: stDamage != '0' ? Math.abs(parseInt(stDamage)) : '0',
                    [_CONFIG.COLUMN.LIST.TESTER.id]: stTester != '0' ? Math.abs(parseInt(stTester)) : '0',
                    [_CONFIG.COLUMN.LIST.THEFT.id]: stTheft != '0' ? Math.abs(parseInt(stTheft)) : '0',
                    [_CONFIG.COLUMN.LIST.SOLD.id]: stSold,
                    [_CONFIG.COLUMN.LIST.DISCREPANCY.id]: stDiscrepancy != 0 ? Math.abs(parseInt(stDiscrepancy)) : '0',
                })
            });
        }

        if(arrPagedQoH){
            arrItemList = [];
            arrItemListCSV = [];
            arrPagedQoH.forEach((result, index) => {
                const stItemName = result.getText(result.columns[0]);
                const stItemId = result.getValue(result.columns[0]);
                const stOnHand = result.getValue(result.columns[1]);
                const stInternalSku = result.getValue({ name: 'custitem_heyday_sku', join: 'item', summary: 'GROUP' });
                const stUPCode = result.getValue({ name: 'custitemheyday_upccode', join: 'item', summary: 'GROUP' });
                arrItemList.push(stItemId);

                arrMapItemQoH.push({
                    [_CONFIG.COLUMN.LIST.NAME.id]: stItemName,
                    [_CONFIG.COLUMN.LIST.ON_HAND.id]: stOnHand,
                    [_CONFIG.COLUMN.LIST.SKU.id]: stInternalSku,
                    [_CONFIG.COLUMN.LIST.UPC.id]: stUPCode,
                    
                    
                })
                //arrMapItemperLocation[index][_CONFIG.COLUMN.LIST.ON_HAND.id] = stOnHand
            
            });

            //arrPagedDataQoHExport.forEach((result, index) => {
            arrPagedDataQoHExport.run().each(function(result){
                const stItemName = result.getText(result.columns[0]);
                const stItemId = result.getValue(result.columns[0]);
                const stOnHand = result.getValue(result.columns[1]);
                const stInternalSku = result.getValue({ name: 'custitem_heyday_sku', join: 'item', summary: 'GROUP' });
                const stUPCode = result.getValue({ name: 'custitemheyday_upccode', join: 'item', summary: 'GROUP' });
                arrItemListCSV.push(stItemId);

                arrMapItemQoHCSV.push({
                    [_CONFIG.COLUMN.LIST.NAME.id]: stItemName,
                    [_CONFIG.COLUMN.LIST.ON_HAND.id]: stOnHand,
                    [_CONFIG.COLUMN.LIST.SKU.id]: stInternalSku,
                    [_CONFIG.COLUMN.LIST.UPC.id]: stUPCode,
                    
                    
                })
                //arrMapItemperLocation[index][_CONFIG.COLUMN.LIST.ON_HAND.id] = stOnHand
            
            });
        }

        log.debug('arrItemList',arrItemList);

        if(arrMapItemperLocation && arrMapItemQoH){
            log.debug('arrMapItemperLocation',arrMapItemperLocation);
            log.debug('arrMapItemQoH',arrMapItemQoH);
            let map = new Map();
            arrMapItemperLocation.forEach(item => map.set(item.custpage_cwgp_name, item));
            arrMapItemQoH.forEach(item => map.set(item.custpage_cwgp_name, {...map.get(item.custpage_cwgp_name), ...item}));
            arrFinalItemPerLocation = Array.from(map.values());


            arrFinalItemPerLocation.forEach((element,index) => {
                for(let x = 0; x < keysCheck.length; x++){
                    if(!element.hasOwnProperty(keysCheck[x])){
                       // log.debug(keysCheck[x]);
                        arrFinalItemPerLocation[index][keysCheck[x]] = "0";
                       // log.debug(arrFinalItemPerLocation[index][keysCheck[x]]);
                    }
                }
            });

            arrMapItemperLocationCSV .forEach(item => map.set(item.custpage_cwgp_name, item));
            arrMapItemQoHCSV .forEach(item => map.set(item.custpage_cwgp_name, {...map.get(item.custpage_cwgp_name), ...item}));
            arrFinalItemPerLocationCSV = Array.from(map.values());

            arrFinalItemPerLocationCSV.forEach((element,index) => {
                for(let x = 0; x < keysCheck.length; x++){
                    if(!element.hasOwnProperty(keysCheck[x])){
                       // log.debug(keysCheck[x]);
                       arrFinalItemPerLocationCSV[index][keysCheck[x]] = "0";
                       // log.debug(arrFinalItemPerLocation[index][keysCheck[x]]);
                    }
                }
            });


        }else if(arrMapItemperLocation){
            arrFinalItemPerLocation = arrMapItemperLocation;
            arrFinalItemPerLocation.forEach((element,index) => {
                for(let x = 0; x < keysCheck.length; x++){
                    if(!element.hasOwnProperty(keysCheck[x])){
                       // log.debug(keysCheck[x]);
                        arrFinalItemPerLocation[index][keysCheck[x]] = "0";
                       // log.debug(arrFinalItemPerLocation[index][keysCheck[x]]);
                    }
                }
            });

            arrFinalItemPerLocationCSV = arrMapItemperLocationCSV;
            arrFinalItemPerLocationCSV.forEach((element,index) => {
                for(let x = 0; x < keysCheck.length; x++){
                    if(!element.hasOwnProperty(keysCheck[x])){
                       // log.debug(keysCheck[x]);
                       arrFinalItemPerLocationCSV[index][keysCheck[x]] = "0";
                       // log.debug(arrFinalItemPerLocation[index][keysCheck[x]]);
                    }
                }
            });
        }
        else if(arrMapItemQoH){
            arrFinalItemPerLocation = arrMapItemQoH;
            arrFinalItemPerLocation.forEach((element,index) => {
                for(let x = 0; x < keysCheck.length; x++){
                    if(!element.hasOwnProperty(keysCheck[x])){
                       // log.debug(keysCheck[x]);
                        arrFinalItemPerLocation[index][keysCheck[x]] = "0";
                      //  log.debug(arrFinalItemPerLocation[index][keysCheck[x]]);
                    }
                }
            });

            arrFinalItemPerLocationCSV = arrMapItemQoH;
            arrFinalItemPerLocationCSV.forEach((element,index) => {
                for(let x = 0; x < keysCheck.length; x++){
                    if(!element.hasOwnProperty(keysCheck[x])){
                       // log.debug(keysCheck[x]);
                       arrFinalItemPerLocationCSV[index][keysCheck[x]] = "0";
                      //  log.debug(arrFinalItemPerLocation[index][keysCheck[x]]);
                    }
                }
            });
        }

              
        if(arrItemList.length > 0){
            let index = 0;
            var itemSearchObj = search.create({
                type: "item",
                filters:
                [
                ["internalid","anyof",arrItemList],
                "AND", 
                ["pricing.pricelevel","anyof","6"]
                ],
                columns:
                [
                search.createColumn({
                    name: "itemid",
                    sort: search.Sort.ASC,
                    label: "Name"
                }),
                search.createColumn({
                    name: "formulanumeric",
                    formula: "case when {pricing.pricelevel}='Franchise Price' then {pricing.unitprice} else 0 END",
                    label: "Formula (Numeric)"
                })
                ]
            });
            var searchResultCount = itemSearchObj.runPaged().count;
           
            let tempEstCostPerUnit = 0;
            itemSearchObj.run().each(function(result){
                arrFinalItemPerLocation[index]['custpage_cwgp_estimatedcostperunit'] = result.getValue(result.columns[1]) || 0.00;
                tempEstCostPerUnit= result.getValue(result.columns[1]) || 0;
                arrFinalItemPerLocation[index]['custpage_cwgp_totalestimatedvalue'] = (parseFloat(tempEstCostPerUnit)*parseFloat(arrFinalItemPerLocation[index]['custpage_cwgp_onhand'])).toFixed(2);
                index++;
                return true;
            });
        }

        if(arrItemListCSV.length > 0){
            let index = 0;
            var itemSearchObj = search.create({
                type: "item",
                filters:
                [
                ["internalid","anyof",arrItemList],
                "AND", 
                ["pricing.pricelevel","anyof","6"]
                ],
                columns:
                [
                search.createColumn({
                    name: "itemid",
                    sort: search.Sort.ASC,
                    label: "Name"
                }),
                search.createColumn({
                    name: "formulanumeric",
                    formula: "case when {pricing.pricelevel}='Franchise Price' then {pricing.unitprice} else 0 END",
                    label: "Formula (Numeric)"
                })
                ]
            });
            var searchResultCount = itemSearchObj.runPaged().count;
           
            let tempEstCostPerUnit = 0;
            itemSearchObj.run().each(function(result){
                arrFinalItemPerLocationCSV [index]['custpage_cwgp_estimatedcostperunit'] = result.getValue(result.columns[1]) || 0.00;
                tempEstCostPerUnit= result.getValue(result.columns[1]) || 0;
                arrFinalItemPerLocationCSV [index]['custpage_cwgp_totalestimatedvalue'] = (parseFloat(tempEstCostPerUnit)*parseFloat(arrFinalItemPerLocation[index]['custpage_cwgp_onhand'])).toFixed(2);
                index++;
                return true;
            });
        }

       /* let fileObj = file.create({
            name: 'arrFinalItemPerLocation.txt',
            fileType: file.Type.PLAINTEXT,
            contents: JSON.stringify(arrFinalItemPerLocation)
        });
    
        fileObj.folder = -15;
    
        // Save the file
        fileObj.save();*/

        log.debug('arrFinalItemPerLocation',arrFinalItemPerLocation);
        log.debug('arrFinalItemPerLocationCSV',arrFinalItemPerLocationCSV);

        return [arrFinalItemPerLocation,arrFinalItemPerLocationCSV];
    };

    const mapItemPerLocationTotal = (stUserId, stAccessType, arrPagedData, blForReceiving,stApprovalStatus,arrPagedQoH) => {
        log.debug('mapItemPerLocationTotal',arrPagedData);
        let arrMapItemperLocation= [];
        let arrMapItemQoH = [];
        let intOnHand = 0;
        let intBackbar = 0;
        let intDamage = 0;
        let intTester = 0;
        let intTheft = 0;
        let intQuantitySold = 0;
        let intDiscrepancyTotal = 0;

        arrPagedData.forEach((result, index) => {
             intBackbar = result.getValue(result.columns[0]) || 0;
             intDamage = result.getValue(result.columns[1]) || 0;
             intTester = result.getValue(result.columns[3]) || 0;
             intTheft = result.getValue(result.columns[2]) || 0;
             intQuantitySold = result.getValue(result.columns[4]) || 0;
             intDiscrepancyTotal = result.getValue(result.columns[5]) || 0;
        });

        log.debug('intbackbar',intBackbar);

        arrMapItemperLocation.push({
            [_CONFIG.COLUMN.LIST.QUANTITY_TESTER_TOTAL.id]: Math.abs(parseInt(intTester)).toFixed(0),
            [_CONFIG.COLUMN.LIST.QUANTITY_BACKBAR_TOTAL.id]: Math.abs(parseInt(intBackbar)).toFixed(0),
            [_CONFIG.COLUMN.LIST.QUANTITY_DAMAGE_TOTAL.id]: Math.abs(parseInt(intDamage)).toFixed(0),
            [_CONFIG.COLUMN.LIST.QUANTITY_THEFT_TOTAL.id]: Math.abs(parseInt(intTheft)).toFixed(0),
            [_CONFIG.COLUMN.LIST.QUANTITY_SOLD_TOTAL.id]: Math.abs(parseInt(intQuantitySold)).toFixed(0),
            [_CONFIG.COLUMN.LIST.QUANTITY_DISCREPANCY_TOTAL.id]: Math.abs(parseInt(intDiscrepancyTotal)).toFixed(0)
        })

        arrPagedQoH.forEach((result, index) => {
            intOnHand = parseInt(result.getValue(result.columns[0]));
        });

        arrMapItemperLocation[0]['custpage_cwgp_onhand_total'] = intOnHand || 0;

        log.debug('mapItemPerLocationTotal',arrMapItemperLocation);

        return [arrMapItemperLocation,null];
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
        else if(stSubType == 'backbar'){
            stTypes = [2];
        }
        else{
            stTypes = [1,2,3,4,5,6];
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
                })).toFixed(0),
                custpage_cwgp_quantity: parseInt(objItemReceipt.getSublistValue({
                    sublistId: 'item',
                    fieldId: 'quantity',
                    line: x
                })).toFixed(0),
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
                })).toFixed(0),
                custpage_cwgp_shippedquantityhidden: parseInt(objItemReceipt.getSublistValue({
                    sublistId: 'item',
                    fieldId: 'custcol_cwgp_shippedquantity',
                    line: x
                })).toFixed(0),
                custpage_cwgp_startingquantity: parseInt(objItemReceipt.getSublistValue({
                    sublistId: 'item',
                    fieldId: 'onhand',
                    line: x
                })).toFixed(0),
                custpage_cwgp_startingquantityhidden: parseInt(objItemReceipt.getSublistValue({
                    sublistId: 'item',
                    fieldId: 'onhand',
                    line: x
                })).toFixed(0),
                custpage_cwgp_quantityremaining: parseInt(objItemReceipt.getSublistValue({
                    sublistId: 'item',
                    fieldId: 'quantityremaining',
                    line: x
                })).toFixed(0),
                custpage_cwgp_quantityremaininghidden: parseInt(objItemReceipt.getSublistValue({
                    sublistId: 'item',
                    fieldId: 'quantityremaining',
                    line: x
                })).toFixed(0),
                custpage_cwgp_variance: parseInt(objItemReceipt.getSublistValue({
                    sublistId: 'item',
                    fieldId: 'custcol_cwgp_shippedquantity',
                    line: x
                })).toFixed(0),
                custpage_cwgp_quantity: 0,
                custpage_cwgp_damagedquantity: 0,
                custpage_cwgp_rate: objItemReceipt.getSublistValue({
                    sublistId: 'item',
                    fieldId: 'rate',
                    line: x
                }),
                
                
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

    const mapInventoryAdjustmentValues = (stPoId,stSubType) => {
        let objPO = {
            body: {},
            item: []
        };
        let objItemSummary;
        let objDiscrepancySummary;
        let subType;
        let intAdjQtyBy;
        let stDateTime;
        let intIcFinalQty;
        let intNewQty;

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
            stTextAreaVal+= '<tr><td style="font-weight: bold;padding:3px">Type</td><td style="font-weight: bold;padding:3px">Quantity</td><td style="font-weight: bold;padding:3px">Total Estimated Replacement Value</td>';
            for(let x = 0; x < objItemSummary.length; x++){
                let totalEstRepVal = objItemSummary[x].totalEstRepVal || 0;
                stTextAreaVal+= '<tr><td style="padding:3px">'+ objItemSummary[x].Id+'</td><td style="padding:3px">'+objItemSummary[x].intQty+'</td><td>'+totalEstRepVal.toFixed(2)+'</td></tr>';
            }
            stTextAreaVal += '</div></table>'

            objPO.body.custpage_cwgp_totaladjustment = stTextAreaVal;
        }

        objDiscrepancySummary = objInventoryAdjustment.getText('custbody_cwgp_totaldiscrepancy');

        if(stSubType == 'inventorycount'){
            objPO.body.custpage_cwgp_totaladjustment = Math.abs(parseInt(objDiscrepancySummary));
        }
        else if(objDiscrepancySummary){
            let stTextAreaVal = '';

            stTextAreaVal += '<div><br><table style="width:100%; border-collapse: collapse" border="1px solid black" ">'
            stTextAreaVal+= '<tr><td style="font-weight: bold;padding:3px">Total Discrepancy</td></tr>';
            stTextAreaVal+= '<tr><td style="padding:3px">'+ objDiscrepancySummary+'</td></tr>';
            stTextAreaVal += '</table></div><br>'

            objPO.body.custpage_cwgp_totaladjustment = stTextAreaVal;
        }

        const intLineCount = objInventoryAdjustment.getLineCount('inventory');

        for(var x = 0; x < intLineCount; x++){
            stDateTime = objInventoryAdjustment.getSublistValue({
                sublistId: 'inventory',
                fieldId: 'custcol_cwgp_datetime',
                line: x
            });

            intAdjQtyBy = parseInt(objInventoryAdjustment.getSublistValue({
                sublistId: 'inventory',
                fieldId: 'adjustqtyby',
                line: x
            })) || 0

            intIcFinalQty = objInventoryAdjustment.getSublistValue({
                sublistId: 'inventory',
                fieldId: 'custcol_cwgp_enteredcountfinalqty',
                line: x
            });

            intNewQty = parseInt(objInventoryAdjustment.getSublistValue({
                sublistId: 'inventory',
                fieldId: 'newquantity',
                line: x
            })) || 0.00

            
            if(stDateTime){
                stDateTime = format.format({value: new Date(stDateTime), type: format.Type.DATETIMETZ})
            }

            if(subType != 'standard' && subType){
                intAdjQtyBy = Math.abs(intAdjQtyBy);
            }

            if(subType == 'inventorycount'){
                intIcFinalQty = intNewQty
            }

            objPO.item.push({
                custpage_cwgp_icfinalqty: intIcFinalQty,
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
                custpage_cwgp_finalqty: intAdjQtyBy,
                custpage_cwgp_discrepancy:  objInventoryAdjustment.getSublistValue({
                    sublistId: 'inventory',
                    fieldId: 'custcol_cwgp_discrepancy',
                    line: x
                }),
                custpage_cwgp_enteredcount:  objInventoryAdjustment.getSublistValue({
                    sublistId: 'inventory',
                    fieldId: 'custcol_cwgp_enteredcountfinalqty',
                    line: x
                }),
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
                    let tempVal = value || 0;
                    sbl.setSublistValue({
                        id: fieldId,
                        line: i,
                        value: parseInt(tempVal).toFixed(0)
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

    const buildInventoryCountItemSearch = (stLocation,stSubsidiary) => {
        const ssInventoryCountItem = search.load({ id: "customsearch_cwgp_retail_icitemsearch", type: "item" });
        let arrInventoryCountItem = [];

        ssInventoryCountItem.filters.push(search.createFilter({
            name: 'inventorylocation',
            operator: 'anyof',
            values: stLocation,
        }));

        ssInventoryCountItem.filters.push(search.createFilter({
            name: 'subsidiary',
            operator: 'anyof',
            values: stSubsidiary,
        }));


        var searchResultCount = ssInventoryCountItem.runPaged().count;
        log.debug('buildInventoryCountItemSearch count', searchResultCount);

        ssInventoryCountItem.run().each(function(result){
            if(result.getValue(result.columns[4]) == 0){
                arrInventoryCountItem.push({
                    custpage_cwgp_item: result.getValue({name: "itemid"}),
                    custpage_cwgp_description: result.getValue({name: "purchasedescription"}),
                    custpage_cwgp_internalsku: result.getValue({name: "custitem_heyday_sku"}),
                    custpage_cwgp_upccode: result.getValue({name: "custitemheyday_upccode"}),
                    custpage_cwgp_adjustqtyby: result.getValue(result.columns[4])
                });			
            }
            return true;	
        })


        return arrInventoryCountItem;
    };

    const createICLineBackupFile = (stOperator, stStep,rec) => {

        let headers = 'Item,UPC,SKU,First Count';
        let stSublistName = 'custpage_inventoryadjustmentinventorycount_items';
        //var d = new Date().toLocaleDateString();
        var d = getTimeStamp();
        var csvFile = file.create({
            name: stOperator+'_step'+stStep+'_'+d+'.csv',
            fileType: file.Type.CSV,
            //contents: lines,
            folder: 821
        });

        if(stStep == 1){
            csvFile.appendLine({
                value: headers
            });
            
        }
        else if(stStep == 2){
            csvFile.appendLine({
                value: headers+',Second Count'
            });
        }
        else if(stStep == 3){
            csvFile.appendLine({
                value: headers+',Second Count,Entered QTY,Starting Qty,Discrepacy,Adjustment Reason'
            });
        }

        var numLines = rec.getLineCount({
            group: stSublistName
        });
        log.debug('numLines', numLines);
        for(var i=0; i<numLines; i++){
            var line = '';
            var stItem = rec.getSublistValue({
                group: stSublistName,
                name: 'custpage_cwgp_item',
                line: i
            });
            line += stItem+',';
            var stUpc = rec.getSublistValue({
                group: stSublistName,
                name: 'custpage_cwgp_upccode',
                line: i
            });
            line += stUpc+',';
            var stSku = rec.getSublistValue({
                group: stSublistName,
                name: 'custpage_cwgp_internalsku',
                line: i
            });
            line += stSku+',';
            var inFirstCount = rec.getSublistValue({
                group: stSublistName,
                name: 'custpage_cwgp_firstcount',
                line: i
            }) || '';
            line += inFirstCount;
            
            if(stStep == 2 || stStep == 3){
                var inSecondCount = rec.getSublistValue({
                    group: stSublistName,
                    name: 'custpage_cwgp_secondcount',
                    line: i
                }) || '';
                line += ','+inSecondCount;
            }
            if(stStep == 3){
                var inEnteredQty = rec.getSublistValue({
                    group: stSublistName,
                    name: 'custpage_cwgp_enteredquantity',
                    line: i
                }) || 0;
                line += ','+inEnteredQty;
                var inStartingQty = rec.getSublistValue({
                    group: stSublistName,
                    name: 'custpage_cwgp_qtyonhand',
                    line: i
                });
                line += ','+inStartingQty;
                var inDiscrepancy = rec.getSublistValue({
                    group: stSublistName,
                    name: 'custpage_cwgp_discrepancy',
                    line: i
                });
                line += ','+inDiscrepancy;
                var stAdjustmentReason = rec.getSublistValue({
                    group: stSublistName,
                    name: 'custpage_cwgp_adjustmentreason',
                    line: i
                }) || '';
                line += ','+stAdjustmentReason;
            }
            
            csvFile.appendLine({
                value: line
            });
        }

        var fileId = csvFile.save();

    };

    const getTimeStamp = () => {
        var date = new Date();
        var aaaa = date.getUTCFullYear();
        var gg = date.getUTCDate();
        var mm = (date.getUTCMonth() + 1);
    
        if (gg < 10)
            gg = "0" + gg;
    
        if (mm < 10)
            mm = "0" + mm;
    
        var cur_day = aaaa + "-" + mm + "-" + gg;
    
        var hours = date.getUTCHours()
        var minutes = date.getUTCMinutes()
        var seconds = date.getUTCSeconds();
    
        if (hours < 10)
            hours = "0" + hours;
    
        if (minutes < 10)
            minutes = "0" + minutes;
    
        if (seconds < 10)
            seconds = "0" + seconds;
    
        return cur_day + "-" + hours + ":" + minutes + ":" + seconds;

    };
	
	const getInventoryCountDraft = (stId) => {
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
                    search.createColumn({ name: 'custrecord_cwgp_ricdraft' }),
                    search.createColumn({ name: 'custrecord_cwgp_ricdraftstep' }),
                    search.createColumn({ name: 'custrecord_cwgp_bbicdraft' }),
                    search.createColumn({ name: 'custrecord_cwgp_bbicdraftstep' })
                ]
        }).run().getRange({
            start: 0,
            end: 1
        });

        if (ssCredentials.length > 0) {
            const objDraft = {
                stDraftRetail: ssCredentials[0].getValue({ name: 'custrecord_cwgp_ricdraft' }),
                stStepRetail: ssCredentials[0].getValue({ name: 'custrecord_cwgp_ricdraftstep' }),
                stDraftBackbar: ssCredentials[0].getValue({ name: 'custrecord_cwgp_bbicdraft' }),
                stStepBackbar: ssCredentials[0].getValue({ name: 'custrecord_cwgp_bbicdraftstep' })
            };
            return objDraft;
        }
        
        return false;
    };


    

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
        setDeliverByDate,
        buildInventoryCountItemSearch,
        createICLineBackupFile,
		getInventoryCountDraft
    }
});