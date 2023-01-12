const users = require('@database/services/users')

/**
 * @type { import('@libs/builders/command').ICommand }
 */
module.exports = {
    category: 'info',
    description: 'Mustra tu estado.',
    callback: async ({ msg }) => {
        const user = await users.findOne(msg.senderNumber)
        return msg.reply(`
Numero de usuario : ${user.user_jid}
Limites del usuario : ${user.user_limit}
Nivel del usuario : Lv. ${user.user_level}
Exp del usuario : ${user.user_exp} XP
Usuario Premium : ${user.user_premium ? 'Si' : 'No'}
Registrado hace : ${user.user_create_at}
`)
    },
}
