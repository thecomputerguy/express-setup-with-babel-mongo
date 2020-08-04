import {Router} from "express"

const router = Router()

router.get('/', (req, res)=>{
    return res.json({user: req.context.models.users[req.context.me.id]})
})

export default router