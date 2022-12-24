/* eslint-disable no-constant-condition */
/* eslint-disable no-unused-vars */
const { EmbedBuilder } = require("discord.js");
const translate = require("@iamtraction/google-translate");

module.exports = {
  name: "translate",
  aliases: [],
  permissions: "SendMessages",
  description: "Translates text using Google translate.",
  cooldown: 2,
  execute(message, args, commandName, client, Discord) {
    const txt = args.slice(1).join(" ");
    const lang = args[0];
    // if (lang = 'Chinese' || 'chinese') return message.channel.send('Use zh-CN for Chinese dumbass');
    if (!lang)
      return message.channel.send("Provide the ISO code of the language.");
    if (!txt) return message.channel.send("Provide a text to translate.");
    if (txt.length > 120) {
      return message.reply({
        content: "Please enter less than 120 words.",
        allowedMentions: { repliedUser: false },
      });
    }
    translate(txt, { to: lang })
      .then((res) => {
        const embed = new EmbedBuilder()
          .setAuthor(
            `Translated into ${lang}`,
            "https://cdn.discordapp.com/attachments/897216213892075560/917129146738561024/Translate_logo.png"
          )
          .setThumbnail(
            "https://cdn.discordapp.com/attachments/897216213892075560/917129146738561024/Translate_logo.png"
          )
          .addField("Your text", `${txt}`)
          // .setDescription(res.text)
          .addField("Translation", res.text)
          .setColor("Random");
        message.channel.send({ embeds: [embed] });
      })
      .catch((error) => {
        message.channel.send(`Unexpected error: ${error}.`);
      });
  },
};
