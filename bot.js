const botconfig = require("./botconfig.json");
const Discord = require("discord.js");
const ms = require("ms");

const bot = new Discord.Client({disableEveryone: true});

bot.on("ready", async () => {
  console.log(`${bot.user.username} is online!`);

  bot.user.setActivity("!help | Beta v0.1", {type: "Streaming"});

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
    if(!kUser) return message.channel.send("No Player Wants You Kick!");
    let kReason = args.join(" ").slice(22);
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("No can do pal!");
    if(kUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("That person can't be kicked!");

    let kickEmbed = new Discord.RichEmbed()
    .setDescription("~Kick~")
    .setColor("#e56b00")
    .addField("Kicked User", `${kUser} with ID ${kUser.id}`)
    .addField("Kicked By", `<@${message.author.id}> with ID ${message.author.id}`)
    .addField("Kicked In", message.channel)
    .addField("Tiime", message.createdAt)
    .addField("Reason", kReason)
    .setFooter("Beta v0.2 | Discord.js");

    let kickChannel = message.guild.channels.find(`name`, "mod-log");
    if(!kickChannel) return message.channel.send("No Named Channel `mod-log`.");

    message.guild.member(kUser).kick(kReason);
    kickChannel.send(kickEmbed);

    return;
  }

  if(cmd === `${prefix}ban`){

    let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!bUser) return message.channel.send("No Player Wants You Ban!");
    let bReason = args.join(" ").slice(22);
    if(!message.member.hasPermission("MANAGE_MEMBERS")) return message.channel.send("No can do pal!");
    if(bUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("That person can't be kicked!");

    let banEmbed = new Discord.RichEmbed()
    .setDescription("~Ban~")
    .setColor("#bc0000")
    .addField("Banned User", `${bUser} with ID ${bUser.id}`)
    .addField("Banned By", `<@${message.author.id}> with ID ${message.author.id}`)
    .addField("Banned In", message.channel)
    .addField("Time", message.createdAt)
    .addField("Reason", bReason)
    .setFooter("Beta v0.2 | Discord.js");

    let incidentchannel = message.guild.channels.find(`name`, "mod-log");
    if(!incidentchannel) return message.channel.send("No Named Channel `mod-log`.");

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
    .addField("Reason", rreason)
    .setFooter("Beta v0.2 | Discord.js");

    let reportschannel = message.guild.channels.find(`name`, "mod-log");
    if(!reportschannel) return message.channel.send("No Named Channel `mod-log`.");


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
    .addField("Total Members", message.guild.memberCount)
    .setFooter("Beta v0.2 | Discord.js");

    return message.channel.send(serverembed);
  }



  if(cmd === `${prefix}botinfo`){

    let bicon = bot.user.displayAvatarURL;
    let botembed = new Discord.RichEmbed()
    .setDescription("Bot Information")
    .setColor("#15f153")
    .setThumbnail(bicon)
    .addField("Bot Name", bot.user.username)
    .addField("Created On", bot.user.createdAt)
    .addField("Discord Server", "➭ [https://discord.gg/aFTvrnr]")
    .addField("Developed By", "『AfifGaming』#9369")
    .setFooter("Beta v0.2 | Discord.js");

    return message.channel.send(botembed);
  }


  if(cmd === `${prefix}clear`){
    if(!message.member.hasPermission("ADMINISTRATOR")) return message.reply("No.");
    if(!args[0]) return message.channel.send("no");
    message.channel.bulkDelete(args[0]).then(() => {
    message.channel.send(`Clear ${args[0]} messages.`).then(msg => msg.delete(2000));
   })
  
  }


  if(cmd === `${prefix}say`){
    if(!message.member.hasPermission("ADMINISTRATOR")) return;
    const sayMessage = args.join(" ");
    message.delete().catch();
    message.channel.send(sayMessage);
  }


  if(cmd === `${prefix}afk`){
    let afkuser = args.join(" ").slice(0);

    message.delete()
    message.guild.members.get(message.author.id).setNickname("Afk | " + message.author.username);
    message.channel.send("**AFK » **" + `${message.author} ` + afkuser)

     return;
  }

  if(cmd === `${prefix}help`){
    let embed = new Discord.RichEmbed()
    .setDescription("**BOT HELP**")
    .setColor("#15f153")
    .addField("/ban", "Banned The Player, CMake Sure There Is Already A Channel Called **admin-log**")
    .addField("/kick", "Kick The Player, Make Sure There Is Already A Channel Called **admin-log**")
    .addField("/report", "Report The Player, Make Sure There Is Already A Channel Called **moderator-logs**")
    .addField("/botinfo", "To View Bot Information")
    .addField("/serverinfo", "To See Information About This Server")
    .addField("/afk", "For Afk")
    .setFooter("Beta v0.2 | Discord.js");
    
    message.delete().catch(O_o=>{});
    message.channel.send("**Check Your PM!**")
    return message.author.send(embed);           
  }

  if(cmd === `${prefix}warn`){
      let wUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
          if(!wUser) return message.channel.send("Can't find user!");
          let wReason = args.join(" ").slice(22);
          if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("No Can Do!");

          message.delete()
          message.wUser.send("wReason")
          message.delete().catch(O_o=>{});
          message.channel.send("**Check Your PM!**")
    return;
  }

  if(cmd === `${prefix}tempmute`){
    let tomute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!tomute) return message.reply("No Player Wants You Mute!");
    if(tomute.hasPermission("MANAGE_MESSAGES")) return message.reply("Can't mute them!");
    let muterole = message.guild.roles.find(`name`, "muted");
    //start of create role
    if(!muterole){
      try{
        muterole = await message.guild.createRole({
          name: "muted",
          color: "#000000",
          permissions:[]
        })
        message.guild.channels.forEach(async (channel, id) => {
          await channel.overwritePermissions(muterole, {
            SEND_MESSAGES: false,
            ADD_REACTIONS: false
          });
        });
      }catch(e){
        console.log(e.stack);
      }
    }
    //end of create role
    let mutetime = args[1];
    if(!mutetime) return message.reply("You didn't specify a time!");
  
    await(tomute.addRole(muterole.id));
    message.reply(`<@${tomute.id}> has been muted for ${ms(ms(mutetime))}`);
  
    setTimeout(function(){
      tomute.removeRole(muterole.id);
      message.channel.send(`<@${tomute.id}> has been unmuted!`);
    }, ms(mutetime));
  }

});

bot.login(process.env.BOT_TOKEN);
