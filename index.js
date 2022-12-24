const Discord = require("discord.js");
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

client.login(token);


