import express from 'express';
const router = express.Router();

// import from controller
const authenticate = require('../controller/google/authenticate.ts');
const checkAuth = require('../controller/google/checkAuth.ts');
const logout = require('../controller/google/logout.ts');
const me = require('../controller/google/me.ts');

// specify endpoints
router.post('/authenticate/:token', authenticate);
router.use(checkAuth);
router.delete('/logout', logout);
router.get('/me', me);

module.exports = router;
