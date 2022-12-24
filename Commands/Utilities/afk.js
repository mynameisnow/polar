module.exports = {
  name: "afk",
  aliases: [],
  permissions: "SendMessages",
  description: "Enlarges a custom emoji.",
  cooldown: 2,
  ownerOnly: true,
  execute(message, args, commandName, client, Discord) {
    if (message.content.includes("@everyone"))
      return message.channel.send(
        `*Waa~* ${message.author.username} please dont do that.`
      );
    if (message.content.includes("@here"))
      return message.channel.send(
        `${message.author.username} dont be a baka and ping here`
      );

    const reason = args.slice(1).join(" ") || "No reason was provided.";

    client.afk.set(message.author.id, [Date.now(), reason]);

    const embed = new Discord.EmbedBuilder()
      .setColor("White")
      .setDescription(
        `You are now afk! Sending a message will bring you back. ┋ Reason to AFK: ${reason}`
      );
    message.channel.send({
      embeds: [embed],
    });
  },
};
