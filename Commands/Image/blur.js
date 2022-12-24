const { Canvas } = require("canvacord");

module.exports = {
  name: "blur",
  aliases: [],
  permissions: "SendMessages",
  description: "Sends a user's avatar with a blurred filter.",
  cooldown: 0,
  ownerOnly: true,
  async execute(message, args, commandName, client, Discord) {
    const blurUser = message.mentions.members.first() || message.member;

    const avatar = blurUser.user.displayAvatarURL({
      format: "png",
      dynamic: true,
      size: 1024,
    });

    const image = await Canvas.blur(avatar);

    const attachment = new Discord.AttachmentBuilder(image, "blur.gif");

    message.channel.send({ files: [attachment] });
  },
};
