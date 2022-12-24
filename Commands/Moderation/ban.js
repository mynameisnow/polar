/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
// const EmbedBuilder = require('discord.js');
const { ActionRowBuilder, ButtonBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  name: "ban",
  aliases: [],
  permissions: "BanMembers",
  description: "Bans a user.",
  cooldown: 3,
  async execute(message, args, commandName, client, Discord) {
    // const target = message.guild.members.cache.find(m => m.id === args[1]) || message.mentions.members.first() || message.guild.members.cache.find(m => m.id === args[1]);
    const target =
      message.mentions.members.first() ||
      (await message.guild.members.get(args[0]));

    if (!target) return message.channel.send("Usage: ,ban (user) (reason)");

    if (target.user === client.user) return message.channel.send(":/");

    if (target.user === message.member.user)
      return message.channel.send("You can't ban yourself silly!");

    // if (target.roles.highest.position > message.guild.me.roles.highest.position) return message.channel.send('Their highest role position is higher than my highest role.');

    // if (target.roles.highest.position === message.member.roles.highest.position) return message.channel.send('Your highest role position is the same as the targeted member\'s highest role');

    // if (target.roles.highest.position > message.member.roles.highest.position) return message.channel.send('Their role position is higher than your highest role');

    // if (target.roles.highest.position === message.guild.me.roles.highest.position) return message.channel.send('Their highest role is the same position as mine');

    const reason = args.slice(1).join(" ") || "No reason given";

    if (reason && reason.length > 512)
      return message.channel.send(
        "The reason must be less than 512 characters!"
      );

    const unbanReason = args.slice(1).join(" ");

    if (unbanReason && unbanReason.length > 512)
      return message.channel.send(
        "The reason must be less than 512 characters!"
      );

    if (target.bannable === false)
      return message.channel.send("I am unable to ban this member!");

    const embed = new EmbedBuilder()
      .setTitle(` ${target.user.username} has been banned `)
      .setThumbnail(target.displayAvatarURL({ dynamic: true, size: 1024 }))
      .setColor("Red")

      .addFields([
        {
          name: "Banned by:",
          value: message.member.user.username,
          inline: true,
        },
        {
          name: "Reason:",
          value: reason ? reason : "No reason specified",
          inline: false,
        },
      ])
      .setTimestamp();
    console.log("what the fuck");
    const unbed = new Discord.EmbedBuilder()
      .setTitle(` ${target.user.username} has been unbanned `)
      .setThumbnail(target.displayAvatarURL({ dynamic: true, size: 1024 }))
      .setColor("Green")
      .addFields([
        {
          name: "Unbanned by:",
          value: message.member.user.username,
          inline: true,
        },
        {
          name: "Reason:",
          value: reason ? reason : "No reason specified",
          inline: false,
        },
      ])
      .setTimestamp();

    const row = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setStyle("SUCCESS")
        .setEmoji()
        .setLabel("Unban")
        .setCustomId("unban")
    );
    try {
      target.ban({ days: 0, reason: reason }).then(
        message.channel.send({ embeds: [embed], components: [row] })
        // message.channel.send({ embeds: [embed] }),
      );
    } catch (err) {
      message.channel.send("I am unable to ban this member");
      console.log(err);
    }

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
      if (interaction.customId === "unban") {
        await interaction.update({ embeds: [unbed], components: [] });
      }
      await message.guild.members
        .unban(target.user)
        .catch((err) =>
          console
            .log(err)
            .then(message.channel.send("Somthing went wrong unbanning the ID."))
        );
    });
  },
};
