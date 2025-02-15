import middy from "middy";
import { errorHandler } from "../../../middleware/errorHandler";
import { createHttpError } from "../../../utils/createHttpError";

export const handlerFunction = async (event: any) => {
    throw createHttpError(400, "errored successfully ヽ༼ຈل͜ຈ༽ﾉ")
    // return {
    //     statusCode: 200,
    //     body: JSON.stringify({
    //         message: "hello from lambda"
    //     })
    // }
}

export const handler = middy(handlerFunction).use(errorHandler());