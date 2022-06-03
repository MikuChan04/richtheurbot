const ms = require('ms');

const config = require("../config.json");

module.exports.run = async (client, message, args) => {

    if(!message.member.hasPermission('MANAGE_MESSAGES')){
        return message.channel.send(':x: Vous devez avoir la permission suivante : `MANAGE_MESSAGES`.');
    }

    let messageID = args[0];
    if(!messageID){
        return message.channel.send(':x: Vous devez mettre un identifiant de message !');
    }

    try {
        client.giveawaysManager.reroll(messageID);
        message.channel.send('Giveaway relancé !');
    } catch (error) {
        if(error.startsWith(`Aucun giveaway trouvé avec l'identifiant suivant : ${messageID}.`)){
            message.channel.send('Je ne trouve aucun giveaway avec l\'idenfitiant suivant : '+messageID);
        }
        if(err.startsWith(`Le giveaway ayant comme identifiant : ${messageID} n'est pas encore fini.`)){
            message.channel.send('Ce giveaway n\'est pas fini !');
        }
    }

};

module.exports.help = {
    name: "reroll"
}
