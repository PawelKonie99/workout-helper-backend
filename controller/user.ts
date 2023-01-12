import * as router from "express";
import { Request, Response } from "express";
import { changePassword } from "../service/userService/changePassword";
import { loginUser } from "../service/userService/loginUser";
import { registerUser } from "../service/userService/registerUser";
import { getUserData } from "../service/userService/userData";
export const userRouter = router.Router();

userRouter.post("/user/register", async (req: Request, res: Response) => {
    const registeredUser = await registerUser(req.body);
    const { code, message, success } = registeredUser;

    return res.status(code).json({ code, message, success });
});

userRouter.post("/user/login", async (req: Request, res: Response) => {
    const registeredUser = await loginUser(req.body);
    const { code, message, loggedUser } = registeredUser;

    return res.status(code).json({ code, message, loggedUser });
});

userRouter.post("/user/password", async (req: Request, res: Response) => {
    const userToken = req.headers.authorization;

    const changedPasswordResponse = await changePassword(userToken, req.body);
    const { code, success, message } = changedPasswordResponse;

    return res.status(code).json({ code, success, message });
});

userRouter.get("/user", async (req: Request, res: Response) => {
    const userToken = req.headers.authorization;
    const { code, success, username, trainerName, trainerId } = await getUserData(userToken);

    return res.status(code).json({ code, success, username, trainerName, trainerId });
});
