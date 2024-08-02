import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://inspiter:Karu14!!@cluster0.kxm19we.mongodb.net/food_del').then(()=>console.log("DB Connected"));
}