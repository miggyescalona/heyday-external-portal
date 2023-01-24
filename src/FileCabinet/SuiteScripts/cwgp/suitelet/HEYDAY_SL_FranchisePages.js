/**
 * Author: Ken Seares
 * Date: 2023-01-03
 *
 * Date         Modified By            Notes
 * 2023-01-03   Ken Seares        	   Initial File Creation
 */

/**
 * @NApiVersion 2.1
 * @NScriptType Suitelet
 */

define([
    'N/record',
    'N/search',
    'N/redirect',
    '../libraries/franchise/HEYDAY_LIB_ListPage.js',
    '../libraries/franchise/HEYDAY_LIB_CreatePage.js',
    '../libraries/franchise/HEYDAY_LIB_ViewPage.js',
    '../libraries/franchise/HEYDAY_LIB_EditPage.js',
    '../libraries/franchise/HEYDAY_LIB_FranchisePO.js'
], (record, search, redirect, listPage, createPage, viewPage, editPage, txnLib) => {
    const _CONFIG = {
        RECORD: {
            CREDENTIALS: 'customrecord_cwgp_externalsl_creds'
        },
        SCRIPT: {
            ID: 'customscript_cwgp_sl_franchisepages',
            DEPLOY: 'customdeploy_cwgp_sl_franchisepages'
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
            if (request.method === 'GET') {
                if(rectype == 'franchisepo'){
                    renderIntercompanyPO(request, response);
                }
                else if(rectype== 'itemreceipt'){
                    renderItemReceipt(request, response);
                }
            } else {
                handleFranchiseTxn(request);
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
            accesstype: stAccessType
        } = request.parameters;
    	
    	/*var a ={
            pageMode: stPageMode,
            userId: stUserId,
            poid: stPoId,
            accesstype: stAccessType
        } = request.parameters;
        stPoId = 343153;
        log.debug('stPoId',stPoId);
        stPageMode = 'view';
        stUserId = 3;*/
        
        log.debug('stPageMode',stPageMode);
        const stSubsidiary = getSubsidiary(stUserId);
        log.debug('stSubsidiary',stSubsidiary);
        const stCustomer = getCustomer(stUserId);
        //const objIntercompanyPOSearch = buildIntercompanyPOSearch(stSubsidiary);
        const objIntercompanyPOSearch = buildIntercompanyPOSearch(stCustomer);
        const stLocation = getFieldValue(stUserId,'custrecord_cwgp_location');
       
        switch (stPageMode) {
            case 'list':
                listPage.render({
                    request,
                    response,
                    stType: 'franchisepo',
                    stAccessType,
                    stUserId,
                    objSearch: objIntercompanyPOSearch
                });

                break;
            case 'create':
                createPage.render({
                    response,
                    stType: 'franchisepo',
                    stSubsidiary,
                    stPageMode,
                    stUserId,
                    stAccessType,
                    stCustomer,
                    stLocation
                });

                break;
            case 'view':
                viewPage.render({
                    response,
                    stType: 'franchisepo',
                    stSubsidiary,
                    stAccessType,
                    stPageMode,
                    stUserId,
                    stPoId
                });
                break;
            case 'approve':
            	record.submitFields({
            	    type: record.Type.SALES_ORDER,
            	    id: stPoId,
            	    values: {
            	    	custbody_cwgp_franchiseapprovalstatus: 3
            	    },
            	    options: {
            	        enableSourcing: false,
            	        ignoreMandatoryFields : true
            	    }
            	});
            	viewPage.render({
                    response,
                    stType: 'franchisepo',
                    stAccessType,
                    stSubsidiary,
                    stPageMode: 'view',
                    stUserId,
                    stPoId
                });
                break;
            case 'edit':
                editPage.render({
                    response,
                    stType: 'franchisepo',
                    stAccessType,
                    stSubsidiary,
                    stPageMode,
                    stUserId,
                    stPoId
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
            poid: stPoId,
            accesstype: stAccessType,
            tranid: stTranId
        } = request.parameters;
        const stCustomer = getCustomer(stUserId);
        log.debug('ir params',request.parameters);
        const stSubsidiary = getSubsidiary(stUserId);
        const objItemReceiptSearch = buildItemReceiptSearch(stCustomer);

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

    const handleTransactions = (request) => {

    };

    const buildIntercompanyPOSearch = (stCustomer) => {
        const ssIntercompanyPO = search.load({ id: "570"});

        ssIntercompanyPO.filters.push(search.createFilter({
            name: 'name',
            operator: 'anyof',
            values: stCustomer,
        }));

        return ssIntercompanyPO;
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
    
    const getFieldValue = (stId,field) => {
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
                    search.createColumn({ name: field })
                ]
        }).run().getRange({
            start: 0,
            end: 1
        });

        if (ssCredentials.length > 0) {
            return ssCredentials[0].getValue({ name: field });
        }
    };
    
    const getCustomer = (stId) => {
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
    
    const handleFranchiseTxn = (request) => {
        log.debug('params handleIntercompanyPOTxn', request.parameters)
        const {
            custpage_cwgp_pagemode: stPageMode,
            custpage_cwgp_userid: stUserId,
            custpage_cwgp_accesstype: stAccessType,
            custpage_cwgp_rectype: stRecType,
            custpage_cwgp_tranid: stTranId
        } = request.parameters;

        let idRec = null;
        log.debug('stPageMode', stPageMode);
        log.debug('stRecType', stRecType);
        if (stPageMode == 'create') {
            if(stRecType == 'franchisepo'){
            	log.debug('create franchise po', '')
                idRec = txnLib.createFranchisePO(request);
            }else if(stRecType == 'itemreceipt'){
                idRec = txnLib.createFranchiseIR(request);
            }
        }

        if (stPageMode == 'edit') {
            if(stRecType == 'franchisepo'){
                idRec = editFranchisePO(request);
            }else if(stRecType == 'itemreceipt'){
                idRec = editFranchiseIR(request);
            }
        }

        if(stRecType == 'franchisepo'){
            redirect.toSuitelet({
                scriptId: _CONFIG.SCRIPT.ID,
                deploymentId: _CONFIG.SCRIPT.DEPLOY,
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
                scriptId: _CONFIG.SCRIPT.ID,
                deploymentId: _CONFIG.SCRIPT.DEPLOY,
                isExternal: true,
                parameters: {
                    pageMode: 'view',
                    userId: stUserId,
                    itemreceiptid: idRec,
                    accesstype: stAccessType,
                    rectype: stRecType,
                    poid:idRec,
                    tranid: stTranId
                }
            });
        }
    };
    
    const buildItemReceiptSearch = (stCustomer) => {
        const ssItemReceipt = search.load({ id: "580", type: "customrecord_cwgp_franchisereciept" });

        ssItemReceipt.filters.push(search.createFilter({
            name: 'custrecord_cwgp_fr_customer',
            operator: 'anyof',
            values: stCustomer,
        }));

        return ssItemReceipt;
    };
    
    const editInterPO = (request) => {
        const stPoId = request.parameters.custpage_cwgp_poid;
        log.debug('stPoId', stPoId);

        //details sourced from the Edit external page UI
        const objPOEditDetails = {
            body: txnLib.mapFranchisePOBodyFields(request),
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
            idPO = txnLib.editFranchisePurchaseOrder(stPoId, objPOEditDetails, objPORecordDetails, request);
        }

        return idPO;
    };
    
    const editFranchisePO = (request) => {
        const stPoId = request.parameters.custpage_cwgp_poid;
        log.debug('stPoId', stPoId);

        //details sourced from the Edit external page UI
        const objPOEditDetails = {
            body: txnLib.mapFranchisePOBodyFields(request),
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
            idPO = txnLib.editFranchisePurchaseOrder(stPoId, objPOEditDetails, objPORecordDetails, request);
        }

        return idPO;
    };
    
    const editFranchiseIR = (request) => {
        const stPoId = request.parameters.custpage_cwgp_poid;
        log.debug('stPoId', stPoId);

        //details sourced from the Edit external page UI
        const objPOEditDetails = {
            body: txnLib.mapFranchiseIRBodyFields(request),
            item: txnLib.mapFranchiseIRSublistFieldsEdit(request)
        }
        log.debug('objPOEditDetails', objPOEditDetails);
        
        idPO = txnLib.editFranchiseIR(stPoId, objPOEditDetails, request);
        
        /*
        //details sourced from PO Netsuite transaction record 
        const objPORecordDetails = txnLib.getPOValues(stPoId);
        log.debug('objPORecordDetails', objPORecordDetails);

        const bAreDetailsTheSame = JSON.stringify(objPOEditDetails) == JSON.stringify(objPORecordDetails);
        log.debug('bAreDetailsTheSame', bAreDetailsTheSame);

        if (bAreDetailsTheSame) {
            idPO = stPoId;
        } else {
            idPO = txnLib.editFranchisePurchaseOrder(stPoId, objPOEditDetails, objPORecordDetails, request);
        }*/
        log.debug('idPO', idPO);
        return idPO;
    };

    return { onRequest };
});
