/* eslint-disable no-unused-vars */
// const MessageAttachment = require('discord.js');
const { Canvas } = require("canvacord");
module.exports = {
  name: "wasted",
  aliases: [],
  permissions: "SendMessages",
  description: "Image maniuplation command: wasted.",
  cooldown: 0,
  ownerOnly: true,
  async execute(message, args, commandName, client, Discord) {
    const user = message.mentions.members.first() || message.member;

    const avatar = user.user.displayAvatarURL({ size: 2048, format: "png" });

    const image = await Canvas.wasted(avatar);
    const attachment = new Discord.AttachmentBuilder(image, "wasted.png");
    message.channel.send({ files: [attachment] });
  },
};
