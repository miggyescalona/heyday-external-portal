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

define(['N/url', '../libraries/HEYDAY_LIB_ExternalPortal', '../libraries/HEYDAY_LIB_ClientExternalPortal'], (url, EPLib, ClientEPLib) => {

    const pageInit = (context) => {
        ClientEPLib.getAuthenticationScript();
    };

    const toReceive = (stUserId, stPoId, stAccessType, stType) => {
        
        const objRetailUrl = EPLib._CONFIG.RETAIL_PAGE[EPLib._CONFIG.ENVIRONMENT]

        let stReceiveRetailUrl = url.resolveScript({
            deploymentId        : objRetailUrl.DEPLOY_ID,
            scriptId            : objRetailUrl.SCRIPT_ID,
            returnExternalUrl   : true,
            params: {
                pageMode    : 'edit',
                userId      : stUserId,
                itemreceiptid : stPoId,
                accesstype  : stAccessType,
                rectype     : stType //Retail PO or IR
            }
        })
        window.location = stReceiveRetailUrl
    
    };

    const toEdiTransaction = (stUserId, stPoId, stAccessType,stTranId,stType) => {
        log.debug('toEdiTransaction',stUserId +'|' +stPoId + '|'+ stAccessType+'|'+stType+'|'+stTranId);

        const objRetailUrl = EPLib._CONFIG.RETAIL_PAGE[EPLib._CONFIG.ENVIRONMENT]
        let stEditRetailUrl;

        switch (stType){
            case 'intercompanypo':
                stEditRetailUrl = url.resolveScript({
                    deploymentId        : objRetailUrl.DEPLOY_ID,
                    scriptId            : objRetailUrl.SCRIPT_ID,
                    returnExternalUrl   : true,
                    params: {
                        pageMode    : 'edit',
                        userId      : stUserId,
                        poid        : stPoId,
                        accesstype  : stAccessType,
                        rectype     : stType,
                        tranid      : stTranId
                    }
                });
                break;
            case 'itemreceipt':
                stEditRetailUrl = url.resolveScript({
                    deploymentId        : objRetailUrl.DEPLOY_ID,
                    scriptId            : objRetailUrl.SCRIPT_ID,
                    returnExternalUrl   : true,
                    params: {
                        pageMode    : 'edit',
                        userId      : stUserId,
                        itemreceiptid : stPoId,
                        accesstype  : stAccessType,
                        rectype     : stType,
                        tranid      : stTranId
                    }
                });
        };
        window.location = stEditRetailUrl
    };

    const back = (stUserId, stAccessType, stType) => {
          
        const objRetailUrl = EPLib._CONFIG.RETAIL_PAGE[EPLib._CONFIG.ENVIRONMENT]

        let stRetailUrl = url.resolveScript({
            deploymentId        : objRetailUrl.DEPLOY_ID,
            scriptId            : objRetailUrl.SCRIPT_ID,
            returnExternalUrl   : true,
            params: {
                pageMode    : 'list',
                userId      : stUserId,
                accesstype  : stAccessType,
                rectype     : stType
            }
        });

        window.location = stRetailUrl;
    
    };

    return {
        pageInit,
        toEdiTransaction,
        back,
        toReceive
    };
});