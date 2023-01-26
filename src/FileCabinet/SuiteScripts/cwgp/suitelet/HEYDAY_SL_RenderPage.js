/**
 * Author: Patricia Naguit
 * Date: 2022-11-22
 *
 * Date         Modified By            Notes
 * 2022-11-22   Patricia Naguit        Initial File Creation
 */

/**
 * @NApiVersion 2.1
 * @NScriptType Suitelet
 */

define(['N/ui/serverWidget', 'N/url', '../libraries/HEYDAY_LIB_ExternalPortal'], (serverWidget, url, EPLib) => {
    const _CONFIG = {
        ROUTES: {
            LOGIN: '0',
            FRANCHISE: '1',
            RETAIL: '2'
        }
    };

    const renderPage = (body, pageScript, response) => {
        const pageHTML = /*html*/`
            <!DOCTYPE html>
            <html lang="en" class="js-controller">
                <style>
                    @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300&display=swap');
                    @import url('https://fonts.googleapis.com/css2?family=Roboto+Mono:ital,wght@0,300;1,200&family=Roboto:wght@300&display=swap');

                    html,
                    body {
                        height: 100%;
                        color: #333f48;
                    }

                    .main{
                        width: 100%;
                        height: 100%;
                    }

                    .logo {
                        display: block;
                        margin: 22px auto 22px auto;
                    }

                    .logodiv {
                        border-bottom: 1px solid black;
                    }

                    .accesstypetxt {
                        font-weight: 400;
                        margin-top: 45px;
                        border-bottom: 1px solid #dbc8b6;
                    }

                    .signintxt {
                        font-weight: 400;
                        margin-top: 45px;
                        margin-left: 50px;
                    }

                    .navbutton {
                        font-family: 'Roboto', sans-serif;
                        font-family: 'Roboto Mono', monospace;
                        border: 0.5px solid #333f48;
                        color: #333f48;
                        margin-top: 20px;
                        background-color: transparent;
                        font-size: 16px;
                        padding: 10px;
                        width: 20%;
                        transition-duration: 0.4s;
                        margin-left: 7px;
                    }

                    .navbutton:hover {
                        background-color: #333f48;
                        color: white;
                    }

                    .buttonsdiv {
                        display: flex;
                        justify-content: center;
                    }

                    .form_message {
                        color: #c6a992;
                        font-family: 'Roboto', sans-serif;
                        font-size: 1.5rem;
                        letter-spacing: .02em;
                        line-height: 2rem;
                        text-align: left;
                        text-transform: capitalize;
                    }

                    .input_label {
                        display: block;
                        position: relative;
                        color: #989ea3;
                        font-family: 'Roboto', sans-serif;
                        font-family: 'Roboto Mono', monospace;
                        font-size: 14px;
                        line-height: 1.375rem;
                    }

                    .login_button {
                        font-family: 'Roboto', sans-serif;
                        font-family: 'Roboto Mono', monospace;
                        border: 0.5px solid #333f48;
                        color: #333f48;
                        margin-top: 20px;
                        background-color: transparent;
                        font-size: 14px;
                        padding: 10px;
                        width: 15%;
                        transition-duration: 0.4s;
                    }

                    .login_button:hover {
                        background-color: #333f48;
                        color: white;
                    }

                    input {
                        padding: 13px;
                        width: 25%;
                        margin-bottom: 25px;
                        border: none;
                        border-bottom: 1px solid #dbc8b6;
                    }

                    input:focus {
                        outline: none;
                    }

                    .signin {
                        width: 30%;
                        background-color: #f8f4f0;
                        min-height: 1px;
                    }

                    .loginform {
                        width: 70%;
                        margin-left: 55px;
                        margin-top: 50px;
                    }

                    .row {
                        height: 100%;
                        width: 100%;
                        display: flex;
                    }

                    .logo {
                        display: block;
                        margin: 22px auto 22px auto;
                    }

                    .logodiv {
                        border-bottom: 1px solid black;
                        display:flex;
                    }

                    .js-controller .main {
                        display: none !important;
                    }

                    .logout_button {
                        background-color: #105368;
                        padding: 14px;
                        color: white;
                        border: 0.5px solid #105368;
                        border-radius: 6px;
                        margin: 22px 22px 22px 0px;
                        font-size: 14px;
                    }

                    .logout_button:hover {
                        border: 0.5px solid #105368;
                        color: #105368;
                        background-color: transparent;
                    }
                </style>

                 <!-- Display body only if JavaScript is turned on -->
                 <script>
                    document.documentElement.classList.remove('js-controller');

                    ${pageScript}
                </script>

                <body>
                    <noscript>This page requires JavaScript to execute. Please turn on JavaScript.</noscript>

                    ${body}
                </body>
            </html>`;

        response.write(pageHTML);
    };

    const renderRetailPage = (response) => {

        const objRetailUrl = EPLib._CONFIG.RETAIL_PAGE[EPLib._CONFIG.ENVIRONMENT]
        
        let stRetailBaseUrl = url.resolveScript({
            deploymentId        : objRetailUrl.DEPLOY_ID,
            scriptId            : objRetailUrl.SCRIPT_ID,
            returnExternalUrl       : true
        });
        
        const objRenderUrl = EPLib._CONFIG.RENDER_PAGE[EPLib._CONFIG.ENVIRONMENT]

        let stRenderBaseURL = url.resolveScript({
            deploymentId        : objRenderUrl.DEPLOY_ID,
            scriptId            : objRenderUrl.SCRIPT_ID,
            returnExternalUrl   : true
        });

        const stBody = /*html*/`
            <div class="main" style="display: none;">
                <div class='logodiv'>
                    <img src="https://5530036-sb1.app.netsuite.com/core/media/media.nl?id=2104&c=5530036_SB1&h=q1N0kn_SCWYHFfC-t0PwcQzbdZFgQ65kfVecvpGZ9WCjlMDA"
                        width="100" height="55" class="logo">
                    <div class="logoutdiv"><button id="cwgp_logout_btn" class="logout_button">Logout</button></div>
                </div>

                <div>
                    <div class="accesstype">
                        <h1 class="accesstypetxt">Retail</h1>
                    </div>
                    <div class="buttonsdiv">
                        <br>
                        <button type="button" id="cwgp_intpo_btn" class="navbutton">Intercompany P.O.</button>
                        <br>
                        <button type="button" id="cwgp_ir_btn" class="navbutton">Item Receipt</button>
                        <br>
                        <button type="button" id="cwgp_ia_btn" class="navbutton">Inventory Adjustment</button>
                    </div>
                </div>

                <script>
                    const btnLogout = document.getElementById('cwgp_logout_btn');

                    btnLogout.addEventListener('click', () => {
                        window.localStorage.removeItem('token');
                        window.location = '${stRenderBaseURL}';
                    });

                    const btnIntPo = document.getElementById('cwgp_intpo_btn');
                    btnIntPo.addEventListener('click', () => {
                        const stQuery = window.location.search;
                        const objParams = new URLSearchParams(stQuery);
                        const stUserId = objParams.get('userId');
                        const stAccessType = objParams.get('accesstype');

                        window.location = '${stRetailBaseUrl}&pageMode=list&userId=' + stUserId + '&accesstype=' + stAccessType +'&rectype=intercompanypo';
                    });

                    const btnItemReceipt = document.getElementById('cwgp_ir_btn');
                    btnItemReceipt.addEventListener('click', () => {
                        const stQuery = window.location.search;
                        const objParams = new URLSearchParams(stQuery);
                        const stUserId = objParams.get('userId');
                        const stAccessType = objParams.get('accesstype');

                        window.location = '${stRetailBaseUrl}&pageMode=list&userId=' + stUserId + '&accesstype=' + stAccessType +'&rectype=itemreceipt';
                    });

                    const btnInventoryAdjustment = document.getElementById('cwgp_ia_btn');
                    btnInventoryAdjustment.addEventListener('click', () => {
                        const stQuery = window.location.search;
                        const objParams = new URLSearchParams(stQuery);
                        const stUserId = objParams.get('userId');
                        const stAccessType = objParams.get('accesstype');

                        window.location = '${stRetailBaseUrl}&pageMode=list&userId=' + stUserId + '&accesstype=' + stAccessType +'&rectype=inventoryadjustment';
                    });

                    const btnItemPerLocation = document.getElementById('cwgp_ipl_btn');
                    btnItemPerLocation.addEventListener('click', () => {
                        const stQuery = window.location.search;
                        const objParams = new URLSearchParams(stQuery);
                        const stUserId = objParams.get('userId');
                        const stAccessType = objParams.get('accesstype');

                        window.location = ${stRetailBaseUrl}&deploy=1&compid=5530036_SB1&h=b8a78be5c27a4d76e7a8&pageMode=list&userId=' + stUserId + '&accesstype=' + stAccessType +'&rectype=itemperlocation';
                    });

                </script>
            </div>`;

        const stScript = getAuthenticationScript();

        renderPage(stBody, stScript, response);
    };

    const renderFranchisePage = (response) => {

        const objFranchiseUrl = EPLib._CONFIG.FRANCHISE_PAGE[EPLib._CONFIG.ENVIRONMENT]
        
        let stFranchiseBaseUrl = url.resolveScript({
            deploymentId        : objFranchiseUrl.DEPLOY_ID,
            scriptId            : objFranchiseUrl.SCRIPT_ID,
            returnExternalUrl       : true
        });
        
        const objRenderUrl = EPLib._CONFIG.RENDER_PAGE[EPLib._CONFIG.ENVIRONMENT]

        let stRenderBaseURL = url.resolveScript({
            deploymentId        : objRenderUrl.DEPLOY_ID,
            scriptId            : objRenderUrl.SCRIPT_ID,
            returnExternalUrl   : true
        });

        const stBody = /*html*/`
            <div class="main" style="display: none;">
                <div class="logodiv">
                    <img src="https://5530036-sb1.app.netsuite.com/core/media/media.nl?id=2104&c=5530036_SB1&h=q1N0kn_SCWYHFfC-t0PwcQzbdZFgQ65kfVecvpGZ9WCjlMDA"
                        width="100" height="55" class="logo">
                    
                    <div class="logoutdiv"><button id="cwgp_logout_btn" class="logout_button">Logout</button></div>
                </div>

                <div>
                    <div class="accesstype">
                        <h1 class="accesstypetxt">Franchise</h1>
                    </div>
                    <div class="buttonsdiv">
                        <br>
                        <button type="button" id="cwgp_so_btn" class="navbutton">Purchase Order</button>
                        <br>
                        <button type="button" id="cwgp_ir_franchise_btn" class="navbutton">Item Receipt</button>
                        <br>
                        <button type="button" id="cwgp_ia_franchise_btn" class="navbutton">Inventory Adjustment</button>
                    </div>
                </div>

                <script>
                    const btnLogout = document.getElementById('cwgp_logout_btn');
                    btnLogout.addEventListener('click', () => {
                        window.localStorage.removeItem('token');
                        window.location = '${stRenderBaseURL}';
                    });
                    
                    const btnISalesOrder = document.getElementById('cwgp_so_btn');
                    btnISalesOrder.addEventListener('click', () => {
                        const stQuery = window.location.search;
                        const objParams = new URLSearchParams(stQuery);
                        const stUserId = objParams.get('userId');
                        const stAccessType = objParams.get('accesstype');

                        window.location = '${stFranchiseBaseUrl}&pageMode=list&userId=' + stUserId + '&accesstype=' + stAccessType +'&rectype=franchisepo';
                    });
                    const btnItemReceiptFranchise = document.getElementById('cwgp_ir_franchise_btn');
                    btnItemReceiptFranchise.addEventListener('click', () => {
                        const stQuery = window.location.search;
                        const objParams = new URLSearchParams(stQuery);
                        const stUserId = objParams.get('userId');
                        const stAccessType = objParams.get('accesstype');

                        window.location = '${stFranchiseBaseUrl}&pageMode=list&userId=' + stUserId + '&accesstype=' + stAccessType +'&rectype=itemreceipt';
                    });
                    
                </script>
            </div>`;

        const stScript = getAuthenticationScript();

        renderPage(stBody, stScript, response);
    };

    const renderLoginPage = (response) => {

        const objAuthUrl = EPLib._CONFIG.AUTH_PAGE[EPLib._CONFIG.ENVIRONMENT]
        
        let stAuthBaseUrl = url.resolveScript({
            deploymentId        : objAuthUrl.DEPLOY_ID,
            scriptId            : objAuthUrl.SCRIPT_ID,
            returnExternalUrl    : true
        });
        
        const objRenderUrl = EPLib._CONFIG.RENDER_PAGE[EPLib._CONFIG.ENVIRONMENT]

        let stRenderBaseURL = url.resolveScript({
            deploymentId        : objRenderUrl.DEPLOY_ID,
            scriptId            : objRenderUrl.SCRIPT_ID,
            returnExternalUrl   : true
        });

        const stBody = /*html*/`
            <div class="main">
                <div class="logodiv">
                    <img src="https://5530036-sb1.app.netsuite.com/core/media/media.nl?id=2104&c=5530036_SB1&h=q1N0kn_SCWYHFfC-t0PwcQzbdZFgQ65kfVecvpGZ9WCjlMDA"
                        width="100" height="55" class="logo">
                </div>

                <div class="row">
                    <div class="column signin">
                        <h1 class="signintxt">Sign In</h1>
                    </div>
                    <div class="column loginform">
                        <p class="form_message">Please Enter Your Details</p>

                        <label for="cwgp_username" class="input_label">Username</label>
                        <input type="text" id="cwgp_username">

                        <br>
                        <label for="cwgp_password" class="input_label">Password</label>
                        <input type="password" id="cwgp_password">

                        <br>
                        <button type="button" id="cwgp_login_btn" class="login_button">Sign In</button>
                    </div>
                </div>

                <script>
                    const btnLogin = document.getElementById('cwgp_login_btn');

                    btnLogin.addEventListener('click', () => {
                        const username = document.getElementById('cwgp_username').value;
                        const password = document.getElementById('cwgp_password').value;

                        if (!username || !password) {
                            alert('No username or password provided.');
                            return;
                        }

                        const response = fetch('${stAuthBaseUrl}', {
                            method: 'POST',
                            body: JSON.stringify({
                                username,
                                password,
                                requestType: 'login'
                            })
                        })
                            .then((response) => response.json())
                            .then((objData) => {
                                if (objData.message != 'success') {
                                    alert(objData.message);
                                    
                                    return;
                                }

                                window.localStorage.setItem('token', objData.token);

                                window.location = '${stRenderBaseURL}&accesstype=' + objData.accessType +'&userId=' + objData.userId ;
                            });
                    });
                </script>
            </div>`;

        const stScript = /*es6*/`
            const stToken = window.localStorage.getItem('token')
            console.log('token', stToken)

            if (stToken) {
                try {
                    const stDecodeToken = atob(stToken.split('.')[1]);
                    const { accessType } = JSON.parse(stDecodeToken);
					const { id } = JSON.parse(stDecodeToken);
                    console.log('stDecodeToken', stDecodeToken);

                    window.location = '${stRenderBaseURL}&accesstype=' + accessType +'&userId=' + id;
                } catch (e) {
                    console.log(e);
                    window.localStorage.removeItem('token');
                }
            }
            `;

        renderPage(stBody, stScript, response);
    };

    const getAuthenticationScript = () => {
        
        const objAuthUrl = EPLib._CONFIG.AUTH_PAGE[EPLib._CONFIG.ENVIRONMENT]
        
        let stAuthBaseUrl = url.resolveScript({
            deploymentId        : objAuthUrl.DEPLOY_ID,
            scriptId            : objAuthUrl.SCRIPT_ID,
            returnExternalUrl       : true
        });
        
        const objRenderUrl = EPLib._CONFIG.RENDER_PAGE[EPLib._CONFIG.ENVIRONMENT]

        let stRenderBaseURL = url.resolveScript({
            deploymentId        : objRenderUrl.DEPLOY_ID,
            scriptId            : objRenderUrl.SCRIPT_ID,
            returnExternalUrl   : true
        });
    
        const stScript = /*es6*/`
        const validateToken = async (token) => {
            const result = await fetch('${stAuthBaseUrl}', {
                method: 'POST',
                body: JSON.stringify({
                    token: token,
                    requestType: 'validateToken'
                })
            });
            
            const objData = await result.json();
            console.log('objData', objData);

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
                window.location = '${stRenderBaseURL}';

                return;
            }

            const stToken = window.localStorage.getItem('token');
            //console.log('bIsLoggedIn token', stToken);

            if(stToken){
                const stDecodeToken = atob(stToken.split('.')[1]);
                const { accessType } = JSON.parse(stDecodeToken);

                const stQuery = window.location.search;
                const objParams = new URLSearchParams(stQuery);
                const stAccessTypeURL = objParams.get('accesstype');
                console.log('stAccessTypeURL', stAccessTypeURL);

                const bIsAccessTypeMismatched = (stAccessTypeURL != accessType);

                if (bIsAccessTypeMismatched) {
                    window.localStorage.removeItem('token');
                    window.location = '${stRenderBaseURL}';

                    return;
                }
            }

            const stMainDiv = document.querySelector('.main');
            stMainDiv.style.display = 'block';
        });`;

        return stScript;
    }

    const PAGE_ROUTERS = {
        [_CONFIG.ROUTES.LOGIN]: renderLoginPage,
        [_CONFIG.ROUTES.FRANCHISE]: renderFranchisePage,
        [_CONFIG.ROUTES.RETAIL]: renderRetailPage
    };

    const executePageRouting = (response, stAccessType) => {
        const routePage = PAGE_ROUTERS[stAccessType];
        routePage(response);
    };

    /**
     * Definition of the Suitelet script trigger point.
     *
     * @param {Object} context
     */
    const onRequest = (context) => {
        const { request, response } = context;

        if (request.method === 'GET') {
            const objParams = request.parameters;
            const stAccessType = objParams.accesstype ?? 0;

            log.debug('objParams', objParams);
            log.debug('stAccessType', stAccessType);

            executePageRouting(response, stAccessType);
        }
    };

    return { onRequest };
});