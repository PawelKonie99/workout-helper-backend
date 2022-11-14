import * as router from "express";
import { Request, Response } from "express";
import { deleteProductFromDb } from "../service/foodService/deleteProductFromDb";
import { getAllProducts } from "../service/foodService/getAllProducts";
import { getMealHistory } from "../service/foodService/getMealHistory";
import { getTodayProducts } from "../service/foodService/getTodayProducts";
import { saveProductToDb } from "../service/foodService/saveProductToDb";
export const foodRouter = router.Router();

foodRouter.get("/food", async (req: Request, res: Response) => {
    const userToken = req.headers.authorization;
    const { code, success, allUserProducts } = await getAllProducts(userToken);

    return res.status(code).json({ code, allUserProducts, success });
});

foodRouter.get("/food/history", async (req: Request, res: Response) => {
    const userToken = req.headers.authorization;
    const { code, success, mealHistory } = await getMealHistory(userToken);

    return res.status(code).json({ code, mealHistory, success });
});

foodRouter.get("/food/today", async (req: Request, res: Response) => {
    const userToken = req.headers.authorization;
    const { code, success, todayUserProducts, dailySummary } = await getTodayProducts(userToken);

    return res.status(code).json({ code, todayUserProducts, success, dailySummary });
});

foodRouter.post("/food", async (req: Request, res: Response) => {
    const userToken = req.headers.authorization;
    const savedProduct = await saveProductToDb(req.body, userToken);
    const { code, message, success } = savedProduct;

    return res.status(code).json({ code, message, success });
});

foodRouter.delete("/food", async (req: Request, res: Response) => {
    const userToken = req.headers.authorization;
    const { code, success } = await deleteProductFromDb(userToken, req.body);

    return res.status(code).json({ code, success });
});
