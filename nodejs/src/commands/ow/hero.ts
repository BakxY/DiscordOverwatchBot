import { Message, ReplyMessageOptions, MessageEmbed } from 'discord.js'

const tanks = ['D.Va', 'Orisa', 'Reinhardt', 'Roadhog', 'Sigma', 'Winston', 'Wrecking Ball', 'Zarya']
const dps = ['Ashe', 'Bastion', 'Doomfist', 'Echo', 'Genji', 'Hanzo', 'Junkrat', 'McCree', 'Mei', 'Pharah', 'Reaper', 'Soldier-76', 'Sombra', 'Symmetra', 'Torbjörn', 'Tracer', 'Widowmaker']
const support = ['Ana', 'Baptiste', 'Brigitte', 'Lucio', 'Mercy', 'Moira', 'Zenyatta']

export default {
    callback: async (ctx: Message, ...args: string[]) => {
        // get message content
        var ctxMessage = ctx.content

        var UserLinked = false

        // check if argument was given
        if(ctxMessage != '?hero')
        {
            const role = ctxMessage.replace('?hero ', '')

            var HeroList

            if(role == 'tank')
            {
                HeroList = tanks
            }
            else if(role == 'dps')
            {
                HeroList = dps
            }
            else if(role == 'heal' || role == 'support')
            {
                HeroList = support
            }
            else
            {
                HeroList = undefined
            }

            if(HeroList != undefined)
            {
                var HeroToPlay = HeroList[Math.floor(Math.random() * HeroList.length)]

                // Declare a new embed
                var embedVar = new MessageEmbed()
                .setColor(0xF99E1A)
                .setTitle('Random hero for ' + ctx.author.username )
                .setDescription('**You will have to play `' + HeroToPlay + '`.**')
                .setTimestamp()

                ctx.reply({
                    embeds: [embedVar],
                    allowedMentions:{
                        repliedUser: false
                    }
                } as ReplyMessageOptions);
            }
            else
            {
                // no correct role was given
                ctx.reply({
                    content: 'Role not found, use the following roles: `tank`, `dps`, `heal`',
                    allowedMentions:{
                        repliedUser: false
                    }
                } as ReplyMessageOptions);
            }
        }
        else
        {
            // no argument was provided
            ctx.reply({
                content: 'No role was provided.',
                allowedMentions:{
                    repliedUser: false
                }
            } as ReplyMessageOptions);
        }     
    },
}