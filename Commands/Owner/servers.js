/* eslint-disable no-unused-vars */
module.exports = {
  name: "servers",
  aliases: ["botservers", "srvrs"],
  permissions: "SendMessages",
  description: "Reverses some text.",
  cooldown: 100,
  ownerOnly: true,
  execute(message, args, commandName, client, Discord) {
    try {
      let data = [];
      client.guilds.cache.forEach((x) => {
        message.channel.send(
          `🔹**${x.name}** | \`${x.memberCount}\` members (ID: ${x.id})\n............................`
        );
      });

      if (data.length > 0) {
        data.sort();
        data = "🔹 " + data.join("\n🔹");
      } else {
        data = "[No server found]";
      }
    } catch (error) {
      console.log(error);
    }
  },
};
