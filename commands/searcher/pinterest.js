const api = require('@libs/utils/api')

/**
 * @type { import('@libs/builders/command').ICommand }
 */
module.exports = {
    category: 'buscador',
    description: 'Buscar imagenes en Pinterest',
    waitMessage: true,
    minArgs: 1,
    expectedArgs: '<consulta>',
    example: '{prefix}{command} anime waifu',
    callback: async ({ msg, fullArgs }) => {
        return api('lolhuman')
            .get('/api/pinterest', {
                params: {
                    query: fullArgs,
                },
            })
            .then(({ data }) => {
                return msg.replyImage({ url: data.result })
            })
    },
}
