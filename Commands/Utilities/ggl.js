/* eslint-disable no-unused-vars */
const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "ggl",
  aliases: [],
  permissions: "SendMessages",
  description: "Searches for something on Google.",
  cooldown: 2,
  execute(message, args, commandName, client, Discord) {
    const text1 = args.join(" ");
    const text2 = args.join("+");
    const google =
      "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/2000px-Google_%22G%22_Logo.svg.png";
    if (!text2) {
      return message.channel.send("Enter some to search for");
    }
    const embed = new EmbedBuilder()
      .setAuthor(
        "Google",
        "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/2000px-Google_%22G%22_Logo.svg.png"
      )
      .setThumbnail(
        "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/2000px-Google_%22G%22_Logo.svg.png"
      )
      .setDescription(
        `**Searched for: **\n${text1} \n\n**Result: **\n[Here's What I found](https://google.com/search?q=${text2})`
      )
      .setThumbnail(google)
      .setColor("Random");
    message.channel.send({ embeds: [embed] });
  },
};