const { Canvas } = require("canvacord");

module.exports = {
  name: "sepia",
  aliases: [],
  permissions: "SendMessages",
  description: "Sends a user's avatar with a sepia filter.",
  cooldown: 0,
  ownerOnly: true,
  async execute(message, args, commandName, client, Discord) {
    const sepUser = message.mentions.members.first() || message.member;

    const avatar = sepUser.user.displayAvatarURL({
      format: "png",
      dynamic: true,
      size: 1024,
    });

    const image = await Canvas.sepia(avatar);

    const attachment = new Discord.AttachmentBuilder(image, "sepia.gif");

    message.channel.send({ files: [attachment] });
  },
};
