/* eslint-disable no-unused-vars */
const { ButtonBuilder, EmbedBuilder, ActionRowBuilder } = require("discord.js");

module.exports = {
  name: "invite",
  aliases: ["inv", "i"],
  permissions: "SendMessages",
  description: "Sends an invite link for the bot.",
  cooldown: 10,
  execute(message, args, commandName, client, Discord) {
    const invButton = new ButtonBuilder()
      .setStyle("LINK")
      .setURL(
        "https://discord.com/oauth2/authorize?client_id=831353144670683147&scope=bot&permissions=8589934591"
      )
      .setLabel("Invite me!")
      .setEmoji("<:di:897217731751981077>")
      .setDisabled(true);

    const supportButton = new ButtonBuilder()
      .setStyle("LINK")
      .setURL("https://discord.gg/ueMHERqP5j")
      .setLabel("Support Server")
      .setEmoji("<:discord:897222067957674004>")
      .setDisabled(true);

    const embed = new EmbedBuilder()
      .setAuthor("Doggo Bot")
      // .setThumbnail(client.displayAvatarURL())
      .setDescription(
        "This bot is not currently available to the public yet, but feel free to join the Doggo Discord."
      )
      .setColor("WHITE")
      .setTimestamp();

    const row = new ActionRowBuilder()
      .addComponents(invButton)
      .addComponents(supportButton);

    message.channel.send({ embeds: [embed], components: [row] });
  },
};
