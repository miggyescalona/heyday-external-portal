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
            intercompanypo: 'Intercompany P.O.',
            itemreceipt: 'Item Receipts'
        },
        TAB: {
            intercompanypo: 'custpage_interpo_listtab_retail',
            itemreceipt: 'custpage_ir_listtab_retail'
        },
        SUBLIST: {
            intercompanypo: 'custpage_interpo_list_retail',
            itemreceipt: 'custpage_ir_list_retail'
        },
        COLUMN: {
            LIST: {
                intercompanypo: {
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
                    DATE: {
                        id: 'custpage_cwgp_trandate',
                        type: serverWidget.FieldType.TEXT,
                        label: 'Date'
                    }
                }
            }
        }
    }

    const render = (options) => {
        log.debug('===LIST===','===List Intercompany PO===');
        const {
            request,
            response,
            stType,
            stAccessType,
            stUserId,
            objSearch
        } = options;


        const intPage = request.parameters[_CONFIG.PARAMETER.PAGE] ? request.parameters[_CONFIG.PARAMETER.PAGE] : 0;

        const form = serverWidget.createForm({ title: _CONFIG.TITLE[stType] });

        form.clientScriptModulePath = '../client/HEYDAY_CS_ListPage.js';
        
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
            container: _CONFIG.TAB[stType]
        });
        fldPage.defaultValue = intPage;

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
            functionName: `toCreateTransaction(${stUserId}, ${stAccessType}, 'intercompanypo')`
        });

        form.addButton({
            id: 'custpage_back_button',
            label: 'Back',
            functionName: `back(${stUserId}, ${stAccessType}, 'intercompanypo')`
        });

        response.writePage(form);
    };

    const renderItemReceipt = (options) => {
        log.debug('===LIST===','===List Item Receipt===');
        const {
            request,
            response,
            stType,
            stAccessType,
            stUserId,
            objSearch
        } = options;


        const intPage = request.parameters[_CONFIG.PARAMETER.PAGE] ? request.parameters[_CONFIG.PARAMETER.PAGE] : 0;

        const form = serverWidget.createForm({ title: _CONFIG.TITLE[stType] });

        form.clientScriptModulePath = '../client/HEYDAY_CS_ListPage.js';
        
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
            container: _CONFIG.TAB[stType]
        });
        fldPage.defaultValue = intPage;

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

        form.addButton({
            id: 'custpage_back_button',
            label: 'Back',
            functionName: `back(${stUserId}, ${stAccessType}, 'itemreceipt')`
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

        const objPagedData = getPageData(objSearch, fldPage, intPage);
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

    </style>`;

        return stHtmlCss;
    };

    return {
        render,
        renderItemReceipt
    }
});

