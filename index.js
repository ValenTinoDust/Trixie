const Discord = require('discord.js')
const axios = require('axios')
const client = new Discord.Client({ intents: [Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_MEMBERS, Discord.Intents.FLAGS.GUILD_BANS, Discord.Intents.FLAGS.GUILD_MESSAGES, Discord.Intents.FLAGS.DIRECT_MESSAGES, Discord.Intents.FLAGS.GUILD_MESSAGE_REACTIONS] })
var fs = require('fs')
const {displayChar: char} = require("./cmds/char.js")
const {displaySong: song} = require("./cmds/song.js")
const {displayImg: img} = require("./cmds/image.js")

fs.readFile('/home/runner/Trixie/Data.json', 'utf8', function (err, _data) {
  if (err) throw err
  data = JSON.parse(_data)
  prefix = data.prefix
})

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}`)
})

client.on("messageCreate", msg => {
  if (msg.author.bot) return
  if (msg.channel.type == 'dm') return
  args = msg.content.toLowerCase()
  if (args.length <= prefix.length) return //prevent empty cmds from entering switch case
  if (!args.startsWith(prefix)) return //if prefix is met allow into switch case
  args = args.substr(prefix.length)
  args = args.split(" ")
  switch (args[0]) {
    case "ping":
      return msg.channel.send("pong")
    case "character":
    case "char":
      char(msg, args, "name")
      break
    case "characterbykind":
    case "characterkind":
    case "charbykind":
    case "charkind":
      char(msg, args, "kind")
      break
    case "characterbyoccupation":
    case "characterbyocc":
    case "characteroccupation":
    case "charoccupation":
    case "charbyoccupation":
    case "charbyocc":
    case "charocc":
      char(msg, args, "occupation")
      break
    case "characterbyresidence":
    case "characterbyres":
    case "characterresidence":
    case "charresidence":
    case "charbyresidence":
    case "charbyres":
    case "charres":
      char(msg, args, "residence")
      break
    case "song":
      song(msg, args, "name")
      break
    case "songbyepisode":
    case "songepisode":
    case "songep":
    case "songbyep":
      song(msg, args, "episode")
      break
    case "songbyauthor":
    case "songbyauth":
    case "songauthor":
    case "songauth":
      song(msg, args, "author")
      break
    case "image":
    case "img":
      img(msg, args, "name")
      break
    case "imagebycharacter":
    case "imagebychar":
    case "imagecharacter":
    case "imgbycharacter":
    case "imagechar":
    case "imgchar":
    case "imgbychar":
      img(msg, args, "character")
      break
  }
})
client.on('error', e => console.log(e))
const mySecret = process.env['TrixieToken']
client.login(mySecret)