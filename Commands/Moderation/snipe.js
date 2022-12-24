/* eslint-disable no-unused-vars */
const moment = require("moment");
module.exports = {
  name: "snipe",
  aliases: ["s"],
  permissions: "SendMessages",
  description: "Fetches the last deleted message.",
  cooldown: 3,
  execute(message, args, commandName, client, Discord) {
    const snipes = client.snipes.get(message.channel.id);
    if (!snipes) return message.channel.send("There is nothing to snipe.");

    const snipe = +args[0] - 1 || 0;
    const target = snipes[snipe];
    if (!target)
      return message.channel.send(
        `The snipe limit has been set to ${snipes.length} messages!`
      );

    const { msg, time, image } = target;
    // if (snipes.content !== msg || image) return;
    const sE = new Discord.EmbedBuilder()
      .setColor("Random")
      .setAuthor({
        name: msg.author.tag,
        iconURL: msg.author.displayAvatarURL(),
      })
      .setImage(image)
      .setDescription(msg.content)
      // .setFooter(`${moment(time).fromNow()}`)
      .setTimestamp()
      .setFooter({
        text: `${msg.channel.name}`, // ${snipe + 1} / ${moment(time).fromNow()}
      }); // snipes.lenth
    message.channel.send({ embeds: [sE] });
  },
};
