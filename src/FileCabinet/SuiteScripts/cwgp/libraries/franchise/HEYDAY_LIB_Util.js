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

define(['N/ui/serverWidget', 'N/search', 'N/util', 'N/record', 'N/url', '../HEYDAY_LIB_ExternalPortal'], (serverWidget, search, util, record, url, EPLib) => {
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
            'franchisepo': mapFranchisePO,
            'itemreceipt': mapItemReceipt,
            'inventoryadjustment': mapInventoryAdjustment
        };
        const mapValues = MAP_VALUES[stType];

        return mapValues(stUserId, stAccessType, arrPagedData);
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
            const stDocumentStatus = result.getValue({ name: 'statusref' });
            const stID = result.id;
            const stTranId = result.getValue({ name: 'tranid' });
            const stUrl = `${stBaseUrl}&pageMode=view&&userId=${stUserId}&accesstype=${stAccessType}&poid=${stID}&rectype=franchisepo`;
            const stViewLink = `<a href='${stUrl}'>Purchase Order # ${stID}</a>`;
            let arrForReceivingStatuses = ["pendingBilling","pendingBillingPartFulfilled","partiallyFulfilled"];
            let stForReceiving = 1;
            if(arrForReceivingStatuses.indexOf(stDocumentStatus) != -1 && stStatus == 3){
                stForReceiving = 2;
            }
            
            arrMapIntercompanyPO.push({
                [_CONFIG.COLUMN.LIST.TRAN_NO.id]: stViewLink,
                [_CONFIG.COLUMN.LIST.DATE.id]: stDateCreated,
                [_CONFIG.COLUMN.LIST.STATUS.id]: stStatus,
                [_CONFIG.COLUMN.LIST.FOR_RECEiVING.id]: stForReceiving,
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
            const stID = result.id;
            const stUrl =  `${stBaseUrl}&pageMode=view&&userId=${stUserId}&accesstype=${stAccessType}&poid=${stID}&rectype=itemreceipt`;
            const stViewLink = `<a href='${stUrl}'>Item Receipt# ${stID}</a>`;
            arrMapIntercompanyPO.push({
                [_CONFIG.COLUMN.LIST.TRAN_NO.id]: stViewLink,
                [_CONFIG.COLUMN.LIST.DATE.id]: stDate,
                [_CONFIG.COLUMN.LIST.CUSTOMER.id]: stCustomer
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
            arrMapIntercompanyPO.push({
                [_CONFIG.COLUMN.LIST.TRAN_NO.id]: stViewLink,
                [_CONFIG.COLUMN.LIST.DATE.id]: stDate,
                [_CONFIG.COLUMN.LIST.CUSTOMER.id]: stCustomer
            })
        });
        return arrMapIntercompanyPO;
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
                    search.createColumn({ name: 'salesdescription', join: 'item' })
                ]
        }).run().each((result) => {
            const stMainLine = result.getValue({ name: 'mainline' });

            if (stMainLine == '*') {
                objPO.body.custpage_cwgp_customer = result.getValue({ name: 'entity' });
                objPO.body.custpage_cwgp_memomain = result.getValue({ name: 'memomain' });
                objPO.body.custpage_cwgp_date = result.getValue({ name: 'trandate' });
                objPO.body.custpage_cwgp_deliverbydate = result.getValue({ name: 'shipdate' });
                objPO.body.custpage_cwgp_subsidiary = result.getValue({ name: 'subsidiary' });
                objPO.body.custpage_cwgp_location = result.getValue({ name: 'location' });
                objPO.body.custpage_cwgp_orderno = stPoId;
            } else {
                objPO.item.push({
                    custpage_cwgp_itemid: result.getValue({ name: 'item' }),
                    custpage_cwgp_item: result.getValue({ name: 'item' }),
                    custpage_cwgp_description: result.getValue({ name: 'salesdescription', join: 'item' }),
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
                    search.createColumn({ name: 'memo' }),
                    search.createColumn({ name: 'quantity' }),
                    search.createColumn({ name: 'rate' }),
                    search.createColumn({ name: 'amount' }),
                    search.createColumn({ name: 'tranid' }),
                    search.createColumn({name: "custcol_cwgp_remaining"}),
                    search.createColumn({name: "lineuniquekey"}),
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
                custpage_cwgp_description: result.getValue({ name: 'salesdescription', join: 'item' }),
                custpage_cwgp_quantityremaining: result.getValue({ name: 'custcol_cwgp_remaining' }),
                custpage_cwgp_quantitystarting: String(qtyOnhand),
                custpage_cwgp_quantityfinal: String(qtyOnhand),
                custpage_cwgp_quantity: '0',
                custpage_cwgp_quantitydamaged: '0',
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
               search.createColumn({name: "custrecord_cwgp_ftl_damagedqty", label: "Quantity Damaged"})
            ]
         });
        franchiseIRLineSearch.run().each(function(result){
        	objPO.item.push({
        		custpage_cwgp_id: result.id,
                custpage_cwgp_item: result.getValue({ name: 'custrecord_cwgp_ftl_item' }),
                custpage_cwgp_quantity: result.getValue({ name: 'custrecord_cwgp_ftl_receivedqty' }),
                custpage_cwgp_quantitydamaged: result.getValue({ name: 'custrecord_cwgp_ftl_receivedqty' }),
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
        
        var franchiseIRLineSearch = search.create({
        	   type: "customrecord_cwgp_franchiseinvadjline",
        	   filters:
        	   [
        	      ["custrecord_cwgp_fial_invadj","anyof",stPoId]
        	   ],
        	   columns:
        	   [
        	      search.createColumn({
        	         name: "id",
        	         sort: search.Sort.ASC,
        	         label: "ID"
        	      }),
        	      search.createColumn({name: "custrecord_cwgp_fial_item"}),
        	      search.createColumn({name: "custrecord_cwgp_fial_adjqty"})
        	   ]
        	});
        franchiseIRLineSearch.run().each(function(result){
        	objPO.item.push({
        		custpage_cwgp_id: result.id,
                custpage_cwgp_item: result.getValue({ name: 'custrecord_cwgp_fial_item' }),
                custpage_cwgp_adjustqtyby: result.getValue({ name: 'custrecord_cwgp_fial_adjqty' })
            });
        	   // .run().each has a limit of 4,000 results
    	   return true;
    	});        

        return objPO;
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

    const processScannerInput = (options) => {
        const {
            strScannerInput
        } = options;
        let arrItemUpcCodes = strScannerInput.split(' ');
        let arrItemLines = [];
        let intLineCount = 0;
        for(var ii = 0; ii < arrItemUpcCodes.length; ii++){ 
            let intItemUpcCode = arrItemUpcCodes[ii];
            
            const checkIfExisting = (objItemLine) => intItemUpcCode == objItemLine.upc_code;

            let objItemLine = arrItemLines.find(checkIfExisting);

            if(objItemLine){
                objItemLine.qty++;
            }
            else{
                arrItemLines.push({
                    upc_code    : intItemUpcCode,
                    qty         : 1
                })
            }
            

            // //increment quantity based on scanned input
            // if(!(objItemLines.hasOwnProperty(intItemUpcCode))){
            //     objItemLines[intItemUpcCode] = {linenum: intLineCount, qty: 1};
            //     intLineCount++;
            // }
            // else{
            //     objItemLines[intItemUpcCode]?.qty++;
            // }
        }

        return arrItemLines;
    }

    const addScannedItemsToLines = (options) => {
        const {
            strUpcMap,
            strScannerInput,
            strPageType
        } = options
        let objUpcToItemIdMap = JSON.parse(strUpcMap);
        let arrItemLines = processScannerInput({strScannerInput})

        let arrFailedIndices = [];

        for(var ii = 0; ii < arrItemLines.length; ii++){
            
            let objCurrItemLine = arrItemLines[ii]
            //{upc_code: 12345, qty: 5}

            try{
                currentRecord.selectNewLine({
                    sublistId   : 'custpage_interpo_items',
                })
                currentRecord.setCurrentSublistValue({
                    sublistId   : 'custpage_interpo_items',
                    fieldId     : 'item',
                    value       : objUpcToItemIdMap[objCurrItemLine.upc_code]
                });
                
                currentRecord.setCurrentSublistValue({
                    sublistId   : 'custpage_interpo_items',
                    fieldId     : 'quantity',
                    value       : objCurrItemLine.qty
                });
                currentRecord.commitLine({
                    sublistId   : 'custpage_interpo_items'
                })

            }
            catch(e){
                arrFailedIndices.push[ii]
            }

        }

        //Get array of lines that failed
        let arrRemainingLines = arrItemLines.filter((element, index) => arrFailedIndices.includes(index))

        if(arrRemainingLines.length > 0){
            var strFailedCodes = generateFailedScannerString({arrRemainingLines})
            
            currentRecord.setFieldValue({
                id      : 'custpage_cwgp_scanupccodes',
                value   : strFailedCodes
            })
        }
    }

    const generateFailedScannerString = (options) => {
        const {
            arrRemainingLines
        } = options;
        
        let strFailedCodes = '';

        for(var ii = 0 ; ii < arrRemainingLines.length; ii++){
            let objCurrLine = arrRemainingLines[ii]
            for(var jj = 0; jj < objCurrLine.qty; jj++){
                strFailedCodes += objCurrLine.upc_code
                if(jj < objCurrLine.qty - 1){
                    strFailedCodes += ' '
                }
            }
            if(ii < arrRemainingLines.length - 1){
                strFailedCodes += ' '
            }
        }


        return strFailedCodes;
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
        processScannerInput,
        franchisePOReceivable,
        mapItemReceipt,
        mapInventoryAdjustment,
        addScannedItemsToLines,
        generateFailedScannerString,
        mapIRValuesViewEdit,
        mapInvAdjValues,
        setSublistValues,
        addOptionsFranchiseApprovalStatus,
        addOptionsForReceiving
    }
});

