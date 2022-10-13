class Circle {
    constructor(x, y, radius, color, PIXI, APP) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.PIXI = PIXI;
        this.APP = APP;

        this.graphics = new PIXI.Graphics();
        this.graphics.beginFill(this.color);
        this.graphics.drawCircle(this.x, this.y, radius);
        this.graphics.endFill();
        this.APP.stage.addChild(this.graphics);

    }

    destory() {
        this.APP.stage.removeChild(this.graphics);
    }
}

export default Circle;