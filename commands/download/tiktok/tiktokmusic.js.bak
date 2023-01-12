const api = require('@libs/utils/api')

/**
 * @type { import('@libs/builders/command').ICommand }
 */
module.exports = {
    aliases: ['tta', 'ttaudio', 'ttmp3', 'ttmusic'],
    category: 'tiktok',
    description: 'Tiktok Music Downloader',
    waitMessage: true,
    minArgs: 1,
    expectedArgs: '<link>',
    example: '{prefix}{command} https://vt.tiktok.com/ZSwWCk5o/',
    callback: async ({ msg, args }) => {
        return api('lolhuman')
            .get('/api/tiktok2', {
                params: {
                    url: args[0],
                },
                responseType: 'arraybuffer',
            })
            .then(({ data }) => {
                return msg.replyAudio(data)
            })
    },
}
