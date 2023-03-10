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

define(['N/ui/serverWidget', 'N/search', 'N/format', './HEYDAY_LIB_Util.js'], (serverWidget, search, format, util) => {
    const _CONFIG = {
        PARAMETER: {
            PAGE: 'custparam_cwgp_page'
        },
        TITLE: {
        	franchisepo: 'Purchase Order',
        	itemreceipt: 'Receive Items',
            inventoryadjustment: 'Inventory Adjustment',
            itemperlocation: 'Inventory On Hand',
            inventorycount: 'Inventory Count',
        },
        TAB: {
        	franchisepo: 'custpage_interpo_listtab_franchise',
        	itemreceipt: 'custpage_ir_listtab_franchise',
            inventoryadjustment: 'custpage_ia_listtab_franchise',
            itemperlocation: 'custpage_ipl_listtab_franchise',
            inventorycount: 'custpage_ic_listtab_franchise',
            itemperlocationtotal: 'custpage_ipl_total_listtab_franchise',
        },
        SUBLIST: {
        	franchisepo: 'custpage_interpo_list_franchise',
        	itemreceipt: 'custpage_ir_list_franchise',
            inventoryadjustment: 'custpage_ia_list_franchise',
            itemperlocation: 'custpage_ipl_list_franchise',
            inventorycount: 'custpage_ic_list_franchise',
            itemperlocationtotal: 'custpage_ipl_total_list_franchise',
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
                        type: serverWidget.FieldType.SELECT,
                        label: 'Status',
                        displayType: 'inline'

                    },
                    FOR_RECEiVING: {
                        id: 'custpage_cwgp_forreceiving',
                        type: serverWidget.FieldType.SELECT,
                        label: 'For Receiving',
                        displayType: 'inline'
                    },
                    OPERATOR: {
                        id: 'custpage_cwgp_operator',
                        type: serverWidget.FieldType.TEXT,
                        label: 'Operator'
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
                    },
                    OPERATOR: {
                        id: 'custpage_cwgp_operator',
                        type: serverWidget.FieldType.TEXT,
                        label: 'Operator'
                    }
                },
                inventoryadjustment: {
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
                    },
                    TYPE: {
                        id: 'custpage_cwgp_type',
                        type: serverWidget.FieldType.TEXT,
                        label: 'Type'
                    },
                    OPERATOR: {
                        id: 'custpage_cwgp_operator',
                        type: serverWidget.FieldType.TEXT,
                        label: 'Operator'
                    }
                },
                itemperlocation: {
                    NAME: {
                        id: 'custpage_cwgp_name',
                        type: serverWidget.FieldType.TEXT,
                        label: 'Item Name'
                    },
                    UPC_CODE: {
                        id: 'custpage_cwgp_upccode',
                        type: serverWidget.FieldType.TEXT,
                        label: 'UPC Code',
                    },
                    INTERNAL_SKU: {
                        id: 'custpage_cwgp_internalsku',
                        type: serverWidget.FieldType.TEXT,
                        label: 'Internal SKU',
                    },
                    ON_HAND: {
                        id: 'custpage_cwgp_onhand',
                        type: serverWidget.FieldType.TEXT,
                        label: 'On Hand'
                    },
                    QUANTITY_DAMAGE: {
                        id: 'custpage_cwgp_damage',
                        type: serverWidget.FieldType.TEXT,
                        label: 'Damage'
                    },
                    QUANTITY_TESTER: {
                        id: 'custpage_cwgp_tester',
                        type: serverWidget.FieldType.TEXT,
                        label: 'Tester'
                    },
                    QUANTITY_THEFT: {
                        id: 'custpage_cwgp_theft',
                        type: serverWidget.FieldType.TEXT,
                        label: 'Theft'
                    },
                    QUANTITY_BACKBAR: {
                        id: 'custpage_cwgp_backbar',
                        type: serverWidget.FieldType.TEXT,
                        label: 'Backbar'
                    },
                    QUANTITY_SOLD: {
                        id: 'custpage_cwgp_sold',
                        type: serverWidget.FieldType.TEXT,
                        label: 'Sold'
                    },
                    QUANTITY_DISCREPANCY: {
                        id: 'custpage_cwgp_discrepancy',
                        type: serverWidget.FieldType.TEXT,
                        label: 'Discrepancy'
                    },

                },
                inventorycount: {
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
                    OPERATOR: {
                        id: 'custpage_cwgp_operator',
                        type: serverWidget.FieldType.TEXT,
                        label: 'Operator'
                    }
                },
                itemperlocationtotal: {
                    ON_HAND_TOTAL: {
                        id: 'custpage_cwgp_onhand_total',
                        type: serverWidget.FieldType.TEXT,
                        label: 'On Hand'
                    },
                    QUANTITY_DAMAGE_TOTAL: {
                        id: 'custpage_cwgp_damage_total',
                        type: serverWidget.FieldType.TEXT,
                        label: 'Damage'
                    },
                    QUANTITY_TESTER_TOTAL: {
                        id: 'custpage_cwgp_tester_total',
                        type: serverWidget.FieldType.TEXT,
                        label: 'Tester'
                    },
                    QUANTITY_THEFT_TOTAL: {
                        id: 'custpage_cwgp_theft_total',
                        type: serverWidget.FieldType.TEXT,
                        label: 'Theft'
                    },
                    QUANTITY_BACKBAR_TOTAL: {
                        id: 'custpage_cwgp_backbar_total',
                        type: serverWidget.FieldType.TEXT,
                        label: 'Backbar'
                    },
                    QUANTITY_SOLD_TOTAL: {
                        id: 'custpage_cwgp_sold_total',
                        type: serverWidget.FieldType.TEXT,
                        label: 'Sold'
                    },
                    QUANTITY_DISCREPANCY_TOTAL: {
                        id: 'custpage_cwgp_discrepancy_total',
                        type: serverWidget.FieldType.TEXT,
                        label: 'Discrepancy'
                    },
                }
            }
        },
        CLIENT_SCRIPT: '../franchise/HEYDAY_CS_ListPage.js'
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
        const stStatus = request.parameters['approvalstatus'] ? request.parameters['approvalstatus'] : '';
        const stReceiving = request.parameters['isreceiving'] ? request.parameters['isreceiving'] : '';

        const form = serverWidget.createForm({ title: _CONFIG.TITLE[stType] });

        form.clientScriptModulePath = _CONFIG.CLIENT_SCRIPT;
        
        //add body fields
        const fldHtml = form.addField({
            id: 'custpage_cwgp_htmlcss',
            type: serverWidget.FieldType.INLINEHTML,
            label: 'HTMLCSS'
        });
        fldHtml.defaultValue = htmlCss();
        
        form.addSubtab({
            id: _CONFIG.TAB[stType],
            label: 'Transactions'
        });
        

        const fldPage = form.addField({
            id: 'custpage_cwgp_page',
            type: serverWidget.FieldType.SELECT,
            label: 'Page',
            //container: _CONFIG.TAB[stType]
        });
        fldPage.defaultValue = intPage;
        
        const fldApprovalStatus = form.addField({
            id: 'custpage_cwgp_approvalstatus',
            type: serverWidget.FieldType.SELECT,
            label: 'Approval Status',
            //container: _CONFIG.TAB[stType]
        });
        if(stStatus){
            fldApprovalStatus.defaultValue = stStatus;
        }
        

        util.addOptionsFranchiseApprovalStatus(fldApprovalStatus);

        const fldForReceiving = form.addField({
            id: 'custpage_cwgp_forreceiving',
            type: serverWidget.FieldType.CHECKBOX,
            label: 'For Receiving',
            //container: _CONFIG.TAB[stType]
        });
        if(stReceiving =='true'){
            fldForReceiving.defaultValue = 'T';
        }

        //util.addOptionsForReceiving(fldForReceiving);

        //add sublist values
        const sbl = form.addSublist({
            id: _CONFIG.SUBLIST[stType],
            label: 'Transactions',
            type: serverWidget.SublistType.LIST,
            tab: _CONFIG.TAB[stType]
        });

        const objListCols = _CONFIG.COLUMN.LIST[stType];

        const arrCols = Object.keys(objListCols);
        log.debug('arrCols', arrCols);

        arrCols.forEach((stCol) => {
            const { id, type, label, displayType} = objListCols[stCol];

            let col = sbl.addField({
                id,
                type,
                label,
                displayType
            });

            if(id == 'custpage_cwgp_trandstatus'){
                util.addOptionsFranchiseApprovalStatus(col);
            }
    
            if(id == 'custpage_cwgp_forreceiving'){
                util.addOptionsForReceiving(col);
            }

            if (displayType) {
                col.updateDisplayType({ displayType });
            }

            
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
            functionName: `toCreateTransaction(${stUserId}, ${stAccessType}, 'franchisepo')`
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

        form.clientScriptModulePath = _CONFIG.CLIENT_SCRIPT;
        
        //add body fields
        const fldHtml = form.addField({
            id: 'custpage_cwgp_htmlcss',
            type: serverWidget.FieldType.INLINEHTML,
            label: 'HTMLCSS'
        });
        fldHtml.defaultValue = htmlCss();
        
        form.addSubtab({
            id: _CONFIG.TAB[stType],
            label: 'Transactions'
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
            label: 'Transactions',
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

    const renderInventoryAdjustment = (options) => {
        log.debug('===LIST===','===List Inventory Adjustment===');
        const {
            request,
            response,
            stSubsidiary,
            stType,
            stAccessType,
            stUserId,
            objSearch
        } = options;


        const intPage = request.parameters[_CONFIG.PARAMETER.PAGE] ? request.parameters[_CONFIG.PARAMETER.PAGE] : 0;
        const intLocation = request.parameters[_CONFIG.PARAMETER.LOCATION] ? request.parameters[_CONFIG.PARAMETER.LOCATION] : '';

        const form = serverWidget.createForm({ title: _CONFIG.TITLE[stType] });

        form.clientScriptModulePath = _CONFIG.CLIENT_SCRIPT;
        
        //add body fields
        const fldHtml = form.addField({
            id: 'custpage_cwgp_htmlcss',
            type: serverWidget.FieldType.INLINEHTML,
            label: 'HTMLCSS'
        });
        fldHtml.defaultValue = htmlCss();
        
        form.addSubtab({
            id: _CONFIG.TAB[stType],
            label: 'Transactions'
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
            label: 'Transactions',
            type: serverWidget.SublistType.LIST,
            tab: _CONFIG.TAB[stType]
        });

        log.debug('renderInventoryAdjustment intLocation',intLocation);

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
            intLocation,
            sbl,
            stType,
            stAccessType,
            stUserId
        });

        //add buttons
        form.addButton({
            id: 'custpage_createtxn_buton',
            label: 'Create',
            functionName: `createInventoryAdjustment(${stUserId}, ${stAccessType}, 'inventoryadjustment')`
        });

    

        form.addButton({
            id: 'custpage_back_button',
            label: 'Back',
            functionName: `back(${stUserId}, ${stAccessType}, 'inventoryadjustment')`
        });

        response.writePage(form);
    };

    const renderItemPerLocation = (options) => {
        log.debug('===LIST===','===List Item per Location===');
        const {
            request,
            response,
            stType,
            stAccessType,
            stUserId,
            stSubsidiary,
            stCustomer,
            objSearch
        } = options;


        const intPage = request.parameters[_CONFIG.PARAMETER.PAGE] ? request.parameters[_CONFIG.PARAMETER.PAGE] : 0;
        let dtAsof = request.parameters.asof;
        let dtFrom = request.parameters.from;
        let dtTo = request.parameters.to;
        
        log.debug('request.parameters',request.parameters);
        if(!request.parameters.hasOwnProperty('asof') && !request.parameters.hasOwnProperty('from') && !request.parameters.hasOwnProperty('to')){
            dtAsof = format.format({ value: new Date(), type: format.Type.DATE });
            dtFrom = format.format({ value: new Date(), type: format.Type.DATE });
            dtTo = format.format({ value: new Date(), type: format.Type.DATE });
        }
        log.debug('dtAsof',dtAsof);
        const form = serverWidget.createForm({ title: _CONFIG.TITLE[stType] });

        form.clientScriptModulePath = _CONFIG.CLIENT_SCRIPT;
        log.debug('stSubsidiary',stSubsidiary);
        log.debug('stCustomer',stCustomer);
        //add body fields
        const fldHtml = form.addField({
            id: 'custpage_cwgp_htmlcss',
            type: serverWidget.FieldType.INLINEHTML,
            label: 'HTMLCSS'
        });
        fldHtml.defaultValue = htmlCss();


        form.addFieldGroup({
            id: 'custpage_franchise_itemperloc_grp',
            label: 'Primary Information'
        });
        const fldSubsidiary = form.addField({
            id: 'custpage_cwgp_subsidiary',
            type: serverWidget.FieldType.SELECT,
            label: 'Subsidiary',
            source: 'subsidiary',
            container: 'custpage_franchise_itemperloc_grp'
        });
        fldSubsidiary.defaultValue = stSubsidiary;
        fldSubsidiary.updateDisplayType({displayType:'inline'});
        const fldCustomer= form.addField({
            id: 'custpage_cwgp_customer',
            type: serverWidget.FieldType.SELECT,
            label: 'Customer',
            source: 'customer',
            container: 'custpage_franchise_itemperloc_grp'
        });
        fldCustomer.defaultValue = stCustomer;
        fldCustomer.updateDisplayType({displayType:'inline'});
        //totals tab
        form.addSubtab({
            id: _CONFIG.TAB['itemperlocationtotal'],
            label: 'Totals'
        });


        const sbtotal = form.addSublist({
            id: _CONFIG.SUBLIST['itemperlocationtotal'],
            label: 'total',
            type: serverWidget.SublistType.LIST,
            tab: _CONFIG.TAB['itemperlocationtotal']
        });

        const objListColsTotal = _CONFIG.COLUMN.LIST['itemperlocationtotal'];

        const arrColsTotal = Object.keys(objListColsTotal);
        log.debug('arrColsTotal', arrColsTotal);

        arrColsTotal.forEach((stCol) => {
            const { id, type, label } = objListColsTotal[stCol];

            sbtotal.addField({
                id,
                type,
                label
            });
        });
        
        const totalColumn = util.getItemPerLocationTotalColumns(stCustomer,dtAsof,dtFrom,dtTo);
        sbtotal.setSublistValue({
            id: 'custpage_cwgp_onhand_total',
            line: 0,
            value: parseInt(totalColumn.onhand) || '0'
        });

        sbtotal.setSublistValue({
            id: 'custpage_cwgp_tester_total',
            line: 0,
            value: parseInt(totalColumn.tester) || '0'
        });

        sbtotal.setSublistValue({
            id: 'custpage_cwgp_backbar_total',
            line: 0,
            value: parseInt(totalColumn.backbar) || '0'
        });

        sbtotal.setSublistValue({
            id: 'custpage_cwgp_damage_total',
            line: 0,
            value: parseInt(totalColumn.damage) || '0'
        });

        sbtotal.setSublistValue({
            id: 'custpage_cwgp_theft_total',
            line: 0,
            value: parseInt(totalColumn.theft) || '0'
        });

        sbtotal.setSublistValue({
            id: 'custpage_cwgp_sold_total',
            line: 0,
            value: parseInt(totalColumn.sold) || '0'
        });

        sbtotal.setSublistValue({
            id: 'custpage_cwgp_discrepancy_total',
            line: 0,
            value: parseInt(totalColumn.discrepancy) || '0'
        });
        
        form.addSubtab({
            id: _CONFIG.TAB[stType],
            label: 'Items'
        });

        const fldPage = form.addField({
            id: 'custpage_cwgp_page',
            type: serverWidget.FieldType.SELECT,
            label: 'Page',
            container: _CONFIG.TAB[stType]  
        });
        fldPage.defaultValue = intPage;

        const fldAsOf = form.addField({
            id: 'custpage_cwgp_asof',
            type: serverWidget.FieldType.DATE,
            label: 'As Of',
            container: _CONFIG.TAB[stType]  
        });
        if(dtAsof){
            fldAsOf.defaultValue = new Date(dtAsof);
        }

        const fldFrom = form.addField({
            id: 'custpage_cwgp_from',
            type: serverWidget.FieldType.DATE,
            label: 'From',
            container: _CONFIG.TAB[stType]  
        });
        if(dtFrom){
            fldFrom.defaultValue = new Date(dtFrom);
        }
        const fldTo = form.addField({
            id: 'custpage_cwgp_to',
            type: serverWidget.FieldType.DATE,
            label: 'To',
            container: _CONFIG.TAB[stType]  
        });
        if(dtTo){
            fldTo.defaultValue = new Date(dtTo);
        }

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
            stUserId,
            dtAsof,
            dtFrom,
            dtTo
        });
        log.debug('setListValues', '');

        form.addButton({
            id : 'search',
            label : 'Search',
            functionName:`searchItemPerLocation(${stUserId}, ${stAccessType}, 'itemperlocation')`
        });
        form.addButton({
            id: 'custpage_back_button',
            label: 'Back',
            functionName: `back(${stUserId}, ${stAccessType}, 'itemperlocation')`
        });

        response.writePage(form);
    };

    const renderInventoryCount = (options) => {
        const {
            request,
            response,
            stType,
            stAccessType,
            stUserId,
            objSearch
        } = options;


        const intPage = request.parameters[_CONFIG.PARAMETER.PAGE] ? request.parameters[_CONFIG.PARAMETER.PAGE] : 0;
        const intLocation = request.parameters[_CONFIG.PARAMETER.LOCATION] ? request.parameters[_CONFIG.PARAMETER.LOCATION] : '';

        const form = serverWidget.createForm({ title: _CONFIG.TITLE[stType] });

        form.clientScriptModulePath = _CONFIG.CLIENT_SCRIPT;
        
        //add body fields
        const fldHtml = form.addField({
            id: 'custpage_cwgp_htmlcss',
            type: serverWidget.FieldType.INLINEHTML,
            label: 'HTMLCSS'
        });
        fldHtml.defaultValue = htmlCss();
        
        form.addSubtab({
            id: _CONFIG.TAB[stType],
            label: 'Transactions'
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
            id: 'custpage_createtxn_buton',
            label: 'Create',
            functionName: `toCreateTransaction(${stUserId}, ${stAccessType}, 'inventorycount')`
        });

        form.addButton({
            id: 'custpage_back_button',
            label: 'Back',
            functionName: `back(${stUserId}, ${stAccessType}, 'inventorycount')`
        });

        response.writePage(form);
    };

    const getPageData = (objSearch, fldPage, intPage, stType) => {
        let stPageSize = 20;
        if(stType == 'itemperlocation'){
            stPageSize = 15;
        }
        const objPagedData = objSearch.runPaged({ pageSize: stPageSize });

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
            stUserId,
            dtAsof,
            dtFrom,
            dtTo
        } = options;
        
        if(objSearch.runPaged().count >0){
        	const objPagedData = getPageData(objSearch, fldPage, intPage, stType);
            log.debug('objPagedData', objPagedData);
            const arrPagedData = objPagedData.data;
            log.debug('arrPagedData', arrPagedData);

            const arrListValues = util.mapValues({
                stType, 
                stAccessType, 
                stUserId,
                arrPagedData,
                dtAsof,
                dtFrom,
                dtTo
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

        input#custpage_create_invadj_button, input#secondarycustpage_create_invadj_button {
            background-color: #105368 !important;
            color: white !important;
            font-family: 'Roboto Mono', monospace;
        }
        input#custpage_create_backbar_button, input#secondarycustpage_create_backbar_button {
            background-color: #105368 !important;
            color: white !important;
            font-family: 'Roboto Mono', monospace;
        }
        input#custpage_create_damage_button, input#secondarycustpage_create_damage_button {
            background-color: #105368 !important;
            color: white !important;
            font-family: 'Roboto Mono', monospace;
        }
        
        input#custpage_back_button, input#secondarycustpage_back_button {
            background-color: white !important;
            color: #105368 !important;
            font-family: 'Roboto Mono', monospace;
        }

        div#custpage_interpo_listtab_franchise_pane_hd {
            background-color: #dbc8b6 !important;
        }
        div#custpage_ir_listtab_franchise_pane_hd {
            background-color: #dbc8b6 !important;
        }
        div#custpage_ia_listtab_franchise_pane_hd {
            background-color: #dbc8b6 !important;
        }

    </style>`;

        return stHtmlCss;
    };

    return {
        render,
        renderItemReceipt,
        renderInventoryAdjustment,
        renderItemPerLocation,
        renderInventoryCount
    }
});
