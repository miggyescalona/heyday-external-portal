/**
 * Author: Patricia Naguit
 * Date: 2022-12-07
 *
 * Date         Modified By            Notes
 * 2022-12-07   Patricia Naguit        Initial File Creation
 */

/**
 * @NApiVersion 2.1
 * @NScriptType Suitelet
 */

define([
    'N/search',
    'N/redirect',
    '../libraries/HEYDAY_LIB_ListPage.js',
    '../libraries/HEYDAY_LIB_CreatePage.js',
    '../libraries/HEYDAY_LIB_ViewPage.js',
    '../libraries/HEYDAY_LIB_EditPage.js',
    '../libraries/HEYDAY_LIB_RetailInterPO.js',
    '../libraries/HEYDAY_LIB_ExternalPortal'
], (search, redirect, listPage, createPage, viewPage, editPage, txnLib, EPLib) => {
    const _CONFIG = {
        RECORD: {
            CREDENTIALS: 'customrecord_cwgp_externalsl_creds'
        },
        SCRIPT: {
            ID: 'customscript_cwgp_sl_retailpages',
            DEPLOY: 'customdeploy_cwgp_sl_retailpages'
        }
    };
    /**
     * Definition of the Suitelet script trigger point.
     *
     * @param {Object} context
     */
    const onRequest = (context) => {
        const { request, response } = context;
        try {
            const {
                rectype: rectype
            } = request.parameters;

            log.debug('params',request.parameters);
    
            if (request.method === 'GET') {
                switch (rectype) {
                    case 'intercompanypo':
                        renderIntercompanyPO(request, response);
                        break;
                    case 'itemreceipt':
                        renderItemReceipt(request, response);
                        break;
                    case 'inventoryadjustment':
                        renderInventoryAdjustment(request, response);
                        break;
                    case 'itemperlocation':
                        renderItemPerLocation(request, response);
                        break;
                    default:
                        throw 'Page Not Found';
                }
            } else {
                handleIntercompanyPOTxn(request);
            }
        } catch (error) {
            log.error('ERROR', error);

            throw error.message;
        }
    };

    const renderIntercompanyPO = (request, response) => {
        const {
            pageMode: stPageMode,
            userId: stUserId,
            poid: stPoId,
            accesstype: stAccessType,
            tranid: stTranId
        } = request.parameters;

        log.debug('interco params',request.parameters);
        const stSubsidiary = getSubsidiary(stUserId);
        const stLocation = getLocation(stUserId);
        const objIntercompanyPOSearch = buildIntercompanyPOSearch(stSubsidiary);

        switch (stPageMode) {
            case 'list':
                listPage.render({
                    request,
                    response,
                    stType: 'intercompanypo',
                    stAccessType,
                    stUserId,
                    objSearch: objIntercompanyPOSearch
                });

                break;
            case 'create':
                createPage.render({
                    response,
                    stType: 'intercompanypo',
                    stSubsidiary,
                    stLocation,
                    stPageMode,
                    stUserId,
                    stAccessType
                });

                break;
            case 'view':
                viewPage.render({
                    response,
                    stType: 'intercompanypo',
                    stPageMode,
                    stUserId,
                    stPoId,
                    stAccessType,
                    stTranId
                });

                break;
            case 'edit':
                editPage.render({
                    response,
                    stType: 'intercompanypo',
                    stSubsidiary,
                    stPageMode,
                    stUserId,
                    stPoId,
                    stAccessType,
                    stTranId
                });
                break;
            default:
                throw 'Page Not Found';
        }
    };

    const renderItemReceipt = (request, response) => {
        const {
            pageMode: stPageMode,
            userId: stUserId,
            itemreceiptid: stPoId,
            accesstype: stAccessType,
            tranid: stTranId
        } = request.parameters;

        log.debug('ir params',request.parameters);
        const stSubsidiary = getSubsidiary(stUserId);
        const objItemReceiptSearch = buildItemReceiptSearch(stSubsidiary);

        switch (stPageMode) {
            case 'list':
                listPage.renderItemReceipt({
                    request,
                    response,
                    stType: 'itemreceipt',
                    stAccessType,
                    stUserId,
                    objSearch: objItemReceiptSearch
                });

                break;
            case 'create':
                createPage.renderItemReceipt({
                    response,
                    stType: 'itemreceipt',
                    stSubsidiary,
                    stPageMode,
                    stUserId,
                    stPoId,
                    stTranId,
                    stAccessType
                });

                break;
            case 'view':
                viewPage.renderItemReceipt({
                    response,
                    stType: 'itemreceipt',
                    stPageMode,
                    stUserId,
                    stPoId,
                    stAccessType,
                    stTranId
                });

                break;
            case 'edit':
                editPage.renderItemReceipt({
                    response,
                    stType: 'itemreceipt',
                    stSubsidiary,
                    stPageMode,
                    stUserId,
                    stPoId,
                    stAccessType,
                    stTranId
                });
                break;
            default:
                throw 'Page Not Found';
        }
    };

    const renderInventoryAdjustment = (request, response) => {
        const {
            pageMode: stPageMode,
            userId: stUserId,
            inventoryadjustmentid: stPoId,
            accesstype: stAccessType,
            tranid: stTranId
        } = request.parameters;

        log.debug('ia params',request.parameters);
        const stSubsidiary = getSubsidiary(stUserId);
        const stLocation = getLocation(stUserId);
        const objInventoryAdjustmentSearch = buildInventoryAdjustmentSearch(stSubsidiary);

        switch (stPageMode) {
            case 'list':
                listPage.renderInventoryAdjustment({
                    request,
                    response,
                    stSubsidiary,
                    stType: 'inventoryadjustment',
                    stAccessType,
                    stUserId,
                    objSearch: objInventoryAdjustmentSearch
                });

                break;
            case 'create':
                createPage.renderInventoryAdjustment({
                    response,
                    stType: 'inventoryadjustment',
                    stSubsidiary,
                    stLocation,
                    stPageMode,
                    stUserId,
                    stPoId,
                    stAccessType
                });

                break;
            case 'view':
                viewPage.renderInventoryAdjustment({
                    response,
                    stType: 'inventoryadjustment',
                    stPageMode,
                    stUserId,
                    stPoId,
                    stAccessType,
                    stTranId
                });

                break;
            case 'edit':
                editPage.renderInventoryAdjustment({
                    response,
                    stType: 'inventoryadjustment',
                    stSubsidiary,
                    stPageMode,
                    stUserId,
                    stPoId,
                    stAccessType,
                    stTranId
                });
                break;
            default:
                throw 'Page Not Found';
        }
    };

    const renderItemPerLocation = (request, response) => {
        const {
            userId: stUserId,
            accesstype: stAccessType,
        } = request.parameters;

        log.debug('itemp per loc params',request.parameters);
        const stLocation = getLocation(stUserId);
        const objItemPerLocationSearch = buildItemPerLocationSearch(stLocation);

        listPage.renderItemPerLocation({
            request,
            response,
            stType: 'itemperlocation',
            stAccessType,
            stUserId,
            objSearch: objItemPerLocationSearch
        });
    };


    const handleIntercompanyPOTxn = (request) => {
        log.debug('params handleIntercompanyPOTxn', JSON.stringify(request.parameters))
        const {
            custpage_cwgp_pagemode: stPageMode,
            custpage_cwgp_userid: stUserId,
            custpage_cwgp_accesstype: stAccessType,
            custpage_cwgp_rectype: stRecType,
        } = request.parameters;

        let idRec = null;

        if (stPageMode == 'create') {
            if(stRecType == 'intercompanypo'){
                idRec = txnLib.createRetailPurchaseOrder(request);
            }else if(stRecType == 'itemreceipt'){
                idRec = txnLib.createRetailItemReceipt(request);
            }else if(stRecType == 'inventoryadjustment'){
                idRec = txnLib.createRetailInventoryAdjustment(request);
            }
        }

        if (stPageMode == 'edit') {
            if(stRecType == 'intercompanypo'){
                idRec = editInterPO(request);
            }else if(stRecType == 'itemreceipt'){
                idRec = editItemReceipt(request);
            }
        }

        
        const objRetailUrl = EPLib._CONFIG.RETAIL_PAGE[EPLib._CONFIG.ENVIRONMENT]
        let stTranId = getTranIdSearch(idRec,stRecType);

        if(stRecType == 'intercompanypo'){
            redirect.toSuitelet({
                scriptId: objRetailUrl.SCRIPT_ID,
                deploymentId: objRetailUrl.DEPLOY_ID,
                isExternal: true,
                parameters: {
                    pageMode: 'view',
                    userId: stUserId,
                    poid: idRec,
                    accesstype: stAccessType,
                    rectype: stRecType,
                    tranid: stTranId
                }
            });
        }
        else if(stRecType == 'itemreceipt'){
            redirect.toSuitelet({
                scriptId: objRetailUrl.SCRIPT_ID,
                deploymentId: objRetailUrl.DEPLOY_ID,
                isExternal: true,
                parameters: {
                    pageMode: 'view',
                    userId: stUserId,
                    itemreceiptid: idRec,
                    accesstype: stAccessType,
                    rectype: stRecType,
                    tranid: stTranId,
                }
            });
        }
        else if(stRecType == 'inventoryadjustment'){
            redirect.toSuitelet({
                scriptId: objRetailUrl.SCRIPT_ID,
                deploymentId: objRetailUrl.DEPLOY_ID,
                isExternal: true,
                parameters: {
                    pageMode: 'view',
                    userId: stUserId,
                    inventoryadjustmentid: idRec,
                    accesstype: stAccessType,
                    rectype: stRecType,
                    tranid: stTranId
                }
            });
        }
    };

    const getTranIdSearch = (recId, stRecType) => {
        let stTranId;

        stRecType = stRecType == 'intercompanypo' ? 'PurchOrd' : stRecType == 'itemreceipt' ? 'ItemRcpt' : 'InvAdjst'

        log.debug('getTranIdSearch stRecType', stRecType);
    
        var purchaseorderSearchObj = search.create({
            type: "purchaseorder",
            filters:
            [
               ["internalid","anyof", recId], 
               "AND", 
               ["type","anyof",stRecType], 
               "AND", 
               ["mainline","is","T"]
            ],
            columns:
            [
               search.createColumn({name: "tranid", label: "Document Number"})
            ]
         });
         var searchResultCount = purchaseorderSearchObj.runPaged().count;
         log.debug("result count",searchResultCount);
         purchaseorderSearchObj.run().each(function(result){
            stTranId = result.getValue({ name: 'tranid' })
            return true;
         });

        return stTranId;
    };

    const buildIntercompanyPOSearch = (stSubsidiary) => {
        const ssIntercompanyPO = search.load({ id: "563", type: "purchaseorder" });

        ssIntercompanyPO.filters.push(search.createFilter({
            name: 'subsidiary',
            operator: 'is',
            values: stSubsidiary,
        }));

        return ssIntercompanyPO;
    };

    
    const buildItemReceiptSearch = (stSubsidiary) => {
        const ssItemReceipt = search.load({ id: "572", type: "itemreceipt" });

        ssItemReceipt.filters.push(search.createFilter({
            name: 'subsidiary',
            operator: 'is',
            values: stSubsidiary,
        }));

        return ssItemReceipt;
    };

    const buildInventoryAdjustmentSearch = (stSubsidiary) => {
        const ssItemReceipt = search.load({ id: "577", type: "inventoryadjustment" });

        ssItemReceipt.filters.push(search.createFilter({
            name: 'subsidiary',
            operator: 'is',
            values: stSubsidiary,
        }));

        return ssItemReceipt;
    };

    const buildItemPerLocationSearch = (stLocation) => {
        const ssItemPerLocation = search.load({ id: "589", type: "inventoryitem" });

        ssItemPerLocation.filters.push(search.createFilter({
            name: 'inventorylocation',
            operator: 'anyof',
            values: stLocation,
        }));

        return ssItemPerLocation;
    };


    const getSubsidiary = (stId) => {
        const ssCredentials = search.create({
            type: _CONFIG.RECORD.CREDENTIALS,
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
                    search.createColumn({ name: 'custrecord_cwgp_subsidiary' }),
                    search.createColumn({ name: 'custrecord_cwgp_location' }),
                ]
        }).run().getRange({
            start: 0,
            end: 1
        });

        if (ssCredentials.length > 0) {
            return ssCredentials[0].getValue({ name: 'custrecord_cwgp_subsidiary' });
        }
    };

    const getLocation = (stId) => {
        const ssCredentials = search.create({
            type: _CONFIG.RECORD.CREDENTIALS,
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
                    search.createColumn({ name: 'custrecord_cwgp_subsidiary' }),
                    search.createColumn({ name: 'custrecord_cwgp_location' }),
                ]
        }).run().getRange({
            start: 0,
            end: 1
        });

        if (ssCredentials.length > 0) {
            return ssCredentials[0].getValue({ name: 'custrecord_cwgp_location' });
        }
    };

    const editInterPO = (request) => {
        const stPoId = request.parameters.custpage_cwgp_poid;
        log.debug('stPoId', stPoId);

        //details sourced from the Edit external page UI
        const objPOEditDetails = {
            body: txnLib.mapRetailPOBodyFields(request),
            item: txnLib.mapRetailPOSublistFields(request)
        }
        log.debug('objPOEditDetails', objPOEditDetails);

        //details sourced from PO Netsuite transaction record 
        const objPORecordDetails = txnLib.getPOValues(stPoId);
        log.debug('objPORecordDetails', objPORecordDetails);

        const bAreDetailsTheSame = JSON.stringify(objPOEditDetails) == JSON.stringify(objPORecordDetails);
        log.debug('bAreDetailsTheSame', bAreDetailsTheSame);

        if (bAreDetailsTheSame) {
            idPO = stPoId;
        } else {
            idPO = txnLib.editRetailPurchaseOrder(stPoId, objPOEditDetails, objPORecordDetails, request);
        }

        return idPO;
    };

    
    const editItemReceipt = (request) => {
        const stItemReceiptId = request.parameters.custpage_cwgp_itemreceiptid;
        log.debug('stItemReceiptId', stItemReceiptId);

        //details sourced from the Edit external page UI
        const objItemReceiptEditDetails = {
            body: txnLib.mapRetailItemReceiptBodyFields(request),
            item: (txnLib.mapItemReceiptSublistFields(request))[0]
        }
        log.debug('objItemReceiptEditDetails', objItemReceiptEditDetails);

        //details sourced from PO Netsuite transaction record 
        const objItemReceiptRecordDetails = txnLib.getItemReceiptValues(stItemReceiptId);
        log.debug('objItemReceiptRecordDetails', objItemReceiptRecordDetails);

        const bAreDetailsTheSame = JSON.stringify(objItemReceiptEditDetails) == JSON.stringify(objItemReceiptRecordDetails);
        log.debug('bAreDetailsTheSame', bAreDetailsTheSame);

        if (bAreDetailsTheSame) {
            idPO = stItemReceiptId;
        } else {
            idPO = txnLib.editRetailItemReceipt(stItemReceiptId, objItemReceiptEditDetails, objItemReceiptRecordDetails);
        }

        return idPO;
    };

    return { onRequest };
});