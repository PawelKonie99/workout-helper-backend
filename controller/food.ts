import * as router from "express";
import { Request, Response } from "express";
import { getAllProducts } from "../service/foodService/getAllProducts";
import { getTodayProducts } from "../service/foodService/getTodayProducts";
import { saveProductToDb } from "../service/foodService/saveProductToDb";
export const foodRouter = router.Router();

foodRouter.post("/foodProduct", async (req: Request, res: Response) => {
    const userToken = req.headers.authorization;
    const savedProduct = await saveProductToDb(req.body, userToken);
    const { code, message, success } = savedProduct;

    return res.status(code).json({ code: code, message, success });
});

foodRouter.get("/foodProduct", async (req: Request, res: Response) => {
    const userToken = req.headers.authorization;
    const userProducts = await getAllProducts(userToken);
    const { code, success, allUserProducts } = userProducts;

    return res.status(code).json({ code: code, allUserProducts, success });
});

foodRouter.get("/foodProduct/today", async (req: Request, res: Response) => {
    const userToken = req.headers.authorization;
    const userProducts = await getTodayProducts(userToken);
    const { code, success, todayUserProducts, dailySummary } = userProducts;

    return res.status(code).json({ code: code, todayUserProducts, success, dailySummary });
});
