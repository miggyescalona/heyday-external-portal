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

        const arrSkipFields  = ['description','item','quantityremaining','rate','entity'];

        const objItemReceipt = record.transform({
            fromType: 'purchaseorder',
            fromId: request.parameters.custpage_cwgp_poid,
            toType: 'itemreceipt',
        });

        const objPOBodyFields = mapRetailItemReceiptBodyFields(request);

        util.each(objPOBodyFields, (value, fieldId) => {
            if(arrSkipFields.includes(fieldId)){return;}
            objItemReceipt.setValue({
                fieldId: fieldId,
                value: value
            });
        });
        
        const arrPOSblFields = mapItemReceiptSublistFields(request);

        let intCurrentLine = 0;
        arrPOSblFields.forEach((objPOBodyFields) => {   
            if(!objPOBodyFields.itemreceive){
                objItemReceipt.setSublistValue({
                    sublistId: 'item',
                    fieldId: 'itemreceive',
                    line: intCurrentLine,
                    value: objPOBodyFields.itemreceive
                });
            }
            else{
                util.each(objPOBodyFields, (value, fieldId) => {
                    if(arrSkipFields.includes(fieldId) || (fieldId == 'itemreceive' && value == true)){return;}
                    objItemReceipt.setSublistValue({
                        sublistId: 'item',
                        fieldId: fieldId,
                        line: intCurrentLine,
                        value: value
                    });
                });
            }
            intCurrentLine++;
        });

        const recIR = objItemReceipt.save();
        log.debug('recIR', recIR);

        return recIR;

    }

    const createRetailInventoryAdjustment = (request) => {

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

        const arrPOSblFields = mapInventoryAdjustmentSublistFields(request);

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

    const mapRetailPOBodyFields = (request) => {
        const stVendor = request.parameters.custpage_cwgp_vendor;
        const stSubsidiary = request.parameters.custpage_cwgp_subsidiary;
        const stLocation = request.parameters.custpage_cwgp_location;
        const stMemoMain = request.parameters.custpage_cwgp_memomain;
        const stDate = request.parameters.custpage_cwgp_date;
        const stBusinessLine = request.parameters.custpage_cwgp_businessline;

        const objMapBodyFields = {
            entity: stVendor,
            subsidiary: stSubsidiary,
            trandate: new Date(stDate),
            memo: stMemoMain || '',
            location: stLocation,
            class: stBusinessLine
        };
        log.debug('objMapBodyFields', objMapBodyFields);

        return objMapBodyFields;
    };

    const mapRetailItemReceiptBodyFields = (request) => {
        const stVendor = request.parameters.custpage_cwgp_vendor;
        const stMemoMain = request.parameters.custpage_cwgp_memomain;
        const stDate = request.parameters.custpage_cwgp_date;

        const objMapBodyFields = {
            entity: stVendor,
            trandate: new Date(stDate),
            memo: stMemoMain || ''
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

        const objMapBodyFields = {
            subsidiary: stSubsidiary,
            trandate: new Date(stDate),
            memo: stMemoMain || '',
            account: stAccount,
            postingperiod: stPeriod,
            class: stBusinessLine,
            adjlocation: stLocation,
            department: stDepartment

        };
        log.debug('objMapBodyFields', objMapBodyFields);

        return objMapBodyFields;
    };

    const mapRetailPOSublistFields = (request) => {
        let arrMapSblFields = [];

        const intLineCount = request.getLineCount({ group: 'custpage_interpo_items' });

        for (let i = 0; i < intLineCount; i++) {
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
                quantity: request.getSublistValue({
                    group: 'custpage_interpo_items',
                    name: 'custpage_cwgp_quantity',
                    line: i
                }),
                rate: request.getSublistValue({
                    group: 'custpage_interpo_items',
                    name: 'custpage_cwgp_rate',
                    line: i
                }),
                class: request.getSublistValue({
                    group: 'custpage_interpo_items',
                    name: 'custpage_cwgp_businessline',
                    line: i
                })
            })
        }

        log.debug('arrMapSblFields', arrMapSblFields)
        return arrMapSblFields;
    };

    const mapItemReceiptSublistFields = (request) => {
        let arrMapSblFields = [];

        const intLineCount = request.getLineCount({ group: 'custpage_itemreceipt_items' });

        for (let i = 0; i < intLineCount; i++) {
            arrMapSblFields.push({
                item: request.getSublistValue({
                    group: 'custpage_itemreceipt_items',
                    name: 'custpage_cwgp_item',
                    line: i
                }),
                quantity: request.getSublistValue({
                    group: 'custpage_itemreceipt_items',
                    name: 'custpage_cwgp_quantity',
                    line: i
                }),
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
            })
        }

        log.debug('arrMapSblFields', arrMapSblFields)
        return arrMapSblFields;
    };

    const mapInventoryAdjustmentSublistFields = (request) => {
        let arrMapSblFields = [];

        const intLineCount = request.getLineCount({ group: 'custpage_inventorayadjustment_items' });

        for (let i = 0; i < intLineCount; i++) {
            arrMapSblFields.push({
                item: request.getSublistValue({
                    group: 'custpage_inventorayadjustment_items',
                    name: 'custpage_cwgp_item',
                    line: i
                }),
                location: request.getSublistValue({
                    group: 'custpage_inventorayadjustment_items',
                    name: 'custpage_cwgp_location',
                    line: i
                }),
                adjustqtyby: parseInt(request.getSublistValue({
                    group: 'custpage_inventorayadjustment_items',
                    name: 'custpage_cwgp_adjustqtyby',
                    line: i
                })),
                department: request.getSublistValue({
                    group: 'custpage_inventorayadjustment_items',
                    name: 'custpage_cwgp_department',
                    line: i
                }),
                class: request.getSublistValue({
                    group: 'custpage_inventorayadjustment_items',
                    name: 'custpage_cwgp_businessline',
                    line: i
                }),
            })
        }

        log.debug('arrMapSblFields', arrMapSblFields)
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

                util.each(objUpdateLines, (value, fieldId) => {
                    recPO.setCurrentSublistValue({
                        sublistId: 'item',
                        fieldId: fieldId,
                        value: value
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
                    search.createColumn({ name: 'amount' })
                ]
        }).run().each((result) => {
            const stMainLine = result.getValue({ name: 'mainline' });

            if (stMainLine == '*') {
                objPO.body.entity = result.getValue({ name: 'entity' });
                objPO.body.trandate = new Date(result.getValue({ name: 'trandate' }));
                objPO.body.memo = result.getValue({ name: 'memomain' });
                objPO.body.location = result.getValue({ name: 'location' });
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

        const stEntity = objPORecordDetails.entity;
        const stMemoMain = objPORecordDetails.memo;
        const stLocation = objPORecordDetails.location;
        log.debug('recPO details', `{
            date: ${stDate},
            vendor: ${stEntity},
            memo: ${stMemoMain},
            location: ${stLocation}
        }`);

        const { entity, memo, location } = objPOBodyFields;
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

        if (stLocation != location) {
            objBodyFldsToUpdate.location = location;
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

