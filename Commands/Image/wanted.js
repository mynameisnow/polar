// const { MessageAttachment } = require('discord.js');
const { Canvas } = require("canvacord");

module.exports = {
  name: "wanted",
  aliases: [],
  permissions: "SendMessages",
  description: "Sends a user's avatar with a wanted poster.",
  cooldown: 0,
  ownerOnly: true,
  async execute(message, args, commandName, client, Discord) {
    const wUser = message.mentions.members.first() || message.member;

    const avatar = wUser.user.displayAvatarURL({ format: "png" });

    const image = await Canvas.wanted(avatar);

    const attachment = new Discord.AttachmentBuilder(image, "wanted.gif");

    message.channel.send({ files: [attachment] });
  },
};
