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

define(['N/search', 'N/record', 'N/format', 'N/util', 'N/task', './HEYDAY_LIB_Util.js'], (search, record, format, util, task, utilLib) => {

    
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

        const arrPOSblFields = mapFranchisePOSublistFields(request);
        log.debug('mapFranchisePOSublistFields', mapFranchisePOSublistFields);
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
        log.debug('idIR', idIR);
        //create IR lines
        const arrPOSblFields = mapFranchiseIRSublistFields(idIR,objPOBodyFields.custrecord_cwgp_fr_customer,objPOBodyFields.custrecord_cwgp_fr_date,request);
        let lineList = [];
        let qtyList = [];
        log.debug('arrPOSblFields', arrPOSblFields);
        log.debug('arrPOSblFields[0]', arrPOSblFields[0]);
        arrPOSblFields[0].forEach((objPOBodyFields) => {
        	log.debug('objPOBodyFields', objPOBodyFields);
        	lineList.push(objPOBodyFields.custrecord_cwgp_ftl_poline);
        	qtyList.push(parseInt(objPOBodyFields.custrecord_cwgp_ftl_receivedqty));
        	const recIRLine = record.create({
                type: 'customrecord_cwgp_franchise_tranline'
            });
            util.each(objPOBodyFields, (value,fieldId) => {
            	//log.debug('value', value);
            	//log.debug('fieldId', fieldId);
            	recIRLine.setValue({
                    fieldId: fieldId,
                    value: value
                });
            });
            let idIRLine = recIRLine.save();
        });

        //const arrPOSblFieldsDamaged = mapFranchiseIRDamagedSublistFields(idIR,objPOBodyFields.custrecord_cwgp_fr_customer,request);
        //log.debug('arrPOSblFieldsDamaged', arrPOSblFieldsDamaged);
        if(arrPOSblFields[1].length >0){

            const recIA = record.create({
                type: 'customrecord_cwgp_franchiseinvadjustment'
            });
            recIA.setValue({
                fieldId: 'custrecord_cwgp_fia_itemreceipt',
                value: idIR
            });
            recIA.setValue({
                fieldId: 'custrecord_cwgp_fia_subtype',
                value: 'standard'
            });
            recIA.setValue({
                fieldId: 'custrecord_cwgp_fia_customer',
                value: objPOBodyFields.custrecord_cwgp_fr_customer
            });
            recIA.setValue({
                fieldId: 'custrecord_cwgp_fia_date',
                value: objPOBodyFields.custrecord_cwgp_fr_date
            });
            
            recIA.setValue({
                fieldId: 'custrecord_cwgp_fia_operator',
                value: objPOBodyFields.custrecord_cwgp_fr_operator
            });
            recIA.setValue({
                fieldId: 'custrecord_cwgp_fia_subtype',
                value: 'damagetestertheft'
            });
            
            recIA.setValue({
                fieldId: 'custrecord_cwgp_fia_adjustmenttype',
                value: 3
            });
            
            

            const objIABodyFields = mapFranchiseIRBodyFields(request,idIR);
            util.each(objIABodyFields, (value, fieldId) => {
                recIR.setValue({
                    fieldId: fieldId,
                    value: value
                });
            });
            const idIA = recIA.save();
            log.debug('idIA', idIA);
            record.submitFields({
                type: 'customrecord_cwgp_franchisereciept',
                id: idIR,
                values: {
                    'custrecord_cwgp_fr_ia': idIA
                }
            });


            let itemSummary = [];
            log.debug('arrPOSblFields[1]', arrPOSblFields[1]);
            arrPOSblFields[1].forEach((objPOBodyFields) => {
                log.debug('objPOBodyFields Damaged', objPOBodyFields);

                itemSummary.push({
                    stItem: objPOBodyFields.custrecord_cwgp_ftl_item,
                    intQty: objPOBodyFields.custrecord_cwgp_ftl_damagedqty,
                    stAdjustType: 'Damage'
                });

                const recIRLineDamaged = record.create({
                    type: 'customrecord_cwgp_franchise_tranline'
                });
                recIRLineDamaged.setValue({
                    fieldId: 'custrecord_cwgp_ftl_parentia',
                    value: idIA
                });

                recIRLineDamaged.setValue({
                    fieldId: 'custrecord_cwgp_ftl_adjustmentreason',
                    value: 'Item Receipt #'+idIR
                });
                recIRLineDamaged.setValue({
                    fieldId: 'custrecord_cwgp_ftl_adjustmenttype',
                    value: 3
                });

                util.each(objPOBodyFields, (value,fieldId) => {
                    recIRLineDamaged.setValue({
                        fieldId: fieldId,
                        value: value
                    });
                });
                let recDamaged = recIRLineDamaged.save();
                log.debug('recDamaged', recDamaged);
            });
            let result = []
            /*if(itemSummary){
                itemSummary.reduce(function(res, value) {
                if (!res[value.stAdjustType]) {
                    res[value.stAdjustType] = { Id: value.stAdjustType, intQty: 0 };
                    result.push(res[value.stAdjustType])
                }
                res[value.stAdjustType].intQty += value.intQty;
                    return res;
                }, {});
            }*/
            log.debug('itemSummary', itemSummary);
            record.submitFields({
                type: 'customrecord_cwgp_franchiseinvadjustment',
                id: idIA,
                values: {
                    'custrecord_cwgp_fia_itemsummary': JSON.stringify(arrPOSblFields[3])
                }
            });

        }

        //const arrPOSblFieldsVariance = mapFranchiseIRVarianceSublistFields(idIR,objPOBodyFields.custrecord_cwgp_fr_customer,request);
        //log.debug('arrPOSblFieldsVariance', arrPOSblFieldsVariance);
        if(arrPOSblFields[2].length >0){
            
            arrPOSblFields[2].forEach((objPOBodyFields) => {
                log.debug('objPOBodyFields2', objPOBodyFields);
                const recIRLineVariance= record.create({
                    type: 'customrecord_cwgp_ext_irvar'
                });

                recIRLineVariance.setValue({
                    fieldId: 'custrecord_cwgp_ext_irvar_operator',
                    value: objPOBodyFields.custrecord_cwgp_fr_operator
                });
                
                util.each(objPOBodyFields, (value,fieldId) => {
                    recIRLineVariance.setValue({
                        fieldId: fieldId,
                        value: value
                    });
                });
                let idVariance = recIRLineVariance.save({
                    ignoreMandatoryFields: false
                });
                log.debug('idVariance', idVariance);
            });
            

        }
        
        log.debug('lineList', lineList);
        log.debug('qtyList', qtyList);
        
        const recPO = record.load({
            type: record.Type.SALES_ORDER,
            id: objPOBodyFields.custrecord_cwgp_fr_so
        });
        
        const numLines = recPO.getLineCount({
            sublistId: 'item'
        });

        recPO.setValue({
            fieldId: 'custbody_cwgp_franchiseitemreceipt',
            value: idIR
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

    const createFranchiseIA = (request,) => {
        const recIA = record.create({
            type: 'customrecord_cwgp_franchiseinvadjustment'
        });

        const objIABodyFields = mapFranchiseIABodyFields(request);
        util.each(objIABodyFields, (value, fieldId) => {
            recIA.setValue({
                fieldId: fieldId,
                value: value
            });
        });
        log.debug('objIABodyFields', objIABodyFields);
        const idIA = recIA.save();
        //const idIA = 123;
        
        const arrPOSblFields = mapFranchiseIASublistFields(idIA,objIABodyFields.custrecord_cwgp_fia_customer,objIABodyFields.custrecord_cwgp_fia_date,request);
        log.debug('mapFranchiseIASublistFields', mapFranchiseIASublistFields);
        arrPOSblFields.forEach((objPOBodyFields) => {
            log.debug('objPOBodyFields', objPOBodyFields);
            const recIALine = record.create({
                type: 'customrecord_cwgp_franchise_tranline'
            });
            recIALine.setValue({
                fieldId: 'custrecord_cwgp_ftl_parentia',
                value: idIA
            });
            
            util.each(objPOBodyFields, (value,fieldId) => {
                recIALine.setValue({
                    fieldId: fieldId,
                    value: value
                });
            });
            let recIALineID = recIALine.save();
            //log.debug('recIALineID', recIALineID);
        });
        return idIA;
    }

    const createFranchiseIC = (request,) => {
        log.debug('createFranchiseIC', 'createFranchiseIC');
        const recIC = record.create({
            type: 'customrecord_cwgp_franchiseinvadjustment'
        });

        const objIABodyFields = mapFranchiseICBodyFields(request);
        util.each(objIABodyFields, (value, fieldId) => {
            recIC.setValue({
                fieldId: fieldId,
                value: value
            });
        });
        log.debug('objIABodyFields', objIABodyFields);
        const idIC = recIC.save();
        //const idIA = 123;
        utilLib.createICLineBackupFile(objIABodyFields.custrecord_cwgp_fia_operator, 3, request);
        const arrPOSblFields = mapFranchiseICSublistFields(idIC,objIABodyFields.custrecord_cwgp_fia_customer,objIABodyFields.custrecord_cwgp_fia_date,request);
        log.debug('arrPOSblFields', arrPOSblFields.length);
        var mrTask = task.create({taskType: task.TaskType.SCHEDULED_SCRIPT});
        mrTask.scriptId = 'customscript_cwgp_sc_createiclines';
        mrTask.params = {custscript_cwgp_iclines: JSON.stringify(arrPOSblFields)};
        //mrTask.deploymentId = custdeploy1;
        var mrTaskId = mrTask.submit();
        
		//Clear Draft
        if(objIABodyFields.custrecord_cwgp_fia_subtype == 'Retail'){
            record.submitFields({
                type: 'customrecord_cwgp_externalsl_creds',
                id: objIABodyFields.custrecord_cwgp_fia_operatorid,
                values: {
                    custrecord_cwgp_ricdraftstep: '',
                    custrecord_cwgp_ricdraft: ''
                     },
            });
        }
        else if(objIABodyFields.custrecord_cwgp_fia_subtype == 'Backbar'){
            record.submitFields({
                type: 'customrecord_cwgp_externalsl_creds',
                id: objIABodyFields.custrecord_cwgp_fia_operatorid,
                values: {
                    custrecord_cwgp_bbicdraftstep: '',
                    custrecord_cwgp_bbicdraft: ''
                     },
            });
        }
		
        return idIC;
    }
    

    
    const mapFranchisePOBodyFields = (request) => {
        const stCustomer = request.parameters.custpage_cwgp_customer;
        const stLocation = request.parameters.custpage_cwgp_location;
        const stMemoMain = request.parameters.custpage_cwgp_memomain;
        const stDate = request.parameters.custpage_cwgp_date;
        const stDeliveryDate = request.parameters.custpage_cwgp_deliverbydate;
        const stOperator = request.parameters.custpage_cwgp_operator;
        const stOperatorId = request.parameters.custpage_cwgp_userid;
        
        const objMapBodyFields = {
            entity: stCustomer,
            trandate: new Date(stDate),
            memo: stMemoMain || '',
            shipdate: new Date(stDeliveryDate),
            subsidiary: 15,
            class: 6,
            location: 230,
            'custbody_cwgp_externalportaloperator':stOperator,
            'custbody_cwgp_externalportaloperatorid': stOperatorId
        };
        log.debug('objMapBodyFields', objMapBodyFields);

        return objMapBodyFields;
    };
    
    const mapFranchiseIRBodyFields = (request) => {
    	const recid		 = request.parameters.custpage_cwgp_itemreceiptid;
    	const poId		 = request.parameters.custpage_cwgp_poid;
        const stCustomer = request.parameters.custpage_cwgp_customer;
        const stLocation = request.parameters.custpage_cwgp_location;
        const stMemoMain = request.parameters.custpage_cwgp_memomain;
        const stDate = request.parameters.custpage_cwgp_date;
        const stOperator = request.parameters.custpage_cwgp_operator;
        const stOperatorId = request.parameters.custpage_cwgp_userid;
        log.debug(' mapFranchiseIRBodyFields', request.parameters);
        const objMapBodyFields = {
        	'recid': recid,
        	'custrecord_cwgp_fr_so': poId,
        	'custrecord_cwgp_fr_customer': stCustomer,
        	'custrecord_cwgp_fr_location': stLocation,
        	'custrecord_cwgp_fr_date': new Date(stDate),
            'custrecord_cwgp_fr_memo': stMemoMain,
            'custrecord_cwgp_fr_operator':stOperator,
            'custrecord_cwgp_fr_operatorid':stOperatorId
        };
        log.debug('objMapBodyFields', objMapBodyFields);

        return objMapBodyFields;
    };

    const mapFranchiseIABodyFields = (request) => {
        const stCustomer = request.parameters.custpage_cwgp_customer;
        const stMemoMain = request.parameters.custpage_cwgp_memomain;
        const stDate = request.parameters.custpage_cwgp_date;
        const stAdjustmentSubType = request.parameters.custpage_cwgp_adjustmentsubtype;
        const stOperator = request.parameters.custpage_cwgp_operator;
        const stTotalAdjustment = request.parameters.custpage_cwgp_totaladjustmenthidden;
        const stOperatorId = request.parameters.custpage_cwgp_userid;
        log.debug(' mapFranchiseIABodyFields', request.parameters);
        const objMapBodyFields = {
        	'custrecord_cwgp_fia_customer': stCustomer,
        	'custrecord_cwgp_fia_date': new Date(stDate),
            'custrecord_cwgp_fia_memo': stMemoMain,
            'custrecord_cwgp_fia_operator': stMemoMain,
            'custrecord_cwgp_fia_subtype': stAdjustmentSubType,
            'custrecord_cwgp_fia_operator': stOperator,
            'custrecord_cwgp_fia_operatorid': stOperatorId,
            'custrecord_cwgp_fia_itemsummary': stTotalAdjustment
        };
        log.debug('objMapBodyFields', objMapBodyFields);

        return objMapBodyFields;
    };

    const mapFranchiseICBodyFields = (request) => {
        const stCustomer = request.parameters.custpage_cwgp_customer;
        const stMemoMain = request.parameters.custpage_cwgp_memomain;
        const stDate = request.parameters.custpage_cwgp_date;
        const stOperator = request.parameters.custpage_cwgp_operator;
        const stSubsidiary = request.parameters.custpage_cwgp_subsidiary;
        const stTotalDiscrepancy = request.parameters.custpage_cwgp_totaldiscrepancy;
        const stLocation = request.parameters.custpage_cwgp_location;
        const stOperatorId = request.parameters.custpage_cwgp_userid;
        const stAdjustmentSubType = request.parameters.custpage_cwgp_adjustmentsubtype;

        log.debug(' mapFranchiseIABodyFields', request.parameters);
        const objMapBodyFields = {
        	'custrecord_cwgp_fia_customer': stCustomer,
        	'custrecord_cwgp_fia_date': new Date(stDate),
            'custrecord_cwgp_fia_memo': stMemoMain,
            'custrecord_cwgp_fia_operator': stMemoMain,
            'custrecord_cwgp_fia_operator': stOperator,
            'custrecord_cwgp_fia_subsidiary': stSubsidiary,
        	'custrecord_cwgp_fia_location': stLocation,
            'custrecord_cwgp_fia_totaldiscrepancy': stTotalDiscrepancy,
            'custrecord_cwgp_fia_adjustmenttype' : 1,
            'custrecord_cwgp_fia_operatorid': stOperatorId,
            'custrecord_cwgp_fia_subtype': stAdjustmentSubType,
        };
        log.debug('objMapBodyFields', objMapBodyFields);

        return objMapBodyFields;
    };

    const mapFranchiseIRDamagedBodyFields = (request,IRId) => {
        log.debug(' mapFranchiseIRBodyFields', request.parameters);
        const objMapBodyFields = {
        	'custrecord_cwgp_fia_itemreceipt': IRId
        };
        log.debug('objMapBodyFields', objMapBodyFields);

        return objMapBodyFields;
    };

    /*const mapFranchiseIRVarianceBodyFields = (request,IRId) => {
        log.debug(' mapFranchiseIRBodyFields', request.parameters);
        const objMapBodyFields = {
        	'custrecord_cwgp_fia_itemreceipt': IRId
        };
        log.debug('objMapBodyFields', objMapBodyFields);

        return objMapBodyFields;
    };*/

    const mapFranchisePOSublistFields = (request) => {
        let arrMapSblFields = [];

        const intLineCount = request.getLineCount({ group: 'custpage_franchisepo_items' });
        log.debug('intLineCount', intLineCount);

        for (let i = 0; i < intLineCount; i++) {
            arrMapSblFields.push({
                item: request.getSublistValue({
                    group: 'custpage_franchisepo_items',
                    name: 'custpage_cwgp_item',
                    line: i
                }),
                description: request.getSublistValue({
                    group: 'custpage_franchisepo_items',
                    name: 'custpage_cwgp_description',
                    line: i
                }),
                quantity: request.getSublistValue({
                    group: 'custpage_franchisepo_items',
                    name: 'custpage_cwgp_quantity',
                    line: i
                }),
                price: 6,
                rate: request.getSublistValue({
                    group: 'custpage_franchisepo_items',
                    name: 'custpage_cwgp_rate',
                    line: i
                })
            })
        }

        log.debug('arrMapSblFields', arrMapSblFields)
        return arrMapSblFields;
    };
    
    const mapFranchiseIRSublistFields = (id,stCustomer,stDate,request) => {
        let arrMapSblFields = [];
        let arrMapDamagedItems = [];
        let arrMapVariance = [];
        let arrMapDamagedSummary = [];
        let inDamagedQty = 0;
        let flTotal = 0;
        log.debug('mapFranchiseIRSublistFields', '');
        log.debug('request', request);
        const intLineCount = request.getLineCount({ group: 'custpage_itemreceipt_items' });

        for (let i = 0; i < intLineCount; i++) {
        	let recieve = request.getSublistValue({
                group: 'custpage_itemreceipt_items',
                name: 'custpage_cwgp_receive',
                line: i
            });
            let qtyReceived = request.getSublistValue({
                group: 'custpage_itemreceipt_items',
                name: 'custpage_cwgp_quantity',
                line: i
            });
            let qtyDamaged = request.getSublistValue({
                group: 'custpage_itemreceipt_items',
                name: 'custpage_cwgp_damagedquantity',
                line: i
            });
            let qtyVariance = request.getSublistValue({
                group: 'custpage_itemreceipt_items',
                name: 'custpage_cwgp_variance',
                line: i
            });
            let qtyShipped = request.getSublistValue({
                group: 'custpage_itemreceipt_items',
                name: 'custpage_cwgp_shippedquantityhidden',
                line: i
            });
            let qtyVarianceNew = qtyShipped-qtyReceived;
        	log.debug('qtyReceived', qtyReceived);
            log.debug('qtyVariance', qtyVariance);
            log.debug('qtyShipped', qtyShipped);
            log.debug('qtyVarianceNew', qtyVarianceNew);
        	if(recieve =='T'){
                let qtyActual = qtyReceived - qtyDamaged;
                
        		arrMapSblFields.push({
                    'custrecord_cwgp_ftl_parentir': id,
                    'custrecord_cwgp_ftl_customer': stCustomer,
                    'custrecord_cwgp_ftl_date': stDate,
                    'custrecord_cwgp_ftl_item': request.getSublistValue({
                        group: 'custpage_itemreceipt_items',
                        name: 'custpage_cwgp_item',
                        line: i
                    }),
                    'custrecord_cwgp_ftl_description': request.getSublistValue({
                        group: 'custpage_itemreceipt_items',
                        name: 'custpage_cwgp_description',
                        line: i
                    }),
                    'custrecord_cwgp_ftl_receivedqty': qtyReceived,
                    'custrecord_cwgp_ftl_displayqty': qtyReceived,
                    'custrecord_cwgp_ftl_damagedqty': qtyDamaged,
                    'custrecord_cwgp_ftl_actualqty': qtyActual,
                    'custrecord_cwgp_ftl_variance': qtyVarianceNew,
                    'custrecord_cwgp_ftl_poline': request.getSublistValue({
                        group: 'custpage_itemreceipt_items',
                        name: 'custpage_cwgp_line',
                        line: i
                    }),
                    'custrecord_cwgp_ftl_type' : 1
                })
        	}
            if(recieve =='T' && qtyDamaged > 0){
                let qtyActual = -1 * qtyDamaged;
                inDamagedQty += parseInt(qtyDamaged);
                let stItem = request.getSublistValue({
                    group: 'custpage_itemreceipt_items',
                    name: 'custpage_cwgp_item',
                    line: i
                });
                
                let flRate = request.getSublistValue({
                    group: 'custpage_itemreceipt_items',
                    name: 'custpage_cwgp_rate',
                    line: i
                });
                log.debug('flRate', flRate);
                log.debug('qtyDamaged', qtyDamaged);
                log.debug('flTotal', flTotal);
                flTotal += parseFloat(flRate * qtyDamaged);
                log.debug('flTotal', flTotal);
                log.debug('qtyActual', qtyActual);
        		arrMapDamagedItems.push({
                    'custrecord_cwgp_ftl_parentir': id,
                    'custrecord_cwgp_ftl_customer': stCustomer,
                    'custrecord_cwgp_ftl_date': stDate,
                    'custrecord_cwgp_ftl_item': stItem,
                    'custrecord_cwgp_ftl_description': request.getSublistValue({
                        group: 'custpage_itemreceipt_items',
                        name: 'custpage_cwgp_description',
                        line: i
                    }),
                    'custrecord_cwgp_ftl_displayqty': qtyDamaged,
                    'custrecord_cwgp_ftl_damagedqty': qtyDamaged,
                    'custrecord_cwgp_ftl_actualqty': qtyActual,
                    'custrecord_cwgp_ftl_poline': request.getSublistValue({
                        group: 'custpage_itemreceipt_items',
                        name: 'custpage_cwgp_line',
                        line: i
                    }),
                    'custrecord_cwgp_ftl_type' : 2
                })
        	}
            if(recieve =='T' && qtyVarianceNew > 0){
        		arrMapVariance.push({
                    'custrecord_cwgp_ext_irvar_franchisetxn': id,
                    'custrecord_cwgp_ext_irvar_type': 2,
                    'custrecord_cwgp_ftl_customer': stCustomer,
                    'custrecord_cwgp_ftl_date': stDate,
                    'custrecord_cwgp_ext_irvar_item': request.getSublistValue({
                        group: 'custpage_itemreceipt_items',
                        name: 'custpage_cwgp_item',
                        line: i
                    }),
                    'custrecord_cwgp_ext_irvar_qty': qtyVarianceNew,
                    //'custrecord_cwgp_ext_irvar_operator': stUser
                })
        	}
            
        }

        arrMapDamagedSummary.push({
            'Id': 'Damage',
            'intQty': inDamagedQty,
            'totalEstRepVal': flTotal
        });

        log.debug('arrMapSblFields', arrMapSblFields);
        log.debug('arrMapDamagedItems', arrMapDamagedItems);
        log.debug('arrMapDamagedItems', arrMapDamagedItems);
        log.debug('arrMapDamagedSummary', arrMapDamagedSummary);
        return [arrMapSblFields,arrMapDamagedItems,arrMapVariance,arrMapDamagedSummary];
    };

    const mapFranchiseIASublistFields = (id,stCustomer,stDate,request) => {
        const stSubType = request.parameters.custpage_cwgp_adjustmentsubtype;
        let arrMapSblFields = [];
        const intLineCountStandard = request.getLineCount({ group: 'custpage_inventorayadjustment_items' });

        let subTypeSublist = stSubType == 'standard' ? 'custpage_inventorayadjustment_items' : stSubType == 'backbar' ? 'custpage_inventorayadjustmentbackbar_items' : 'custpage_inventoryadjustmentdamagetestertheft_items';
        log.debug('stSubType', stSubType);
        log.debug('subTypeSublist', subTypeSublist);

        if(stSubType == 'standard'){
            for (let i = 0; i < intLineCountStandard; i++) {
                let inStartingQty = request.getSublistValue({
                    group: 'custpage_inventorayadjustment_items',
                    name: 'custpage_cwgp_qtyonhand',
                    line: i
                });
                let inAdjustQty = request.getSublistValue({
                    group: 'custpage_inventorayadjustment_items',
                    name: 'custpage_cwgp_adjustqtyby',
                    line: i
                });
                let inEndingQty = request.getSublistValue({
                    group: 'custpage_inventorayadjustment_items',
                    name: 'custpage_cwgp_endinginventoryqty',
                    line: i
                });
                let inActualQty = 0;
                if(inAdjustQty){
                    inActualQty = inAdjustQty;
                    log.debug('inAdjustQty', inAdjustQty);
                }
                if(inEndingQty){
                    inActualQty = inEndingQty - inStartingQty;
                    log.debug('inEndingQty', inEndingQty);
                }
                log.debug('inActualQty', inActualQty);
                arrMapSblFields.push({
                    'custrecord_cwgp_ftl_parentia': id,
                    'custrecord_cwgp_ftl_customer': stCustomer,
                    'custrecord_cwgp_ftl_date': stDate,
                    'custrecord_cwgp_ftl_item': request.getSublistValue({
                        group: 'custpage_inventorayadjustment_items',
                        name: 'custpage_cwgp_item',
                        line: i
                    }),
                    'custrecord_cwgp_ftl_description': request.getSublistValue({
                        group: 'custpage_inventorayadjustment_items',
                        name: 'custpage_cwgp_description',
                        line: i
                    }),
                    'custrecord_cwgp_ftl_actualqty': inActualQty,
                    'custrecord_cwgp_ftl_displayqty': inAdjustQty,
                    'custrecord_cwgp_ftl_endingqty': inEndingQty,
                    'custrecord_cwgp_ftl_type' : 2,
                    'custrecord_cwgp_ftl_adjustmenttype':request.getSublistValue({
                        group: 'custpage_inventorayadjustment_items',
                        name: 'custpage_cwgp_adjustmenttype',
                        line: i
                    }),
                    'custrecord_cwgp_ftl_adjustmentreason':request.getSublistValue({
                        group: 'custpage_inventorayadjustment_items',
                        name: 'custpage_cwgp_adjustmentreason',
                        line: i
                    }),
                })
            }
        }

        if(stSubType == 'backbar'){
            const intLineCountBackbar = request.getLineCount({ group: subTypeSublist });
            for (let i = 0; i < intLineCountBackbar; i++) {
                let inAdjustQty = request.getSublistValue({
                    group: subTypeSublist,
                    name: 'custpage_cwgp_adjustqtyby',
                    line: i
                });
                arrMapSblFields.push({
                    'custrecord_cwgp_ftl_parentia': id,
                    'custrecord_cwgp_ftl_customer': stCustomer,
                    'custrecord_cwgp_ftl_date': stDate,
                    'custrecord_cwgp_ftl_item': request.getSublistValue({
                        group: subTypeSublist,
                        name: 'custpage_cwgp_item',
                        line: i
                    }),
                    'custrecord_cwgp_ftl_description': request.getSublistValue({
                        group: subTypeSublist,
                        name: 'custpage_cwgp_description',
                        line: i
                    }),
                    'custrecord_cwgp_ftl_actualqty': inAdjustQty * -1,
                    'custrecord_cwgp_ftl_displayqty': inAdjustQty,
                    'custrecord_cwgp_ftl_type' : 2,
                    'custrecord_cwgp_ftl_adjustmenttype':request.getSublistValue({
                        group: subTypeSublist,
                        name: 'custpage_cwgp_adjustmenttype',
                        line: i
                    }),
                    'custrecord_cwgp_ftl_adjustmentreason':request.getSublistValue({
                        group: subTypeSublist,
                        name: 'custpage_cwgp_adjustmentreason',
                        line: i
                    }),
                    'custrecord_cwgp_ftl_roomno': request.getSublistValue({
                        group: subTypeSublist,
                        name: 'custpage_cwgp_roomnumber',
                        line: i
                    }),
                    'custrecord_cwgp_ftl_st': request.getSublistValue({
                        group: subTypeSublist,
                        name: 'custpage_cwgp_stassignment',
                        line: i
                    })
                })
    
            }
        }

        if(stSubType == 'damagetestertheft'){
            const intLineCountBackbar = request.getLineCount({ group: subTypeSublist });
            for (let i = 0; i < intLineCountBackbar; i++) {
                let inAdjustQty = request.getSublistValue({
                    group: subTypeSublist,
                    name: 'custpage_cwgp_adjustqtyby',
                    line: i
                });
                arrMapSblFields.push({
                    'custrecord_cwgp_ftl_parentia': id,
                    'custrecord_cwgp_ftl_customer': stCustomer,
                    'custrecord_cwgp_ftl_date': stDate,
                    'custrecord_cwgp_ftl_item': request.getSublistValue({
                        group: subTypeSublist,
                        name: 'custpage_cwgp_item',
                        line: i
                    }),
                    'custrecord_cwgp_ftl_description': request.getSublistValue({
                        group: subTypeSublist,
                        name: 'custpage_cwgp_description',
                        line: i
                    }),
                    'custrecord_cwgp_ftl_actualqty': inAdjustQty * -1,
                    'custrecord_cwgp_ftl_displayqty': inAdjustQty,
                    'custrecord_cwgp_ftl_type' : 2,
                    'custrecord_cwgp_ftl_adjustmenttype':request.getSublistValue({
                        group: subTypeSublist,
                        name: 'custpage_cwgp_adjustmenttype',
                        line: i
                    }),
                    'custrecord_cwgp_ftl_adjustmentreason':request.getSublistValue({
                        group: subTypeSublist,
                        name: 'custpage_cwgp_adjustmentreason',
                        line: i
                    })
                })
    
            }
        }
        log.debug('arrMapSblFields', arrMapSblFields)
        return arrMapSblFields;
    };

    const mapFranchiseICSublistFields = (id,stCustomer,stDate,request) => {
        const stSubType = request.parameters.custpage_cwgp_adjustmentsubtype;
        let arrMapSblFields = [];
        let stSublistName = 'custpage_inventoryadjustmentinventorycount_items';
        const intLineCountStandard = request.getLineCount({ group: stSublistName });

        log.debug('intLineCountStandard', intLineCountStandard);
        for (let i = 0; i < intLineCountStandard; i++) {
            let inStartingQty = request.getSublistValue({
                group: stSublistName,
                name: 'custpage_cwgp_qtyonhand',
                line: i
            });
            let inEndingQty = request.getSublistValue({
                group: stSublistName,
                name: 'custpage_cwgp_enteredquantity',
                line: i
            }) || 0;

            if(!inEndingQty){
                inEndingQty = 0;
            }
            log.debug('i', i);
            log.debug('inEndingQty', inEndingQty);
            log.debug('inStartingQty', inStartingQty);
            let inActualQty = 0;
            inActualQty = inEndingQty - inStartingQty;
            log.debug('inActualQty', inActualQty);
            arrMapSblFields.push({
                'custrecord_cwgp_ftl_parentia': id,
                'custrecord_cwgp_ftl_customer': stCustomer,
                'custrecord_cwgp_ftl_date': stDate,
                'custrecord_cwgp_ftl_item': request.getSublistValue({
                    group: stSublistName,
                    name: 'custpage_cwgp_item',
                    line: i
                }),
                'custrecord_cwgp_ftl_description': request.getSublistValue({
                    group: stSublistName,
                    name: 'custpage_cwgp_description',
                    line: i
                }),
                'custrecord_cwgp_ftl_actualqty': inActualQty,
                'custrecord_cwgp_ftl_displayqty': inActualQty,
                'custrecord_cwgp_ftl_endingqty': inEndingQty,
                'custrecord_cwgp_ftl_type' : 4,
                'custrecord_cwgp_ftl_discrepancy': request.getSublistValue({
                    group: stSublistName,
                    name: 'custpage_cwgp_discrepancy',
                    line: i
                }),
                'custrecord_cwgp_ftl_adjustmentreason': request.getSublistValue({
                    group: stSublistName,
                    name: 'custpage_cwgp_adjustmentreason',
                    line: i
                }),
                'custrecord_cwgp_ftl_adjustmenttype': request.getSublistValue({
                    group: stSublistName,
                    name: 'custpage_cwgp_adjustmenttype',
                    line: i
                }),
                'custrecord_cwgp_ftl_enteredqty': request.getSublistValue({
                    group: stSublistName,
                    name: 'custpage_cwgp_enteredquantity',
                    line: i
                }),
                'custrecord_cwgp_ftl_finalqty': request.getSublistValue({
                    group: stSublistName,
                    name: 'custpage_cwgp_finalquantity',
                    line: i
                }),
                'custrecord_cwgp_ftl_startingqty': request.getSublistValue({
                    group: stSublistName,
                    name: 'custpage_cwgp_qtyonhand',
                    line: i
                }),
            });
            
            
        }
        log.debug('arrMapSblFields', arrMapSblFields)
        return arrMapSblFields;
    };


    const mapFranchiseIRDamagedSublistFields = (idIR,stCustomer,request) => {
        let arrMapSblFields = [];
        log.debug('mapFranchiseIRDamagedSublistFields', '');
        log.debug('request', request);
        const intLineCount = request.getLineCount({ group: 'custpage_itemreceipt_items' });

        for (let i = 0; i < intLineCount; i++) {
        	let recieve = request.getSublistValue({
                group: 'custpage_itemreceipt_items',
                name: 'custpage_cwgp_receive',
                line: i
            });
            let qtyDamaged = request.getSublistValue({
                group: 'custpage_itemreceipt_items',
                name: 'custpage_cwgp_damagedquantity',
                line: i
            });
        	log.debug('recieve', recieve);
        	if(recieve =='T' && qtyDamaged > 0){
                let qtyActual = -1 * qtyDamaged;
                log.debug('qtyActual', qtyActual);
        		arrMapSblFields.push({
                    'custrecord_cwgp_ftl_parentir': idIR,
                    'custrecord_cwgp_ftl_customer': stCustomer,
                    'custrecord_cwgp_ftl_item': request.getSublistValue({
                        group: 'custpage_itemreceipt_items',
                        name: 'custpage_cwgp_item',
                        line: i
                    }),
                    'custrecord_cwgp_ftl_displayqty': qtyDamaged,
                    'custrecord_cwgp_ftl_damagedqty': qtyDamaged,
                    'custrecord_cwgp_ftl_actualqty': qtyActual,
                    'custrecord_cwgp_ftl_poline': request.getSublistValue({
                        group: 'custpage_itemreceipt_items',
                        name: 'custpage_cwgp_line',
                        line: i
                    }),
                    'custrecord_cwgp_ftl_type' : 2
                })
        	}
            
        }

        log.debug('arrMapSblFields', arrMapSblFields)
        return arrMapSblFields;
    };

    /*const mapFranchiseIRVarianceSublistFields = (idIR,stUser,request) => {
        let arrMapSblFields = [];
        log.debug('mapFranchiseIRVarianceSublistFields', '');
        log.debug('request', request);
        const intLineCount = request.getLineCount({ group: 'custpage_itemreceipt_items' });

        for (let i = 0; i < intLineCount; i++) {
        	let recieve = request.getSublistValue({
                group: 'custpage_itemreceipt_items',
                name: 'custpage_cwgp_receive',
                line: i
            });
            let qtyVariance = request.getSublistValue({
                group: 'custpage_itemreceipt_items',
                name: 'custpage_cwgp_variance',
                line: i
            });
        	log.debug('qtyVariance', qtyVariance);
        	if(recieve =='T' && qtyVariance > 0){
        		arrMapSblFields.push({
                    'custrecord_cwgp_ext_irvar_franchisetxn': idIR,
                    'custrecord_cwgp_ext_irvar_type': 2,
                    'custrecord_cwgp_ext_irvar_item': request.getSublistValue({
                        group: 'custpage_itemreceipt_items',
                        name: 'custpage_cwgp_item',
                        line: i
                    }),
                    'custrecord_cwgp_ext_irvar_qty': qtyVariance,
                    'custrecord_cwgp_ext_irvar_operator': stUser
                })
        	}
            
        }

        log.debug('arrMapSblFields', arrMapSblFields)
        return arrMapSblFields;
    };*/
    
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
        recPO.setValue({
            fieldId: 'custbody_cwgp_franchiseapprovalstatus',
            value: 1
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
                if(fieldId != 'price'){
                    recPO.setCurrentSublistValue({
                        sublistId: 'item',
                        fieldId: fieldId,
                        value: value
                    });
                }
                
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
            id: stPoId,
            values: {
                'custrecord_cwgp_fr_date': objPOEditBodyFields.custrecord_cwgp_fr_date,
                'custrecord_cwgp_fr_memo': objPOEditBodyFields.custrecord_cwgp_fr_memo,
            }
        });
        
        /*util.each(objBodyFields, (value, fieldId) => {
        	recIR.setValue({
                fieldId: fieldId,
                value: value
            });
        });*/

        /*
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
        });*/

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
            //location: ${stLocation}
        }`);

        //const { entity, memo, location } = objPOBodyFields;
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

        /*if (stLocation != location) {
            objBodyFldsToUpdate.location = location;
        }*/

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
        createFranchisePO,
        mapFranchisePOBodyFields,
        mapFranchisePOSublistFields,
        editFranchisePurchaseOrder,
        editFranchiseIR,
        getPOValues,
        createFranchiseIR,
        createFranchiseIA,
        createFranchiseIC,
        mapFranchiseIRBodyFields,
        mapFranchiseIRSublistFields,
        mapFranchiseIRDamagedSublistFields,
        mapFranchiseIRSublistFieldsEdit,
    }
});
