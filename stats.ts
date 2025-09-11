import { Client } from 'discord.js';

let commandUsageCount: { [key: string]: number } = {};


export function logActivityStats(client: Client, activity?: string) {
    if (activity) {
        commandUsageCount[activity] = (commandUsageCount[activity] || 0) + 1;
        console.log(`Activity: ${activity}, Count: ${commandUsageCount[activity]}`);
    } else {
        client.on('messageCreate', (message) => {
            if (message.content.startsWith('!')) {
                const command = message.content.split(' ')[0].substring(1);
                commandUsageCount[command] = (commandUsageCount[command] || 0) + 1;
                console.log(`Command used: ${command}, Count: ${commandUsageCount[command]}`);
            }
        });
    }

    client.on('ready', () => {
        console.log(`Logged in as ${client.user?.tag}`);
        console.log('Activity Stats:', commandUsageCount);
    });
}

// Optionally, you can add a function to get stats if you want to display them elsewhere:
export function getActivityStats() {
    return commandUsageCount;
}