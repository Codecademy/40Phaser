import elements from "../elements.js";

export default class EndScene extends Phaser.Scene {
    constructor() {
        super({ key: "EndScene" });
    }

    preload() {}

    create(data) {
        elements.appEnd.style.visibility = "visible";
        elements.appEnd.style.display = "flex";
        elements.appEnd.style.marginTop = "10%";
        elements.endScoreDisplay.innerHTML = `Score: ${Math.trunc(data.score)}`;

        elements.buttonGameReplay.onclick = () => {
            elements.appEnd.style.visibility = "invisible";
            elements.appEnd.style.display = "none";
            this.scene.stop("EndScene");
            this.scene.start("GameScene");
        };
    }
}
