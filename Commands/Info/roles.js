/* eslint-disable no-shadow */
/* eslint-disable prefer-const */
/* eslint-disable no-unused-vars */
/* eslint-disable no-mixed-spaces-and-tabs */
const { ActionRowBuilder, EmbedBuilder, ButtonBuilder } = require("discord.js");

module.exports = {
  name: "roles",
  aliases: ["rolelist"],
  description: "Check the roles for this guild ",
  permission: "SendMessages",
  cooldown: 5,
  ownerOnly: true,
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  async execute(message, args, commandName, client, Discord) {
    let i0 = 0;
    let i1 = 10;
    let page = 1;

    let description =
      "**_Roles :_**\n" +
      message.guild.roles.cache
        .sort((a, b) => b.position - a.position)
        .map((r) => r)
        .slice(i0, i1)
        .join("\n");

    const embed = new EmbedBuilder()
      .setAuthor(
        message.author.username,
        message.author.displayAvatarURL({ dynamic: true })
      )
      .setColor("Random")
      .setFooter(client.user.username, client.user.avatarURL())
      .setTitle(`〢Page ${page}`)
      .setDescription(description);

    const buttons = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId("previous")
        .setStyle("PRIMARY")
        .setLabel("❮"),
      // .setLabel('←'),
      new ButtonBuilder().setCustomId("next").setStyle("PRIMARY").setLabel("❯")
      // .setLabel('→'),
    );
    const MESSAGE = await message.channel.send({
      embeds: [embed],
      components: [buttons],
    });

    const collector = message.channel.createMessageComponentCollector({
      time: 60000,
    });
    collector.on("collect", async (b) => {
      if (b.user.id !== message.author.id) {
        b.reply({
          content: "You cannot interact with this message's buttons.",
          ephemeral: true,
        });
      } else if (b.customId === "previous") {
        // await b.deferUpdate();

        i0 = i0 - 10;
        i1 = i1 - 10;
        page = page - 1;

        let description =
          "**_Roles :_**\n" +
          message.guild.roles.cache
            .sort((a, b) => b.position - a.position)
            .map((r) => r)
            .slice(i0, i1)
            .join("\n");

        embed.setTitle(`〢Page ${page}`);
        embed.setDescription(description);

        await b.update({ embeds: [embed], components: [buttons] });
      }
      if (b.customId === "next") {
        // await b.deferUpdate();

        i0 = i0 + 10;
        i1 = i1 + 10;
        page = page + 1;

        let description =
          "**_Roles :_**\n" +
          message.guild.roles.cache
            .sort((a, b) => b.position - a.position)
            .map((r) => r)
            .slice(i0, i1)
            .join("\n");

        embed.setTitle(`〢Page ${page}`);
        embed.setDescription(description);

        await b.update({ embeds: [embed], components: [buttons] });
      }
    });
    MESSAGE.edit({ embeds: [embed], components: [buttons] });
  },
};
