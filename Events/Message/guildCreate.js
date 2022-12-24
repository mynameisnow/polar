/* const client = require('../../index.js');
	client.on('guildCreate', (guild) => { 
		let channelToSend;

		guild.channels.cache.forEach((channel) => {
			if (channel.type === 'text' && !channelToSend && channel.permissionsFor(guild.me).has('SendMessages')) {channelToSend = channel;}
		});

		if (!channelToSend) return;

		channelToSend.send('Test');
	},
}; */
