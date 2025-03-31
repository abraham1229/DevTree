import {Request} from 'express'
import User from "../models/User"
import slug from 'slug'
import { validationResult } from 'express-validator'
import { checkPassword, hashPassword } from '../utils/auth'


//Se tiene any y se debe de evitar porque se puede usar el valor que sea
export const createAccount = async (req: Request, res) => {

  // Manejar errores creados en router
  let errors = validationResult(req)
  console.log(errors)
  if (!errors.isEmpty()) {
    return res.status(400).json({errors: errors.array()})
  }
  
  const { email, password } = req.body

  //Comprobacion de email
  const userExists = await User.findOne({ email }) //Returns the first
  if (userExists) {
    const error = new Error('Correo ya registrado')
    return res.status(409).json({error : error.message})
  }

  //Comprobacion de handle 
  const handle = slug(req.body.handle, '_')
  const handleExists = await User.findOne({handle})
  if (handleExists) {
    const error = new Error('Usuario no disponible')
    return res.status(409).json({error : error.message})
  }
  
  const user = new User(req.body) 
  user.password = await hashPassword(password)
  user.handle = handle


  await user.save()
  res.status(201).end('Registro creado correctamente')
}


export const login = async (req: Request, res) => {
  // Manejar errores creados en router
  let errors = validationResult(req)
  console.log(errors)
  if (!errors.isEmpty()) {
    return res.status(400).json({errors: errors.array()})
  }

  const { email, password } = req.body

  //Comprobacion de email (ver si esta registrado)
  const user = await User.findOne({ email }) //Returns the first
  if (!user) {
    const error = new Error('Este correo no esta vinculado a una cuenta')
    return res.status(404).json({error : error.message})
  }

  // Verificar password
  const isPasswordCorrect = await checkPassword(password,user.password)
  if (!isPasswordCorrect) {
    const error = new Error('Password Incorrecto') 
    return res.status(401).json({error: error.message})
  }
  
  res.send('Autenticado')
}