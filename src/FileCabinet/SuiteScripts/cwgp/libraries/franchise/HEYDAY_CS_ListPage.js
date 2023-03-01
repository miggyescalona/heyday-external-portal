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
            message: 'Please select what type of inventory adjustment to create:',
            buttons: [
                { label: 'Standard', value: 1 },
                { label: 'Backbar', value: 2 },
                { label: 'Damage/Tester/Theft', value: 3 },
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
                    subType = 'damagetestertheft';
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
        let dtAsOf = rec.getText({fieldId: 'custpage_cwgp_asof'});
        let dtFrom = rec.getText({fieldId: 'custpage_cwgp_from'});
		let dtTo = rec.getText({fieldId: 'custpage_cwgp_to'});
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
        searchItemPerLocation
    };
});