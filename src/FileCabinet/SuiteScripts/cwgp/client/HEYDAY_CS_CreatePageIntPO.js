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

define(['N/https', 'N/util', 'N/url', '../libraries/HEYDAY_LIB_ExternalPortal', '../libraries/HEYDAY_LIB_ClientExternalPortal'], (https, util, url, EPLib, ClientEPLib) => {
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
        const { currentRecord, fieldId, sublistId } = context;

        if(fieldId === 'custpage_cwgp_scanupccodes'){
            let strScannerInput = currentRecord.getValue({fieldId})
            currentRecord.setValue({
                fieldId,
                value   : ClientEPLib.processScannerInput({strScannerInput})
            })
        }

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

        if (sublistId === 'custpage_inventorayadjustment_items') {
            //default item details
            if (fieldId === 'custpage_cwgp_item') {
                const stItem = currentRecord.getCurrentSublistValue({
                    sublistId: 'custpage_inventorayadjustment_items',
                    fieldId: 'custpage_cwgp_item'
                });
                console.log('stItem', stItem);

                const objItem = getItemDetails(stItem);
                console.log('objItem', objItem);

                util.each(objItem, function (value, fieldId) {
                    currentRecord.setCurrentSublistValue({
                        sublistId: 'custpage_inventorayadjustment_items',
                        fieldId: fieldId,
                        value: value
                    });
                });
            }

            if (fieldId === 'custpage_cwgp_location') {
                const stItem = currentRecord.getCurrentSublistValue({
                    sublistId: 'custpage_inventorayadjustment_items',
                    fieldId: 'custpage_cwgp_item'
                });
                console.log('stItem', stItem);

                const stLocation = currentRecord.getCurrentSublistValue({
                    sublistId: 'custpage_inventorayadjustment_items',
                    fieldId: 'custpage_cwgp_location'
                });
                console.log('stItem', stItem);

                const objQtyOnHand = getItemQtyOnHand(stItem,stLocation);
                console.log('objQtyOnHand', objQtyOnHand);

                currentRecord.setCurrentSublistValue({
                    sublistId: 'custpage_inventorayadjustment_items',
                    fieldId: 'custpage_cwgp_qtyonhand',
                    value: objQtyOnHand || 0
                });
            }

            if (fieldId === 'custpage_cwgp_adjustqtyby') {
                const stAdjustQtyBy = currentRecord.getCurrentSublistValue({
                    sublistId: 'custpage_inventorayadjustment_items',
                    fieldId: 'custpage_cwgp_adjustqtyby'
                });

                const stQtyOnHand = currentRecord.getCurrentSublistValue({
                    sublistId: 'custpage_inventorayadjustment_items',
                    fieldId: 'custpage_cwgp_qtyonhand'
                });

                const stNewQty = stAdjustQtyBy + stQtyOnHand;

                currentRecord.setCurrentSublistValue({
                    sublistId: 'custpage_inventorayadjustment_items',
                    fieldId: 'custpage_cwgp_newquantity',
                    value: stNewQty || 0
                });
            }
            
        }
    };

    const getItemDetails = (stItem) => {

        const objCreateIntPOUrl = EPLib._CONFIG.CREATE_INTPO_PAGE[EPLib._CONFIG.ENVIRONMENT]

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

    const getItemQtyOnHand = (stItem,stLocation) =>{
        const objCreateIntPOUrl = EPLib._CONFIG.CREATE_INTPO_PAGE[EPLib._CONFIG.ENVIRONMENT]

        
        let stCreateIntPOBaseUrl = url.resolveScript({
            deploymentId        : objCreateIntPOUrl.DEPLOY_ID,
            scriptId            : objCreateIntPOUrl.SCRIPT_ID,
            returnExternalUrl   : true,
            params: {
                item: stItem,
                itemlocation: stLocation
            }
        });

        const objResponse = https.get({
            url: stCreateIntPOBaseUrl,
        });

        /*const objResponse = https.get({
            url: `https://5530036-sb1.extforms.netsuite.com/app/site/hosting/scriptlet.nl?script=689&deploy=1&compid=5530036_SB1&h=2f0abb66a0cbb01e8d05&item=${stItem}&itemlocation=${stLocation}`,
        });*/

        const { stQtyOnHand } = JSON.parse(objResponse.body);

        return stQtyOnHand;
    };

    const back = (stUserId, stAccessType, stRecType) =>{
       // window.location = `https://5530036-sb1.extforms.netsuite.com/app/site/hosting/scriptlet.nl?script=686&deploy=1&compid=5530036_SB1&h=b8a78be5c27a4d76e7a8&pageMode=list&userId=${stUserId}&accesstype=${stAccessType}&rectype=${stRecType}`;
   
        const objRetailUrl = EPLib._CONFIG.RETAIL_PAGE[EPLib._CONFIG.ENVIRONMENT]

        let stRetailUrl = url.resolveScript({
            deploymentId        : objRetailUrl.DEPLOY_ID,
            scriptId            : objRetailUrl.SCRIPT_ID,
            returnExternalUrl   : true,
            params: {
                pageMode    : 'list',
                userId      : stUserId,
                accesstype  : stAccessType,
                rectype     : stRecType
            }
        });

        window.location = stRetailUrl;
   
    };


    return {
        pageInit,
        fieldChanged,
        back
    };
});