/* eslint-disable no-unused-vars */
module.exports = {
  name: "messageDelete",
  /**
   * @param { Client } client
   * @param { Message } message
   */
  execute(message, client, Discord, messageDelete) {
    // client.on('messageDelete', (message) => {
    // if(messageDelete.author.bot) return;
    let snipes = client.snipes.get(message.channel.id) || [];
    // if (snipes.length > 5) snipes = snipes.slice(0, 4);
    // if (snipes.content === null) return;
    if (snipes.length > 5) snipes = snipes.slice(0, 4);

    snipes.unshift({
      msg: message,
      image: message.attachments.first()?.proxyURL || null,
      time: Date.now(),
    });
    // })
    client.snipes.set(message.channel.id, snipes);
  },
};
