/* eslint-disable import/newline-after-import */
     // 1) IMPORTING NPM PACKAGEs and NODE MODULEs	
const mongoose = require('mongoose');	                                                    
const fs = require('fs');
     // To avoid some deprication warnings
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

     // 2) IMPORTING our custom files
const env = require('../config/env');     
const User = require('../models/User'); 			


	// 3) CONSTANTs								    
// eslint-disable-next-line prefer-template
const MONGODB_URI  = 'mongodb+srv://' + env.MONGODB_USER + ':' + env.MONGODB_PASSWORD + '@cluster0-eyxah.mongodb.net/' + env.MONGODB_DEFAULT_DB;
// const MONGODB_URI  = 'mongodb://localhost/natours'; 


	// 6) DB CONNECTION to APP. SERVER			 
mongoose.connect(MONGODB_URI, {useNewUrlParser: true});       	       
const db = mongoose.connection;							    
db.on('error', console.error.bind(console, 'connection error:'));           
db.once('open', () => {
     console.log('Connected to DB, ready for seeding ...'); 
});

     // 7) READ JSON file which contains data 
const users = JSON.parse(fs.readFileSync(`${__dirname}/../data/data.json`));

     // 8) Function - DELETE existing DATA from DB
const deleteData = async () => {
     try {
          await User.deleteMany();
          console.log('Data deleted successfully from the DB!');
     } catch (err) {
          console.log(err);
     }
     process.exit();
}

     // 9) Function - IMPORT DATA into DB
const importData = async () => {
     try {
          await User.create(users, { validateBeforeSave: false });   
          console.log('Data imported successfully into the DB!');
     } catch (err) {
          console.log(err);
     }
     process.exit();
}

     // 10) INITIATE IMPORT and/or DELETE functions - using Terminal CLI (process.argv is a property of any command in Terminal and represents an array of the parts of a command in Terminal)
if(process.argv[2] === '--import') {
     importData();
} else if(process.argv[2] === '--delete') {
     deleteData();
}