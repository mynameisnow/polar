/* eslint-disable no-unused-vars */
const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "banner",
  aliases: ["bnr"],
  permissions: "SendMessages",
  description: "Shows a user's banner",
  cooldown: 0,
  async execute(message, args, commandName, client, Discord) {
    const member =
      message.mentions.users.first() ||
      message.guild.members.cache.get(args[0]) ||
      message.member;

    async function getUserBannerUrl(userId) {
      const user = await client.api.users(userId).get();
      return user.banner
        ? `https://cdn.discordapp.com/banners/${userId}/${user.banner}.${
            user.banner.startsWith("a_") ? "gif" : "png"
          }?size=4096`
        : null;
    }

    const bannerUrl = await getUserBannerUrl(member.id, {
      dynamic: true,
      size: 4096,
    });

    const banner = bannerUrl ? ` | [**Banner link**](${bannerUrl})` : "";

    const nB = new EmbedBuilder()
      .setColor("fba714")
      .setDescription(
        `<:boat_warning:952581000867754004>	${member.user} does not have a banner!`
      );

    // if (!banner) return message.channel.send(`${member.user.username} does not have a banner.`);
    if (!banner)
      return message.reply({
        embeds: [nB],
        allowedMentions: { repliedUser: false },
      });

    const e = new EmbedBuilder()
      .setTitle(`${member.user.username}'s Banner`)
      .setColor(member.displayColor)
      .setImage(bannerUrl);
    message.reply({ embeds: [e] });
  },
};
