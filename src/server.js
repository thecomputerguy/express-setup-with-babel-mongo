import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import bodyParser, { json } from 'body-parser'
import models, {connectToDb} from './models'
import routes from './routes'

dotenv.config()

const port = process.env.PORT || 3009

const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

app.use(async (req, res, next) => {
    req.context = {
        models,
        me : await models.User.findByLogin('Alex')
    } 
    next()
})

app.use('/session', routes.session)
app.use('/users', routes.users)
app.use('/messages', routes.messages)
app.get('*', (req, res, next) => {
    const error = new Error(
        `${req.ip} tried to access ${req.originalUrl}`
    )
    error.statusCode = 301
    next(error)
})

app.use((err, req, res, next) => {
    if(!err.statusCode) err.statusCode = 500
    if(err.statusCode === 301) return res.status(301).redirect('/not-found')

    return res.status(err.statusCode).json({error: err.toString()})
})

const eraseDatabaseOnSync = true
connectToDb().then(async () => {
    if(eraseDatabaseOnSync){
        await Promise.all([
            models.User.deleteMany({}),
            models.User.deleteMany({})
        ])
    }
    //Seed data
    createUsersWithMessages()
    app.listen(port, () => console.log(`App started on port ${port}`))
}).catch((err) => {
    console.log(err)
});

const createUsersWithMessages = async () => {
    const user1 = new models.User({
        username: 'Varun Sharma'
    })
    
    const user2 = new models.User({
        username: 'Alex'
    })

    const message1 = new models.Message({
        text: 'Published the app',
        user: user1.id
    })

    const message2 = new models.Message({
        text: 'Tested the app',
        user: user2.id
    })

    await message1.save()
    await message2.save()
    await user1.save()
    await user2.save()
}

