import { DataTypes } from 'sequelize'
import db from '../config/db.js'
import Task from './Subtask.js'

const Todo = db.define('todo', {
  title: {
    type: DataTypes.TEXT,
  },
  status: {
    type: DataTypes.INTEGER, // 0 = pending , 1 = completed
    defaultValue: 0,
  },
})

Todo.hasMany(Task, {
  foreignKey: 'todo_id',
})
Task.belongsTo(Todo, {
  foreignKey: 'todo_id',
})

await db.sync() // create a user table

export { Todo }
