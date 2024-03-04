import { BunCommand, CommandReturnable } from '@bybackfish/buncord';
import {
  CommandInteraction,
  ButtonBuilder,
  ButtonStyle,
  ActionRowBuilder,
  ButtonInteraction,
} from 'discord.js';

export default class ButtonCommand extends BunCommand {
  constructor() {
    super('button', {
      description: 'Button command',
      options: [],
    });
  }

  public async execute(
    _interaction: CommandInteraction,
    _args: Record<string, unknown>
  ): Promise<CommandReturnable> {
    /* Creating a random customId with the name: clickme */
    let customId = this.client.makeRandom('clickme');

    /* Creating a button */
    let button = new ButtonBuilder()
      .setStyle(ButtonStyle.Secondary)
      .setLabel('Click me')
      .setEmoji('🔗')
      .setCustomId(customId);

    /* Awaiting the button click */
    this.client
      .await<ButtonInteraction>(customId)
      .then((clickInteraction: ButtonInteraction) => {
        clickInteraction.reply({
          content: 'You clicked me!',
          ephemeral: true,
        });
      });

    let row: ActionRowBuilder<ButtonBuilder> =
      new ActionRowBuilder<ButtonBuilder>({
        components: [button],
      });

    /* Returning the command reply options */
    return {
      content: 'Click me!',
      components: [row],
    };
  }
}
