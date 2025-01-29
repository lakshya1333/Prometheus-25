import mongoose from "mongoose";
mongoose.set("strictQuery", true);

export default function connectToMongo() {
    mongoose.connect(process.env.MONGO_URI)
        .then(() => {
            console.log("Connection to MongoDB established!");
        })
        .catch((err) => {
            console.error("Connection to MongoDB failed.", err);
        });
}