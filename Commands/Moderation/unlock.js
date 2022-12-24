/* eslint-disable no-unused-vars */
const { EmbedBuilder } = require("discord.js");
module.exports = {
  name: "unlock",
  cooldown: 10,
  permissions: ["ADMINISTRATOR"],
  // clientpermissions: ['ADMINISTRATOR'],
  description: "Unlocks a Channel",
  async execute(message, args, commandName, client, Discord) {
    // const user = message.mentions.users.first();
    const channel = message.channel;
    /* const reason = args[0];
		if (!reason) {
			const nopr = new Discord.EmbedBuilder().setTimestamp().setColor('RANDOM').setAuthor(`${message.author.username}`, message.author.displayAvatarURL({ dynamic: true })).setDescription('**`(prefix)channellock <reason>`**');
			return message.channel.send({ embed: nopr });
			return message.channel.send('Provide a reason.');
		} */
    channel.permissionOverwrites.edit(channel.guild.roles.everyone, {
      SendMessages: true,
      ADD_REACTIONS: true,
      CREATE_PUBLIC_THREADS: true,
      CREATE_PRIVATE_THREADS: true,
      USE_APPLICATION_COMMANDS: true,
    });
    const embed = new EmbedBuilder()
      .setColor("#657eb3")
      .setAuthor(
        `${channel.name} has been unlocked by ${message.author.username}`,
        "https://cdn.discordapp.com/attachments/921886995645599847/993739620581912648/unknown.png"
      );
    await channel.send({ embeds: [embed] });
  },
};
