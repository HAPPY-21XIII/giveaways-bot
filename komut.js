const fs = require("fs");

module.exports = bot => {
  console.log("┌──────────────────────────────────────────────────────────────┐")
  fs.readdir("./komutlar/", (err, files) => {
    if (err) console.error(err);
    console.log(`│ ${files.length} komut yüklenecek.                                          │`);
    files.forEach(f => {
      let props = require(`./komutlar/${f}`);
      console.log(`│ Yüklenen komut: ${props.help.name}.                                     │`);
      bot.commands.set(props.help.name, props);
      props.conf.aliases.forEach(alias => {
        bot.aliases.set(alias, props.help.name);
      });
    });
  });

  const { GiveawaysManager } = require("discord-giveaways");
  bot.giveawaysManager = new GiveawaysManager(bot, {
    storage: "./giveaways.json",
    updateCountdownEvery: 5000,
    default: {
      botsCanWin: false,
      embedColor: "abcdef",
      reaction: "🎉"
    }
  });

  bot.giveawaysManager.on(
    "giveawayReactionAdded",
    (giveaway, member, reaction) => {
      console.log(
        `${member.user.tag} entered giveaway #${giveaway.messageID} (${reaction.emoji.name})`
      );
    }
  );

  bot.giveawaysManager.on(
    "giveawayReactionRemoved",
    (giveaway, member, reaction) => {
      console.log(
        `${member.user.tag} unreact to giveaway #${giveaway.messageID} (${reaction.emoji.name})`
      );
    }
  );

  bot.giveawaysManager.on("giveawayEnded", (giveaway, winners) => {
    console.log(
      `Giveaway #${giveaway.messageID} ended! Winners: ${winners
        .map(member => member.user.username)
        .join(", ")}`
    );
  });
};
