import * as router from "express";
import { Request, Response } from "express";
import { addStudent } from "../service/trainerService/addStudent";
export const trainerRouter = router.Router();

trainerRouter.post("/trainer/student", async (req: Request, res: Response) => {
    const userToken = req.headers.authorization;

    const addedStudent = await addStudent(req.body, userToken);
    const { code, message, success } = addedStudent;
    return res.status(code).json({ code, message, success });
});
