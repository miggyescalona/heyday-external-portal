/**
 * Author: Patricia Naguit
 * Date: 2022-10-22
 *
 * Date         Modified By            Notes
 * 2022-10-22   Patricia Naguit        Initial File Creation
 */

/**
 * @NApiVersion 2.1
 * @NModuleScope Public
 */

define(['N/ui/serverWidget', 'N/search', './HEYDAY_LIB_Util.js'], (serverWidget, search, util) => {
    const _CONFIG = {
        PARAMETER: {
            PAGE: 'custparam_cwgp_page'
        },
        TITLE: {
        	franchisepo: 'Purchase Order',
        	itemreceipt: 'Item Receipts',
        },
        TAB: {
        	franchisepo: 'custpage_interpo_listtab_retail',
        	itemreceipt: 'custpage_ir_listtab_franchise',
        	
        	
        },
        SUBLIST: {
            franchisepo: 'custpage_interpo_items',
            itemreceipt: 'custpage_itemreceipt_items'
        },
        FIELD: {
            franchisepo: {
                HTML_CSS: {
                    id: 'custpage_cwgp_htmlcss',
                    type: serverWidget.FieldType.INLINEHTML,
                    label: 'Html Css',
                },
                PAGE_MODE: {
                    id: 'custpage_cwgp_pagemode',
                    type: serverWidget.FieldType.TEXT,
                    label: 'pageMode',
                    displayType: 'hidden'
                },
                USER_ID: {
                    id: 'custpage_cwgp_userid',
                    type: serverWidget.FieldType.TEXT,
                    label: 'userId',
                    displayType: 'hidden'
                },
                ACCESS_TYPE: {
                    id: 'custpage_cwgp_accesstype',
                    type: serverWidget.FieldType.TEXT,
                    label: 'accessType',
                    displayType: 'hidden'
                },
                PO_ID: {
                    id: 'custpage_cwgp_poid',
                    type: serverWidget.FieldType.TEXT,
                    label: 'poId',
                    displayType: 'hidden'
                },
                REC_TYPE: {
                    id: 'custpage_cwgp_rectype',
                    type: serverWidget.FieldType.TEXT,
                    label: 'recType',
                    displayType: 'hidden'
                },
                ORDERNO: {
                    id: 'custpage_cwgp_orderno',
                    type: serverWidget.FieldType.TEXT,
                    label: 'Order #',
                    container: 'PRIMARY',
                    displayType: 'inline'
                },
                CUSTOMER: {
                    id: 'custpage_cwgp_customer',
                    type: serverWidget.FieldType.SELECT,
                    label: 'Customer',
                    container: 'PRIMARY',
                    source: 'customer',
                    mandatory: true,
                    displayType: 'inline'
                },
                DATE: {
                    id: 'custpage_cwgp_date',
                    type: serverWidget.FieldType.DATE,
                    label: 'Date',
                    container: 'PRIMARY',
                    mandatory: true,
                    defaultValue: new Date()
                },
                MEMO: {
                    id: 'custpage_cwgp_memomain',
                    type: serverWidget.FieldType.TEXT,
                    label: 'Memo',
                    container: 'PRIMARY',
                },
                SUBSIDIARY: {
                    id: 'custpage_cwgp_subsidiary',
                    type: serverWidget.FieldType.SELECT,
                    label: 'Subsidiary',
                    source: 'subsidiary',
                    container: 'CLASS',
                    displayType: 'inline'
                },
                LOCATION: {
                    id: 'custpage_cwgp_location',
                    type: serverWidget.FieldType.SELECT,
                    label: 'Location',
                    container: 'CLASS',
                    source: 'location',
                    displayType: 'inline',
                    mandatory: true
                },
            },
            itemreceipt: {
                HTML_CSS: {
                    id: 'custpage_cwgp_htmlcss',
                    type: serverWidget.FieldType.INLINEHTML,
                    label: 'Html Css',
                },
                PAGE_MODE: {
                    id: 'custpage_cwgp_pagemode',
                    type: serverWidget.FieldType.TEXT,
                    label: 'pageMode',
                    displayType: 'hidden'
                },
                USER_ID: {
                    id: 'custpage_cwgp_userid',
                    type: serverWidget.FieldType.TEXT,
                    label: 'pageMode',
                    displayType: 'hidden'
                },
                ACCESS_TYPE: {
                    id: 'custpage_cwgp_accesstype',
                    type: serverWidget.FieldType.TEXT,
                    label: 'accessType',
                    displayType: 'hidden'
                },
                REC_ID: {
                    id: 'custpage_cwgp_recid',
                    type: serverWidget.FieldType.TEXT,
                    label: 'recId',
                    //displayType: 'hidden'
                },
                PO_ID: {
                    id: 'custpage_cwgp_poid',
                    type: serverWidget.FieldType.TEXT,
                    label: 'poId',
                    //displayType: 'hidden'
                },
                REC_TYPE: {
                    id: 'custpage_cwgp_rectype',
                    type: serverWidget.FieldType.TEXT,
                    label: 'recType',
                    displayType: 'hidden'
                },
                CUSTOMER: {
                    id: 'custpage_cwgp_customer',
                    type: serverWidget.FieldType.SELECT,
                    label: 'Customer',
                    container: 'PRIMARY',
                    source: 'customer',
                    mandatory: true,
                    displayType: 'inline'
                },
                DATE: {
                    id: 'custpage_cwgp_date',
                    type: serverWidget.FieldType.DATE,
                    label: 'Date',
                    container: 'PRIMARY',
                    mandatory: true
                },
                MEMO: {
                    id: 'custpage_cwgp_memomain',
                    type: serverWidget.FieldType.TEXT,
                    label: 'Memo',
                    container: 'PRIMARY',
                    displayType: 'inline'
                },
                SUBSIDIARY: {
                    id: 'custpage_cwgp_subsidiary',
                    type: serverWidget.FieldType.SELECT,
                    label: 'Subsidiary',
                    source: 'subsidiary',
                    container: 'CLASS',
                    displayType: 'inline'
                },
            }
        },
        COLUMN: {
            LIST: {
            	franchisepo: {
                    TRAN_NO: {
                        id: 'custpage_cwgp_tranid',
                        type: serverWidget.FieldType.TEXT,
                        label: 'Transaction No'
                    },
                    DATE: {
                        id: 'custpage_cwgp_trandate',
                        type: serverWidget.FieldType.TEXT,
                        label: 'Date'
                    },
                    STATUS: {
                        id: 'custpage_cwgp_trandstatus',
                        type: serverWidget.FieldType.TEXT,
                        label: 'Status'
                    }
                },
                itemreceipt: {
                    TRAN_NO: {
                        id: 'custpage_cwgp_tranid',
                        type: serverWidget.FieldType.TEXT,
                        label: 'Transaction No'
                    },
                    CUSTOMER: {
                        id: 'custpage_cwgp_customer',
                        type: serverWidget.FieldType.TEXT,
                        label: 'Customer'
                    },
                    DATE: {
                        id: 'custpage_cwgp_trandate',
                        type: serverWidget.FieldType.TEXT,
                        label: 'Date'
                    }
                }
            }
        },
        FIELD_GROUP: {
            franchisepo: {
                PRIMARY: {
                    id: 'custpage_interpo_pi_grp',
                    label: 'Primary Information'
                },
                CLASS: {
                    id: 'custpage_interpo_class_grp',
                    label: 'Classification'
                },
            },
            itemreceipt: {
                PRIMARY: {
                    id: 'custpage_itemreceipt_pi_grp',
                    label: 'Primary Information'
                },
                CLASS: {
                    id: 'custpage_itemreceipt_class_grp',
                    label: 'Classification'
                }
            }
        },
        CLIENT_SCRIPT: {
            franchisepo: '../franchise/HEYDAY_CS_CreatePageIntPO.js',
            itemreceipt: '../franchise/HEYDAY_CS_CreatePageIntPO.js',

        }
    }
    const render = (options) => {
        const {
            request,
            response,
            stType,
            stAccessType,
            stUserId,
            objSearch
        } = options;

        log.debug('request.parameters', request.parameters)
        const intPage = request.parameters[_CONFIG.PARAMETER.PAGE] ? request.parameters[_CONFIG.PARAMETER.PAGE] : 0;
        log.debug('intPage main', intPage);

        const form = serverWidget.createForm({ title: _CONFIG.TITLE[stType] });

        form.clientScriptModulePath = '../franchise/HEYDAY_CS_ListPage.js';
        
        //add body fields
        const fldHtml = form.addField({
            id: 'custpage_cwgp_htmlcss',
            type: serverWidget.FieldType.INLINEHTML,
            label: 'HTMLCSS'
        });
        fldHtml.defaultValue = htmlCss();
        
        form.addSubtab({
            id: _CONFIG.TAB[stType],
            label: ' '
        });

        const fldPage = form.addField({
            id: 'custpage_cwgp_page',
            type: serverWidget.FieldType.SELECT,
            label: 'Page',
            //container: _CONFIG.TAB[stType]
        });
        fldPage.defaultValue = intPage;
        
        const fldCategory = form.addField({
            id: 'custpage_cwgp_category',
            type: serverWidget.FieldType.SELECT,
            label: 'Category',
            //container: _CONFIG.TAB[stType]
        });
        fldCategory.addSelectOption({
            value: 0,
            text: 'All'
        });
        fldCategory.addSelectOption({
            value: 1,
            text: 'Pending Approval'
        });
        fldCategory.addSelectOption({
            value: 2,
            text: 'Created by Franchise'
        });

        //add sublist values
        const sbl = form.addSublist({
            id: _CONFIG.SUBLIST[stType],
            label: ' ',
            type: serverWidget.SublistType.LIST,
            tab: _CONFIG.TAB[stType]
        });

        const objListCols = _CONFIG.COLUMN.LIST[stType];

        const arrCols = Object.keys(objListCols);
        log.debug('arrCols', arrCols);

        arrCols.forEach((stCol) => {
            const { id, type, label } = objListCols[stCol];

            sbl.addField({
                id,
                type,
                label
            });
        });

        setListValues({
            objSearch,
            fldPage,
            intPage,
            sbl,
            stType,
            stAccessType,
            stUserId
        });

        //add buttons
        form.addButton({
            id: 'custpage_createtxn_buton',
            label: 'Create',
            functionName: `toCreateTransaction(${stUserId}, ${stAccessType})`
        });

        form.addButton({
            id: 'custpage_back_button',
            label: 'Back',
            functionName: `back(${stUserId}, ${stAccessType}, 'franchisepo')`
        });

        response.writePage(form);
    };
    
    const renderItemReceipt = (options) => {
        const {
            request,
            response,
            stType,
            stAccessType,
            stUserId,
            objSearch
        } = options;

        log.debug('request.parameters', request.parameters)
        const intPage = request.parameters[_CONFIG.PARAMETER.PAGE] ? request.parameters[_CONFIG.PARAMETER.PAGE] : 0;
        log.debug('intPage main', intPage);

        const form = serverWidget.createForm({ title: _CONFIG.TITLE[stType] });

        form.clientScriptModulePath = '../franchise/HEYDAY_CS_ListPage.js';
        
        //add body fields
        const fldHtml = form.addField({
            id: 'custpage_cwgp_htmlcss',
            type: serverWidget.FieldType.INLINEHTML,
            label: 'HTMLCSS'
        });
        fldHtml.defaultValue = htmlCss();
        
        form.addSubtab({
            id: _CONFIG.TAB[stType],
            label: ' '
        });

        const fldPage = form.addField({
            id: 'custpage_cwgp_page',
            type: serverWidget.FieldType.SELECT,
            label: 'Page',
            //container: _CONFIG.TAB[stType]
        });
        fldPage.defaultValue = intPage;
        
        /*const fldCategory = form.addField({
            id: 'custpage_cwgp_category',
            type: serverWidget.FieldType.SELECT,
            label: 'Category',
            //container: _CONFIG.TAB[stType]
        });
        fldCategory.addSelectOption({
            value: 0,
            text: 'All'
        });
        fldCategory.addSelectOption({
            value: 1,
            text: 'Pending Approval'
        });
        fldCategory.addSelectOption({
            value: 2,
            text: 'Created by Franchise'
        });*/

        //add sublist values
        const sbl = form.addSublist({
            id: _CONFIG.SUBLIST[stType],
            label: ' ',
            type: serverWidget.SublistType.LIST,
            tab: _CONFIG.TAB[stType]
        });

        const objListCols = _CONFIG.COLUMN.LIST[stType];

        const arrCols = Object.keys(objListCols);
        log.debug('arrCols', arrCols);

        arrCols.forEach((stCol) => {
            const { id, type, label } = objListCols[stCol];

            sbl.addField({
                id,
                type,
                label
            });
        });

        setListValues({
            objSearch,
            fldPage,
            intPage,
            sbl,
            stType,
            stAccessType,
            stUserId
        });

        //add buttons
        /*form.addButton({
            id: 'custpage_createtxn_buton',
            label: 'Create',
            functionName: `toCreateTransaction(${stUserId}, ${stAccessType})`
        });*/

        form.addButton({
            id: 'custpage_back_button',
            label: 'Back',
            functionName: `back(${stUserId}, ${stAccessType}, 'franchisepo')`
        });

        response.writePage(form);
    };

    const getPageData = (objSearch, fldPage, intPage) => {
        const objPagedData = objSearch.runPaged({ pageSize: 20 });

        objPagedData.pageRanges.map((objPageResult) => {
            fldPage.addSelectOption({
                //value: objPageResult.index + 1,
                value: objPageResult.index,
                text: `${objPageResult.index + 1} of ${objPagedData.pageRanges.length}`
            });
        });

        const objPage = objPagedData.fetch({ index: intPage });

        return objPage;
    };

    const setListValues = (options) => {
        const {
            objSearch,
            fldPage,
            intPage,
            sbl,
            stType,
            stAccessType,
            stUserId
        } = options;
        
        if(objSearch.runPaged().count >0){
        	const objPagedData = getPageData(objSearch, fldPage, intPage);
            log.debug('objPagedData', objPagedData);
            const arrPagedData = objPagedData.data;
            log.debug('arrPagedData', arrPagedData);

            const arrListValues = util.mapValues({
                stType, 
                stAccessType, 
                stUserId,
                arrPagedData
            });
            log.debug('arrListValues', arrListValues);

            arrListValues.forEach((value, i) => {
                const arrListValue = Object.keys(value);

                arrListValue.forEach((fieldId) => {
                    sbl.setSublistValue({
                        id: fieldId,
                        line: i,
                        value: value[fieldId] || ' '
                    });
                });
            });
        }

        
    };

    const htmlCss = () => {
        const stHtmlCss = `<style>
        @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Roboto+Mono:ital,wght@0,300;1,200&family=Roboto:wght@300&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Libre+Baskerville&display=swap');
    
        body {
            font-family: 'Roboto', sans-serif !important;
            filter: blur(100px);
            pointer-events: none;
        }
    
        div#div__body {
            margin: 15px !important;
        }

        td {
            font-family: 'Roboto', sans-serif !important;
            font-size: 14px !important;
        }

        h1.uir-record-type {
            color: #105368 !important;
            font-family: 'Libre Baskerville', serif;
            font-weight: 200 !important;
        }
    
        input#custpage_createtxn_buton, input#secondarycustpage_createtxn_buton {
            background-color: #105368 !important;
            color: white !important;
            font-family: 'Roboto Mono', monospace;
        }
        
        input#custpage_back_button, input#secondarycustpage_back_button {
            background-color: white !important;
            color: #105368 !important;
            font-family: 'Roboto Mono', monospace;
        }

        div#custpage_interpo_listtab_retail_pane_hd {
            background-color: #dbc8b6 !important;
        }
        div#custpage_ir_listtab_franchise_pane_hd {
            background-color: #dbc8b6 !important;
        }

    </style>`;

        return stHtmlCss;
    };

    return {
        render,
        renderItemReceipt
    }
});

