import express from 'express'
import type { Response, Request } from 'express'
import cors from 'cors'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import path from 'path'
import { errorHandler } from './middlewares/errorHandler'

// @Routes Import
import authRoute from './routes/admin/authRoute'
import htmlContainerRoute from './routes/admin/htmlContainerRoute'

const app = express()

app.use(express.json())
app.use(errorHandler)
app.use(morgan('dev'))
app.use(cookieParser())

const allowedOrigins = [
  /^http:\/\/localhost:(3000|3001)$/, 
  /^https:\/\/fatima-a-call-to-salvation\.vercel\.app$/,
  /^https:\/\/.*\.vercel\.app$/,
  /^https:\/\/fatimacalltosalvation\.com$/,
  /^https:\/\/www\.fatimacalltosalvation\.com$/,
]

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) {
        callback(null, true)
        return
      }

      const isAllowed = allowedOrigins.some((pattern) => pattern.test(origin))

      if (isAllowed) {
        callback(null, true)
        return
      }

      callback(null, false)
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
)

app.get('/api/health', (req, res) => {
  res.status(200).json({ 
    message: "API is healthy",
    status: "ok",
    timestamp: new Date().toISOString()
  })
})


// @Default Endpoint
app.use('/api/auth', authRoute)
app.use('/api/html-container', htmlContainerRoute)

app.use('/test', (req: Request, res: Response) => {
    res.send('Test route is working!')
})

export default app