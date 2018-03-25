const Discord = require("discord.js");

const PREFIX = "/"

var bot = new Discord.Client();

bot.on("ready", function() {
  console.log("Im Online");
  bot.user.setActivity("Entity303 | /help", {type: "STREAMING"});
});

bot.login(process.env.BOT_TOKEN);
