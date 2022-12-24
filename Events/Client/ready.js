/* eslint-disable no-unused-vars */
const { ActivityType, Client } = require("discord.js");
const { Watching } = ActivityType;

module.exports = {
  name: "ready",
  async execute(client) {
    client.user?.setPresence({
      activities: [
        {
          name: `${client.guilds.cache.size} servers`,
          type: Watching,
        },
      ],
      status: "idle",
    });
    console.log("The client is now ready 🧡");
  },
};
