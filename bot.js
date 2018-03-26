const Discord = require("discord.js");

const PREFIX = "!"

var bot = new Discord.Client();

bot.on("ready", function() {
  console.log("Im Online");
  bot.user.setActivity("Process Beta v3.0", {type: "STREAMING"});
});

bot.on("message", function(message) {
  if (message.author.equals(bot.user)) return;
  
  if (!message.content.startsWith(PREFIX)) return; 
  var args = message.content.substring(PREFIX.length).split(" ");

  switch (args[0]) {
    case "ping":
        .addField("Your Ping Is!", message.author.ping);
        .setColor("#5845ff")
      break;
    case "botinfo":
        let bicon = bot.user.displayAvatarURL;
        let botembed = new Discord.RichEmbed()
        .setDescription("Bot Information")
        .setColor("#15f153")
        .setThumbnail(bicon)
        .addField("Bot Name", bot.user.username)
        .addField("Created Since", bot.user.createdAt)
        .addField("Discord Server", "➭ [Private]")
        .addField("Creator", "『AfifGaming』#9369");

    return message.channel.send(botembed);
      break;
    case "kick":
          let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!kUser) return message.channel.send("No Player Wants You Kick");
    let kReason = args.join(" ").slice(22);
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("No can do pal!");
    if(kUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("The Player Can Not Be Kick!");

    let kickEmbed = new Discord.RichEmbed()
    .setDescription("~Kick~")
    .setColor("#e56b00")
    .addField("Kicked User", `${kUser} with ID ${kUser.id}`)
    .addField("Kicked By", `<@${message.author.id}> with ID ${message.author.id}`)
    .addField("Kicked In", message.channel)
    .addField("Tiime", message.createdAt)
    .addField("Reason", kReason);

    let kickChannel = message.guild.channels.find(`name`, "admin-log");
    if(!kickChannel) return message.channel.send("No Named Channel `admin-log`.");

    message.guild.member(kUser).kick(kReason);
    kickChannel.send(kickEmbed);
      break;
    case "ban":
          let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!bUser) return message.channel.send("No Player Wants You Ban!");
    let bReason = args.join(" ").slice(22);
    if(!message.member.hasPermission("MANAGE_MEMBERS")) return message.channel.send("No can do pal!");
    if(bUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("The Player Can Not Be Ban!");

    let banEmbed = new Discord.RichEmbed()
    .setDescription("~Ban~")
    .setColor("#bc0000")
    .addField("Banned User", `${bUser} with ID ${bUser.id}`)
    .addField("Banned By", `<@${message.author.id}> with ID ${message.author.id}`)
    .addField("Banned In", message.channel)
    .addField("Time", message.createdAt)
    .addField("Reason", bReason);

    let incidentchannel = message.guild.channels.find(`name`, "admin-log");
    if(!incidentchannel) return message.channel.send("No Named Channel `admin-log`.");
      
    message.guild.member(bUser).ban(bReason);
      
    message.delete().catch(O_o=>{});
    message.channel.send("**The Player Has Banned**")
    incidentchannel.send(banEmbed);
      break;
    case "afk":
          let afkuser = args.join(" ").slice(0);
      
    message.delete()
    message.channel.send("**AFK » **" + `${message.author} ` + afkuser)
      break;
    case "report":
          let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!rUser) return message.channel.send("No Player Who Wants You Report!");
    let rreason = args.join(" ").slice(22);

    let reportEmbed = new Discord.RichEmbed()
    .setDescription("Reports")
    .setColor("#15f153")
    .addField("Reported User", `${rUser} with ID: ${rUser.id}`)
    .addField("Reported By", `${message.author} with ID: ${message.author.id}`)
    .addField("Channel", message.channel)
    .addField("Time", message.createdAt)
    .addField("Reason", rreason);

    let reportschannel = message.guild.channels.find(`name`, "moderator-logs");
    if(!reportschannel) return message.channel.send("No Named Channel `moderator-logs`");


    message.delete().catch(O_o=>{});
    message.channel.send("**Thank You for Reported You!**")
    reportschannel.send(reportEmbed);
      break;
    case "help":
          let embed = new Discord.RichEmbed()
    .setDescription("**BOT HELP**")
    .setColor("#15f153")
    .addField("!ban", "Banned The Player **Admin Only!**")
    .addField("!kick", "Kick The Player **Admin Only!**")
    .addField("!report", "For Reported Player!")
    .addField("!botinfo", "To Read Information From Bots!")
    .addField("!serverinfo", "To Read Info From This Server!")
    .addField("!afk", "For Afk");
      
    message.delete().catch(O_o=>{});
    message.channel.send("**Already In The PM!**")
    return message.author.send(embed);
      break;
    case "news":
          message.delete()
    let announchemebed = new Discord.RichEmbed()
    .setColor("000000")
    .addField("📢 Announcement | Information", args.join(" "))
    .setTimestamp()
    .setFooter(`Executor : ${message.author.username}#${message.author.discriminator}`)

    return message.channel.send(announchemebed)
      break;
    case "serverinfo":
          let sicon = message.guild.iconURL;
    let serverembed = new Discord.RichEmbed()
    .setDescription("Server Information")
    .setColor("#15f153")
    .setThumbnail(sicon)
    .addField("Server Name", message.guild.name)
    .addField("Created Since", message.guild.createdAt)
    .addField("Join Since", message.member.joinedAt)
    .addField("Players", message.guild.memberCount);

    return message.channel.send(serverembed);
      break;
  }
});

bot.login(process.env.BOT_TOKEN);
