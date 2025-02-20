import express from 'express'

import TaskController from '../controllers/task.js'

const router = express.Router()

router.get('/', TaskController.find)
router.get('/:id', TaskController.findById)
router.post('/', TaskController.create)
router.put('/', TaskController.update)
router.patch('/:id', TaskController.updateStatus)
router.delete('/', TaskController.destroy)

export default router
