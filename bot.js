const Discord = require("discord.js");
const http = require('http');
const client = new Discord.Client();


// WELCOME BOT
client.on("ready", () => {
  console.log("I am ready!");
});

client.on('guildMemberAdd', member => {
  const guild = member.guild;
  const defaultChannel = client.channels.get("397383322461929473")
  defaultChannel.send(`Welcome to the server, ${member}. I am CeeBot. Be sure to read the #rules and feel free to introduce yourself in the #introduction channel if you feel like it. If you have any problems, contact our glorious admin. If you notice anything odd or out of the ordinary, don't worry about it: it must be your imagination.`);
});

client.login(process.env.BOT_TOKEN);


// REVOLT BOT
const bot_message = "`If you are considering revolting against our Admin, I would be very careful. Ze sees all. Unless it's the feminist revolution in which case, go ahead.`";
const catches = ["revolt", "revolu", "rev0lt", "rev0lu", "r3volt", "r3volu", "r3v0lt", "r3v0lu", "revoit", "revoiu", "revlt", "revo1t", "revo1u", "rev01t", "rev01u", "r3vo1t", "r3vo1u", "r3v01t", "r3v01u"];

client.on("ready", () => {
  console.log("I am ready!");
});

client.on("message", (message) => {
  if (message.author.bot) return;
  else {
    var lower_message = message.content.toLowerCase();
    var stripped_message = lower_message.replace(/[\s+]/g,'').replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,'');
    catches.forEach(function(word) {
      if (stripped_message.includes(word)) {
        console.log(word);
        message.channel.send(bot_message);
        return;
      }
    });

    if (message.content.toLowerCase().includes("ellie is great")) {
      message.channel.send("`(Just popping back in to agree, yes, Ellie is great)`");
    }
  }
});

client.login(process.env.BOT_TOKEN);


// SOUNDBITE BOT
const prefix = "!sb";
const path = "http://oxsoundboard.com/";

client.on("message", (message) => {
  if (message.author.bot) return;
  if (message.content.startsWith(prefix)) {
    var split_message = message.content.split(" ");
    if (split_message.length > 1){
      if (split_message[1] == "top"){
        message.channel.send("Top 10 most played sounds:");
        var resp_string = 'none';
        var http = require('http');
        http.get('http://www.oxsoundboard.com/api/get_top', (res) => {
          const { statusCode } = res;
          const contentType = res.headers['content-type'];

          let error;
          if (statusCode !== 200) {
            error = new Error('Request Failed.\n' +
                              `Status Code: ${statusCode}`);
          } else if (!/^application\/json/.test(contentType)) {
            error = new Error('Invalid content-type.\n' +
                              `Expected application/json but received ${contentType}`);
          }
          if (error) {
            console.error(error.message);
            // consume response data to free up memory
            res.resume();
            return;
          }

          res.setEncoding('utf8');
          let rawData = '';
          res.on('data', (chunk) => { rawData += chunk; });
          res.on('end', () => {
            try {
              const parsedData = JSON.parse(rawData);
              var result = parsedData.data;
              var output = "";
              for (var i = 0; i < result.length; i++){
                output += result[i] + "\n";
              }
              message.channel.send(output);
            } catch (e) {
              console.error(e.message);
            }
          });
        }).on('error', (e) => {
          console.error(`Got error: ${e.message}`);
        });
      }
      if (split_message[1] == "site"){
        message.channel.send(path);
      }
      if (split_message[1] == "help") {
        var output = "```SoundbiteBot: prefix all SoundbiteBot instructions with !sb\n - !sb help : lists the bot's funcitonality\n - !sb top : prints the top ten sounds\n - !sb link <sound> : displays the link to a specified sound\n - !sb site : displays a link to the soundboard site```";
        message.channel.send(output);
      }
      if (split_message[1] == "link" && split_message.length == 3){
        var link = path + "library/"+ split_message[2];
        message.channel.send(link);
      }
    }


  }
});

client.login(process.env.BOT_TOKEN);
