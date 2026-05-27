require('dotenv').config();

const {
  Client,
  GatewayIntentBits,
  REST,
  Routes,
  SlashCommandBuilder,
  EmbedBuilder,
  ButtonBuilder,
  ActionRowBuilder,
  ButtonStyle
} = require('discord.js');

const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});

// =========================
// SLASH COMMANDS
// =========================
const commands = [

  // /ad
  new SlashCommandBuilder()
    .setName('ad')
    .setDescription('Posts the server advertisement'),

  // /partnership-requirements
  new SlashCommandBuilder()
    .setName('partnership-requirements')
    .setDescription('Shows partnership requirements')

].map(command => command.toJSON());

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

// =========================
// REGISTER COMMANDS
// =========================
async function registerCommands() {
  try {
    console.log('Registering slash commands...');

    // GLOBAL COMMANDS (USER INSTALL)
    await rest.put(
      Routes.applicationCommands(process.env.CLIENT_ID),
      { body: commands }
    );

    console.log('Slash commands registered successfully!');
  } catch (error) {
    console.error(error);
  }
}

// =========================
// BOT READY
// =========================
client.once('ready', async () => {
  console.log(`${client.user.tag} is online!`);

  await registerCommands();
});

// =========================
// COMMAND HANDLER
// =========================
client.on('interactionCreate', async interaction => {
  if (!interaction.isChatInputCommand()) return;

  // =========================
  // /ad
  // =========================
  if (interaction.commandName === 'ad') {

    const embed = new EmbedBuilder()
      .setTitle('🚔 Georgia State Roleplay')
      .setDescription(`
🔥 **Hello! Welcome to Georgia State Roleplay!**
We are a realistic ER:LC roleplay community!

━━━━━━━━━━━━━━━━━━

## ✅ What We Offer
🚓 Active Staff  
📅 Daily Roleplays  
💻 Custom Uniforms/Liverys  
👮 Departments  
🌎 Professional Community  
🎉 Friendly Members  

━━━━━━━━━━━━━━━━━━

🎮 Join today and start roleplaying!
`)
      .setColor('Blue')
      .setThumbnail(
        interaction.guild
          ? interaction.guild.iconURL()
          : client.user.displayAvatarURL()
      )
      .setFooter({
        text: 'Georgia State Roleplay'
      })
      .setTimestamp();

    const button = new ButtonBuilder()
      .setLabel('Join Server')
      .setStyle(ButtonStyle.Link)
      .setURL('https://discord.gg/38CUPBaW');

    const row = new ActionRowBuilder().addComponents(button);

    await interaction.reply({
      embeds: [embed],
      components: [row]
    });
  }

  // =========================
  // /partnership-requirements
  // =========================
  if (interaction.commandName === 'partnership-requirements') {

    const embed = new EmbedBuilder()
      .setTitle('🤝 Partnership Requirements')
      .setDescription(`
━━━━━━━━━━━━━━━━━━

## ✅ Requirements
👥 Minimum member count  
💬 Active community  
🚫 No toxic staff  
📢 Must advertise our server  
🔒 Safe & professional environment  

━━━━━━━━━━━━━━━━━━

## 📌 Partnership Rules
• No NSFW servers  
• No scam communities  
• Must remain active  
• Respect all members  

━━━━━━━━━━━━━━━━━━

📨 Open a ticket to request a partnership.
`)
      .setColor('Purple')
      .setTimestamp();

    await interaction.reply({
      embeds: [embed]
    });
  }
});

// =========================
// LOGIN
// =========================
client.login(process.env.TOKEN);
