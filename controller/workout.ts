import * as router from "express";
import { Request, Response } from "express";
import { getAllUserWorkouts } from "../service/workoutService/getAllUserWorkouts";
import { saveWorkoutToDb } from "../service/workoutService/saveWorkoutToDb";
export const workoutRouter = router.Router();

workoutRouter.post("/workouts", async (req: Request, res: Response) => {
    const userToken = req.headers.authorization;

    const saveWorkout = await saveWorkoutToDb(req.body, userToken);
    const { code, message, success } = saveWorkout;

    return res.status(code).json({ code, message, success });
});

workoutRouter.get("/workouts", async (req: Request, res: Response) => {
    const userToken = req.headers.authorization;

    const userWorkouts = await getAllUserWorkouts(userToken);
    const { code, allUserWorkouts, success } = userWorkouts;

    return res.status(code).json({ code, allUserWorkouts, success });
});
