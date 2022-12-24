/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const { EmbedBuilder, AttachmentBuilder } = require("discord.js");
const canvacord = require("canvacord");
module.exports = {
  name: "spotify",
  aliases: ["sp"],
  permissions: "SendMessages",
  description: "Displays current spotify song.",
  cooldown: 0,
  ownerOnly: false,
  async execute(message, args, commandName, client, Discord) {
    const user = message.member || message.mentions.members.first();
    let attachment;
    const activities = user.presence.activities;
    const arr = [];
    for (let i = 0; i < activities.length; i++) {
      if (activities[i].name === "Spotify") {
        arr.push(activities[i].syncID);
        const data = user.presence.activities[i];
        let trackAuthor = data.state;
        const image = `https://i.scdn.co/image/${data.assets.largeImage.slice(
          8
        )}`;
        trackAuthor = trackAuthor.replace(/;/g, ",");
        const name = data.details;
        const artist = data.state;
        const album = data.assets.largeText;

        /* const card = new canvacord.Spotify()
					.setAuthor(artist)
					.setAlbum(album)
					.setStartTimestamp(status.timestamps.start)
					.setEndTimestamp(status.timestamps.end)
					.setImage(image)
					.setTitle(name); */

        const card = new canvacord.Spotify()
          .setAuthor(data.state)
          .setAlbum(data.assets.largeText)
          .setStartTimestamp(data.timestamps.start)
          .setEndTimestamp(data.timestamps.end)
          .setImage(image)
          .setTitle(data.details);

        card.build().then(async (buffer) => {
          canvacord.write(buffer, "spotify.png");
          attachment = new Discord.AttachmentBuilder(buffer, {
            name: "spotify.png",
          });
          const embed = new EmbedBuilder()
            .setAuthor({
              name: `${user.user.username}'s Spotify`,
              iconURL: `${user.user.displayAvatarURL({ dynamic: true })}`,
            }) // https://cdn.discordapp.com/emojis/889955546810183731.png
            .setColor(user.displayColor)
            .setThumbnail(
              `https://i.scdn.co/image/${data.assets.largeImage.slice(8)}`
            )
            /*  .addField('Song Name', `\n${data.details}\n`, false)
					.addField('Album', `\n${data.assets.largeText}\n`, false)
					.addField('Author', `\n${trackAuthor}\n`, false) */
            .setDescription(
              `> **Song Name:** ${data.details} \n > **Album:** ${data.assets.largeText} \n > **Author:** ${trackAuthor}`
            )
            .setImage("attachment://spotify.png");
          const spotEmbed = await message.channel.send({
            embeds: [embed],
            files: [attachment],
          });
          spotEmbed.react("👍");
          spotEmbed.react("👎");
        });

        // const spotEmbed = await message.channel.send({ embeds: [embed], files: [attachment] }); // , files: [attachment]

        /* else {
				message.channel.send(`> ${user.user.username} isn't listening to Spotify!`);
			} */
      }
    }
    if (!activities)
      return message.channel.send(
        `> ${user.user.username} does not have Spotify displayed in their status.`
      );
  },
};

/* const target = message.mentions.users.first() || message.author;

		const activity = target.presence.activities;

		if (target.user.presence.activities !== null && target.user.presence.activities.type === 2 && target.user.presence.activities.name === 'Spotify' && target.user.presence.activities.assets !== null) {


			const trackIMG = `https://i.scdn.co/image/${activity.act.assets.largeImage.slice(8)}`;
			const trackURL = `https://open.spotify.com/track/${activity.syncID}`;
			const trackName = activity.details;
			const trackAuthor = activity.state;
			const trackAlbum = activity.assets.largeText;

			const embed = new EmbedBuilder()
				.setAuthor('Spotify Track Info', 'https://cdn.discordapp.com/emojis/653135129870336031.png?v=1')
				.setColor('GREEN')
				.setThumbnail(trackIMG)
				.addField('Song Name', trackName, true)
				.addField('Album', trackAlbum, true)
				.addField('Author', trackAuthor, false)
				.addField('Listen to Track', `${trackURL}`, false)
				.setFooter(message.member.displayName, message.author.displayAvatarURL())
				.setTimestamp();

			message.channel.send(embed);
		}
		
	}, */
