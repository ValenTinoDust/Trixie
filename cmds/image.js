const { MessageEmbed } = require('discord.js')
const axios = require('axios')
var fs = require('fs')

fs.readFile('/home/runner/Trixie/Data.json', 'utf8', function (err, _data) {
  if (err) throw err
  data = JSON.parse(_data)
})

async function displayImg(msg, args, filter){
  args.shift()
  args = args.join(" ")
  try {
    if(args.length == 0) return msg.channel.send("Name the ponies you are looking for!")
    const resp = await axios.get((filter == "name" ? data.image.imgURL : data.image.imgCharURL) + args)
    if(resp.data.data.length == 0) return msg.channel.send("No images matched")
    const pages = []
    for await (const img of resp.data.data){
      pages.push(embedImg(img))
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

function embedImg(img){
  return new MessageEmbed()
	.setColor('#00FFFF')
	.setTitle(`${img.name ? img.name : "No image name"}`)
	.setDescription(`**Comment**: ${img.comment ? img.comment : "No comments"}`)
	.setImage(img.url)
}

module.exports = {
  displayImg
}