	// 1) IMPORTING NPM PACKAGEs and NODE MODULEs	
const express = require('express');  
// const path = require('path');

	// 1.1)  DEPLOYMENT PACKAGEs
const helmet = require('helmet');


	// 2) IMPORTING our custom files (ROUTEs, CONTROLLERs, MODELs, ...)	
const usersRoutes = require('./routes/usersRoutes');


	// 3) CONSTANTs
	// 3.1)  Express initatation			
const app = express();	
	

     // 4) VIEW ENGINE setting	
app.set('view engine', 'ejs');


	// 5) MIDDLEWAREs
	// 5.1) MIDDLEWAREs for setting a static PUBLIC folder  
app.use(express.static('public'));        

       
	// 5.8.2)  SETTING SECURITY HTTP HEADERS
app.use(helmet());



     // 5.9) ROUTES MIDDLEWAREs         
app.use('/', usersRoutes);	

	

	// 6) EXPORTING APP			 
module.exports = app;			

