"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const app_1 = __importDefault(require("./app"));
dotenv_1.default.config();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;
console.log("Attempting to log in to MongoDB");
if (!MONGO_URI) {
    throw new Error("MONGO_URI is MISSING from .env");
}
const startServer = async () => {
    try {
        await mongoose_1.default.connect(MONGO_URI);
        console.log("MongoDB connected");
        app_1.default.listen(PORT, () => {
            console.log(`Server lisening on ${PORT}`);
        });
    }
    catch (error) {
        console.error("Failed to connect to MongoDB");
        console.error(error);
        process.exit(1);
    }
};
startServer();
