const bodyParser = require("body-parser");
const MongoStore = require("connect-mongo");
const mongoose = require('mongoose')
const express = require("express");
const session = require("express-session");
const passport = require("passport");
const { authMiddleware, isAdmin } = require("./middlewares/authMiddleware");
const { handleError, notFound } = require("./middlewares/errorHandler");
const app = express();
const userRouter = require("./routes/userRoutes");
const cors = require("cors");
const cookieParser = require('cookie-parser');
const songCommentRouter = require("./routes/songComment");
const albumRouter = require("./routes/albumRouter");
const songsRouter = require("./routes/songsRouter");
const albumCommentRouter = require("./routes/albumComment");
const artistsRouter = require("./routes/artistsRouter");
const blogRouter = require("./routes/blogsRouter");
const categoryRouter = require("./routes/categoryRouter");
const blogCommentRouter = require("./routes/blogComments");
const dotenv = require("dotenv").config();
const PORT = process.env.PORT || 5000;

app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: "mysecret",
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URI,
      ttl: 12 * 60 * 60
    })
  })
)

const connectDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true});
    console.log("connected to database");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

connectDatabase()

app.use(cookieParser())
app.use(passport.initialize());
app.use(passport.session())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : true }))
app.use(cors({origin: ['https://forloops-studio.vercel.app', 'https://myblog-707i.onrender.com', 'https://auth.expo.io/@yonela/forloops', 'http://localhost:19000', 'http://192.168.18.12:19000', 'http://localhost:19006', 'http://192.168.18.12:19006', 'http://localhost:5173'], credentials: true}));

app.use("/api/user", userRouter);
app.use("/api/songs", songsRouter);
app.use("/api/artists", artistsRouter);
app.use("/api/blog-comment", blogCommentRouter);
app.use("/api/post-comment", songCommentRouter);
app.use("/api/album-comment", albumCommentRouter);
app.use("/api/album", albumRouter);
app.use('/api/blog',  blogRouter);
app.use("/api/category", categoryRouter);

app.use(notFound)
app.use(handleError)


const server = app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`)
});
