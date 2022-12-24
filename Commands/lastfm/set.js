/* eslint-disable no-unused-vars */
/* require("dotenv").config();
const LastFmApi = require("lastfm-api-client");
const EmbedBuilder = require("discord.js");
const LastFmClient = new LastFmApi({
  apiKey: process.env.API_KEY,
  apiSecret: process.env.API_SECRET,
});

const Keyv = require("keyv");
const lastFMUN = new Keyv(process.env.MONGO_URI, {
  collection: "lastFMusernames",
});
module.exports = {
  name: "set",
  aliases: [],
  permissions: "SendMessages",
  description: "Sets a user's lastfm name.",
  cooldown: 0,
  async execute(message, args, commandName, client, Discord) {
    const name = args[0];

    await lastFMUN.set(message.author.id, name).catch((e) => console.log(e));

    return message.reply({
      content: `You have successfully set your last.fm username as ${name}!`,
    });
  },
}; */
