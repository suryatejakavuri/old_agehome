import mongoose from 'mongoose';

export const connectDB = async (uri) => {
  try {
    if (!uri) {
      throw new Error("MONGO_URI is undefined");
    }

    await mongoose.connect(uri);
    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ Mongo error:", err.message);
    process.exit(1);
  }
};