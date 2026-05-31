import app from "./app";

import connectDB from "./config/db";

const PORT = process.env.PORT;
connectDB();



app.listen(PORT, () => {
    console.log(`server running on http://10.16.165.31:${PORT}`);
})

