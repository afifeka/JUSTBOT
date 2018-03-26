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
        message.channel.sendMessage("Command Tidak Tersedia!");
      break;
    case "botinfo":
        let bicon = bot.user.displayAvatarURL;
        let botembed = new Discord.RichEmbed()
        .setDescription("Bot Information")
        .setColor("#15f153")
        .setThumbnail(bicon)
        .addField("Nama Bot", bot.user.username)
        .addField("Dibuat Sejak", bot.user.createdAt)
        .addField("Discord Server", "➭ [Private]")
        .addField("Dibuat Oleh", "『AfifGaming』#9369");

    return message.channel.send(botembed);
      break;
    case "kick":
          let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!kUser) return message.channel.send("Tidak Ada Player Yang Ingin Anda Kick!");
    let kReason = args.join(" ").slice(22);
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("No can do pal!");
    if(kUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Player Tersebut Tidak Bisa Anda Kick!");

    let kickEmbed = new Discord.RichEmbed()
    .setDescription("~Kick~")
    .setColor("#e56b00")
    .addField("Kicked User", `${kUser} with ID ${kUser.id}`)
    .addField("Kicked Oleh", `<@${message.author.id}> with ID ${message.author.id}`)
    .addField("Kicked In", message.channel)
    .addField("Tiime", message.createdAt)
    .addField("Reason", kReason);

    let kickChannel = message.guild.channels.find(`name`, "admin-log");
    if(!kickChannel) return message.channel.send("Tidak Ada Channel Bernama `admin-log`.");

    message.guild.member(kUser).kick(kReason);
    kickChannel.send(kickEmbed);
      break;
    case "ban":
          let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!bUser) return message.channel.send("Tidak Ada Player Yang Ingin Anda Ban!");
    let bReason = args.join(" ").slice(22);
    if(!message.member.hasPermission("MANAGE_MEMBERS")) return message.channel.send("No can do pal!");
    if(bUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Player Tersebut Tidak Bisa Anda Ban!");

    let banEmbed = new Discord.RichEmbed()
    .setDescription("~Ban~")
    .setColor("#bc0000")
    .addField("Banned User", `${bUser} with ID ${bUser.id}`)
    .addField("Banned Oleh", `<@${message.author.id}> with ID ${message.author.id}`)
    .addField("Banned In", message.channel)
    .addField("Time", message.createdAt)
    .addField("Reason", bReason);

    let incidentchannel = message.guild.channels.find(`name`, "admin-log");
    if(!incidentchannel) return message.channel.send("Tidak Ada Channel Bernama `admin-log`.");
      
    message.guild.member(bUser).ban(bReason);
      
    message.delete().catch(O_o=>{});
    message.channel.send("***Terima Kasih Atas Report Anda, Anda Bisa Report Lagi Setelah 10Menit***")
    incidentchannel.send(banEmbed);
      break;
    case "afk":
          let afkuser = args.join(" ").slice(0);
      
    message.delete()
    message.channel.send("**AFK » **" + `${message.author} ` + afkuser)
      break;
    case "report":
          let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!rUser) return message.channel.send("Tidak Ada Player Yang Ingin Anda Report!");
    let rreason = args.join(" ").slice(22);

    let reportEmbed = new Discord.RichEmbed()
    .setDescription("Reports")
    .setColor("#15f153")
    .addField("Reported User", `${rUser} with ID: ${rUser.id}`)
    .addField("Reported Oleh", `${message.author} with ID: ${message.author.id}`)
    .addField("Channel", message.channel)
    .addField("Time", message.createdAt)
    .addField("Reason", rreason);

    let reportschannel = message.guild.channels.find(`name`, "moderator-logs");
    if(!reportschannel) return message.channel.send("Tidak Ada Channel Bernama `moderator-logs`");


    message.delete().catch(O_o=>{});
    message.channel.send("***Terima Kasih Atas Report Anda, Anda Bisa Report Lagi Setelah 10Menit***")
    reportschannel.send(reportEmbed);
      break;
    case "help":
          let embed = new Discord.RichEmbed()
    .setDescription("**BOT HELP**")
    .setColor("#15f153")
    .addField("s!ban", "Untuk Banned Player **Admin Only!**")
    .addField("s!kick", "Untuk Kick Player **Admin Only!**")
    .addField("s!report", "Untuk Report Player!")
    .addField("s!botinfo", "Untuk Membaca Informasi Dari Bot!")
    .addField("s!serverinfo", "Untuk Membaca Info Dari Server Ini!")
    .addField("s!afk", "Untuk Afk");
      
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
    .addField("Nama Server", message.guild.name)
    .addField("Dibuat Sejak", message.guild.createdAt)
    .addField("Kapan Anda Join", message.member.joinedAt)
    .addField("Berapa Member", message.guild.memberCount);

    return message.channel.send(serverembed);
      break;
  }
});

bot.login(process.env.BOT_TOKEN);
