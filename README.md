![Discord API](https://img.shields.io/badge/Discord%20API-v12-yellowgreen) ![NodeJs](https://img.shields.io/badge/NodeJS-v16-yellowgreen)
# Instalation
If you want to install the bot, first register the application [Discord Developer Portal](https://discord.com/developers/applications/) to get the token. 
Create `bot-token.txt` in the root directory and paste your token in this file - the file is not included in the repository for security reasons.
Then replace "YOUR_ID_HERE" with created application id here: https://discord.com/oauth2/authorize?client_id=YOUR_ID_HERE&scope=bot&permissions=8.

Several modules are required for the bot to work properly. ffmpeg' module size was to big to import to GitHub, so imported all needed for bot to work except from this one to zip file. However, ffmpeg can be downloaded just by using command: 'npm install ffmpeg' after choosing proper directory (project modules directory).

Finally you can invite the bot with admin privileges to discord server, run it (index.js script) and use it on your own. :)