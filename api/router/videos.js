import express from 'express';
import {
    addVideo, updateVideo, deleteVideo, getVideo, randomVideo, subscribedVideo, addViewOnVideo, trendVideo, findVideoByTags, searchVideo
} from '../controllers/video.js';
import { verifyToken } from '../verifyToken.js';

const router = express.Router();

router.post("/", verifyToken, addVideo);

router.put("/:id", verifyToken, updateVideo);

router.delete("/:id", verifyToken, deleteVideo);

router.put("/view/:id", addViewOnVideo);

router.get("/find/:id", getVideo);

router.get("/random", randomVideo);

router.get("/trend", trendVideo);

router.get("/subscribed", verifyToken, subscribedVideo);

router.get("/tags", findVideoByTags);

router.get("/search", searchVideo);

export default router;