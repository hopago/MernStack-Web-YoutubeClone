import { customError } from "../error.js";
import Video from '../models/Video.js';
import User from '../models/User.js';


export const addVideo = async (req, res, next) => {
    if (req.user.id) {
        const newVideo = new Video({ userId: req.user.id, ...req.body });
        try {
            const savedVideo = await newVideo.save();
            res.status(200).json(savedVideo);
        } catch (err) {
            next(err);
        }
    } else {
        next(customError(401, "Something wrong verifyToken..."));
    }
};

export const updateVideo = async (req, res, next) => {
    try {
        const video = await Video.findById(req.params.id);
        if (!video) return next(customError(404, "Could not found video..."));

        if (req.user.id === video.userId) {
            const updatedVideo = await Video.findByIdAndUpdate(req.params.id, {
                $set: req.body
            },
                { new: true }
            );
            res.status(200).json(updatedVideo);
        } else {
            next(customError(403, "Something went wrong in request or token... || update")); // for dev
        }
    } catch (err) {
        next(err);
    }
};

export const deleteVideo = async (req, res, next) => {
    try {
        const video = await Video.findById(req.params.id);
        if (!video) return next(customError(404, "Could not found video..."));

        if (req.user.id === video.userId) {
            await Video.findByIdAndDelete(req.params.id);
            res.status(200).json("Video successfully deleted...");
        } else {
            next(customError(403, "Something went wrong in request or token... || delete")); // for dev
        }
    } catch (err) {
        next(err);
    }
};

export const addViewOnVideo = async (req, res, next) => {
    try {
        await Video.findByIdAndUpdate(req.params.id, {
            $inc: { views: 1 }
        });
        res.status(200).json("View increase...");
    } catch (err) {
        next(err);
    }
};

export const getVideo = async (req, res, next) => {
    try {
        const video = await Video.findById(req.params.id);
        res.status(200).json(video);
    } catch (err) {
        next(err);
    }
};

export const trendVideo = async (req, res, next) => {
    try {
        const videos = await Video.find().sort({
            views: - 1
        });
        res.status(200).json(videos);
    } catch (err) {
        next(err);
    }
};

export const randomVideo = async (req, res, next) => {
    try {
        const videos = await Video.aggregate([{ $sample: { size: 10 } }]);
        res.status(200).json(videos);
    } catch (err) {
        next(err);
    }
};

export const subscribedVideo = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id);
        const subscribedChannels = user.subscribedUsers;

        const list = await Promise.all(
            subscribedChannels.map(async (channelId) => {
                return await Video.find({ userId: channelId });
            })
        );

        res.status(200).json(list.flat().sort((a, b) => b.createdAt - a.createdAt));
    } catch (err) {
        next(err);
    }
};

export const searchVideo = async (req, res, next) => {
    const query = req.query.q;
    try {
        const videos = await Video.find({ title: { $regex: query, $option: "i" } }).limit(10);
        res.status(200).json(videos);
    } catch (err) {
        next(err);
    }
};

export const findVideoByTags = async (req, res, next) => {
    const tags = req.query.tags.split(","); // return tags by array
    try {
        const videos = await Video.find({ tags: { $in: tags } }).limit(10);
        res.status(200).json(videos);
    } catch (err) {
        next(err);
    }
};