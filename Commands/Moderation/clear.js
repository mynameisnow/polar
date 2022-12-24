module.exports = {
  name: "clear",
  permissions: ["MANAGE_MESSAGES"],
  cooldown: 4,
  description: "Clear messages!",
  async execute(message, args, commandName, client, Discord) {
    const fM = message.channel || message.mentions.members.first();

    const delamount = parseInt(args[0]) + 1;
    if (!delamount) {
      const nopr = new Discord.EmbedBuilder()
        .setTimestamp()
        .setColor("Random")
        .setAuthor(
          `${message.author.username}`,
          message.author.displayAvatarURL({ dynamic: true })
        )
        .setDescription("**`(prefix)clear <number>`**");
      return message.channel.send({ embeds: [nopr] });
    }
    if (isNaN(delamount)) {
      const nonum = new Discord.EmbedBuilder()
        .setTimestamp()
        .setColor("Random")
        .setAuthor(
          `${message.author.username}`,
          message.author.displayAvatarURL({ dynamic: true })
        )
        .setDescription(`**\`${delamount}\` Is Not A Number!**`);
      return message.channel.send({ embed: [nonum] });
    }
    if (delamount > 100) {
      const maxlen = new Discord.EmbedBuilder()
        .setTimestamp()
        .setColor("Random")
        .setAuthor(
          `${message.author.username}`,
          message.author.displayAvatarURL({ dynamic: true })
        )
        .setDescription(
          "**You Are Not Allowed To Delete More Than `100` Messages!**"
        );
      return message.channel.send({ embeds: [maxlen] });
    }
    if (delamount < 1) {
      const minlen = new Discord.EmbedBuilder()
        .setTimestamp()
        .setColor("Random")
        .setAuthor(
          `${message.author.username}`,
          message.author.displayAvatarURL({ dynamic: true })
        )
        .setDescription("**You Have To Delete At Least `1` Message!**");
      return message.channel.send({ embeds: [minlen] });
    }
    const dE = new Discord.EmbedBuilder()
      .setColor("#edb83b")
      // .setTitle(`<:icons_sweep:994248437996474389> ${message.author.username} has cleared ${delamount - 1} messages!`);
      .setAuthor({
        name: `${message.author.username} has cleared ${
          delamount - 1
        } messages!`,
        iconURL:
          "https://cdn.discordapp.com/emojis/994248437996474389.webp?size=240&quality=lossless",
      });
    // .setThumbnail('https://cdn.discordapp.com/attachments/921886995645599847/994248367641206875/unknown.png')
    // .setTimestamp();
    // await message.channel.messages.fetch({ limit: args[0] }).then(messages => {
    fM.bulkDelete(delamount, true);
    fM.bulkDelete(delamount);
    message.channel.send({ embeds: [dE] }).then((m) => {
      setTimeout(() => {
        m.delete();
      }, 5000); // 5 seconds
      return;
    });
    // });
  },
};
/* catch (err) {
			return message.channel.send({ content: '**Cannot Delete Message Old Than 14 Days!**' })
				.then(message => {
					setTimeout(() => message.delete(), 6000);
				});
		} */
