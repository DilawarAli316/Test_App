import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import morgan from 'morgan'
import db from './config/db.js'
import taskRoutes from './routes/taskRoutes.js'

dotenv.config()

try {
  await db.authenticate()
  console.log('Postgres connected successfully')
} catch (error) {
  console.error('Error', error)
}

const app = express()

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

app.use(
  cors({
    origin: '*',
  })
)

app.use(express.json())

app.use('/api/task', taskRoutes)

app.get('/', (req, res) => {
  res.send('The GET API IS RUNNING.....')
})

const PORT = 5000

app.listen(PORT, console.log(`Server is running on port ${PORT}`))
