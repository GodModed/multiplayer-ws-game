class Circle {
    constructor(x, y, radius, color, id, PIXI, APP) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.PIXI = PIXI;
        this.APP = APP;
        this.id = id;

        this.graphics = new PIXI.Graphics();
        this.graphics.beginFill(this.color);
        this.graphics.drawCircle(this.x, this.y, radius);
        this.graphics.endFill();
        this.APP.stage.addChild(this.graphics);

        this.destroy = function () {
            this.APP.stage.removeChild(this.graphics);
        }
    }
}

export default Circle;