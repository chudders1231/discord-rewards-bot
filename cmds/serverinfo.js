let Discord = module.require("discord.js");
const fetch = require('node-fetch');
var query = require('game-server-query');

module.exports.run = async (bot, message, args) => {
	function formatDate(date) {

 		let monthNames = [
  		  "January", "February", "March",
  		  "April", "May", "June", "July",
  		  "August", "September", "October",
 		   "November", "December"
		];

		let days = [
		"Monday", "Tuesday", "Wednesday",
		"Thursday", "Friday", "Saturday",
		"Sunday"];

		var day = days[date.getDay() - 1]
 		var monthIndex = date.getMonth();
 		var year = date.getFullYear();
 		var date = date.getDate();

 		return ` ${day} ${date} ${monthNames[monthIndex - 1]} ${year}`;

	}

	if(!args[0]) return message.channel.send("This command requires an IP address to acquire the information!");
	let messageArray = args[0].split(":");
	if(!messageArray[1]) return message.channel.send("Make sure you include the port separating the ip and the port using ':'");
	await query(
  	  {
 	       type: 'garrysmod',
 	       host: `${args[0]}`
  	  },
 		async function (state) {

  	 	   	if(state.error){
  	 	    	console.log("Server is offline");
  		  
  		  	} else {
   	 	  		delete state.raw['rules'];

   	 	  			let info = await fetch('http://api.ipstack.com/check?access_key=7b83d9e28d5e35f60a0ecc3aa8df9089&output=json').then(response => response.json());

   	 	  			let dt = new Date()

   	 				let embed = new Discord.RichEmbed()
						
						.setTitle(`${state.name}`)
						.setColor("#9B59B6")
						.setDescription(`${args[0]}`)
						.addField("Players", `${state.raw.numplayers}/${state.maxplayers}`)
						.addField("Map", `${state.map}`)
						.addField("Test Field", `<html>Test</html>`)
						.setThumbnail('http://lofrev.net/wp-content/photos/2017/03/garrys_mod_logo.png')
						.setFooter(`Requested by ${message.author.username} - ${formatDate(dt)}`, message.author.avatarURL);

	message.channel.send({embed: embed});   		 
   		 	}

   	 	}

	);

}

module.exports.help = {
	name: "serverinfo",
	description: "Shows you current info about a specific ip !"
}