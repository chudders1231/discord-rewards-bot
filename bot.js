const prefix = "!";
const Discord = require("discord.js");
const fs = require("fs");
const express = require("express");
var app = express();

const bot = new Discord.Client({disableEveryone: true});
bot.commands = new Discord.Collection();
bot.mutes = require("./mutes.json");

fs.readdir("./cmds/", (err, files) => {
	if(err) console.error(err);

	let jsFiles = files.filter(f => f.split(".").pop() === "js");

	if(jsFiles.length <= 0) {
		console.log("No commands to load");
		return;
	}

	console.log(`Loading ${jsFiles.length} commands!`)	;
	jsFiles.forEach((f, i) => {
		let props = require(`./cmds/${f}`);;
		bot.commands.set(props.help.name, props);
	});
});

bot.on('ready', async () => {

	try {
		let link = await bot.generateInvite(["ADMINISTRATOR"]);
		console.log(link);
	} catch(e) {
		console.log(e.stack);
	}

	bot.setInterval(() => {
		for(let i in bot.mutes) {
			let time = bot.mutes[i].time;
			let guildId = bot.mutes[i].guild;
			if (!guildId) continue;

			let guild = bot.guilds.get(guildId);
			let member = guild.members.get(i);
			let mutedRole = guild.roles.find(r => r.name === "CB Muted");

			if(!mutedRole) continue;

			if(Date.now() >time) {
				member.removeRole(mutedRole);
				delete bot.mutes[i];

				fs.writeFile("./mutes.json", JSON.stringify(bot.mutes), err=> {
					if(err) throw err;
					console.log(`I have unmuted ${member.user.tag}.`);
				});
			};

		};
	}, 5000);

});

bot.on("message", async message => {
	if(message.author.bot) return;
	if(message.channel.type === "dm") return;

	let messageArray = message.content.split(" ");
	let command = messageArray[0];
	let args = messageArray.slice(1);

	if(!command.startsWith(prefix)) return;

	let cmd = bot.commands.get(command.slice(prefix.length));
	if(cmd) {
		cmd.run(bot, message, args)
		message.delete();
	};

});

app.get('/', async function(req, res) {
	try { 
		var connectInfo = {};

		var channels = bot.guilds.forEach(g => {

			var insert = connectInfo[g.name] = {};
			insert["ID"] = g.id;
			insert["Members"] = g.memberCount;
			insert["Online"] = {};

			var ply = g.members.filter(member => member.presence.status === "online").forEach(p => {
			
				insert["Online"][p.user.id] = p.user.username;

			});
		});

		res.send(connectInfo);
		
	} catch(e) {
		console.log(e.stack);
	};

});

console.log(process.env.PORT);

var port = process.env.PORT || 3000; app.listen(port, function() {
	console.log(`Example app listening on port 3000!`);
});



 

// THIS  MUST  BE  THIS  WAY

bot.login(process.env.BOT_TOKEN);//BOT_TOKEN is the Client Secret