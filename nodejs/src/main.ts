import ow from 'overwatch-stats-api'
import images from 'images'
import ImageDownloader from 'image-downloader'
import sharp from 'sharp'

(async () => {
    const stats = await ow.getAllStats('BakxY-21794', 'pc');
    console.log(stats);
    await ImageDownloader.image({
        url: stats['starsURL'],
        dest: __dirname + '/stars.png',
    });
    await ImageDownloader.image({
        url: stats['borderURL'],
        dest: __dirname + '/border.png',
    });
    await ImageDownloader.image({
        url: stats['iconURL'],
        dest: __dirname + '/icon.png',
    });
    //await images(__dirname + '/Blank.png')
    //    .draw(images(__dirname + '/icon.png'), 64, 64)
    //    .save(__dirname + '/output.png');

    sharp(__dirname + '/output.png')
    .extractChannel(__dirname + '/mask.png')
    .toFile(__dirname + '/lol.png')
    
    //images(__dirname + '/Blank.png')
    //    .draw(images(__dirname + '/icon.png'), 64, 64)
    //    .draw()
    //    .save(__dirname + '/output.png');

    //.draw(images(__dirname + '/stars.png'), 0, 120)
    //.draw(images(__dirname + '/border.png'), 0, 0)
})();