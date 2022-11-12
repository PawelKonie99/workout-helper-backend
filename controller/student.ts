import * as router from "express";
import { Request, Response } from "express";
import { getStudentDiet } from "../service/studentService/getStudentDiet";
import { getTrainingPlan } from "../service/studentService/getTrainingPlan";

export const studentRouter = router.Router();

studentRouter.get("/student/plan", async (req: Request, res: Response) => {
    const userToken = req.headers.authorization;

    const { code, trainingPlan, success } = await getTrainingPlan(userToken);
    return res.status(code).json({ code, trainingPlan, success });
});

studentRouter.get("/student/diet/:studentId", async (req: Request, res: Response) => {
    const userToken = req.headers.authorization;
    const studentId = req.params.studentId;

    const { code, success, diet } = await getStudentDiet(userToken, studentId);
    return res.status(code).json({ code, success, diet });
});
