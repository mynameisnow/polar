// const EmbedBuilder = require('discord.js');
module.exports = {
  name: "hackban",
  aliases: ["forceban"],
  permissions: "BanMembers",
  description: "Bans a user with their Discord ID.",
  cooldown: 3,
  async execute(message, args, commandName, client, Discord) {
    const target = args[0];
    const reason = args.slice(1).join(" ") || "No Reason Provided";
    // const member = message.author;

    const bannedEmbed = new Discord.EmbedBuilder()
      .setTitle("__Ban Successful__")
      .setColor("Red")
      // .setThumbnail(target.user.displayAvatarURL({ dynamic: true, size: 1024 }))
      .addFields([
        { name: "User Banned", value: `${target.user}`, inline: true },
        { name: "Reason", value: `${reason}`, inline: true },
      ])
      // .setThumbnail(target.user.displayAvatarURL({ dynamic: true, size: 1024 }))
      // .addField('Moderator', `${member}`, true)
      .setTimestamp();

    if (!target)
      return message.channel.send("You did not add an id for me to ban");
    if (isNaN(target))
      return message.channel.send("The user ID must be a number.");
    if (target.user === client.user)
      return message.channel.send("After all that I've done for you?");
    if (target.user === message.member.user)
      return message.channel.send("You can't ban yourself.");
    client.users
      .fetch(target)
      .then(async (user) => {
        await message.guild.members.ban(user.id, { reason: reason });

        message.channel.send({ embeds: [bannedEmbed] });
      })
      .catch((err) => {
        return message.reply({
          content: `An error occured: ${err}`,
          allowedMentions: { repliedUser: false },
        });
      });
  },
};
