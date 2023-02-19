/**
 * Author: Patricia Naguit
 * Date: 2022-12-14
 *
 * Date         Modified By            Notes
 * 2022-12-14   Patricia Naguit        Initial File Creation
 */

/**
 * @NApiVersion 2.1
 * @NModuleScope Public
 */


define(['N/search', 'N/record', 'N/format', 'N/util','N/redirect'], (search, record, format, util,redirect) => {

    const _CONFIG = {
        SCRIPT: {
            ID: 'customscript_cwgp_sl_portalerrorpage',
            DEPLOY: 'customdeploy_cwgp_sl_portalerrorpage'
        }
    };

    const createRetailPurchaseOrder = (request) => {

        log.debug('createRetailPurchaseOrder', '===createRetailPurchaseOrder===');
        const recPO = record.create({
            type: record.Type.PURCHASE_ORDER,
            isDynamic: true
        });

        const objPOBodyFields = mapRetailPOBodyFields(request);

        util.each(objPOBodyFields, (value, fieldId) => {
            recPO.setValue({
                fieldId: fieldId,
                value: value
            });
        });

        const arrPOSblFields = mapRetailPOSublistFields(request);

        arrPOSblFields.forEach((objPOBodyFields) => {
            recPO.selectNewLine({ sublistId: 'item' });

            util.each(objPOBodyFields, (value, fieldId) => {
                recPO.setCurrentSublistValue({
                    sublistId: 'item',
                    fieldId: fieldId,
                    value: value
                });

            });

            recPO.commitLine({ sublistId: 'item' });
        });

        const idPO = recPO.save();
        log.debug('idPO', idPO);

        return idPO;
    };

    const createRetailItemReceipt = (request) =>{
        log.debug('createRetailItemReceipt', '===createRetailItemReceipt===');

        const objItemReceipt = record.transform({
            fromType: 'purchaseorder',
            fromId: request.parameters.custpage_cwgp_poid,
            toType: 'itemreceipt',
        });

        const objPOBodyFields = mapRetailItemReceiptBodyFields(request);
        const arrSkipSblFields  = ['description','item','quantityremaining','rate','entity','account','subsidiary'];
        const arrSkipBdyFields  = ['location','description','item','quantityremaining','rate','entity','account','subsidiary'];
        log.debug('objPOBodyFields',objPOBodyFields);

        let intCreatedFrom = objItemReceipt.getValue('createdfrom');
        log.debug('intCreatedFrom',intCreatedFrom);
        let intLocation = search.lookupFields({
            type: search.Type.PURCHASE_ORDER,
            id: intCreatedFrom,
            columns: ['location']
        });

        intLocation = intLocation.location[0].value;

        log.debug('intLocation',intLocation);


        util.each(objPOBodyFields, (value, fieldId) => {
            if(arrSkipBdyFields.includes(fieldId)){return;}
            objItemReceipt.setValue({
                fieldId: fieldId,
                value: value
            });
        });
        
        const arrPOSblFields = mapItemReceiptSublistFields(request);
        let arrRecDamagedIRs;
        let arrRecItemReceiptVariance;
        
        let intCurrentLine = 0;
        arrPOSblFields[0].forEach((objPOBodyFields) => { 
            if(!objPOBodyFields.itemreceive || objPOBodyFields.quantity == 0){
                log.debug('!itemreceive',intCurrentLine);
                objItemReceipt.setSublistValue({
                    sublistId: 'item',
                    fieldId: 'itemreceive',
                    line: intCurrentLine,
                    value: false
                });
            }
            else{
                util.each(objPOBodyFields, (value, fieldId) => {
                    if(arrSkipSblFields.includes(fieldId) || (fieldId == 'itemreceive' && value == true)){return;}
                    log.debug('item receipt',value +'|'+fieldId + '|' +intCurrentLine);
                    if(Number.isInteger(value)){
                            objItemReceipt.setSublistValue({
                                sublistId: 'item',
                                fieldId: fieldId,
                                line: intCurrentLine,
                                value: value || null
                            });
                    }    
                    else{
                        objItemReceipt.setSublistValue({
                            sublistId: 'item',
                            fieldId: fieldId,
                            line: intCurrentLine,
                            value: value
                        });
                    }
                });
            }
            intCurrentLine++;
        });

        const recIR = objItemReceipt.save();
        if(arrPOSblFields[1].length){
            arrRecDamagedIRs = createDamagedInventoryAdjustment(objPOBodyFields,arrPOSblFields[1],recIR,intLocation);
        }
        if(arrPOSblFields[2].length){
            arrRecItemReceiptVariance = createItemReceiptVariance(objPOBodyFields,arrPOSblFields[2],recIR, request);
        }
        log.debug('createRetailItemReceipt', 'recIR: ' + recIR + '| arrRecDamagedIRs: ' + arrRecDamagedIRs + '| arrRecItemReceiptVariance: ' + arrRecItemReceiptVariance);

        return recIR;

    }

    const createRetailInventoryAdjustment = (request, stSubType) => {

        log.debug('createRetailInventoryAdjustment', '===createRetailInventoryAdjustment===');
        const recIA = record.create({
            type: record.Type.INVENTORY_ADJUSTMENT,
            isDynamic: true
        });

        const objPOBodyFields = mapRetailInventoryAdjustmentBodyFields(request);

        util.each(objPOBodyFields, (value, fieldId) => {
            recIA.setValue({
                fieldId: fieldId,
                value: value
            });
        });

        const arrPOSblFields = mapInventoryAdjustmentSublistFields(request,stSubType);

        arrPOSblFields.forEach((objPOBodyFields) => {
            recIA.selectNewLine({ sublistId: 'inventory' });
            util.each(objPOBodyFields, (value, fieldId) => {
                recIA.setCurrentSublistValue({
                    sublistId: 'inventory',
                    fieldId: fieldId,
                    value: value
                });

            });
            recIA.commitLine({ sublistId: 'inventory' });
        });

        var idIA = recIA.save();
        return idIA;
    };

    const createDamagedInventoryAdjustment = (objPOBodyFields,arrPOSblFields,recIR,intLocation) => {
        log.debug('createRetailDamagedInventoryAdjustment', '===createRetailDamagedInventoryAdjustment===');
       
        log.debug('createDamagedInventoryAdjustment objPOBodyFields', objPOBodyFields);
        log.debug('createDamagedInventoryAdjustment arrPOSblFields', arrPOSblFields);
        
        const arrGroupByAccount = arrPOSblFields.reduce(function (r, a) {
            r[a.account] = r[a.account] || [];
            r[a.account].push(a);
            return r;
        }, Object.create(null));

        const arrIteGroupedByAccount = Object.entries(arrGroupByAccount);
        let arrIARecIds = [];

        log.debug('arrIteGroupedByAccount',arrIteGroupedByAccount)

        for(var x = 0; x < arrIteGroupedByAccount.length;x++){
            const recIA = record.create({
                type: record.Type.INVENTORY_ADJUSTMENT,
                isDynamic: true
            });
            const arrSkipFields  = ['description','item','quantityremaining','rate','entity','memo','account'];
            
            util.each(objPOBodyFields, (value, fieldId) => {
                if(arrSkipFields.includes(fieldId)){return;}
                recIA.setValue({
                    fieldId: fieldId,
                    value: value
                });
            });

            recIA.setValue({
                fieldId: 'account',
                value: arrIteGroupedByAccount[x][0]
            });

            recIA.setValue({
                fieldId: 'custbody_cwgp_createdfromir',
                value: recIR
            });

            recIA.setValue({
                fieldId: 'custbody_cwgp_adjustmentsubtype',
                value: 'damagetestertheft'
            });

            recIA.setValue({
                fieldId: 'adjlocation',
                value: intLocation
            });

            recIA.setValue({
                fieldId: 'class',
                value: 1
            });

            recIA.setValue({
                fieldId: 'custbody_cwgp_inventoryadjustmentsub',
                value: 3
            });

            let stTranId = search.lookupFields({
                type: search.Type.ITEM_RECEIPT,
                id: recIR,
                columns: ['tranid']
            });

            stTranId = stTranId.tranid

            for(var i = 0;i<arrIteGroupedByAccount[x][1].length;i++){
                recIA.setCurrentSublistValue({
                    sublistId: 'inventory',
                    fieldId: 'item',
                    value: arrIteGroupedByAccount[x][1][i].item
                });

                recIA.setCurrentSublistValue({
                    sublistId: 'inventory',
                    fieldId: 'adjustqtyby',
                    value: arrIteGroupedByAccount[x][1][i].adjustqtyby
                });

                recIA.setCurrentSublistValue({
                    sublistId: 'inventory',
                    fieldId: 'location',
                    value: arrIteGroupedByAccount[x][1][i].location
                });

                recIA.setCurrentSublistValue({
                    sublistId: 'inventory',
                    fieldId: 'class',
                    value: arrIteGroupedByAccount[x][1][i].class
                });

                recIA.setCurrentSublistValue({
                    sublistId: 'inventory',
                    fieldId: 'custcol_cwgp_adjustmentreason',
                    value: 'Item Receipt# ' + stTranId
                });

                recIA.setCurrentSublistValue({
                    sublistId: 'inventory',
                    fieldId: 'custcol_cwgp_adjustmenttype',
                    value: 3
                });

                recIA.commitLine({ sublistId: 'inventory' });
            }

           var idIA = recIA.save();
           arrIARecIds.push(idIA);
        }
       return arrIARecIds;
    };

    const createItemReceiptVariance = (objPOBodyFields,arrPOSblFields,recIR, request) => {
        log.debug('createItemReceiptVariance', '===createItemReceiptVariance===');
       
        log.debug('createItemReceiptVariance objPOBodyFields', objPOBodyFields);
        log.debug('createItemReceiptVariance arrPOSblFields', arrPOSblFields);

        const {
            custpage_cwgp_userid: stUserId,
        } = request.parameters;
        
        

        let arrIARecIds = [];

        for(var x = 0; x < arrPOSblFields.length;x++){
            const recIA = record.create({
                type: 'customrecord_cwgp_ext_irvar',
                isDynamic: true
            });

            recIA.setValue({
                fieldId: 'custrecord_cwgp_ext_irvar_operator',
                value: stUserId
            });

            recIA.setValue({
                fieldId: 'custrecord_cwgp_ext_irvar_type',
                value: 1
            });

            recIA.setValue({
                fieldId: 'custrecord_cwgp_ext_irvar_item',
                value: arrPOSblFields[x].item
            });
    
            recIA.setValue({
                fieldId: 'custrecord_cwgp_ext_irvar_qty',
                value: arrPOSblFields[x].quantity
            });

            recIA.setValue({
                fieldId: 'custrecord_cwgp_ext_irvar_retailtxn',
                value: recIR
            });


           var idIA = recIA.save();
           arrIARecIds.push(idIA);
        }
       return arrIARecIds;
    };

    


    const mapRetailPOBodyFields = (request) => {
        const stVendor = request.parameters.custpage_cwgp_vendor;
        const stSubsidiary = request.parameters.custpage_cwgp_subsidiary;
        const stLocation = request.parameters.custpage_cwgp_location;
        const stMemoMain = request.parameters.custpage_cwgp_memomain;
        const stDate = request.parameters.custpage_cwgp_date;
        const stDeliverByDate = request.parameters.custpage_cwgp_deliverbydate;
        const stBusinessLine = request.parameters.custpage_cwgp_businessline;
        const stOperator = request.parameters.custpage_cwgp_operator;
        const stOperatorId = request.parameters.custpage_cwgp_operatorhidden;

        const objMapBodyFields = {
            entity: stVendor,
            subsidiary: stSubsidiary,
            trandate: new Date(stDate),
            memo: stMemoMain || '',
            location: stLocation,
            class: stBusinessLine,
            custbody_cwgp_externalportaloperator: stOperator,
            custbody_cwgp_externalportaloperatorid: stOperatorId,
            custbody_cwgp_deliverbydate: new Date(stDeliverByDate)
        };
        log.debug('objMapBodyFields', objMapBodyFields);

        return objMapBodyFields;
    };

    const mapRetailItemReceiptBodyFields = (request) => {
        const stVendor = request.parameters.custpage_cwgp_vendor;
        const stMemoMain = request.parameters.custpage_cwgp_memomain;
        const stDate = request.parameters.custpage_cwgp_date;
        const stSubsidiary = request.parameters.custpage_cwgp_subsidiary;
        const stAccount = 972;
        const stOperator = request.parameters.custpage_cwgp_operator;
        const stLocation = request.parameters.custpage_cwgp_location;

        const objMapBodyFields = {
            entity: stVendor,
            trandate: new Date(stDate),
            memo: stMemoMain || '',
            subsidiary: stSubsidiary,
            account: stAccount,
            custbody_cwgp_externalportaloperator: stOperator,
            location: stLocation
        };
        log.debug('objMapBodyFields', objMapBodyFields);

        return objMapBodyFields;
    };

    const mapRetailInventoryAdjustmentBodyFields = (request) => {
        const stAccount = request.parameters.custpage_cwgp_adjustmentaccount;
        const stPeriod = request.parameters.custpage_cwgp_postingperiod;
        const stDate = request.parameters.custpage_cwgp_date;
        const stMemoMain = request.parameters.custpage_cwgp_memomain;
        const stSubsidiary = request.parameters.custpage_cwgp_subsidiary;
        const stBusinessLine = request.parameters.custpage_cwgp_businessline;
        const stLocation = request.parameters.custpage_cwgp_adjustmentlocation;
        const stDepartment = request.parameters.custpage_cwgp_department;
        const stAdjustmentSubType = request.parameters.custpage_cwgp_adjustmentsubtype;
        const stOperator = request.parameters.custpage_cwgp_operator;
        const stTotalAdjustment = request.parameters.custpage_cwgp_totaladjustmenthidden;
        const stSubTypeId = request.parameters.custpage_cwgp_adjustmentsubtypeid;
        const stTotalDiscrepancy = request.parameters.custpage_cwgp_totaldiscrepancy;
        log.debug('stTotalDiscrepancy',stTotalDiscrepancy);
        const objMapBodyFields = {
            subsidiary: stSubsidiary,
            trandate: new Date(stDate),
            memo: stMemoMain || '',
            account: stAccount,
            postingperiod: stPeriod,
            class: stBusinessLine,
            adjlocation: stLocation,
            department: stDepartment,
            custbody_cwgp_adjustmentsubtype: stAdjustmentSubType,
            custbody_cwgp_externalportaloperator: stOperator,
            custbody_cwgp_itemsummary: stTotalAdjustment,
            custbody_cwgp_inventoryadjustmentsub: stSubTypeId,
            custbody_cwgp_totaldiscrepancy: stTotalDiscrepancy

        };
        log.debug('objMapBodyFields', objMapBodyFields);

        return objMapBodyFields;
    };

    const mapRetailPOSublistFields = (request) => {
        let arrMapSblFields = [];

        const intLineCount = request.getLineCount({ group: 'custpage_interpo_items' });

        for (let i = 0; i < intLineCount; i++) {
            /*let objDate = request.getSublistValue({
                group: 'custpage_interpo_items',
                name: 'custpage_cwgp_expectedreceiptdate',
                line: i
            });
            if(objDate){
                objDate = new Date(objDate);
            }else{
                objDate = null;
            }*/
            arrMapSblFields.push({
                item: request.getSublistValue({
                    group: 'custpage_interpo_items',
                    name: 'custpage_cwgp_item',
                    line: i
                }),
                description: request.getSublistValue({
                    group: 'custpage_interpo_items',
                    name: 'custpage_cwgp_description',
                    line: i
                }),
                quantity: parseInt(request.getSublistValue({
                    group: 'custpage_interpo_items',
                    name: 'custpage_cwgp_quantity',
                    line: i
                })),
                rate: request.getSublistValue({
                    group: 'custpage_interpo_items',
                    name: 'custpage_cwgp_rate',
                    line: i
                }),
                /*class: request.getSublistValue({
                    group: 'custpage_interpo_items',
                    name: 'custpage_cwgp_businessline',
                    line: i
                }),*/
                class:1,
            });
        }

        log.debug('arrMapSblFields', arrMapSblFields)
        return arrMapSblFields;
    };

    const mapItemReceiptSublistFields = (request) => {
        let arrMapSblFields = [];
        let arrMapDamagedItems = [];
        let arrMapVariance = [];

        const intLineCount = request.getLineCount({ group: 'custpage_itemreceipt_items' });

        for (let i = 0; i < intLineCount; i++) {
            arrMapSblFields.push({
                item: request.getSublistValue({
                    group: 'custpage_itemreceipt_items',
                    name: 'custpage_cwgp_item',
                    line: i
                }),
                quantity: parseInt(request.getSublistValue({
                    group: 'custpage_itemreceipt_items',
                    name: 'custpage_cwgp_quantity',
                    line: i
                })),
                rate: request.getSublistValue({
                    group: 'custpage_itemreceipt_items',
                    name: 'custpage_cwgp_rate',
                    line: i
                }),
                transferlocation: request.getSublistValue({
                    group: 'custpage_itemreceipt_items',
                    name: 'custpage_cwgp_transferlocation',
                    line: i
                }),
                class: request.getSublistValue({
                    group: 'custpage_itemreceipt_items',
                    name: 'custpage_cwgp_businessline',
                    line: i
                }),
                description: request.getSublistValue({
                    group: 'custpage_itemreceipt_items',
                    name: 'custpage_cwgp_description',
                    line: i
                }),
                itemreceive: (request.getSublistValue({
                    group: 'custpage_itemreceipt_items',
                    name: 'custpage_cwgp_receive',
                    line: i
                }) == 'F') ? false : true
            });

            if(request.getSublistValue({ group: 'custpage_itemreceipt_items',name: 'custpage_cwgp_damagedquantity',line: i}) && request.getSublistValue({ group: 'custpage_itemreceipt_items',name: 'custpage_cwgp_receive',line: i}) == 'T' && request.getSublistValue({ group: 'custpage_itemreceipt_items',name: 'custpage_cwgp_damagedquantity',line: i}) != 0){
                arrMapDamagedItems.push({
                    item: request.getSublistValue({
                        group: 'custpage_itemreceipt_items',
                        name: 'custpage_cwgp_itemid',
                        line: i
                    }),
                    adjustqtyby: -Math.abs(request.getSublistValue({
                        group: 'custpage_itemreceipt_items',
                        name: 'custpage_cwgp_damagedquantity',
                        line: i
                    })),
                    location: request.getSublistValue({
                        group: 'custpage_itemreceipt_items',
                        name: 'custpage_cwgp_transferlocation',
                        line: i
                    }),
                    class: request.getSublistValue({
                        group: 'custpage_itemreceipt_items',
                        name: 'custpage_cwgp_businessline',
                        line: i
                    }),
                    account: request.getSublistValue({
                        group: 'custpage_itemreceipt_items',
                        name: 'custpage_cwgp_damagedadjustingaccount',
                        line: i
                    }),
                });
            }
            if(request.getSublistValue({ group: 'custpage_itemreceipt_items',name: 'custpage_cwgp_variance',line: i}) && request.getSublistValue({ group: 'custpage_itemreceipt_items',name: 'custpage_cwgp_receive',line: i}) == 'T' && request.getSublistValue({ group: 'custpage_itemreceipt_items',name: 'custpage_cwgp_variance',line: i}) != 0){
                arrMapVariance.push({
                    item: request.getSublistValue({
                        group: 'custpage_itemreceipt_items',
                        name: 'custpage_cwgp_itemid',
                        line: i
                    }),
                    /*quantity: request.getSublistValue({
                        group: 'custpage_itemreceipt_items',
                        name: 'custpage_cwgp_quantity',
                        line: i
                    }),*/
                    quantity: request.getSublistValue({
                        group: 'custpage_itemreceipt_items',
                        name: 'custpage_cwgp_variance',
                        line: i
                    }),
                });
            }
        }

        log.debug('arrMapSblFields', arrMapSblFields)
        log.debug('arrMapDamagedItems', arrMapDamagedItems)
        log.debug('arrMapVariance', arrMapVariance)
        return [arrMapSblFields,arrMapDamagedItems,arrMapVariance];
    };

    const mapInventoryAdjustmentSublistFields = (request,stSubType) => {
        log.debug('mapInventoryAdjustmentSublistFields', '==mapInventoryAdjustmentSublistFields==');
        log.debug('mapInventoryAdjustmentSublistFields stSubType', stSubType);
        let arrMapSblFields = [];
        let subTypeSublist = stSubType == 'standard' ? 'custpage_inventorayadjustment_items' : stSubType == 'backbar' ? 'custpage_inventorayadjustmentbackbar_items' : stSubType == 'damagetestertheft' ? 'custpage_inventoryadjustmentdamagetestertheft_items' : 'custpage_inventoryadjustmentinventorycount_items';
        
        const intLineCount = request.getLineCount({ group: subTypeSublist});

        log.debug('mapInventoryAdjustmentSublistFields sublist', subTypeSublist);
        for (let i = 0; i < intLineCount; i++) {
            let intFinalQuantity = 0;

            const intAdjQtyBy = parseInt(request.getSublistValue({
                group: subTypeSublist,
                name: 'custpage_cwgp_adjustqtyby',
                line: i
            }));

            const intEndingInvQuantity = parseInt(request.getSublistValue({
                group: subTypeSublist,
                name: 'custpage_cwgp_newquantity',
                line: i
            }));

            const intQtyOnHand = parseInt(request.getSublistValue({
                group: subTypeSublist,
                name: 'custpage_cwgp_qtyonhand',
                line: i
            }));

            const intDiscrepancy = parseInt(request.getSublistValue({
                group: subTypeSublist,
                name: 'custpage_cwgp_discrepancy',
                line: i
            }));


            const stAdjustmentReason = request.getSublistValue({
                group: subTypeSublist,
                name: 'custpage_cwgp_adjustmentreason',
                line: i
            });

            const stItem = request.getSublistValue({
                group: subTypeSublist,
                name: 'custpage_cwgp_item',
                line: i
            });

            const stLocation = request.getSublistValue({
                group: subTypeSublist,
                name: 'custpage_cwgp_location',
                line: i
            })

            const stBusinessLine = request.getSublistValue({
                group: subTypeSublist,
                name: 'custpage_cwgp_businessline',
                line: i
            })

            const stRoomNum = request.getSublistValue({
                group: subTypeSublist,
                name: 'custpage_cwgp_roomnumber',
                line: i
            })

            const stAssign = request.getSublistValue({
                group: subTypeSublist,
                name: 'custpage_cwgp_stassignment',
                line: i
            })

            let dtDateTime = new Date(request.getSublistValue({
                group: subTypeSublist,
                name: 'custpage_cwgp_datetime',
                line: i
            }))

            
            const stAdjustmentType = request.getSublistValue({
                group: subTypeSublist,
                name: 'custpage_cwgp_adjustmenttype',
                line: i
            })

            intFinalQuantity = intEndingInvQuantity-intQtyOnHand;

            const stDiscrepancy = request.getSublistValue({
                group: subTypeSublist,
                name: 'custpage_cwgp_discrepancy',
                line: i
            })

            const stEnteredCount = request.getSublistValue({
                group: subTypeSublist,
                name: 'custpage_cwgp_enteredcount',
                line: i
            })



            if(stSubType == 'standard'){
                arrMapSblFields.push({
                    item: stItem,
                    location: stLocation,
                    adjustqtyby: intFinalQuantity,
                    class: stBusinessLine,
                    custcol_cwgp_adjustmenttype: stAdjustmentType,
                    custcol_cwgp_adjustmentreason: stAdjustmentReason,
                })
            }
            else if(stSubType == 'backbar'){
                arrMapSblFields.push({
                    item: stItem,
                    location: stLocation,
                    adjustqtyby: -Math.abs(intAdjQtyBy),
                    class: stBusinessLine,
                    custcol_cwgp_adjustmenttype: stAdjustmentType,
                    custcol_cwgp_adjustmentreason: stAdjustmentReason,
                    custcol_cwgp_roomnumber: stRoomNum,
                    custcol_cwgp_stassignment:stAssign,
                    custcol_cwgp_datetime: dtDateTime,
                })
            }
            else if(stSubType == 'damagetestertheft'){
                arrMapSblFields.push({
                    item: stItem,
                    location: stLocation,
                    adjustqtyby: -Math.abs(intAdjQtyBy),
                    class: stBusinessLine,
                    custcol_cwgp_adjustmenttype: stAdjustmentType,
                    custcol_cwgp_adjustmentreason: stAdjustmentReason,
                    custcol_cwgp_datetime: dtDateTime,
                })
            }
            else{
                arrMapSblFields.push({
                    item: stItem,
                    location: stLocation,
                    adjustqtyby: intDiscrepancy,
                    class: stBusinessLine,
                    custcol_cwgp_adjustmenttype: stAdjustmentType,
                    custcol_cwgp_adjustmentreason: stAdjustmentReason,
                    custcol_cwgp_discrepancy: stDiscrepancy,
                    custcol_cwgp_enteredcountfinalqty: stEnteredCount
                })
            }
            
        }

        log.debug('arrMapSblFields', )
        return arrMapSblFields;
    };

    const editRetailPurchaseOrder = (stPoId, objPOEditDetails, objPORecordDetails, request) => {
      
            const recPO = record.load({
                type: record.Type.PURCHASE_ORDER,
                id: stPoId,
                isDynamic: true
            });

            const objPOEditBodyFields = objPOEditDetails.body;
            log.debug('objPOEditBodyFields', objPOEditBodyFields);

            const objPORecordBodyFields = objPORecordDetails.body;
            log.debug('objPORecordBodyFields', objPORecordBodyFields);

            const objBodyFields = getBodyFieldsToUpdate(objPORecordBodyFields, objPOEditBodyFields);

            util.each(objBodyFields, (value, fieldId) => {
                recPO.setValue({
                    fieldId: fieldId,
                    value: value
                });
            });

            let arrPOEditSblFields = objPOEditDetails.item;
            let arrPoRecordSblFields = objPORecordDetails.item;

            const objItemLines = getItemFieldsToUpdate(arrPoRecordSblFields, arrPOEditSblFields);
            log.debug('objItemLines', objItemLines);

            const arrRemoveLines = objItemLines.removeLines;
            const arrUpdateLines = objItemLines.updateLines;

                    
            log.debug('arrUpdateLines',arrUpdateLines);

            arrRemoveLines.forEach((objRemoveLines) => {
                log.debug('removing lines...', 'removing lines...');
                log.debug('objRemoveLines.item', objRemoveLines.item);

                const intRemoveIdx = recPO.findSublistLineWithValue({
                    sublistId: 'item',
                    fieldId: 'item',
                    value: objRemoveLines.item
                });

                recPO.removeLine({
                    sublistId: 'item',
                    line: intRemoveIdx,
                });
            });


            arrUpdateLines.forEach((objUpdateLines) => {
                log.debug('updating lines...', 'updating lines...');
                log.debug('objUpdateLines.item', objUpdateLines.item);

                const intUpdateIdx = recPO.findSublistLineWithValue({
                    sublistId: 'item',
                    fieldId: 'item',
                    value: objUpdateLines.item
                });
                log.debug('intUpdateIdx', intUpdateIdx);

                if (intUpdateIdx != -1) {
                    recPO.selectLine({
                        sublistId: 'item',
                        line: intUpdateIdx
                    });
                } else {
                    recPO.selectNewLine({ sublistId: 'item' })
                }

                const arrSkipFields  = ['custpage_cwgp_description'];
                util.each(objUpdateLines, (value, fieldId) => {
                        recPO.setCurrentSublistValue({
                            fieldId: fieldId,
                            sublistId: 'item',
                            value: value || ''
                        });
                });

                recPO.commitLine({ sublistId: 'item' });
            });

        
            const idPO = recPO.save();
            log.debug('PO record is updated', idPO);
            return idPO;
    };

    const editRetailItemReceipt = (stItemReceiptId, objItemReceiptDetails, objItemReceiptRecordDetails) => {
        const recItemReceipt = record.load({
            type: record.Type.ITEM_RECEIPT,
            id: stItemReceiptId
        });

        const arrSkipFields = ['item','description','transferlocation','rate','entity'];

        const objItemReceiptEditBodyFields = objItemReceiptDetails.body;
        log.debug('objItemReceiptEditBodyFields', objItemReceiptEditBodyFields);

        const objItemReceiptRecordBodyFields = objItemReceiptRecordDetails.body;
        log.debug('objItemReceiptRecordBodyFields', objItemReceiptRecordBodyFields);

        const objBodyFields = getBodyFieldsToUpdateItemReceipt(objItemReceiptRecordBodyFields, objItemReceiptEditBodyFields);

        util.each(objBodyFields, (value, fieldId) => {
            if(arrSkipFields.includes(fieldId)){return;}
            recItemReceipt.setValue({
                fieldId: fieldId,
                value: value
            });
        });

        let arrPOEditSblFields = objItemReceiptDetails.item;
        let arrPoRecordSblFields = objItemReceiptRecordDetails.item;

        const objItemLines = getItemFieldsToUpdate(arrPoRecordSblFields, arrPOEditSblFields);
        log.debug('objItemLines', objItemLines);

        //const arrRemoveLines = objItemLines.removeLines;
        const arrUpdateLines = objItemLines.updateLines;

        
        log.debug('arrUpdateLines',arrUpdateLines);

        let intCurrentLine = 0;

        arrUpdateLines.forEach((objUpdateLines) => {
            log.debug('updating lines...', 'updating lines...');

            
            if(!objUpdateLines.itemreceive){
                recItemReceipt.setSublistValue({
                sublistId: 'item',
                fieldId: 'itemreceive',
                line: intCurrentLine,
                value: objUpdateLines.itemreceive
                });
            }
            else{
                util.each(objUpdateLines, (value, fieldId) => {
                    if(arrSkipFields.includes(fieldId) || (fieldId == 'itemreceive' && value == true)){return;}
                    recItemReceipt.setSublistValue({
                        sublistId: 'item',
                        fieldId: fieldId,
                        line: intCurrentLine,
                        value: value
                    });
                });
            }
            intCurrentLine++;
        });


        const idItemReceipt = recItemReceipt.save();
        log.debug('Item Receipt record is updated', idItemReceipt);

        return idItemReceipt;
    };


    const getPOValues = (stPoId) => {
        let objPO = {
            body: {},
            item: []
        };

        search.create({
            type: search.Type.PURCHASE_ORDER,
            filters:
                [
                    search.createFilter({
                        name: 'internalid',
                        operator: search.Operator.ANYOF,
                        values: stPoId
                    })
                ],
            columns:
                [
                    search.createColumn({ name: 'mainline' }),
                    search.createColumn({ name: 'entity' }),
                    search.createColumn({ name: 'memomain' }),
                    search.createColumn({ name: 'trandate' }),
                    search.createColumn({ name: 'subsidiary' }),
                    search.createColumn({ name: 'location' }),
                    search.createColumn({ name: 'item' }),
                    search.createColumn({ name: 'memo' }),
                    search.createColumn({ name: 'quantity' }),
                    search.createColumn({ name: 'rate' }),
                    search.createColumn({ name: 'amount' }),
                    search.createColumn({ name: 'custbody_cwgp_deliverbydate' })
                ]
        }).run().each((result) => {
            const stMainLine = result.getValue({ name: 'mainline' });

            if (stMainLine == '*') {
                objPO.body.entity = result.getValue({ name: 'entity' });
                objPO.body.trandate = new Date(result.getValue({ name: 'trandate' }));
                objPO.body.memo = result.getValue({ name: 'memomain' });
                objPO.body.location = result.getValue({ name: 'location' });
                objPO.body.custbody_cwgp_deliverbydate = new Date(result.getValue({ name: 'custbody_cwgp_deliverbydate' }));
            } else {
                objPO.item.push({
                    item: result.getValue({ name: 'item' }),
                    description: result.getValue({ name: 'memo' }),
                    quantity: result.getValue({ name: 'quantity' }),
                    rate: result.getValue({ name: 'rate' }),
                });
            }

            return true;
        });

        return objPO;
    };

    const getItemReceiptValues = (stPoId) => {
        let objPO = {
            body: {},
            item: []
        };

        search.create({
            type: search.Type.ITEM_RECEIPT,
            filters:
                [
                    search.createFilter({
                        name: 'internalid',
                        operator: search.Operator.ANYOF,
                        values: stPoId
                    }),
                    search.createFilter({
                        name : 'formulanumeric',
                        operator : search.Operator.EQUALTO,
                        values : "1",
                        formula : "CASE WHEN {entity} IS NULL THEN 0 ELSE 1 END",
                    })
                ],
            columns:
                [
                    search.createColumn({ name: 'mainline' }),
                    search.createColumn({ name: 'entity' }),
                    search.createColumn({ name: 'memomain' }),
                    search.createColumn({ name: 'trandate' }),
                    search.createColumn({ name: 'subsidiary' }),
                    search.createColumn({ name: 'transferlocation' }),
                    search.createColumn({ name: 'item' }),
                    search.createColumn({ name: 'quantity' }),
                    search.createColumn({ name: 'rate' }),
                    search.createColumn({ name: 'createdfrom' }),
                    search.createColumn({ name: 'class' }),
                    search.createColumn({ name: 'salesdescription' , join: 'item'})
                ]
        }).run().each((result) => {
            const stMainLine = result.getValue({ name: 'mainline' });

            if (stMainLine == '*') {
                objPO.body.entity = result.getValue({ name: 'entity' });
                objPO.body.trandate = new Date(result.getValue({ name: 'trandate' }));
                objPO.body.memo = result.getValue({ name: 'memomain' });
                /*objPO.body.subsidiary = result.getValue({ name: 'subsidiary' });
                objPO.body.createdfrom = result.getText({ name: 'createdfrom' });*/
            } else {
                objPO.item.push({
                    item: result.getText({ name: 'item' }),
                    quantity: result.getValue({ name: 'quantity' }),
                    rate: result.getValue({ name: 'rate' }),
                    transferlocation: result.getText({ name: 'transferlocation' }),
                    businessline: result.getValue({ name: 'class' }),
                    description: result.getText({ name: 'salesdescription', join: 'item' })
                });
            }

            return true;
        });

        return objPO;
    };

    const getBodyFieldsToUpdate = (objPORecordDetails, objPOBodyFields) => {
        const objBodyFldsToUpdate = {};
        let stDate = objPORecordDetails.trandate;
        stDate = format.format({ value: stDate, type: format.Type.DATETIMETZ });

        let stDeliverByDate = objPORecordDetails.custbody_cwgp_deliverbydate;
        stDeliverByDate = format.format({ value: stDeliverByDate, type: format.Type.DATETIMETZ });

        const stEntity = objPORecordDetails.entity;
        const stMemoMain = objPORecordDetails.memo;
        const stLocation = objPORecordDetails.location;
        log.debug('recPO details', `{
            date: ${stDate},
            deliverbydate: ${stDeliverByDate},
            vendor: ${stEntity},
            memo: ${stMemoMain},
            location: ${stLocation}
        }`);

        const { entity, memo, location } = objPOBodyFields;
        let trandate = objPOBodyFields.trandate;
        trandate = format.format({ value: trandate, type: format.Type.DATETIMETZ });

        let deliverbydate = objPOBodyFields.custbody_cwgp_deliverbydate;
        deliverbydate = format.format({ value: deliverbydate, type: format.Type.DATETIMETZ });

        if (stDate != trandate) {
            objBodyFldsToUpdate.trandate = new Date(trandate);
        }

        if (stEntity != entity) {
            objBodyFldsToUpdate.entity = entity;
        }

        if (stMemoMain != memo) {
            objBodyFldsToUpdate.memo = memo;
        }

        if (stLocation != location) {
            objBodyFldsToUpdate.location = location;
        }
        
        if (stDeliverByDate != deliverbydate) {
            objBodyFldsToUpdate.custbody_cwgp_deliverbydate = new Date(deliverbydate);
        }

        log.debug('PO Body Fields to update', objBodyFldsToUpdate);

        return objBodyFldsToUpdate;
    };

    const getBodyFieldsToUpdateItemReceipt = (objPORecordDetails, objPOBodyFields) => {
        const objBodyFldsToUpdate = {};
        let stDate = objPORecordDetails.trandate;
        stDate = format.format({ value: stDate, type: format.Type.DATETIMETZ });

        const stEntity = objPORecordDetails.entity;
        const stMemoMain = objPORecordDetails.memo;
        log.debug('item receipt details', `{
            date: ${stDate},
            vendor: ${stEntity},
            memo: ${stMemoMain}
        }`);

        const { entity, memo } = objPOBodyFields;
        let trandate = objPOBodyFields.trandate;
        trandate = format.format({ value: trandate, type: format.Type.DATETIMETZ });

        if (stDate != trandate) {
            objBodyFldsToUpdate.trandate = new Date(trandate);
        }

        if (stEntity != entity) {
            objBodyFldsToUpdate.entity = entity;
        }

        if (stMemoMain != memo) {
            objBodyFldsToUpdate.memo = memo;
        }


        log.debug('PO Body Fields to update', objBodyFldsToUpdate);

        return objBodyFldsToUpdate;
    };

    const getItemFieldsToUpdate = (arrPoRecordSblFields, arrPOEditSblFields) => {
        let arrColFldsToUpdate = [];
        let arrColFieldsToRemove = [];

        //this will check if PO Record's item in Netsuite is existing in Edit Suitelet Page's item lines 
        //if it is existing, it will be pushed to arrColFldsToUpdate and it will be removed from arrPoRecordSblFields and arrPOEditSblFields
        //if it is not existing, it will be pushed to arrColFieldsToRemove and it will be removed from arrPoRecordSblFields
        //if arrPoRecordSblFields is empty AND arrPOEditSblFields still has value, push the remaining values to arrColFldsToUpdate

        for (let intPOIndex = arrPoRecordSblFields.length - 1; intPOIndex >= 0; intPOIndex--) {
            const objPoRec = arrPoRecordSblFields[intPOIndex];

            const stPoRecItem = objPoRec.item;
            log.debug('>>>>>> start <<<<<<<<<', '>>>>>> start <<<<<<<<<');
            log.debug('stPoRecItem', stPoRecItem);

            let intIndexOfItemFound = -1;

            for (let intEditIndex = arrPOEditSblFields.length - 1; intEditIndex >= 0; intEditIndex--) {
                const objPoEdit = arrPOEditSblFields[intEditIndex];
                const stPoEditItem = objPoEdit.item;
                log.debug('stPoEditItem', stPoEditItem);

                if (stPoRecItem == stPoEditItem) {
                    intIndexOfItemFound = intEditIndex;

                    break;
                }
            }

            log.debug('intIndexOfItemFound', intIndexOfItemFound);

            if (intIndexOfItemFound == -1) {
                arrColFieldsToRemove.push(arrPoRecordSblFields[intPOIndex]);
                arrPoRecordSblFields.splice(intPOIndex, 1);

            } else {
                arrColFldsToUpdate.push(arrPOEditSblFields[intIndexOfItemFound]);
                arrPOEditSblFields.splice(intIndexOfItemFound, 1);
                arrPoRecordSblFields.splice(intPOIndex, 1);
            }
        }

        //add remaining items
        if (arrPoRecordSblFields.length == 0 && arrPOEditSblFields.length > 0) {
            arrColFldsToUpdate.push(...arrPOEditSblFields);
        }

        return {
            updateLines: arrColFldsToUpdate,
            removeLines: arrColFieldsToRemove
        }
    };

    return {
        createRetailPurchaseOrder,
        createRetailItemReceipt,
        createRetailInventoryAdjustment,
        mapRetailPOBodyFields,
        mapRetailItemReceiptBodyFields,
        mapRetailInventoryAdjustmentBodyFields,
        mapRetailPOSublistFields,
        mapInventoryAdjustmentSublistFields,
        mapItemReceiptSublistFields,
        editRetailPurchaseOrder,
        editRetailItemReceipt,
        getItemReceiptValues,
        getPOValues,
        getBodyFieldsToUpdateItemReceipt,
    }
});
