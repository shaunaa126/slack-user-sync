const { WebClient } = require('@slack/web-api');
const _ = require('lodash');

const web = new WebClient(process.env.SLACK_TOKEN);

async function syncUsers(options) {
  let members = [];

  for await (const page of web.paginate('conversations.members', { channel: options.sourceChannel })) {
    console.log('Results of conversation.members', page)
    members = page.members;
  }
  
  addUsers(options.targetChannel, members);
}

async function addUsers(channel, members) {
  let users = _.chunk(members, 1000);

  for (var i = 0; i < users.length; i++) {
    const response = await web.conversations.invite({
      channel: channel,
      users: users.join(","),
    })
    console.log('Results of conversation.invite', response);
  }
}

async function main(options) {
  let results = syncUsers(options);
  return results;
}

if (!module.main) {
  const app = require("commander");
  let options = {
    sourceChannel: '',
    targetChannel: ''
  };

  app.version("1.0.0")
    .arguments("<sourceChannel> <targetChannel>")
    .action((sourceChannel, targetChannel) => {
      if (!sourceChannel) {
        LOGGER.error("A slack source channel was not specified.");
        app.help();
        process.exit(1);
      }
      if (!targetChannel) {
        LOGGER.error("A slack target channel was not specified.");
        app.help();
        process.exit(1);
      }
      options.sourceChannel = sourceChannel;
      options.targetChannel = targetChannel;
    })
    .parse(process.argv);

  main(options)
    .then(results => console.log(results))
    .catch((error) => {
      console.log(error);
      process.exit(1);
    });
}