import User from "../models/User.js";
import { customError } from '../error.js';
import Video from '../models/Video.js';


export const updateUser = async (req, res, next) => {
    if (req.params.id === req.user.id) {
        try {
            const updatedUser = await User.findByIdAndUpdate(req.user.id, {
                $set: req.body
            },
            { new: true });
            const { password, ...updatedInfo } = updatedUser._doc;
            res.status(200).json(updatedInfo);
        } catch (err) {
            next(err);
        }
    } else {
        return next(customError(403, "You can update only your account..."));
    }
};

export const deleteUser = async (req, res, next) => {
    if (req.params.id === req.user.id) {
        try {
            await User.findByIdAndDelete(req.user.id);
            res.status(200).json("User has been deleted...");
        } catch (err) {
            next(err);
        }
    } else {
        return next(customError(403, "You can delete only your account..."));
    }
};

export const getSingleUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        const { password, ...singleUser } = user._doc;
        res.status(200).json(singleUser);
    } catch (err) {
        next(err);
    }
};

export const subscribe = async (req, res, next) => {
    try {
        await User.findByIdAndUpdate(req.user.id, {
            $push: { subscribedUsers: req.params.id }
        });
        await User.findByIdAndUpdate(req.params.id, {
            $inc: { subscribers: 1 }
        });
        res.status(200).json("Subscribed!");
    } catch (err) {
        next(err);
    }
};

export const unsubscribe = async (req, res, next) => {
    try {
        await User.findByIdAndUpdate(req.user.id, {
            $pull: { subscribedUsers: req.params.id }
        });
        await User.findByIdAndUpdate(req.params.id, {
            $inc: { subscribers: -1 }
        });
        res.status(200).json("Subscribe canceled!");
    } catch (err) {
        next(err);
    }
};

export const likeVideo = async (req, res, next) => {
    const id = req.user.id;
    const videoId = req.params.videoId;
    try {
        await Video.findByIdAndUpdate(videoId, {
            $addToSet: { likes: id },
            $pull: { dislikes: id }
        });
        res.status(200).json("Video has been liked...");
    } catch (err) {
        next(err);
    }
};

export const dislikeVideo = async (req, res, next) => {
    const id = req.user.id;
    const videoId = req.params.videoId;
    try {
        await Video.findByIdAndUpdate(videoId, {
            $addToSet: { dislikes: id },
            $pull: { likes: id }
        });
        res.status(200).json("Video has been disliked...");
    } catch (err) {
        next(err);
    }
};