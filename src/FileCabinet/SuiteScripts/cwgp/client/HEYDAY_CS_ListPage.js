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

define(['N/url', '../libraries/HEYDAY_LIB_ExternalPortal', '../libraries/HEYDAY_LIB_ClientExternalPortal'], (url, EPLib, ClientEPLib) => {
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

        if (context.fieldId == 'custpage_cwgp_location') {
            const intLocation = currentRecord.getValue({ fieldId: 'custpage_cwgp_location' });
            console.log('location', intLocation);

            let stURL = new URL(location.href);

            let objParams = stURL.searchParams;
            objParams.set('custparam_cwgp_location', intLocation);

            stURL.search = objParams.toString();

            const stNewURL = stURL.toString();
            log.debug('stNewURL', stNewURL);

            //bypass the "Leave Changes" alert box
            window.onbeforeunload = null;
            location.href = stNewURL;
        }
    };

    const toCreateTransaction = (stUserId, stAccessType, stType) => {
        //redurect to create transaction page
       const objCreateIntPOUrl = EPLib._CONFIG.RETAIL_PAGE[EPLib._CONFIG.ENVIRONMENT]
        
       let stCreateIntPOUrl = url.resolveScript({
           deploymentId        : objCreateIntPOUrl.DEPLOY_ID,
           scriptId            : objCreateIntPOUrl.SCRIPT_ID,
           returnExternalUrl   : true,
           params: {
               pageMode    : 'create',
               userId      : stUserId,
               accesstype  : stAccessType,
               rectype     : stType
           }
       });
       window.location = stCreateIntPOUrl;
   
   
    };

    const back = (stUserId, stAccessType, stType) => {
        const objRenderUrl = EPLib._CONFIG.RENDER_PAGE[EPLib._CONFIG.ENVIRONMENT]

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