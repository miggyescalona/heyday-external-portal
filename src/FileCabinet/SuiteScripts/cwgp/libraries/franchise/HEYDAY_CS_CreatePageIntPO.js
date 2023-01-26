/**
 * Author: Patricia Naguit
 * Date: 2022-12-10
 *
 * Date         Modified By            Notes
 * 2022-12-10   Patricia Naguit        Initial File Creation
 */

/**
 * @NApiVersion 2.1
 * @NScriptType ClientScript
 */

define(['N/https', 'N/util', 'N/url', '../HEYDAY_LIB_ClientExternalPortal.js'], (https, util, url, ClientEPLib) => {
    /**
     * Function to be executed when field is changed.
     *
     * @param {Object} context
     */
	
	const pageInit = (context) => {
        ClientEPLib.getAuthenticationScript();
    };
	
    const fieldChanged = (context) => {
        const { currentRecord, fieldId, sublistId } = context;

        if (sublistId === 'custpage_interpo_items') {
            //default item details
            if (fieldId === 'custpage_cwgp_item') {
                const stItem = currentRecord.getCurrentSublistValue({
                    sublistId: 'custpage_interpo_items',
                    fieldId: 'custpage_cwgp_item'
                });
                console.log('stItem', stItem);

                const objItem = getItemDetails(stItem);
                console.log('objItem', objItem);

                util.each(objItem, function (value, fieldId) {
                    currentRecord.setCurrentSublistValue({
                        sublistId: 'custpage_interpo_items',
                        fieldId: fieldId,
                        value: value
                    });
                });
            }

            if (fieldId === 'custpage_cwgp_quantity' || fieldId === 'custpage_cwgp_rate') {
                const intQty = currentRecord.getCurrentSublistValue({
                    sublistId: 'custpage_interpo_items',
                    fieldId: 'custpage_cwgp_quantity'
                });
                console.log('intQty', intQty);

                const flRate = currentRecord.getCurrentSublistValue({
                    sublistId: 'custpage_interpo_items',
                    fieldId: 'custpage_cwgp_rate'
                });
                console.log('flRate', flRate);

                currentRecord.setCurrentSublistValue({
                    sublistId: 'custpage_interpo_items',
                    fieldId: 'custpage_cwgp_amount',
                    value: flRate * intQty
                });

            }
        }
    };

    const getItemDetails = (stItem) => {

        const objCreateIntPOUrl = ClientEPLib._CONFIG.CREATE_INTPO_PAGE[ClientEPLib._CONFIG.ENVIRONMENT]
        
        let stCreateIntPOBaseUrl = url.resolveScript({
            deploymentId        : objCreateIntPOUrl.DEPLOY_ID,
            scriptId            : objCreateIntPOUrl.SCRIPT_ID,
            returnExternalUrl   : true,
            params: {
                item:   stItem
            }
        });

        const objResponse = https.get({
            url: stCreateIntPOBaseUrl,
        });

        const { item } = JSON.parse(objResponse.body);

        return {
            'custpage_cwgp_description': item.itemid,
            'custpage_cwgp_rate': item.cost || 0,
            'custpage_cwgp_quantity': 1,
            'custpage_cwgp_amount': item.cost || 0
        };
    };

    const back = (stUserId, stAccessType, stRecType) =>{
        
        const objFranchiseUrl = ClientEPLib._CONFIG.FRANCHISE_PAGE[ClientEPLib._CONFIG.ENVIRONMENT]
        
        let stFranchiseUrl = url.resolveScript({
            deploymentId        : objFranchiseUrl.DEPLOY_ID,
            scriptId            : objFranchiseUrl.SCRIPT_ID,
            returnExternalUrl   : true,
            params: {
                pageMode    : 'list',
                userId      : stUserId,
                accesstype  : stAccessType,
                rectype     : stRecType
            }
        });

        window.location = stFranchiseUrl;
    };

    return {
    	pageInit,
        fieldChanged,
        back
    };
});