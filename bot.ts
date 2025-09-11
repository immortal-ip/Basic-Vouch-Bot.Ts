import { Client, GatewayIntentBits, REST, Routes, Interaction } from 'discord.js';
import dotenv from 'dotenv';
import { setCustomRPC } from './features/rpc';
import { setOnlineStatus } from './features/status';
import { logActivityStats } from './features/stats';
import { createTicket } from './commands/ticket';
import { vouchUser } from './commands/vouch';
import { showHelpMenu, handleHelpMenuSelect } from './commands/help';

dotenv.config();

const TOKEN = process.env.DISCORD_TOKEN as string;
const PREFIX = process.env.PREFIX || '!';

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ],
});

client.once('ready', async () => {
    console.log(`Logged in as ${client.user?.tag}`);
    setCustomRPC(client);
    setOnlineStatus(client);

    // Register slash commands
    const rest = new REST({ version: '10' }).setToken(TOKEN);
    await rest.put(
        Routes.applicationCommands(client.user!.id),
        {
            body: [
                {
                    name: 'ticket',
                    description: 'Create a support ticket',
                },
                {
                    name: 'vouch',
                    description: 'Vouch for a user',
                    options: [
                        {
                            name: 'user',
                            type: 6, // USER
                            description: 'User to vouch for',
                            required: true,
                        },
                    ],
                },
                {
                    name: 'help',
                    description: 'Show help menu',
                },
            ],
        }
    );
});

client.on('messageCreate', async (message) => {
    if (message.author.bot) return;
    if (!message.content.startsWith(PREFIX)) return;

    const [cmd, ...args] = message.content.slice(PREFIX.length).trim().split(/\s+/);

    if (cmd === 'ticket') {
        await createTicket(message, args);
    } else if (cmd === 'vouch') {
        await vouchUser(message, args);
    } else if (cmd === 'help') {
        await showHelpMenu(message);
    }
});

client.on('interactionCreate', async (interaction: Interaction) => {
    if (interaction.isChatInputCommand()) {
        if (interaction.commandName === 'ticket') {
            await createTicket(interaction, []);
            logActivityStats(client, 'ticket');
        } else if (interaction.commandName === 'vouch') {
            const user = interaction.options.get('user')?.user;
            await vouchUser(interaction, user ? [user.id] : []);
            logActivityStats(client, 'vouch');
        } else if (interaction.commandName === 'help') {
            await showHelpMenu(interaction);
            logActivityStats(client, 'help');
        }
    } else if (interaction.isStringSelectMenu() && interaction.customId === 'help_menu') {
        await handleHelpMenuSelect(interaction);
    }
});

client.login(TOKEN);