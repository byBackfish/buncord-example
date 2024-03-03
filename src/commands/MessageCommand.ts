import { BunCommand, CommandReturnable } from "@bybackfish/buncord";
import { CommandInteraction, User, EmbedBuilder } from "discord.js";

export default class MessageCommand extends BunCommand {
  constructor() {
    super("message", {
      description: "Message command",
      options: [
        {
          name: "message",
          description: "Message you want to use",
          type: BunCommand.Type.STRING,
        },
        {
          name: "person",
          description: "Person you want to use as an arg",
          type: BunCommand.Type.USER,
          required: false,
        },
      ],
    });
  }

  public async execute(
    interaction: CommandInteraction,
    { message, person }: { message: string; person?: User }
  ): Promise<CommandReturnable> {
    if (person) {
      return {
        content: `You said ${message} to ${person.tag}`,
        ephemeral: true,
      };
    }

    return new EmbedBuilder()
      .setTitle("Message")
      .setDescription(`You said ${message}`)
      .setColor("Random")
      .setThumbnail(interaction.user.displayAvatarURL());
  }
}
