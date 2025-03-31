import User from "../models/User"
import slug from 'slug'
import { validationResult } from 'express-validator'
import { hashPassword } from '../utils/auth'


//Se tiene any y se debe de evitar porque se puede usar el valor que sea
export const createAccount = async (req, res) => {

  // Manejar errores
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