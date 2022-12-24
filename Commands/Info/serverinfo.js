/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
//  GNU General Public License v3.0 - https://www.gnu.org/licenses/gpl-3.0.en.html
//  Developed by Kevin Foged, 29th of September 2022 - https://github.com/KevinFoged

const {
  ChatInputCommandInteraction,
  EmbedBuilder,
  ChannelType,
  GuildVerificationLevel,
  GuildExplicitContentFilter,
  GuildNSFWLevel,
} = require("discord.js");

module.exports = {
  name: "serverinfo",
  aliases: ["si"],
  permissions: "SendMessages",
  description: "Sends an embed with info about the server.",
  cooldown: 0,
  async execute(message, args, commandName, client) {
    const { guild } = message;
    const { members, channels, emojis, roles, stickers } = guild;

    const sortedRoles = roles.cache
      .map((role) => role)
      .slice(1, roles.cache.size)
      .sort((a, b) => b.position - a.position);
    const userRoles = sortedRoles.filter((role) => !role.managed);
    const managedRoles = sortedRoles.filter((role) => role.managed);
    const botCount = members.cache.filter((member) => member.user.bot).size;

    const maxDisplayRoles = (roles, maxFieldLength = 1024) => {
      let totalLength = 0;
      const result = [];

      for (const role of roles) {
        const roleString = `<@&${role.id}>`;

        if (roleString.length + totalLength > maxFieldLength) break;

        totalLength += roleString.length + 1; // +1 as it's likely we want to display them with a space between each role, which counts towards the limit.
        result.push(roleString);
      }

      return result.length;
    };

    const splitPascal = (string, separator) =>
      string.split(/(?=[A-Z])/).join(separator);
    const toPascalCase = (string, separator = false) => {
      const pascal =
        string.charAt(0).toUpperCase() +
        string
          .slice(1)
          .toLowerCase()
          .replace(/[^a-zA-Z0-9]+(.)/g, (match, chr) => chr.toUpperCase());
      return separator ? splitPascal(pascal, separator) : pascal;
    };

    const getChannelTypeSize = (type) =>
      channels.cache.filter((channel) => type.includes(channel.type)).size;

    const totalChannels = getChannelTypeSize([
      ChannelType.GuildText,
      ChannelType.GuildNews,
      ChannelType.GuildVoice,
      ChannelType.GuildStageVoice,
      ChannelType.GuildForum,
      ChannelType.GuildPublicThread,
      ChannelType.GuildPrivateThread,
      ChannelType.GuildNewsThread,
      ChannelType.GuildCategory,
    ]);

    message.reply({
      embeds: [
        new EmbedBuilder()
          .setColor(members.me.roles.highest.hexColor)
          .setTitle(`${guild.name}'s Information`)
          .setThumbnail(guild.iconURL({ size: 1024 }))
          .setImage(guild.bannerURL({ size: 1024 }))
          .addFields(
            { name: "Description", value: `📝 ${guild.description || "None"}` },
            {
              name: "General",
              value: [
                `📜 **Created** <t:${parseInt(
                  guild.createdTimestamp / 1000
                )}:R>`,
                `💳 **ID** ${guild.id}`,
                `👑 **Owner** <@${guild.ownerId}>`,
                `🌍 **Language** ${new Intl.DisplayNames(["en"], {
                  type: "language",
                }).of(guild.preferredLocale)}`,
                `💻 **Vanity URL** ${guild.vanityURLCode || "None"}`,
              ].join("\n"),
            },
            {
              name: "Features",
              value:
                guild.features
                  ?.map((feature) => `- ${toPascalCase(feature, " ")}`)
                  ?.join("\n") || "None",
              inline: true,
            },
            {
              name: "Security",
              value: [
                `👀 **Explicit Filter** ${splitPascal(
                  GuildExplicitContentFilter[guild.explicitContentFilter],
                  " "
                )}`,
                `🔞 **NSFW Level** ${splitPascal(
                  GuildNSFWLevel[guild.nsfwLevel],
                  " "
                )}`,
                `🔒 **Verification Level** ${splitPascal(
                  GuildVerificationLevel[guild.verificationLevel],
                  " "
                )}`,
              ].join("\n"),
              inline: true,
            },
            {
              name: `Users (${guild.memberCount})`,
              value: [
                `👨‍👩‍👧‍👦 **Members** ${guild.memberCount - botCount}`,
                `🤖 **Bots** ${botCount}`,
              ].join("\n"),
              inline: true,
            },
            {
              name: `User Roles (${maxDisplayRoles(userRoles)} of ${
                userRoles.length
              })`,
              value: `${
                userRoles.slice(0, maxDisplayRoles(userRoles)).join(" ") ||
                "None"
              }`,
            },
            {
              name: `Managed Roles (${maxDisplayRoles(managedRoles)} of ${
                managedRoles.length
              })`,
              value: `${
                managedRoles
                  .slice(0, maxDisplayRoles(managedRoles))
                  .join(" ") || "None"
              }`,
            },
            {
              name: `Channels, Threads & Categories (${totalChannels})`,
              value: [
                `💬 **Text** ${getChannelTypeSize([
                  ChannelType.GuildText,
                  ChannelType.GuildForum,
                  ChannelType.GuildNews,
                ])}`,
                `🎙 **Voice** ${getChannelTypeSize([
                  ChannelType.GuildVoice,
                  ChannelType.GuildStageVoice,
                ])}`,
                `🧵 **Threads** ${getChannelTypeSize([
                  ChannelType.GuildPublicThread,
                  ChannelType.GuildPrivateThread,
                  ChannelType.GuildNewsThread,
                ])}`,
                `📑 **Categories** ${getChannelTypeSize([
                  ChannelType.GuildCategory,
                ])}`,
              ].join("\n"),
              inline: true,
            },
            {
              name: `Emojis & Stickers (${
                emojis.cache.size + stickers.cache.size
              })`,
              value: [
                `📺 **Animated** ${
                  emojis.cache.filter((emoji) => emoji.animated).size
                }`,
                `🗿 **Static** ${
                  emojis.cache.filter((emoji) => !emoji.animated).size
                }`,
                `🏷 **Stickers** ${stickers.cache.size}`,
              ].join("\n"),
              inline: true,
            },
            {
              name: "Nitro",
              value: [
                `📈 **Tier** ${guild.premiumTier || "None"}`,
                `💪🏻 **Boosts** ${guild.premiumSubscriptionCount}`,
                `💎 **Boosters** ${
                  guild.members.cache.filter(
                    (member) => member.roles.premiumSubscriberRole
                  ).size
                }`,
                `🏋🏻‍♀️ **Total Boosters** ${
                  guild.members.cache.filter((member) => member.premiumSince)
                    .size
                }`,
              ].join("\n"),
              inline: true,
            },
            { name: "Banner", value: guild.bannerURL() ? "** **" : "None" }
          ),
      ],
      allowedMentions: { repliedUser: false },
    });
  },
};