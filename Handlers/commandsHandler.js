/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const { readdirSync } = require('fs');
const path = require('path');
const dirPath = path.resolve('Doggo', 'Commands'); 	 // this is the CORRECT path resolution

module.exports = (client, Discord) => {
	const commandFolders = readdirSync(dirPath);
	console.log('commandsHandler - starting loop');
	for (const folder of commandFolders) {
		const commandFiles = readdirSync(path.resolve(dirPath, `${folder}`)).filter(files => files.endsWith('.js'));
		for (const file of commandFiles) {
			console.log('finding command: ' + path.resolve(dirPath, `${folder}/${file}`));
			const command = require(path.resolve(dirPath, `${folder}/${file}`));
			client.commands.set(command.name, command);
			console.log('successfully set command: ' + command.name);
		}
	}
	console.log('listing commands...' + client.commands);
	for (const tempcmd of client.commands) {
		console.log('name: ' + tempcmd['name'] + ', commandName: ' + tempcmd.commandName);
	}
};