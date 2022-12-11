import * as router from "express";
import { Request, Response } from "express";
import { deleteUser } from "../service/adminService/deleteUser";
import { getAllUsers } from "../service/adminService/getAllUsers";

export const adminRouter = router.Router();

adminRouter.get("/admin/user/:offset/:limit", async (req: Request, res: Response) => {
    const userToken = req.headers.authorization;
    const offset = Number(req.params.offset);
    const limit = Number(req.params.limit);

    const { code, usersData, success } = await getAllUsers(userToken, offset, limit);
    return res.status(code).json({ code, usersData, success });
});

adminRouter.delete("/admin/user", async (req: Request, res: Response) => {
    const userToken = req.headers.authorization;

    const { code, message, success } = await deleteUser(userToken, req.body.userIdToRemove);
    return res.status(code).json({ code, message, success });
});
