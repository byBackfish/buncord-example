import { BunListener } from '@bybackfish/buncord';
import { Client, OAuth2Scopes, PermissionFlagsBits } from 'discord.js';

/* Specify the event name as a generic, so that "execute" knows the arguments */
export default class ReadyListener extends BunListener<'ready'> {
  constructor() {
    /* The event name */
    super('ready');
  }

  /* The execute function, arguments are fetched from the generic for type safety */
  public async execute(client: Client<true>) {
    let invite = client.generateInvite({
      scopes: [OAuth2Scopes.Bot, OAuth2Scopes.ApplicationsCommands],
      permissions: PermissionFlagsBits.Administrator,
    });
    this.client.console.log(`Ready as ${client.user?.tag}! Invite: ${invite}`);
  }
}
