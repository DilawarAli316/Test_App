import express from 'express'
const router = express.Router()
import {
  createParentTask,
  createSubTask,
  getSubTasks,
  getTasks,
  updateSubTask,
  updateTask,
} from '../controllers/taskController.js'

router.route('/').get(getTasks).post(createParentTask)
router.route('/:id').put(updateTask)
router.route('/subtask').post(createSubTask)
router.route('/subtask/:id').get(getSubTasks).put(updateSubTask)

export default router
