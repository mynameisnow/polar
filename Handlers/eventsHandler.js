/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const { readdirSync } = require("fs");

module.exports = (client, Discord) => {
  const path = require("path");
  /*	console.log('in eventsHandler - preparing to scan');
	console.log('path.resolve to ./ is ' + path.resolve('./'));
	console.log('path.resolve to Events is ' + path.resolve('Events'));
	console.log('path.resolve to __dirname + Events is ' + path.resolve(__dirname, 'Events'));
	console.log('in eventsHandler - preparing to scan');*/

  const dirPath = path.resolve("Doggo", "Events"); // this is the CORRECT path resolution

  const eventFolders = readdirSync(dirPath);
  //	const eventFolders = readdirSync('./Events');
  //	console.log('in eventsHandler - created eventFolders');
  for (const folder of eventFolders) {
    const eventFiles = readdirSync(path.resolve(dirPath, `${folder}`)).filter(
      (files) => files.endsWith(".js")
    );
    //	console.log('successfully created eventFiles');
    for (const file of eventFiles) {
      const event = require(path.resolve(dirPath, `${folder}/${file}`));
      console.log("scanning folder: " + folder + " and file: " + file);
      if (event.once) {
        console.log("in client.once: " + event.name);
        client.once(event.name, (...args) =>
          event.execute(...args, client, Discord)
        );
      } else {
        console.log("in client otherwise: " + event.name);
        client.on(event.name, (...args) =>
          event.execute(...args, client, Discord)
        );
      }
    }
  }
};
