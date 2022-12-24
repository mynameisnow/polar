/* eslint-disable no-shadow */
module.exports = {
  name: "poll",
  aliases: [],
  permissions: "SendMessages",
  description: "Creates a poll.",
  cooldown: 5,
  async execute(message, args, commandName, client, Discord) {
    // const pollChannel = message.mentions.channels.first();

    const pollQuestion = args[0];

    if (!pollQuestion)
      return message.channel.send("Please enter a question for the poll");

    const polls = args.slice(1).join(" ");

    const regex = polls.match(/"[^"]+"|[\\S]+"[^"]+/g);

    if (regex.length >= 9) {
      return message.channel.send(
        `**${message.author.username}**, you can only have 9 poll options.`
      );
    }

    let str = "";

    const emojis = ["1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣", "6️⃣", "7️⃣", "8️⃣", "9️⃣"];

    let i = 0;

    for (const poll of regex) {
      str = str + `${emojis[i]} ${poll}\n\n`;
      i++;
    }
    const embed = new Discord.EmbedBuilder()
      .setTitle(pollQuestion)
      .setDescription(str.replace(/"/g, ""));

    const msg = await message.channel.send(embed);

    for (let i = 0; i < regex.length; i++) {
      msg.react(emojis[i]);
    }
  },
};
