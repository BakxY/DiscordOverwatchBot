import { Message, ReplyMessageOptions, MessageEmbed } from 'discord.js'
import Jimp from 'jimp'
import ow from 'overwatch-stats-api'


export default {
    callback: async (ctx: Message, ...args: string[]) => {
        // get message content
        var ctxMessage = ctx.content

        // check if argument was given
        if(ctxMessage != '?stats')
        {
            const stats = await ow.getAllStats('BakxY-21794', 'pc');
            console.log(stats);
        
            var Thumbnail = await Jimp.read('resources/images/blank.png')
            var mask = await Jimp.read('resources/images/mask.png')
        
            var icon = await Jimp.read(stats['iconURL'])
            var border = await Jimp.read(stats['borderURL'])
            var stars = await Jimp.read(stats['starsURL'])
            
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
                content: 'No player specified',
                allowedMentions:{
                    repliedUser: false
                }
            } as ReplyMessageOptions);
        }     
    },
}