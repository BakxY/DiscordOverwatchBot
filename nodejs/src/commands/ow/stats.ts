import { Message, ReplyMessageOptions, MessageEmbed } from 'discord.js'
import { reverse } from 'dns'
import Jimp from 'jimp'
import ow from 'overwatch-stats-api'
import { hero } from 'overwatch-stats-api/typings/autogen'


export default {
    callback: async (ctx: Message, ...args: string[]) => {
        var UserLinked = false

        var UserData = require('./../../resources/data/users');

        for(var i in UserData)
        {
            if(i == ctx.author.id)
            {
                UserLinked = true
                //break
            }
        }

        // check if argument was given
        if(UserLinked)
        {
            const stats = await ow.getAllStats(UserData[ctx.author.id], 'pc')

            var Thumbnail = await Jimp.read('resources/images/blank.png')
            var mask = await Jimp.read('resources/images/mask.png')
        
            var icon = await Jimp.read(stats['iconURL'])
            var border = await Jimp.read(stats['borderURL'])

            var stars

            if(stats['starsURL'] != undefined)
            {
                stars = await Jimp.read(stats['starsURL'])
            }
            else
            {
                stars = await Jimp.read('resources/images/blank.png')
            }
            

            Thumbnail.composite(icon, 64, 64)
                     .mask(mask, 0, 0)
                     .composite(border, 0, 0)
                     .composite(stars, 0, 120)
                     .write('resources/images/output.png')

            // Declare a new embed
            var embedVar = new MessageEmbed()
            .setColor(0xEF2AEF)
            .setTitle(stats['battletag'] + '\'s stats')
            .setThumbnail('attachment://icon.png')
            .setTimestamp()

            embedVar.addField('Level', (Number.parseInt(stats['level']) + stats['prestige'] * 100).toString(), true)
            embedVar.addField('Endorsement level', stats['endorsementLevel'], true)
            
            var mostPlayedHero:hero = 'mercy'

            for(var name in stats['mostPlayed']['quickplay'])
            {
                mostPlayedHero = name as hero
                break
            }

            var PlayTimeArray = stats['mostPlayed']['quickplay'][mostPlayedHero]['time'].split(':')

            PlayTimeArray.reverse()

            if(PlayTimeArray[0] != '00' && PlayTimeArray[0] != undefined)
            {
                PlayTimeArray[0] += 'sec'
            }
            else
            {
                delete PlayTimeArray[0]
            }

            if(PlayTimeArray[1] != '00' && PlayTimeArray[1] != undefined)
            {
                PlayTimeArray[1] += 'min'
            }
            else
            {
                delete PlayTimeArray[1]
            }

            if(PlayTimeArray[2] != '00' && PlayTimeArray[2] != undefined)
            {
                PlayTimeArray[2] += 'hrs'
            }
            else
            {
                delete PlayTimeArray[2]
            }

            PlayTimeArray.reverse()

            embedVar.addField('Most played in QP', mostPlayedHero.charAt(0).toUpperCase() + mostPlayedHero.slice(1) + ' with ' + PlayTimeArray.join(' '), false)

             ctx.reply({
                embeds: [embedVar],
                files: [{
                    attachment:'resources/images/output.png',
                    name:'icon.png'
                }],
                allowedMentions:{
                    repliedUser: false
                }
            } as ReplyMessageOptions);
        }
        else
        {
            // no argument was provided
            ctx.reply({
                content: 'You are not linked with a battletag',
                allowedMentions:{
                    repliedUser: false
                }
            } as ReplyMessageOptions);
        }     
    },
}