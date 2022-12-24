/* eslint-disable no-unused-vars */
const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "ping",
  aliases: ["latency", "lag"],
  permissions: "SendMessages",
  description: "Sends the client's ping",
  cooldown: 5,
  execute(message, args, commandName, client, Discord) {
    console.log("Executing ping command");
    const Response = new EmbedBuilder()
      .setColor("Random")
      .setTitle("🏓")
      // .addField('Latency', `${client.ws.ping}ms`)
      .addFields([
        {
          name: "Latency",
          value: `${Date.now() - message.createdTimestamp}ms.`,
        },
        { name: "Api Latency", value: `${Math.round(client.ws.ping)}ms` },
      ]);
    message.channel.send({ embeds: [Response] });
  },
};
