/* eslint-disable no-unused-vars */

module.exports = {
  name: "catsay",
  aliases: ["cat", "saycat"],
  permissions: "SendMessages",
  description: "The cat will say whatever message you send.",
  cooldown: 0,
  ownerOnly: true,
  execute(message, args, commandName, client, Discord) {
    const state = "enabled";
    if (state === "disabled") {
      return message.channel.send("Command has been disabled for now");
    }
    const msg = args.join(" ");
    if (!msg) {
      return message.channel.send("What you want the cat to say?");
    }
    message.channel.send({
      files: [
        {
          attachment: `https://cataas.com/cat/cute/says/${msg}`,
          name: "catsay.png",
        },
      ],
    });
  },
};
