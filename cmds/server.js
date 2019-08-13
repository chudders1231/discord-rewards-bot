let Discord = module.require("discord.js");
const fetch = require('node-fetch');

module.exports.run = async (bot, message, args) => {

	let info = await fetch('https://gmod-servers.com/api/?object=servers&element=detail&key=IrfLCOYgrHQhupmE3UGDyv7D5zHA2G7Am84').then(response => response.json());
	let online;
	if(info.is_online === "1") {
		online = "Online";
	} else {
		online = "Offline";
	}
	let embed = new Discord.RichEmbed()

		.setTitle(`${info.name}`)
		.setColor("#9B59B6")
		.addField("IP", `${info.address}:${info.port}`)
		.addField("Location", `${info.location}`)
		.addField("Status", `${online}`)
		.addField("Players", `${info.players}/${info.maxplayers}`)

	message.channel.send({embed: embed});

}

module.exports.help = {
	name: "server",
	description: "Shows you the current test server's info!"
}