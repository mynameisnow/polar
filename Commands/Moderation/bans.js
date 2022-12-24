/* eslint-disable no-unused-vars */
const { EmbedBuilder } = require("discord.js");
module.exports = {
  name: "bans",
  aliases: ["banlist"],
  permissions: "BanMembers",
  description: "Shows a list of banned users.",
  cooldown: 3,

  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */

  async execute(message, args, commandName, client, Discord) {
    var amount = 1;
    const fetchBans = message.guild.bans.fetch();
    const bannedMembers = (await fetchBans)
      .map(
        (member) =>
          `> __${amount++}.__ **${member.user.tag}** | (*${member.user.id}*)`
      )
      .join("\n");
    const bansEmbed = new EmbedBuilder()
      .setAuthor(
        `Bans for ${message.guild.name}`,
        message.guild.iconURL({ dynamic: true })
      )
      .setDescription(`${bannedMembers}`)
      .setFooter(`Amount: ${amount - 1}`)
      .setTimestamp()
      .setColor("Red");
    message.channel.send({ embeds: [bansEmbed] });
  },
};
/* const fetchBans = message.guild.bans.fetch();
		if (!fetchBans) {
			const NoBannedUsersEmbed = new Discord.EmbedBuilder()
				.setColor('#35AAE1')
				.setDescription('This server does not have any banned members.')
				.setFooter({ text: client.user.username, iconURL: client.user.displayAvatarURL() });
			return message.channel.send(NoBannedUsersEmbed);
		}
		else {

			const bannedMembers = (await fetchBans)

				.map((member) => ` **User** \`${member.user.tag}\`  **Reason:** \`${member.reason}\``)
				.join('\n\n ');
           

			const embed = new Discord.EmbedBuilder()
				.setTitle(`Banned users in ${message.guild.name}`)
				.setDescription(bannedMembers || `No bans in ${message.guild.name}`)
				.setColor('#35AAE1')
				.setFooter(`Banned members in ${message.guild.name}`, client.user.displayAvatarURL() );


			message.channel.send({ embeds: [embed] });
		} */
