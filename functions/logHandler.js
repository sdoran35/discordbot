const Discord = require('discord.js');
const {error_log} = require('../config');

function errorMessage(error,error_type,error_command){

    return new Discord.MessageEmbed()
        .setTitle('❎ Command: ' + error_command + '\nError Type: ' +  error_type)
        .setColor("RED")
        .addField('Error Message', `${error.message}`, true)
        .addField('Error URL', (`${error.url}` || `${error.path}`), true)
        .setTimestamp()


}

function guildMessage(guild,guild_message){

}

function dmMessage(){

}

function supportMessage(){

}

function botMessage(){

}

module.exports = {
    errorMessage,
    guildMessage,
    supportMessage,
    dmMessage,
    botMessage

}

