import express from 'express'
import cors from 'cors'

import logger from './middlewares/logger.js'
import routes from './routes/index.js'

const app = express()

app.use(cors())
app.use(express.json())
app.use(logger)

app.use('/', routes)

export default app
