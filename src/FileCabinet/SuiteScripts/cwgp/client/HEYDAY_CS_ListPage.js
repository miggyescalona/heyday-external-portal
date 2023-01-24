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

define([], () => {
    /**
     * Function to be executed after page is initialized.
     *
     * @param {Object} context
     */
    const pageInit = (context) => {
        getAuthenticationScript();
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
        window.location = `https://5530036-sb1.extforms.netsuite.com/app/site/hosting/scriptlet.nl?script=686&deploy=1&compid=5530036_SB1&h=b8a78be5c27a4d76e7a8&pageMode=create&userId=${stUserId}&accesstype=${stAccessType}&rectype=${stType}`;
    };

    const back = (stUserId, stAccessType, stType) => {
        window.location = `https://5530036-sb1.extforms.netsuite.com/app/site/hosting/scriptlet.nl?script=682&deploy=1&compid=5530036_SB1&h=3eb96116ea1325a68f66&userId=${stUserId}&accesstype=${stAccessType}&rectype=${stType}`;
    };

    const getAuthenticationScript = () => {
        const validateToken = async (token) => {
            const result = await fetch('https://5530036-sb1.extforms.netsuite.com/app/site/hosting/scriptlet.nl?script=683&deploy=1&compid=5530036_SB1&h=13bf4568597809ee949b', {
                method: 'POST',
                body: JSON.stringify({
                    token: token,
                    requestType: 'validateToken'
                })
            });

            const objData = await result.json();

            if (objData.message != 'success') {
                return false;
            }

            return true;
        };

        const isLoggedIn = async () => {
            const stToken = window.localStorage.getItem('token');

            if (!stToken) { return false; }

            const isValidToken = await validateToken(stToken);

            if (isValidToken) {
                window.localStorage.setItem('token', stToken);
            }

            return isValidToken;
        };

        isLoggedIn().then((result) => {
            // If no token or not successful in validation, redirect to login page
            if (!result) {
                window.localStorage.removeItem('token');
                window.location = 'https://5530036-sb1.extforms.netsuite.com/app/site/hosting/scriptlet.nl?script=682&deploy=1&compid=5530036_SB1&h=3eb96116ea1325a68f66';

                return;
            }

            const stToken = window.localStorage.getItem('token');
       
            if (stToken) {
                const stDecodeToken = atob(stToken.split('.')[1]);
                const { accessType } = JSON.parse(stDecodeToken);

                const stQuery = window.location.search;
                const objParams = new URLSearchParams(stQuery);
                const stAccessTypeURL = objParams.get('accesstype');
                console.log('stAccessTypeURL', stAccessTypeURL);

                const bIsAccessTypeMismatched = (stAccessTypeURL != accessType);

                if (bIsAccessTypeMismatched) {
                    window.localStorage.removeItem('token');
                    window.location = 'https://5530036-sb1.extforms.netsuite.com/app/site/hosting/scriptlet.nl?script=682&deploy=1&compid=5530036_SB1&h=3eb96116ea1325a68f66';

                    return;
                }
            }

            const stBody = document.querySelector('body');
            stBody.style.filter = 'none';
            stBody.style.pointerEvents = 'auto';
        });
    };

    return {
        pageInit,
        fieldChanged,
        back,
        toCreateTransaction
    };
});