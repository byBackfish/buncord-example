import "./env";

import { BunClient } from "@bybackfish/buncord";
import { IntentsBitField } from "discord.js";
import { join } from "path";

const Client = new BunClient({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildPresences,
  ],
  commands: {
    commandDirPath: join(__dirname, "./commands"),
  },
  listeners: {
    listenerDirPath: join(__dirname, "./listeners"),
  },
  token: process.env.DISCORD_TOKEN,
});

Client.login();
