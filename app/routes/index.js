import express from 'express'

import taskRoutes from './task.js'

const router = express.Router()

router.use('/health', (_req, res) => res.json({ message: 'ok' }))
router.use('/tasks', taskRoutes)

export default router
