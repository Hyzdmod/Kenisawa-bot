const { Client } = require('youtubei')

const youtube = new Client()

/**
 * @type { import('@libs/builders/command').ICommand }
 */
module.exports = {
    aliases: ['yts'],
    category: 'youtube',
    description: 'Buscador de YouTube.',
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
            let text = `Busqueda de YouTube\n~> Consulta : ${fullArgs}\n\`\`\``
            text += result
                .slice(0, 5)
                .map((x) => {
                    return `\n📙 Titulo : ${x.title}\n👀 Vistas: ${x.views?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}\n📎 Link: https://www.youtube.com/watch?v=${x.id}`
                })
                .join('\n\n=====================\n')
            text += '```'
            return client.sendMessage(msg.from, { image: { url: result[0].thumbnail }, caption: text })
        })
    },
}
