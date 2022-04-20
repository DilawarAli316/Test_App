import { Sequelize } from 'sequelize'

const db = new Sequelize('task', 'postgres', 'kazmi619', {
  host: 'localhost',
  dialect: 'postgres',
  port: 8000,
})

export default db
