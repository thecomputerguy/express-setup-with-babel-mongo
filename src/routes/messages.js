import {Router} from "express"
import moment from "moment"
import { BadRequestError } from "../utils/errors"

const router = Router()

router.get('/', async (req, res) => {
    return res.status(200).json({messages: await req.context.models.Message.find()})
})

router.get('/:messageId', async (req, res) => {
    return res.status(200).json({message: await req.context.models.Message.findById(req.params.messageId)})
})

router.post('/', async (req, res, next) => {
    const message = {
        text: req.body.text,
        date: moment.utc(req.body.date),
        count: Number(req.body.count),
        userId: req.context.me.id
    }

    const result = await req.context.models.Message.create(message).catch(error => next(new BadRequestError(error)))
    return res.json({result})
})

router.delete('/:messageId', async (req, res) => {
    const message = await req.context.models.Message.findById(req.params.messageId)
    if(message){
        await message.remove()
    }
    return res.json({message})
})

export default router