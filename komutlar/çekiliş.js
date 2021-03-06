const ms = require("ms");
const Discord = require("discord.js");
const num = require("num-parse");

exports.run = async (client, message, args) => {
  if (!message.member.hasPermission("ADMINISTRATOR"))
    return message.channel.send(
      "❌ | Sen çekiliş yapamazsın. `Administrator` yetkisine sahip değilsin!"
    );
  let giveawayChannel = message.mentions.channels.first();
  if (!giveawayChannel) {
    return message.channel.send(":x: You have to mention a valid channel!");
  }
  let time = args[1];
  if (!time)
    return message.channel.send(
      '❌ | Lütfen geçerli bir zaman girin. Örneğin: "1s", "1m", "1d" vb.'
    );
  if (ms(time) > ms("10d")) {
    return message.channel.send(
      "❌ | Hediye verme süresi 10 günden az olmalıdır."
    );
  }
  let winners = args[2];
  if (!winners)
    return message.channel.send(
      '❌ | Lütfen geçerli kazanan sayısı sağlayın. Örneğin: "1k", "2k"'
    );
  winners = num(winners, 1);
  if (winners > 15)
    return message.channel.send("❌ | Hediye kazananlar 15'ten az olmalıdır.");
  let prize = args.slice(3).join(" ");
  if (!prize)
    return message.channel.send(
      "❌ | Lütfen hediye için ödülü sağlayın. Örneğin: `!çekiliş 1d 2k Discord Nitro`."
    );

  client.giveawaysManager.start(giveawayChannel, {
    time: ms(time),
    winnerCount: winners,
    prize: prize,
    hostedBy: message.author,
    messages: {
      giveaway: "🎉 **Çekiliş** 🎉",
      giveawayEnded: "🎊 **Çekiliş Sona Erdi** 🎊",
      timeRemaining: "Kalan Süre **{duration}**!",
      inviteToParticipate: 'Çekilişe katılmak için "🎉" emojisine basınız!',
      winMessage:
        "🎊 Tebrikler, {winners} çekilişi kazandınız. İşte ödülünüz **{prize}**!",
      embedFooter: "SAFE KODE ️️️️❤️ HAPPY",
      noWinner: "Geçersiz katılımlar yüzünden kimse kazanmadı!",
      hostedBy: "Çekiliş Başlatan: {user}",
      winners: "Kazanan(lar)",
      endedAt: "Bitti",
      units: {
        seconds: "saniye",
        minutes: "dakika",
        hours: "saat",
        days: "gün"
      }
    }
  });
  if (message.deletable) message.delete();
  return;
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
  
};
exports.help = {
  name: "çekiliş"
};
