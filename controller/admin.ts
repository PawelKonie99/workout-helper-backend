import * as router from "express";
import { Request, Response } from "express";
import { changeUserPassword } from "../service/adminService/changeUserPassword";
import { changeUserRole } from "../service/adminService/changeUserRole";
import { deleteUser } from "../service/adminService/deleteUser";
import { getAllUsers } from "../service/adminService/getAllUsers";
import { getSingleUserData } from "../service/adminService/getSingleUserData";
import { getUserByUsername } from "../service/adminService/getUserByUsername";

export const adminRouter = router.Router();

adminRouter.get("/admin/user/:offset/:limit", async (req: Request, res: Response) => {
    const userToken = req.headers.authorization;
    const offset = Number(req.params.offset);
    const limit = Number(req.params.limit);

    const { code, usersData, success } = await getAllUsers(userToken, offset, limit);
    return res.status(code).json({ code, usersData, success });
});

adminRouter.get("/admin/user/:userId", async (req: Request, res: Response) => {
    const userToken = req.headers.authorization;
    const userId = req.params.userId;

    const { code, parsedUserData, success } = await getSingleUserData(userToken, userId);
    return res.status(code).json({ code, parsedUserData, success });
});

adminRouter.delete("/admin/user", async (req: Request, res: Response) => {
    const userToken = req.headers.authorization;

    const { code, message, success } = await deleteUser(userToken, req.body);
    return res.status(code).json({ code, message, success });
});

adminRouter.post("/admin/user/role", async (req: Request, res: Response) => {
    const userToken = req.headers.authorization;

    const { code, message, success } = await changeUserRole(userToken, req.body);
    return res.status(code).json({ code, message, success });
});

adminRouter.post("/admin/user/password", async (req: Request, res: Response) => {
    const userToken = req.headers.authorization;

    const { code, message, success } = await changeUserPassword(userToken, req.body);
    return res.status(code).json({ code, message, success });
});

adminRouter.get("/admin/username/:username", async (req: Request, res: Response) => {
    const userToken = req.headers.authorization;
    const username = req.params.username;

    const { code, parsedUserData, success } = await getUserByUsername(userToken, username);
    return res.status(code).json({ code, parsedUserData, success });
});
