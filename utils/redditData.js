import UserService from "@/model/userService";
import mongoose from "mongoose";

export async function saveRedditToken(access_token,refresh_token,token_expires_at,user_name,service_id,user_id){
    const data = {
        user_id:new mongoose.Types.ObjectId(user_id),
        user_name:user_name,
        service_id:new mongoose.Types.ObjectId(service_id),
        access_token:access_token,
        refresh_token:refresh_token,
        token_expires_at:token_expires_at,
      };
    
      try{
        const userService = new UserService(data);
        await userService.save();
        return userService;
      }catch(err){
        console.log(err);
        
        return null;
      }

      
}

export async function getRedditToken(userId,service_id){
  console.log(userId,service_id);
  
    const {access_token,user_name} = await UserService.findOne({user_id:userId,service_id:service_id});
    console.log({access_token,user_name});
    
    return {access_token,user_name};
}