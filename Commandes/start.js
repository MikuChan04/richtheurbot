const ms = require('ms');
const config = require("../config.json");

module.exports.run = async (client, message, args) => {

    if(!message.member.hasPermission('MANAGE_MESSAGES')){
        return message.channel.send(':x: Vous devez avoir la permission suivante : `MANAGE_MESSAGES`.');
    }

    let giveawayChannel = message.mentions.channels.first();
    if(!giveawayChannel){
        return message.channel.send(':x: Vous devez mentionner un salon valide pour lancer le giveaway.');
    }

    let giveawayDuration = args[1];
    if(!giveawayDuration || isNaN(ms(giveawayDuration))){
        return message.channel.send(':x: Vous devez rentrer un temps valide !');
    }

    let giveawayNumberWinners = args[2];
    if(isNaN(giveawayNumberWinners)){
        return message.channel.send(':x: Vous devez mettre un nombre valide de gagnant(s) !');
    }

    let giveawayPrize = args.slice(3).join(' ');
    if(!giveawayPrize){
        return message.channel.send(':x: Vous devez mettre une récompense !');
    }

    client.giveawaysManager.start(giveawayChannel, {
        time: ms(giveawayDuration),
        prize: giveawayPrize,
        winnerCount: giveawayNumberWinners,
        messages: {
            giveaway: "🎉🎉 **GIVEAWAY** 🎉🎉",
            giveawayEnded: "🎉🎉 **GIVEAWAY FINI** 🎉🎉",
            timeRemaining: "Temps restant : **{duration}**!",
            inviteToParticipate: "Réagis avec 🎉 pour rejoindre le giveaway !",
            winMessage: "Félicitations, {winners}! Tu as gagné : **{prize}**!",
            embedFooter: "Giveaway",
            noWinner: "Giveaway terminé, aucun participation valide donc, aucun gagnant.",
            winners: "gagnant(s)",
            endedAt: "Fini le",
            congrat: "Félicitations, {winners}! Tu as gagné : **{prize}**!",
            units: {
                seconds: "seconde",
                minutes: "minutes",
                hours: "heures",
                days: "jours",
                pluralS: true
            }
        }
    });

    message.channel.send(`Concours lancé dans le salon suivant : ${giveawayChannel}!`);

};

module.exports.help = {
    name: "start"
}
