class Slider {
    constructor(selector) {
        this.element = document.querySelector(selector);
        this.slideWidth = 440;
        this.numSlides = 3;
        this.currentSlide = 0;
        this.frameTime = 20;
        this.pauseTime = 2000;
        this.duration = 200;
    }
    
    switchTo(target) {
        console.log("switch to " + target);
        this.begin = parseInt(styleOf(this.element).left);
        this.translation = -this.slideWidth * (target - this.currentSlide);
        this.time = 0;
        this.currentSlide = target;
        this.tick();
    }
    
    _switchToNext() {
        this.switchTo((this.currentSlide + 1) % this.numSlides);
    }
    
    tick() {
        clearTimeout(this.timer);
        if (this.translation && this.time < this.duration) {
            const dest = Tween.Quad.easeOut(this.time, this.begin, this.translation, this.duration);
            this._moveTo(Math.round(dest));
            this.time += this.frameTime;
            this.timer = setTimeout(this.tick.bind(this), this.frameTime);            
        }
        else {
            this._moveTo(this.begin + this.translation);
            this.timer = setTimeout(this._switchToNext.bind(this), this.pauseTime);
        }
    }
    
    _moveTo(x) {
        this.element.style.left = x + "px";
    }
}
