const ms = require("ms");
const Discord = require("discord.js");
const num = require("num-parse");

exports.run = async (client, message, args) => {
  message.channel.send(new Discord.MessageEmbed()
                       .setAuthor(client.user.username, client.user.avatarURL({dynamic: true}))
                       .setColor("abcdef")
                       .setFooter("SAFE KODE ️️️️❤️ HAPPY")
                       .setTitle("Yardım Menüsü")
                       .addField("Komutlar", "`!başlat`: Direk olduğunuz kanalda çekiliş başlatır.\n`!çekiliş`: Etiketlediğiniz kanalda çekiliş başlatır.\n`!yeniden`: Id'sini girdiğiniz çekiliş yeniden çekilir.\n`!ayarla`: Id'sini girdiğiniz çekilişi editlersiniz.\n`!bitir`: Id'sini girdiği çekiliş bitirilir.\n`!sil`: Id'sini girdiğiniz çekiliş silinir.")
                      )
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};
exports.help = {
  name: "yardım"
};
