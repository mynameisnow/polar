/* eslint-disable no-unused-vars */
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder } = require("discord.js");

module.exports = {
  name: "nuke",
  aliases: [],
  permissions: "ADMINISTRATOR",
  description: "Deletes a channel.",
  cooldown: 3,
  ownerOnly: true,
  async execute(message, args, commandName, client, Discord) {
    const rea = new EmbedBuilder()
      .setDescription("This channel cannot be nuked!.")
      .setColor("Red");

    const reason = args.slice(1).join(" ") || "No Reason";
    if (!message.channel.deletable) {
      return message.reply({ embeds: [rea] });
    }

    const a = new ButtonBuilder()
      .setCustomId("accept")
      .setStyle("SUCCESS")
      .setEmoji("<:icons_correct:992543559196610601>");

    const b = new ButtonBuilder()
      .setCustomId("decline")
      .setStyle("DANGER")
      .setEmoji("<:icons_Wrong:950098114931482664>");

    const row = new ActionRowBuilder().addComponents(a, b);
    const collector = message.channel.createMessageComponentCollector({
      componentType: "BUTTON",
      time: 30000,
    });
    const mssg = await message.channel.send({
      embeds: [
        new EmbedBuilder()
          .setDescription(
            "**Are you sure you want to nuke this channel?** \n **All message data will be lost.** \n\n <:icons_correct:992543559196610601> To Confirm | <:icons_Wrong:950098114931482664> To Cancel"
          )
          .setColor("Green"),
      ],
      components: [row],
    });

    collector.on("collect", async (m) => {
      if (m.user.id !== message.author.id) {
        return m.reply({
          content: "You cannot interact with this message's buttons.",
          ephemeral: true,
        });
      }
      if (m.customId === "accept") {
        // const newchannel = await message.channel.clone();
        await message.channel.delete();
        /* const embed = new EmbedBuilder()
					.setTitle('Channel Nuked')
					.setDescription(reason)
					.setColor('RED')
					.setImage('https://c.tenor.com/Rl84jpphg7IAAAAC/explosion-space.gif')
					.setFooter(`Nuked by ${message.author.tag}`);
     
      
				await newchannel.send({ embeds:[embed] }); */
      }

      if (m.customId === "decline") {
        message.react("✅");
        collector.stop("success");
        mssg.delete();

        const embed = new EmbedBuilder()

          .setDescription(
            "<:icons_Wrong:950098114931482664>| The Process Has Been Cancelled"
          )
          .setColor("Red");

        await message.channel.send({ embeds: [embed] });
      }
    });
  },
};
