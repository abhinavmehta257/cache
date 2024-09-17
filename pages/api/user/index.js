import { verifyToken } from "../lib/verifyJWT";
import User from "@/model/user"


const handler = async (req,res)=>{
    if(req.method =="GET"){
        const {username, email} = await User.findOne({_id:req.user._id});
        return res.json({username,email});
    }

    if(req.method =="POST"){
        const {username, email} = req.body;
        const user = await User.findOne({_id:req.user._id});
        await user.save({
            ...user,
            username,
            email
        });
        return res.json(user);
    }
}

export default (req, res) => verifyToken(req, res, () => handler(req, res));