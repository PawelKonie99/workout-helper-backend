import * as router from "express";
import { Request, Response } from "express";
import { getDiet } from "../service/studentService/getDiet";
import { getTrainerRequest } from "../service/studentService/getTrainerRequest";
import { getTrainingPlan } from "../service/studentService/getTrainingPlan";

export const studentRouter = router.Router();

studentRouter.get("/student/plan", async (req: Request, res: Response) => {
    const userToken = req.headers.authorization;

    const { code, trainingPlan, success } = await getTrainingPlan(userToken);
    return res.status(code).json({ code, trainingPlan, success });
});

studentRouter.get("/student/diet", async (req: Request, res: Response) => {
    const userToken = req.headers.authorization;

    const { code, diet, success } = await getDiet(userToken);
    return res.status(code).json({ code, diet, success });
});

studentRouter.get("/student/trainerRequest", async (req: Request, res: Response) => {
    const userToken = req.headers.authorization;

    const { code, diet, success } = await getTrainerRequest(userToken);
    return res.status(code).json({ code, diet, success });
});
