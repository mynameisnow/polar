const { Canvas } = require("canvacord");

module.exports = {
  name: "burn",
  aliases: [],
  permissions: "SendMessages",
  description: "Sends a user's avatar with a burned filter.",
  cooldown: 0,
  ownerOnly: true,
  async execute(message, args, commandName, client, Discord) {
    const burnUser = message.mentions.members.first() || message.member;

    const lvl = args.join(" ");

    const avatar = burnUser.user.displayAvatarURL({
      format: "png",
      dynamic: true,
      size: 1024,
    });

    const image = await Canvas.burn(avatar);

    const attachment = new Discord.AttachmentBuilder(image, lvl, "burn.gif");

    message.channel.send({ files: [attachment] });
  },
};
