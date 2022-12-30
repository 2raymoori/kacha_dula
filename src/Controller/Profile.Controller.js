const profileSchema = require('../Model/Profile.Model');


const addProfile=async(req,res)=>{
    try {
        console.log('#############################################################');
        const searchUserProfile = await profileSchema.find();
        console.log(searchUserProfile);
        if(searchUserProfile.length >0){   
            return res.status(201).json({
            status: "Error",
            msg: {
              info: "Sorry There exists an error. Already A profile exists in the System associated to this user.",
            },
          });
            console.log("There exists a user in the system with this profile.");
        }else{ 
            const {gender,nationality,pno} = req.body;
            const newProfile = new profileSchema();
            if(req.files){
                const img  = req.files.pImage;
                const fExtension = img.name.split(".")[img.name.split(".").length-1];
                const imgName = `${req.user.id}.${fExtension}`;
                img.mv(`./ProfileImgs/${imgName}`);
                newProfile.img = imgName;
            }
            newProfile.pno = pno;
            newProfile.user = req.user.id;
            newProfile.gender = gender;
            newProfile.nationality = nationality;
            newProfile.status = 1;
            newProfile.friends = [];
            await newProfile.save();
            return res.status(200).json({
              status: "Success",
              msg: { info: "Profile Successfully Saved", data: newProfile },
            });
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
        
    const curId = req.params.id;
    const findProfile = await profileSchema.findById(curId);
    if (findProfile === null) {
      return res.status(201).json({
        status: "Error",
        msg: { info: "Sorry No Such profile in the System with this Id" },
      });
    }
    
    return res.status(200).json({
      status: "Success",
      msg: { data: findProfile },
    });

        
    } catch (error) {
        return res.status(500).json({
          status: "Error",
          msg: { info: "Sorry There exittss an error in the server" },
        });
        
    }

}
const allProfile=async(req,res)=>{
    try {
        const profiles = await profileSchema.find(
          {},
          {
            password: 0,
          }
        );
        // console.log(users);
        return res.status(200).json({
          status: "Success",
          msg: { data: profiles },
        });
      } catch (error) {
        return res.status(500).json({
          status: "Error",
          msg: { info: "Sorry There exits an error in the server" },
        });
      }

}
const deleteProfile=async(req,res)=>{
  try {
    const curId = req.params.id;
    const findProfile = await profileSchema.findByIdAndDelete(curId);
    if (findProfile === null) {
      return res.status(201).json({
        status: "Error",
        msg: { info: "Sorry No Such profile in the System with this Id" },
      });
    }
    return res.status(200).json({
      status: "Success",
      msg: { data: findProfile },
    });
  } catch (error) {
    console.log(error);
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