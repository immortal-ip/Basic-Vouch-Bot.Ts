import { Client } from 'discord.js';

export function setCustomRPC(client: Client) {
    client.user?.setPresence({
        activities: [{ name: 'Vouch & Ticket Bot', type: 0 }],
        status: 'online',
    });
}