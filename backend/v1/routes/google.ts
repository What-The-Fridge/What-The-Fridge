import express from 'express';
const router = express.Router();

// import from controller
const login = require('../controller/google/login.ts');
const logout = require('../controller/google/logout.ts');

// specify endpoints
router.post('/login/:token', login);
router.delete('/logout', logout);

module.exports = router;
