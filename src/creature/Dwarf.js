import Creature from '../Creature.js';

export default class extends Creature {
    getSpriteName() {
        return 'creature-dwarf';
    }
    
    afterPlaceOnMap() {
        super.afterPlaceOnMap();
        this.sprite.anchor.x = 0.5;
        this.sprite.anchor.y = 0.5;
    }
    
    createAnimation() {
        super.createAnimation();
        
        let anim = this.sprite.animations.add('play');
        let reverseAnim = this.sprite.animations.add('reverse', this.sprite.animations.frameData.getFrameIndexes().reverse());
        
        reverseAnim.onComplete.add(() => {
            anim.play(20);
        });
        anim.onComplete.add((s, a) => {
            reverseAnim.play(20);
        });
        anim.play(20);
        
        // let frames = this.sprite.animations.frameData.getFrames();
        // let tween = this.gameManager.game.add.tween(this.sprite);
        // tween.to({frame: frames.length - 1}, 5000, Phaser.Easing.Circular.Out, true, 0, -1, true);
    }
}