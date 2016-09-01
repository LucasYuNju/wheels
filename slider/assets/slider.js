class Slider {
    constructor(selector) {
        this.element = document.querySelector(selector);
        this.slideWidth = 440;
        this.numSlides = 3;
        this.currentSlide = 0;
        this.frameTime = 20;
        this.pauseTime = 3000;
    }
    
    switchTo(target) {
        this.currentSlide = target;
        this.begin = styleOf(this.element).left;
        this.translation = -slideWidth * (target - this.currentSlide);
        this.duration = 200;
        this.time = 0;
        this.tick();
    }
    
    _switchToNext() {
        this.switchTo(this.currentSlide + 1);
    }
    
    tick() {
        clearTimeout(this.timer);
        if (this.translation && this.time < self.duration) {
            const dest = Tween.Quad.easeOut(this.time, this.begin, this.translation, this.duration);
            this.time += this.frameTime;
            this._moveTo(dest);
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
