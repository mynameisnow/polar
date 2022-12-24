/* eslint-disable no-unused-vars */
const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "8ball",
  aliases: [],
  permissions: "SendMessages",
  description: "8ball",
  cooldown: 0,
  async execute(message, args, commandName, client, Discord) {
    const i = [
      "It is certain.",
      "It is decidedly so.",
      "Without a doubt.",
      "Yes - definitely.",
      "You may rely on it.",
      "As I see it, yes.",
      "Most likely.",
      "Outlook good.",
      "Yes.",
      "Signs point to yes.",
      "Reply hazy, try again.",
      "Ask again later.",
      "Better not tell you now.",
      "Cannot predict now.",
      "Concentrate and ask again.",
      "Don't count on it.",
      "My reply is no.",
      "My sources say no.",
      "Outlook not so good.",
      "Very doubtful.",
    ];

    const y = i[Math.floor(i.length * Math.random())];

    const question = args.join(" ");

    const ErrorE = new EmbedBuilder()
      .setTitle("❌ Can't Run Code With The Strings Given ❌")
      .setColor("Red")
      .setDescription("Question Can't Be More Than 2000 Characters");

    const ErrorE1 = new EmbedBuilder()
      .setTitle("❌ Please ask the 8ball a question! ❌")
      .setColor("Red");

    if (question.length > 2000) {
      return message.reply({ embeds: [ErrorE], ephemeral: true });
    }

    if (!question) return message.reply({ embeds: [ErrorE1], ephemeral: true });

    const Response = new EmbedBuilder()
      /* .setAuthor(member.user.username, member.user.displayAvatarURL({
				dynamic: true,
				size: 512,
			})) */
      .setColor("2473f2")
      // .setFooter(message.author.username, message.author.displayAvatarURL())
      .setDescription(y);

    message.channel.send({
      embeds: [Response],
      allowedMentions: { repliedUser: false },
    });
  },
};
