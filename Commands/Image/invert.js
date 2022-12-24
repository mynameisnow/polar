const { Canvas } = require("canvacord");

module.exports = {
  name: "invert",
  aliases: ["invrt"],
  permissions: "SendMessages",
  description: "Sends a user's avatar with a wanted poster.",
  cooldown: 0,
  ownerOnly: true,
  async execute(message, args, commandName, client, Discord) {
    const wUser = message.mentions.members.first() || message.member;

    const avatar = wUser.user.displayAvatarURL({
      format: "png",
      dynamic: true,
      size: 1024,
    });

    const image = await Canvas.invert(avatar);

    const attachment = new Discord.AttachmentBuilder(image, "invert.gif");

    /* const aE = new Discord.EmbedBuilder()
			.setColor('RANDOM')
			.setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
			.setImage(attachment);

		message.channel.send({ embeds: [aE] }); */
    message.channel.send({ files: [attachment] });
  },
};
