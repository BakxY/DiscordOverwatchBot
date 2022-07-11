import fs, { Dirent } from 'fs'

const getFiles = (dir: string, suffix: string): string[] => {
    // get all the files and folders
    const files: Dirent[] = fs.readdirSync(dir, {
        withFileTypes: true,
    })

    // declare the commandFiles variable to be a string array
    let commandFiles: string[] = []

    // loop through all the files
    for(const file of files)
    {
        // check if the files is a folder
        if(file.isDirectory())
        {
            // call the getFiles function for the folder
            commandFiles = [
                ...commandFiles,
                ...getFiles(`${dir}/${file.name}`, suffix),
            ]
        }
        else if(file.name.endsWith(suffix))
        {
            //push the name and folder to the array
            commandFiles.push(`${dir}/${file.name}`)
        }
    }

    // return the array
    return commandFiles
}

// export the getFiles function as default
export default getFiles