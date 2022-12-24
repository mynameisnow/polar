/* eslint-disable no-unused-vars */
const { EmbedBuilder } = require("discord.js");
const axios = require("axios");
const Keyv = require("keyv");
require("dotenv").config();
const LFcolor = new Keyv(process.env.MONGO_URI, {
  collection: "polarBotLastFMcolors",
});
const lastfmApiUrl = "http://ws.audioscrobbler.com/2.0/?method=";
const lastFMU = new Keyv(process.env.MONGO_URI, {
  collection: "polarBotLastFMnames",
});
const method = "user.getRecentTracks";
const uiMethod = "user.getinfo";
const albumplaysMethod = "album.getInfo";
const artistplaysMethod = "artist.getInfo";
module.exports = {
  name: "nowplaying",
  aliases: ["np", "fm"],
  permissions: "SendMessages",
  description: "LastFM commands.",
  cooldown: 0,
  ownerOnly: false,
  async execute(message, args, commandName, client, Discord) {
    const user = message.member || message.mentions.mebers.first();
    const lfUser = await lastFMU.get(user.id);
    const lfUc = await LFcolor.get(user.id);
    const queryString = `&user=${lfUser}&api_key=${process.env.LASTFM_API_KEY}&limit=2&format=json`;
    const requestUrl = `${lastfmApiUrl}${method}${queryString}`;
    /* function fixedEncodeURI(str) {
      return encodeURI(str).replace(/%20/g, "+");
    } */
    try {
      const res = await axios.get(requestUrl);
      console.log(res);

      if (res.data.message) {
        await message.reply({ content: "User not found" });
        return;
      }

      const latestTrack = res.data.recenttracks.track[0];

      if (!latestTrack) {
        await message.reply({ content: "User not found" });
        return;
      }
      /* function encode(string) {
        return cleanURL(
          encodeURIComponent(string).replace(/%2B/g, "%252B").replace(/%20/g, "+")
        );
      } */

      const {
        name,
        artist: { "#text": artist },
        album: { "#text": album },
        // image: { "#text": image },
        image: [, , , { "#text": image }],
        // url: { "#url": url },
        // date: { "#text": date },
      } = latestTrack;
      // const correctURI = encodeURIComponent(str).replace(/%20/g, "+");
      // let userplaycount;
      const albumPlaysQuery = `&api_key=${process.env.LASTFM_API_KEY}&artist=${artist}&album=${album}&user=${lfUser}&format=json`;
      const albumPlaysUrl = `${lastfmApiUrl}${albumplaysMethod}${albumPlaysQuery}`;
      const albumPlaysRes = await axios.get(albumPlaysUrl);
      const albumPlays = albumPlaysRes.data.album;
      const { userplaycount } = albumPlays;
      const artistPlaysQuery = `&artist=${artist}&api_key=${process.env.LASTFM_API_KEY}&user=${lfUser}&format=json`;
      const artistplaysUrl = `${lastfmApiUrl}${artistplaysMethod}${artistPlaysQuery}`;
      const artistPlaysRes = await axios.get(artistplaysUrl);
      const artistPlays = artistPlaysRes.data.artist;
      // const { userplaycount } = artistPlays;
      // const { userplaycount } = albumPlays || artistPlays;
      const uiQuery = `&user=${lfUser}&api_key=${process.env.LASTFM_API_KEY}&format=json`;
      const uiUrl = `${lastfmApiUrl}${uiMethod}${uiQuery}`;
      const uiRes = await axios.get(uiUrl);
      const uInfo = uiRes.data.user;
      const { playcount } = uInfo;
      // **${userplaycount}x**
      const baseUrl = "https://last.fm";
      const artistURL = `/music/${encodeURI(artist).replace(/%20/g, "+")}`;
      const albumURL = `${artistURL}/${encodeURI(album).replace(/%20/g, "+")}`;
      const songUrl = `${baseUrl}${artistURL}/_/${encodeURI(name).replace(
        /%20/g,
        "+"
      )}`;
      const nowPlaying = new EmbedBuilder()
        .setAuthor({
          name: `${user.user.tag}`,
          iconURL: `${user.user.displayAvatarURL({ dynamic: true })}`,
          url: `https://last.fm/user/${lfUser}`,
        })
        .setDescription(
          `> [${name}](${songUrl}) \n > By [${artist}](${baseUrl}${artistURL})\n > On [${album}](${baseUrl}${albumURL})`
        )
        .setColor(lfUc || user.displayColor)
        .setThumbnail(image)
        .setFooter({
          text: `Total Scrobbles: ${playcount}`,
          iconURL:
            "https://cdn.discordapp.com/attachments/875802268757266445/1009867738052841532/unknown.png",
        })
        .setTimestamp();

      const npEmbed = await message.reply({
        // content: `${user} is currently listening to: ${name} - ${artist} on **${album}**`,
        embeds: [nowPlaying],
        allowedMentions: { repliedUser: false },
      });
      await npEmbed.react("👍");
      await npEmbed.react("👎");
      console.log(res);
    } catch (error) {
      console.error("err:", error);
      await message.reply({
        content: "There was an error while executing this command!",
        // ephemeral: true,
      });
    }
  },
};
