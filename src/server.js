import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import bodyParser, { json } from 'body-parser'
import {users, messages} from './models/users'
import routes from './routes'

dotenv.config()

const port = process.env.PORT || 3009

const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

app.use((req, res, next) => {
    req.context = {
        models: {users,messages},
        me : messages[1]
    } 
    next()
})

app.use('/session', routes.session)
app.use('/users', routes.users)
app.use('/messages', routes.messages)

app.listen(port, () => console.log(`App started on port ${port}`))