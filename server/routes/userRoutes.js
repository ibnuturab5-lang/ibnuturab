import express from 'express'
import { getUserInfo, loginUser, registerUser, updateProfile } from '../controllers/userController.js'
import { protect } from '../middleware/authMiddleware.js'
const router =express.Router()
router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/me',protect, getUserInfo)
router.put('/me',protect, updateProfile)
export default router