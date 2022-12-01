const bcryptjs = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const hashPassword = async (password)=>{
    const salt  = await bcryptjs.genSalt(config.get('hashPasswordKey'));
    const hashPassword = await bcryptjs.hash(password,salt);
    return hashPassword;
}
const comparePassword = async (hashPass,rawPass)=>{
    return true;
}

const tokenGen = (userId,userEmail,fName,lName)=>{
    const privateKey = config.get('privateKey');
    //
    const payload = {
        id:userId,
        email:userEmail,
        name:`${fName} ${lName}`
    }
    const token = jwt.sign(
        payload,
        privateKey,
        {
          expiresIn: "2h",
        }
      );
      return token;

}

module.exports ={
    hashPassword,
    comparePassword,
    tokenGen
}