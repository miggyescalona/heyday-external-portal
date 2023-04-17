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

define(['N/currentRecord','N/url', 'N/ui/dialog','../libraries/HEYDAY_LIB_ClientExternalPortal.js', 'N/search'], (currentRecord, url, dialog, ClientEPLib, search) => {
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
        console.log('context', context);
        let stRecType = getParameterFromURL('rectype');

        if (context.fieldId == 'custpage_cwgp_page' && stRecType != 'itemperlocation') {

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

        if (context.fieldId == 'custpage_cwgp_approvalstatus') {
            const intApprovalStatus = currentRecord.getValue({ fieldId: 'custpage_cwgp_approvalstatus' });
            console.log('approvalstatus', intApprovalStatus);

            let stURL = new URL(location.href);

            let objParams = stURL.searchParams;
            objParams.set('custparam_cwgp_approvalstatus', intApprovalStatus);

            stURL.search = objParams.toString();

            const stNewURL = stURL.toString();
            log.debug('stNewURL', stNewURL);

            //bypass the "Leave Changes" alert box
            window.onbeforeunload = null;
            location.href = stNewURL;
        }

        if (context.fieldId == 'custpage_cwgp_forreceiving') {
            const blForReceiving = currentRecord.getValue({ fieldId: 'custpage_cwgp_forreceiving' });
            console.log('forreceiving', blForReceiving);

            let stURL = new URL(location.href);

            let objParams = stURL.searchParams;
            objParams.set('custparam_cwgp_forreceiving', blForReceiving);

            stURL.search = objParams.toString();

            const stNewURL = stURL.toString();
            log.debug('stNewURL', stNewURL);

            //bypass the "Leave Changes" alert box
            window.onbeforeunload = null;
            location.href = stNewURL;
        }
    };

    const searchFilters = () => {

        const currRec = currentRecord.get();

        const intPage = currRec.getValue({ fieldId: 'custpage_cwgp_page' });
        console.log('page', intPage);

        const dtAsOf = currRec.getValue({ fieldId: 'custpage_cwgp_asof' });
        console.log('dtAsOf', dtAsOf);

        const dtFrom = currRec.getValue({ fieldId: 'custpage_cwgp_from' });
        console.log('dtFrom', dtFrom);

        const dtTo = currRec.getValue({ fieldId: 'custpage_cwgp_to' });
        console.log('dtTo', dtTo);

        if((dtFrom && !dtTo) || (!dtFrom && dtTo)){
            alert('You need to enter both Date From and Date To');
            return false;
        }

        if(dtFrom && dtTo){
            if(dtTo < dtFrom){
                alert('Date To cannot be before Date From.')
                return false;
            }
        }

        let stURL = new URL(location.href);

        let objParams = stURL.searchParams;
        objParams.set('custparam_cwgp_page', intPage);
        objParams.set('custparam_cwgp_asof', dtAsOf);
        objParams.set('custparam_cwgp_datefrom', dtFrom);
        objParams.set('custparam_cwgp_dateto', dtTo);

        stURL.search = objParams.toString();

        const stNewURL = stURL.toString();
        log.debug('stNewURL', stNewURL);

        //bypass the "Leave Changes" alert box
        window.onbeforeunload = null;
        location.href = stNewURL;
    }

    const toCreateTransaction = (stUserId, stAccessType, stType) => {
        //redurect to create transaction page
       // window.location = `https://5530036-sb1.extforms.netsuite.com/app/site/hosting/scriptlet.nl?script=686&deploy=1&compid=5530036_SB1&h=b8a78be5c27a4d76e7a8&pageMode=create&userId=${stUserId}&accesstype=${stAccessType}&rectype=${stType}`;
   
       const objCreateIntPOUrl = ClientEPLib._CONFIG.RETAIL_PAGE[ClientEPLib._CONFIG.ENVIRONMENT]
       const stStep = stType == 'inventorycount' ? 1 : null; 

       let stCreateIntPOUrl = url.resolveScript({
           deploymentId        : objCreateIntPOUrl.DEPLOY_ID,
           scriptId            : objCreateIntPOUrl.SCRIPT_ID,
           returnExternalUrl   : true,
           params: {
               pageMode    : 'create',
               userId      : stUserId,
               accesstype  : stAccessType,
               rectype     : stType,
               step        : stStep
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
        /*let objSubTypes;
        search.create({
            type: "customlist_cwgp_inventoryadjustmentsub",
            filters:
                [
                ],
            columns:
                [
                    search.createColumn({ name: 'name' })
                ]
        }).run().each(function (result) {
            objSubTypes.push({
                label: result.getValue({ name: 'name' }),
                value: result.id
            });
            return true;
        });

        alert(objSubTypes);*/

        var options = {
            title: 'Create Inventory Adjustment',
            message: 'Please select what type of Inventory Adjustment to create:',
            buttons: [
                { label: 'Standard', value: 1 },
                { label: 'Backbar', value: 2 },
                { label: 'Damage/Tester/Theft', value: 3 },
                { label: 'Cancel', value: 0 }
            ]
        };
        function success(result) { 

            const objCreateIntPOUrl = ClientEPLib._CONFIG.RETAIL_PAGE[ClientEPLib._CONFIG.ENVIRONMENT]
            let subType;

            switch(result){
                case 0:
                    return;
                case 1:
                    subType = 'standard';
                    break;
                case 2:
                    subType = 'backbar';
                    break;
                case 3:
                    subType = 'damagetestertheft';
                    break;
                case 4:
                    subType = 'inventorycountinitial';
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

    const createInventoryCount = (stUserId, stAccessType, stType) => {
        var options = {
            title: 'Create Inventory Count',
            message: 'Please select what type of Inventory Count to create:',
            buttons: [
                { label: 'Retail', value: 1 },
                { label: 'Backbar', value: 2 },
                { label: 'Cancel', value: 0 },
            ]
        };
        function success(result) { 

            const objCreateIntPOUrl = ClientEPLib._CONFIG.RETAIL_PAGE[ClientEPLib._CONFIG.ENVIRONMENT]
            let subType;

            switch(result){
                case 0:
                    return;
                case 1:
                    subType = 'Retail';
                    break;
                case 2:
                    subType = 'Backbar';
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
                    subtype     : subType,
                    step        : 1
                }
            });
            window.location = stCreateIntPOUrl;
        }
        function failure(reason) { console.log('Failure: ' + reason) }
        dialog.create(options).then(success).catch(failure);
    }

    const getParameterFromURL = (param) => {
        if (param = (new RegExp('[?&]' + encodeURIComponent(param) + '=([^&]*)')).exec(location.search))
            return decodeURIComponent(param[1].replace(/\+/g, ' '));
    };

    return {
        pageInit,
        fieldChanged,
        searchFilters,
        back,
        toCreateTransaction,
        createInventoryAdjustment,
        createInventoryCount
    };
});