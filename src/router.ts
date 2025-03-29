import { Router } from 'express'

//Routes creation
const router = Router()
// Autenticacion y registro
router.post('/auth/register', (req, res) => {
  console.log(req.body)
  res.send('hols')
})

export default router