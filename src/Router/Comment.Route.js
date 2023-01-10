const express = require('express');
const {body} = require('express-validator');
const { addComment, allComment, getComment, deleteComment, modifyComment, likeComment, disLikeComment } = require('../Controller/Comment.Controller');

const Router = express.Router();
Router.post("/:postid",[body('content',"Sorry pelase provide a valid content for the Comment").notEmpty()],addComment);
Router.get("/all",allComment);
Router.get("/:id",getComment);
Router.delete("/:id",deleteComment);
Router.put("/:id",modifyComment);
Router.put("/like/:commentId",likeComment);
Router.put("/dislike/:commentId",disLikeComment);

module.exports = Router; 