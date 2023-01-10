const PostSchema = require('../Model/Post.Model');
const { validationResult } = require("express-validator");
const PostModel = require('../Model/Post.Model');
const { find } = require('../Model/Post.Model');
const CommentModel = require('../Model/Comment.Model');
const addComment = async(req,res)=>{
    try {
        const err = validationResult(req).errors;
        if (validationResult(req).errors.length === 0) {
            const userId = "6391ea8dac08fb6e051c2ab2";
            const postIdComment = req.params.postid;
          const {content} =req.body;
          // console.log(req);
          const newComment = new CommentModel();
            newComment.user = userId;
            newComment.post = postIdComment;
            newComment.content = req.body.content; 
      
          await newComment.save();
          return res.status(200).json(newComment);

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
const modifyComment = async(req,res)=>{  
  try {
      const userId = "6391ea8dac08fb6e051c2ab2";
    const { content} =req.body;
    const commentToUpdate = await CommentModel.findById(req.params.id);
    if(commentToUpdate){
      console.log("Found Something");
      if(content){
        commentToUpdate.content = content;
        await commentToUpdate.save();
      }
      return res.status(200).json(commentToUpdate);
    }else{
      return res.status(201).json({"status":"error","msg":"Sorry there exists no post with such id."})
    }   
} catch (error) {
  console.log(error);
  return res.status(500).json({
    status: "Error",
    msg: { info: "Sorry There exittss an error in the server" },
  });
  
}
}
const deleteComment = async(req,res)=>{
  try {
    const commentId = req.params.id;
    const uId = "6391ea8dac08fb6e051c2ab2";// req.user.id;
    const commentToDelete = await CommentModel.findOneAndRemove({"_id":commentId,"user":uId});
    //  console.log(postToDelete)
    if(commentToDelete){
      console.log("Post Todelete");
      console.log(commentToDelete);
      return res.status(200).json(commentToDelete);
    }else{
      return res.status(201).json({"status":"error","msg":"Sorry there exists no Comment with such id or User."})
    }
    console.log(postId);
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      status: "Error",
      msg: { info: "Sorry There exittss an error in the server" },
    });
  }
}
const allComment = async(req,res)=>{
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
const getComment = async(req,res)=>{
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
const likeComment = async(req,res)=>{
  try {
    const userId = "6391ea8dac08fb6e051c2ab2";
    const commentId = req.params.commentId;
    const commentToLike = await CommentModel.findById(commentId);
    if(commentToLike){
      let flag = false;
      for(let tracker = 0; tracker <commentToLike.likes.length; tracker++){
        if(commentToLike.likes[tracker].id ===userId){
          flag = true;
          break;
        }
      }

    if(!flag){
        commentToLike.likes.push(userId);
      await commentToLike.save();
      return res.status(200).json({"status":"Success","msg":"Comment successfully Liked"});
    }else{
      return res.status(201).json({"status":"Error","msg":"User already liked the Comment"});
    }
    }else{
      return res.status(201).json({"status":"Error","msg":"Sorry No such Comment in the system."});
    }
  }  catch (error) {
    console.log(error)
    return res.status(500).json({
      status: "Error",
      msg: { info: "Sorry There exittss an error in the server" },
    });
  }
}
const disLikeComment = async(req,res)=>{
  try {
    console.log("Deleting a post like...");
    const userId = "6392502e54dd21f8dc202633";
    const commentId = req.params.commentId;
    const commentTodislike = await CommentModel.findById(commentId);
    if(commentTodislike){
      let flag = false;
      let idPosToRemove = -1;
      for(let tracker = 0; tracker <commentTodislike.likes.length; tracker++){
        if(commentTodislike.likes[tracker].id ===userId){
          flag = true;
          idPosToRemove = tracker;
          break;
        }
      }

    if(flag){
        commentTodislike.likes.splice(idPosToRemove,1);
      await commentTodislike.save();
      return res.status(200).json({"status":"Success","msg":"Comment Like successfully Deleted"});
    }else{
      return res.status(201).json({"status":"Error","msg":"User didn't like the Comment yet"});
    }
    }else{
      return res.status(201).json({"status":"Error","msg":"Sorry No such post in the system."});
    }
  }  catch (error) {
    return res.status(500).json({
      status: "Error",
      msg: { info: "Sorry There exittss an error in the server" },
    });
  }

}
module.exports = {
    addComment,
    modifyComment,
    deleteComment,
    allComment,
    getComment,
    likeComment,
    disLikeComment
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