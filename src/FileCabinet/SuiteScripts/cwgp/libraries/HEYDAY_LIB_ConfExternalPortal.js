/**
 * HEYDAY_LIB_ExternalPortalConf.js
 * Author: Louis Dumlao
 * Date: 2023-01-24
 *
 * Date         Modified By            Notes
 * 2023-01-24   Louis Dumlao           Initial File Creation
 */

/**
 * @NApiVersion 2.1
 * @NModuleScope Public
 */

define([], () => {
    const _CONFIG = {
        ENVIRONMENT: 'DEV',

        AUTH_PAGE: {
            DEV: {
                SCRIPT_ID: 701,
                DEPLOY_ID: 1
            },
            SB: {
                SCRIPT_ID: 683,
                DEPLOY_ID: 1
            },
            PROD: {
                SCRIPT_ID: 9999,
                DEPLOY_ID: 1
            }
        },
        RENDER_PAGE: {
            DEV: {
                SCRIPT_ID: 706,
                DEPLOY_ID: 1
            },
            SB: {
                SCRIPT_ID: 682,
                DEPLOY_ID: 1
            },
            PROD: {
                SCRIPT_ID: 9999,
                DEPLOY_ID: 1
            }
        },
        FRANCHISE_PAGE: {
            SB: {
                SCRIPT_ID: 690,
                DEPLOY_ID: 1
            },
            DEV: {
                SCRIPT_ID: 703,
                DEPLOY_ID: 1
            },
            PROD: {
                SCRIPT_ID: 9999,
                DEPLOY_ID: 1
            }
        },
        RETAIL_PAGE: {
            DEV: {
                SCRIPT_ID: 705,
                DEPLOY_ID: 1
            },
            SB: {
                SCRIPT_ID: 686,
                DEPLOY_ID: 1
            },
            PROD: {
                SCRIPT_ID: 9999,
                DEPLOY_ID: 1
            }
        },
        CREATE_INTPO_PAGE: {
            DEV: {
                SCRIPT_ID: 702,
                DEPLOY_ID: 1
            },
            SB: {
                SCRIPT_ID: 689,
                DEPLOY_ID: 1
            },
            PROD: {
                SCRIPT_ID: 9999,
                DEPLOY_ID: 1
            }
        }

        
    };

    return {
        _CONFIG,
    }
});