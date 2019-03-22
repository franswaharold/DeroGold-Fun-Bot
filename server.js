const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config.json')

const talkedRecently = new Set();
const talkedRecently2 = new Set();
const talkedRecently3 = new Set();

const diceroll = [
'Result is: __**1**__',
'Result is: __**2**__',
'Result is: __**3**__',
'Result is: __**4**__',
'Result is: __**5**__',
'Result is: __**6**__',
];

client.on('error', (error) => {
	console.error(error);
  client.user.setActivity(config.activity_offline, {type: 'WATCHING'});
  client.user.setStatus('offline');
});

client.on('ready', async () => {
       console.log(`Serving: ${client.users.size} Users in ${client.channels.size} Channels of ${client.guilds.size} Guilds. Logged in as ${client.user.tag}. Ready!`); 
       client.user.setStatus('online');
  
       let activNum = 0;
  
       setInterval(function() {
           if (activNum === 0) {
               client.user.setActivity(`^Help | On ${client.guilds.size} Servers!`, {type: 'WATCHING'});
               activNum = 1;
           } else if (activNum === 1) {
               client.user.setActivity("With DeroGold!", {type: 'PLAYING'});
               activNum = 0;
           }
    }, 3 * 1000);
});

client.on('guildCreate', guild => {
  console.log(`New guild joined; ${guild.name} (ID: ${guild.id}). This guild has ${guild.memberCount} members!`);
  client.user.setActivity(config.activity, {type: 'WATCHING'});
});

client.on('guildDelete', guild => {
  console.log(`I have been removed from: ${guild.name} (ID: ${guild.id})`);
  client.user.setActivity(config.activity, {type: 'WATCHING'});
});

client.on("guildMemberAdd", function(message) {
  
  let guild = message.guild;
  
  const welcomeEmbed = new Discord.RichEmbed()
  .setColor(0x49fc7e)
  .setTitle('Welcome')
  .setAuthor('Author: Quantum Technomancer', 'http://i.imgur.com/75fcgxJ.jpg')
  .setDescription(`Hello ${message.user}! Welcome to ${message.guild.name}!\n\nTo use me, type: __**^Help**__.`)
  .setThumbnail(message.user.avatarURL)
  .setTimestamp()
  .setFooter('Prefix: ^ | This work is licensed under a Creative Commons Attribution-ShareAlike 4.0 International License.')
  
  message.guild.channels.find(`name`, `bots`).send({ embed: welcomeEmbed });                                         
});

client.on('message', message => {
    switch(message.content.toLowerCase()) {
        case '^restart':
        if (message.author.id !== config.devID) return;
        message.react('?');
            restartBot(message.channel);
            break;
    }
});
function restartBot(channel) {
  const restartEmbed = new Discord.RichEmbed()
    .setColor(0x49fc7e)
    .setTitle(`Done.`)
    .setAuthor('Author: Quantum Technomancer')
    .setTimestamp()
    .setFooter('Prefix: ^ | This work is licensed under a Creative Commons Attribution-ShareAlike 4.0 International License.');
    channel.send(restartEmbed)
    .then(msg => client.destroy())
    .then(() => client.login(config.token));
}

const filterWords = [
'Nigger',
'nigger',
'Nigga',
'nigga',
'N1gger',
'n1gger',
'N1gga',
'n1gga',
];

client.on("message", message => {
            switch (true) {
                case message.author.bot:
                    return;
                case new RegExp(filterWords.join("|")).test(message.content.toLowerCase()):
                    const guild = client.guilds.find(guild => guild.id);
                    let edit = message.content.toLowerCase();
                    for (var i in filterWords) {
                        edit = edit.replace(new RegExp(filterWords[i], "g"), "`*****`");
                    }
                    message.delete();
                    message.channel.send(message.author + "**Don't say that here!**:rage:") .then(xnxx => {xnxx.delete(10000)})
            }
})

client.on('message', (message) => {
  if (!message.content.startsWith(config.prefix) || message.author.bot) return;
    
  var msgcontent = message.content.toLowerCase();
  
  if (msgcontent === (config.prefix + 'info')) {
    message.react('?');
  var infoEmbed = new Discord.RichEmbed()
        .setTitle("Info")
        .setAuthor('Author: Quantum Technomancer', 'http://i.imgur.com/75fcgxJ.jpg')
        .addField('Server Name', `${message.guild.name}`, true)
        .addField('Server ID', `${message.guild.id}`, true)
        .addField('Server Icon', message.guild.iconURL, true)
        .addField('Server Creation', `${message.guild.createdAt}`)
        .addField('Server Region', `${message.guild.region}`)
        .addField('Verification Level', message.guild.verificationLevel)
        .addField('Founder', `${message.guild.owner.user.username}#${message.guild.owner.user.discriminator}`, true)
        .addField('Founder ID', `${message.guild.owner.id}`)
        .addField('Total Members | Humans | Bots', `${message.guild.members.size} | ${message.guild.members.filter(member => !member.user.bot).size} | ${message.guild.members.filter(member => member.user.bot).size}`, true)
        .addField('Total Channels', message.guild.channels.size)
        .addField('Total Roles', message.guild.roles.size, true)
        .addField('Your Username', `${message.author.username}`)
        .addField('Your ID', `${message.author.id}`)
        .addField('Bot Joined', `${message.guild.joinedAt}`)
        .setColor(0x49fc7e)
        .setTimestamp()
        .setFooter('Prefix: ^ | This work is licensed under a Creative Commons Attribution-ShareAlike 4.0 International License.', 'https://i.imgur.com/ppi1U3Gl.png');
    message.channel.send(infoEmbed);
  } else
    
  if (msgcontent === (config.prefix + 'soak')) {
  if (talkedRecently.has(message.author.id)) {
    message.channel.send(message.author + " Please wait 2 minutes before using this command again.");
  } else {
    message.react('?');
    message.channel.send(`.tipall 2500 ??Come back in 2 minutes to use this command again.`);
  }
        talkedRecently.add(message.author.id);
        setTimeout(() => {
          talkedRecently.delete(message.author.id);
        }, 120000);
  } else
    
  if (msgcontent === (config.prefix + 'drizzle')) {
  if (talkedRecently2.has(message.author.id)) {
    message.channel.send(message.author + " Please wait 3 minutes before using this command again.");
  } else {
    message.react('?');
    message.channel.send(`.tip 2000 ` + message.author + ` ??Come back in 3 minutes to use this command again.`);
    }
        talkedRecently2.add(message.author.id);
        setTimeout(() => {
          talkedRecently2.delete(message.author.id);
        }, 180000);
  } else
    
  if (msgcontent === (config.prefix + 'dailydego')) {
  if (talkedRecently3.has(message.author.id)) {
    message.channel.send(message.author + " Please wait until the cooldown's done before using this command again.");
  } else {
    message.react('?');
    message.channel.send(`.tip 25000 ` + message.author + ` Come back in 24 hours to use this command again.`);
    }
        talkedRecently3.add(message.author.id);
        setTimeout(() => {
          talkedRecently3.delete(message.author.id);
        }, 86400000);
  } else
    
  if (msgcontent.startsWith(config.prefix + 'rain')) {
  if (message.author.id !== config.devID) return;
    message.react('?');
     var text = message.content.split(' ').slice(1).join(' ')
     if(!text) return message.reply('Type: __**^shower <amount> @users**__')
    message.channel.send('.tip ' + text)
  } else
    
  if (msgcontent === (config.prefix + 'shower')) {
  if (message.author.id !== config.devID) return;
    message.react('?');
    message.channel.send(`.tipall 100000 ??`);
  } else
    
  if (msgcontent === (config.prefix + 'storm')) {
  if (message.author.id !== config.devID) return;
    message.react('?');
    message.channel.send(`.tipall 1000000 ?`);
  } else
    
  if (msgcontent === (config.prefix + 'ping')) {
    message.react('?');
  const pingEmbed = new Discord.RichEmbed()
    .setColor(0x49fc7e)
    .setTitle(`Ping: __**${Math.round(client.ping)}**__ ms.\n\nOther Ping?: __**${Date.now() - message.createdTimestamp}**__ ms.`)
    .setAuthor('Author: Quantum Technomancer', 'http://i.imgur.com/75fcgxJ.jpg')
    .setTimestamp()
    .setFooter('Prefix: ^ | This work is licensed under a Creative Commons Attribution-ShareAlike 4.0 International License.');
    message.channel.send(pingEmbed);
  } else
    
  if (msgcontent.startsWith(config.prefix + 'coinflip')) {
    message.react('?');
		message.channel.send(`Result: **${Math.floor(Math.random() * 2) == 0 ? "heads" : "tails"}**!`);
	} else
    
  if (msgcontent.startsWith(config.prefix + 'diceroll')) {
    message.react('?');
		message.channel.send(diceroll[Math.floor(Math.random() * diceroll.length)]);
	} else
    
  if (msgcontent === (config.prefix + 'license')) {
    message.react('?');
    const licenseEmbed = new Discord.RichEmbed()
  .setColor(0x49fc7e)
  .setTitle('**License**')
  .setAuthor('Author: Quantum Technomancer', 'http://i.imgur.com/75fcgxJ.jpg')
  .setDescription('This work is licensed under a Creative Commons Attribution-ShareAlike 4.0 International License. (https://creativecommons.org/licenses/by-sa/4.0/)')
  .setImage('https://i.imgur.com/F6BAsP1.png')
  .setTimestamp()
  .setFooter('Prefix: ^ | This work is licensed under a Creative Commons Attribution-ShareAlike 4.0 International License.')
    message.channel.send(licenseEmbed);
  } else
    
  if (msgcontent === (config.prefix + 'changelog')) { 
    message.react('?');
  const changelogEmbed = new Discord.RichEmbed()
  .setColor(0x49fc7e)
  .setTitle('**Changelog**')
  .setAuthor('Version: 1.4.0')
  .setDescription('March 21, 2019\n\n• Fixed the ^Dailydego command.')
  .setTimestamp()
  .setFooter('Prefix: ^ | This work is licensed under a Creative Commons Attribution-ShareAlike 4.0 International License.')
    message.channel.send(changelogEmbed);
  } else
    
  if (msgcontent === (config.prefix + 'donate')) {
    message.react('?');
    message.delete();
    message.channel.send(message.author + "** Check DM’s. **") .then(xnxx => {xnxx.delete(3500)})
    message.author.send({embed: {
    color: 0x49fc7e,
    author: {
      name: "Author: Quantum Technomancer",
      icon_url: "http://i.imgur.com/75fcgxJ.jpg",
    },
    title: "<------------[Address's]------------>",
    fields: [{
        name: "DeroGold (DEGO)",
        value: "```Just type: .tip <amount> @Quantum Singularity#1903```"
      },
      {
        name: "Bitcoin (BTC)",
        value: "```3Pkhcr2YRbG7EmMCBkCdLi9hebLoRqE6BD```"
      },
      {
        name: "Litecoin (LTC)",
        value: "```LPPMRUVtLmwbUw9tW2bJaKWFY6oTMTV9sm```"
      },
      {
        name: "Dogecoin (DOGE)",
        value: "```DFkUQ2TapFVSFB4XZfnKuUDN87zZk8Foos```"
      },
      {
        name: "Dashcoin (DASH)",
        value: "```Xvbpe9zYFkLYMe255jAn8yFxcPkqSPjSrZ```"
      },
      {
        name: "Monero (XMR)",
        value: "```8BX16WxuDSE8xcLZXQcTkobPjr1PRztx8CDFstEyp9Mj5tWCVBUSFQeQ3KZtBG3kqXUmEDMmPyY93YdEJ4D6zingV25QSYx```"
      },
      {
        name: "Tether (USDT)",
        value: "```3LCwgyp6c1YttCeZ47CS39dC8sgN877SZE```"
      },
      {
        name: "Electroneum (ETN)",
        value: "```etnjvTRYiYf5VMpT8j7e3BLSQ2kNSvV26R3voHJGV9otH2Y4NfJLFr3DhYh4FXRotoLFqMFicrT4MYJMae5RZbqt5t5RzdJSkc```"
      }
    ],
    timestamp: new Date(),
    footer: {
      icon_url: client.user.avatarURL,
      text: "Thank You! | This work is licensed under a Creative Commons Attribution-ShareAlike 4.0 International License."
    }
  }
});
}

    
  if (msgcontent === (config.prefix + 'help')) {
    message.react('?');
    message.delete();
    message.channel.send(message.author + "** Check DM’s. **") .then(xnxx => {xnxx.delete(3500)})
    message.author.send({embed: {
    color: 0x49fc7e,
    author: {
      name: "Author: Quantum Technomancer",
      icon_url: "http://i.imgur.com/75fcgxJ.jpg",
    },
    title: "<-----------[Commands]----------->",
    fields: [{
        name: "``^Help``",
        value: "? A list of commands."
      },
      {
        name: "``^Donate``",
        value: "?? Donate to the Developer."
      },
      {
        name: "``^Dailydego``",
        value: "?? 25K DEGO everyday!"
      },
      {
        name: "``^Drizzle``",
        value: "?? 2000 DEGO for Free!"
      },
      {
        name: "``^Soak``",
        value: "?? 2500 DEGO for everone online!"
      },
      {
        name: "??``^Shower``",
        value: "?? 100K DEGO for everone online!"
      },
      {
        name: "??``^Rain``",
        value: "?? Type: __**^Rain <amount> @users**__"
      },
      {
        name: "??``^Storm``",
        value: "? 1M DEGO for everyone online!"
      },
      {
        name: "``^Info``",
        value: "? Get Server and User info."
      },
      {
        name: "``^Ping``",
        value: "?? Get Your Ping."
      },
      {
        name: "``^Coinflip``",
        value: "?? Flip a coin."
      },
      {
        name: "``^Diceroll``",
        value: "?? Roll a die."
      },
      {
        name: "``^License``",
        value: "?? See the license for this bot."
      },
      {
        name: "``^Changelog``",
        value: "?? A log of changes to this bot."
      },
      {
        name: "Official DeroGold Website:",
        value: "http://www.derogold.com\n?? = __**Developer**__ only."
      }
    ],
    timestamp: new Date(),
    footer: {
      icon_url: client.user.avatarURL,
      text: "Prefix: ^ | This work is licensed under a Creative Commons Attribution-ShareAlike 4.0 International License."
    }
  }
});
}
});
  
client.login(config.token);