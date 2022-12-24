/* eslint-disable no-unused-vars */
const { Client, Message, EmbedBuilder, Collection } = require("discord.js");
const path = require("path");
const db = require("quick.db");
const { prefix, owner_id } = require("../../config.json");
//	const { prefix } = require(path.resolve('Doggo', 'config.json'));

module.exports = {
  name: "messageCreate",
  /**
   * @param { Client } client
   * @param { Message } message
   */
  async execute(message, client, Discord) {
    //	console.log('test execute');
    const errorChannel = client.channels.cache.get("995334242814918666");
    if (!message.content.startsWith(prefix) || message.author.bot) return;
    //	console.log('test execute 2');
    //	console.log(prefix);
    // eslint-disable-next-line no-shadow
    /* let Prefix = await db.fetch(`prefix_${message.guild.id}`);
		if (Prefix == null) {
			Prefix = prefix;
		}
		else {
			Prefix = prefix;
		} */
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();
    const command =
      client.commands.get(commandName) ||
      client.commands.find(
        (cmd) => cmd.aliases && cmd.aliases.includes(commandName)
      );

    if (!command) return;
    /* {
			const noCommand = new EmbedBuilder()
				.setColor('RED')
				.setDescription(`<:error:917085366522118167> ${message.author} That isn't a valid command.`);
			return message.channel.send({ embeds: [noCommand] })
				.then((sent) => {
					setTimeout(() => {
						sent.delete();
					}, 2000);
				});
		} */

    if (command.permissions) {
      const authorPerms = message.channel.permissionsFor(message.author);
      if (!authorPerms || !authorPerms.has(command.permissions)) {
        const NoPerms = new EmbedBuilder()
          .setColor("Red")
          .setDescription(
            `<:error:917085366522118167> ${message.author} Missing permissions: \`${command.permissions}\`.`
          );
        // .addField('Required Perms', `${command.permissions}`);
        return message.channel.send({ embeds: [NoPerms] }).then((sent) => {
          setTimeout(() => {
            sent.Delete();
          }, 2000);
        });
      }
    }
    const { cooldowns } = client;
    if (!cooldowns.has(command.name)) {
      cooldowns.set(command.name, new Collection());
    }

    const now = Date.now();
    const timestamps = cooldowns.get(command.name);
    const cooldownAmount = (command.cooldown || 1) * 1000;

    if (timestamps.has(message.guild.id)) {
      const expirationTime = timestamps.get(message.guild.id) + cooldownAmount;
      if (now < expirationTime) {
        const timeLeft = (expirationTime - now) / 1000;
        const timeleftEmbed = new EmbedBuilder()
          .setColor("Red")
          .setDescription(
            `Please wait another ${timeLeft.toFixed(
              1
            )} seconds to run that command again.`
          );
        return message.channel
          .send({ embeds: [timeleftEmbed] })
          .then((sent) => {
            setTimeout(() => {
              sent.delete();
            }, 4500);
          });
      }
    }
    if (
      message.conent === `<@${client.user.id}>` ||
      message.content === `<@!${client.user.id}>`
    ) {
      const prefixEmbed = new EmbedBuilder()
        .setColor("Random")
        .setDescription(`My prefix is ${prefix}`);
      message.channel.send({ embeds: prefixEmbed });
    }
    if (command.ownerOnly == true) {
      if (message.author.id != owner_id) {
        return;
        /* const ownerOnly = new EmbedBuilder()
					.setColor('RED')
					.setDescription(`<:error:917085366522118167> ${message.author} That command is only for the owner!`);
				return message.channel.send({ embeds: [ownerOnly] })
					.then((sent) => {
						setTimeout(() => {
							sent.Delete();
						}, 2000);
					}); */
      }
    }
    timestamps.set(message.guild.id, now);
    setTimeout(() => timestamps.delete(message.guild.id), cooldownAmount);

    const loadCommand = new EmbedBuilder()
      .setColor("Blue")
      .setDescription("<a:loading:899806978136764437> Loading command...");
    // const load = await message.channel.send({ embeds: loadCommand }); */

    // console.log('test execute 3');
    try {
      // const msg = await message.channel.send({ embeds: [loadCommand] });
      command.execute(message, args, commandName, client, Discord);
      // msg.delete();
    } catch (error) {
      console.log(error);
      const ErrorEmbed = new EmbedBuilder()
        .setColor("Red")
        .setDescription(
          "An error occured while trying to run this command. Error has been logged."
        );
      // .addField('Error', `${error}`);
      message.channel.send({ embeds: [ErrorEmbed] });
      const channelError = new EmbedBuilder()
        .setColor("Red")
        .setTitle(commandName)
        .setDescription(`${error}`);
      // .setFooter(now);
      errorChannel.send({ embeds: [channelError] });
      // owner_id.send(error);
    }
  },
};
