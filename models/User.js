     // 1) IMPORTING NPM PACKAGEs and NODE MODULEs	
const mongoose = require('mongoose');

     // 2) IMPORTING our custom files (MODELs, MIDDLEWAREs, ...)	

     // 3) CONSTANTs


     // 4)  MODEL SCHEMA	
const userSchema = new mongoose.Schema({	
     rb: {
          type: Number
          // unique: true
     },
     firstName: {
          type: String,				     									   
          // required: [true, 'User must have a first name'],                     
          trim: true
     },		
     surname: {
          type: String,				     									   
          // required: [true, 'User must have a last name'],
          default: '   ',                     
          trim: true
     },		
     age: {
          type: Number,				     									   
          // required: [true, 'User must have an age']
     },	
     gender: {
          type: String,				     									   
          // required: [true, 'User must have a name'],                     
          trim: true,
          enum: {
			values: ['male', 'female'],
			message: 'Gender must be either: male or female!'	      
		}	
     },	
     friends: [Number],
     frnds: [
          {
               type: mongoose.Schema.Types.ObjectId,
               ref: 'User'
          }
     ]		
});								             
                    

     // 5) VIRTUAL PROPERTIES  	       
     
     
     // 6) MODEL METHODS	


     // 7) MIDDLEWAREs (HOOKs)


     // 8) EXPORT MODEL  
module.exports = mongoose.model('User', userSchema);    
     