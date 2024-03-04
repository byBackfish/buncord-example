import { BunCommand, CommandReturnable } from '@bybackfish/buncord';
import { CommandInteraction, User, EmbedBuilder } from 'discord.js';

export default class MessageCommand extends BunCommand {
  constructor() {
    super('message', {
      description: 'Message command',
      /* Specifying the arguments that should be given with the slash command execution */
      options: [
        {
          name: 'message',
          description: 'Message you want to use',
          type: BunCommand.Type.STRING,
        },
        {
          name: 'person',
          description: 'Person you want to use as an arg',
          type: BunCommand.Type.USER,
          required: false,
        },
      ],
    });
  }

  public async execute(
    interaction: CommandInteraction,
    /* The arguments from the options above. The Record key is the name of the argument, specified above*/
    { message, person }: { message: string; person?: User }
  ): Promise<CommandReturnable> {
    /* You can directly return a CommandReturnable, alternatively
     you can just access the interaction directly and return manually */

    if (person) {
      return {
        content: `You said ${message} to ${person.tag}`,
        ephemeral: true,
      };
    }

    return new EmbedBuilder()
      .setTitle('Message')
      .setDescription(`You said ${message}`)
      .setColor('Random')
      .setThumbnail(interaction.user.displayAvatarURL());
  }
}
