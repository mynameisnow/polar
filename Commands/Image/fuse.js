const Canvacord = require("canvacord");

module.exports = {
  name: "fuse",
  aliases: [],
  permissions: "SendMessages",
  description: "Fuses two images.",
  cooldown: 0,
  ownerOnly: true,
  async execute(message, args, commandName, client, Discord) {
    const user = message.mentions.users.first() || message.author;
    let user2 = message.mentions.users.last() || message.author;
    if (user === user2) user2 = message.author;
    const avatar = user.displayAvatarURL({
      dynamic: false,
      format: "png",
    });
    const avatar2 = user2.displayAvatarURL({
      dynamic: false,
      format: "png",
    });
    const image = await Canvacord.Canvas.fuse(avatar, avatar2);
    const attachment = await new Discord.AttachmentBuilder(image, "fuse.png");
    const embed = new Discord.EmbedBuilder()
      .setAuthor(
        message.author.username,
        message.author.displayAvatarURL({ dynamic: true })
      )
      .setImage("attachment://fuse.png");

    message.channel.send({ embeds: [embed], files: [attachment] });
  },
};
