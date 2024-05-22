import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import multiparty from 'multiparty';

export class validatorCls {
    constructor() { }

    checkForErrors = async (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            var api_var = {
                version: global.CONFIG.constants.API_VERSION,
                developer: global.CONFIG.constants.API_DEVELOPER
            }

            let response_status = {
                msg: errors.array()[0].msg,
                action_status: false
            }

            let response_data = {
                data: errors.array(),
                status: response_status,
                publish: api_var
            }

            if (errors.array()[0].msg === 'Please update your app.') {
                res.status(global.CONFIG.constants.HTTP_RESPONSE_FORBIDDEN);
            } else {
                res.status(global.CONFIG.constants.HTTP_RESPONSE_BAD_REQUEST);
            }
            res.send({ response: response_data });
        } else {
            next();
        }
    }



    validateToken = async (req: Request, res: Response, next: NextFunction) => {
        let token = req.headers['authorization'];
        if (token) {
            if (token.startsWith('Bearer ') || token.startsWith('bearer ')) {
                // Remove Bearer from string
                token = token.split(" ")[1];
            }

            // decode token
            if (token) {
                global.HELPER.verifyToken(token)
                    .then((jwtDecres: any) => {
                        req.body.loginDetails = jwtDecres;
                        next();
                    }).catch(() => {
                        global.HELPER.unauthorizedStatusBuild(res, 'Unauthorized token');
                    });
            } else {
                global.HELPER.unauthorizedStatusBuild(res, 'Token Undefined');
            }
        } else {
            global.HELPER.unauthorizedStatusBuild(res, 'Unauthorized token');
        }
    }



    validateFormData = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        if (Object.keys(req.body).length === 0) {
            const form = new multiparty.Form();

            form.parse(req, (err, fields, files) => {
                if (err) {
                    return global.HELPER.badRequestStatusBuild(res, 'Error parsing form data');
                }

                const sendData: { [key: string]: any } = {};

                if (fields) {
                    for (const key in fields) {
                        if (fields.hasOwnProperty(key)) {
                            sendData[key] = fields[key][0];
                        }
                    }
                }

                if (files) {
                    for (const key in files) {
                        if (files.hasOwnProperty(key)) {
                            sendData[key] = files[key];
                        }
                    }
                }

                if (Object.keys(sendData).length === 0) {
                    return global.HELPER.notAcceptableStatusBuild(res, 'Content type mismatch');
                }

                req.body = sendData;
                next();
            });
        } else {
            next();
        }
    };
}