import * as router from "express";
import { Request, Response } from "express";
import { saveWorkoutToDb } from "../service/workoutService";
export const workoutRouter = router.Router();

workoutRouter.post("/newWorkout", async (req: Request, res: Response) => {
    const userToken = req.headers.authorization;

    const saveWorkout = await saveWorkoutToDb(req.body, userToken);
    const { code, message, success } = saveWorkout;

    return res.status(code).json({ code, message, success });
});
