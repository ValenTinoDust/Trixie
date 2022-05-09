const { MessageEmbed } = require('discord.js')
const axios = require('axios')
var fs = require('fs')

fs.readFile('/home/runner/Trixie/Data.json', 'utf8', function (err, _data) {
  if (err) throw err
  data = JSON.parse(_data)
})

async function displaySong(msg, args, filter){
  args.shift()
  args = args.join(" ")
  try {
    if(args.length == 0) return msg.channel.send("Name the ponies you are looking for!")
    const resp = await axios.get((filter == "name" ? data.song.songURL : filter == "episode" ? data.song.songEpURL : data.song.songAuthURL) + args)
    if(resp.data.data.length == 0) return msg.channel.send("No songs matched")
    const pages = []
    for await (const song of resp.data.data){
      pages.push(embedSong(song))
    }
    let index = 0
    let embedMsg = await msg.channel.send({embeds: [pages[index]]})
    if(pages.length == 1) return
    embedMsg.react("◀")
    embedMsg.react("▶")
    const collectorFilter = (reaction, user) => {
      if(user.bot) return false
      return reaction.emoji.name === '◀' || reaction.emoji.name === '▶'
    }
    const collector = embedMsg.createReactionCollector( { filter: collectorFilter, time: 120000, dispose: true })
    collector.on("collect", (reaction, user) => {
      if(reaction.emoji.name === '▶'){
        embedMsg.reactions.resolve("▶").users.remove(user.id)
        if((index + 1) > (pages.length - 1)) index = 0
        else index++
        embedMsg.edit({embeds: [pages[index]]})
      } else {
        embedMsg.reactions.resolve("◀").users.remove(user.id)
        if((index - 1) < 0) index = pages.length - 1
        else index--
        embedMsg.edit({embeds: [pages[index]]})
      }
    })
  } catch (err) {
    // Handle Error Here
    console.error(err)
  }
}

function embedSong(song){
  const videoID = song.video.split("watch?v=")[1].split("&")[0]
  return new MessageEmbed()
	.setColor('#00FF00')
	.setTitle(`${song.name}`)
	.setDescription(`**Video**: ${song.video ? song.video : "No link"}\n**Length**: ${song.length ? song.length : "No video length"}\n**Episode**: ${song.episode ? song.episode : "No song episode"}\n**Music by**: ${song.musicby ? song.musicby : "No music author"}\n**Lyrics by**: ${song.lyricsby ? song.lyricsby : "No lyrics author"}`)
  .setImage(videoID ? `https://img.youtube.com/vi/${videoID}/0.jpg` : "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg?20200913095930")
}

module.exports = {
  displaySong
}