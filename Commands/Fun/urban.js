/* const { request } = require('undici');

module.exports = {
	name: 'urban',
	aliases: [],
	permissions: 'SendMessages',
	description: 'Search for a term on urban dictionary.',
	cooldown: 10,
	ownerOnly: false,
	async execute(message, args, commandName, client, Discord) {

		const term = args.join(' ');
		if (!term) return message.reply({ content: 'Please enter a term to search for!', allowedMentions: { repliedUser: false } });
		try {
			let res = await request(`https://api.urbandictionary.com/v0/define?term=${term}`).then(r => r.body.json().then(s => s.list)); // Searches on the urban dictionary API

			if (!res || !res.length) return message.reply({ content: 'There were no results for your search term' }); // Handles no results
			res = res[0];

			const img = 'https://lh3.googleusercontent.com/unQjigibyJQvru9rcCOX7UCqyByuf5-h_tLpA-9fYH93uqrRAnZ0J2IummiejMMhi5Ch';

			// Replacing [subwords] in definition
			const defmatch = res.definition.match(/\[.*?\]/gm);
			if (defmatch?.length) {
				defmatch.forEach(v => {
					const subword = v.match(/(?<=\[)[^)]*(?=\])/gm)[0];
					res.definition = res.definition.replace(v, `[${subword}](https://www.urbandictionary.com/define.php?term=${subword.replace(/ /gm, '%20')})`);
				});
			}

			// Replacing [subwords] in example
			const exmatch = res.example.match(/\[.*?\]/gm);
			if (exmatch?.length) {
				exmatch.forEach(v => {
					const subword = v.match(/(?<=\[)[^)]*(?=\])/gm)[0];
					res.example = res.example.replace(v, `[${subword}](https://www.urbandictionary.com/define.php?term=${subword.replace(/ /gm, '%20')})`);
				});
			}

			// Sending the message
			message.channel.send({
				embeds: [
					new Discord.EmbedBuilder()
						.setAuthor('Urban Dictionary', img)
						.setTitle(res.word)
						.setURL(res.permalink)
						.setThumbnail(img)
						.setColor('#134FE6')
						.addFields(
							{ name: '📖 Definition', value: !res.definition ? 'No Definition' : (res.definition.length > 1022 ? res.definition.substring(0, 1023) : res.definition) },
							{ name: '💬 Examples', value: !res.example ? 'No Definition' : (res.example.length > 1022 ? res.example.substring(0, 1023) : res.example) },
							{ name: '👍 Upvotes', value: res.thumbs_up.toLocaleString() || 'N/A', inline: true },
							{ name: '👎 Downvotes', value: res.thumbs_down.toLocaleString() || 'N/A', inline: true },
						)
						.setTimestamp(new Date(res.written_on).getTime())
						.setFooter(`Written by ${res.author || 'unknown'}`),
				],
			}).catch(console.log);
		}
		catch (err) {
			// Handles Errors
			message.reply({ content: 'An error occured' });
			console.error(err);
		}
	},

}; */
