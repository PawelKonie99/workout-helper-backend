import * as router from "express";
import { Request, Response } from "express";
import { getAllUserWorkouts } from "../service/workoutService/getAllUserWorkouts";
import { getAllWorkoutOptions } from "../service/workoutService/getAllWorkoutOptions";
import { getBestExercise } from "../service/workoutService/getBestExercise";
import { saveWorkoutToDb } from "../service/workoutService/saveWorkoutToDb";
export const workoutRouter = router.Router();

workoutRouter.post("/workouts", async (req: Request, res: Response) => {
    const userToken = req.headers.authorization;

    const { code, message, success } = await saveWorkoutToDb(req.body, userToken);
    return res.status(code).json({ code, message, success });
});

workoutRouter.get("/workouts/history/:offset", async (req: Request, res: Response) => {
    const userToken = req.headers.authorization;
    const offset = Number(req.params.offset);

    const { code, allUserWorkouts, success } = await getAllUserWorkouts(userToken, offset);
    return res.status(code).json({ code, allUserWorkouts, success });
});

workoutRouter.get("/workouts/options", async (req: Request, res: Response) => {
    const userToken = req.headers.authorization;

    const { code, success, exercise, reps, series, weight } = await getAllWorkoutOptions(userToken);
    return res.status(code).json({ code, success, exercise, reps, series, weight });
});

workoutRouter.get("/workouts/best", async (req: Request, res: Response) => {
    const userToken = req.headers.authorization;
    const exerciseName = req.query.exerciseName.toString();

    const { code, success, exerciseWithRecord } = await getBestExercise(userToken, exerciseName);
    return res.status(code).json({ code, success, exerciseWithRecord });
});
