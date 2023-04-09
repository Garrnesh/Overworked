# ThriftIt 
Welcome to the frontend buyer component of ThriftIt!

This part contains the Frontend Buyer code to be run on a server.

## Requirements
This component requires these set-ups already in place before installation to function properly:
- Node.js version 19.8.1
- npm version 9.5.1
- Firebase SDK config (Get it at your Console -> Project Settings -> Your apps -> SDK setup and configuration)

For more information please check https://firebase.google.com/docs/web/learn-more#config-object

## Install
From the root directory of this repo ('Overworked/'), navigate to Overworked/Frontend:

  `cd Frontend`

1. Install all dependencies as listed in `package.json`:

  `npm install`

2. Put your own Firebase SDK Config at `Frontend/src/Config/Firebase.js` under `firebaseConfig` object

3. Start the server (on port 3000) by

  `npm run start`
