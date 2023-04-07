# OBS Stream Automation

Using [Node.js](https://nodejs.org/) and [@b3nelly/change-obs-scene](https://github.com/web3nelly/change-obs-scene#readme) package for dynamically switching scenes in OBS.

See Automations in action @ [breaking3Dreality on Twitch.tv](https://www.twitch.tv/breaking3Dreality)

**More automates to come!**

## Dependancies

- [OBS](https://obsproject.com/)
- [Node.js](https://nodejs.org/)
- [NPM](https://www.npmjs.com/)
- [dotenv](https://www.npmjs.com/package/dotenv)
- [@b3nelly/change-obs-scene](https://www.npmjs.com/package/@b3nelly/change-obs-scene?activeTab=readme)

## Usage

1. Startup OBS and enable the WebSocket Server

- `Tools > WebSocket Server Settings`:
  - ![obs websocket server settings](https://github.com/b3nelly2/stream/blob/main/assets/obs-websocket-server-settings.png?raw=true)
  - Don't forget to set your _Server Password_

2. `git clone https://github.com/b3nelly2/obs-stream-automation.git`
3. `cd ./obs-stream-automation`
4. `npm install`
5. Create .env file and add your OBS WebSocket Server Settings:

- Windows Powershell:
  ```shell
  New-Item .env -ItemType File
  >> "OBS_WS='ws://localhost:4455'" | Out-File -FilePath .env -Encoding utf8 -Append
  >> "OBS_WS_PASS='yourPassword'" | Out-File -FilePath .env -Encoding utf8 -Append
  >> "OBS_SCENE_INT_SECS=90" | Out-File -FilePath .env -Encoding utf8 -Append
  ```
- macOS & Linux: `touch .env`
  ```shell
  echo "OBS_WS='ws://localhost:4455'" >> .env
  echo "OBS_WS_PASS='yourPassword'" >> .env
  echo "OBS_SCENE_INT_SECS=90" >> .env
  ```
- Or you can just edit the `changeScene.js`, manuallying update:
  - `obsSkipScenes`: Default is an empty array
  - `intervalInSeconds`: Default is 45s
  - `obsWebSocketServerURL`: Default is ws://localhost:4455
  - `obsWebSocketServerPassword`: Default is undefined
  - You can also comment out `dotevn` if you aren't using an `.env` file
    - Lines 1 and 3:
    - https://github.com/web3nelly/obs-stream-automation/blob/936e5204bd5f66eca6af63c393f8b42fb8ff0b0c/changeScene.js#L1-L8

6. `npm start` (OBS must me started to work)
7. That's it, for now 😉

## `@b3nelly/change-obs-scene` In Action

![Working change obs scene example image](https://github.com/web3nelly/obs-stream-automation/blob/main/assets/change-obs-scene.png?raw=true)
