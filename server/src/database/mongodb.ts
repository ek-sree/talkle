import mongoose from "mongoose"
import config from "../config/index.js"
import logger from "../utils/logger.js"

export const connectToDatabase= async ()=>{
    try {
        await mongoose.connect(config.mongoUrl)
        logger.info("Database connected successfully")
    }catch (error: unknown) {
        if (error instanceof Error) {
          logger.error("Can't connect to database", { message: error.message, stack: error.stack });
        } else {
          logger.error("Can't connect to database", { message: "Unknown error", stack: String(error) });
        }
    }
}