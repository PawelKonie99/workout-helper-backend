import * as router from "express";
import { Request, Response } from "express";
import { addNewDietProduct } from "../service/trainerService/addNewDietProduct";
import { addNewTrainingPlan } from "../service/trainerService/addNewTrainingPlan";
import { addStudent } from "../service/trainerService/addStudent";
import { getAllStudents } from "../service/trainerService/getAllStudents";
import { removeDietProduct } from "../service/trainerService/removeDietProduct";
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

    const addedPlan = await addNewDietProduct(userToken, req.body);
    const { code, message, success } = addedPlan;
    return res.status(code).json({ code, message, success });
});

trainerRouter.delete("/trainer/diet", async (req: Request, res: Response) => {
    const userToken = req.headers.authorization;

    const removedProduct = await removeDietProduct(userToken, req.body);
    const { code, message, success } = removedProduct;
    return res.status(code).json({ code, message, success });
});
