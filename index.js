const RssFeedEmitter = require('rss-feed-emitter');
const axios = require('axios');
const feeder = new RssFeedEmitter();

// මෙතනට ඔයාට අවශ්‍ය News sites වල RSS links දාන්න
feeder.add({
  url: 'https://techcrunch.com/feed/',
  refresh: 600000 // විනාඩි 10යි
});

feeder.on('new-item', async (item) => {
  console.log(`New post: ${item.title}`);
  
  // මේ URL එක පසුව n8n එකෙන් ලැබෙන Webhook URL එකෙන් replace කරන්න
  const n8nWebhookUrl = 'YOUR_N8N_WEBHOOK_URL_HERE'; 
  
  try {
    await axios.post(n8nWebhookUrl, {
      title: item.title,
      link: item.link,
      description: item.description,
      summary: item.summary,
      pubDate: item.pubDate
    });
  } catch (error) {
    console.error('Error sending to n8n');
  }
});
