let Discord = module.require("discord.js");
const fs = require("fs");

module.exports.run = async (bot, message, args) => {

if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("You do not have the permission to unmute that person!");

		let toMute = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
		if(!toMute) return message.channel.send("You did not specify a user mention or ID!");

		if(toMute.id === message.author.id) return message.channel.send("You cannot unmute yourself.");
		if(toMute.highestRole.position >= message.member.highestRole.position) return message.channel.send("You cannot unmute a member who is higher or has the same role as you!");

		let role = message.guild.roles.find(r => r.name === "CB Muted");

		if (!role || !(toMute.roles.has(role.id))) return message.channel.send("This user is not muted!");

		await toMute.removeRole(role);
		message.channel.send("I have unmuted them!");

		delete bot.mutes[toMute.id];

		fs.writeFile("./mutes.json", JSON.stringify(bot.mutes), err=> {
		if(err) throw err;
			console.log(`I have unmuted ${toMute.user.tag}.`);
		});

		return;
}

module.exports.help = {
	name: "unmute"
}