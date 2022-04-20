import asyncHandler from 'express-async-handler'
import dotenv from 'dotenv'
import { Todo } from '../models/Todo.js'
import SubTask from '../models/Subtask.js'
import db from '../config/db.js'
import { QueryTypes } from 'sequelize'

dotenv.config()

// @desc Create a new parent task
// @route POST /api/task
// @access Public

const createParentTask = asyncHandler(async (req, res) => {
  const { title } = req.body

  const pTask = await Todo.create({
    title,
  })

  if (pTask) {
    res.json(pTask)
  } else {
    res.status(400)
    throw new Error('Task not created')
  }
})

// @desc Create a new sub task
// @route POST /api/task/subtask
// @access Public

const createSubTask = asyncHandler(async (req, res) => {
  const { title, todo_id } = req.body

  const task = await Todo.findByPk(todo_id)

  console.log(task)

  const subTask = task.createSTask({
    title,
  })

  if (subTask) {
    res.json(subTask)
  } else {
    res.status(404)
    throw new Error('No task created')
  }
})

// @desc Update a parent task by id
// @route PUT /api/task/:id
// @access Public

const updateTask = asyncHandler(async (req, res) => {
  if (req.params.id) {
    const todo = await Todo.update(
      { status: req.body.status },
      {
        where: {
          id: req.params.id,
        },
      }
    )

    if (todo) {
      console.log(todo)
      res.json(todo)
    } else {
      res.status(404)
      throw new Error('todo not found')
    }
  }
})

// @desc Update a sub task by id
// @route PUT /api/task/subtask/:id
// @access Public

const updateSubTask = asyncHandler(async (req, res) => {
  const subTask = await SubTask.update(
    { status: req.body.status },
    {
      where: {
        id: req.params.id,
      },
    }
  )

  if (subTask) {
    res.json(subTask)
  } else {
    res.status(404)
    throw new Error('subTask not found')
  }
})

// @desc Get all tasks
// @route GET /api/task/
// @access Public

const getTasks = asyncHandler(async (req, res) => {
  const task = await Todo.findAll({
    include: [{ model: SubTask }],
  })

  res.send(task)
})

// @desc Get all sub task associated by parent
// @route GET /api/task/subtask/:id
// @access Private/Admin

const getSubTasks = asyncHandler(async (req, res) => {
  const tasks = await db.query(
    `SELECT *  
    FROM todos 
    INNER JOIN "sTasks"
    ON todos.id = "sTasks".todo_id where "todos".id=${req.params.id}`,
    {
      type: QueryTypes.SELECT,
    }
  )

  const statusCompleted = tasks.filter((task) => task.status === 1)

  console.log(statusCompleted)

  res.send({ todo_id: statusCompleted[0].todo_id, statusCompleted })
})

export {
  getTasks,
  createParentTask,
  createSubTask,
  updateTask,
  updateSubTask,
  getSubTasks,
}
