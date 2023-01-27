/**
 * Author: Patricia Naguit
 * Date: 2022-12-14
 *
 * Date         Modified By            Notes
 * 2022-12-14   Patricia Naguit        Initial File Creation
 */

/**
 * @NApiVersion 2.1
 * @NScriptType ClientScript
 */

define([], () => {

    const pageInit = (context) => {
        getAuthenticationScript();
    };

    const toEdiTransaction = (stUserId, stPoId, stAccessType, stType) => {
        if(stType == 'franchisepo'){
            window.location = `https://5530036-sb1.extforms.netsuite.com/app/site/hosting/scriptlet.nl?script=690&deploy=1&compid=5530036_SB1&h=57cb2060b899d3e1ff54&pageMode=edit&userId=${stUserId}&poid=${stPoId}&accesstype=${stAccessType}&rectype=${stType}`;
        }
        else if(stType == 'itemreceipt'){
        	window.location = `https://5530036-sb1.extforms.netsuite.com/app/site/hosting/scriptlet.nl?script=690&deploy=1&compid=5530036_SB1&h=57cb2060b899d3e1ff54&pageMode=edit&userId=${stUserId}&poid=${stPoId}&accesstype=${stAccessType}&rectype=${stType}`;
        }
    };
    
    const approveTransaction = (stUserId, stPoId, stAccessType, stType) => {
        if(stType == 'franchisepo'){
            window.location = `https://5530036-sb1.extforms.netsuite.com/app/site/hosting/scriptlet.nl?script=690&deploy=1&compid=5530036_SB1&h=57cb2060b899d3e1ff54&pageMode=approve&userId=${stUserId}&poid=${stPoId}&accesstype=${stAccessType}&rectype=${stType}`;
        }
    };
    
    const receiveTransaction = (stUserId, stPoId, stAccessType, stType) => {
        if(stType == 'itemreceipt'){
            window.location = `https://5530036-sb1.extforms.netsuite.com/app/site/hosting/scriptlet.nl?script=690&deploy=1&compid=5530036_SB1&h=57cb2060b899d3e1ff54&pageMode=create&userId=${stUserId}&poid=${stPoId}&accesstype=${stAccessType}&rectype=${stType}`;
        }
    };

    const back = (stUserId, stAccessType, stType) => {
        window.location = `https://5530036-sb1.extforms.netsuite.com/app/site/hosting/scriptlet.nl?script=690&deploy=1&compid=5530036_SB1&h=57cb2060b899d3e1ff54&pageMode=list&userId=${stUserId}&accesstype=${stAccessType}&rectype=${stType}`;
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
        toEdiTransaction,
        approveTransaction,
        receiveTransaction,
        back
    };
});