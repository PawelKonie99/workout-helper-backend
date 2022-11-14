import * as router from "express";
import { Request, Response } from "express";
import { addNewDietProduct } from "../service/trainerService/addNewDietProduct";
import { addNewTrainingPlan } from "../service/trainerService/addNewTrainingPlan";
import { addStudent } from "../service/trainerService/addStudent";
import { getAllStudents } from "../service/trainerService/getAllStudents";
import { getSingleStudentData } from "../service/trainerService/getSingleStudentData";
import { getStudentDiet } from "../service/trainerService/getStudentDiet";
import { removeDietProduct } from "../service/trainerService/removeDietProduct";
export const trainerRouter = router.Router();

trainerRouter.get("/trainer/student", async (req: Request, res: Response) => {
    const userToken = req.headers.authorization;

    const { code, allStudents, success } = await getAllStudents(userToken);
    return res.status(code).json({ code, allStudents, success });
});

trainerRouter.get("/trainer/student/:id", async (req: Request, res: Response) => {
    const userToken = req.headers.authorization;
    const userId = req.params.id;
    const { code, success, allUserWorkouts, mealHistory } = await getSingleStudentData(userToken, userId);

    return res.status(code).json({ code, success, allUserWorkouts, mealHistory });
});

trainerRouter.get("/trainer/diet/:studentId", async (req: Request, res: Response) => {
    const userToken = req.headers.authorization;
    const studentId = req.params.studentId;

    const { code, success, diet } = await getStudentDiet(userToken, studentId);
    return res.status(code).json({ code, success, diet });
});

trainerRouter.post("/trainer/student", async (req: Request, res: Response) => {
    const userToken = req.headers.authorization;

    const { code, message, success } = await addStudent(req.body, userToken);
    return res.status(code).json({ code, message, success });
});

trainerRouter.post("/trainer/plan", async (req: Request, res: Response) => {
    const userToken = req.headers.authorization;

    const { code, message, success } = await addNewTrainingPlan(req.body, userToken);
    return res.status(code).json({ code, message, success });
});

trainerRouter.post("/trainer/diet", async (req: Request, res: Response) => {
    const userToken = req.headers.authorization;

    const { code, message, success } = await addNewDietProduct(userToken, req.body);
    return res.status(code).json({ code, message, success });
});

trainerRouter.delete("/trainer/diet", async (req: Request, res: Response) => {
    const userToken = req.headers.authorization;

    const { code, message, success } = await removeDietProduct(userToken, req.body);
    return res.status(code).json({ code, message, success });
});
