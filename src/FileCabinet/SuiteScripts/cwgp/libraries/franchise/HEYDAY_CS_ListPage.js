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

define(['N/url', 'N/ui/dialog', 'N/currentRecord', '../HEYDAY_LIB_ClientExternalPortal.js'], (url, dialog, currentRecord , ClientEPLib) => {
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
        const { currentRecord, fieldId } = context;

        let stRecType = getParameterFromURL('rectype');
        console.log('stRecType '+ stRecType);
        if(stRecType != 'itemperlocation'){
            let stURL = new URL(location.href);
            let intPage = currentRecord.getValue({ fieldId: 'custpage_cwgp_page' });
            let intApprovalStatus = currentRecord.getValue({ fieldId: 'custpage_cwgp_approvalstatus' });
            let intForReceiving = currentRecord.getValue({ fieldId: 'custpage_cwgp_forreceiving' });
            
            console.log(JSON.stringify(context));
            console.log(intApprovalStatus);
            console.log(intForReceiving);
            if (context.fieldId == 'custpage_cwgp_approvalstatus' && intApprovalStatus != '3') {
                console.log('custpage_cwgp_approvalstatus');
                intPage = '';
                intForReceiving = false;
            }

            if (context.fieldId == 'custpage_cwgp_forreceiving' && intForReceiving) {
                console.log('custpage_cwgp_forreceiving');
                intPage = '';
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
        }
        else{

            /*if(fieldId == 'custpage_cwgp_asof'){
                currentRecord.setValue({
                    fieldId: 'custpage_cwgp_from',
                    value: '',
                    ignoreFieldChange: true
                });
                currentRecord.setValue({
                    fieldId: 'custpage_cwgp_to',
                    value: '',
                    ignoreFieldChange: true
                });
            }
            else if(fieldId == 'custpage_cwgp_from' || fieldId == 'custpage_cwgp_to'){
                currentRecord.setValue({
                    fieldId: 'custpage_cwgp_asof',
                    value: '',
                    ignoreFieldChange: true
                });
            }*/

        }

        
    };

    //Used in button functionName; using multiple parameters
    const toCreateTransaction = (stUserId, stAccessType, stType) => {
        
        const objFranchiseUrl = ClientEPLib._CONFIG.FRANCHISE_PAGE[ClientEPLib._CONFIG.ENVIRONMENT];
        const stStep = stType == 'inventorycount' ? 1 : null; 

        
        let stCreateIntPOUrl = url.resolveScript({
            deploymentId        : objFranchiseUrl.DEPLOY_ID,
            scriptId            : objFranchiseUrl.SCRIPT_ID,
            returnExternalUrl   : true,
            params: {
                pageMode    : 'create',
                userId      : stUserId,
                accesstype  : stAccessType,
                rectype     : stType,
                step        : stStep
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

    const createInventoryAdjustment = (stUserId, stAccessType, stType) => {
        var options = {
            title: 'Create Inventory Adjustment',
            message: 'Please select what type of Inventory Adjustment to create:',
            buttons: [
                { label: 'Standard', value: 1 },
                { label: 'Backbar', value: 2 },
                { label: 'Damage', value: 3 },
                { label: 'Tester', value: 4 },
                { label: 'Theft', value: 5 },
                { label: 'Cancel', value: 0 },
            ]
        };
        function success(result) { 

            const objFranchiseUrl = ClientEPLib._CONFIG.FRANCHISE_PAGE[ClientEPLib._CONFIG.ENVIRONMENT];
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
                    subType = 'damage';
                break;
                case 4:
                    subType = 'tester';
                break;
                case 5:
                    subType = 'theft';
                break;
            }
            
            let stCreateIntPOUrl = url.resolveScript({
                deploymentId        : objFranchiseUrl.DEPLOY_ID,
                scriptId            : objFranchiseUrl.SCRIPT_ID,
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

            const objFranchiseUrl = ClientEPLib._CONFIG.FRANCHISE_PAGE[ClientEPLib._CONFIG.ENVIRONMENT];
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
                deploymentId        : objFranchiseUrl.DEPLOY_ID,
                scriptId            : objFranchiseUrl.SCRIPT_ID,
                returnExternalUrl   : true,
                params: {
                    pageMode    : 'create',
                    userId      : stUserId,
                    accesstype  : stAccessType,
                    rectype     : 'inventorycount',
                    subtype     : subType,
                    step        : 1
                }
            });
            window.location = stCreateIntPOUrl;
        }
        function failure(reason) { console.log('Failure: ' + reason) }
        dialog.create(options).then(success).catch(failure);
    }

    const loadInventoryCountDraft = (stUserId, stOperatorName,stAccessType, stCustomer, stSubsidiary,stLocation,stSubtype, stStep) => {
        const objFranchiseUrl = ClientEPLib._CONFIG.FRANCHISE_PAGE[ClientEPLib._CONFIG.ENVIRONMENT];
        let stCreateIntPOUrl = '';
        if(stStep == 1){
            stCreateIntPOUrl = url.resolveScript({
                deploymentId        : objFranchiseUrl.DEPLOY_ID,
                scriptId            : objFranchiseUrl.SCRIPT_ID,
                returnExternalUrl   : true,
                params: {
                    pageMode    : 'load',
                    userId      : stUserId,
                    accesstype  : stAccessType,
                    rectype     : 'inventorycount',
                    subtype     : stSubtype,
                    step        : stStep,
                    draft       : true
                }
            });
        }
        else{
            stCreateIntPOUrl = url.resolveScript({
                deploymentId        : objFranchiseUrl.DEPLOY_ID,
                scriptId            : objFranchiseUrl.SCRIPT_ID,
                returnExternalUrl   : true,
                params: {
                    pageMode    : 'load',
                    userId      : stUserId,
                    accesstype  : stAccessType,
                    rectype     : 'inventorycount',
                    subtype     : stSubtype,
                    step        : stStep,
                    draft       : true,
                    custpage_cwgp_userid      : stUserId,
                    custpage_cwgp_operator: stOperatorName,
                    custpage_cwgp_location: stLocation,
                    custpage_cwgp_accesstype  : stAccessType,
                    custpage_cwgp_rectype     : 'inventorycount',
                    custpage_cwgp_adjustmentsubtype     : stSubtype,
                    custpage_cwgp_customer: stCustomer,
                    custpage_cwgp_subsidiary: stSubsidiary
                }
            });
        }
        
        window.location = stCreateIntPOUrl;
    }

    /*const createInventoryAdjustment = (stUserId, stAccessType, stType) => {
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

            const objFranchiseUrl = ClientEPLib._CONFIG.FRANCHISE_PAGE[ClientEPLib._CONFIG.ENVIRONMENT]
            let subType;

            switch(result){
                case 1:
                    subType = 'standard';
                    break;
                case 2:
                    subType = 'backbar';
                break;
                case 3:
                    subType = 'damage';
                break;
            }
            
            let stCreateIntPOUrl = url.resolveScript({
                deploymentId        : objFranchiseUrl.DEPLOY_ID,
                scriptId            : objFranchiseUrl.SCRIPT_ID,
                returnExternalUrl   : true,
                params: {
                    pageMode    : 'create',
                    userId      : stUserId,
                    accesstype  : stAccessType,
                    rectype     : stType,
                    subtype     : subType 
                }
            });
            //console.log('stCreateIntPOUrl '+ stCreateIntPOUrl);
            window.location = stCreateIntPOUrl;
        }
        function failure(reason) { console.log('Failure: ' + reason) }
        dialog.create(options).then(success).catch(failure);
    }*/

    const searchItemPerLocation = (stUserId, stAccessType, stType) => {
        let rec = currentRecord.get();
        let intPage = rec.getValue({ fieldId: 'custpage_cwgp_page' });

        let dtAsOf = rec.getValue({ fieldId: 'custpage_cwgp_asof' });
        dtAsOf = new Date(dtAsOf);
        dtAsOf = (dtAsOf .getMonth() + 1) + "/" + dtAsOf.getDate() + "/" + dtAsOf.getFullYear();
        console.log('dtAsOf', dtAsOf);

        let dtFrom = rec.getValue({ fieldId: 'custpage_cwgp_from' });
        dtFrom = new Date(dtFrom);
        dtFrom = (dtFrom .getMonth() + 1) + "/" + dtFrom.getDate() + "/" + dtFrom.getFullYear();
        console.log('dtFrom', dtFrom);

        let dtTo = rec.getValue({ fieldId: 'custpage_cwgp_to' });
        dtTo = new Date(dtTo);
        dtTo = (dtTo.getMonth() + 1) + "/" + dtTo.getDate() + "/" + dtTo.getFullYear();
        console.log('dtTo', dtTo);
    	let dtFromD = new Date(dtFrom);
		let dtToD = new Date(dtTo);
        let params = {
            userId      : stUserId,
            accesstype  : stAccessType,
            rectype     : stType,
            pageMode    : 'list',
            custparam_cwgp_page: intPage,
            asof        : dtAsOf,
            from        : dtFrom,
            to          : dtTo
        };

        if((dtFrom != '' && dtTo == '' ) || (dtFrom == '' && dtTo != '' )){
			alert('Please enter Date From and Date To');
			return;
		}
        if(dtFromD > dtToD){
			alert('Date From must not be after Date To');
			return;
		}
        console.log('intPage '+ intPage);

        /*if(dtAsOf != ''){
            params.asof = dtAsOf;
        }
        else{
            params.from = dtFrom;
            params.to = dtTo;
        }*/

        const objFranchiseUrl = ClientEPLib._CONFIG.FRANCHISE_PAGE[ClientEPLib._CONFIG.ENVIRONMENT];

        let stRenderUrl = url.resolveScript({
            deploymentId        : objFranchiseUrl.DEPLOY_ID,
            scriptId            : objFranchiseUrl.SCRIPT_ID,
            returnExternalUrl   : true,
            params: params
        });

        window.onbeforeunload = null;
        window.location = stRenderUrl;
    };

    const getParameterFromURL = (param) => {
        if (param = (new RegExp('[?&]' + encodeURIComponent(param) + '=([^&]*)')).exec(location.search))
            return decodeURIComponent(param[1].replace(/\+/g, ' '));
    };

    return {
        pageInit,
        fieldChanged,
        back,
        toCreateTransaction,
        createInventoryAdjustment,
        searchItemPerLocation,
        createInventoryCount,
        loadInventoryCountDraft
    };
});