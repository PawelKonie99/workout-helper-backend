import * as router from "express";
import { Request, Response } from "express";
import { getTrainingPlan } from "../service/studentService/getTrainingPlan";

export const studentRouter = router.Router();

studentRouter.get("/student/plan", async (req: Request, res: Response) => {
    const userToken = req.headers.authorization;

    const { code, workoutPlan, success } = await getTrainingPlan(userToken);
    return res.status(code).json({ code, workoutPlan, success });
});
