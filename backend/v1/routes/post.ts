import express from 'express';
const router = express.Router();

// import functions from controller
const createPost = require('../controller/post/createPost');
const deletePost = require('../controller/post/deletePost');
const getPost = require('../controller/post/getPost');
const checkAuth = require('../controller/google/checkAuth');

// check authentication before every request
router.use(checkAuth);

// specify endpoints
router.post('/createPost', createPost);
router.delete('/deletePost/:id', deletePost);
router.get('/getPost/:id', getPost);

module.exports = router;
