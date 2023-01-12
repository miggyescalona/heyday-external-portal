/**
 * Author: Patricia Naguit
 * Date: 2022-11-24
 *
 * Date         Modified By            Notes
 * 2022-11-24   Patricia Naguit        Initial File Creation
 */

/**
 * @NApiVersion 2.1
 * @NScriptType Suitelet
 */

define(['N/search', 'N/crypto', 'N/encode'], (search, crypto, encode) => {
    const _CONFIG = {
        RECORD: {
            CREDENTIALS: 'customrecord_cwgp_externalsl_creds'
        }
    };
    /**
     * Definition of the Suitelet script trigger point.
     *
     * @param {Object} context
     */
    const onRequest = (context) => {
        const { request, response } = context;
        if (request.method === 'POST') {
            const { requestType: stRequestType } = JSON.parse(request.body);

            executeValidation(stRequestType, request, response);
        }
    };

    const executeValidation = (stRequestType, request, response) => {
        const REQUEST_TYPE = {
            'login': validateLogin,
            'validateToken': validateToken
        };

        const validate = REQUEST_TYPE[stRequestType];
        validate(request, response);
    }

    const validateToken = (request, response) => {
        log.debug('Validating token...', 'Validating token...');

        const { token: stToken } = JSON.parse(request.body);
        log.debug('token', stToken);

        const [stHeader, stBody, stSignature] = stToken.split('.');

        const objDecodeHeader = decodeBase64(stHeader);
        log.debug('objDecodeHeader', objDecodeHeader);

        verifyJWT(response, objDecodeHeader);

        const stLogSignature = createSignature(stHeader, stBody);
        log.debug('stLogSignature', stLogSignature);

        if (stLogSignature != stSignature) {
            log.debug('Signature is not the same', 'Signature is not the same');

            response.write(JSON.stringify({ message: 'Signature is not the same' }));

            return;
        }

        log.debug('Signature is the same', 'Signature is the same');

        const objDecodeBody = decodeBase64(stBody);
        log.debug('objDecodeBody', objDecodeBody);

        const {
            exp: intExp,
            accessType: stAccessType,
            id: stInternalid
        } = JSON.parse(objDecodeBody);

        //check if token is expired.
        const stCurrentTime = Math.round(Date.now() / 1000);
        log.debug('stCurrentTime', stCurrentTime);

        if (stCurrentTime >= intExp) {
            log.debug('Token is expired', 'Token is expired');

            response.write(JSON.stringify({ message: 'Token is expired' }));

            return;
        }

        //validate user access type
        const bIsValidatedAccess = validateUserAccessType(stAccessType, stInternalid);
        log.debug('bIsValidatedAccess', bIsValidatedAccess);

        if (!bIsValidatedAccess) {
            log.debug('Incorrect access type', 'Incorrect access type');

            response.write(JSON.stringify({ message: 'Access type is not correct for the user' }));

            return;
        }

        response.write(JSON.stringify({ message: 'success' }));

        return;
    };

    const validateLogin = (request, response) => {
        log.debug('Validating login...', 'Validating login...');

        const {
            username: stInputUsername,
            password: stInputPassword
        } = JSON.parse(request.body);
        log.debug('User input credentials', request.body);

        let objCredentials = findCredentials(stInputUsername);
        log.debug('objCredentials', objCredentials);

        if (!objCredentials) {
            log.debug('Invalid credentials', 'Invalid credentials');

            response.write(JSON.stringify({ message: 'You have entered  an invalid username or password. Please try again.' }));

            return;
        }

        //compare password
        const bDoesPasswordMatch = checkPassword(objCredentials, stInputPassword);
        log.debug('bDoesPasswordMatch', bDoesPasswordMatch);

        if (!bDoesPasswordMatch) {
            log.debug('Invalid password', 'Invalid password');

            response.write(JSON.stringify({ message: 'You have entered  an invalid username or password. Please try again.' }));

            return;
        }

        response.write(JSON.stringify({
            message: 'success',
            accessType: objCredentials.accessType,
            userId: objCredentials.id,
            token: signIt(objCredentials)
        }));
    };

    const verifyJWT = (response, objDecodeHeader) => {
        try {
            const {
                type: stType,
                alg: stAlg
            } = JSON.parse(objDecodeHeader);
            log.debug('objDecodeHeader', JSON.parse(objDecodeHeader));

            if (stType != 'JWT' && stAlg != 'HS256') {
                response.write(JSON.stringify({ message: 'JWT is rejected' }));

                return;
            }

        } catch (error) {
            response.write(JSON.stringify({ message: `verifyJWT() : ${error.message}` }));

            return;
        }
    };

    const findCredentials = (stInputUsername) => {
        const ssCredentials = search.create({
            type: _CONFIG.RECORD.CREDENTIALS,
            filters:
                [
                    search.createFilter({
                        name: 'custrecord_cwgp_username',
                        operator: search.Operator.IS,
                        values: stInputUsername
                    })
                ],
            columns:
                [
                    search.createColumn({ name: 'custrecord_cwgp_accesstype' })
                ]
        }).run().getRange({
            start: 0,
            end: 1
        });

        if (ssCredentials.length > 0) {
            return {
                id: parseInt(ssCredentials[0].id),
                accessType: ssCredentials[0].getValue({ name: 'custrecord_cwgp_accesstype' })
            }
        }

        return null;
    };

    const validateUserAccessType = (stAccessType, stInternalid) => {
        const ssUserAccessType = search.create({
            type: _CONFIG.RECORD.CREDENTIALS,
            filters:
                [
                    search.createFilter({
                        name: 'internalid',
                        operator: search.Operator.ANYOF,
                        values: stInternalid
                    }),
                    search.createFilter({
                        name: 'custrecord_cwgp_accesstype',
                        operator: search.Operator.ANYOF,
                        values: stAccessType
                    })
                ],
            columns:
                [
                    search.createColumn({ name: 'custrecord_cwgp_accesstype' })
                ]
        });

        const intCount = ssUserAccessType.runPaged().count;

        return intCount > 0;
    };

    const checkPassword = (objCredentials, stInputPassword) => {
        const objOptions = {
            recordType: _CONFIG.RECORD.CREDENTIALS,
            recordId: objCredentials.id,
            fieldId: 'custrecord_cwgp_password',
            value: stInputPassword
        };

        return crypto.checkPasswordField(objOptions);
    };

    const signIt = (objPayload, ttl) => {
        if (typeof objPayload.exp == 'undefined') {
            const intSecondsSinceEpoch = Math.round(Date.now() / 1000);
            //const intExpAt = intSecondsSinceEpoch + (ttl || 60);
          	const intExpAt = intSecondsSinceEpoch + (ttl || 43200);
            objPayload['exp'] = intExpAt;
            objPayload['iat'] = intSecondsSinceEpoch;
        }
        log.debug('payload', JSON.stringify(objPayload));

        const stHeader = toB64(JSON.stringify({
            type: 'JWT',
            alg: 'HS256'
        }));

        const stBody = toB64(JSON.stringify(objPayload));

        const stSignature = createSignature(stHeader, stBody);

        return [stHeader, stBody, stSignature].join('.');
    };

    const toB64 = (str) => {
        return encode.convert({
            string: str,
            inputEncoding: encode.Encoding.UTF_8,
            outputEncoding: encode.Encoding.BASE_64_URL_SAFE
        }).replace(/=+$/, '');
    };

    const decodeBase64 = (str) => {
        return encode.convert({
            string: str,
            inputEncoding: encode.Encoding.BASE_64_URL_SAFE,
            outputEncoding: encode.Encoding.UTF_8
        });
    };

    const createSignature = (stHeader, stBody) => {
        const mySecret = 'custsecret_cwgp_externalsl'; //secret id take from secrets management page

        const stKey = crypto.createSecretKey({
            secret: mySecret,
            encoding: encode.Encoding.UTF_8
        });

        const signer = crypto.createHmac({
            algorithm: crypto.HashAlg.SHA256,
            key: stKey
        });

        signer.update({
            input: `${stHeader}.${stBody}`,
            inputEncoding: encode.Encoding.UTF_8
        });

        const stSig = signer.digest({
            outputEncoding: encode.Encoding.BASE_64_URL_SAFE
        }).replace(/=+$/, '');

        return stSig;
    };

    return { onRequest };
});