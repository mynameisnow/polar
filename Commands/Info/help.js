/* eslint-disable no-unused-vars */
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder } = require("discord.js");

module.exports = {
  name: "help",
  aliases: [],
  permissions: "SendMessages",
  description: "Sends an embed with the list of commands.",
  cooldown: 3,
  async execute(message, args, commandName, client, Discord) {
    const help = new EmbedBuilder()
      .setTitle("<:menu:995407763859587112> Doggo Help Menu")
      .setColor("Blue")
      .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
      // .setDescription('To see all my cmds press the buttons below')
      .addFields([
        {
          name: "<:icons_info:950098755070333018>	Info",
          value: "`10 Information cmds`",
          inline: true,
        },
        {
          name: "<:boat_settings:952581072074469506> Utility",
          value: "`3 Utility cmds`",
          inline: true,
        },
        /* {
					name: '<:boat_games:952640545933652059> Fun',
					value: '`5 Fun cmds`',
					inline: true,
				}, {
					name: '<:icons_image:953057800962048090> Image',
					value: '`17 Image cmds`',
					inline: true,
				}, */ {
          name: "<:icons_hammer:950097968780943430> Moderation",
          value: "`5 Moderation cmds`",
          inline: true,
        } /* {					name: '<:utility:935073407387725924> Configuration',					value: '`2 Configuration cmds`',					inline: true,				}, */,
      ])
      .setTimestamp();
    // .setFooter({ text: 'Thank you for choosing guardian' });

    const embed1 = new EmbedBuilder()
      .setTitle("Information Commands")
      .setDescription(
        "`botinfo`, `serverinfo`, `userinfo`, `roleinfo`, `banner`, `avatar`, `roles`, `serverbanner`, `servericon`, `serversplash`"
      )
      .setColor("2e3137")
      .setTimestamp();

    const embed2 = new EmbedBuilder()
      .setColor("2e3137")
      .setTitle("Utility Commands")
      .setDescription("`embed`, `big`, `google`, `say`, `rev`, `translate`")
      .setTimestamp();

    const embed3 = new EmbedBuilder()
      .setColor("2e3137")
      .setTitle("Fun Commands")
      .setDescription("`8ball`, `gif`, `pp`, `reverse`, `urban`")
      .setTimestamp();

    const embed4 = new EmbedBuilder()
      .setColor("2e3137")
      .setTitle("Image Commands")
      .setDescription(
        "`blur`, `burn`, `catsay`, `gray`, `fuse`, `hitler`, `invert`, `kiss`, `pixelate`, `rainbow`, `rip`, `trash`, `triggered`, `wanted`, `wasted`, `whoosh`"
      )
      .setTimestamp();

    const embed5 = new EmbedBuilder()
      .setColor("2e3137")
      .setTitle("Moderation Commands")
      .setDescription(
        "`ban`, `bans`, `hackban`, `snipe`, `timeout`, `unban`, `jail/unjail`, `timeout`,`lock/unlock` `lockdown on/off`, `clear`"
      )
      .setTimestamp();

    /* const embed6 = new EmbedBuilder()
			.setColor('2e3137')
			.setTitle('Configuration Commands')
			.setDescription('`/welcomesetup`')
			.setTimestamp(); */

    const row = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setStyle("SECONDARY")
        .setEmoji("935072188233547806")
        .setCustomId("info"),

      new ButtonBuilder()
        .setStyle("SECONDARY")
        .setEmoji("935089387040022579")
        .setCustomId("utility"),

      /* new ButtonBuilder()
					.setStyle('SECONDARY')
					.setEmoji('952640545933652059')
					.setCustomId('premium'),

				new ButtonBuilder()
					.setStyle('SECONDARY')
					.setEmoji('953057800962048090')
					.setCustomId('ticket'), */

      new ButtonBuilder()
        .setStyle("SECONDARY")
        .setEmoji("icons_hammer:950097968780943430")
        .setCustomId("moderation"),

      new ButtonBuilder()
        .setStyle("PRIMARY")
        .setCustomId("home")
        .setEmoji("🏠"),
      new ButtonBuilder()
        .setStyle("DANGER")
        .setCustomId("delete")
        .setEmoji("<:icons_delete:950098270384967690>")
    );

    const row2 = new ActionRowBuilder()
      .addComponents
      /* new ButtonBuilder()
					.setStyle('SECONDARY')
					.setCustomId('configuration')
					.setEmoji('935073407387725924'), */
      ();

    const row3 = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setStyle("LINK")
        .setEmoji("930143460277751808")
        .setURL(
          "https://discord.com/api/oauth2/authorize?client_id=912773129183563776&permissions=1099917896758&scope=bot%20applications.commands"
        )
        .setLabel("Invite Guardian")
    );

    const row4 = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setDisabled()
        .setStyle("SECONDARY")
        .setEmoji("950098755070333018")
        .setCustomId("info"),

      new ButtonBuilder()
        .setDisabled()
        .setStyle("SECONDARY")
        .setEmoji("935089387040022579")
        .setCustomId("utility"),

      /* new ButtonBuilder()
					.setDisabled()
					.setStyle('SECONDARY')
					.setEmoji('929433743599489044')
					.setCustomId('premium'),

				new ButtonBuilder()
					.setDisabled()
					.setStyle('SECONDARY')
					.setEmoji('953057800962048090')
					.setCustomId('ticket'), */

      new ButtonBuilder()
        .setDisabled()
        .setStyle("SECONDARY")
        .setEmoji("icons_hammer:950097968780943430")
        .setCustomId("moderation"),

      new ButtonBuilder()
        .setDisabled()
        .setStyle("PRIMARY")
        .setCustomId("home")
        .setEmoji("🏠"),
      new ButtonBuilder()
        .setDisabled()
        .setStyle("DANGER")
        .setCustomId("delete")
        .setEmoji("<:icons_delete:950098270384967690>")
    );

    const row5 = new ActionRowBuilder().addComponents();

    const msg = await message.channel.send({
      embeds: [help],
      components: [row],
      allowedMentions: { repliedUser: false },
    });

    const collector = message.channel.createMessageComponentCollector({
      time: 1000 * 60,
    });

    collector.on("collect", async (interaction) => {
      if (interaction.user.id !== message.author.id) {
        interaction.reply({
          content: "You cannot interact with this message's buttons.",
          ephemeral: true,
        });
      }
      if (interaction.customId === "home") {
        await interaction.update({ embeds: [help], components: [row] });
      }
      if (interaction.customId === "info") {
        await interaction.update({ embeds: [embed1], components: [row] });
      } else if (interaction.customId === "utility") {
        await interaction.update({ embeds: [embed2], components: [row] });
      } else if (interaction.customId === "premium") {
        await interaction.update({ embeds: [embed3], components: [row] });
      } else if (interaction.customId === "ticket") {
        await interaction.update({ embeds: [embed4], components: [row] });
      } else if (interaction.customId === "moderation") {
        await interaction.update({ embeds: [embed5], components: [row] });
      } else if (interaction.customId === "delete") {
        /* else if (interaction.customId === 'configuration') {
				await interaction.reply({ embeds: [embed6], components: [row3], ephemeral: true });
			} */
        await msg.delete();
        message.delete();
      }
    });

    collector.on("end", async () => {
      msg.edit({
        embeds: [help],
        components: [row4],
      });
    });
  },
};
