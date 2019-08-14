const fs = require("fs");
let Discord = module.require("discord.js");

module.exports.run = async (bot, message, args) => {

	fs.readdir("./", (err, files) => {
		if(err) console.error(err);

		let jsFiles = files.filter(f => f.split(".").pop() === "js");

		if(jsFiles.length <= 0) {
			console.log("No commands to index");
			return;
		}

		console.log(`Loading ${jsFiles.length} commands!`)	;
		jsFiles.forEach((f, i) => {
			let message = "```${bot.commands[${f}]}\n```"

			message.channel.send(message);
		});
	});

	msg.delete();

}

module.exports.help = {
	name: "cmdlist",
	description: "Shows the list of commands and parameters!"
}