import express from "express";
import { Routes } from "../config/constant";
import {login} from "../controllers/userController"


const router = express.Router();

router.post(Routes.ROOT,login);

export default router;