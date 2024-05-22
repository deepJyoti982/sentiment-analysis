import bcrypt from 'bcrypt';
import JWT from 'jsonwebtoken';
import moment from 'moment-timezone';
import Cryptr from 'cryptr';
import { Response } from 'express';

const commonFn = class commonClass {
    jwt: typeof JWT;
    cryptr: Cryptr;

    api_var: {
        version: string,
        developer: string
    };

    constructor() {
        this.jwt = JWT;
        this.cryptr = new Cryptr(process.env.CRYPTR_SECRET)

        this.api_var = {
            version: global.CONFIG.constants.API_VERSION,
            developer: global.CONFIG.constants.API_DEVELOPER
        }
    }

    /* _id encryption */
    encryptId(id: string) {
        const encryptedId = this.cryptr.encrypt(id);
        return encryptedId;
    }

    /* _id decryption */
    decryptId(id: string) {
        const decryptedId = this.cryptr.decrypt(id);
        return decryptedId;
    }

    /* Token Creation */
    createToken(usrdtls: string | object) {
        let jwtToken = this.jwt.sign(usrdtls, global.CONFIG.jwt.JWT_SECRET, {
            algorithm: global.CONFIG.jwt.ALGORITHM,
            expiresIn: global.CONFIG.jwt.JWT_EXPIRES
        });
        return jwtToken;
    }

    /* Token Verification */
    verifyToken(token: string) {
        let that = this;
        return new Promise((resolve, reject) => {
            that.jwt.verify(token, global.CONFIG.jwt.JWT_SECRET, global.CONFIG.jwt.ALGORITHM, (err, result) => {
                if (err) {
                    return reject(err.message);
                } else {
                    return resolve(result);
                }
            })
        });
    }


    /* View Token Content */
    viewTokenContent(token: string) {
        try {
            let that = this;
            let decoded = that.jwt.decode(token);
            return decoded;
        } catch (error) {
            return false;
        }
    }

    /* Password Encryption */
    hashPassword(password: string) {
        let salt = bcrypt.genSaltSync(10);
        let hash = bcrypt.hash(password, salt);
        return hash;
    }

    /* Password Decryption */
    comparePassword(password: string, hash: string) {
        if (bcrypt.compareSync(password, hash)) {
            return true;
        } else {
            return false;
        }
    }

    /* Get Current Timestamp UTC */
    getCurrentTimestampUTC() {
        const date = new Date();
        const str_date = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}-${date.getHours()}:${date.getMinutes}:${date.getSeconds()}`;
        return str_date;
    }

    capitalizeFirstLetter(object: any) {
        object.status.msg = object.status.msg.toLowerCase();
        object.status.msg = object.status.msg.charAt(0).toUpperCase() + object.status.msg.slice(1);
        return object;
    }

    successStatusBuild(res: Response, dataset: any, message: string) {
        type IResponseStatus = { msg: string, action_status: boolean };
        type IResponseData = { data: typeof dataset, status: IResponseStatus, publish: typeof this.api_var };

        let response_status: IResponseStatus = {
            msg: message,
            action_status: true
        };

        let response_data: IResponseData = {
            data: dataset,
            status: response_status,
            publish: this.api_var
        }
        res.status(global.CONFIG.constants.HTTP_RESPONSE_OK);
        res.send({ response: this.capitalizeFirstLetter(response_data) })
    }

    badRequestStatusBuild(res: Response, message: string, dataset?: any,) {
        type IResponseStatus = { msg: string, action_status: boolean };
        type IResponseData = { data: typeof dataset, status: IResponseStatus, publish: typeof this.api_var };

        let response_status: IResponseStatus = {
            msg: message,
            action_status: false
        };

        let response_data: IResponseData = {
            data: dataset ? Array.isArray(dataset) ? [] : {} : [],
            status: response_status,
            publish: this.api_var
        }
        res.status(global.CONFIG.constants.HTTP_RESPONSE_BAD_REQUEST);
        res.send({ response: this.capitalizeFirstLetter(response_data) })
    }

    methodNotAllowedStatusBuild(res: Response, message: string) {
        type IResponseStatus = { msg: string, action_status: boolean };
        type IResponseData = { status: IResponseStatus, publish: typeof this.api_var };

        let response_status: IResponseStatus = {
            msg: message,
            action_status: false
        };

        let response_data: IResponseData = {
            status: response_status,
            publish: this.api_var
        }

        res.setHeader('content-type', 'application/json');
        res.status(global.CONFIG.constants.HTTP_RESPONSE_METHOD_NOT_ALLOWED);
        res.send({ response: this.capitalizeFirstLetter(response_data) });
    }

    unauthorizedStatusBuild(res: Response, message: string) {
        type IResponseStatus = { msg: string, action_status: boolean };
        type IResponseData = { status: IResponseStatus, publish: typeof this.api_var };

        let response_status: IResponseStatus = {
            msg: message,
            action_status: false
        };

        let response_data: IResponseData = {
            status: response_status,
            publish: this.api_var
        }
        res.status(global.CONFIG.constants.HTTP_RESPONSE_UNAUTHORIZED);
        res.send({ response: this.capitalizeFirstLetter(response_data) });
    }

    notAcceptableStatusBuild(res: Response, message: string) {
        type IResponseStatus = { msg: string, action_status: boolean };
        type IResponseData = { status: IResponseStatus, publish: typeof this.api_var };

        let response_status: IResponseStatus = {
            msg: message,
            action_status: false
        };

        let response_data: IResponseData = {
            status: response_status,
            publish: this.api_var
        }
        res.status(global.CONFIG.constants.HTTP_RESPONSE_NOT_ACCEPTABLE);
        res.send({ response: this.capitalizeFirstLetter(response_data) });
    }

    public getCurrentISTDate(): string {
        let utc = Date.now() / 1000;
        return moment.unix(utc).tz(process.env.TZ as string).format('YYYY-MM-DD');
    }
}

export default commonFn;