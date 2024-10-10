import express from "express";
import { Routes } from "../config/constant";
import { login } from "../controllers/userController";
import { checkPermission } from "../middlewares/checkPermission";
import { authenticateByToken } from "../middlewares/auth";
import { routeName } from "../config/constant";
import { getAllUser } from "../controllers/userController";
import { addUser } from "../controllers/userController";
import { deleteUser } from "../controllers/userController";

const router = express.Router();

router.post(Routes.LOGIN, login);

router.get(
  Routes.GET_ALL_USER,
  authenticateByToken,
  checkPermission(routeName.GET_ALL_USER),
  getAllUser
);
router.post(
  Routes.ADD_USER,
  authenticateByToken,
  checkPermission(routeName.ADD_USER),
  addUser
);
router.delete(
  Routes.DELETE_USER,
  authenticateByToken,
  checkPermission(routeName.DELETE_USER),
  deleteUser
);

export default router;
