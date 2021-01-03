const Command = require('../../structures/Command');
const Discord = require('discord.js');
const { ERROR_LOG } = require('../../config').logs;
const { errorMessage } = require('../../util/logHandler');
const ErrorEnum = require('../../util/errorTypes.json');


module.exports = class ImposterCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'imposter',
			memberName: 'imposter',
			aliases: ['otherusermsg'],
			group: 'fun',
			guildOnly: true,
			description: 'Send a message as a different user',
			args: [
				{
					key: 'user',
					type: 'string',
					prompt: 'Please enter a user to send as',

				},
				{
					key: 'msg',
					type: 'string',
					prompt: 'please enter msg to send',
				},
			],
		});

	}

	run(message, { user, msg }) {
		const member = message.mentions.members.first();


	}

};
