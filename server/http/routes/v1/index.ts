import express from "express";

import authRouter from "./auth/auth";
import editorRouter from "./editor/editor";
import aiRouter from "./ai/ai";

const router = express.Router();

router.use("/auth", authRouter);
router.use("/editor", editorRouter);
router.use("/ai", aiRouter);

export default router;
