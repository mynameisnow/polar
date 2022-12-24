/* eslint-disable no-unused-vars */
/* module.exports = {
	name: 'emojilist',
	aliases: ['allemojis'],
	permissions: 'MANAGE_GUILD',
	description: 'Enlarges a custom emoji.',
	cooldown: 2,
	async execute(message, args, commandName, client, Discord) {
		const list = [];
		let emojis = message.guild.emojis.cache;
		if (emojis.size === 0) return message.channel.send('There are no emojis in this server');
		emojis = emojis.map((e, i) => `${i + 1}. ${e} \\${e}`);
		for (var i = 0; i < emojis.length; i += 10) {
			const items = emojis.slice(i, i + 10);
			list.push(items.join('\n'));
		}
		const symbols = ['➡️', '⏹', '⬅️'];
		let page = 0;
		const e = new Discord.EmbedBuilder()
			.setDescription(list[page])
			.setFooter(`Page ${page + 1} of ${list.length} (${emojis.length} entries)`)
			.setColor('YELLOW');
		const msg = await message.channel.send({ embed: e });
		symbols.forEach(symbol => msg.react(symbol));
		const doing = true;
		while (doing) {
			let r;
			const filter = (r, u) => symbols.includes(r.emoji.name) && u.id == message.author.id;
			try { r = await msg.awaitReactions(filter, { max: 1, time: 20000, errors: ['time'] }); }
			catch { return message.channel.send('Command timed out.'); }
			const u = message.author;
			r = r.first();
			if (r.emoji.name == symbols[0]) {
				if (!list[page + 1]) {msg.reactions.resolve(r.emoji.name).users.remove(u.id).catch(err => {});}
				else {
					page++;
					msg.reactions.resolve(r.emoji.name).users.remove(u.id).catch(err => {});
					const newEmbed = new Discord.EmbedBuilder()
						.setDescription(list[page])
						.setFooter(`Page ${page + 1} of ${list.length} (${emojis.length} entries)`)
						.setColor('YELLOW');
					msg.edit(newEmbed);
				}
			}
			else if (r.emoji.name == symbols[2]) {
				if (!list[page - 1]) {msg.reactions.resolve(r.emoji.name).users.remove(u.id).catch(err => {});}
				else {
					page--;
					msg.reactions.resolve(r.emoji.name).users.remove(u.id).catch(err => {});
					const newEmbed = new Discord.EmbedBuilder()
						.setDescription(list[page])
						.setFooter(`Page ${page + 1} of ${list.length} (${emojis.length} entries)`)
						.setColor('YELLOW');
					msg.edit(newEmbed);
				}
			}
			else if (r.emoji.name == symbols[1]) {
				msg.reactions.removeAll();
				return;
			}
		}
	},
}; */
