const profileSchema = require('../Model/Profile.Model');


const addProfile=async(req,res)=>{
    try {
        console.log('#############################################################');
        
        if(req.files){
            const img  = req.files.pImage;
            const fExtension = img.name.split(".")[img.name.split(".").length-1];
            //img.mv(`./ProfileImgs/lot.${fExtension}`);
        }
        const {gender,nationality,pno} = req.body;
        const searchUserProfile = profileSchema.find();
        console.log(searchUserProfile);
        if(searchUserProfile){
            console.log("There exists a user in the system with this profile.");
        }else{
            console.log("No profile associated with this id. Go ahead and add...");
        }
        console.log('#############################################################');
    } catch (error) {
        console.log(error)
        return res.status(500).json({
          status: "Error",
          msg: { info: "Sorry There exittss an error in the server" },
        });
        
    }

}
const profile=async(req,res)=>{
    try {
        
    } catch (error) {
        return res.status(500).json({
          status: "Error",
          msg: { info: "Sorry There exittss an error in the server" },
        });
        
    }

}
const allProfile=async(req,res)=>{
    try {
        console.log(req.user);
        console.log("Fetching all Profile for What ever reason...")
    } catch (error) {
        return res.status(500).json({
          status: "Error",
          msg: { info: "Sorry There exittss an error in the server" },
        });
        
    }

}
const deleteProfile=async(req,res)=>{
    try {
        
    } catch (error) {
        return res.status(500).json({
          status: "Error",
          msg: { info: "Sorry There exittss an error in the server" },
        });
        
    }

}
const modifyProfile=async(req,res)=>{
    try {
        
    } catch (error) {
        return res.status(500).json({
          status: "Error",
          msg: { info: "Sorry There exittss an error in the server" },
        });
        
    }

}

module.exports = {
    addProfile,
    allProfile,
    deleteProfile,
    modifyProfile,
    profile
}