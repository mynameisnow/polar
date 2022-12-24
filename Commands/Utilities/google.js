/* eslint-disable no-unused-vars */
const googleIt = require("google-it");
const { EmbedBuilder, ButtonBuilder, ActionRowBuilder } = require("discord.js");

module.exports = {
  name: "google",
  aliases: [],
  permissions: "SendMessages",
  description: "Searches for something on Google.",
  cooldown: 2,
  async execute(message, args, commandName, client, Discord) {
    const button = new ButtonBuilder()
      .setCustomId("left")
      .setStyle("PRIMARY")
      .setEmoji("◀️")
      .setDisabled(true);

    const button1 = new ButtonBuilder()
      .setCustomId("right")
      .setStyle("PRIMARY")
      .setEmoji("▶️")
      .setDisabled(true);

    const row = new ActionRowBuilder().addComponents(button, button1);

    const embed = new EmbedBuilder()
      .setAuthor(
        "Google Search Results",
        "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/2000px-Google_%22G%22_Logo.svg.png"
      )
      .setColor("Random")
      .setTimestamp()
      .setThumbnail(
        "https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_160x56dp.png"
      );

    googleIt({ query: args.join(" ") })
      .then((results) => {
        results.forEach(function (item, index) {
          // embed.addField((index + 1) + ': ' + item.title + item.description, '<' + item.link + '>');
          embed.addField(item.title, "<" + item.link + ">"); // item.snippet
        });

        message.channel.send({ embeds: [embed], component: [row] });
      })
      .catch((e) => {
        console.log(
          "Error while attempting to search Google. " + e + " " + Date.now()
        );
        message.reply({
          content: "An error occured searching searching Google",
        });
      });
  },
};
