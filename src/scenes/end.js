import elements from "../elements.js";
import state from "../state.js";

export default class EndScene extends Phaser.Scene {
    constructor() {
        super({ key: "EndScene" });
    }

    preload() {}

    create() {
        elements.buttonGameReplay.onclick = () => {
            elements.appEnd.style.visibility = "visible";
            elements.appEnd.style.display = "initial";
            state.getGame().scene.start("GameScene");
        };
    }
}
