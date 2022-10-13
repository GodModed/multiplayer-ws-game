class Player {
    constructor(name, id, x, y, color, PIXI, APP) {
        this.name = name;
        this.id = id;
        this.x = x;
        this.y = y;
        this.color = color;
        this.PIXI = PIXI;
        this.APP = APP;
        this.container = new PIXI.Container();

        this.APP.stage.addChild(this.container);

        this.nameText = new PIXI.Text(this.name, {
            fontFamily: 'Arial',
            fontSize: 24,
            fill: color,
            align: 'right'
        });
        this.nameText.anchor.set(0.5, 0.5);
        this.nameText.position.set(0, -25);

        this.container.addChild(this.nameText);

        this.sprite = PIXI.Sprite.from('cdn/sprites/cursor-icon.png');
        this.sprite.scale.x = 0.04;
        this.sprite.scale.y = 0.04;
        this.sprite.tint = color;
        this.container.addChild(this.sprite);

        this.container.position.set(x, y);

    }

    move(x, y) {
        this.x = x;
        this.y = y;
        this.container.position.set(x, y);
    }

    destroy() {
        this.APP.stage.removeChild(this.container);
    }
}

export default Player;