import mongoose from "mongoose";

export const connectDB = async () => {
  console.log(process.env.MONGO_URI);
  try {
    await mongoose.connect(process.env.mongo_uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

//neurelo_9wKFBp874Z5xFw6ZCfvhXcs7m/qx/0Lte4zBlOC3euCBGHpb4oOzZDLpjfxXEQPpdhpsZfD3xLyYOWPARVPx8OZjOhGZjI5MdpkQdfsxE97oDhPzGh4TODzJXUWcbNBxnQW+S6QvK2xHJYBl2YT2OFF2ya62h+8EgyNw7VvGiyRyjtywpie9J7B2JUUVjfzI_7xigvAn5FvoSD/Kje1G0yHWq2YJQwYr6MkKtPYqbLOE=
