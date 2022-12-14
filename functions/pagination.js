/* eslint-disable prefer-const */
/* eslint-disable no-unused-vars */
module.exports = {
  pagination,
};

const {
  ChatInputCommandInteraction,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  ComponentType,
} = require("discord.js");
/**
 *
 * @param {ChatInputCommandInteraction} message
 * @param {EmbedBuilder[]} embeds
 * @returns
 */
async function pagination(message, embeds) {
  /* if (interaction.deferred == false) {
    await interaction.deferReply();
  } */

  let but1 = new ButtonBuilder()
    .setStyle(ButtonStyle.Primary)
    .setCustomId("first")
    .setEmoji("<:Pagination1:999292743719321630>")
    .setDisabled(false);

  let but2 = new ButtonBuilder()
    .setStyle(ButtonStyle.Primary)
    .setCustomId("previous")
    .setEmoji("<:Pagination2:999292810391998515>")
    .setDisabled(false);

  let but3 = new ButtonBuilder()
    .setStyle(ButtonStyle.Danger)
    .setCustomId("delete")
    .setEmoji("<:No:984569652640382996>")
    .setDisabled(false);

  let but4 = new ButtonBuilder()
    .setStyle(ButtonStyle.Primary)
    .setCustomId("next")
    .setEmoji("<:Pagination3:999292867342237746>")
    .setDisabled(false);

  let but5 = new ButtonBuilder()
    .setStyle(ButtonStyle.Primary)
    .setCustomId("last")
    .setEmoji("<:Pagination4:999292909155270686>")
    .setDisabled(false);

  const row = new ActionRowBuilder().addComponents(
    but1.setDisabled(false),
    but2.setDisabled(false),
    but3.setDisabled(false),
    but4.setDisabled(false),
    but5.setDisabled(false)
  );

  if (embeds.length == 1) {
    return message.reply({
      embeds: [embeds[0]],
      components: [
        new ActionRowBuilder().addComponents([
          but1.setDisabled(true),
          but2.setDisabled(true),
          but3.setDisabled(true),
          but4.setDisabled(true),
          but5.setDisabled(true),
        ]),
      ],
    });
  }

  embeds = embeds.map((embed, index) => {
    return embed.setFooter({
      text: `Page: ${index + 1}/${embeds.length}`,
      iconURL: message.guild.iconURL(),
    });
  });

  const sendMsg = await message.reply({
    embeds: [embeds[0]],
    components: [
      new ActionRowBuilder().addComponents(
        but1.setDisabled(true),
        but2.setDisabled(true),
        but3.setDisabled(false),
        but4.setDisabled(false),
        but5.setDisabled(false)
      ),
    ],
  });

  let filter = (m) => m.member.id === message.member.id;

  const collector = sendMsg.createMessageComponentCollector({
    filter: filter,
    time: 60000,
    componentType: ComponentType.Button,
  });

  let curPage = 0;

  collector.on("collect", async (b) => {
    await b.deferUpdate().catch((e) => null);

    switch (b.customId) {
      case "next":
        {
          curPage++;
          if (curPage !== embeds.length - 1) {
            await sendMsg.edit({
              embeds: [embeds[curPage]],
              components: [
                new ActionRowBuilder().addComponents(
                  but1.setDisabled(false),
                  but2.setDisabled(false),
                  but3.setDisabled(false),
                  but4.setDisabled(false),
                  but5.setDisabled(false)
                ),
              ],
            });
          } else {
            await sendMsg.edit({
              embeds: [embeds[curPage]],
              components: [
                new ActionRowBuilder().addComponents(
                  but1.setDisabled(false),
                  but2.setDisabled(false),
                  but3.setDisabled(false),
                  but4.setDisabled(true),
                  but5.setDisabled(true)
                ),
              ],
            });
          }
        }
        break;

      case "previous":
        {
          curPage--;
          if (curPage !== 0) {
            return sendMsg.edit({
              embeds: [embeds[curPage]],
              components: [
                new ActionRowBuilder().addComponents(
                  but1.setDisabled(false),
                  but2.setDisabled(false),
                  but3.setDisabled(false),
                  but4.setDisabled(false),
                  but5.setDisabled(false)
                ),
              ],
            });
          } else {
            sendMsg.edit({
              embeds: [embeds[curPage]],
              components: [
                new ActionRowBuilder().addComponents(
                  but1.setDisabled(true),
                  but2.setDisabled(true),
                  but3.setDisabled(false),
                  but4.setDisabled(false),
                  but5.setDisabled(false)
                ),
              ],
            });
          }
        }

        break;

      case "first":
        {
          curPage = 0;
          await sendMsg.edit({
            embeds: [embeds[curPage]],
            components: [
              new ActionRowBuilder().addComponents(
                but1.setDisabled(true),
                but2.setDisabled(true),
                but3.setDisabled(false),
                but4.setDisabled(false),
                but5.setDisabled(false)
              ),
            ],
          });
        }

        break;

      case "last":
        {
          curPage = embeds.length - 1;
          await sendMsg.edit({
            embeds: [embeds[curPage]],
            components: [
              new ActionRowBuilder().addComponents(
                but1.setDisabled(false),
                but2.setDisabled(false),
                but3.setDisabled(false),
                but4.setDisabled(true),
                but5.setDisabled(true)
              ),
            ],
          });
        }

        break;

      case "delete": {
        row.components.forEach((btn) => btn.setDisabled(true));

        await sendMsg.edit({
          embeds: [embeds[curPage]],
          components: [row],
        });
      }
    }

    collector.on("end", async () => {
      row.components.forEach((btn) => btn.setDisabled(true));

      if (sendMsg.editable) {
        await sendMsg.edit({
          embeds: [embeds[curPage]],
          components: [row],
        });
      }
    });
  });
}
