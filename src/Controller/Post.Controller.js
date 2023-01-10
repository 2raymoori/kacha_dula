const PostSchema = require('../Model/Post.Model');
const { validationResult } = require("express-validator");
const PostModel = require('../Model/Post.Model');
const addPost = async(req,res)=>{
    try {
        const err = validationResult(req).errors;
        if (validationResult(req).errors.length === 0) {
            const userId = "6391ea8dac08fb6e051c2ab3";
          const { title, content} =req.body;
          // console.log(req);
          const imageNames = [];
          const newPost = new PostSchema();
          if(req.files){
            let fileKeys = Object.keys(req.files);
            fileKeys.map(e=>{
            let curImg = req.files[e];
            const fExtension = curImg.name.split(".")[curImg.name.split(".").length-1];
            
            const imgName = `${curImg.name.split(".")[0]}.${fExtension}`;
            curImg.mv(`./postImages/${userId}/${imgName}`);
            imageNames.push(imgName);
            });
            newPost.user = userId;
            newPost.title = req.body.title;
            newPost.content = req.body.content; 
            if(imageNames.length > 0){
              newPost.images = imageNames;
            };
          }
          await newPost.save();
          return res.status(200).json(newPost);

          console.log(title+" :sdfsd "+content);        
        } else {
          return res.status(201).json({
            status: "Error",
            msg: { info: "Sorry There exists an error in the System.", data: err },
          });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
          status: "Error",
          msg: { info: "Sorry There exittss an error in the server" },
        });
        
    }
}
const modifyPost = async(req,res)=>{  
  try {
      const userId = "6391ea8dac08fb6e051c2ab3";
    const { title, content} =req.body;
    const postToUpdate = await PostSchema.findById(req.params.id);
    if(postToUpdate){
      console.log("Found Something");   
       if(title){
        postToUpdate.title = title;
      }
      if(content){
        postToUpdate.content = content;
      }
      if(title || content){
        await postToUpdate.save();
      }
      return res.status(200).json(postToUpdate);
    }else{
      return res.status(201).json({"status":"error","msg":"Sorry there exists no post with such id."})
    }
  console.log("Updating Post");;

    

    // console.log(req);
    // const imageNames = [];
    // if(req.files){
    //   let fileKeys = Object.keys(req.files);
    //   fileKeys.map(e=>{
    //   let curImg = req.files[e];
    //   const fExtension = curImg.name.split(".")[curImg.name.split(".").length-1];
      
    //   const imgName = `${curImg.name.split(".")[0]}.${fExtension}`;
    //   curImg.mv(`./postImages/${userId}/${imgName}`);
    //   imageNames.push(imgName);
    //   });
    //   const newPost = new PostSchema();
    //   newPost.user = userId;
    //   newPost.title = req.body.title;
    //   newPost.content = req.body.content; 
    //   if(imageNames.length > 0){
    //     newPost.images = imageNames;
    //   };

    // }
    await newPost.save();
    return res.status(200).json(postToUpdate);

    console.log(title+" :sdfsd "+content);    
} catch (error) {
  console.log(error);
  return res.status(500).json({
    status: "Error",
    msg: { info: "Sorry There exittss an error in the server" },
  });
  
}
}
const deletePost = async(req,res)=>{
  try {
    const postId = req.params.id;
    const uId = "6392502e54dd21f8dc202633";// req.user.id;
    const postToDelete = await PostModel.findOneAndRemove({"_id":postId,"user":uId});
    // console.log(postToDelete)
    if(postToDelete){
      res.status(200).json({

      })
      console.log("Post Todelete");
      console.log(postToDelete);
      return res.status(200).json(postToDelete);
    }else{
      return res.status(201).json({"status":"error","msg":"Sorry there exists no post with such id or User."})
    }
    console.log(postId);
  } catch (error) {
    return res.status(500).json({
      status: "Error",
      msg: { info: "Sorry There exittss an error in the server" },
    });
  }
}
const allPost = async(req,res)=>{
  try {
    const uId = "6391ea8dac08fb6e051c2ab4";// req.user.id;
    const allPostByUser = await PostModel.find({user:uId});
    if(allPostByUser.length > 0){
      return res.status(200).json(allPostByUser);
    }else{
      return res.status(201).json({"status":"error","msg":"Sorry there exists no post with such a User."})
    }
    console.log(postId);
  } catch (error) {
    return res.status(500).json({
      status: "Error",
      msg: { info: "Sorry There exittss an error in the server" },
    });
  }
}
const getPost = async(req,res)=>{
  try {
    const postId = req.params.id;
    const uId = "6391ea8dac08fb6e051c2ab3";// req.user.id;
    const postByUser = await PostModel.find({"_id":postId,"user":uId});
    console.log(postByUser)
    if(postByUser.length > 0){
      return res.status(200).json(postByUser);
    }else{
      return res.status(201).json({"status":"error","msg":"Sorry there exists no post with such a User."})
    }
    console.log(postId);
  } catch (error) {
    return res.status(500).json({
      status: "Error",
      msg: { info: "Sorry There exittss an error in the server" },
    });
  }
}
const likePost = async(req,res)=>{}
const disLikePost = async(req,res)=>{}
module.exports = {
    addPost,
    modifyPost,
    deletePost,
    allPost,
    getPost,
    likePost,
    disLikePost
}
/*
{
    "status": "Success",
    "msg": {
        "info": "LoginSuccess",
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzOTI1MDJlNTRkZDIxZjhkYzIwMjYzMyIsImVtYWlsIjoibG8ycmF5bW1vb3JpQGdtYWlsLmNvbSIsIm5hbWUiOiJMYW1pbiBPLiBUb3VyYXkiLCJpYXQiOjE2NzE2NTc0ODMsImV4cCI6MTY3MTY2NDY4M30.-ofQcHTCVepHXE5xEwO6SC0R_MVc-H8-CerFnQR9X28"
    }
}
*/