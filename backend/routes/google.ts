import express from 'express';
const router = express.Router();

// import from controller
const authenticate = require('../controller/google/authenticate.ts');
const checkAuth = require('../controller/google/checkAuth.ts');
const logout = require('../controller/google/logout.ts');

// specify endpoints
router.get('/authenticate/:token', authenticate);
router.get('/', checkAuth);
router.delete('/logout', logout);

module.exports = router;
