import express from "express";

import { validateJwt, isAdmin } from '../middlewares/validate-jwt.js'

import { deleteUser, login, registerUser, test, updateUser } from "./user.controller.js";

const api = express.Router();

//Rutas
api.get('/test', [validateJwt, isAdmin] ,test)
api.post('/registerUser', registerUser)
api.post('/login', login)
api.put('/updateUser/:id', [validateJwt, isAdmin], updateUser)
api.delete('/deleteUser/:id', [validateJwt, isAdmin], deleteUser)

export default api