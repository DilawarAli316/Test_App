import dotenv from 'dotenv'
import { Todo } from './models/Todo.js'
import todo from './data/todo.js'
import SubTask from './models/Subtask.js'
import subtask from './data/subtask.js'
import db from './config/db.js'

dotenv.config()

await db.sync()

const importData = async () => {
  try {
    await Todo.destroy({})
    await SubTask.destroy({})

    await Todo.bulkCreate(todo) // inserting all the users in User Model

    await SubTask.bulkCreate(subtask) // inserting that product in Product Model

    console.log('Data Imported!')
    process.exit()
  } catch (error) {
    console.log(`${error}`)
    process.exit(1)
  }
}

const destroyData = async () => {
  // try {
  //   await Order.deleteMany()
  //   await User.deleteMany()
  //   await Product.deleteMany()
  //   console.log('Data Destroyed!'.red.inverse)
  //   process.exit()
  // } catch (error) {
  //   console.log(`${error}`.red.inverse)
  //   process.exit(1)
  // }
}

if (process.argv[2] === '-d') {
  destroyData()
} else {
  importData()
}
