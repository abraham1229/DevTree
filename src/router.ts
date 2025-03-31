import { Router } from 'express'
import { body, ValidationChain } from 'express-validator'
import { createAccount } from './handlers'

//Routes creation
const router = Router()
// Autenticacion y registro
router.post('/auth/register',
  body('handle')
    .notEmpty()
    .withMessage('El handle no puede ir vacio'),
  body('name')
    .notEmpty()
    .withMessage('El nombre no puede ir vacio'),
  body('email')
  .isEmail()
  .withMessage('E-mail no válido'), 
  body('password')
    .isLength({ min: 8 })
    .withMessage('El password es muy corto, mínimo es 8 caracteres'),
  createAccount)

export default router