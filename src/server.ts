import app from "./app";
import { createServer } from "http";
import dotenv from "dotenv";

dotenv.config();
const PORT = process.env.PORT;
// const server = createServer(app);



const server = app.listen(PORT, () => {
    console.log(`server running on http://localhost:${PORT}`);
})

server.on("error", (err: Error) => {
    console.log(err)
})