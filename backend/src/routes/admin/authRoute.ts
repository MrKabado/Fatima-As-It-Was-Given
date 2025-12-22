import express from "express";

import { validateRequest } from "../../middlewares/validateRequest";

import { requestAccessSchema } from "../../validator/admin/auth.validator";

import { authChecker } from "../../middlewares/authChecker";

import { requestAccess, checkAuth, requestNewAccessCode } from "../../controllers/admin/authController";

const authRoute = express.Router()

authRoute.post('/request-access', validateRequest(requestAccessSchema), requestAccess)
authRoute.post('/request-new-access-code', requestNewAccessCode)
authRoute.get('/check-auth', authChecker, checkAuth)

export default authRoute