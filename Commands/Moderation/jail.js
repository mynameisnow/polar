/* eslint-disable no-unused-vars */
const { EmbedBuilder } = require("discord.js");
const ms = require("ms");
// const db = require('quick.db');
module.exports = {
  name: "jail",
  aliases: [],
  description: "A command to jail users.",
  permissions: "BanMembers",
  cooldown: 3,
  async execute(message, args, commandName, client, Discord) {
    const jMember =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[1]);
    const time = args[1] || "Permanent";
    // const reason = args.slice(3).join(' ') || 'No Reason Provided';
    const jRole = message.guild.roles.cache.find(
      (role) => role.name === "Jailed"
    );
    // const mRole = message.guild.roles.cache.find(role => role.name === 'Member');
    const msTime = ms(time);
    if (!jRole) {
      const nR = new EmbedBuilder()
        .setTitle("This guild does not have a jailed role.")
        .setColor("Red");
      return message.channel.send({ embeds: [nR] });
    }
    if (!args[0]) {
      const nM = new EmbedBuilder()
        .setTitle("Jail")
        .setColor("BLACK")
        .addField("Command Type", "Moderation", true)
        .addField("Usage", "jail <user> <time> **or** jail <user>");
      return message.channel.send({ embeds: [nM] });
    }

    if (!jMember) {
      const nM = new EmbedBuilder()
        .setDescription(
          `⚠️ ${message.author} Please select a valid member to jail! ⚠️`
        )
        .setColor("ffcd4c");
      return message.channel.send({ embeds: [nM] });
    }

    if (jMember.id === message.author.id) {
      const aID = new EmbedBuilder()
        .setColor("ffcd4c")
        .setDescription("you can't jail yourself silly 😅");
      return message.channel.send({ embeds: [aID] });
    }
    // if (muteMember.id === client.id) return message.reply({ content: 'why would I mute myself lol', allowedMentions: { repliedUser: false } });
    if (jMember.roles.cache.find((role) => role.name === "Jailed")) {
      const aM = new EmbedBuilder()
        .setColor("ffcd4c")
        .setDescription(`⚠️ ${jMember} is already jailed! ⚠️`);
      return message.channel.send({ embeds: [aM] });
    }
    // if (!time) return message.reply({ conent: 'Please provide a time to mute that user.' });
    if (
      jMember.roles.highest.position >= message.member.roles.highest.position
    ) {
      const cM = new EmbedBuilder()
        .setColor("ffcd4c")
        .setDescription(`⚠️ ${message.author}: You can't jail this user! ⚠️`);
      return message.channel.send({ embeds: [cM] });
    }
    /* if (muteMember) {
			muteMember.roles.add(muteRole);
			const muteEmbed = new EmbedBuilder()
				.setColor('2af52a')
				.setAuthor(muteMember.user.username, muteMember.user.displayAvatarURL())
				.setTitle('__**Mute Successful**__')
				.setThumbnail('https://i.imgur.com/SocHdWn.png')
				.addField('Muted Member', muteMember.toString(), true)
				// .addField('Timed Muted For', `${ms(ms(time))}`, true)
				.addField('Reason', reason.toString(), true)
				.addField('Muted by', `${message.author}`, true)
				.setTimestamp();
			message.reply({ embeds: [muteEmbed], allowedMentions: { repliedUser: false } });
			return;
		} */
    if (time === "Permanent") {
      jMember.roles.add(jRole);
      // jMember.roles.remove(mRole);
      /* const pE = new EmbedBuilder()
				.setColor('3aad41')
				.setAuthor(jMember.user.username, jMember.user.displayAvatarURL({ dynamic: true }))
				.setThumbnail('https://i.imgur.com/opG7pFm.png')
				.setTitle('__**Jail Successful**__')
				.addField('Time of Jail', message.createdAt.toString(), false)
				.addField('Jailed Member', jMember.toString(), true)
				.addField('Jail Duration', time.toString(), true)
				.addField('Jailed By', `${message.author}`, true)
				// .addField('Reason', reason.toString(), false)
				.setTimestamp(); */
      const pE = new EmbedBuilder()
        .setColor("657eb3")
        .setThumbnail(jMember.user.displayAvatarURL({ dynamic: true }))
        .addFields([
          {
            name: "Jailed User:",
            value: jMember.user.username,
            inline: true,
          },
          {
            name: "Jailed By:",
            value: message.member.user.username,
            inline: false,
          },
          {
            name: "Jailed Time:",
            value: "Permanent",
            inline: false,
          },
        ])
        .setTimestamp();
      return message.channel.send({ embeds: [pE] });
    }
    jMember.roles.add(jRole);
    // jMember.roles.remove(mRole);
    setTimeout(() => {
      jMember.roles.remove(jRole);
      // jMember.roles.add(mRole);
    }, msTime);
    // db.add(`jails_${message.guild.id}_${jMember.id}`, 1);
    const jEmbed = new EmbedBuilder()
      .setColor("657eb3")
      .setThumbnail(jMember.user.displayAvatarURL({ dynamic: true }))
      .addFields([
        {
          name: "Jailed User:",
          value: jMember.user.username,
          inline: true,
        },
        {
          name: "Jailed By:",
          value: message.member.user.username,
          inline: false,
        },
        {
          name: "Jailed Time:",
          value: time,
          inline: false,
        },
      ])
      .setTimestamp();
    return message.channel.send({ embeds: [jEmbed] });
  },
};
