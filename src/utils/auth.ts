import bcrypt from 'bcrypt'

export const hashPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(10) // Cadena de caracteres aleatorias (hashes son unicos)
  return await bcrypt.hash(password, salt)
}