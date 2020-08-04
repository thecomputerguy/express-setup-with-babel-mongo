import {Router} from "express"
import {v4 as uuid} from "uuid"
import moment from "moment"

const router = Router()

router.get('/', (req, res) => {
    return res.status(200).json({messages: req.context.models.messages})
})

router.get('/:messageId', (req, res) => {
    return res.status(200).json({message: req.context.models.messages[req.params.messageId]})
})

router.post('/', (req, res) => {
    const id = uuid()
    const message = {
        id,
        text: req.body.text,
        date: moment.utc(req.body.date),
        count: Number(req.body.count),
        userId: req.context.me.id
    }
    req.context.models.messages[id] = message

    return res.json({message})
})

router.delete('/:messageId', (req, res) => {
    const {[req.params.messageId]: message, ...otherMessages} = req.context.models.messages
    req.context.models.messages = otherMessages
    return res.json({message})
})

export default router