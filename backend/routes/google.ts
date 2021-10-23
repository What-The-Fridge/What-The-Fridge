import express from 'express';
const router = express.Router();

// import from controller
const authenticate = require('../controller/google/authenticate.ts');

// specify endpoints
router.post('/authenticate/:token', authenticate);

module.exports = router;
