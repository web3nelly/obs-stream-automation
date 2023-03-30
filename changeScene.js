import * as dotenv from "dotenv"; // https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
import OBSWebSocket from "obs-websocket-js"; // https://github.com/obs-websocket-community-projects/obs-websocket-js
dotenv.config();
const obs = new OBSWebSocket();
const intervalInSecs = 90;
let currentSceneIndex;

obs.on("ConnectionOpened", () => {
  console.log("Connection Opened");
});

obs.on("Identified", () => {
  console.log("Identified, good to go!");

  obs
    .call("GetSceneList")
    .then((scenesData) => {
      console.log("Scenes:", scenesData);
      switchScene(scenesData);
    })
    .catch((error) => {
      console.error("Error on GetSceneList call:", error);
    });
});

obs.connect(process.env.OBS_WS, process.env.OBS_WS_PASS).then(
  (info) => {
    console.log("Connected and identified", info);
  },
  () => {
    console.error("Error Connecting");
  }
);

const switchScene = (scenesData) => {
  setInterval(() => {
    currentSceneIndex = getNextSceneIndex(scenesData, currentSceneIndex);
    const nextScene = scenesData.scenes[currentSceneIndex];
    console.log("nextSceneIndex: ", currentSceneIndex);
    console.log("nextScene: ", nextScene.sceneName);
    obs
      .call("SetCurrentProgramScene", { sceneName: nextScene.sceneName })
      .then(() => {
        console.log("Switched to scene:", nextScene.sceneName);
      })
      .catch((error) => {
        console.error("Error switching scenes:", error);
      });
  }, intervalInSecs * 1000);
};

const getNextSceneIndex = (scenesData, currentIndex) => {
  currentIndex =
    currentIndex ??
    scenesData.scenes.findIndex(
      (scene) => scene.sceneName === scenesData.currentProgramSceneName
    );
  currentIndex = ++currentIndex >= scenesData.scenes.length ? 0 : currentIndex;
  return currentIndex;
};
