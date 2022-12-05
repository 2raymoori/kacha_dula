const profileSchema = require('../Model/Profile.Model');


const addProfile=async(req,res)=>{
    try {
        console.log('#############################################################');
        console.log(req)
        if(req.files){
            const img  = req.files.pImage;
            const fExtension = img.name.split(".")[img.name.split(".").length-1];
            img.mv(`./ProfileImgs/lot.${fExtension}`);
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