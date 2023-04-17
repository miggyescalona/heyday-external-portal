/**
 * @NApiVersion 2.1
 * @NScriptType ScheduledScript
 */
define(['N/record','N/runtime', 'N/format'],
    /**
 * @param{record} record
 */
    (record,runtime, format) => {

        /**
         * Defines the Scheduled script trigger point.
         * @param {Object} scriptContext
         * @param {string} scriptContext.type - Script execution context. Use values from the scriptContext.InvocationType enum.
         * @since 2015.2
         */
        const execute = (scriptContext) => {
            const scriptObj = runtime.getCurrentScript();
	    	const arrLines = JSON.parse(scriptObj.getParameter({name: 'custscript_cwgp_iclines'}));
            log.debug('arrLines', arrLines.length);
            arrLines.forEach((objPOBodyFields) => {
                log.debug('objPOBodyFields', objPOBodyFields);
                const recICLine = record.create({
                    type: 'customrecord_cwgp_franchise_tranline'
                });
                
                util.each(objPOBodyFields, (value,fieldId) => {
                    
                    if(fieldId == 'custrecord_cwgp_ftl_date'){
                        recICLine.setValue({
                            fieldId: fieldId,
                            //value: format.format({value: value, type: format.Type.DATE})
                            value: new Date(value)
                        });
                    }
                    else{
                        recICLine.setValue({
                            fieldId: fieldId,
                            value: value
                        });
                    }
                    
                });
                let recIcLineID = recICLine.save();
                //log.debug('recIALineID', recIALineID);
            });

        }

        return {execute}

    });
