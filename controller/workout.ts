import * as router from "express";
import { Request, Response } from "express";
import { saveWorkoutToDb } from "../service/workoutService";
export const workoutRouter = router.Router();

workoutRouter.post("/submitWorkout", async (req: Request, res: Response) => {
  const saveWorkout = await saveWorkoutToDb(req.body);
  const { code, message, success } = saveWorkout;

  return res.status(code).json({ code, message, success });
});
