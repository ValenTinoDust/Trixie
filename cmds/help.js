const { MessageEmbed } = require('discord.js')

function help(msg){
  msg.channel.send({embeds: [embedHelp()]})
}

function embedHelp(){
  return new MessageEmbed()
	.setColor('#ffc0cb')
	.setTitle(`Command list`)
	.setDescription(`**character** <character name>\n**characterbykind** <kind>\n**characterbyoccupation** <occupation>\n**characterbyresidence** <residence>\n**song** <song name>\n**songbyepisode** <episode>\n**songbyauthor** <author>\n**image** <image name>\n**imagebycharacter** <character name>\n`)
  .setThumbnail("https://i.pinimg.com/originals/68/61/d6/6861d675e154602344e62981e2845049.png")
}

module.exports = {help}