const Canvacord = require("canvacord");

module.exports = {
  name: "kiss",
  aliases: [],
  permissions: "SendMessages",
  description: "Makes two avatars kiss.",
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
    const image = await Canvacord.Canvas.kiss(avatar, avatar2);
    const attachment = await new Discord.AttachmentBuilder(image, "kiss.png");
    const embed = new Discord.EmbedBuilder()
      .setAuthor(
        message.author.username,
        message.author.displayAvatarURL({ dynamic: true })
      )
      .setImage("attachment://kiss.png");

    message.channel.send({ embeds: [embed], files: [attachment] });
  },
};
