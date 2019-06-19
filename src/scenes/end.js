import elements from "../elements.js";

export default class EndScene extends Phaser.Scene {
    constructor() {
        super({ key: "EndScene" });
    }

    preload() {}

    create() {
        elements.buttonGameReplay.onclick = () => {
            elements.appEnd.style.visibility = "visible";
            elements.appEnd.style.display = "initial";
            this.scene.start("GameScene");
        };
    }
}
