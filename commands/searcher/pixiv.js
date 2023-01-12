const api = require('@libs/utils/api')

/**
 * @type { import('@libs/builders/command').ICommand }
 */
module.exports = {
    category: 'pixiv',
    description: 'Buscador Pixiv',
    waitMessage: true,
    minArgs: 1,
    expectedArgs: '<consulta>',
    example: '{prefix}{command} loli art',
    callback: async ({ msg, args, fullArgs }) => {
        return api('lolhuman')
            .get('/api/pixiv', {
                params: {
                    query: fullArgs,
                },
            })
            .then(({ data }) => {
                return msg.replyImage({ url: data.result.random().image })
            })
    },
}
