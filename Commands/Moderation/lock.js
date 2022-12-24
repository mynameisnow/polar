/* eslint-disable no-unused-vars */
module.exports = {
  name: "lock",
  cooldown: 10,
  permissions: ["ADMINISTRATOR"],
  // clientpermissions: ['ADMINISTRATOR'],
  description: "Locks a Channel",
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
      SendMessages: false,
      ADD_REACTIONS: false,
      CREATE_PUBLIC_THREADS: false,
      CREATE_PRIVATE_THREADS: false,
      USE_APPLICATION_COMMANDS: false,
    });
    // channel.permissionOverwrites.edit(channel.guild.roles.everyone, { SendMessages: false, ADD_REACTIONS: false });
    const embed = new Discord.EmbedBuilder()
      // .setDescription(`**🔒 ${message.channel} Has Been Locked By ${message.author.username}! \n${reason}**`)
      .setColor("#657eb3")
      .setAuthor(
        `${channel.name} has been locked by ${message.author.username}`,
        "https://cdn.discordapp.com/attachments/921886995645599847/993739738118889482/unknown.png"
      );
    await message.channel.send({ embeds: [embed] });
    // await message.channel.send('Locked');
  },
};
