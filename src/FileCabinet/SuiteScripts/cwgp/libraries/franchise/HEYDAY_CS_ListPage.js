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

define(['N/url', '../HEYDAY_LIB_ExternalPortal', '../HEYDAY_LIB_ClientExternalPortal'], (url, EPLib, ClientEPLib) => {
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

        if (context.fieldId == 'custpage_cwgp_page') {
            const intPage = currentRecord.getValue({ fieldId: 'custpage_cwgp_page' });
            console.log('page', intPage);

            let stURL = new URL(location.href);

            let objParams = stURL.searchParams;
            objParams.set('custparam_cwgp_page', intPage);

            stURL.search = objParams.toString();

            const stNewURL = stURL.toString();
            log.debug('stNewURL', stNewURL);

            //bypass the "Leave Changes" alert box
            window.onbeforeunload = null;
            location.href = stNewURL;
        }
    };

    //Used in button functionName; using multiple parameters
    const toCreateTransaction = (stUserId, stAccessType) => {
        
        const objCreateIntPOUrl = EPLib._CONFIG.AUTH_PAGE[EPLib._CONFIG.ENVIRONMENT]
        
        let stCreateIntPOUrl = url.resolveScript({
            deploymentId        : objCreateIntPOUrl.DEPLOY_ID,
            scriptId            : objCreateIntPOUrl.SCRIPT_ID,
            returnExternalUrl   : true,
            params: {
                pageMode    : 'create',
                userId      : stUserId,
                accesstype  : stAccessType,
                rectype     : 'franchisepo'
            }
        });

        //redirect to create transaction page
        window.location = stCreateIntPOUrl;
    };

    const back = (stUserId, stAccessType, stType) => {
        let stRenderUrl = url.resolveScript({
            deploymentId        : objFranchiseUrl.DEPLOY_ID,
            scriptId            : objFranchiseUrl.SCRIPT_ID,
            returnExternalUrl   : true,
            params: {
                userId      : stUserId,
                accesstype  : stAccessType,
                rectype     : stRecType
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