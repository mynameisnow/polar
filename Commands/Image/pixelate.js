const { Canvas } = require("canvacord");

module.exports = {
  name: "pixelate",
  aliases: ["pixel"],
  permissions: "SendMessages",
  description: "Pixelates a user's avatar.",
  cooldown: 0,
  ownerOnly: true,
  async execute(message, args, commandName, client, Discord) {
    const pUser = message.mentions.members.first() || message.member;

    const pxls = args[0];

    const avatar = pUser.user.displayAvatarURL({
      format: "png" || "gif",
      dynamic: true,
      size: 1024,
    });

    const image = await Canvas.pixelate(avatar);

    const attachment = new Discord.AttachmentBuilder(
      image,
      pxls,
      "pixelate.gif"
    );

    message.channel.send({ files: [attachment] });
  },
};
