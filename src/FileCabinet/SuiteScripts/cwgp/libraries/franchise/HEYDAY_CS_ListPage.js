/**
 * Author: Patricia Naguit
 * Date: 2022-10-24
 *
 * Date         Modified By            Notes
 * 2022-10-24   Patricia Naguit        Initial File Creation
 */

/**
 * @NApiVersion 2.1
 * @NScriptType ClientScript
 */

define(['N/url', '../HEYDAY_LIB_ClientExternalPortal.js'], (url, ClientEPLib) => {
    /**
     * Function to be executed after page is initialized.
     *
     * @param {Object} context
     */
    const pageInit = (context) => {
        ClientEPLib.getAuthenticationScript();
    };

    /**
     * Function to be executed when field is changed.
     *
     * @param {Object} context
     */
    const fieldChanged = (context) => {
        const { currentRecord } = context;
        
        let stURL = new URL(location.href);
        const intPage = currentRecord.getValue({ fieldId: 'custpage_cwgp_page' });
        let intApprovalStatus = currentRecord.getValue({ fieldId: 'custpage_cwgp_approvalstatus' });
        let intForReceiving = currentRecord.getValue({ fieldId: 'custpage_cwgp_forreceiving' });
        
        console.log(JSON.stringify(context));
        console.log(intApprovalStatus);
        console.log(intForReceiving);
        if (context.fieldId == 'custpage_cwgp_approvalstatus' && intApprovalStatus != '3') {
            console.log('custpage_cwgp_approvalstatus');
            intForReceiving = false;
        }

        if (context.fieldId == 'custpage_cwgp_forreceiving' && intForReceiving) {
            console.log('custpage_cwgp_forreceiving');
            intApprovalStatus = '3'
        }

        let objParams = stURL.searchParams;
        objParams.set('custparam_cwgp_page', intPage);
        objParams.set('approvalstatus', intApprovalStatus);
        objParams.set('isreceiving', intForReceiving);

        stURL.search = objParams.toString();

        const stNewURL = stURL.toString();
        console.log('stNewURLstNewURL '+ stNewURL);
        //bypass the "Leave Changes" alert box
        window.onbeforeunload = null;
        location.href = stNewURL;
    };

    //Used in button functionName; using multiple parameters
    const toCreateTransaction = (stUserId, stAccessType, stType) => {
        
        const objFranchiseUrl = ClientEPLib._CONFIG.FRANCHISE_PAGE[ClientEPLib._CONFIG.ENVIRONMENT]
        
        let stCreateIntPOUrl = url.resolveScript({
            deploymentId        : objFranchiseUrl.DEPLOY_ID,
            scriptId            : objFranchiseUrl.SCRIPT_ID,
            returnExternalUrl   : true,
            params: {
                pageMode    : 'create',
                userId      : stUserId,
                accesstype  : stAccessType,
                rectype     : stType
            }
        });

        //redirect to create transaction page
        window.location = stCreateIntPOUrl;
    };

    const back = (stUserId, stAccessType, stType) => {

        const objRenderUrl = ClientEPLib._CONFIG.RENDER_PAGE[ClientEPLib._CONFIG.ENVIRONMENT]

        let stRenderUrl = url.resolveScript({
            deploymentId        : objRenderUrl.DEPLOY_ID,
            scriptId            : objRenderUrl.SCRIPT_ID,
            returnExternalUrl   : true,
            params: {
                userId      : stUserId,
                accesstype  : stAccessType,
                rectype     : stType
            }
        });

        window.location = stRenderUrl;
    };

    return {
        pageInit,
        fieldChanged,
        back,
        toCreateTransaction
    };
});