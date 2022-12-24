const { Canvas } = require("canvacord");

module.exports = {
  name: "whoosh",
  aliases: ["wsh"],
  permissions: "SendMessages",
  description: "The joke went over your head.",
  cooldown: 0,
  ownerOnly: true,
  async execute(message, args, commandName, client, Discord) {
    const joHUser = message.mentions.members.first() || message.member;

    const avatar = joHUser.user.displayAvatarURL({
      format: "png",
      dynamic: true,
      size: 1024,
    });

    const image = await Canvas.jokeOverHead(avatar);

    const attachment = new Discord.AttachmentBuilder(image, "jokeOverHead.gif");

    message.channel.send({ files: [attachment] });
  },
};
