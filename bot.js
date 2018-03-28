const Discord = require("discord.js");

const PREFIX = "!"

var bot = new Discord.Client();

bot.on("ready", function() {
  console.log("Im Online");
  bot.user.setActivity("!help | Alpha v0.6", {type: "Streaming"});
});

bot.on("message", function(message) {
  if (message.author.equals(bot.user)) return;
  
  if (!message.content.startsWith(PREFIX)) return; 
  var args = message.content.substring(PREFIX.length).split(" ");

  switch (args[0]) {
    case "ping":
        message.channel.send("Command Not Found!")
      break;
      
    case "botinfo":
        let bicon = bot.user.displayAvatarURL;
        let botembed = new Discord.RichEmbed()
        .setDescription("Bot Information")
        .setColor("#15f153")
        .setThumbnail(bicon)
        .addField("Bot Name", bot.user.username)
        .addField("Created Since", bot.user.createdAt)
        .addField("Location", "Indonesian")
        .addField("Discord Server", "➭ [https://discord.gg/w829yw8]")
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

    message.delete().catch(O_o=>{});
    message.channel.send("**The Player Has Kicked**")
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
    .addField("!afk", "For Afk")
    .addField("!Invite", "Invite To Your Discord!");
      
    message.delete().catch(O_o=>{});
    message.channel.send("**Already In Your PM!**")
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
    case "invite":
     let inviteembed = new Discord.RichEmbed()
    .addField("Invite To Your Discord!", "➭ [https://discordapp.com/api/oauth2/authorize?client_id=427752464499081217&permissions=8&scope=bot]")
    .setColor("#15f153");

    return message.channel.send(inviteembed);
      break;
    case "says":
          if(!message.member.hasPermission("ADMINISTRATOR")) return;
    const sayMessage = args.join(" ");
    message.delete().catch();
    message.channel.send(sayMessage);
      break;
    case "clear":
          if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("No.");
    if(!args[0]) return message.channel.send("no");
    message.channel.bulkDelete(args[0]).then(() => {
    message.channel.send(`Clear ${args[0]} messages.`).then(msg => msg.delete(2000));
    })
      break;
  }
});

bot.login(process.env.BOT_TOKEN);

