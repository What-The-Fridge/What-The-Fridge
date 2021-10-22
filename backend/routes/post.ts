import express from 'express';
const router = express.Router();

// import functions from controller
const createPost = require('../controller/post/createPost');
const deletePost = require('../controller/post/deletePost');
const getPost = require('../controller/post/getPost');

// specify endpoints
router.post('/createPost', createPost);
router.delete('/deletePost/:id', deletePost);
router.get('/getPost/:id', getPost);

module.exports = router;
