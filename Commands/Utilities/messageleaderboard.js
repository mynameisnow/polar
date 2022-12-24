/* eslint-disable no-shadow */
/* eslint-disable no-empty */
/* eslint-disable no-undef */
module.exports = {
  name: "messageleaderboard",
  aliases: ["msglb", "messagelb"],
  permissions: "ADMINISTRATOR",
  description: "Look at the top number of sent messages",
  cooldown: 10000,
  ownerOnly: true,
  async execute(message, args, commandName, client, Discord) {
    const Fetching = new Discord.EmbedBuilder()
      .setColor("#a8f1ff")
      .setDescription(
        `**Fetching the past ${args[0]} messages**. This may take a while`
      );
    const m = await message.channel.send({ embeds: [Fetching] });

    const mLimit = args[0];
    async function fetchMore(channel, limit = 5000) {
      if (!channel) {
        throw new Error(`Expected channel, got ${typeof channel}.`);
      }
      if (limit <= 100) {
        channel.messages.fetch({
          limit,
        });
        const cmessages = await channel.messages.fetch({});
        const messages = [];
        Array.from(cmessages.values()).forEach((m) =>
          messages.push(m.author.id)
        );
        return messages;
      }
      const messages = [];
      let lastId = null;
      const options = {};
      let remaining = limit;

      while (remaining > 0) {
        options.limit = remaining > 100 ? 100 : remaining;
        remaining = remaining > 100 ? remaining - 100 : 0;

        if (lastId) {
          options.before = lastId;
        }

        const cmessages = await channel.messages.fetch(options);
        Array.from(cmessages.values()).forEach((m) =>
          messages.push(m.author.id)
        );
        if (!cmessages.last()) {
          break;
        }
        lastId = cmessages.last().id;
      }

      return messages;
    }

    {
      try {
        const authors = await fetchMore(message.channel, mLimit);
        const frequency = {};
        authors.forEach(function (item) {
          frequency[item] = frequency[item] ? frequency[item] + 1 : 1;
        });
        const intents = Object.entries(frequency)
          .sort((a, b) => b[1] - a[1])
          .map(function (x) {
            return x[0];
          });
        const finalthingyig = {};
        for (const u of intents) {
          try {
            const newe = await client.users.fetch(u);
            if (newe.bot) continue;
            if (frequency[u] > 20) {
              finalthingyig[newe.tag] = frequency[u];
            } else if (finalthingyig["Others"]) {
              finalthingyig["Others"] = finalthingyig["Others"] + frequency[u];
            } else {
              finalthingyig["Others"] = frequency[u];
            }
          } catch (e) {}
        }
        if (Object.keys(finalthingyig).length < 3)
          message.channel.send("Just 2 people lol");

        const embed = new Discord.EmbedBuilder()
          .setAuthor(
            `${message.guild.name}`,
            `${message.guild.iconURL({ dynamic: true })}`
          )
          .setTitle(`**Leaderboard for __${message.channel.name}__**`)
          .setColor("#a8f1ff")
          .setDescription(
            `🏆│**${Object.keys(finalthingyig)[0]}** - \`${
              Object.values(finalthingyig)[0]
            }\`
                        🏅│**${Object.keys(finalthingyig)[1]}** - \`${
              Object.values(finalthingyig)[1]
            }\`
                        🥈│**${Object.keys(finalthingyig)[2]}** - \`${
              Object.values(finalthingyig)[2]
            }\`
                        🔹│**${Object.keys(finalthingyig)[3]}** - \`${
              Object.values(finalthingyig)[3]
            }\`
                        🔹│**${Object.keys(finalthingyig)[4]}** - \`${
              Object.values(finalthingyig)[4]
            }\`
                        🔹│**${Object.keys(finalthingyig)[5]}** - \`${
              Object.values(finalthingyig)[5]
            }\`
                        🔹│**${Object.keys(finalthingyig)[6]}** - \`${
              Object.values(finalthingyig)[6]
            }\`
                        🔹│**${Object.keys(finalthingyig)[7]}** - \`${
              Object.values(finalthingyig)[7]
            }\`
                        🔹│**${Object.keys(finalthingyig)[8]}** - \`${
              Object.values(finalthingyig)[8]
            }\`
                        🔹│**${Object.keys(finalthingyig)[9]}** - \`${
              Object.values(finalthingyig)[9]
            }\`
        `
          );
        message.reply({ embeds: [embed] });
        m.delete();
      } catch (e) {
        const err = new Discord.EmbedBuilder()
          .setAuthor(
            "ERROR",
            "https://images-ext-2.discordapp.net/external/osuvoFtp-tXIthBmsnVAdVeM11Zt30Aeemh_JxTnReE/https/cdn.discordapp.com/emojis/706499634083659827.png"
          )
          .setTitle("Something went wrong!")
          .setColor("#ff4a4a")
          .setDescription(`\`\`\`js\n${error.message}\n\`\`\``);

        message.reply({ embeds: [err] });
        console.log(e);
      }
    }
  },
};
