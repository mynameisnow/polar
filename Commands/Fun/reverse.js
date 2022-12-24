/* eslint-disable no-unused-vars */

module.exports = {
  name: "reverse",
  aliases: ["rvrs", "rev"],
  permissions: "SendMessages",
  description: "Reverses some text.",
  cooldown: 0,
  execute(message, args, commandName, client, Discord) {
    const str = args.join(" ");
    if (!str) {
      return message.channel.send("Enter some text to be reversed");
    }
    message.channel.send(str.split("").reverse().join(""));
  },
};
