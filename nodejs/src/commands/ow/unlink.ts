import { Message, ReplyMessageOptions } from 'discord.js'
import fs from 'fs'
import ow from 'overwatch-stats-api'


export default {
    callback: async (ctx: Message, ...args: string[]) => {
        var UserLinked = false

        var UserData = require('./../../resources/data/users');

        for(var i in UserData)
        {
            if(i == ctx.author.id)
            {
                UserLinked = true
                break
            }
        }

        if(UserLinked)
        {
            console.log(UserData)

            delete UserData[ctx.author.id]

            fs.writeFile("resources/data/users.json", JSON.stringify(UserData), function(err) {
                if (err) {
                    console.log(err);
                }
            });

            ctx.reply({
                content: 'Profile unlinked',
                allowedMentions:{
                    repliedUser: false
                }
            } as ReplyMessageOptions);
        }
        else
        {
            ctx.reply({
                content: 'You are not linked with a battletag',
                allowedMentions:{
                    repliedUser: false
                }
            } as ReplyMessageOptions);
        }
    },
}