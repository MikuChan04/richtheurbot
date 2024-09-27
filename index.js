const Discord = require('discord.js');
const fs = require('fs').promises;
const path = require('path');
const { GiveawaysManager } = require('discord-giveaways');
const config = require('./config.json');

class DiscordBot {
    constructor() {
        this.client = new Discord.Client();
        this.client.commands = new Discord.Collection();
        this.prefix = config.prefix;

        this.setupGiveawaysManager();
        this.loadCommands();
        this.loadEvents();
        this.setupMessageListeners();
    }

    async loadCommands() {
        const commandFiles = await fs.readdir(path.join(__dirname, 'commands'));
        const jsFiles = commandFiles.filter(file => file.endsWith('.js'));

        if (jsFiles.length === 0) {
            console.log('No commands found!');
            return;
        }

        for (const file of jsFiles) {
            const command = require(`./commands/${file}`);
            this.client.commands.set(command.name, command);
            console.log(`Loaded command: ${file}`);
        }
    }

    async loadEvents() {
        const eventFiles = await fs.readdir(path.join(__dirname, 'events'));
        
        for (const file of eventFiles) {
            const event = require(`./events/${file}`);
            const eventName = path.basename(file, '.js');
            this.client.on(eventName, event.bind(null, this.client));
            console.log(`Loaded event: ${eventName}`);
        }
    }

    setupGiveawaysManager() {
        this.client.giveawaysManager = new GiveawaysManager(this.client, {
            storage: "./giveaway.json",
            updateCountdownEvery: 3000,
            default: {
                botsCanWin: false,
                exemptPermissions: ["MANAGE_MESSAGES", "ADMINISTRATOR"],
                embedColor: "#FF0000",
                reaction: "🎉"
            }
        });
    }

    setupMessageListeners() {
        const greetings = {
            'bonjour': 'Bonjour !',
            'bonsoir': 'Soir Bon !',
            'salut': 'Salutation !',
            'comment ca va ?': 'Bien et vous ?',
            'comment ca va': 'Bien et vous ?',
            'bien': 'ok'
        };

        const insults = ['tg', 'fdp', 'ftg'];

        this.client.on('message', message => {
            if (!message.guild || message.author.bot) return;

            const content = message.content.toLowerCase();

            if (greetings[content]) {
                message.channel.send(greetings[content]);
            } else if (insults.includes(content)) {
                message.reply('Ow les insultes !');
            }
        });
    }

    login() {
        this.client.login(config.token);
    }
}

const bot = new DiscordBot();
bot.login();
