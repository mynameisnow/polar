/* eslint-disable no-unused-vars */
const prefix = require('../../config.json');
module.exports = {
	name: 'commands',
	description: 'List all of my commands or info about a specific command.',
	aliases: [],
	usage: '[command name]',
	cooldown: 5,
	ownerOnly: true,
	execute(message, args, commandName, client, Discord) {
		const data = [];
		// const { commands } = message.client;

		const commands = client.categories.map((dir) => {
			const cmds = client.commands
				.filter((cmd) => cmd.category === dir)
				.map((cmd) => `\`${cmd.name}\``)
				.join(' \' ');
			return {
				name: `** ${dir.toLocaleUpperCase()} **`,
				value: cmds || 'Working',
			};
		});

		return message.channel.send(data, { split: true })
			.catch(error => {
				console.error(`Could not send help DM to ${message.author.tag}.\n`, error);
				message.reply('it seems like I can\'t DM you! Do you have DMs disabled?');
			});
	},
};