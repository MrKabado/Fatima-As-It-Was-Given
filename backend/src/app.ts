import express from 'express'
import type { Response, Request } from 'express'
import cors from 'cors'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import { errorHandler } from './middlewares/errorHandler'

// @Routes Import
import authRoute from './routes/admin/authRoute'
import htmlContainerRoute from './routes/admin/htmlContainerRoute'

const app = express()

app.use(express.json())
app.use(errorHandler)
app.use(morgan('dev'))
app.use(cookieParser())
app.use(cors({
    origin: ['https://fatima-a-call-to-salvation.vercel.app'],
    credentials: true,
}))

// @Default Endpoint
app.use('/api/auth', authRoute)
app.use('/api/html-container', htmlContainerRoute)

app.use('/test', (req: Request, res: Response) => {
    res.send('Test route is working!')
})

export default app