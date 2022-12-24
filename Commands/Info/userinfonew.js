/* eslint-disable no-unused-vars */
/* const { EmbedBuilder, ActionRowBuilder, ButtonBuilder } = require('discord.js');
const paginationEmbed = require('discordjs-button-pagination');

module.exports = {
	name: 'userinfonew',
	aliases: [],
	permissions: 'SendMessages',
	description: 'Sends an embed with info about a user.',
	cooldown: 0,
	ownerOnly: true,
	execute(message, args, commandName, client, Discord) {
		const target = message.mentions.members.first() || message.member || args[0];
		const u = message.guild.members.cache.get(target.id);

		const e = new EmbedBuilder()
			.setTitle('<:info:935072188233547806> General Info')
			.setAuthor(
				`${u.user.tag}`,
				`${u.user.displayAvatarURL({ dynamic: true })}`,
			)
			.setColor('RANDOM')
			.setThumbnail(u.user.displayAvatarURL({
				size: 1024,
				dynamic: true,
			}))
			.addFields(
				{
					name: 'Name',
					value: `\`${u.user.username}\``,
					inline: false,
				}, {
					name: '<:Id:934475213092044890> ID',
					value: `\`${u.user.id}\``,
					inline: false,
				}, {
					name: '<:createdAt:934475879973810177> Created At',
					value: `<t:${parseInt(u.user.createdTimestamp / 1000)}:R>`,
					inline: false,
				}, {
					name: '<:join:947482312944279643> Join at',
					value: `<t:${parseInt(u.joinedTimestamp / 1000)}:R>`,
					inline: false,
				}, {
					name: '<:roles:925451072359764068> Nickname',
					value: `\`${u.nickname ? u.nickname : '`None`'}\``,
					inline: false,
				}, {
					name: '<:online:931829543252156416> Presence',
					value: `\`${u.presence?.status || 'offline'}\``,
					inline: false,
				},
			);


		const ee = new EmbedBuilder()
			.setAuthor(
				`${u.user.tag}`,
				`${target.user.displayAvatarURL({ dynamic: true })}`,
			)
			.setColor('RANDOM')
			.setThumbnail(u.user.displayAvatarURL({
				size: 1024,
				dynamic: true,
			}))
			.addFields(
				{
					name: '<:totalroles:947483599203082380> Roles',
					value: `${u.roles.cache.map(r => r).sort((first, second) => second.position - first.position).join(', ')}`,
					inline: false,
				}, {
					name: '<:totalroles:947483599203082380> Highest Role',
					value: `${u.roles.highest}`,
					inline: false,
				},
			);

		const eee = new EmbedBuilder()
			.setAuthor(
				`${u.user.tag}`,
				`${target.user.displayAvatarURL({ dynamic: true })}`,
			)
			.setColor('RANDOM')
			.setThumbnail(u.user.displayAvatarURL({
				size: 1024,
				dynamic: true,
			}))
			.setFields({
				name: '<:moderation:935075898862993439> Permissions',
				value: `\`\`\`${u.permissions.toArray().join(' | ')}\`\`\``,
				inline: false,
			});
		const btn1 = new ButtonBuilder()
			.setStyle('SECONDARY')
			.setCustomId('previousbtn')
			.setEmoji('◀');

		const btn2 = new ButtonBuilder()
			.setStyle('SECONDARY')
			.setCustomId('nextbtn')
			.setEmoji('▶');

		const embedlist = [
			e,
			ee,
			eee,
		];

		const buttonList = [
			btn1,
			btn2,
		];
		const timeout = 30000;

		paginationEmbed(embedlist, buttonList, timeout);
	},

}; */
