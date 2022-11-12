import * as router from "express";
import { Request, Response } from "express";
import { addNewDiet } from "../service/trainerService/addNewDiet";
import { addNewTrainingPlan } from "../service/trainerService/addNewTrainingPlan";
import { addStudent } from "../service/trainerService/addStudent";
import { getAllStudents } from "../service/trainerService/getAllStudents";
export const trainerRouter = router.Router();

trainerRouter.get("/trainer/student", async (req: Request, res: Response) => {
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

trainerRouter.post("/trainer/plan", async (req: Request, res: Response) => {
    const userToken = req.headers.authorization;

    const addedPlan = await addNewTrainingPlan(req.body, userToken);
    const { code, message, success } = addedPlan;
    return res.status(code).json({ code, message, success });
});

trainerRouter.post("/trainer/diet", async (req: Request, res: Response) => {
    const userToken = req.headers.authorization;

    const addedPlan = await addNewDiet("636fdba11975f3e4c27ff000", userToken, req.body);
    const { code, message, success } = addedPlan;
    return res.status(code).json({ code, message, success });
});
