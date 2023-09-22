import express from 'express';
import { 
    updateUser, deleteUser, getSingleUser, subscribe, unsubscribe, likeVideo, dislikeVideo 
} from '../controllers/user.js';
import { verifyToken } from '../verifyToken.js';

const router = express.Router();

router.put("/:id", verifyToken, updateUser);

router.delete("/:id", verifyToken, deleteUser);

router.get("/find/:id", getSingleUser);

router.put("/sub/:id", verifyToken, subscribe);

router.put("/unsub/:id", verifyToken, unsubscribe);

router.put("/like/:videoId", verifyToken, likeVideo);

router.put("/dislike/:videoId", verifyToken, dislikeVideo);

export default router;