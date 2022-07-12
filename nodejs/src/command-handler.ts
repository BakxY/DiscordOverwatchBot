import { Client } from 'discord.js'

// import getFiles
import getFiles from './get-files'

// export the default function
export default (client: Client) => {
    // define an array for all commands
    const commands = {} as {
        [key: string]: any
    }

    // define the suffix of your commands files
    const suffix = '.ts'

    // read all command files
    const commandFiles = getFiles('./commands', suffix)

    // loop through all the found commands
    for(const command of commandFiles)
    {
        // print command and path to cli
        console.info('[INFO] Loaded command from ' + command.replace('./', ''))

        // get one command at the time
        let commandFile = require(command)

        // check if the commandFile has a default function
        if(commandFile.default)
        {
            // set commandFile to the default export
            commandFile = commandFile.default
        }

        // convert the path
        const split = command.replace(/\\/g, '/').split('/')

        // get the command name
        const commandName = split[split.length - 1].replace(suffix, '')

        // convert the command to lower case
        commands[commandName.toLowerCase()] = commandFile
    }

    // event triggered on new message
    client.on('messageCreate', (message) => {
        // check if the message is from the bot
        if(message.author.bot || !message.content.startsWith('?'))
        {
            return
        }

        // convert the sent message to a command
        const args = message.content.slice(1).split(/ +/)
        const commandName = args.shift()!.toLowerCase()

        // check if the command exists
        if(!commands[commandName])
        {
            return
        }

        try
        {
            // try and call the function for the command
            commands[commandName].callback(message, ...args)
        }
        catch(error)
        {
            console.error('[ERROR]' + error)
        }
    })
}
