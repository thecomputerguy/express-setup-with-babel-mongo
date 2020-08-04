import {Router} from "express"

const router = Router()

router.get('/', async (req, res)=>{
    return res.json({user: await req.context.models.User.findById(req.context.me.id)})
})

export default router