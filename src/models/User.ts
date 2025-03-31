import mongoose, {Schema} from 'mongoose'

//Informacion de typescript 
export interface IUser {
  handle: string
  name: string,
  email: string,
  password: string
}

//Codigo de Schema en mongo
const userSchema = new Schema({
  handle: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    unique: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    trim: true
  }
})

//<User> es un generic
const User = mongoose.model<IUser>('User', userSchema)

export default User