const { Canvas } = require("canvacord");

module.exports = {
  name: "gray",
  aliases: ["grey", "grayscale", "greyscale"],
  permissions: "SendMessages",
  description: "Sends a user's avatar with a greyscale filter.",
  cooldown: 0,
  ownerOnly: true,
  async execute(message, args, commandName, client, Discord) {
    const gUser = message.mentions.members.first() || message.member;

    const avatar = gUser.user.displayAvatarURL({
      format: "png",
      dynamic: true,
      size: 1024,
    });

    const image = await Canvas.greyscale(avatar);

    const attachment = new Discord.AttachmentBuilder(image, "greyscale.gif");

    message.channel.send({ files: [attachment] });
  },
};
