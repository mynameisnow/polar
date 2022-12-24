/* eslint-disable no-unused-vars */
const { EmbedBuilder } = require("discord.js");
const Keyv = require("keyv");
require("dotenv").config();
const axios = require("axios");
const lastfmApiUrl = "http://ws.audioscrobbler.com/2.0/?method=";
const baseUrl = "https://last.fm";
const LFusername = new Keyv(process.env.MONGO_URI, {
  // database: "polarBeta",
  collection: "polarBotLastFMnames",
});
const LFcolor = new Keyv(process.env.MONGO_URI, {
  collection: "polarBotLastFMcolors",
});
module.exports = {
  name: "lastfm",
  aliases: ["lf"],
  permissions: "SendMessages",
  description: "LastFM commands.",
  cooldown: 0,
  ownerOnly: false,
  async execute(message, args, commandName, client, Discord) {
    const user = message.member;
    if (args[0] === "set") {
      const name = args[1];

      await LFusername.set(message.author.id, name).catch((e) =>
        console.log(e)
      );
      if (!name) return message.channel.send("Could not find that account.");
      const lfSuccess = new EmbedBuilder()
        .setColor("Green")
        .setDescription(
          `✅ You have successfully set your last.fm name as ${name}.`
        );
      return message.reply({
        embeds: [lfSuccess],
        allowedMentions: { repliedUser: false },
      });
    }
    if (args[0] === "cc") {
      if (!args[1])
        return message.reply({
          embeds: [
            new EmbedBuilder()
              .setAuthor({
                name: `${user.user.tag}`,
                iconURL: `${user.user.displayAvatarURL({ dynamic: true })}`,
              })
              .setColor("Random")
              .setDescription(
                `> To select your own embed color, do **lf cc [hexcode]**. 
          > (A hex code looks like this: **#32a852**) 
          > To find a hex code you can visit the [Google Color Picker](https://g.co/kgs/hTq5bD).
          > If you already have a custom embed color and would like to remove it, type **lf cc off**`
              )
              .setImage(
                "https://cdn.discordapp.com/attachments/875802268757266445/1009258860734849105/Screen_Shot_2022-08-16_at_8.34.10_PM.png"
              ),
          ],
          allowedMentions: { repliedUser: false },
        });
      const color = args[1];
      LFcolor.set(message.author.id, color).catch((e) => console.log(e));
      if (color === "off")
        return message.reply({
          embeds: [
            new EmbedBuilder().setDescription(
              "Your custom embed color has been reset."
            ),
          ],
        });
      LFcolor.delete(message.author.id, color).catch((e) => console.log(e));
      if (!color) return message.channel.send("Could not find that color.");
      const colorE = new EmbedBuilder()
        .setDescription(
          `<:checkmark:1008398521516429322> You have set your custom embed color as ${color}.`
        )
        .setColor(color);
      return message.reply({
        embeds: [colorE],
        allowedMentions: { repliedUser: false },
      });
    }
    if (args[0] === "cover") {
      const lfUser = await LFusername.get(user.id);
      const method = "user.getRecentTracks";
      const lfUc = await LFcolor.get(user.id);
      const queryString = `&user=${lfUser}&api_key=${process.env.LASTFM_API_KEY}&limit=2&format=json`;
      const requestUrl = `${lastfmApiUrl}${method}${queryString}`;
      const resCover = await axios.get(requestUrl);
      const latestTrack = resCover.data.recenttracks.track[0];
      const {
        name,
        artist: { "#text": artist },
        album: { "#text": album },
        image: [, , , { "#text": image }],
      } = latestTrack;
      const artistURL = `/music/${encodeURI(artist)}`;
      const songUrl = `${baseUrl}${artistURL}/_/${encodeURI(name)}`;
      const albumURL = `${artistURL}/${encodeURI(album)}`;
      const cover = new EmbedBuilder()
        .setAuthor({
          name: `${user.user.tag}`,
          iconURL: `${user.user.displayAvatarURL({ dynamic: true })}`,
          url: `https://last.fm/user/${lfUser}`,
        })
        .setDescription(
          `[${name}](${songUrl}) on [${album}](${baseUrl}${albumURL})`
        )
        .setImage(image)
        .setColor(user.displayColor);
      return message.reply({
        embeds: [cover],
        allowedMentions: { repliedUser: false },
      });
    }
    if (args[0] === "plays") {
      const method = "user.getRecentTracks";
      const lfUser = await LFusername.get(user.id);
      const lfUc = await LFcolor.get(user.id);
      const queryString = `&user=${lfUser}&api_key=${process.env.LASTFM_API_KEY}&limit=1&format=json`;
      const requestUrl = `${lastfmApiUrl}${method}${queryString}`;
      const res = await axios.get(requestUrl);

      const latestTrack = res.data.recenttracks.track[0];
      const {
        name,
        artist: { "#text": artist },
        album: { "#text": album },
        image: [, , , { "#text": image }],
      } = latestTrack;

      /* const playsMethod = "track.getInfo";
      const playsQuery = `&api_key=${process.env.LASTFM_API_KEY}&username=${lfUser}&artist=${artist}&track=${name}&format=json`;
      const playsUrl = `${lastfmApiUrl}${playsMethod}${playsQuery}`;
      const playsRes = await axios.get(playsUrl);
      const plays = playsRes.data.track;
      const { userplaycount } = plays;
      return message.channel.send(
        `You have ${userplaycount} plays for ${name} by ${artist}`
      ); */
      const artistMethod = "artist.getinfo";
      const artistQuery = `&user=${lfUser}&artist=${artist}&api_key=${process.env.LASTFM_API_KEY}&format=json`;
      const artistUrl = `${lastfmApiUrl}${artistMethod}${artistQuery}`;
      const artistRes = await axios.get(artistUrl);
      const artistPlays = artistRes.data.artist;
      const { userplaycount } = artistPlays;
      const artistLF = `${baseUrl}/music/${encodeURI(artist).replace(
        /%20/g,
        "+"
      )}`;
      console.log(artistPlays);
      console.log(userplaycount);
      message.reply({
        embeds: [
          new EmbedBuilder()
            .setColor("Random")
            .setDescription(
              `🎶 you have **${userplaycount}** plays for **[${artist}](${artistLF})**`
            ),
        ],
        allowedMentions: { repliedUser: false },
      });
      // const queryString = `&artist=${artist}&track=${track}&user=${lastfmUser}&format=json`;
      // https://ws.audioscrobbler.com/2.0/?method=track.getInfo&api_key=08fa996e797b39cddc20ef7db67fa2fd&artist=Sheff+G&track=All+My+Life&user=iamsnow_&format=json
    }
  },
};
