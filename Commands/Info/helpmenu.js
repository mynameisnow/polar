/* eslint-disable no-unused-vars */
const {
  EmbedBuilder,
  MessageSelectMenu,
  ActionRowBuilder,
} = require("discord.js");

module.exports = {
  name: "helpmenu",
  aliases: [],
  permissions: "SendMessages",
  description: "Sends an embed with the list of commands.",
  cooldown: 10,
  ownerOnly: true,
  execute(message, args, commandName, client, Discord) {
    /* const helpEmbed = new EmbedBuilder().setAuthor(`Help Page: ${client.commands.size} Commands`, client.user.displayAvatarURL()).setColor('WHITE').setTitle('Doggo Bot Help Page').setThumbnail(client.user.displayAvatarURL())
			.addFields(
				{ name: '<:settings:898322010990579762> __**Utility**__', value: 'List of utility commands.', inline: true },
				// { name: '\u200B', value: '\u200B' },
				{ name: '<:mod:898321959237062668> __**Moderation**__', value: 'List of moderation commands', inline: true },
				{ name: '<:info:898322116699643915> __**Information**__', value: 'List of information commands', inline: true },
				{ name: '🎮 __**Fun**__', value: 'List of fun commands', inline: true },
			); */
    const helpEmbed = new EmbedBuilder()
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

    const row = new ActionRowBuilder().addComponents(
      new MessageSelectMenu()
        .setCustomId("select")
        .setPlaceholder("Select a category")
        // .setDisabled('true')
        .setMinValues()
        .setMaxValues(1)
        .addOptions([
          {
            label: "Home",
            description: "Home Page",
            value: "home",
            emoji: "🏡",
          },
          {
            label: "Utility",
            description: "Commands that you will use every day.",
            value: "first_option",
            emoji: "<:settings:898322010990579762>",
          },
          {
            label: "Moderation",
            description: "List of all moderation commands.",
            value: "second_option",
            emoji: "<:mod:898321959237062668>",
          },
          {
            label: "Information",
            description: "Get information about a user/server and much more.",
            value: "third_option",
            emoji: "<:info:898322116699643915>",
          },
          {
            label: "Fun",
            description: "List of all fun commands.",
            value: "fourth_option",
            emoji: "🎮",
          },
          {
            label: "Image",
            description: "Mess around with fun image manipulation commands.",
            value: "fifth_option",
            emoji: "🖼️",
          },
        ])
    );
    const sendMENU = message.channel.send({
      embeds: [helpEmbed],
      components: [row],
    });

    const collector = message.channel.createMessageComponentCollector({
      time: 600000,
    });

    var participants = [];
    collector.on("collect", async (collected) => {
      if (collected.user.id !== message.author.id) {
        collected.reply({
          content: "You cannot interact with this message's menu.",
          ephemeral: true,
        });
      }
      const value = collected.values[0];
      if (value === "home") {
        collected.update({ embeds: [helpEmbed], components: [row] });
      }

      if (value === "first_option") {
        collected.update({ embeds: [embed1], components: [row] });
      }

      if (value === "second_option") {
        collected.update({ embeds: [embed2], components: [row] });
      }

      if (value === "third_option") {
        collected.update({ embeds: [embed3], components: [row] });
      }
      if (value === "fourth_option") {
        collected.update({ embeds: [embed4], components: [row] });
      }
      if (value === "fifth_option") {
        collected.update({ embeds: [embed5], components: [row] });
      }
      /* if (value === 'fifth_option') {
				collected.reply({ embeds:[embed4], ephemeral:true });
			} */
    });
  },
};

/* const filter = (interaction) => {
			(interaction.user.id === message.author.id);
			else{ 
				interaction.reply({ content: `Only **${message.author.tag}** can use this button, if you want then you've to run the command again.` }); return;
			} 
		};
		
		const collector = m.createMessageComponentCollector({
			filter: (b) => {
				if (b.user.id === message.author.id) {return true;}
				else {
					b.reply({ ephemeral: true, content: `Only **${message.author.tag}** can use this button, if you want then you've to run the command again.` }); return false;
				}
			},
			time : 60000,
			idle: 60000 / 2,
		}); 
		
		const collector = message.channel.createMessageComponentCollector({ 
			filter,
			componentType: 'SELECT_MENU',
			time: 5000,
		}); */
