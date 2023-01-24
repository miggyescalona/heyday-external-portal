/**
 * Author: Patricia Naguit
 * Date: 2022-12-13
 *
 * Date         Modified By            Notes
 * 2022-12-13   Patricia Naguit        Initial File Creation
 */

/**
 * @NApiVersion 2.1
 * @NModuleScope Public
 */

define(['N/ui/serverWidget', './HEYDAY_LIB_Util.js'], (serverWidget, utilLib) => {
    let _CONFIG = {
        PARAMETER: {
            PAGE: 'custparam_cwgp_page'
        },
        TITLE: {
        	franchisepo: 'Franchise - Purchase Order',
            itemreceipt: 'Item Receipt'
        },
        TAB: {
        	franchisepo: 'custpage_interpo_itemstab',
            itemreceipt: 'custpage_itemreceipt_itemstab'
        		
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
                    label: 'pageMode',
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
                    displayType: 'inline'
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
                LOCATION: {
                    id: 'custpage_cwgp_location',
                    type: serverWidget.FieldType.SELECT,
                    label: 'Location',
                    source: 'location',
                    container: 'CLASS',
                    displayType: 'inline'
                }
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
                    displayType: 'inline'
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
            ITEMS: {
                franchisepo:{
                    ITEM: {
                        id: 'custpage_cwgp_item',
                        type: serverWidget.FieldType.SELECT,
                        label: 'Items',
                        displayType: 'inline',
                        //source: 'item',
                    },
                    DESCRIPTION: {
                        id: 'custpage_cwgp_description',
                        type: serverWidget.FieldType.TEXT,
                        label: 'Description'
                    },
                    QUANTITY: {
                        id: 'custpage_cwgp_quantity',
                        type: serverWidget.FieldType.INTEGER,
                        label: 'Quantity'
                    },
                    RATE: {
                        id: 'custpage_cwgp_rate',
                        type: serverWidget.FieldType.FLOAT,
                        label: 'Rate'
                    },
                    AMOUNT: {
                        id: 'custpage_cwgp_amount',
                        type: serverWidget.FieldType.FLOAT,
                        label: 'Amount'
                    }
                },    
                itemreceipt: {
                    ITEM: {
                        id: 'custpage_cwgp_item',
                        type: serverWidget.FieldType.SELECT,
                        label: 'Items',
                        displayType: 'inline',
                        source: 'item',
                    },
                    DESCRIPTION: {
                        id: 'custpage_cwgp_description',
                        type: serverWidget.FieldType.TEXT,
                        label: 'Description',
                    },
                    QUANTITY: {
                        id: 'custpage_cwgp_quantity',
                        type: serverWidget.FieldType.INTEGER,
                        label: 'Quantity',
                        displayType: 'ENTRY',
                        displayType: 'inline'
                    },
                    LINE: {
                        id: 'custpage_cwgp_line',
                        type: serverWidget.FieldType.INTEGER,
                        label: 'Line'
                    },
                    RATE: {
                        id: 'custpage_cwgp_rate',
                        type: serverWidget.FieldType.FLOAT,
                        label: 'Rate'
                    }
                }
            }
        },
        FIELD_GROUP: {
            franchisepo: {
                PRIMARY: {
                    id: 'custpage_interpo_pi_grp',
                    label: 'Primary Infromation'
                },
                CLASS: {
                    id: 'custpage_interpo_class_grp',
                    label: 'Classification'
                }
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
            franchisepo: '../franchise/HEYDAY_CS_ViewPage.js',
            itemreceipt: '../franchise/HEYDAY_CS_ViewPage.js',
        }
    }

    const render = (options) => {
        const {
            response,
            stType,
            stPageMode,
            stUserId,
            stPoId,
            stAccessType,
            stSubsidiary,
            stAction
        } = options;
        
        let objPO = utilLib.mapPOValues(stPoId);
        objPO.body.custpage_cwgp_pagemode = stPageMode;
        objPO.body.custpage_cwgp_userid = stUserId;
        objPO.body.custpage_cwgp_accesstype = stAccessType;
        objPO.body.custpage_cwgp_poid = stPoId;
        objPO.body.custpage_cwgp_htmlcss = htmlCss();

        const form = serverWidget.createForm({ title: _CONFIG.TITLE[stType] + ' ' + objPO.body.custpage_cwgp_orderno });

        form.clientScriptModulePath = _CONFIG.CLIENT_SCRIPT[stType];
        
        log.debug('stAction', stAction);
        

        //add field group
        const objFldGrp = _CONFIG.FIELD_GROUP[stType];

        const arrFldGrp = Object.keys(objFldGrp);
        log.debug('arrFldGrp', arrFldGrp);

        arrFldGrp.forEach((stCol) => {
            const { id, label } = objFldGrp[stCol];

            form.addFieldGroup({
                id,
                label
            });
        });
        
        //get inventory items and map UPC codes for scanning
        let objItemResultSet = utilLib.getInvItemsBySubsidiary(stSubsidiary);
        let objUpcMap = {};
        objItemResultSet.each(function (result) {
            let strUpcCode = result.getValue({ name: 'custitemheyday_upccode' });
            if(strUpcCode){
                objUpcMap[strUpcCode] = result.id;
            }
            
            return true;
        });

        
        //log.debug('objPO', objPO);

        //render body fields
        const objBodyFields = _CONFIG.FIELD[stType];

        const arrFlds = Object.keys(objBodyFields);
        log.debug('arrFlds', arrFlds);

        arrFlds.forEach((stCol) => {
            const {
                id,
                type,
                label,
                source,
                container,
                mandatory,
                defaultValue,
                displayType
            } = objBodyFields[stCol];
            log.debug('mandatory', mandatory);

            let fld = form.addField({
                id,
                type,
                label,
                source,
                container: _CONFIG.FIELD_GROUP[stType][container]?.id
            });

            if (mandatory) {
                fld.isMandatory = true;
            }

            if (displayType) {
                fld.updateDisplayType({ displayType });
            }

            if (objPO.body[fld.id] != 'undefined') {
                fld.defaultValue = objPO.body[fld.id]
            }
        });

        //render sublist
        form.addSubtab({
            id: _CONFIG.TAB[stType],
            label: 'Items'
        });

        const sbl = form.addSublist({
            id: _CONFIG.SUBLIST[stType],
            label: ' ',
            type: serverWidget.SublistType.LIST,
            tab: _CONFIG.TAB[stType]
        });

        const objItemCols = _CONFIG.COLUMN.ITEMS[stType];

        const arrCols = Object.keys(objItemCols);
        log.debug('arrCols', arrCols);

        arrCols.forEach((stCol) => {
            const { id, type, label, source, displayType } = objItemCols[stCol];

            let col = sbl.addField({
                id,
                type,
                label,
                source,
                displayType
            });

            if (displayType) {
                col.updateDisplayType({ displayType });
            }
            if (id == 'custpage_cwgp_item') {
                utilLib.addOptionsItemBySubsidiary({
                    fld: col,
                    objResultSet: objItemResultSet
                });
                //utilLib.addOptionsItemBySubsidiary(col, stSubsidiary);
            }
        });

        utilLib.setPOSublist(sbl, objPO);
        const stApprovalStatus = utilLib.getPOFieldValue(stPoId,'custbody_cwgp_franchiseapprovalstatus');
        if(stApprovalStatus != '3'){
	        form.addButton({
	            id: 'custpage_edit_btn',
	            label: 'Edit',
	            functionName: `toEdiTransaction(${stUserId}, ${stPoId}, ${stAccessType}, 'franchisepo')`
	        });
        }
        
        log.debug('stApprovalStatus', stApprovalStatus);
        if(stApprovalStatus == '2'){
        	form.addButton({
                id: 'custpage_approve_btn',
                label: 'Approve',
                functionName: `approveTransaction(${stUserId}, ${stPoId}, ${stAccessType}, 'franchisepo')`
            });
        }
        
        const isReceivable = utilLib.franchisePOReceivable(stPoId);
        if(isReceivable){
        	form.addButton({
                id: 'custpage_recieve_btn',
                label: 'Recieve',
                functionName: `receiveTransaction(${stUserId}, ${stPoId}, ${stAccessType}, 'itemreceipt')`
            });
        }
        
        

        form.addButton({
            id: 'custpage_back_button',
            label: 'Back',
            functionName: `back(${stUserId}, ${stAccessType}, 'franchisepo')`
        });

        response.writePage(form);
    };
    
    const renderItemReceipt = (options) => {
        log.debug('===VIEW===','===View Item Receipt===');
        const {
            response,
            stType,
            stPageMode,
            stUserId,
            stPoId,
            stAccessType,
            stTranId
        } = options;
        
        let objPO = utilLib.mapIRValuesViewEdit(stPoId);
        log.debug('objPO', objPO);
        objPO.body.custpage_cwgp_pagemode = stPageMode;
        objPO.body.custpage_cwgp_userid = stUserId;
        objPO.body.custpage_cwgp_accesstype = stAccessType
        objPO.body.custpage_cwgp_htmlcss = htmlCss();
        //log.debug('objPO', objPO);
        
        const form = serverWidget.createForm({ title: _CONFIG.TITLE[stType] + ' ' + stPoId });
        form.clientScriptModulePath = _CONFIG.CLIENT_SCRIPT[stType];
        

        //add field group
        const objFldGrp = _CONFIG.FIELD_GROUP[stType];

        const arrFldGrp = Object.keys(objFldGrp);
        log.debug('arrFldGrp', arrFldGrp);

        arrFldGrp.forEach((stCol) => {
            const { id, label } = objFldGrp[stCol];

            form.addFieldGroup({
                id,
                label
            });
        });
        
        
        

        //render body fields
        const objBodyFields = _CONFIG.FIELD[stType];

        const arrFlds = Object.keys(objBodyFields);
        log.debug('arrFlds', arrFlds)
        

        arrFlds.forEach((stCol) => {
            const {
                id,
                type,
                label,
                source,
                container,
                mandatory,
                displayType
            } = objBodyFields[stCol];

            let fld = form.addField({
                id,
                type,
                label,
                source,
                container: _CONFIG.FIELD_GROUP[stType][container]?.id
            });

            if (mandatory) {
                fld.isMandatory = true;
            }

            if (displayType) {
                fld.updateDisplayType({ displayType });
            }

            if (objPO.body[fld.id] != 'undefined') {
                fld.defaultValue = objPO.body[fld.id]
            }
        });

        //render sublist
        form.addSubtab({
            id: _CONFIG.TAB[stType],
            label: 'Items'
        });

        const sbl = form.addSublist({
            id: _CONFIG.SUBLIST[stType],
            label: ' ',
            type: serverWidget.SublistType.LIST,
            tab: _CONFIG.TAB[stType]
        });

        const objItemCols = _CONFIG.COLUMN.ITEMS[stType];

        const arrCols = Object.keys(objItemCols);
        log.debug('arrCols', arrCols);

        arrCols.forEach((stCol) => {
            const { id, type, label, source, displayType } = objItemCols[stCol];

            let col = sbl.addField({
                id,
                type,
                label,
                source,
                displayType
            });

            if (displayType) {
                col.updateDisplayType({ displayType });
            }
        });

        utilLib.setSublistValues(sbl, objPO);

        form.addButton({
            id: 'custpage_edit_btn',
            label: 'Edit',
            functionName: `toEdiTransaction(${stUserId}, ${stPoId}, ${stAccessType}, 'itemreceipt')`
        });

        form.addButton({
            id: 'custpage_back_button',
            label: 'Back',
            functionName: `back(${stUserId}, ${stAccessType}, 'itemreceipt')`
        });


        response.writePage(form);

        
    };

    const htmlCss = () => {
        const stHtmlCss = `<style>
        @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Roboto+Mono:ital,wght@0,300;1,200&family=Roboto:wght@300&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Libre+Baskerville&display=swap');
    
        body {
            font-family: 'Roboto', sans-serif !important;
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
    
        input#custpage_edit_btn, input#secondarycustpage_edit_btn {
            background-color: #105368 !important;
            color: white !important;
            font-family: 'Roboto Mono', monospace;
        }
        
        input#custpage_approve_btn, input#secondarycustpage_approve_btn {
            background-color: #105368 !important;
            color: white !important;
            font-family: 'Roboto Mono', monospace;
        }
        
        input#custpage_recieve_btn, input#secondarycustpage_recieve_btn {
            background-color: #105368 !important;
            color: white !important;
            font-family: 'Roboto Mono', monospace;
        }
    
        input#custpage_back_button, input#secondarycustpage_back_button {
            background-color: white !important;
            color: #105368 !important;
            font-family: 'Roboto Mono', monospace;
        }

        div#custpage_interpo_itemstab_pane_hd {
            background-color: #dbc8b6 !important;
        }
        
        div#custpage_itemreceipt_itemstab_pane_hd {
            background-color: #dbc8b6 !important;
        }

        td.fgroup_title {
            padding: 4px;
            background: #f8f2ed;
        }

        input#inpt_custpage_cwgp_vendor1, 
        input#custpage_cwgp_date, 
        input#custpage_cwgp_memomain, 
        input#inpt_custpage_cwgp_location2, 
        input#inpt_custpage_cwgp_item3,
        input#inpt_custpage_cwgp_page1 {
            font-family: 'Roboto', sans-serif !important;
            font-size: 14px !important;
        }

        a.dottedlink {
            font-size: 14px !important;
            pointer-events: none;
            cursor: default;
            text-decoration: none;
        }

        a.smallgraytextnolink {
            font-size: 14px !important;
        }

        div.fgroup_title {
            font-size: 14px !important;
        }
    </style>`;

        return stHtmlCss;
    };

    return {
        render,
        renderItemReceipt
    }
});

