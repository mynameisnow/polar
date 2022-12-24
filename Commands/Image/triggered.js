/* eslint-disable no-unused-vars */
// const MessageAttachment = require('discord.js');
const { Canvas } = require("canvacord");
module.exports = {
  name: "triggered",
  aliases: ["trgr", "trgrd"],
  permissions: "SendMessages",
  description: "Image maniuplation command: triggered.",
  cooldown: 0,
  ownerOnly: true,
  async execute(message, args, commandName, client, Discord) {
    const user = message.mentions.members.first() || message.member;

    const avatar = user.user.displayAvatarURL({ size: 2048, format: "png" });

    const image = await Canvas.trigger(avatar);
    const attachment = new Discord.AttachmentBuilder(image, "triggered.gif");
    message.channel.send({ files: [attachment] });
    /* message.channel.send({
			files: [
				{
					attachment: `https://some-random-api.ml/canvas/triggered?avatar=${avatar}`,
					name: 'file.jpg',
				},
			],
		}); */
  },
};
