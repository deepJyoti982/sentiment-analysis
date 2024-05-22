import { Request, Response } from "express";
import userModel from "../model/userModel";
import { ICreateUser } from "../interface/userInterface";

export class UserController {
    constructor() { };

    registerUser = async (req: Request, res: Response) => {
        try {
            const { name, email, password } = req.body;

            const createUser: ICreateUser = {
                name,
                email,
                password: await global.HELPER.hashPassword(password)
            }

            const new_user = await userModel.create(createUser);
            if (new_user._id) {
                return global.HELPER.successStatusBuild(res, {}, "user created successfully.");
            }
        } catch (error) {
            // console.log(error);
            return global.HELPER.badRequestStatusBuild(res, /* error.message */ "something went wrong!");
        }
    }


    userLogin = async (req: Request, res: Response) => {
        try {
            const { user_email, password } = req.body;

            const user_details = await userModel.findOne({ email: user_email }, { createdAt: 0, updatedAt: 0, __v: 0 });
            if (user_details) {
                let hashPassword = user_details.password;
                if (await global.HELPER.comparePassword(password, hashPassword)) {
                    let encUserId = global.HELPER.encryptId(user_details._id.toString());
                    let tokenData = {
                        'user_id': encUserId,
                        'user_email': user_email,
                        'user_name': user_details.name
                    }
                    let token = await global.HELPER.createToken(tokenData);
                    return global.HELPER.successStatusBuild(res, { token }, "User logged in successfully.");
                } else {
                    return global.HELPER.badRequestStatusBuild(res, "Invalid user email or password.");
                }
            } else {
                return global.HELPER.badRequestStatusBuild(res, "Invalid user email or password.");
            }
        } catch (error) {
            console.log(error);
            return global.HELPER.badRequestStatusBuild(res, "Something went wrong!");
        }
    }
}