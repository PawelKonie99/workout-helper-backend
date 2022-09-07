import * as router from "express";
import { Request, Response } from "express";
import { saveProductToDb } from "../service/foodService/saveProductToDb";
export const foodRouter = router.Router();

foodRouter.post("/newProduct", async (req: Request, res: Response) => {
    const userToken = req.headers.authorization;
    const savedProduct = await saveProductToDb(req.body, userToken);
    const { code, productData, success } = savedProduct;

    return res.status(code).json({ code: code, productData, success });
});
