const ms = require("ms");
const Discord = require("discord.js");
const num = require("num-parse");

exports.run = async (client, message, args) => {
  if (!message.member.hasPermission("MANAGE_GUILD"))
    return message.channel.send(
      "❌ | Sen çekiliş yapamazsın. `Sunucuyu Yönet` yetkisine sahip değilsin!"
    );
  let id = args[0];
  if (!id) return message.channel.send("❌ | Geçerli bir mesaj ID'si belirtmelisiniz!");
  let hasGiveaway = client.giveawaysManager.giveaways.find(g => g.prize === args.join(" ")) ||
    client.giveawaysManager.giveaways.find(g => g.messageID === args[0]);
  if (!hasGiveaway) {
    return message.channel("`" + id + "` ID'ye sahip aktif bir çekiliş yok.");
  }
  client.giveawaysManager.delete(hasGiveaway.messageID)
    .then(() => {
      if (message.deletable) message.delete();
      return;
    })
    .catch(e => {
      message.channel.send("`" + id + "` ID'ye sahip çekiliş bulunamadı!");
    });
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};
exports.help = {
  name: "sil"
};
