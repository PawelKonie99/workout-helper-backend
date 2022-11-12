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
    const userProducts = await getAllProducts(userToken);
    const { code, success, allUserProducts } = userProducts;

    return res.status(code).json({ code, allUserProducts, success });
});

foodRouter.get("/food/history", async (req: Request, res: Response) => {
    const userToken = req.headers.authorization;
    const userProducts = await getMealHistory(userToken);
    const { code, success, mealHistory } = userProducts;

    return res.status(code).json({ code, mealHistory, success });
});

foodRouter.get("/food/today", async (req: Request, res: Response) => {
    const userToken = req.headers.authorization;
    const userProducts = await getTodayProducts(userToken);
    const { code, success, todayUserProducts, dailySummary } = userProducts;

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
    const deletedProductResponse = await deleteProductFromDb(userToken, req.body);
    const { code, success } = deletedProductResponse;

    return res.status(code).json({ code, success });
});
