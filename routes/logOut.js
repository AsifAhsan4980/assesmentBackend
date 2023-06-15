import express from 'express'

import logout from "../controllers/logout.js"
import protect from "../middlewares/auth.js";

const router = express.Router();

router.route('/')
    .post(protect,logout)


export default router