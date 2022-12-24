/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
module.exports = {
	name: 'say',
	aliases: [],
	permissions: 'MANAGE_MESSAGES',
	description: 'Sends a message to a channel through Doggo Bot.',
	cooldown: 2,
	execute(message, args, commandName, client, Discord) {

		if (message.content.includes('@everyone') || (message.content.includes('@here'))) return; // if the message content includes @everyone OR ( || means or in js) @here, stop running the code.

		const textChannel = message.mentions.channels.first(); // the first channel that you tag
		if (!args[0]) return message.reply({ content: 'Provide a channel for me to send the message in!' }); // args are words or numbers after the command. The first word is args[0], and then args[1], and so on and so on.
		if (!args[1]) return message.reply({ content: 'Provide a message to say!' });
		if (!message.guild.channels.cache.has(textChannel.id)) return; // here we're checking if the textChannel id provided is in the server where the message is being sent.
		message.delete(); // deleting the command message

		msg = args.slice(1).join(' '); // everything including and after args[1]
		textChannel.send(msg); // sending the message in the text channel provided

	},
};