let Discord = module.require("discord.js");

module.exports.run = async (bot, message, args) => {

		let embed = new Discord.RichEmbed()
			.setAuthor(message.author.username, message.author.displayAvatarURL)
			.setDescription("This is the user's info")
			.setColor("#9B59B6")
			.addField("Full Username", `${message.author.username}#${message.author.discriminator}`)
			.addField("ID", message.author.id)
			.addField("Created At", message.author.createdAt);

		message.channel.send({embed: embed});

		return;
}

module.exports.help = {
	name: "userinfo"
}