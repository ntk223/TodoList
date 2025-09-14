import { userModel } from "../models/userModel.js";

const changeProfile = async (req, res) => {

    const updatedUser = await userModel.changeProfile(req.params.id, req.body)
    if (updatedUser) {
        res.status(200).json(updatedUser)
    }
    else {
        res.status(400).send("update fail")
    }
}

export const userController = {
    changeProfile,
}