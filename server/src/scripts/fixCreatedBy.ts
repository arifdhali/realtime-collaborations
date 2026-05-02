
import { User } from "../models/User"
import connectDB from "../config/db";




const updateStatus = async () => {
connectDB();


    try {

        const result = await User.updateMany(
            { status: { $exists: false } },
            { $set: { status: true } }
        )

        console.log("Updated users:", result);

    } catch (err) {
        console.error(err);
        process.exit(1);
    }

}

updateStatus();