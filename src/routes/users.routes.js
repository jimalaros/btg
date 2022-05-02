import { Router } from "express";
import {
  renderSignUpForm,
  signup,
  renderSigninForm,
  signin,
  logout,
} from "../controllers/users.controller";

const router = Router();

// Routes
router.get("/users/signup", renderSignUpForm);

router.post("/users/signup", signup);

router.get("/users/signin", renderSigninForm);

router.post("/users/signin", signin);

router.get("/users/logout", logout);

export default router;
