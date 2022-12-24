/* eslint-disable no-unused-vars */
module.exports = {
	name: 'eval',
	aliases: ['evaluate'],
	description: 'Evaluate Code',
	ownerOnly: true,
	async execute(message, args, commandName, client, Discord) {
		// if (message.member.id !== 808451343592980540) return; // DON'T REMOVE THIS LINE
        
		if (!args[0]) return message.reply('I Evaluated **nothing**'); // Handles empty codes

		try {
			const code = args.join(' ');
			const time = Date.now();
			const res = require('util').inspect(await eval(code, { depth: 0 }));
			const time2 = Date.now();
			if (res.length > 1000) {
				const src = await require('sourcebin').create([{ content: res, language: 'javascript' }], { title: 'Eval', description: args.join(' ') });
				// message.react('✅');
				return message.reply(`Evaluated in \`${time2 - time}ms\`\n<${src.url}>`).then(message.react('✅')).catch(console.log);
			}
			return message.reply(`Evaluated in \`${time2 - time}ms\`\n\`\`\`js\n${res}\`\`\``).catch(console.log);
		}
		catch (e) {
			return message.reply(`\`\`\`${e}\`\`\``).catch(console.log);
		}
	},
};