const ms = require('ms');

const config = require('../config.json');

module.exports.run = async (client, message, args) => {

    if(!message.member.hasPermission('MANAGE_MESSAGES')){
        return message.channel.send(':x: Vous devez avoir la permission suivante : `MANAGE_MESSAGES`.');
    }

    let messageID = args[0];
    if(!messageID){
        return message.channel.send(':x: Vous devez mettre un identifiant de message !');
    }

    try {
        client.giveawaysManager.edit(messageID, {
            setEndTimestamp: Date.now()
        });
        message.channel.send('Le giveaway va s\'éteindre dans '+(client.giveawaysManager.options.updateCountdownEvery/1000)+' secondes...');
    } catch (error) {
        if(error.startsWith(`Aucun giveaway trouvé avec l'identifiant suivant : ${messageID}.`)){
            message.channel.send('Je ne trouve pas de giveaway avec l\'identifiant suivant : '+messageID);
        }
        if(err.startsWith(`Le giveaway avec comme identifiant : ${messageID} est déjà fini.`)){
            message.channel.send('Le giveaway est déjà fini !');
        }
    }

};

module.exports.help = {
  name: "end"
}
