import Services from "../models/service.js"

import bcrypt from "bcrypt"
const rounds = 10
import jwt from "jsonwebtoken"
const tokenSecret = "my-token-secret"
import verify from "../veriftoken.js"



export const login = (req, res) => {
    Services.findOne({email: req.body.emaill})
    .then(user => {
        if(!user) res.status(404).json({error: 'no user with that email found'})
        else {
            bcrypt.compare(req.body.passwordd, user.password, (error, match) => {
                if (error) res.status(500).json(error)
                else if (match) res.status(200).json({user,token: generateToken(user)})
                else res.status(403).json({error: 'passwords do not match'})
            })
        }
    })
    .catch(error => {
        res.status(500).json(error)
    })
};

export const signup = (req, res) => {
    bcrypt.hash(req.body.password, rounds, (error, hash) => {
        if (error) res.status(500).json(error)
        else {
            const newUser =  Services({email: req.body.email,phone:req.body.phone,city:req.body.city,username:req.body.username,speciality:req.body.speciality,experience:req.body.experience, password: hash})
            newUser.save()
                .then(user => {
                    res.status(200).json({token: generateToken(user)})
                })
                .catch(error => {
                    res.status(500).json(error)
                })
        }
    })
};


function generateToken(user){
    return jwt.sign({data: user}, tokenSecret, {expiresIn: '24h'})
}