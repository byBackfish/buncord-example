import { BunCommand, CommandReturnable } from '@bybackfish/buncord';
import {
  CommandInteraction,
  ActionRowBuilder,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
  ModalSubmitInteraction,
} from 'discord.js';

export default class Modal extends BunCommand {
  constructor() {
    super('modal', {
      description: 'Modal command',
      options: [],
    });
  }

  public async execute(
    _interaction: CommandInteraction,
    _args: Record<string, unknown>
  ): Promise<CommandReturnable> {
    /* Creating a random customId with the name: modalcommandsubmit */
    let customId = this.client.makeRandom('modalcommandsubmit');

    /* Creating a text input */
    let input = new TextInputBuilder()
      .setCustomId('name')
      .setLabel('What is your name?')
      .setStyle(TextInputStyle.Short)
      .setRequired(true);

    let row: ActionRowBuilder<TextInputBuilder> =
      new ActionRowBuilder<TextInputBuilder>().addComponents(input);

    /* Creating a modal */
    let modal = new ModalBuilder()
      .setTitle('Submit me!')
      .setCustomId(customId)
      .addComponents(row);

    /* Awaiting the modal submit */
    this.client
      .await<ModalSubmitInteraction>(customId)
      .then((submitInteraction: ModalSubmitInteraction) => {
        submitInteraction.reply({
          content: `Hello, ${submitInteraction.fields.getField('name')?.value}`,
          ephemeral: true,
        });
      });

    /* Returning the modal to show. Alternatively, you could use interaction#showModal directly */
    return modal;
  }
}
