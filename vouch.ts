import { Message, CommandInteraction } from 'discord.js';
import { Vouch } from '../types';

export async function vouchUser(source: Message | CommandInteraction, args: string[]) {
    // Logic to vouch for a user
    const userToVouch = args[0]; // Assuming the first argument is the user to vouch for
    const userId = 'user' in source ? source.user.id : source.member?.user.id;
    const username = 'user' in source ? source.user.username : source.member?.user.username;

    const vouch: Vouch = {
        userId: userId as string,
        vouchFor: userToVouch,
        createdAt: new Date(),
    };

    // Here you would typically save the vouch to a database or a file
    // For demonstration, we'll just log it to the console
    console.log(`User ${username} vouched for ${userToVouch} at ${vouch.createdAt}`);

    await source.reply(`You have vouched for <@${userToVouch}>!`);
};