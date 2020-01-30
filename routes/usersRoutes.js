/* eslint-disable import/newline-after-import */
     // 1) IMPORTING NPM PACKAGEs and NODE MODULEs	
const express = require('express');


	// 2) IMPORTING our custom files (CONTROLLERs, MIDDLEWAREs, ...)	
const usersController = require('../controllers/usersController');



	// 3) CONSTANTs	
const router = express.Router();


	// 4.3) CRUD ROUTEs	
router.route('/')
	.get(usersController.getUsers);

router.route('/user/:id')
	.get(usersController.getUser);

	

	// 5) EXPORT ROUTER	
module.exports = router;

