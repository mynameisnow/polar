/* eslint-disable no-unused-vars */
const { ActionRowBuilder, ButtonBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  name: "helpbuttons",
  aliases: [],
  permissions: "SendMessages",
  description: "Sends an embed with the list of commands.",
  cooldown: 3,
  ownerOnly: true,
  async execute(message, args, commandName, client, Discord) {
    /* const command = client.commands.get(commandName) ||
        client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName)); */
    const embed0 = new EmbedBuilder()
      .setAuthor(
        `Help Page: ${client.commands.size} Commands`,
        client.user.displayAvatarURL()
      )
      .setTitle("Doggo Bot Help Page")
      .setThumbnail(client.user.displayAvatarURL())
      .setColor("AQUA")
      .addFields(
        {
          name: "<:settings:898322010990579762> __**Utility**__",
          value: "List of utility commands.",
          inline: true,
        },
        // { name: '\u200B', value: '\u200B' },
        {
          name: "<:mod:898321959237062668> __**Moderation**__",
          value: "List of moderation commands",
          inline: true,
        },
        {
          name: "<:info:898322116699643915> __**Information**__",
          value: "List of information commands",
          inline: true,
        },
        { name: "🎮 __**Fun**__", value: "List of fun commands", inline: true },
        {
          name: "<:image:898358312133865513> __**Image**__",
          value: "Mess around with image manipulation commands.",
          inline: true,
        }
      );
    const embed1 = new EmbedBuilder()
      .setTitle("Utility")
      .addFields(
        {
          name: "**afk**",
          value: "**Set your status if you will be away from keyboard.",
          inline: true,
        },
        // { name: '\u200B', value: '\u200B' },
        { name: "**big**", value: "Enlarges a custom emoji.", inline: true },
        {
          name: "**embed**",
          value: "Sends a custom embed to the specified channel.",
          inline: true,
        },
        {
          name: "**say**",
          value: "Sends a custom message to the specified channel.",
          inline: true,
        }
        // { name: '', value: 'Mess around with image manipulation commands.', inline: false },
      )
      .setThumbnail(client.user.displayAvatarURL())
      .setColor("Random");
    const embed2 = new EmbedBuilder()
      .setTitle("Moderation")
      .setDescription("Put moderation commands here.")
      .setColor("Random");

    const embed3 = new EmbedBuilder()
      .setTitle("Information")
      .addFields(
        {
          name: "**avatar**",
          value:
            "Sends a large version of a user's avatar.\n**Aliases: *av, pfp***",
          inline: true,
        },
        // { name: '\u200B', value: '\u200B' },
        {
          name: "**banner**",
          value:
            "Sends a large version of a user's banner.\n**Aliases: *bnr***",
          inline: true,
        },
        {
          name: "**botinfo**",
          value: "Sends info about me!\n**Aliases: *boti, stats, botstats***",
          inline: true,
        },
        {
          name: "**servericon**",
          value:
            "Sends a large version of the server's icon.\n**Aliases: *sicon, savatar, sav***",
          inline: true,
        },
        {
          name: "**serverinfo**",
          value: "Sends info about the server.\n**Aliases: *si***",
          inline: true,
        },
        {
          name: "**userinfo**",
          value:
            "Sends info about yourself or another user.\n**Aliases: *ui, whois***",
          inline: true,
        }
      )
      .setThumbnail(client.user.displayAvatarURL())
      .setColor("Random");

    const embed4 = new EmbedBuilder()
      .setTitle("Fun")
      .setDescription("Put image commands here")
      .setColor("Random");

    const embed5 = new EmbedBuilder()
      .setTitle("Image")
      .addFields(
        {
          name: "**invert**",
          value: "Inverts a user's profile picture colors.",
          inline: true,
        },
        {
          name: "**rainbow**",
          value: "Adds a rainbow filter over a user's avatar.",
          inline: true,
        },
        {
          name: "**rip**",
          value: "Puts a user's avatar on a tombstone.",
          inline: true,
        },
        {
          name: "**triggered**",
          value: "Adds a triggered filter over a user' avatar.",
          inline: true,
        },
        {
          name: "**wanted**",
          value: "Puts a user's avatar on a wanted poster.",
          inline: true,
        }
        // { name: '****', value: '', inline: true },
      )
      .setColor("Random");

    const button = new ButtonBuilder()
      .setLabel("Home")
      .setCustomId("help1")
      .setStyle("SUCCESS")
      .setEmoji("🏡");

    const button2 = new ButtonBuilder()
      .setLabel("Utility")
      .setCustomId("help2")
      .setStyle("SECONDARY")
      .setEmoji("<:settings:898322010990579762>");

    const button3 = new ButtonBuilder()
      .setLabel("Mod")
      .setCustomId("help3")
      .setStyle("SECONDARY")
      .setEmoji("<:mod:898321959237062668>");

    const button4 = new ButtonBuilder()
      .setLabel("Info")
      .setCustomId("help4")
      .setStyle("SECONDARY")
      .setEmoji("<:info:898322116699643915>");

    const button5 = new ButtonBuilder()
      .setLabel("Fun")
      .setCustomId("help5")
      .setStyle("SECONDARY")
      .setEmoji("🎲");

    const button6 = new ButtonBuilder()
      .setLabel("Image")
      .setCustomId("help6")
      .setStyle("SECONDARY")
      .setEmoji("🖼️");

    const button7 = new ButtonBuilder()
      .setLabel("Exit")
      .setCustomId("help7")
      .setStyle("DANGER")
      .setEmoji("🚪");

    const row = new ActionRowBuilder().addComponents(
      button,
      button2,
      button3,
      button4,
      button5
    );
    const row1 = new ActionRowBuilder().addComponents(button6, button7);

    const MESSAGE = await message.channel.send({
      embeds: [embed0],
      components: [row, row1],
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
      } else {
        if (b.customId === "help1") {
          b.update({ embeds: [embed0], components: [row, row1] });
        }
        if (b.customId === "help2") {
          b.update({ embeds: [embed1], components: [row, row1] });
        }
        if (b.customId === "help3") {
          b.update({ embeds: [embed2], components: [row, row1] });
        }
        if (b.customId === "help4") {
          b.update({ embeds: [embed3], components: [row, row1] });
        }
        if (b.customId === "help5") {
          b.update({ embeds: [embed4], components: [row, row1] });
        }
        if (b.customId === "help6") {
          b.update({ embeds: [embed5], components: [row, row1] });
        }
        if (b.customId === "help7") {
          b.delete;
        }
      }
    });
    collector.on("end", (b) => {
      MESSAGE.edit(
        "This help menu has been expired, please type the command again to view it."
      );
    });
  },
};
