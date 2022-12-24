// const { MessageAttachment } = require('discord.js');
const { Canvas } = require("canvacord");

module.exports = {
  name: "hitler",
  aliases: [],
  permissions: "SendMessages",
  description: "Worse than hitler!",
  cooldown: 0,
  ownerOnly: true,
  async execute(message, args, commandName, client, Discord) {
    const ripuser = message.mentions.members.first() || message.member;

    const avatar = ripuser.user.displayAvatarURL({ format: "png" });

    const image = await Canvas.hitler(avatar);

    const attachment = new Discord.AttachmentBuilder(image, "hitler.png");
    const embed = new Discord.EmbedBuilder()
      .setAuthor(
        message.author.username,
        message.author.displayAvatarURL({ dynamic: true })
      )
      .setColor("Random")
      .setImage("attachment://hitler.png");

    message.channel.send({ embeds: [embed], files: [attachment] });
  },
};
