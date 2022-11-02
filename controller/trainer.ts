import * as router from "express";
import { Request, Response } from "express";
import { addStudent } from "../service/trainerService/addStudent";
import { getAllStudents } from "../service/trainerService/getAllStudents";
export const trainerRouter = router.Router();

trainerRouter.get("/trainer/student", async (req: Request, res: Response) => {
    console.log("elo");

    const userToken = req.headers.authorization;

    const { code, allStudents, success } = await getAllStudents(userToken);
    return res.status(code).json({ code, allStudents, success });
});

trainerRouter.post("/trainer/student", async (req: Request, res: Response) => {
    const userToken = req.headers.authorization;

    const addedStudent = await addStudent(req.body, userToken);
    const { code, message, success } = addedStudent;
    return res.status(code).json({ code, message, success });
});
