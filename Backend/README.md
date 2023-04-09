# ThriftIt Backend
Welcome to the backend component of ThriftIt!

This part contains the Backend code to be run on a server.

## Requirements
This component requires these set-ups already in place before installation to function properly:
- Node.js version 19.8.1
- npm version 9.5.1
- Registered app with Firebase, and have your service account key ready (see [https://firebase.google.com/docs/admin/setup](https://firebase.google.com/docs/admin/setup#set-up-project-and-service-account) for more information)
- API credential for OneMap (including email and password

## Install
From the root directory of this repo ('Overworked/'), navigate to Overworked/Backend:

  `cd Backend`

1. Install all dependencies as listed in `package.json`:

  `npm install`

2. Paste your service account key into `Backend/src/Key/service-account.json`

3. Put your OneMap credentials into `Backend/src/Key/Details.json` (Sign up to OneMap API here: https://developers.onemap.sg/register/)

4. Start the server (on port 8000) by

  `node src/server.js`

  Or

  `node {path_to_server.js}`

  You can change the port the server runs on in server.js line 6.
