/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder } = require("discord.js");
const moment = require("moment");

module.exports = {
  name: "userinfo",
  aliases: [],
  permissions: "SendMessages",
  description: "Sends an embed with info about a user.",
  cooldown: 0,
  ownerOnly: true,
  execute(message, args, commandName, client, Discord) {
    const member =
      message.mentions.members.first() || message.member || args[0];

    /* const titleCase = str => {
			return str.toLowerCase().split(' ')
				.map(word => `${word.charAt(0).toUpperCase()}${word.slice(1)}`)
				.join(' ');
		}; */

    const DEVICES = {
      web: "🌐",
      desktop: "💻",
      mobile: "📱",
    };

    const BADGES = {
      DISCORD_EMPLOYEE: "<:botdeveloper:920116685518803026>",
      DISCORD_PARTNER: "<:discordpartner:920113115255951400>",
      BUGHUNTER_LEVEL_1: "<:discordbughunterlv1:920113115226587217>",
      HYPESQUAD_EVENTS: "<:discordhypesquad:920113115046236170>",
      HOUSE_BRAVERY: "<:discordbravery:920113115062997023>",
      HOUSE_BRILLIANCE: "<:discordbrillance:920113114995916860>",
      HOUSE_BALANCE: "<:discordbalance:920113115134320650>",
      EARLY_SUPPORTER: "<:discordearlysupporter:920113115201404979>",
      VERIFIED_BOT: "<:bottag:920113115297890404>",
      VERIFIED_DEVELOPER: "<:botdeveloper:920116685518803026>",
      // 'DISCORD_NITRO': '<:nitro:899806358449315902>',
    };

    /* let status;
		switch (member.user.presence?.status) {
		case 'online':
			status = '<:online:920125171954761789> Online';
			break;
		case 'dnd':
			status = '<:dnd:920125247913619507> DND [Do Not Disturb]';
			break;
		case 'idle':
			status = '<:idle:920125202862588014> Idle';
			break;
		case 'offline':
			status = '<:offline:920125301491658792> Offline';
			break;
		case 'streaming':
			status = '<:status_streaming:920125336237256704> Streaming';
			break;
		}
		const nitroBadge = member.user.avatarURL({ dynamic: true });


		const STATUSES = {
			'ONLINE': '<:online:920125171954761789>',
			'IDLE': '<:idle:920125202862588014>',
			'DND': '<:dnd:920125247913619507>',
			'STREAMING': '<:status_streaming:920125336237256704>',
			'OFFLINE': '<:offline:920125301491658792>',
		}; */

    /* if (member.user.presence.status == 'offline') { userDevice = ''; }
		else if (!member.user.bot) { userDevice = DEVICES[Object.keys(member.user.presence.clientStatus)[0]]; }
		else if (member.user.bot) { userDevice = ''; } */

    const button = new ButtonBuilder()
      .setCustomId("left")
      .setStyle("PRIMARY")
      .setEmoji("◀")
      .setDisabled(true);

    const button1 = new ButtonBuilder()
      .setCustomId("right")
      .setStyle("PRIMARY")
      .setEmoji("▶")
      .setDisabled(true);

    const row = new ActionRowBuilder().addComponents(button, button1);
    const trimArray = (arr, maxLen = 10) => {
      if (arr.length > maxLen) {
        const len = arr.length - maxLen;
        arr = arr.slice(0, maxLen);
        arr.push(` and ${len} more roles...`);
      }
      return arr;
    };
    const roles = member.roles.cache
      .sort((a, b) => b.position - a.position)
      .map((role) => role.toString())
      .slice(0, -1);
    let userFlags;
    if (!userFlags) {
      flags = "None";
    } else {
      userFlags = member.user.flags.toArray();
    }
    /* if (nitroBadge.includes('gif')) {
			userFlags =
        userFlags +
        `
              <:nitro:899806358449315902> \`Nitro\``;
		} */
    // const status = member.user.presence.status;
    const embeds = new EmbedBuilder()
      .setAuthor(
        `${member.user.tag}'s Stats and Information`,
        member.user.displayAvatarURL({ dynamic: true })
      )
      .setColor(member.displayColor)
      .setTitle("Avatar")
      // .setImage(User.bannerURL({ dynamic: true, size: 512 }) || ' ')
      .setURL(member.user.avatarURL({ dynamic: true, size: 1024 }))
      .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
      // .addField('Status', `${status}`, true)
      .addField(
        "Mention",
        `${member.user} ${
          userFlags ? userFlags.map((flag) => BADGES[flag]).join("") : ""
        }`,
        true
      )
      // .addField('Status', `${STATUSES[member.user.presence.status]}`, false)
      .addField(
        "Highest Role",
        `${
          member.roles.highest.id === message.guild.id
            ? "None"
            : member.roles.highest
        }`,
        false
      )
      // .addField('\u200B', '\u200B')
      .addField("Tag", `${member.user.tag}`)
      .addField("Discriminator", `${member.user.discriminator}`)
      // .addField('Bot' `${member.user.bot ? 'Yes' : 'No'}`)
      .addField(
        "Joined guild on ",
        `<t:${parseInt(member.joinedAt / 1000)}:R>`,
        true
      ) // ${moment(member.joinedAt).format('ddd, MMM Do YYYY, h:mm A')}
      // .addField('Account created On', `${member.user.createdAt.toLocaleString()}`, false)
      .addField(
        "Account created on ",
        `<t:${parseInt(member.user.createdAt / 1000)}:R>`,
        false
      ) // ${moment(member.user.createdAt).format('ddd, MMM Do YYYY, h:mm A')}
      .addField(
        "Roles",
        `${
          roles.length < 10
            ? roles.join(", ")
            : roles.length > 10
            ? trimArray(roles).join(", ")
            : "None"
        }`,
        false
      ) // `${member.roles.cache.map(r => r).join(' ').replace('@everyone', ' ') || 'None'}`
      // .addField('Banner', member.user.bannerURL() ? '** **' : 'None' );
      .setFooter(`ID: ${member.user.id}`);

    message.channel.send({ embeds: [embeds], components: [row] });
  },
};
