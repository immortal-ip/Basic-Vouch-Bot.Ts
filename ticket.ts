import { Message, CommandInteraction, TextChannel, ChannelType, PermissionsBitField, GuildTextBasedChannel } from 'discord.js';

export async function createTicket(source: Message | CommandInteraction, args: string[]) {
    try {
        let username: string | undefined;
        let userId: string | undefined;
        let guild = source.guild;

        if (source instanceof Message) {
            username = source.author.username;
            userId = source.author.id;
        } else if (source instanceof CommandInteraction) {
            username = source.user.username;
            userId = source.user.id;
        }

        if (!guild || !userId || !username) {
            if (source instanceof Message || source instanceof CommandInteraction) {
                await source.reply('Could not create ticket: missing guild or user information.');
            }
            return;
        }

        const ticketChannel = await guild.channels.create({
            name: `ticket-${username}`,
            type: ChannelType.GuildText,
            permissionOverwrites: [
                {
                    id: guild.id,
                    deny: [PermissionsBitField.Flags.ViewChannel],
                },
                {
                    id: userId,
                    allow: [PermissionsBitField.Flags.ViewChannel],
                },
            ],
        });

        // Always mention the channel
        await source.reply(`Ticket created: <#${ticketChannel.id}>`);

        // Send welcome message in the ticket channel
        await ticketChannel.send(`Hello <@${userId}>, how can we assist you?`);
    } catch (error) {
        console.error('Error creating ticket:', error);
        await source.reply('There was an error creating your ticket. Please try again later.');
    }
}