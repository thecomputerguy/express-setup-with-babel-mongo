import {Router} from "express"
import { users } from "../models/users"

const router = Router()

router.get('/', (req, res) => {
    return res.json({users: Object.values(req.context.models.users)})
})

router.get('/:userId', (req, res) => {
    return res.json({user: req.context.models.users[req.params.userId]})
})

router.post('/', (req, res) => {
    return res.json({message: 'creating user'})
})

router.put('/:userId', (req, res) => {
    return res.json({message: `updated user with id ${req.params.userId}`})
})

router.delete('/:userId', (req, res) => {
    return res.json({message: `deleted user with id ${req.params.userId}`})
})

export default router