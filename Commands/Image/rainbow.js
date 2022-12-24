const { Canvas } = require("canvacord");

module.exports = {
  name: "rainbow",
  aliases: [],
  permissions: "SendMessages",
  description: "Sends a user's avatar with a rainbow filter.",
  cooldown: 0,
  ownerOnly: true,
  async execute(message, args, commandName, client, Discord) {
    const rUser = message.mentions.members.first() || message.member;

    const avatar = rUser.user.displayAvatarURL({
      format: "png",
      dynamic: true,
      size: 1024,
    });

    const image = await Canvas.rainbow(avatar);

    const attachment = new Discord.AttachmentBuilder(image, "rainbow.gif");

    message.channel.send({ files: [attachment] });
  },
};
