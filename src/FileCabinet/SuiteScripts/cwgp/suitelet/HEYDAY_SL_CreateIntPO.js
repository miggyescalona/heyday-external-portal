/**
 * Author: Patricia Naguit
 * Date: 2022-12-10
 *
 * Date         Modified By            Notes
 * 2022-12-10   Patricia Naguit        Initial File Creation
 */

/**
 * @NApiVersion 2.1
 * @NScriptType Suitelet
 */

define(['N/search'], (search) => {

    /**
     * Definition of the Suitelet script trigger point.
     *
     * @param {Object} context
     */
    const onRequest = (context) => {
        const { request, response } = context;

        if (context.request.method === 'GET') {
            const stItem = request.parameters['item'];

            if(stItem){
                const objItem = getItemDetail(stItem);

                response.write(JSON.stringify({ item: objItem }))
            }
        }
    };

    const getItemDetail = (stItem) => {
        const objLookup = search.lookupFields({
            type: search.Type.ITEM,
            id: stItem,
            columns: ['itemid', 'cost']
        });

        log.debug('objLookup', objLookup);

        return objLookup
    };

    return { onRequest };
});
