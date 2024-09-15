import UserService from "@/model/userService";
import mongoose from "mongoose";

export async function saveToken(access_token,refresh_token,token_expires_at,user_name,service_id,user_id){
  const existingService = await UserService.findOne({
    user_name: user_name,
  });

  const data = {
        user_id:new mongoose.Types.ObjectId(user_id),
        user_name:user_name,
        service_id:new mongoose.Types.ObjectId(service_id),
        access_token:access_token,
        refresh_token:refresh_token,
        token_expires_at:token_expires_at,
      };
      try{
        if (!existingService) {
          const newService = new UserService(data);
        
          await newService.save();
          return newService;
        } else {
          existingService.access_token = access_token;
          existingService.refresh_token = refresh_token;
          existingService.token_expires_at = new Date(Date.now() + token_expires_at * 1000);
          existingService.updated_at = new Date();
        
          await existingService.save();
          return existingService;
        }
      }catch(err){
        console.log(err);
        
        return null;
      }

      
}

export async function getToken(userId,service_id){
  console.log(userId,service_id);
  
    const {access_token,user_name} = await UserService.findOne({user_id:userId,service_id:service_id});
    console.log({access_token,user_name});
    
    return {access_token,user_name};
}



