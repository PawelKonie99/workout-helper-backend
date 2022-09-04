import * as router from "express";
import { Request, Response } from "express";
import { loginUser } from "../service/userService/loginUser";
import { registerUser } from "../service/userService/registerUser";
export const userValidationRouter = router.Router();

userValidationRouter.post("/register", async (req: Request, res: Response) => {
    const registeredUser = await registerUser(req.body);
    const { code, message, success } = registeredUser;

    return res.status(code).json({ code, message, success });
});

userValidationRouter.post("/login", async (req: Request, res: Response) => {
    const registeredUser = await loginUser(req.body);
    const { code, message, loggedUser } = registeredUser;

    return res.status(code).json({ code, message, loggedUser });
});
