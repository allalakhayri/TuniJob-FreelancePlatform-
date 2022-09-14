import express from "express"

const router = express.Router()

import jwt from "jsonwebtoken"
const tokenSecret = "my-token-secret"
import verify from "../veriftoken.js"
import {login,signup} from "../controllers/authService.js"

router.post('/login',login );

router.post('/signup',signup );

router.get('/jwt-test', verify, (req, res) => {
    res.status(200).json(req.user)
})



export default router;