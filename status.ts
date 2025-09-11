import { Client, GatewayIntentBits, ActivityType } from 'discord.js';

export function setOnlineStatus(client: Client) {
    client.user?.setStatus('online');
    client.user?.setActivity('Vouching for users!', { type: ActivityType.Watching });
}