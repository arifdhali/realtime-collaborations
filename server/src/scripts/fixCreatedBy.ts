
import { User } from "../models/User"
import connectDB from "../config/db";
import { Room } from "../models/Room";




const updateStatus = async () => {
    connectDB();


    try {

        const result = await Room.updateMany(
            { limit_users: { $exists: false } },
            { $set: { limit_users: 5 } }
        )

        console.log("Updated rooms:", result);

    } catch (err) {
        console.error(err);
        process.exit(1);
    }

}

updateStatus();