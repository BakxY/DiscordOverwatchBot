import fs from 'fs';

// set file locations
const discord_token_file = './resources/tokens/DISCORD_TOKEN.txt'

// export function import
export function getDiscordToken() 
{
    var discord_token = ''

    // read token file
    discord_token = fs.readFileSync(discord_token_file, 'utf-8')

    // check if the token files is empty
    if(discord_token != '')
    {
        // return token
        return discord_token
    }
    else
    {
        console.error('Discord token file is empty!')
        process.exit()
    }
}
