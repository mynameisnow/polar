/* eslint-disable no-unused-vars */
const Discord = require("discord.js");
const moment = require("moment");

module.exports = {
  name: "afk",
  execute(client, message, member) {
    if (!message.guild || message.author.bot) return;

    const mentionedMember = message.mentions.members.first();
    if (mentionedMember) {
      const data = client.afk.get(mentionedMember.id);

      if (data) {
        const [timestamp, reason] = data;
        const timeAgo = moment(timestamp).fromNow();

        message.channel.send(
          `This user is currently afk (${timeAgo})\n Reason to AFK: ${reason}`
        );
      }
    }

    const getData = client.afk.get(message.author.id);
    if (getData) {
      client.afk.delete(message.author.id);
      const embed = new Discord.EmbedBuilder()
        .setColor("Random")
        .setDescription(
          `Welcome back, you are no longer AFK! ${message.member}`
        );
      message.channel.send({
        embeds: [embed],
      });
    }
  },
};
