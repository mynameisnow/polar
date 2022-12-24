/* eslint-disable no-unused-vars */
const { Client, EmbedBuilder, Guild } = require("discord.js");
// const { connection } = require('mongoose');

module.exports = {
  name: "botinfo",
  aliases: [],
  permissions: "SendMessages",
  description: "Sends an embed with the some info about the bot.",
  cooldown: 3,
  ownerOnly: true,
  execute(message, args, commandName, client, Discord) {
    const Response = new EmbedBuilder()
      .setColor("#657eb3")
      .setTitle("Doggo Bot Status") // **Database**: \`${switchTo(connection.readyState)}\` \n
      .setDescription(
        `**Client**: \`🟢 ONLINE\` - \`${
          client.ws.ping
        }ms\`\n **Uptime**: <t:${parseInt(client.readyTimestamp / 1000)}:R>\n
            \n **__Tools__**: \n - **Discord Javscript**: \`${
              process.version
            }\`\n - **Node.js**: \`${process.version}\`\n - **Discord.js**: \`${
          require("discord.js").version
        }\`\n - **Discord.js-Commands**: \`${
          require("../../package.json").version
        }\``
      ) // - **MongoDB**: \`${require('mongoose').version}\`\n - **Mongoose**: \`${require('mongoose').version}\`\n
      .addField(
        "**__Commands__**",
        `\`${client.commands.size}\` commands loaded.`,
        true
      )
      .addField(
        "**__Guilds__**",
        `\`${client.guilds.cache.size}\` guilds connected.`,
        true
      )
      .addField(
        "**__Users__**",
        `\`${client.users.cache.size}\` users connected.`,
        true
      )
      .setThumbnail(
        client.user.avatarURL({ format: "png", dynamic: true, size: 1024 })
      )
      .setTimestamp()
      .setFooter("Bot Stats");

    message.channel.send({ embeds: [Response], ephemeral: true });
  },
};

function switchTo(val) {
  var status = " ";
  switch (val) {
    case 0:
      status = "🔴 DISCONNECTED";
      break;
    case 1:
      status = "🟢 CONNECTED";
      break;
    case 2:
      status = "🟡 CONNECTING";
      break;
    case 3:
      status = "🔵 DISCONNECTING";
      break;
  }
  return status;
}
