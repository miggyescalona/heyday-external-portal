/**
 * Author: Patricia Naguit
 * Date: 2022-12-14
 *
 * Date         Modified By            Notes
 * 2022-12-14   Patricia Naguit        Initial File Creation
 */

/**
 * @NApiVersion 2.1
 * @NScriptType ClientScript
 */

define(['N/url', '../HEYDAY_LIB_ClientExternalPortal.js'], (url, ClientEPLib) => {

    const pageInit = (context) => {
        ClientEPLib.getAuthenticationScript();
    };

    const toEdiTransaction = (stUserId, stPoId, stAccessType, stType) => {

        const objFranchiseUrl = ClientEPLib._CONFIG.FRANCHISE_PAGE[ClientEPLib._CONFIG.ENVIRONMENT]

        let stEditFranchiseUrl = url.resolveScript({
            deploymentId        : objFranchiseUrl.DEPLOY_ID,
            scriptId            : objFranchiseUrl.SCRIPT_ID,
            returnExternalUrl   : true,
            params: {
                pageMode    : 'edit',
                userId      : stUserId,
                poid        : stPoId,
                accesstype  : stAccessType,
                rectype     : stType //Franchise PO or IR
            }
        })
        window.location = stEditFranchiseUrl

    };
    
    const approveTransaction = (stUserId, stPoId, stAccessType, stType) => {
        if(stType == 'franchisepo'){

            const objFranchiseUrl = ClientEPLib._CONFIG.FRANCHISE_PAGE[ClientEPLib._CONFIG.ENVIRONMENT]

            let stApproveFranchisePOUrl = url.resolveScript({
                deploymentId        : objFranchiseUrl.DEPLOY_ID,
                scriptId            : objFranchiseUrl.SCRIPT_ID,
                returnExternalUrl   : true,
                params: {
                    pageMode    : 'approve',
                    userId      : stUserId,
                    poid        : stPoId,
                    accesstype  : stAccessType,
                    rectype     : stType
                }
            })

            window.location = stApproveFranchisePOUrl;
        }
    };
    
    const receiveTransaction = (stUserId, stPoId, stAccessType, stType) => {
        if(stType == 'itemreceipt'){

            const objFranchiseUrl = ClientEPLib._CONFIG.FRANCHISE_PAGE[ClientEPLib._CONFIG.ENVIRONMENT]

            let stReceiveIRUrl = url.resolveScript({
                deploymentId        : objFranchiseUrl.DEPLOY_ID,
                scriptId            : objFranchiseUrl.SCRIPT_ID,
                returnExternalUrl   : true,
                params: {
                    pageMode    : 'create',
                    userId      : stUserId,
                    poid        : stPoId,
                    accesstype  : stAccessType,
                    rectype     : stType
                }
            })

            window.location = stReceiveIRUrl;
        }
    };

    const back = (stUserId, stAccessType, stType) => {

        const objFranchiseUrl = ClientEPLib._CONFIG.FRANCHISE_PAGE[ClientEPLib._CONFIG.ENVIRONMENT]

        let stFranchiseUrl = url.resolveScript({
            deploymentId        : objFranchiseUrl.DEPLOY_ID,
            scriptId            : objFranchiseUrl.SCRIPT_ID,
            returnExternalUrl   : true,
            params: {
                pageMode    : 'list',
                userId      : stUserId,
                accesstype  : stAccessType,
                rectype     : stType
            }
        });

        window.location = stFranchiseUrl;
    };

    return {
        pageInit,
        toEdiTransaction,
        approveTransaction,
        receiveTransaction,
        back
    };
});