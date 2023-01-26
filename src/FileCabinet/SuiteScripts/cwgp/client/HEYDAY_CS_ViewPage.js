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

define(['N/url', '../libraries/HEYDAY_LIB_ClientExternalPortal.js'], (url, ClientEPLib) => {

    const pageInit = (context) => {
        ClientEPLib.getAuthenticationScript();
    };

    const toReceive = (stUserId, stPoId, stAccessType, stType) => {
        
        const objRetailUrl = ClientEPLib._CONFIG.RETAIL_PAGE[ClientEPLib._CONFIG.ENVIRONMENT]

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

        const objRetailUrl = ClientEPLib._CONFIG.RETAIL_PAGE[ClientEPLib._CONFIG.ENVIRONMENT]
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
        //window.location = `https://5530036-sb1.extforms.netsuite.com/app/site/hosting/scriptlet.nl?script=686&deploy=1&compid=5530036_SB1&h=b8a78be5c27a4d76e7a8&pageMode=list&userId=${stUserId}&accesstype=${stAccessType}&rectype=${stType}`;
        
        const objRetailUrl = ClientEPLib._CONFIG.RETAIL_PAGE[ClientEPLib._CONFIG.ENVIRONMENT]

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