import { Message, CommandInteraction, EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder, StringSelectMenuInteraction } from 'discord.js';

const helpCategories = [
    {
        label: 'Ticket',
        description: 'Commands for support tickets',
        value: 'ticket',
    },
    {
        label: 'Vouch',
        description: 'Commands for vouching users',
        value: 'vouch',
    },
];

export async function showHelpMenu(target: Message | CommandInteraction) {
    const embed = new EmbedBuilder()
        .setTitle('Help Menu')
        .setDescription('Select a category from the dropdown below to see commands.')
        .setColor(0x5865F2);

    const menu = new StringSelectMenuBuilder()
        .setCustomId('help_menu')
        .setPlaceholder('Choose a category')
        .addOptions(helpCategories);

    const row = new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(menu);

    await target.reply({ embeds: [embed], components: [row] });
}

export async function handleHelpMenuSelect(interaction: StringSelectMenuInteraction) {
    let embed;
    switch (interaction.values[0]) {
        case 'ticket':
            embed = new EmbedBuilder()
                .setTitle('Ticket Commands')
                .setDescription('`/ticket` - Create a support ticket\n`!ticket` - Create a support ticket')
        case 'ticket':
            embed = new EmbedBuilder()
                .setTitle('Ticket Commands')
                .setDescription('`/ticket` - Create a support ticket\n`!ticket` - Create a support ticket')
                .setColor(0x57F287);
            break;
        case 'vouch':
            embed = new EmbedBuilder()
                .setTitle('Vouch Commands')
                .setDescription('`/vouch <user>` - Vouch for a user\n`!vouch <user>` - Vouch for a user')
                .setColor(0x57F287);
            break;
        default:
            embed = new EmbedBuilder()
                .setTitle('Help Menu')
                .setDescription('Select a category from the dropdown below to see commands.')
                .setColor(0x5865F2);
    }
    await interaction.update({ embeds: [embed], components: [] });
}