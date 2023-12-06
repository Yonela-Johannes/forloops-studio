const express = require("express");
const { loginUser, getAllUsers, getUser, updateUser, blockUser, unblockUser, findUser, createArtist, getAllAdmins, getAdmin, getAllAppUsers } = require("../controllers/userController");
const { isAdmin, protect } = require("../middlewares/authMiddleware");
const { addToPlaylist, getPlaylist } = require("../controllers/songsController")
const userRouter = express.Router();

userRouter.post("/login", loginUser);
userRouter.post("/create-artist", createArtist);
userRouter.get("/", getAllUsers);
userRouter.get("/users", getAllAppUsers);
userRouter.get("/user/:userId", getUser);
userRouter.get("/admins", getAllAdmins);
userRouter.get("/admin/:userId", getAdmin);
userRouter.get("/users/search", findUser);
userRouter.patch("/update/:userId", updateUser);
userRouter.put("/block-user", blockUser);
userRouter.put("/unblock-user", unblockUser);
userRouter.patch('/playlist/:songId', addToPlaylist);
userRouter.get('/playlist/:userId', getPlaylist)

module.exports = userRouter;
