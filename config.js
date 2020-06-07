// config.js
const dotenv = require('dotenv');
dotenv.config();
module.exports = {
  token: process.env.token,
  youtube_token: process.env.youtube_token,
  weather_token: process.env.weather_token,
  genius_token: process.env.genius_token,
  news_token: process.env.news_token,
  tenor_token: process.env.tenor_token,
  discord_owner_id: process.env.discord_owner_id,
  server_id: process.env.server_id,
  prefix: process.env.prefix,
  guild_log: process.env.guild_log,
  status_log: process.env.status_log,
  dm_log: process.env.dm_log,
  support_log: process.env.support_log,
  error_log: process.env.error_log,
  general_id: process.env.general_id,
  osu_key: process.env.osu_key,
  google_api_key: process.env.google_api_key,
  google_cse_key: process.env.google_cse_key,
  giphy_key: process.env.giphy_key,
  client_id: process.env.client_id,
  azure_translate_api: process.env.azure_translate_api,
  azure_img_api: process.env.azure_img_api,
  spotify_id: process.env.spotify_id,
  spotify_secret: process.env.spotify_secret,
  role_channel_ud: process.env.role_channel_id,
  audit_log: process.env.audit_log,
  auto_testing_link: process.env.auto_testing_link,
  auto_testing_user: process.env.auto_testing_user,
  auto_testing_password: process.env.auto_testing_password,
  auto_testing: process.env.auto_testing,
  webhook_id: process.env.webhook_id,
  webhook_token: process.env.webhook_token


};