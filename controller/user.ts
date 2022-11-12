import * as router from "express";
import { Request, Response } from "express";
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

userRouter.get("/user", async (req: Request, res: Response) => {
    const userToken = req.headers.authorization;
    const userData = await getUserData(userToken);
    const { code, success, username, trainerName } = userData;

    return res.status(code).json({ code, success, username, trainerName });
});
