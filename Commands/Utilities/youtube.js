/* eslint-disable no-unused-vars */
const { EmbedBuilder } = require("discord.js");
const API = require("leoapi.xyz");
const leo = new API();
module.exports = {
  name: "youtube",
  aliases: [],
  permissions: "SendMessages",
  description: "Gives info about a YouTube video.",
  cooldown: 2,
  ownerOnly: true,
  async execute(message, args, commandName, client, Discord) {
    try {
      const video = args.slice(0).join(" ");
      if (!video)
        return message.reply({
          content: "Please enter a video to search for.",
        });

      const data = await leo.data("youtube", {
        video,
      });
      if (data.error)
        return message.reply({ content: client.functions.error(data.error) });

      const embed = new EmbedBuilder({
        title: `Information about ${data.title}`,
        color: "RANDOM",
        fields: [
          { name: "Title", value: `${data.title}`, inline: true },
          { name: "Views", value: `${data.views}`, inline: true },
          { name: "Author", value: `${data.author}`, inline: true },
          // { name: 'Likes', value: `${data.likes}`, inline: true },
          { name: "Channel", value: `${data.channel}`, inline: true },
          { name: "Video", value: `${data.video}`, inline: true },
          { name: "Description", value: `${data.description}`, inline: true },
        ],
        thumbnail: {
          url: data.thumbnail,
        },
        footer: {
          text: `Requested by ${message.author.tag}`,
          icon_url: message.author.displayAvatarURL({
            format: "png",
            dynamic: true,
            size: 1024,
          }),
        },
      });
      message.channel.send({ embeds: [embed] });
    } catch (err) {
      console.log(`[Error - ${commandName.toUpperCase()}] : ` + err);
    }
  },
};
