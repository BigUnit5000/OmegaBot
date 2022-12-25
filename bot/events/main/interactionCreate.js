const { EmbedBuilder, ButtonBuilder, ActionRowBuilder, ChannelType, InteractionType } = require('discord.js');

module.exports = {
    name: "interactionCreate",
    async execute(interaction, client) {

        if (interaction.type === InteractionType.ApplicationCommand) {
            const command = client.commands.get(interaction.commandName);
        
            await command.execute(interaction, client).catch((err) => {

                return console.log(err),
                interaction.reply({content: "<a:obcross:1018078642607239218> An error occured, please try again later...", ephemeral: true});

            });
            
        }

        if (interaction.isButton()) {

            if (interaction.customId === "ticketCreate") {

                const Schema = require('../../../database/bot/tickets');
    
                Schema.findOne({ Guild : interaction.guild.id, PanelChannel : interaction.channel.id }, async (err, data) => {
                    
                if(!data) return;
    
                const category = interaction.member.guild.channels.cache.get(data.TicketCategory);
                const role = interaction.member.guild.roles.cache.get(data.TicketRole);
    
                const ticketEmbed = new EmbedBuilder()
                .setDescription(data.TicketMessage)
                .setColor("#2f3136");

                const row = new ActionRowBuilder()
                .addComponents(
                new ButtonBuilder()
                .setCustomId('ticketClose')
                .setLabel('Close Ticket')
                .setStyle('Danger')
                .setEmoji('🗑️'),
                );
    
                interaction.guild.channels.create({
                    name: interaction.user.username,
                    channelTypes: [ChannelType.GuildText],
                    parent: category,
                    permissionOverwrites: [

                    {
                        id: interaction.guild.id,
                        deny: ['ViewChannel'],
                    },
                    {
                        id: interaction.user.id,
                        allow: ['SendMessages', 'ViewChannel', 'ReadMessageHistory'],
                    },
                    {
                        id: role,
                        allow: ['SendMessages', 'ViewChannel', 'ReadMessageHistory'],
                    },
                ]
                }).then((channelMessage) => {

                    channelMessage.send({ content: `${role}`, embeds: [ticketEmbed], components: [row] }).catch((err) => {return console.log(err)});
                    interaction.reply({ content: `${channelMessage}`, ephemeral: true }).catch((err) => {return console.log(err)});

                });

                });

            }

            if(interaction.customId === "ticketClose") {
                    
                const embed = new EmbedBuilder()
                .setTitle("Ticket Closed 🔒")
                .setDescription(`Ticket was closed by ${interaction.member}\nThis channel will be deleted in 1 minute.`)
                .setColor("#2f3136");

                interaction.reply({ embeds: [embed]} ).then(() => {
                    setTimeout(() => interaction.channel.delete(), 60 * 1000);
                }).catch((err) => {return console.log(err)})

            }

            if(interaction.customId === "rock") {

                const think = Math.floor(Math.random() * 3);

                const rockEmbed = new EmbedBuilder()
                .setTitle("Rock Paper Scissors")
                .setDescription("I chose rock too. It's a tie! 🪢")
                .setColor("#2f3136")

                const scissorsEmbed = new EmbedBuilder()
                .setTitle("Rock Paper Scissors")
                .setDescription("I chose scissors. You win! 👑")
                .setColor("#2f3136")

                const paperEmbed = new EmbedBuilder()
                .setTitle("Rock Paper Scissors")
                .setDescription("I chose paper. Better luck next time... 😔")
                .setColor("#2f3136")

                const buttons = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                    .setCustomId('rock')
                    .setLabel('Rock')
                    .setDisabled(true)
                    .setStyle('Danger')
                    .setEmoji('✊'),
                    new ButtonBuilder()
                    .setCustomId('scissors')
                    .setLabel('Scissors')
                    .setDisabled(true)
                    .setStyle('Danger')
                    .setEmoji('✌️'),
                    new ButtonBuilder()
                    .setCustomId('paper')
                    .setLabel('Paper')
                    .setDisabled(true)
                    .setStyle('Danger')
                    .setEmoji('🤚'),
                );

                await interaction.reply(".");
                await interaction.deleteReply().catch(() => {return});

                if(think === 0) interaction.message.edit({embeds: [rockEmbed], components: [buttons]});
                if(think === 1) interaction.message.edit({embeds: [scissorsEmbed], components: [buttons]});
                if(think === 2) interaction.message.edit({embeds: [paperEmbed], components: [buttons]});

            }

            if(interaction.customId === "scissors") {

                const think = Math.floor(Math.random() * 3);

                const rockEmbed = new EmbedBuilder()
                .setTitle("Rock Paper Scissors")
                .setDescription("I chose rock. Better luck next time... 😔")
                .setColor("#2f3136")

                const scissorsEmbed = new EmbedBuilder()
                .setTitle("Rock Paper Scissors")
                .setDescription("I chose scissors. It's a tie! 🪢")
                .setColor("#2f3136")

                const paperEmbed = new EmbedBuilder()
                .setTitle("Rock Paper Scissors")
                .setDescription("I chose paper. You win! 👑")
                .setColor("#2f3136")

                const buttons = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                    .setCustomId('rock')
                    .setLabel('Rock')
                    .setDisabled(true)
                    .setStyle('Danger')
                    .setEmoji('✊'),
                    new ButtonBuilder()
                    .setCustomId('scissors')
                    .setLabel('Scissors')
                    .setDisabled(true)
                    .setStyle('Danger')
                    .setEmoji('✌️'),
                    new ButtonBuilder()
                    .setCustomId('paper')
                    .setLabel('Paper')
                    .setDisabled(true)
                    .setStyle('Danger')
                    .setEmoji('🤚'),
                );

                await interaction.reply(".");
                await interaction.deleteReply().catch(() => {return});

                if(think === 0) interaction.message.edit({embeds: [rockEmbed], components: [buttons]});
                if(think === 1) interaction.message.edit({embeds: [scissorsEmbed], components: [buttons]});
                if(think === 2) interaction.message.edit({embeds: [paperEmbed], components: [buttons]});

            }

            if(interaction.customId === "paper") {

                const think = Math.floor(Math.random() * 3);

                const rockEmbed = new EmbedBuilder()
                .setTitle("Rock Paper Scissors")
                .setDescription("I chose rock. You win! 👑")
                .setColor("#2f3136")

                const scissorsEmbed = new EmbedBuilder()
                .setTitle("Rock Paper Scissors")
                .setDescription("I chose scissors. Better luck next time... 😔")
                .setColor("#2f3136")

                const paperEmbed = new EmbedBuilder()
                .setTitle("Rock Paper Scissors")
                .setDescription("I chose paper. It's a tie! 🪢")
                .setColor("#2f3136")

                const buttons = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                    .setCustomId('rock')
                    .setLabel('Rock')
                    .setDisabled(true)
                    .setStyle('Danger')
                    .setEmoji('✊'),
                    new ButtonBuilder()
                    .setCustomId('scissors')
                    .setLabel('Scissors')
                    .setDisabled(true)
                    .setStyle('Danger')
                    .setEmoji('✌️'),
                    new ButtonBuilder()
                    .setCustomId('paper')
                    .setLabel('Paper')
                    .setDisabled(true)
                    .setStyle('Danger')
                    .setEmoji('🤚'),
                );

                await interaction.reply(".");
                await interaction.deleteReply().catch(() => {return});

                if(think === 0) interaction.message.edit({embeds: [rockEmbed], components: [buttons]});
                if(think === 1) interaction.message.edit({embeds: [scissorsEmbed], components: [buttons]});
                if(think === 2) interaction.message.edit({embeds: [paperEmbed], components: [buttons]});

            }

            if(interaction.customId === "coinFlip") {

                const think = Math.floor(Math.random() * 2);

                const heads = new EmbedBuilder()
                .setTitle("Flip a Coin!")
                .setDescription("It's heads! 🪙")
                .setColor("#2f3136")

                const tails = new EmbedBuilder()
                .setTitle("Flip a Coin!")
                .setDescription("It's tails! 🪙")
                .setColor("#2f3136")
    
                const flip = new ActionRowBuilder()
                .addComponents(
                new ButtonBuilder()
                .setCustomId('coinFlip')
                .setLabel('Flip!')
                .setStyle('Danger')
                .setDisabled(true)
                .setEmoji('🪙'),
                );

                await interaction.reply(".");
                await interaction.deleteReply().catch(() => {return});

                if(think === 0) interaction.message.edit({embeds: [heads], components: [flip]});
                if(think === 1) interaction.message.edit({embeds: [tails], components: [flip]});

            }
            if (interaction.customID === "guideFeatures")  {
                
                const embed = new EmbedBuilder()
                .setTitle("__How To Set Omega Bot Up For Your Server__")
                .setColor("#2f3136")
                .setThumbnail("https://cdn.discordapp.com/avatars/988620875622391839/b6c0770832a33d5899119459a87617a6.webp")
                .setDescription("**1. Getting the bot in your server**
                    You can either use this link https://omegabot.xyz/invite or go to the @Omega Bot#3110 profile and click “Add to Server”

                    **2. Role Hierarchy**
                     In order for the bot to function it’s recommended you have a bot role (or the Omega Bot role) above all roles. Here’s a video explaining what role hierarchy is. https://youtu.be/DL__fIfR5zU

                    __Note__
                    The following setup procedures aren’t necessary.

                    **3. Set Up Commands**
                    Check out features for info on all of these commands.
                    __Tickets :__ */setup ticket | panel-message: (What you want the panel to create the ticket to be) | ticket-category: (What category you want tickets to go to )| ticket-message: (What you want the bot to say to the member in the ticket after creation) | ticket-role: (What role gets pinged) |*
                    __Link Detector :__  */setup Link-Detector | Status : (Chooses if you want it on or off) | Excluded Role : Role that doesn’t get affected by the Detector |* 
                    __Boost Tracker :__  */setup boost-tracker | Channel : You want the boost tracker to be in |*
                    __Levels :__ */setup Levels | Channel |*
                    __Suggestion Channel :__ */setup Suggestions | Channel |*
                    __Role, Member, Bot, Online Counter :__ */setup (Which ever counter you want to setup) : | Channel |*
                    __Welcomes :__ */setup welcomes : | channel |*
                    __Auto Role :__ */setup autorole : | role |*
                    __Member Log :__  */setup member log : | channel |*
                    __Audit logs :__ */setup audit (insert dedicated channel)*")

            if(interaction.customId === "guideSupportServer") {

                const embed = new EmbedBuilder()
                .setTitle("**Support Server**")
                .setColor("#2f3136")
                .setThumbnail("https://cdn.discordapp.com/avatars/988620875622391839/b6c0770832a33d5899119459a87617a6.webp")
                .setDescription(`Press the <a:obcross:1018078642607239218> button to delete this message once you are done. Click this link to join the support server:\r\rhttps://discord.gg/uwbjNB3Z2v\r\r*Sent from [this server](${interaction.message.url})*`)

                const messageDelete = new ButtonBuilder()
                .setCustomId("messageDelete")
                .setStyle("Danger")
                .setEmoji("<a:obcross:1018078642607239218>")

                const buttons = new ActionRowBuilder().setComponents(messageDelete)

                await interaction.user.send({ embeds: [embed], components: [buttons] })
                await interaction.reply({ content: '<a:obtick:1018078610130751528> Check your direct messages.', ephemeral: true })
            }

            if(interaction.customId === "guideCommands") {

                const embed = new EmbedBuilder()
                .setTitle("**Command Guide**")
                .setColor("#2f3136")
                .setThumbnail("https://cdn.discordapp.com/avatars/988620875622391839/b6c0770832a33d5899119459a87617a6.webp")
                .setDescription(`Press the <a:obcross:1018078642607239218> button to delete this message once you are done. Please pick from one of the four options below for information on Omega Bot's commands.\r\r*Sent from [this server](${interaction.message.url})*`)

                const button1 = new ButtonBuilder()
                .setCustomId("guideCommandsFun")
                .setStyle("Danger")
                .setLabel("Fun")

                const button2 = new ButtonBuilder()
                .setCustomId("guideCommandsSetup")
                .setStyle("Danger")
                .setLabel("Setup")

                const button3 = new ButtonBuilder()
                .setCustomId("guideCommandsMisc")
                .setStyle("Danger")
                .setLabel("Misc")

                const messageDelete = new ButtonBuilder()
                .setCustomId("messageDelete")
                .setStyle("Danger")
                .setEmoji("<a:obcross:1018078642607239218>")

                const buttons = new ActionRowBuilder().setComponents(button1, button2, button3, messageDelete)

                await interaction.user.send({ embeds: [embed], components: [buttons] })
                await interaction.reply({ content: '<a:obtick:1018078610130751528> Check your direct messages.', ephemeral: true })

            }

            if(interaction.customId === "messageDelete") {
                await client.channels.fetch(interaction.channelId, true);
                await interaction.message.delete();
            }

            if(interaction.customId === "guideCommandsFun") {

                const embed = new EmbedBuilder()
                .setTitle("**Fun Commands**")
                .setColor("#2f3136")
                .setDescription("Press the <a:obcross:1018078642607239218> button to delete this message once you are done.")
                .addFields(
                    {name: "**• /avatar guild :**", value: "Sends that users guild avatar."},
                    {name: "**• /avatar user :**", value: "Sends that users discord avatar."},
                    {name: "**• /cat :**", value: "Sends a random cat picture."},
                    {name: "**• /coinflip :**", value: "Flips a coin, heads or tails."},
                    {name: "**• /dadjoke :**", value: "Sends a random dad joke."},
                    {name: "**• /dog :**", value: "Sends a random picture of a dog."},
                    {name: "**• /drake :**", value: "Sends a customisable drake meme"},
                    {name: "**• /factbook :**", value: "Sends a customisable factbook meme"},
                    {name: "**• /hug :**", value: "Hugs another member (sends random hug gif too)."},
                    {name: "**• /koala :**", value: "Sends a random koala picture."},
                    {name: "**• /music play :**", value: "Plays music while in a voice channel"},
                    {name: "**• /music pause :**", value: "Pauses music while in a voice channel"},
                    {name: "**• /music stop :**", value: "Stops music while in a voice channel"},
                    {name: "**• /music resume :**", value: "Resumes paused music while in a voice channel"},
                    {name: "**• /music leave :**", value: "Makes the bot leave the voice channel"},
                    {name: "**• /panda :**", value: "Sends a random picture of a panda."},
                    {name: "**• /rock-paper-scissors :**", value: "Lets you play rps against the bot."},
                )

                const messageDelete = new ButtonBuilder()
                .setCustomId("messageDelete")
                .setStyle("Danger")
                .setEmoji("<a:obcross:1018078642607239218>")

                const buttons = new ActionRowBuilder().setComponents(messageDelete)

                await interaction.reply({ embeds: [embed], components: [buttons] })

            }

            if(interaction.customId === "guideCommandsSetup") {

                const embed = new EmbedBuilder()
                .setTitle("**Setup Commands**")
                .setColor("#2f3136")
                .setDescription("Press the <a:obcross:1018078642607239218> button to delete this message once you are done.")
                .addFields(
                    {name: "**• /setup tickets :**", value: "Pick what category the ticket gets sent to, choose what message you want to send in the panel, what category the tickets go to, what message the bot sends at the start of the ticket, and what role gets pinged."},
                    {name: "**• /setup audit-log :**", value: "Choose what channel the bot will send audit log messages to."},
                    {name: "**• /setup levels :**", value: "Choose what channel level up messages get sent to and what channel you do not want members to get xp from."},
                    {name: "**• /setup suggestions :**", value: "Lets you choose what channel you want suggestions to be sent to. (Goes hand in hand with /suggest)"},
                    {name: "**• /setup role counter :**", value: "Shows how many members with a chosen role you have in your server with a channel counter."},
                    {name: "**• /setup member counter :**", value: "Shows how many members you have in your server with a channel counter."},
                    {name: "**• /setup bot counter :**", value: "Shows how many bots you have in your server with a channel counter."},
                    {name: "**• /setup online counter :**", value: "Shows how many online people you have in your server with a channel counter."},
                    {name: "**• /setup welcomes :**", value: "Lets you setup a welcome channel and what message to send."},
                    {name: "**• /setup autorole :**", value: "Lets you choose what role members get after joining and if they get it after member screening."},
                    {name: "**• /setup boost-tracker :**", value: "Lets you choose if you want the bot to send a message after someone boosts."},
                    {name: "**• /setup link-detector :**", value: "Lets you choose if you want members to be able to send links. "},
                    {name: "**• /setup member-log :**", value: "Lets you choose where you want member joins and leaves to be sent to. (Note this is different that /setup welcome)"},
                    {name: "**• /setup daily-messages :**", value: "Lets you choose what time to send daily messages."},
                    {name: "**• /setup dropdown-roles :**", value: "Lets you setup a dropdown role system."}
                )

                const messageDelete = new ButtonBuilder()
                .setCustomId("messageDelete")
                .setStyle("Danger")
                .setEmoji("<a:obcross:1018078642607239218>")

                const buttons = new ActionRowBuilder().setComponents(messageDelete)

                await interaction.reply({ embeds: [embed], components: [buttons] })
                
            }

            if(interaction.customId === "guideCommandsMisc") {

                const embed = new EmbedBuilder()
                .setTitle("**Miscellaneous Commands**")
                .setColor("#2f3136")
                .setDescription("Press the <a:obcross:1018078642607239218> button to delete this message once you are done.")
                .addFields(
                    {name: "**• /echo :**", value: "Send a message as the bot."},
                    {name: "**• /embed :**", value: "Send a embed message with the bot. "},
                    {name: "**• /level :**", value: "Get your current level, current xp number, and how much more xp you need."},
                    {name: "**• /ping :**", value: "Get the bots response time."},
                    {name: "**• /poll :**", value: "Create a poll with up to 20 options."},
                    {name: "**• /suggest :**", value: "Lets you make a suggestion to the suggestion channel. (requires /setup suggestions beforehand)"},
                    {name: "**• /whois :**", value: "Gathers info on a certain user."},
                )

                const messageDelete = new ButtonBuilder()
                .setCustomId("messageDelete")
                .setStyle("Danger")
                .setEmoji("<a:obcross:1018078642607239218>")

                const buttons = new ActionRowBuilder().setComponents(messageDelete)

                await interaction.reply({ embeds: [embed], components: [buttons] })
                
            }

        }

        if (interaction.isModalSubmit()) {

            if(interaction.customId === "echo") {

                await interaction.reply({ content: 'Omega Bot has echoed your message!', ephemeral: true });
    
                const content = interaction.fields.getTextInputValue('content');
                await interaction.channel.send(content);
    
            }

            if(interaction.customId === "drake") {

                const text1 = interaction.fields.getTextInputValue('drakeText1');
                const text2 = interaction.fields.getTextInputValue('drakeText2');

                const gen = require('images-generator')
                const drakeImage = await gen.misc.drake({text1: text1, text2: text2})
        
                interaction.reply({ content: `https://${drakeImage}` });

            }

            if(interaction.customId === "factbook") {

                const fact = interaction.fields.getTextInputValue('fact');

                const gen = require('images-generator')
                const factImage = await gen.misc.facts({content: fact})
        
                interaction.reply(factImage);

            }

        }

        if(interaction.isSelectMenu()) {

            if(interaction.customId === 'dropdown-roles') {

                const Schema = require('../../../database/bot/dropdown-roles');

                Schema.findOne({ Guild : interaction.guild.id, MessageID : interaction.message.id }, async (err, data) => {

                    if(!data) return

                    const roleList = data.Roles;
                    const roleListArray = roleList.split(' ');

                    roleListArray.forEach((id) => {
                        const role = interaction.member.guild.roles.cache.get(id);
                        interaction.member.roles.remove(role).catch(() => {return});
                    });

                    interaction.values.forEach((id) => {
                        if(roleList.includes(id)) {
                            const role = interaction.member.guild.roles.cache.get(id);
                            interaction.member.roles.add(role).catch(() => {return});
                        };
                    });

                    interaction.deferUpdate();

                });
            }

        }

    }
};
