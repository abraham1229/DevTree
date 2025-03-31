import { Router } from 'express'
import { createAccount } from './handlers'

//Routes creation
const router = Router()
// Autenticacion y registro
router.post('/auth/register', createAccount)

export default router