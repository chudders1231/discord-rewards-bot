let Discord = module.require("discord.js");

module.exports.run = async (bot, message, args) => {

		let embed = new Discord.RichEmbed()
			.setAuthor(message.author.username, message.author.displayAvatarURL)
			.setColor("#9B59B6")
			.addField("Full Username", `${message.author.username}#${message.author.discriminator}`)
			.addField("ID", message.author.id)
			.addField("Created At", message.author.createdAt)
			.setThumbnail(message.author.displayAvatarURL)

		message.channel.send({embed: embed});

		return;
}

module.exports.help = {
	name: "userinfo",
	description: "Shows you current info about a specific ip !"
}