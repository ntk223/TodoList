import { userModel } from "../models/userModel.js";
import asyncHandler from "../utils/asyncHandler.js";
const changeProfile = asyncHandler(async (req, res, next) => {
    const updatedUser = await userModel.changeProfile(req.params.id, req.body)
    if (updatedUser) {
        res.status(200).json(updatedUser)
    }
});


export const userController = {
    changeProfile,
}