import mongoose from "mongoose";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { customError } from '../error.js';
import jwt from 'jsonwebtoken';


export const signup = async (req, res, next) => {
    try {
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(req.body.password, salt);
        const newUser = new User({ ...req.body, hashedPassword });
        await newUser.save();
        res.status(200).json("User has been created...");
    } catch (err) {
        next(err);
    }
};

export const signin = async (req, res, next) => {
    try {
        const user = await User.findOne({ name: req.body.name });
        if (!user) return next(customError(404, "User not found..."));

        const verifyPassword = await bcrypt.compare(req.body.password, user.password);
        if (!verifyPassword) return next(customError(400, "Wrong creds..."));

        const { password, ...userInfo } = user._doc;
        const token = jwt.sign({ id: user._id }, process.env.JWT);
        res.cookie("access_token", token, {
            httpOnly: true,
        })
        .status(200)
        .json(userInfo);
    } catch (err) {
        next(err);
    }
};

export const googleAuth = async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (user) {
            const token = jwt.sign({ id: user._id }, process.env.JWT);
            res.cookie("access_token", token, {
                httpOnly: true,
            })
            .status(200)
            .json(user._doc);
        } else {
            const newUser = new User({
                ...req.body,
                fromGoogle: true
            });
            const savedUser = await newUser.save();
            const token = jwt.sign({ id: savedUser._id }, process.env.JWT);
            res.cookie("access_token", token, {
                httpOnly: true,
            })
            .status(200)
            .json(savedUser);
        }
    } catch (err) {
        next(err);
    }
};