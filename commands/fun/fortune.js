const Command = require('../../structures/Command');
const Discord = require('discord.js');
const fortune = require('../../assets/json/fortune.json');

module.exports = class FortuneCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'fortune',
            aliases: ['ft', 'fortunecookie'],
            group: 'fun',
            memberName: 'fortune',
            guildOnly: true,
            description: 'Get a random fortune!',
            examples: ['!fortune'],
        });
    }

    run(message) {
        const embed = new Discord.MessageEmbed()
            .setAuthor(
                `${message.author.username}'s fortune`,
                'https://files.catbox.moe/3cvymb.gif'
            )
            .setDescription(
                fortune[Math.round(Math.random() * (fortune.length - 1))]
            )
            .setColor('#FAC193');
        return message.channel.send({ embed });
    }
};
