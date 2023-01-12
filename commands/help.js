const { listCommands, commands } = require('@libs/constants/command')
const { timeFormat } = require('@libs/utils')
const moment = require('moment-timezone')
const config = require('@config')
const i18n = require('i18n')

/**
 * @type { import('@libs/builders/command').ICommand }
 */
module.exports = {
    aliases: ['menu'],
    callback: async ({ msg, client, args, prefix }) => {
        if (args.length > 0) {
            if (args[0] === 'listmenu') {
                var sections = []
                for (var title in listCommands) {
                    sections.push({
                        title: title.toUpperCase(),
                        rows: listCommands[title].map((v) => ({
                            title: v,
                            rowId: `${prefix}help ${v}`,
                            description: commands.get(v).description,
                        })),
                    })
                }

                return client.sendMessage(msg.from, {
                    title: `${config.botName} Menu`,
                    text: `Para ver cómo funciona el tipo de comando usa:\n ${prefix}help <comando>`,
                    footer: `© ${config.botName} Bot`,
                    buttonText: 'Menu',
                    sections,
                    viewOnce: true,
                })
            }

            /**
             * @type { import('@libs/builders/command').ICommand }
             */
            let command = commands.get(args[0]) || commands.find((v) => v?.aliases?.includes(args[0]))
            if (command) {
                let text = `*➪ Comando :* ${args[0]}\n`
                text += `*➪ Alias :* ${command?.aliases?.join(', ') || '-'}\n`
                text += `*➪ Categoría :* ${command.category}\n`
                if (command?.groupOnly) {
                    text += `*➪ Solo Grupo :* Yes\n`
                }
                if (command?.adminOnly) {
                    text += `*➪ Solo Admin :* Yes\n`
                }
                if (command?.privateOnly) {
                    text += `*➪ Solo Pv :* Yes\n`
                }
                if (command?.premiumOnly) {
                    text += `*➪ Solo Premium :* Yes\n`
                }
                if (command?.ownerOnly) {
                    text += `*➪ Solo Dueño :* Yes\n`
                }
                text += `*➪ Descripción :* ${command.description}\n`
                text += `*➪ Ejemplo :* ${command?.example?.format({ prefix, command: args[0] }) || `${prefix}${args[0]}`}`
                return client.sendMessage(msg.from, {
                    text: text.trim(),
                    templateButtons: [
                        {
                            urlButton: {
                                displayText: 'Copiar comando',
                                url: `https://www.whatsapp.com/otp/copy/${prefix}${args[0]}`,
                            },
                        },
                    ],
                    viewOnce: true,
                })
            } else {
                return msg.reply(i18n.__('command.not_found', { command: args[0] }))
            }
        }

        var text =
            `Hola ${msg.pushName || `@${msg.senderNumber}`}, Como puedo ayudarte?\n\n` +
            `―――――――――――――――\n` +
            `🕰️ *Hora del servicio:* ${moment().locale('es').tz(config.timezone).format('dddd, DD MMMM YYYY HH:mm:ss')}\n` +
            `🗒️ *Comandos:* ${commands.size}\n` +
            `🚀 *Uptime:* ${timeFormat(process.uptime())}\n` +
            `❕ *Prefijo:* Multi Prefijo\n` +
            `―――――――――――――――\n\n`

        return client.sendMessage(msg.from, {
            text,
            footer: `© ${config.botName} Bot`,
            title: `${config.botName} Menu`,
            templateButtons: [
                { index: 1, quickReplyButton: { displayText: 'Propietario', id: prefix + 'owner' } },
                { index: 2, quickReplyButton: { displayText: 'Menu Completo', id: prefix + 'help listmenu' } },
            ],
            viewOnce: true,
            mentions: [msg.sender],
        })
    },
}
