import express from "express";
import cors from "cors";
import errorMiddleware from "./middleware/error.middleware";
import v1Routes from "./routes/v1/index.routes";

const app = express();


// app.use(cors({
//     origin: ["http://loc"],
//     methods: ["GET","POST","PUT","PATCH","DELETE","OPTIONS"],
//     credentials:true
// }))
app.use(express.urlencoded({ extended: true }));
app.use(express.json())

// app.use("/game",gameRoutes);

app.use("/api", v1Routes);
// app.use("/v1", v1Routes)


app.use(errorMiddleware)

export default app;