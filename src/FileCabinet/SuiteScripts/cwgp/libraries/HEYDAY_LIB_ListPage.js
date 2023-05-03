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

define(['N/ui/serverWidget', 'N/search', './HEYDAY_LIB_Util.js', 'N/file','N/format','N/config'], (serverWidget, search, util, file, format,config) => {
    const _CONFIG = {
        PARAMETER: {
            PAGE: 'custparam_cwgp_page',
            LOCATION: 'custparam_cwgp_location',
            APPROVAL_STATUS: 'custparam_cwgp_approvalstatus',
            FOR_RECEIVING: 'custparam_cwgp_forreceiving',
            AS_OF: 'custparam_cwgp_asof',
            DATE_FROM: 'custparam_cwgp_datefrom',
            DATE_TO: 'custparam_cwgp_dateto'
        },
        TITLE: {
            intercompanypo: 'Replenishment Purchase Order',
            itemreceipt: 'Receive Items',
            inventoryadjustment: 'Inventory Adjustment',
            inventorycount: 'Inventory Count',
            itemperlocation: 'Inventory On Hand'
        },
        TAB: {
            intercompanypo: 'custpage_interpo_listtab_retail',
            itemreceipt: 'custpage_ir_listtab_retail',
            inventoryadjustment: 'custpage_ia_listtab_retail',
            inventorycount: 'custpage_ic_listtab_retail',
            itemperlocation: 'custpage_ipl_listtab_retail',
            itemperlocationtotal: 'custpage_ipltotal_listtab_retail'
        },
        SUBLIST: {
            intercompanypo: 'custpage_interpo_list_retail',
            itemreceipt: 'custpage_ir_list_retail',
            inventoryadjustment: 'custpage_ia_list_retail',
            inventorycount: 'custpage_ic_list_retail',
            itemperlocation: 'custpage_ipl_list_retail',
            itemperlocationtotal: 'custpage_ipltotal_list_retail'
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
                        label: 'Approval Status'
                    },
                    FOR_RECEIVING: {
                        id: 'custpage_cwgp_forreceiving',
                        type: serverWidget.FieldType.TEXT,
                        label: 'For Receiving'
                    },
                    AMS_TRACKING_NUMBER: {
                        id: 'custpage_cwgp_sointercoid',
                        type: serverWidget.FieldType.TEXT,
                        label: 'AMS Tracking Number'
                    },
                    OPERATOR: {
                        id: 'custpage_cwgp_operator',
                        type: serverWidget.FieldType.TEXT,
                        label: 'Operator'
                    },
                },
                itemreceipt: {
                    TRAN_NO: {
                        id: 'custpage_cwgp_tranid',
                        type: serverWidget.FieldType.TEXT,
                        label: 'Transaction No'
                    },
                    CREATED_FROM: {
                        id: 'custpage_cwgp_createdfrom',
                        type: serverWidget.FieldType.TEXT,
                        label: 'Created From'
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
                    },
                },
                inventoryadjustment: {
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
                    },
                    ADJUSTMENT_TYPE: {
                        id: 'custpage_cwgp_adjustmenttype',
                        type: serverWidget.FieldType.TEXT,
                        label: 'Adjustment Type'
                    }
                },
                inventorycount: {
                    TRAN_NO: {
                        id: 'custpage_cwgp_tranid',
                        type: serverWidget.FieldType.TEXT,
                        label: 'Transaction No'
                    },
                    TYPE: {
                        id: 'custpage_cwgp_type',
                        type: serverWidget.FieldType.TEXT,
                        label: 'Type'
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
                itemperlocation: {
                    NAME: {
                        id: 'custpage_cwgp_name',
                        type: serverWidget.FieldType.TEXT,
                        label: 'Item Name'
                    },
                    UPC:{
                        id: 'custpage_cwgp_upccode',
                        type: serverWidget.FieldType.TEXT,
                        label:  'UPC Code'
                    },
                    SKU: {
                        id: 'custpage_cwgp_internalsku',
                        type: serverWidget.FieldType.TEXT,
                        label:  'Internal SKU'
                    },
                    ESTIMATED_COST_PER_UNIT:{
                        id: 'custpage_cwgp_estimatedcostperunit',
                        type: serverWidget.FieldType.FLOAT,
                        label:  'Estimated Cost Per Unit'
                    },
                    TOTAL_ESTIMATED_VALUE:{
                        id: 'custpage_cwgp_totalestimatedvalue',
                        type: serverWidget.FieldType.FLOAT,
                        label:  'Total Estimated Value'
                    },
                    ON_HAND: {
                        id: 'custpage_cwgp_onhand',
                        type: serverWidget.FieldType.TEXT,
                        label: 'On Hand'
                    },
                    DAMAGE:{
                        id: 'custpage_cwgp_damage',
                        type: serverWidget.FieldType.TEXT,
                        label:  'Damage'
                    },
                    TESTER:{
                        id: 'custpage_cwgp_tester',
                        type: serverWidget.FieldType.TEXT,
                        label:  'Tester'
                    },
                    THEFT:{
                        id: 'custpage_cwgp_theft',
                        type: serverWidget.FieldType.TEXT,
                        label:  'Theft'
                    },
                    BACKBAR:{
                        id: 'custpage_cwgp_backbar',
                        type: serverWidget.FieldType.TEXT,
                        label:  'Backbar'
                    },
                    SOLD:{
                        id: 'custpage_cwgp_sold',
                        type: serverWidget.FieldType.TEXT,
                        label:  'Sold'
                    },
                    DISCREPANCY:{
                        id: 'custpage_cwgp_discrepancy',
                        type: serverWidget.FieldType.TEXT,
                        label:  'Discrepancy'
                    },
                   /* LOCATION: {
                        id: 'custpage_cwgp_location',
                        type: serverWidget.FieldType.TEXT,
                        label:  'Location'
                    },
                    SUBSIDIARY:{
                        id: 'custpage_cwgp_subsidiary',
                        type: serverWidget.FieldType.TEXT,
                        label:  'Subsidiary'
                    },*/
                },
                itemperlocationtotal: {
                    ON_HAND_TOTAL: {
                        id: 'custpage_cwgp_onhand_total',
                        type: serverWidget.FieldType.INTEGER,
                        label: 'On Hand'
                    },
                    QUANTITY_DAMAGE_TOTAL: {
                        id: 'custpage_cwgp_damage_total',
                        type: serverWidget.FieldType.INTEGER,
                        label: 'Damage'
                    },
                    QUANTITY_TESTER_TOTAL: {
                        id: 'custpage_cwgp_tester_total',
                        type: serverWidget.FieldType.INTEGER,
                        label: 'Tester'
                    },
                    QUANTITY_THEFT_TOTAL: {
                        id: 'custpage_cwgp_theft_total',
                        type: serverWidget.FieldType.INTEGER,
                        label: 'Theft'
                    },
                    QUANTITY_BACKBAR_TOTAL: {
                        id: 'custpage_cwgp_backbar_total',
                        type: serverWidget.FieldType.INTEGER,
                        label: 'Backbar'
                    },
                    QUANTITY_SOLD_TOTAL: {
                        id: 'custpage_cwgp_sold_total',
                        type: serverWidget.FieldType.INTEGER,
                        label: 'Sold'
                    },
                    QUANTITY_DISCREPANCY_TOTAL: {
                        id: 'custpage_cwgp_sold_discrepancy',
                        type: serverWidget.FieldType.INTEGER,
                        label: 'Discrepancy'
                    },
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
        const stApprovalStatus = request.parameters[_CONFIG.PARAMETER.APPROVAL_STATUS] ? request.parameters[_CONFIG.PARAMETER.APPROVAL_STATUS] : '';
        const blForReceiving = request.parameters[_CONFIG.PARAMETER.FOR_RECEIVING] ? request.parameters[_CONFIG.PARAMETER.FOR_RECEIVING] : '';
        
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
            label: 'Transactions'
        });

        const fldPage = form.addField({
            id: 'custpage_cwgp_page',
            type: serverWidget.FieldType.SELECT,
            label: 'Page',
            container: _CONFIG.TAB[stType]
        });
        fldPage.defaultValue = intPage;

        const fldApprovalStatus = form.addField({
            id: 'custpage_cwgp_approvalstatus',
            type: serverWidget.FieldType.SELECT,
            label: 'Status',
            container: _CONFIG.TAB[stType]
        });
        fldApprovalStatus.defaultValue = stApprovalStatus;

        util.addOptionsApprovalStatus(fldApprovalStatus);

        const fldForReceiving = form.addField({
            id: 'custpage_cwgp_forreceiving',
            type: serverWidget.FieldType.SELECT,
            label: 'For Receiving',
            container: _CONFIG.TAB[stType]
        });
        fldForReceiving.defaultValue = blForReceiving;

        util.addOptionsForReceiving(fldForReceiving);


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

        log.debug('stApprovalStatus',stApprovalStatus);

        setListValues({
            objSearch,
            fldPage,
            intPage,
            sbl,
            stType,
            stAccessType,
            stUserId,
            stApprovalStatus,
            blForReceiving
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
            id: 'custpage_back_button',
            label: 'Back',
            functionName: `back(${stUserId}, ${stAccessType}, 'itemreceipt')`
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
            functionName: `createInventoryAdjustment(${stUserId}, ${stAccessType}, 'inventoryadjustment')`
        });

        form.addButton({
            id: 'custpage_back_button',
            label: 'Back',
            functionName: `back(${stUserId}, ${stAccessType}, 'inventoryadjustment')`
        });

        response.writePage(form);
    };

    const renderInventoryCount = (options) => {
        log.debug('===LIST===','===List Inventory Count===');
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

        /*form.addButton({
            id: 'custpage_createtxn_buton',
            label: 'Create',
            functionName: `toCreateTransaction(${stUserId}, ${stAccessType}, 'inventorycount')`
        });*/

        form.addButton({
            id: 'custpage_createtxn_buton',
            label: 'Create',
            functionName: `createInventoryCount(${stUserId}, ${stAccessType}, 'inventorycount')`
        });


        form.addButton({
            id: 'custpage_back_button',
            label: 'Back',
            functionName: `back(${stUserId}, ${stAccessType}, 'inventorycount')`
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
            objSearch,
            objSearchTotal,
            objSearchQoH,
            objSearchTotalQoH,
            stSubsidiary,
            stLocation,
            objOperator
        } = options;


       
        var conf = config.load({
            type: config.Type.USER_PREFERENCES
        })

        log.debug('conf',conf);
        
        var tz = conf.getValue({
            fieldId: 'TIMEZONE'
        });

        log.debug('tz',tz);

        log.debug('Account Time',format.format({
            value: new Date(),
            type: format.Type.DATETIME,
            timezone: tz
        }));
        log.debug('Account Date', format.format({
            value: new Date(),
            type: format.Type.DATE,
            timezone: tz
        }));
        log.debug('Account Date Tz', format.format({
            value: new Date(),
            type: format.Type.DATETIMETZ,
            timezone: tz
        }));
        
        let currentDate =  format.format({
            value: new Date(),
            type: format.Type.DATETIME,
            timezone: tz
        });

        if(currentDate){
            currentDate = currentDate.split(/[/| ]/g);
            currentDate = currentDate[0]+'/'+currentDate[1]+'/'+currentDate[2];
        }

        const intPage = request.parameters[_CONFIG.PARAMETER.PAGE] ? request.parameters[_CONFIG.PARAMETER.PAGE] : 0;
        const dtAsOf = request.parameters[_CONFIG.PARAMETER.AS_OF] ? request.parameters[_CONFIG.PARAMETER.AS_OF] : currentDate;
        const dtFrom = request.parameters[_CONFIG.PARAMETER.DATE_FROM] ? request.parameters[_CONFIG.PARAMETER.DATE_FROM] : currentDate;
        const dtTo = request.parameters[_CONFIG.PARAMETER.DATE_TO] ? request.parameters[_CONFIG.PARAMETER.DATE_TO] : currentDate;


       log.debug('Param Dates',JSON.stringify({
            dtAsOf: dtAsOf,
            dtFrom: dtFrom,
            dtTo: dtTo
        }));

        const form = serverWidget.createForm({ title: _CONFIG.TITLE[stType] });

        form.clientScriptModulePath = '../client/HEYDAY_CS_ListPage.js';
        
        //add body fields
        const fldHtml = form.addField({
            id: 'custpage_cwgp_htmlcss',
            type: serverWidget.FieldType.INLINEHTML,
            label: 'HTMLCSS'
        });
        fldHtml.defaultValue = htmlCss();

        form.addFieldGroup({
            id: 'custpage_retail_itemperloc_grp',
            label: 'Primary Information'
        });
        const fldSubsidiary = form.addField({
            id: 'custpage_cwgp_subsidiary',
            type: serverWidget.FieldType.SELECT,
            label: 'Subsidiary',
            source: 'subsidiary',
            container: 'custpage_retail_itemperloc_grp'
        });
        fldSubsidiary.defaultValue = stSubsidiary;
        fldSubsidiary.updateDisplayType({displayType:'inline'});

        const fldLocation= form.addField({
            id: 'custpage_cwgp_location',
            type: serverWidget.FieldType.SELECT,
            label: 'Location',
            source: 'location',
            container: 'custpage_retail_itemperloc_grp'
        });
        fldLocation.defaultValue = stLocation;
        fldLocation.updateDisplayType({displayType:'inline'});



        //add total sublist

        form.addSubtab({
            id: _CONFIG.TAB['itemperlocationtotal'],
            label: 'Totals'
        });

        const sbtotal = form.addSublist({
            id: _CONFIG.SUBLIST['itemperlocationtotal'],
            label: 'Total',
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

        let blItermPerLocTotal = true;

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
        fldAsOf.defaultValue = dtAsOf ? dtAsOf : null;

        log.debug('dtAsOf',dtAsOf);

        const fldFrom = form.addField({
            id: 'custpage_cwgp_from',
            type: serverWidget.FieldType.DATE,
            label: 'From',
            container: _CONFIG.TAB[stType]  
        });
        fldFrom.defaultValue = dtFrom ?  dtFrom : null;

        log.debug('dtFrom',dtFrom);

        const fldTo = form.addField({
            id: 'custpage_cwgp_to',
            type: serverWidget.FieldType.DATE,
            label: 'To',
            container: _CONFIG.TAB[stType]  
        });
        fldTo.defaultValue = dtTo ?  dtTo : null;

        log.debug('Field Dates',JSON.stringify({
            dtAsOf: dtAsOf,
            dtFrom: dtFrom,
            dtTo: dtTo
        }));


        log.debug('objSearchTotalQoH1',objSearchTotalQoH);

        setListValues({
            objSearch,
            objSearchTotal,
            objSearchTotalQoH,
            fldPage,
            intPage,
            sbtotal,
            stType,
            stAccessType,
            stUserId,
            blItermPerLocTotal,
            dtAsOf,
            dtFrom,
            dtTo
        });

        blItermPerLocTotal = false;


        log.debug('stType',stType);

    

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
        log.debug('objSearchTotalQoH2',objSearchTotalQoH);

        const arrValues = setListValues({
            objSearch,
            objSearchTotal,
            objSearchQoH,
            objSearchTotalQoH,
            blItermPerLocTotal,
            fldPage,
            intPage,
            sbl,
            stType,
            stAccessType,
            stUserId,
            dtAsOf,
            dtFrom,
            dtTo
        });

        log.debug('arrValues1',arrValues);

        let objFileURL  = csvExport(arrValues);
        objFileURL = JSON.stringify(objFileURL);

        function csvExport(arrListValues){
            let csvContents = "";
            csvContents += 'Item Name' + ','+ 'UPC Code' +','+'Internal Sku' + ',' + 'Estimated Cost Per Unit' +',' +'Total Estimated Value' + ',' +'On Hand' +','+ 'Damage' + ',' + 'Tester' +',' +'Theft' +',' + 'Backbar'+','+ 'Sold'+','+'Discrepancy'+'\n';
            for(x in arrListValues){
                const stName = arrListValues[x].custpage_cwgp_name || ' ';
                const stUPC = arrListValues[x].custpage_cwgp_upccode || ' ';
                const stSku = arrListValues[x].custpage_cwgp_internalsku || ' ';
                const stEstCos = arrListValues[x].custpage_cwgp_estimatedcostperunit || ' ';
                const stEstVal = arrListValues[x].custpage_cwgp_totalestimatedvalue || ' ';
                const stOnHand = arrListValues[x].custpage_cwgp_onhand || ' ';
                const stDamage = arrListValues[x].custpage_cwgp_damage || ' ';
                const stTester = arrListValues[x].custpage_cwgp_tester || ' ';
                const stTheft = arrListValues[x].custpage_cwgp_theft || ' ';
                const stBackbar = arrListValues[x].custpage_cwgp_backbar || ' ';
                const stSold = arrListValues[x].custpage_cwgp_sold || ' ';
                const stDiscrepancy = arrListValues[x].custpage_cwgp_discrepancy || ' ';
                
                csvContents+=stName+','+ stUPC +','+stSku+','+stEstCos+','+stEstVal+','+stOnHand+','+stDamage+','+stTester+','+stTheft+','+stBackbar+ ','+ stSold+','+stDiscrepancy+'\n';
            }

            var csvFile = file.create({
				name: 'retail_'+objOperator[0].stOperator+'_'+new Date().toString(),
				fileType: file.Type.CSV,
				contents: csvContents,
				folder: 929
			});

            csvFile.isOnline = true;

			const stFiledId = csvFile.save();
            var fileObj = file.load({
                id: stFiledId
            });

            return fileObj.url;
        }
        
        form.addButton({
            id: 'custpage_back_button',
            label: 'Search',
            functionName: `searchFilters(${stUserId}, ${stAccessType}, 'itemperlocation')`
        });

        log.debug('objFileURL',objFileURL);
        log.debug('objFileURL type',typeof objFileURL);

        form.addButton({
            id: 'custpage_export_button',
            label: 'Export',
            functionName: 'csvExport('+objFileURL+')'
        });

        form.addButton({
            id: 'custpage_back_button',
            label: 'Back',
            functionName: `back(${stUserId}, ${stAccessType}, 'itemperlocation')`
        });

        response.writePage(form);
    };

    const getPageData = (objSearch, objSearchTotal, objSearchQoH, objSearchTotalQoH, blItermPerLocTotal, fldPage, intPage, stType, stApprovalStatus,dtAsOf,dtFrom,dtTo) => {
        log.debug('objSearchTotalQoH3',objSearchTotalQoH);
        if(stType == 'intercompanypo' && stApprovalStatus){
            objSearch.filters.push(search.createFilter({
                name: 'approvalstatus',
                operator: 'ANYOF',
                values: stApprovalStatus,
            }));
        }
        if(stType == 'itemperlocation' && !blItermPerLocTotal){   
            log.debug('blItermPerLocTotal filters', blItermPerLocTotal);
            log.debug('dtAsOf | dtFrom | dtTo', dtAsOf +'|'+ dtFrom +'|'+ dtTo);
            if(dtAsOf){
                objSearchQoH.filters.push(search.createFilter({
                    name: 'trandate',
                    operator: 'onorbefore',
                    values: formatDate(dtAsOf),
                }));
            }
            if(dtFrom && dtTo){
                objSearch.filters.push(search.createFilter({
                    name: 'trandate',
                    operator: 'within',
                    values: [formatDate(dtFrom),formatDate(dtTo)],
                }));                
            }
        }

        if(stType == 'itemperlocation' && blItermPerLocTotal){   
            log.debug('blItermPerLocTotal filters', blItermPerLocTotal);
            log.debug('dtAsOf | dtFrom | dtTo', dtAsOf +'|'+ dtFrom +'|'+ dtTo);
            if(dtAsOf){
                objSearchTotalQoH.filters.push(search.createFilter({
                    name: 'trandate',
                    operator: 'onorbefore',
                    values: formatDate(dtAsOf),
                }));
            }
            if(dtFrom && dtTo){
                objSearchTotal.filters.push(search.createFilter({
                    name: 'trandate',
                    operator: 'within',
                    values: [formatDate(dtFrom),formatDate(dtTo)],
                }));                
            }
        }

        function formatDate(date) {
            var d = new Date(date)
            const offset = d.getTimezoneOffset(); 
            d = new Date(d.getTime() + (offset*60*1000)); 
            d = d.toISOString().split('T')[0]
            d = d.split('-');

            /*var   month = '' + (d.getMonth() + 1)
            var   day = '' + d.getDate()
            var   year = d.getFullYear()*/
            let year = d[0];
            let month = d[1];
            let day = d[2];
        
            if (month.length < 2) 
                month = '0' + month;
            if (day.length < 2) 
                day = '0' + day;
        
            return [month, day, year].join('/');
        }

        let stPageSize = 20;
        if(stType == 'itemperlocation'){
            stPageSize = 30;
        }
        
        let objPagedData;
        let objPagedDataQoH;
        let objPagedDataTotalQoH;
        
        let objPage;
        let objPageQoH;

        let objPagedDataExport;
        let objPagedDataQoHExport;

        if(blItermPerLocTotal){
            ///Total Search
            log.debug('blItermPerLocTotal',blItermPerLocTotal);
            log.debug('objSearchTotal', objSearchTotal);
            objPagedData = objSearchTotal.runPaged({ pageSize: stPageSize });;
            objPagedDataTotalQoH = objSearchTotalQoH.runPaged({ pageSize: stPageSize });;
            log.debug('objPagedData',objPagedData);
            objPage = objPagedData.fetch({ index: 0 });
            log.debug('objPage',objPage);
            objPageQoH = objPagedDataTotalQoH.fetch({ index: 0 });
        }else{
            ///Not Total Search
            log.debug('blItermPerLocTotal',blItermPerLocTotal);
            log.debug('objSearch', objSearch);
            log.debug('objSearchQoH', objSearchQoH);

            if(stType == 'itemperlocation'){
                objPagedData = objSearch.runPaged({ pageSize: stPageSize });
                objPagedDataQoH = objSearchQoH.runPaged({ pageSize: stPageSize });

                /*objPagedDataExport = objSearch.runPaged();
                objPagedDataQoHExport = objSearchQoH.runPaged();*/


                const maxPageIndex = objPagedData.pageRanges.length > objPagedDataQoH.pageRanges.length ? objPagedData.pageRanges.length : objPagedDataQoH.pageRanges.length;
                const startingPageData= objPagedData.pageRanges.length > objPagedDataQoH.pageRanges.length ? objPagedData : objPagedDataQoH;

                startingPageData.pageRanges.map((objPageResult) => {
                    fldPage.addSelectOption({
                        //value: objPageResult.index + 1,
                        value: objPageResult.index,
                        text: `${objPageResult.index + 1} of ${maxPageIndex}`
                    });
                });
            }
            else{
                objPagedData = objSearch.runPaged({ pageSize: stPageSize });
                objPagedData.pageRanges.map((objPageResult) => {
                    fldPage.addSelectOption({
                        //value: objPageResult.index + 1,
                        value: objPageResult.index,
                        text: `${objPageResult.index + 1} of ${objPagedData.pageRanges.length}`
                    });
                });
            }

            log.debug('objPagedData',objPagedData);
            log.debug('stType',stType);

           if(objPagedData.count != 0 && stType != 'itemperlocation'){
                log.debug('objPagedData1', objPagedData);
                objPage = objPagedData.fetch({ index: intPage });
                log.debug('objPage', objPage);

           }
           else if((objPagedData || objPagedDataQoH) && stType == 'itemperlocation'){
                log.debug('objPagedData2', objPagedData);
                if(stType == 'itemperlocation' && objPagedDataQoH.count != 0){
                    log.debug('intPage',intPage);

                    log.debug('objPagedDataQoH.pageRanges.length',objPagedDataQoH.pageRanges.length)
                    log.debug('objPagedDataQoH', objPagedDataQoH);
                    if(intPage >= objPagedDataQoH.pageRanges.length ){
                        objPageQoH = null;
                    }
                    else{
                        objPageQoH = objPagedDataQoH.fetch({ index: intPage });

                    }

                    log.debug('objPagedData.pageRanges.length',objPagedData.pageRanges.length)
                    log.debug('objPagedData', objPagedData);

                    if(intPage >= objPagedData.pageRanges.length ){
                        objPage = null;
                    }
                    else{
                        objPage = objPagedData.fetch({ index: intPage });
                    }

                    log.debug('objPageQoH', objPageQoH);
                    log.debug('objPage', objPage);
                }
            }
            else{
                log.debug('objPagedData3', objPagedData);
                 objPage = null;
                 log.debug('objPage null', objPage);
            }
        }
        log.debug('objPagedDataExport',objPagedDataExport);
        log.debug('objPagedDataQoHExport',objPagedDataQoHExport);
        return [objPage,objPageQoH];
    };

    const setListValues = (options) => {
        const {
            objSearch,
            objSearchTotal,
            objSearchQoH,
            objSearchTotalQoH,
            fldPage,
            intPage,
            sbl,
            sbtotal,
            stType,
            stAccessType,
            stUserId,
            stApprovalStatus,
            blForReceiving,
            blItermPerLocTotal,
            dtAsOf,
            dtFrom,
            dtTo
        } = options;

        log.debug('objSearch',objSearch);
        log.debug('objSearchQoH',objSearchQoH)


        const objPagedData = getPageData(objSearch, objSearchTotal, objSearchQoH, objSearchTotalQoH, blItermPerLocTotal, fldPage, intPage, stType, stApprovalStatus,dtAsOf,dtFrom,dtTo);
        log.debug('objSearchTotalQoH4',objSearchTotalQoH);
        log.debug('objPagedData',objPagedData)
        
        if(objPagedData[0] || objPagedData[1]){
            log.debug('objPagedData[0]',objPagedData[0]);
            log.debug('objPagedData[1]',objPagedData[1])
            let arrPagedData;
            let arrPagedQoH;
            let arrPagedDataExport;
            let arrPagedDataQoHExport;


            if(objPagedData[0]){
                arrPagedData = objPagedData[0].data;
                //log.debug('arrPagedData Not Total', arrPagedData);
            }

            if(objPagedData[1]){
                //Item Per Loc QoH
                arrPagedQoH = objPagedData[1].data;
                log.debug('arrPagedQoH', arrPagedQoH);
            }

            if(objSearch){
                //Item Per Loc CSV
                arrPagedDataExport = objSearch;
                log.debug('arrPagedDataExport1', arrPagedDataExport);
            }

            if(objSearchQoH){
                //Item Per Loc QoH CSV
                arrPagedDataQoHExport = objSearchQoH;
                log.debug('arrPagedDataQoHExport1', arrPagedDataQoHExport);
            }



            const arrListValues = util.mapValues({
                stType, 
                stAccessType, 
                stUserId,
                arrPagedData,
                arrPagedQoH,
                arrPagedDataExport,
                arrPagedDataQoHExport,
                blForReceiving,
                stApprovalStatus,
                blItermPerLocTotal
            });
            log.debug('arrListValues[0]', arrListValues[0]);
            log.debug('arrListValues[1]', arrListValues[1]);


            if(!blItermPerLocTotal){
                arrListValues[0].forEach((value, i) => {
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
            else{
                arrListValues[0].forEach((value, i) => {
                    const arrListValue = Object.keys(value);
                    arrListValue.forEach((fieldId) => {
                        sbtotal.setSublistValue({
                            id: fieldId,
                            line: i,
                            value: value[fieldId] || 0
                        });
                    });

                });
            }

            return arrListValues[1];
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

        input#custpage_export_button, input#secondarycustpage_export_button {
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
        renderItemReceipt,
        renderInventoryAdjustment,
        renderInventoryCount,
        renderItemPerLocation
    }
});