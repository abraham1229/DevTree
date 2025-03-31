import { Request, Response} from 'express' // El type no cambia nada en tu codigo
import User from "../models/User"
import { hashPassword } from '../utils/auth'


//Se tiene any y se debe de evitar porque se puede usar el valor que sea
export const createAccount = async (req, res) => {
  
  const { email, password } = req.body
  const userExists = await User.findOne({ email }) //Returns the first
  
  if (userExists) {
    const error = new Error('Correo ya registrado')
    return res.status(409).json({error : error.message})
  }
  
  const user = new User(req.body) 
  user.password = await hashPassword(password)
  await user.save()
  
  res.status(201).end('Registro creado correctamente')
}