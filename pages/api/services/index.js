import Service from '@/model/service';
import connectDB from '../lib/connectDB';
import { verifyToken } from '../lib/verifyJWT';
import mongoose from 'mongoose';

async function handler(req, res) {
    if(req.method !="GET"){
        return res.status(403).json({message:"Message not allowed"});
    }
    await connectDB();
    const userId = new mongoose.Types.ObjectId(req.user._id);
    console.log(userId);
    
    const services = await Service.aggregate([
        {
            $lookup: {
                from: "userservices",
                let: { serviceId: "$_id" }, // Pass the service _id from Service
                pipeline: [
                    { 
                        $match: { 
                            $expr: { 
                                $and: [
                                    { $eq: ["$service_id", "$$serviceId"] },  // Match service_id
                                    { $eq: ["$user_id", userId] }  // Match user_id
                                ]
                            }
                        }
                    }
                ],
                as: "service_details"
            }
        },
        {
            $project: {
                _id:1,
                service_name:1,
                service_url:1,
                permissions:1,
                isConnected: { $gt: [{ $size: "$service_details" }, 0] }  // Return true if there's a match
            }
        }
    ]);
    
    return res.json(services);
}


export default (req, res) => verifyToken(req, res, () => handler(req, res));