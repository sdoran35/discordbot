const Discord = require('discord.js');
const { Command } = require('discord.js-commando');
const Deal = require('../../models/Deal');
const { stripIndents } = require('common-tags');
const { verify } = require('../../functions/Util');
const hitWords = ['hit', 'hit me'];
const standWords = ['stand'];

module.exports = class BlackJackCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'blackjack',
			group: 'games',
			memberName: 'blackjack',
			aliases: ['bj', '21'],
			description: 'Play BlackJack with other server members, and the bot as dealer!',
			args: [
				{
					key: 'currDeck',
					type: 'string',
					prompt: 'Would you like to view the current deck?',
					oneOf: ['yes', 'no'],
				},
			],

		});

	}

	async run(msg, { deckCount }) {
		const current = this.client.games.get(msg.channel.id);
		if (current) return msg.reply(`Please wait until the current game of \`${current.name}\` is finished.`);
		try {
			this.client.games.set(msg.channel.id, { name: this.name, data: new Deck({ deckCount }) });
			const dealerHand = [];
			this.draw(msg.channel, dealerHand);
			this.draw(msg.channel, dealerHand);
			const playerHand = [];
			this.draw(msg.channel, playerHand);
			this.draw(msg.channel, playerHand);
			const dealerInitialTotal = this.calculate(dealerHand);
			const playerInitialTotal = this.calculate(playerHand);
			if (dealerInitialTotal === 21 && playerInitialTotal === 21) {
				this.client.games.delete(msg.channel.id);
				return msg.say('Well, both of you just hit blackjack. Right away. Rigged.');
			}
			else if (dealerInitialTotal === 21) {
				this.client.games.delete(msg.channel.id);
				return msg.say('Ouch, the dealer hit blackjack right away! Try again!');
			}
			else if (playerInitialTotal === 21) {
				this.client.games.delete(msg.channel.id);
				return msg.say('Wow, you hit blackjack right away! Lucky you!');
			}
			let playerTurn = true;
			let win = false;
			let reason;
			while (!win) {
				if (playerTurn) {
					await msg.say(stripIndents`
						**First Dealer Card:** ${dealerHand[0].display}

						**You (${this.calculate(playerHand)}):**
						${playerHand.map(card => card.display).join('\n')}

						_Hit?_
					`);
					const hit = await verify(msg.channel, msg.author, { extraYes: hitWords, extraNo: standWords });
					if (hit) {
						const card = this.draw(msg.channel, playerHand);
						const total = this.calculate(playerHand);
						if (total > 21) {
							reason = `You drew ${card.display}, total of ${total}! Bust`;
							break;
						}
						else if (total === 21) {
							reason = `You drew ${card.display} and hit 21`;
							win = true;
						}
					}
					else {
						const dealerTotal = this.calculate(dealerHand);
						await msg.say(`Second dealer card is ${dealerHand[1].display}, total of ${dealerTotal}.`);
						playerTurn = false;
					}
				}
				else {
					const inital = this.calculate(dealerHand);
					let card;
					if (inital < 17) card = this.draw(msg.channel, dealerHand);
					const total = this.calculate(dealerHand);
					if (total > 21) {
						reason = `Dealer drew ${card.display}, total of ${total}! Dealer bust`;
						win = true;
					}
					else if (total >= 17) {
						const playerTotal = this.calculate(playerHand);
						if (total === playerTotal) {
							reason = `${card ? `Dealer drew ${card.display}, making it ` : ''}${playerTotal}-${total}`;
							break;
						}
						else if (total > playerTotal) {
							reason = `${card ? `Dealer drew ${card.display}, making it ` : ''}${playerTotal}-**${total}**`;
							break;
						}
						else {
							reason = `${card ? `Dealer drew ${card.display}, making it ` : ''}**${playerTotal}**-${total}`;
							win = true;
						}
					}
					else {
						await msg.say(`Dealer drew ${card.display}, total of ${total}.`);
					}
				}
			}
			this.client.games.delete(msg.channel.id);
			if (win) return msg.say(`${reason}! You won!`);
			return msg.say(`${reason}! Too bad.`);
		}
		catch (err) {
			this.client.games.delete(msg.channel.id);
			throw err;
		}
	}

	draw(channel, hand) {
		const deck = this.client.games.get(channel.id).data;
		const card = deck.draw();
		hand.push(card);
		return card;
	}

	calculate(hand) {
		return hand.sort((a, b) => a.blackjackValue - b.blackjackValue).reduce((a, b) => {
			let { blackjackValue } = b;
			if (blackjackValue === 11 && a + blackjackValue > 21) blackjackValue = 1;
			return a + blackjackValue;
		}, 0);
	}
};


// 	run(message, { currDeck }) {
// 		const deal = new Deal(),
// 			deck = deal.deck,
// 			playerHand = deal.player,
// 			dealerHand = deal.dealer;

// 		if(currDeck == 'yes') {
// 			return message.channel.send('Current Deck: ' + deck.map(deck_val => {
// 				deck_val.code;
// 			}));
// 		}

// 		playerHand.forEach(val => {
// 			const playerEmbed = new Discord.MessageEmbed()
// 				.setFooter('Current Player Hand')
// 				.setDescription(val.code)
// 				.attachFiles(val.imgSrc)
// 				.setImage(`attachment://${val.imgSrc}`)
// 				.setColor('#A187E0');


// 			return message.channel.send({ embed: playerEmbed });
// 		});

// 		message.channel.send('Would you like to hit?');

// 		const prefix = '~';
// 		const args = message.content.slice(prefix.length).trim().split(' ');
// 		const command = args.shift().toLowerCase();

// 		if(command == 'yes') {
// 			deal.playerHit();
// 			deal.dealerHit();
// 		}


// 	}


// };
