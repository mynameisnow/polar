/* eslint-disable no-unused-vars */
module.exports = {
  name: "lockdown",
  // cooldown: 10,
  permissions: ["ADMINISTRATOR"],
  // clientpermissions: ['ADMINISTRATOR'],
  description: "Locks down the entire server.",
  async execute(message, args, commandName, client, Discord) {
    const guild = message.guild;
    const role = message.guild.roles.everyone;

    if (!args.length) return message.channel.send("Please specify a query.");

    const query = args[0].toLowerCase();

    if (!["on", "off"].includes(query))
      return message.channel.send("The option you have stated is not valid.");

    const perms = role.permissions.toArray();

    if (query === "off") {
      perms.push("SendMessages");
      console.log(perms);
      await role.edit({ permissions: perms });
      message.channel.send("Server has been unlocked.");
    } else {
      const newPerms = perms.filter((perm) => perm !== "SendMessages");
      // const newPerms = guild.permissionOverwrites.perms.edit(role, { SendMessages: false, ADD_REACTIONS: false });
      console.log(newPerms);

      await role.edit({ permissions: newPerms });
      message.channel.send("Server has been locked down.");
    }
  },
};
