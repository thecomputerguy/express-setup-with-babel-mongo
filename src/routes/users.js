import {Router} from "express"

const router = Router()

router.get('/', async (req, res) => {
    return res.json({users: Object.values( await req.context.models.User.find())})
})

router.get('/:userId', async (req, res) => {
    return res.json({user: await req.context.models.User.findById(req.params.userId)})
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