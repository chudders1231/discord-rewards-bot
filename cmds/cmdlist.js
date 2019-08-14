module.exports.run = async (bot, message, args) => {

	fs.readdir("./", (err, files) => {
		if(err) console.error(err);

		let jsFiles = files.filter(f => f.split(".").pop() === "js");

		if(jsFiles.length <= 0) {
			console.log("No commands to load");
			return;
		}

		console.log(`Loading ${jsFiles.length} commands!`)	;
		jsFiles.forEach((f, i) => {
			let props = require(`./cmds/${f}`);;
			let message = "```Their Title\nBody text blah blah```"

			message.channel.send(message);
		});
	});

	msg.delete();

}

module.exports.help = {
	name: "cmdlist",
	description: "Shows the list of commands and parameters!"
}