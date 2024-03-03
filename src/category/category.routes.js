'use strict'

import { Router } from 'express'
import { saveCategory } from './category.controller.js'
import { isAdmin, validateJwt } from '../middlewares/validate-jwt.js'

const api = Router()

api.post('/saveCategory', [validateJwt, isAdmin], saveCategory)

export default api