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

define(['N/search', 'N/record', 'N/format', 'N/util'], (search, record, format, util) => {

    const createRetailPurchaseOrder = (request) => {
        const recPO = record.create({
            type: record.Type.PURCHASE_ORDER,
            isDynamic: true
        });

        const objPOBodyFields = mapFranchisePOBodyFields(request);

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
    
    const createFranchisePO = (request) => {
        const recPO = record.create({
            type: record.Type.SALES_ORDER,
            isDynamic: true
        });
        recPO.setValue({
            fieldId: 'custbody_cwgp_createdbyfranchise',
            value: true
        });
        const objPOBodyFields = mapFranchisePOBodyFields(request);

        util.each(objPOBodyFields, (value, fieldId) => {
            recPO.setValue({
                fieldId: fieldId,
                value: value
            });
        });
        recPO.setValue({
            fieldId: 'custbody_cwgp_modifiedbyfranchise',
            value: true
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
    
    const createFranchiseIR = (request) => {
        const recIR = record.create({
            type: 'customrecord_cwgp_franchisereciept'
        });

        const objPOBodyFields = mapFranchiseIRBodyFields(request);
        log.debug('objPOBodyFields', objPOBodyFields);
        util.each(objPOBodyFields, (value, fieldId) => {
        	recIR.setValue({
                fieldId: fieldId,
                value: value
            });
        });
        
        const idIR = recIR.save();
        const arrPOSblFields = mapFranchiseIRSublistFields(idIR,request);
        let lineList = [];
        let qtyList = [];
        log.debug('arrPOSblFields', arrPOSblFields);
        arrPOSblFields.forEach((objPOBodyFields) => {
        	log.debug('objPOBodyFields', objPOBodyFields);
        	lineList.push(objPOBodyFields.custrecord_cwgp_frl_line);
        	qtyList.push(objPOBodyFields.custrecord_cwgp_frl_quantity)
        	const recIRLine = record.create({
                type: 'customrecord_cwgp_franchiserecieptline'
            });
            util.each(objPOBodyFields, (value,fieldId) => {
            	//log.debug('value', value);
            	//log.debug('fieldId', fieldId);
            	recIRLine.setValue({
                    fieldId: fieldId,
                    value: value
                });
            });
            const idIRLine = recIRLine.save();
        });
        
        
        log.debug('lineList', lineList);
        log.debug('qtyList', qtyList);
        
        const recPO = record.load({
            type: record.Type.SALES_ORDER,
            id: objPOBodyFields.custrecord_cwgp_fr_so
        });
        
        const numLines = recPO.getLineCount({
            sublistId: 'item'
        });
        for(let i =0; i<numLines; i++){
        	const lineId = recPO.getSublistValue({
        		sublistId: 'item',
        		fieldId: 'lineuniquekey',
                line: i
            });
        	const index = lineList.indexOf(lineId);
        	if(index != -1){
        		const remaining = recPO.getSublistValue({
        			sublistId: 'item',
        			fieldId: 'custcol_cwgp_remaining',
                    line: i
                });
        		const newRemaining = remaining - qtyList[index];
        		log.debug('remaining', remaining);
        		log.debug('newRemaining', newRemaining);
        		recPO.setSublistValue({
        		    sublistId: 'item',
        		    fieldId: 'custcol_cwgp_remaining',
        		    line: i,
        		    value: newRemaining
        		});
        	}
        }
        
        const idPO = recPO.save();
        
        return idIR;
    };

    
    const mapFranchisePOBodyFields = (request) => {
        const stCustomer = request.parameters.custpage_cwgp_customer;
        const stLocation = request.parameters.custpage_cwgp_location;
        const stMemoMain = request.parameters.custpage_cwgp_memomain;
        const stDate = request.parameters.custpage_cwgp_date;

        const objMapBodyFields = {
            entity: stCustomer,
            trandate: new Date(stDate),
            memo: stMemoMain || '',
            //location: stLocation,
        };
        log.debug('objMapBodyFields', objMapBodyFields);

        return objMapBodyFields;
    };
    
    const mapFranchiseIRBodyFields = (request) => {
    	const recid		 = request.parameters.custpage_cwgp_recid;
    	const poId		 = request.parameters.custpage_cwgp_poid;
        const stCustomer = request.parameters.custpage_cwgp_customer;
        const stLocation = request.parameters.custpage_cwgp_location;
        const stMemoMain = request.parameters.custpage_cwgp_memomain;
        const stDate = request.parameters.custpage_cwgp_date;
        log.debug(' mapFranchiseIRBodyFields', request.parameters);
        const objMapBodyFields = {
        	'recid': recid,
        	'custrecord_cwgp_fr_so': poId,
        	'custrecord_cwgp_fr_customer': stCustomer,
        	'custrecord_cwgp_fr_location': stLocation,
        	'custrecord_cwgp_fr_date': new Date(stDate)
        };
        log.debug('objMapBodyFields', objMapBodyFields);

        return objMapBodyFields;
    };

    const mapRetailPOSublistFields = (request) => {
        let arrMapSblFields = [];

        const intLineCount = request.getLineCount({ group: 'custpage_interpo_items' });
        log.debug('intLineCount', intLineCount);

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
                })
            })
        }

        log.debug('arrMapSblFields', arrMapSblFields)
        return arrMapSblFields;
    };
    
    const mapFranchiseIRSublistFields = (id,request) => {
        let arrMapSblFields = [];
        log.debug('mapFranchiseIRSublistFields', '');
        log.debug('request', request);
        const intLineCount = request.getLineCount({ group: 'custpage_itemreceipt_items' });
        log.debug('intLineCount', intLineCount);

        for (let i = 0; i < intLineCount; i++) {
        	let recieve = request.getSublistValue({
                group: 'custpage_itemreceipt_items',
                name: 'custpage_cwgp_receive',
                line: i
            });
        	log.debug('recieve', recieve);
        	if(recieve =='T'){
        		arrMapSblFields.push({
                    'custrecord_cwgp_frl_itemreciept': id,
                    'custrecord_cwgp_frl_item': request.getSublistValue({
                        group: 'custpage_itemreceipt_items',
                        name: 'custpage_cwgp_item',
                        line: i
                    }),
                    'custrecord_cwgp_frl_quantity': request.getSublistValue({
                        group: 'custpage_itemreceipt_items',
                        name: 'custpage_cwgp_quantity',
                        line: i
                    }),
                    'custrecord_cwgp_frl_line': request.getSublistValue({
                        group: 'custpage_itemreceipt_items',
                        name: 'custpage_cwgp_line',
                        line: i
                    })
                })
        	}
            
        }

        log.debug('arrMapSblFields', arrMapSblFields)
        return arrMapSblFields;
    };
    
    const mapFranchiseIRSublistFieldsEdit = (request) => {
        let arrMapSblFields = [];
        log.debug('mapFranchiseIRSublistFields Edit', '');
        log.debug('request', request);
        const intLineCount = request.getLineCount({ group: 'custpage_itemreceipt_items' });
        log.debug('intLineCount', intLineCount);

        for (let i = 0; i < intLineCount; i++) {
    		arrMapSblFields.push({
                'id': request.getSublistValue({
                    group: 'custpage_itemreceipt_items',
                    name: 'custpage_cwgp_id',
                    line: i
                }),
                'custrecord_cwgp_frl_item': request.getSublistValue({
                    group: 'custpage_itemreceipt_items',
                    name: 'custpage_cwgp_item',
                    line: i
                }),
                'custrecord_cwgp_frl_quantity': request.getSublistValue({
                    group: 'custpage_itemreceipt_items',
                    name: 'custpage_cwgp_quantity',
                    line: i
                }),
                'custrecord_cwgp_frl_line': request.getSublistValue({
                    group: 'custpage_itemreceipt_items',
                    name: 'custpage_cwgp_line',
                    line: i
                })
            })
            
        }

        log.debug('arrMapSblFields', arrMapSblFields)
        return arrMapSblFields;
    };

    const editFranchisePurchaseOrder = (stPoId, objPOEditDetails, objPORecordDetails) => {
        const recPO = record.load({
            type: record.Type.SALES_ORDER,
            id: stPoId,
            isDynamic: true
        });
        recPO.setValue({
            fieldId: 'custbody_cwgp_modifiedbyfranchise',
            value: true
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
    
    const editFranchiseIR = (stPoId, objPOEditDetails) => {
        const objPOEditBodyFields = objPOEditDetails.body;
        log.debug('objPOEditBodyFields', objPOEditBodyFields);
        var IRId = record.submitFields({
            type: 'customrecord_cwgp_franchisereciept',
            id: objPOEditBodyFields.recid,
            values: {
                'custrecord_cwgp_fr_date': objPOEditBodyFields.custrecord_cwgp_fr_date
            }
        });
        
        /*util.each(objBodyFields, (value, fieldId) => {
        	recIR.setValue({
                fieldId: fieldId,
                value: value
            });
        });*/
        let arrPOEditSblFields = objPOEditDetails.item;
        log.debug('arrPOEditSblFields', arrPOEditSblFields);
        
        arrPOEditSblFields.forEach((objUpdateLines) => {
            log.debug('objUpdateLines', objUpdateLines);
            var IRLineId = record.submitFields({
                type: 'customrecord_cwgp_franchiserecieptline',
                id: objUpdateLines.id,
                values: {
                    'custrecord_cwgp_frl_quantity': objUpdateLines.custrecord_cwgp_frl_quantity
                }
            });
        });

        return objPOEditBodyFields.recid;
    };

    const getPOValues = (stPoId) => {
        let objPO = {
            body: {},
            item: []
        };

        search.create({
            type: search.Type.SALES_ORDER,
            filters:
                [
                    search.createFilter({
                        name: 'internalid',
                        operator: search.Operator.ANYOF,
                        values: stPoId
                    }),
                    search.createFilter({
                        name: 'taxline',
                        operator: search.Operator.IS,
                        values: false
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
        createFranchisePO,
        mapFranchisePOBodyFields,
        mapRetailPOSublistFields,
        editFranchisePurchaseOrder,
        editFranchiseIR,
        getPOValues,
        createFranchiseIR,
        mapFranchiseIRBodyFields,
        mapFranchiseIRSublistFields,
        mapFranchiseIRSublistFieldsEdit,
    }
});
