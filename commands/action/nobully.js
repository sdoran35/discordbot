const Command = require('../../structures/Command');
const Discord = require('discord.js');
const actions = require('../../assets/json/actions.json');

module.exports = class NoBullyCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'nobully',
            aliases: ['antibully'],
            group: 'action',
            memberName: 'nobully',
            guildOnly: true,
            description: 'Absolutely no bullying allowed!',
            examples: ['!nobully <user>'],
        });
    }

    run(message) {
        const recipient = message.content.split(/\s+/g).slice(1).join(' ');
        const embed = new Discord.MessageEmbed();
        if (!recipient) {
            embed.setColor('#FBCFCF');
            embed.setImage(
                actions.nobullyP[
                    Math.round(Math.random() * (actions.nobullyP.length - 1))
                ]
            );
            return message.channel.send({ embed: embed });
        } else if (message.mentions.users.first() == this.client.user) {
            return message.channel.send('(✿´ ꒳ ` ) am not bulli!!');
        } else {
            const embed = new Discord.MessageEmbed();
            embed.setColor('#FBCFCF');
            embed.setImage(
                actions.nobullyP[
                    Math.round(Math.random() * (actions.nobullyP.length - 1))
                ]
            );
            return message.channel.send(`${recipient}, pls no bulli!!`, {
                embed: embed,
            });
        }
    }
};
