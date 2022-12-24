/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
// const { CommandInteraction, Client, EmbedBuilder } = require('discord.js');
const fetch = require("node-fetch");
const giphyAPIKey = "qeARgZjujx9vO64k44tX6dA1tK02HgF4";
module.exports = {
  name: "gif",
  aliases: [],
  permissions: "SendMessages",
  description: "Searches for a gif.",
  cooldown: 2,
  async execute(message, args, commandName, client, Discord) {
    const msg = args.join(" ");
    // const msg = args[0].split(/ +/).join('+');
    if (!msg) return message.channel.send("Please supply a search query!!");
    const res = fetch(
      `https://api.giphy.com/v1/gifs/search?q=${msg}&api_key=${giphyAPIKey}&limit=1`
    )
      .then((res) => res.json())
      .then((json) => {
        if (json.data.length <= 0)
          return message.channel.send("No gifs found!");
        console.log(json.data);
        message.channel.send(`${json.data[0].url}`);
      });
    /*	const gif = json.data[0].url;
				const gE = new Discord.EmbedBuilder()
					.setColor('RANDOM')
					.setImage(gif);
				message.channel.send({ embeds: [gE] });
			}); */
  },
};
