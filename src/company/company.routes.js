'use strict'

import { Router } from 'express'
import { filterAZ, filterCategory, filterYearsExperience, filterZA, generateExcel, getCompanies, saveCompany, updateCompany } from "./company.controller.js"
import { isAdmin, validateJwt } from '../middlewares/validate-jwt.js'

const api = Router()

api.post('/saveCompany', [validateJwt, isAdmin], saveCompany)
api.get('/getCompanies', [validateJwt, isAdmin], getCompanies)
api.get('/filterAZ', [validateJwt, isAdmin], filterAZ)
api.get('/filterZA', [validateJwt, isAdmin], filterZA)
api.get('/filterYearsExperience', [validateJwt, isAdmin], filterYearsExperience)
api.post('/filterCategory', [validateJwt, isAdmin], filterCategory)
api.put('/updateCompany/:id', [validateJwt, isAdmin], updateCompany)
api.get('/generateExcel', [validateJwt, isAdmin], generateExcel);


export default api