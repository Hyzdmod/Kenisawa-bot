const { Client } = require('youtubei')

const youtube = new Client()

/**
 * @type { import('@libs/builders/command').ICommand }
 */
module.exports = {
    aliases: ['play2'],
    category: 'youtube',
    description: 'Reproducir audio/video YouTube.',
    waitMessage: true,
    minArgs: 1,
    expectedArgs: '<consulta>',
    example: '{prefix}{command} opening tokio ghoul',
    callback: async ({ msg, client, fullArgs }) => {
        youtube.search(fullArgs, { type: 'video' }).then((res) => {
            const result = res.map((v) => {
                return {
                    id: v.id,
                    title: v['title'],
                    duration: v['duration'],
                    views: v['viewCount'],
                    thumbnail: v.thumbnails[0].url.split('?')[0],
                }
            })
            
            var text =
            `        *Play Youtube*   \n\n` +
            `―――――――――――――――\n` +
            `*Titulo:* ${result[0].title}\n` +
            `*Vistas:* ${result[0].views?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}\n` +
            `*Link:* https://www.youtube.com/watch?v=${result[0].id}\n` +
            `―――――――――――――――\n\n`
            
            return client.sendMessage(msg.from, {
            image: { url: result[0].thumbnail },
            caption: text,
            footer: `© ${config.botName} Bot`,
            let buttonse = [
            {buttonId: `/ytmp4 https://www.youtube.com/watch?v=${result[0].id}`, buttonText: {displayText: `Video`}, type: 1},
            {buttonId: `/ytmp3 https://www.youtube.com/watch?v=${result[0].id}`, buttonText: {displayText: `Audio`}, type: 1}
            ],
            viewOnce: true,
            mentions: [msg.sender],
        })
    },
}




