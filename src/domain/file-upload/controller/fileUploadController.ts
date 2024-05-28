import fs from 'fs';
import { Request, Response } from 'express';
import fileUploadModel from '../model/fileUpload';
import { IFileUpload } from '../interface/fileUploadInterface';


export class FileUploadController {
    constructor() { };

    uploadFile = async (req: Request, res: Response) => {
        try {
            const { file } = req.body;
            let loginDetails = req.body.loginDetails;

            fs.readFile(file[0].path, async function (err, data) {
                if (err) {
                    return global.HELPER.badRequestStatusBuild(res, "Something went wrong!")
                }

                let fileSaveObj: IFileUpload = {
                    userId: global.HELPER.decryptId(loginDetails.user_id),
                    file: data
                }

                let upload = await fileUploadModel.create(fileSaveObj);
                if (upload) {
                    return global.HELPER.successStatusBuild(res, {}, "File uploaded successfully.");
                }
            })
        } catch (error) {
            console.log(error);
            return global.HELPER.badRequestStatusBuild(res, "Something went wrong.");
        }
    }


    getFile = async (req: Request, res: Response) => {
        try {
            const getFiles = await fileUploadModel.find({}).populate('userId', { _id: 0, createdAt: 0, password: 0, updatedAt: 0, __v: 0 });

            if (getFiles.length) {
                return global.HELPER.successStatusBuild(res, getFiles, "Files fetched successfully.");
            } else {
                return global.HELPER.successStatusBuild(res, getFiles, "No data found.");
            }
        } catch (error) {
            console.log(error);
            return global.HELPER.badRequestStatusBuild(res, "Something went wrong.");
        }
    }
}
