import express from 'express';

import authRouter from "./auth/auth";
import editorRouter from "./editor/editor"

const router = express.Router();

router.use("/auth", authRouter);
router.use("/editor", editorRouter);


export default router;
