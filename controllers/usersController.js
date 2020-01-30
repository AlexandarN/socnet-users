     // 1) IMPORTING NPM PACKAGEs and NODE MODULEs	
	
	// 2) IMPORTING our custom files (MODELs, MIDDLEWAREs, ...)	
const User = require('../models/User');

	
	// 3) CONSTANTs	

	
	// 4) CONTROLLERs	
exports.getUsers = async (req, res, next) => {
	try {
			// Get all users from DB
		const users = await User.find().sort('rb');
			// Send response 
		res.render('users_list', {
			title: 'SocNet - Users',
			users
		});
	} catch(err) {
		console.log(err);
	}
}


exports.getUser = async (req, res, next) => {
	try {
			// Get current user from DB
		const user = await User.findOne({rb: req.params.id}).populate({path: 'frnds', populate: {path: 'frnds'}});
			// Get current user's friends
		const friends = user.friends;
			// Add current user to array of his friends
		const excludes = [...friends];
		excludes.push(user.rb);
			// Get all users excluding current user and his direct friends
		const notFriends = await User.find({rb: {$nin: excludes}}).populate('frnds');
		// console.log(user.rb);
		// console.log(friends);
		// console.log(excludes);
		// console.log(notFriends.length);
			// For each notFriend count mutual friends with the current user
		let suggested = [];
		notFriends.forEach(notFriend => {
			let counter = 0;
			notFriend.friends.forEach(fr => {
				if(user.friends.includes(fr)) {
					return counter++;
				}
			});
			if(counter >= 2) {
				return suggested.push(notFriend);
			}
		});
		// console.log(suggested);
			// Send response
		res.render('user', {
			title: user.firstName + ' ' + user.surname,
			user,
			suggested
		});
	} catch(err) {
		console.log(err);
	}
}





