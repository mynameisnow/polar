// const { MessageAttachment } = require('discord.js');
const { Canvas } = require("canvacord");

module.exports = {
  name: "rip",
  aliases: [],
  permissions: "SendMessages",
  description: "Sends a funny RIP image.",
  cooldown: 0,
  ownerOnly: true,
  async execute(message, args, commandName, client, Discord) {
    const ripuser = message.mentions.members.first() || message.member;

    const avatar = ripuser.user.displayAvatarURL({ format: "png" });

    const image = await Canvas.rip(avatar);

    const attachment = new Discord.AttachmentBuilder(image, "rip.png");
    const embed = new Discord.EmbedBuilder()
      .setAuthor(
        message.author.username,
        message.author.displayAvatarURL({ dynamic: true })
      )
      .setColor("Random")
      .setImage("attachment://rip.png");

    message.channel.send({ embeds: [embed], files: [attachment] });
  },
};
