import {Request, Response} from 'express'
import User from "../models/User"
import slug from 'slug'
import { checkPassword, hashPassword } from '../utils/auth'


//Se tiene any y se debe de evitar porque se puede usar el valor que sea
export const createAccount = async (req: Request, res: Response) => {
  
  const { email, password } = req.body

  //Comprobacion de email
  const userExists = await User.findOne({ email }) //Returns the first
  if (userExists) {
    const error = new Error('Correo ya registrado')
    res.status(409).json({ error: error.message })
    return
  }

  //Comprobacion de handle 
  const handle = slug(req.body.handle, '_')
  const handleExists = await User.findOne({handle})
  if (handleExists) {
    const error = new Error('Usuario no disponible')
    res.status(409).json({ error: error.message })
    return
  }
  
  const user = new User(req.body) 
  user.password = await hashPassword(password)
  user.handle = handle


  await user.save()
  res.status(201).end('Registro creado correctamente')
}


export const login = async (req: Request, res: Response) => {
  
  const { email, password } = req.body

  //Comprobacion de email (ver si esta registrado)
  const user = await User.findOne({ email }) //Returns the first
  if (!user) {
    const error = new Error('Este correo no esta vinculado a una cuenta')
    res.status(404).json({ error: error.message })
    return
  }

  // Verificar password
  const isPasswordCorrect = await checkPassword(password,user.password)
  if (!isPasswordCorrect) {
    const error = new Error('Password Incorrecto') 
    res.status(401).json({error: error.message})
    return
  }
  
  res.send('Autenticado')
}