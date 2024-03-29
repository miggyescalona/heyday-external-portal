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
    '../libraries/HEYDAY_LIB_ExternalPortal',
    'N/file',
    'N/runtime'
], (search, redirect, listPage, createPage, viewPage, editPage, txnLib, EPLib,file,runtime) => {
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
            log.debug('rectype',rectype);
    
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
                    case 'inventorycount':
                        renderInventoryCount(request, response);
                        break;
                    case 'itemperlocation':
                        renderItemPerLocation(request, response);
                        break;
                    default:
                        throw 'Page Not Found';
                }
            } else {
                handleIntercompanyPOTxn(request, response);
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
        const objOperator = getOperator(stUserId);
        const stShopLocation = getShopLocation(stUserId);

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
                    stAccessType,
                    objOperator,
                    stShopLocation
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
                    stTranId,
                    stShopLocation
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
        const objOperator = getOperator(stUserId);
        const stShopLocation = getShopLocation(stUserId);

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
                    stAccessType,
                    objOperator,
                    stShopLocation
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
                    stTranId,
                    stShopLocation
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
            tranid: stTranId,
            subtype: stSubType
        } = request.parameters;

        log.debug('ia params',request.parameters);
        const stSubsidiary = getSubsidiary(stUserId);
        const stLocation = getLocation(stUserId);
        const objInventoryAdjustmentSearch = buildInventoryAdjustmentSearch(stSubsidiary);
        const objOperator = getOperator(stUserId);
        const stShopLocation = getShopLocation(stUserId);

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
                    stAccessType,
                    stSubType,
                    objOperator,
                    stShopLocation
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
                    stTranId,
                    stSubType
                });

                break;
            default:
                throw 'Page Not Found';
        }
    };

    const renderInventoryCount = (request, response, objVal) => {

        let stPageMode,stUserId,stPoId,stAccessType,stTranId,stStep,objIC,customRecordId
        
        if(request.method === 'GET'){
             ({
                pageMode: stPageMode,
                userId: stUserId,
                inventoryadjustmentid: stPoId,
                accesstype: stAccessType,
                subtype: stSubType,
                tranid: stTranId,
                step: stStep,
                objIC: objIC,
                customRecordId: customRecordId,
                draft: stDraft,
            } = request.parameters)
        }
        else{
             ({
                custpage_cwgp_pagemode: stPageMode,
                custpage_cwgp_userid: stUserId,
                custpage_cwgp_accesstype: stAccessType,
                custpage_cwgp_step: stStep,
                custpage_cwgp_adjustmentsubtype: stSubType
            } = request.parameters)

            log.debug('IC lineCount', request.getLineCount('custpage_inventoryadjustmentinventorycount_items'));

            var fileObj = file.create({
                name: 'test1.txt',
                fileType: file.Type.PLAINTEXT,
                contents: JSON.stringify(request.parameters)
            });
            fileObj.folder = -15;
            var id = fileObj.save();

            var fileObj2 = file.create({
                name: 'test2.txt',
                fileType: file.Type.PLAINTEXT,
                contents: JSON.stringify(response)
            });
            fileObj2.folder = -15;
            var id = fileObj2.save();
        }
        

        log.debug('params',JSON.stringify({
            stPageMode: stPageMode,
            stUserId: stUserId,
            stPoId: stPoId,
            stAccessType: stAccessType,
            stTranId: stTranId,
            stStep: stStep
        }));

        log.debug('stStep',stStep);

        /*if(stStep!=1){
            var fileObj = file.create({
                name: 'test1.txt',
                fileType: file.Type.PLAINTEXT,
                contents: JSON.stringify(request.parameters)
            });
            fileObj.folder = -15;
            var id = fileObj.save();

            var fileObj2 = file.create({
                name: 'test2.txt',
                fileType: file.Type.PLAINTEXT,
                contents: JSON.stringify(response)
            });
            fileObj2.folder = -15;
            var id = fileObj2.save();
        }*/


        log.debug('ic params',request.parameters);
        const stSubsidiary = getSubsidiary(stUserId);
        const stLocation = getLocation(stUserId);
        const objInventoryCountSearch = buildInventoryCountSearch(stSubsidiary);
        const objOperator = getOperator(stUserId);
        const stShopLocation = getShopLocation(stUserId);
        const requestParams = request.parameters;

        switch (stPageMode) {
            case 'list':
                listPage.renderInventoryCount({
                    request,
                    response,
                    stSubsidiary,
                    stType: 'inventorycount',
                    stAccessType,
                    stUserId,
                    objSearch: objInventoryCountSearch,
                    stLocation,
                    objOperator
                });

                break;
            case 'create':
                createPage.renderInventoryCount({
                    response,
                    stType: 'inventorycount',
                    stSubsidiary,
                    stLocation,
                    stPageMode,
                    stUserId,
                    stPoId,
                    stAccessType,
                    stSubType,
                    stStep,
                    objOperator,
                    objIC,
                    requestParams,
                    customRecordId,
                    stShopLocation
                });

                break;
            case 'view':
                viewPage.renderInventoryCount({
                    response,
                    stType: 'inventorycount',
                    stPageMode,
                    stUserId,
                    stPoId,
                    stAccessType,
                    stTranId
                });

                break;
			case 'load':
                if(stStep == 1){
                    createPage.renderInventoryCount({
                        response,
                        stType: 'inventorycount',
                        stSubsidiary,
                        stLocation,
                        stPageMode: 'create',
                        stUserId,
                        stPoId,
                        stAccessType,
                        stStep,
                        stSubType,
                        objOperator,
                        stShopLocation,
						stDraft
                    });
                }
                else if(stStep == 2){
                    createPage.renderInventoryCountSecond(request,response);
                }
                else if(stStep == 3){
                    createPage.renderInventoryCountFinal(request,response);
                }
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
        const stSubsidiary = getSubsidiary(stUserId);
        const stShopLocation = getShopLocation(stUserId);
        const objItemPerLocationSearch = buildItemPerLocationSearch(stLocation,stSubsidiary,stShopLocation);
        const objItemPerLocationTotalSearch = buildItemPerLocationTotalSearch(stLocation,stSubsidiary,stShopLocation);
        const objItemPerLocationQoHSearch = buildItemPerLocationQuantityOnHand(stLocation,stSubsidiary,stShopLocation);
        const objItemPerLocationTotalQuantityOnHand = buildItemPerLocationTotalQuantityOnHand(stLocation,stSubsidiary,stShopLocation);
        const objOperator = getOperator(stUserId);

        listPage.renderItemPerLocation({
            request,
            response,
            stType: 'itemperlocation',
            stAccessType,
            stUserId,
            stSubsidiary,
            stLocation,
            objSearch: objItemPerLocationSearch,
            objSearchTotal: objItemPerLocationTotalSearch,
            objSearchQoH: objItemPerLocationQoHSearch,
            objSearchTotalQoH: objItemPerLocationTotalQuantityOnHand,
            objOperator
        });
    };


    const handleIntercompanyPOTxn = (request, response) => {
        const  {
            custpage_cwgp_pagemode: stPageMode,
            custpage_cwgp_userid: stUserId,
            custpage_cwgp_accesstype: stAccessType,
            custpage_cwgp_rectype: stRecType,
            custpage_cwgp_adjustmentsubtype: stSubType

        } = request.parameters;

        //log.debug(objVal);
       // objVal.stStep = parseInt(request.parameters.custpage_cwgp_step)+1;

        log.debug('params handleIntercompanyPOTxn',JSON.stringify({
            custpage_cwgp_pagemode: stPageMode,
            custpage_cwgp_userid: stUserId,
            custpage_cwgp_accesstype: stAccessType,
            custpage_cwgp_rectype: stRecType,
            custpage_cwgp_adjustmentsubtype: stSubType
        }));



        let idRec = null;
        let stTranId 

        const objRetailUrl = EPLib._CONFIG.RETAIL_PAGE[EPLib._CONFIG.ENVIRONMENT]
        if (stPageMode == 'create') {
            switch (stRecType) {
                case 'intercompanypo':
                    idRec = txnLib.createRetailPurchaseOrder(request);
                    stTranId = getTranIdSearch(idRec,stRecType);
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
                    break;
                case 'itemreceipt':
                    idRec = txnLib.createRetailItemReceipt(request);
                    stTranId = getTranIdSearch(idRec,stRecType);
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
                    break;
                case 'inventoryadjustment':
                    const stAdjustmentSubType = request.parameters.custpage_cwgp_adjustmentsubtype;
                    idRec = txnLib.createRetailInventoryAdjustment(request,stAdjustmentSubType);
                    stTranId = getTranIdSearch(idRec,stRecType);
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
                    break;
                case 'inventorycount':
                    const stStep = request.parameters.custpage_cwgp_step;
                    log.debug('stRecType', stRecType);
                    log.debug('stStep', stStep);
                    const stShopLocation = getShopLocation(stUserId);
                    if(stStep == '1'){
                        log.debug('Go to Step 2', stRecType);
                        createPage.renderInventoryCountSecond(request,response,stShopLocation);
                    }
                    else if(stStep == '2'){
                        log.debug('Create IC', stRecType);
                        createPage.renderInventoryCountFinal(request,response,stShopLocation);
                    }
                    else if(stStep == '3'){
                        const stSubType = request.parameters.custpage_cwgp_adjustmentsubtype;
                        log.debug('stSubType',stSubType);
                        idRec = txnLib.createRetailInventoryAdjustment(request,stSubType,stRecType);
                        stTranId = getTranIdSearch(idRec,stRecType);
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
                    break;
                default:
                    throw 'Page Not Found';
            }
        }
        
        if (stPageMode == 'edit') {
            if(stRecType == 'intercompanypo'){
                idRec = editInterPO(request);
                stTranId = getTranIdSearch(idRec,stRecType);
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
            }else if(stRecType == 'itemreceipt'){
                idRec = editItemReceipt(request);
                stTranId = getTranIdSearch(idRec,stRecType);
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
        }


        if(stPageMode == 'view'){
            stTranId = getTranIdSearch(idRec,stRecType);
            if(stRecType == 'intercompanypo'){
                stTranId = getTranIdSearch(idRec,stRecType);
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
                stTranId = getTranIdSearch(idRec,stRecType);
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
            else if(stRecType == 'inventorycount'){
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
        }
        log.debug('===handleIntercompanyPOTxn===', 'End Of handleIntercompanyPOTxn');
    };

    const getTranIdSearch = (recId, stRecType) => {
        let stTranId;
        let stRecSearchType = stRecType;

        log.debug('getTranIdSearch stRecSearchType before eval', stRecSearchType);

        stRecType = stRecType == 'intercompanypo' ? 'PurchOrd' : stRecType == 'itemreceipt' ? 'ItemRcpt' : 'InvAdjst'
        stRecSearchType = stRecSearchType == 'intercompanypo' ? 'purchaseorder' : stRecSearchType == 'itemreceipt' ? 'itemreceipt' : 'inventoryadjustment'

        log.debug('getTranIdSearch recId', recId);
        log.debug('getTranIdSearch stRecType', stRecType);
        log.debug('getTranIdSearch stRecSearchType', stRecSearchType);
    
        var purchaseorderSearchObj = search.create({
            type: stRecSearchType,
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
            log.debug('getTranIdSearch recId', recId);
            return true;
         });

        return stTranId;
    };

    const buildIntercompanyPOSearch = (stSubsidiary) => {
        const ssIntercompanyPO = search.load({ id: "customsearch_cwgp_retail_interpo", type: "purchaseorder" });

        ssIntercompanyPO.filters.push(search.createFilter({
            name: 'subsidiary',
            operator: 'is',
            values: stSubsidiary,
        }));

        return ssIntercompanyPO;
    };

    
    const buildItemReceiptSearch = (stSubsidiary) => {
        const ssItemReceipt = search.load({ id: "customsearch_cwgp_retail_itemreceipt", type: "itemreceipt" });

        ssItemReceipt.filters.push(search.createFilter({
            name: 'subsidiary',
            operator: 'is',
            values: stSubsidiary,
        }));

        return ssItemReceipt;
    };

    const buildInventoryAdjustmentSearch = (stSubsidiary) => {
        const ssItemReceipt = search.load({ id: "customsearch_cwgp_retail_inventoryadjust", type: "inventoryadjustment" });

        ssItemReceipt.filters.push(search.createFilter({
            name: 'subsidiary',
            operator: 'is',
            values: stSubsidiary,
        }));

        return ssItemReceipt;
    };

    const buildInventoryCountSearch = (stSubsidiary) => {
        const ssItemReceipt = search.load({ id: "customsearch_cwgp_retail_inventorycount", type: "inventoryadjustment" });

        ssItemReceipt.filters.push(search.createFilter({
            name: 'subsidiary',
            operator: 'is',
            values: stSubsidiary,
        }));

        return ssItemReceipt;
    };

    const buildItemPerLocationSearch = (stLocation,stSubsidiary,stShopLocation) => {
        const ssItemPerLocation = search.load({ id: "customsearch_cwgp_retail_itemperloc", type: "transaction" });

                
        if(stShopLocation){
            ssItemPerLocation.filters.push(search.createFilter({
                name: 'custitem_cwgp_extportalshoplocation',
                operator: 'anyof',
                join: 'item',
                values: stShopLocation,
            }));
        }

        ssItemPerLocation.filters.push(search.createFilter({
            name: 'inventorylocation',
            operator: 'anyof',
            join: 'item',
            values: stLocation,
        }));

        ssItemPerLocation.filters.push(search.createFilter({
            name: 'subsidiary',
            operator: 'anyof',
            values: stSubsidiary,
        }));

        return ssItemPerLocation;
    };

    const buildItemPerLocationQuantityOnHand= (stLocation,stSubsidiary,stShopLocation) => {
        const ssItemPerLocation = search.load({ id: "customsearch_cwgp_retail_itemperlocqoh", type: "transaction" });            
                
        if(stShopLocation){
            ssItemPerLocation.filters.push(search.createFilter({
                name: 'custitem_cwgp_extportalshoplocation',
                operator: 'anyof',
                join: 'item',
                values: stShopLocation,
            }));
        }
        ssItemPerLocation.filters.push(search.createFilter({
            name: 'inventorylocation',
            operator: 'anyof',
            join: 'item',
            values: stLocation,
        }));

        ssItemPerLocation.filters.push(search.createFilter({
            name: 'location',
            operator: 'anyof',
            values: stLocation,
        }));

        ssItemPerLocation.filters.push(search.createFilter({
            name: 'subsidiary',
            operator: 'anyof',
            values: stSubsidiary,
        }));

        return ssItemPerLocation;
    };

        

    const buildItemPerLocationTotalSearch = (stLocation,stSubsidiary,stShopLocation) => {
        const ssItemPerLocation = search.load({ id: "customsearch_cwgp_retail_itemperloctotal", type: "transaction" });

                        
        if(stShopLocation){
            ssItemPerLocation.filters.push(search.createFilter({
                name: 'custitem_cwgp_extportalshoplocation',
                operator: 'anyof',
                join: 'item',
                values: stShopLocation,
            }));
        }

        ssItemPerLocation.filters.push(search.createFilter({
            name: 'inventorylocation',
            operator: 'anyof',
            join: 'item',
            values: stLocation,
        }));
        
        ssItemPerLocation.filters.push(search.createFilter({
            name: 'subsidiary',
            operator: 'anyof',
            values: stSubsidiary,
        }));

        return ssItemPerLocation;
    };

    const buildItemPerLocationTotalQuantityOnHand = (stLocation,stSubsidiary,stShopLocation) => {
        const ssItemPerLocation = search.load({ id: "customsearch_cwgp_retail_itemprloctotqoh", type: "transaction" });

                        
        if(stShopLocation){
            ssItemPerLocation.filters.push(search.createFilter({
                name: 'custitem_cwgp_extportalshoplocation',
                operator: 'anyof',
                join: 'item',
                values: stShopLocation,
            }));
        }

        ssItemPerLocation.filters.push(search.createFilter({
            name: 'inventorylocation',
            operator: 'anyof',
            join: 'item',
            values: stLocation,
        }));

        ssItemPerLocation.filters.push(search.createFilter({
            name: 'location',
            operator: 'anyof',
            values: stLocation,
        }));

        ssItemPerLocation.filters.push(search.createFilter({
            name: 'subsidiary',
            operator: 'anyof',
            values: stSubsidiary,
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

    const getShopLocation = (stId) => {
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
                    search.createColumn({ name: 'custrecord_cwgp_shop_location' }),
                ]
        }).run().getRange({
            start: 0,
            end: 1
        });

        if (ssCredentials.length > 0) {
            return ssCredentials[0].getValue({ name: 'custrecord_cwgp_shop_location' });
        }
    };


    const getOperator = (stId) => {
        let arrCredentials = [];
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
                    search.createColumn({ name: 'custrecord_cwgp_username' }),
                    search.createColumn({ name: 'internalid' })
                ]
        }).run().getRange({
            start: 0,
            end: 1
        });

        if (ssCredentials.length > 0) {
            arrCredentials.push({
                stOperator: ssCredentials[0].getValue({ name: 'custrecord_cwgp_username' }),
                stOperatorId: ssCredentials[0].getValue({ name: 'internalid' })
            });
        }
        return arrCredentials;
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