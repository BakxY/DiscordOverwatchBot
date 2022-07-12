import { Message, ReplyMessageOptions } from 'discord.js'
import fs from 'fs'
import ow from 'overwatch-stats-api'


export default {
    callback: async (ctx: Message, ...args: string[]) => {
        // get message content
        var ctxMessage = ctx.content

        var UserLinked = false

        // check if argument was given
        if(ctxMessage != '?link')
        {
            var UserData = require('./../../resources/data/users');

            for(var i in UserData)
            {
                if(i == ctx.author.id)
                {
                    UserLinked = true
                    break
                }
            }

            if(!UserLinked)
            {
                var PlayerNameOk = true

                try
                {
                    await ow.getAllStats(ctxMessage.replace('?link ', '').replace('#', '-'), 'pc');
                }
                catch (err)
                {
                    if(err == 'Error: PROFILE_NOT_FOUND')
                    {
                        PlayerNameOk = false

                        ctx.reply({
                            content: 'Profile not found',
                            allowedMentions:{
                                repliedUser: false
                            }
                        } as ReplyMessageOptions);
                    }
                }

                if(PlayerNameOk == true)
                {
                    UserData[ctx.author.id] = ctxMessage.replace('?link ', '').replace('#', '-')

                    fs.writeFile("resources/data/users.json", JSON.stringify(UserData), function(err) {
                        if (err) {
                            console.log(err);
                        }
                    });
        
                    ctx.reply({
                        content: 'Your discord account is now linked with your Battletag',
                        allowedMentions:{
                            repliedUser: false
                        }
                    } as ReplyMessageOptions);
                }
            }
            else
            {
                ctx.reply({
                    content: 'Your discord account is already linked with your Battletag',
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
                content: 'No Battletag provided',
                allowedMentions:{
                    repliedUser: false
                }
            } as ReplyMessageOptions);
        }     
    },
}