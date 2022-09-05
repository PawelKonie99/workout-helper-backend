import * as router from "express";
import { Request, Response } from "express";
import { getProductData } from "../service/foodService/getProductData";
export const foodRouter = router.Router();

foodRouter.post("/foodItem", async (req: Request, res: Response) => {
    const apiProductInfo = await getProductData(req.body.productName);
    const { code, productData, success } = apiProductInfo;

    return res.status(code).json({ code: code, productData, success });
});
