const Discord = require("discord.js");

const PREFIX = "!"

const bot = new Discord.Client

bot.on("ready", async () => {
  console.log(`${bot.user.username} is online!`);

  bot.user.setActivity("!help | Update To Beta v0.1", {type: "Playing"});

  //bot.user.setGame("on SourceCade!");
});

bot.on("message", async message => {
  if(message.author.bot) return;
  if(message.channel.type === "dm") return;

  let prefix = botconfig.prefix;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);

  if(cmd === `${prefix}kick`){

    //!kick @daeshan askin for it

    let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!kUser) return message.channel.send("No Player Wants You Ban!");
    let kReason = args.join(" ").slice(22);
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("You Have No Permission For Banned People!");
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
    if(!kickChannel) return message.channel.send("Can't find `admin-log` channel.");

    message.guild.member(kUser).kick(kReason);
    kickChannel.send(kickEmbed);

    return;
  }

  if(cmd === `${prefix}ban`){

    let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!bUser) return message.channel.send("No Player Wants You Kick!");
    let bReason = args.join(" ").slice(22);
    if(!message.member.hasPermission("MANAGE_MEMBERS")) return message.channel.send("You Have No Permission For Banned People!");
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
    if(!incidentchannel) return message.channel.send("Can't find `admin-log` channel.");

    message.guild.member(bUser).ban(bReason);
    incidentchannel.send(banEmbed);


    return;
  }


  if(cmd === `${prefix}report`){

    //!report @ned this is the reason

    let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!rUser) return message.channel.send("No Player Wants You Report!");
    let rreason = args.join(" ").slice(22);

    let reportEmbed = new Discord.RichEmbed()
    .setDescription("Reports")
    .setColor("#15f153")
    .addField("Reported User", `${rUser} with ID: ${rUser.id}`)
    .addField("Reported By", `${message.author} with ID: ${message.author.id}`)
    .addField("Channel", message.channel)
    .addField("Time", message.createdAt)
    .addField("Reason", rreason);

    let reportschannel = message.guild.channels.find(`name`, "mod-log");
    if(!reportschannel) return message.channel.send("Couldn't find `mod-log` channel.");


    message.delete().catch(O_o=>{});
    reportschannel.send(reportEmbed);

    return;
  }




  if(cmd === `${prefix}serverinfo`){

    let sicon = message.guild.iconURL;
    let serverembed = new Discord.RichEmbed()
    .setDescription("Server Information")
    .setColor("#15f153")
    .setThumbnail(sicon)
    .addField("Server Name", message.guild.name)
    .addField("Created On", message.guild.createdAt)
    .addField("You Joined", message.member.joinedAt)
    .addField("Total Members", message.guild.memberCount);

    return message.channel.send(serverembed);
  }



  if(cmd === `${prefix}botinfo`){

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
  }



  if(cmd = `${prefix}help`){

    let helpembed = new Discord.RichEmbed()
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
    return message.author.send(helpembed);

  }


  if(cmd === `${prefix}clear`){

    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("No.");
    if(!args[0]) return message.channel.send("no");
    message.channel.bulkDelete(args[0]).then(() => {
    message.channel.send(`Clear ${args[0]} messages.`).then(msg => msg.delete(2000));
    })
   
  }


  if(cmd === `${prefix}says`){
 
    if(!message.member.hasPermission("ADMINISTRATOR")) return;
    const sayMessage = args.join(" ");
    message.delete().catch();
    message.channel.send(sayMessage);
   
  }


  
  if(cmd === `${prefix}invite`){

   let inviteembed = new Discord.RichEmbed()
   .addField("Invite To Your Discord!", "➭ [https://discordapp.com/api/oauth2/authorize?client_id=427752464499081217&permissions=8&scope=bot]")
   .setColor("#15f153");

   return message.channel.send(inviteembed);
  
  }
});

bot.login(process.env.BOT_TOKEN);
