/* eslint-disable no-unused-vars */
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder } = require("discord.js");
module.exports = {
  name: "unban",
  aliases: [],
  permissions: "SendMessages",
  description: "Unbans a member.",
  cooldown: 3,
  async execute(message, args, commandName, client, Discord) {
    // if (message.deletable) {await message.delete();}
    const guild = message.guild.name;
    // Variables:
    let reason = args.slice(1).join(" ");
    const userID = args[0];
    message.guild.bans.fetch().then(async (bans) => {
      // Input Checking:
      if (bans.size == 0)
        return message.channel.send("This server does not have anyone banned.");

      if (!reason) reason = "No reason given.";
      if (!userID)
        return message.channel.send(
          "You must state a member to unban. `>unban ID reason`"
        );
      args.shift();
      if (isNaN(userID))
        return message.channel.send(
          "The ID stated is not a number `>unban ID reason`"
        );

      // Executting:

      const bUser = bans.find((b) => b.user.id == userID);
      if (!bUser)
        return message.channel.send("The user ID stated is not banned");
      await message.guild.members
        .unban(bUser.user, reason)
        .catch((err) =>
          console
            .log(err)
            .then(message.channel.send("Somthing went wrong unbanning the ID."))
        );
      const row = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
          .setStyle("PRIMARY")
          .setEmoji()
          .setLabel("Generate Invite")
          .setCustomId("invite")
      );
      message.channel.send({
        embeds: [
          new EmbedBuilder()
            .setTitle("Unban Successful")
            .setThumbnail(
              bUser.user.displayAvatarURL({ dynamic: true, size: 1024 })
            )
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
            .setTimestamp(),
        ],
        components: [row],
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
        const invite = await message.channel.createInvite({
          unique: true,
          maxUses: 1,
        });
        if (interaction.customId === "invite") {
          await interaction.reply({
            content: `Here is the invite link to invite this user again: ${invite}`,
            ephemeral: true,
          });
        }

        // await bUser.send(`Hello! You have been unbanned from ${guild}. Here is your new invite link: ${invite}`);
      });
    });
  },
};
// .addField('User Unbanned', `${bUser?.user?.tag}`)
// .addField('Reason', reason.toString())
// .addField('Moderator' `${message.author.username}`)
// .setColor('#00ff00'),
