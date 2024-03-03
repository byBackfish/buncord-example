import { BunListener } from "@bybackfish/buncord";
import { Client, OAuth2Scopes, PermissionFlagsBits } from "discord.js";

export default class ReadyListener extends BunListener<"ready"> {
  constructor() {
    super("ready");
  }

  public execute(client: Client<true>) {
    let invite = client.generateInvite({
      scopes: [OAuth2Scopes.Bot, OAuth2Scopes.ApplicationsCommands],
      permissions: PermissionFlagsBits.Administrator,
    });
    this.client.console.log(`Ready as ${client.user?.tag}! Invite: ${invite}`);
  }
}
