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

define(['N/url', 'N/ui/dialog','../libraries/HEYDAY_LIB_ClientExternalPortal.js'], (url, dialog, ClientEPLib) => {
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
       // window.location = `https://5530036-sb1.extforms.netsuite.com/app/site/hosting/scriptlet.nl?script=686&deploy=1&compid=5530036_SB1&h=b8a78be5c27a4d76e7a8&pageMode=create&userId=${stUserId}&accesstype=${stAccessType}&rectype=${stType}`;
   
       const objCreateIntPOUrl = ClientEPLib._CONFIG.RETAIL_PAGE[ClientEPLib._CONFIG.ENVIRONMENT]
        
       let stCreateIntPOUrl = url.resolveScript({
           deploymentId        : objCreateIntPOUrl.DEPLOY_ID,
           scriptId            : objCreateIntPOUrl.SCRIPT_ID,
           returnExternalUrl   : true,
           params: {
               pageMode    : 'create',
               userId      : stUserId,
               accesstype  : stAccessType,
               rectype     : stType,
               subtype     : subType 
           }
       });
       window.location = stCreateIntPOUrl;
   
   
    };

    const back = (stUserId, stAccessType, stType) => {
        //window.location = `https://5530036-sb1.extforms.netsuite.com/app/site/hosting/scriptlet.nl?script=682&deploy=1&compid=5530036_SB1&h=3eb96116ea1325a68f66&userId=${stUserId}&accesstype=${stAccessType}&rectype=${stType}`;

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

    const createInventoryAdjustment = (stUserId, stAccessType, stType) => {
        var options = {
            title: 'Create Inventory Adjustment',
            message: 'Please select what type of inventory adjustment to create:',
            buttons: [
                { label: 'Standard', value: 1 },
                { label: 'Backbar', value: 2 },
                { label: 'Damage/Tester', value: 3 }
            ]
        };
        function success(result) { 

            const objCreateIntPOUrl = ClientEPLib._CONFIG.RETAIL_PAGE[ClientEPLib._CONFIG.ENVIRONMENT]
            let subType;

            switch(result){
                case '1':
                    subType = 'standard';
                    break;
                case '2':
                    subType = 'backbar';
                break;
                case '3':
                    subType = 'damage';
                break;
            }
            
            let stCreateIntPOUrl = url.resolveScript({
                deploymentId        : objCreateIntPOUrl.DEPLOY_ID,
                scriptId            : objCreateIntPOUrl.SCRIPT_ID,
                returnExternalUrl   : true,
                params: {
                    pageMode    : 'create',
                    userId      : stUserId,
                    accesstype  : stAccessType,
                    rectype     : stType,
                    subtype     : subType 
                }
            });
            window.location = stCreateIntPOUrl;
        }
        function failure(reason) { console.log('Failure: ' + reason) }
        dialog.create(options).then(success).catch(failure);
    }

    return {
        pageInit,
        fieldChanged,
        back,
        toCreateTransaction,
        createInventoryAdjustment
    };
});