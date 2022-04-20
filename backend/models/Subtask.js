import { Sequelize, DataTypes } from 'sequelize'
import db from '../config/db.js'

const SubTask = db.define('sTask', {
  title: {
    type: DataTypes.STRING,
  },
  status: {
    type: DataTypes.INTEGER, // 0 = pending , 1 = completed
    defaultValue: 0,
  },
})

export default SubTask
