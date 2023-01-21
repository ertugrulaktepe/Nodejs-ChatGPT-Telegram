const { OpenAIApi, Configuration } = require('openai');
const TelegramBot = require('node-telegram-bot-api');
const axios = require('axios');
const token = '5686805754:AAH7UyFNFzAoDYyHRereHrIrSy8zmgJlfC4';

const secretKey = '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';
const configuration = new Configuration({
  organization: 'org-X6KwKwCFEgsWpmkyF8SanYpG',
  apiKey: secretKey,
});

const openai = new OpenAIApi(configuration);
const bot = new TelegramBot(token, { polling: true });
bot.on('message', async (msg) => {
  const chatId = msg.chat.id;
  chatGpt(msg.text)
    .then((response) => {
      bot.sendMessage(chatId, response);
    })
    .catch((err) => {
      console.log(err);
      bot.sendMessage('Bir hata oluştu tekrar deneyiniz.');
    });
});
const chatGpt = async (msg) => {
  const response = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: msg,
    max_tokens: 100,
    top_p: 1,
    temperature: 0,
  });
  return response.data.choices[0].text;
};
