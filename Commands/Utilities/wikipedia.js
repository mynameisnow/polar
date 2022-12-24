/* eslint-disable no-unused-vars */
const fetch = require("node-fetch");
const { EmbedBuilder } = require("discord.js");
module.exports = {
  name: "wikipedia",
  aliases: [],
  permissions: "SendMessages",
  description: "Searches for something on Wikipedia.",
  cooldown: 2,
  async execute(message, args, commandName, client, Discord) {
    const suffix = args.join(" ");

    const result = await fetch(
      `https://en.wikipedia.org/w/api.php?action=parse&prop=text&format=json&page=${suffix}`
    )
      .then((res) => res.text())
      .then((body) => {
        const processedArticleContents = unescape(
          Object.values(Object.values(JSON.parse(body))[0].text)[0].replace(
            /(<([^>]+)>)/gi,
            ""
          )
        );

        const embed = new EmbedBuilder()
          .setTitle("Search Bot - Wikipedia")
          .setColor("Random")
          .setTimestamp()
          .addField(
            "Article contents",
            processedArticleContents.substr(
              0,
              processedArticleContents.indexOf("\n")
            )
          )
          // .addField('Article Contents', result)
          .setThumbnail(
            "https://cdn.discordapp.com/avatars/859535799790862336/b015b1b7e7e5a9cb0d7f75756226aaf9.png?size=128"
          );

        if (
          processedArticleContents.length !=
          processedArticleContents.substr(
            0,
            Object.values(Object.values(JSON.parse(body))[0].text)[0].indexOf(
              "\n"
            )
          ).length
        ) {
          embed.addField(
            "Article contents cut off",
            "For more information on the topic, see the full Wikipedia article: https://en.wikipedia.org/wiki/" +
              escape(suffix)
          );
        }

        message.channel.send(embed);
      });
  },
};
