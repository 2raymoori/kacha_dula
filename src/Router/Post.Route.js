const express = require('express');
const { addPost, allPost, getPost, deletePost, modifyPost, likePost, disLikePost } = require('../Controller/Post.Controller');
const {body} = require('express-validator');

const Router = express.Router();
Router.post("/",[body('title',"Sorry A valid title is required").notEmpty(),body('content',"Sorry pelase provide a valid content for the post").notEmpty()],addPost);
Router.get("/all",allPost);
Router.get("/:id",getPost);
Router.delete("/:id",deletePost);
Router.put("/:id",modifyPost);
Router.put("/like/:postid",likePost);
Router.put("/delete/:postid",disLikePost);

module.exports = Router; 