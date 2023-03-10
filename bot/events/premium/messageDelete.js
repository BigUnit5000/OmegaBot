const { EmbedBuilder } = require('discord.js');
const AuditLogSchema = require('../../../database/bot/audit-log');

module.exports = {
    name: 'messageDelete',
    async execute(message) {

        if(message.guild === null) return;

        AuditLogSchema.findOne({ Guild : message.guild.id }, async (err, data) => {

            if (!data) return;
            if(message.author.bot) return;
            if(!message.guild.channels.cache.has(data.Channel)) return;

            const channel = message.guild.channels.cache.get(data.Channel);

            const embed = new EmbedBuilder()
            .setColor("#2f3136")
            .setTitle("Message Deleted")
            .setDescription(`A message sent by ${message.author} was deleted in ${message.channel}.`)
            .addFields(
                {name: "Message Content", value: `${message.content ? message.content : `${message.attachments.map(a => a.url)}`}`}
            )

            if(message.attachments.size >= 1){
                embed.setImage(`${message.attachments.map(a => a.url)}`)
            };

            await channel.send({embeds: [embed]}).catch(() => {return});
            

        });

    }
}