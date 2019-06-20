import elements from "../elements.js";

export default class EndScene extends Phaser.Scene {
    constructor() {
        super({ key: "EndScene" });
    }

    preload() {}

    create() {
        elements.appEnd.style.visibility = "visible";
        elements.appEnd.style.display = "flex";
        elements.appEnd.style.marginTop = "10%";

        // TODO: Update display score once gameState is implemented
        // elements.endScoreDisplay.innerHTML = `Score: ${}`

        elements.buttonGameReplay.onclick = () => {
            elements.appEnd.style.visibility = "invisible";
            elements.appEnd.style.display = "none";
            state.getGame().scene.stop("EndScene");
            state.getGame().scene.start("GameScene");
        };
    }
}
