/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable no-const-assign */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
// console.log('starting...');

const Discord = require("discord.js");
// const fs = require('fs');
const { Client, Collection, GatewayIntentBits } = Discord;
const { token, prefix } = require("./config.json");
const mongoose = require("mongoose");
require("dotenv").config();

const testSchema = require("./test-schema.js");

const client = new Discord.Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildInvites,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildPresences,
    // GatewayIntentBits.Flags.MessageContent,
    // GatewayIntentBits.Flags.GuildPresences,
  ],
});

client.commands = new Collection();
client.cooldowns = new Collection();
client.afk = new Collection();
client.snipes = new Collection();

["eventsHandler.js", "commandsHandler.js"].forEach((handler) => {
  console.log("index.js eventsHandler loop: " + `./Handlers/${handler}`);
  require(`./Handlers/${handler}`)(client, Discord);
});

mongoose.connect(process.env.MONGO_URI, {
  keepAlive: true,
});
/* setTimeout(async () => {
  await new testSchema({
    message: "hello world",
  }).save();
}, 1000); */

/* client.on('guildCreate', (guild) => { 
	let channelToSend;

	guild.channels.cache.find((channel) => {
		if (channel.type === 'GUILD_TEXT' && !channelToSend && channel.permissionsFor(guild.me).has('SendMessages')) channelToSend = channel;
		console.log('test');
	});

	if (!channelToSend) return;

	channelToSend.send({
		embeds: [
			new Discord.EmbedBuilder()
				.setColor('#657eb3')
				.setTitle('Hello!')
				.setThumbnail(client.user.displayAvatarURL())
				.setDescription(`Thank you for adding me to ${guild.name}! I am a moderation bot made and developed by snow.#3183. To begin using this bot, the current bot-wide prefix is **${prefix}** start with ${prefix}help to see the list of commands.`)
				.addField('If you happen to experience a bug or glitch while using this bot, please DM snow.#3183 and it will get patched right away.', 'Thank you!'),
		],
	});  
}); */

client.login(token);

/* client.on('messageCreate', message => {
	// const command = args.shift().toLowerCase();

	if (!message.content.startsWith(prefix) || message.author.bot) return; // if(!message.content.startsWith(config.prefix) || message.author.bot) return;

	const args = message.content.substring(prefix.length).split(/ +/); // message.content.slice(prefix.length).split(/ +/);

	const command = client.commands.find(cmd => cmd.name == args[0]);

	if (!command) command = client.commands.get(client.aliases.get(cmd));

	command.run(message, args, client);

}); */

/* const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js')).forEach(file => {

	const command = require(`./commands/${file}`);
	console.log(`Command ${command.name} loaded`);
	client.commands.set(command.name, command);

}); */

/* switch (args[0]) {
        case 'ping':
        message.reply({ content: `🏓Latency is ${Date.now() - message.createdTimestamp}ms. API Latency is ${Math.round(client.ws.ping)}ms`, allowedMentions: { repliedUser: false } });
            break;

        case 'say':
            message.reply(args.slice(1).join(' '));

            break;


    } */

/* const command = client.commands.find(cmd => cmd.name == args[0]);

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	// Set a new item in the Collection
	// With the key as the command name and the value as the exported module
	client.commands.set(command.name, command); // client.commands.set(command.data.name, command);

}

});
client.login(token);

/* client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction);
	}
	catch (error) {
		console.error(error);
		return interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
}); */

// const { Collection, Client, Discord, EmbedBuilder, Intents } = require('discord.js');

// const ms = require('ms');
// const prefix = '.';
// const fs = require('fs');

/* client.on('messageCreate', (message) => {
  if (message.content === 'ping') {
    message.reply({
      content: 'pong',
    })
  }
})*/

// const memberCounter = require('./counters/member-counter');

// require('./utils/loadEvents')(bot);

/* client.on('shardError', error => {
	console.error('Websocket error:', error);
});

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for(const file of commandFiles){
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

client.once('ready', () => {
	console.log('Doggo Bot Loaded!');
});*/

/* client.on('message', message => {
    if (message.content === 'ping') {
      message.channel.send(`🏓Latency is ${Date.now() - message.createdTimestamp}ms. API Latency is ${Math.round(client.ws.ping)}ms`);
    }
  });


/*client.on('message', message => {
    if (message.content === 'HowdyDog') {
		message.channel.send('Doggobot here!');
	}

//client.snipes = new Map();

    if(!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();*/

/* switch (command) {
    case 'goat':
        client.commands.get('goat').execute(message, args, Discord);
        break;
    case 'hello':
        client.commands.get('hello').execute(message, args, Discord);
        break;
    case 'owner':
        client.commands.get('owner').execute(message, args, Discord);
        break;
    case 'clear':
        client.commands.get('clear').execute(message, args);
        break;
    case 'kick':
        client.commands.get('kick').execute(message, args);
        break;
    case 'ban':
        client.commands.get('ban').execute(message, args);
        break;
    case 'avatar':
        client.commands.get('avatar').execute(message, args, Discord);
        //client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
        break;
    case 'helpadmin':
        client.commands.get('helpadmin').execute(message, args, Discord);
        break;
    case 'dior':
        client.commands.get('dior').execute(message, args, Discord);
        break;
    case 'weather':
        client.commands.get('weather').execute(client, message, args);
        break;
    case 'say':
        client.commands.get('say').execute(client, message, args);
        break;
    case 'serverinfo':
        client.commands.get('serverinfo').execute(client, message, args, Discord);
        break;
    case 'goat2':
        client.commands.get('goat2').execute(message, args, Discord);
        break;
    case 'goat3':
        client.commands.get('goat3').execute(message, args, Discord);
        break;
    case 'okbro':
        client.commands.get('okbro').execute(message, args, Discord);
        break;
    case 'big':
        client.commands.get('big').execute(message, args);
        break;
    case 'play':
        client.commands.get('play').execute(message, args, cmd, client, Discord);
        //client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
        break;
    case 'mute':
        client.commands.get('mute').execute(message, args);
        break;
    case 'unmute':
        client.commands.get('unmute').execute(message, args);
        break;
    case 'jail':
        client.commands.get('jail').execute(message, args);
        break;
    case 'unjail':
        client.commands.get('unjail').execute(message, args);
        break;
    case 'image':
        client.commands.get('image').execute(client, message, args);
        break;
    case 'info':
        client.commands.get('info').execute(client, message, args, guild);
        break;
    case 'snipe':
        client.commands.get('snipe').execute(bot, message, args);
        break;
    case 'reactionroles':
        client.commands.get('reactionroles').execute(message, args, Discord, client);
        break;
    case 'westbrook':
        client.commands.get('westbrook').execute(message, args, Discord);
        break;
    case 'durk':
        client.commands.get('durk').execute(message, args, Discord);
        break;
    case 'racist':
        client.commands.get('racist').execute(message, args);
        break;
    case 'logic':
        client.commands.get('logic').execute(message, args, Discord);
        break;
    case 'jam':
        client.commands.get('jam').execute(message, args, Discord);
        break;
    case 'jordan':
        client.commands.get('jordan').execute(message, args, Discord);
        break;
    case 'lesalsa':
        client.commands.get('lesalsa').execute(message, args, Discord);
        break;
    case 'unban':
        client.commands.get('unban').execute(message, args);
        break;
    case 'warn':
        client.commands.get('warn').execute(message,args);
        break;
    case 'serverbans':
        client.commands.get('serverbans').execute(message, args, cmd, client, Discord, profileData);
        break;
    }*/

// });
