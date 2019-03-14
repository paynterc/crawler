var StateLoad = {
    preload: function() {
        model.state = "load";
        var empty = game.add.image(0, 0, "loadingEmpty");
        var full = game.add.image(0, 0, "loadingFull");
        empty.anchor.set(0.5, 0.5);
        empty.x = game.width / 2;
        empty.y = game.height / 2;
        //
        //
        full.anchor.set(0, 0.5);
        full.x = game.world.centerX - empty.width / 2;
        full.y = empty.y;
        game.load.setPreloadSprite(full);
        //PRELOAD EVERYTHING HERE
        //
        //
        //
        //
        var theme = new BlueTheme();
        theme.loadTheme();
        //Preload all text buttons
        TextButton.preloadAll();
        //Preload all icons
        //preload images
        // game.load.image("heart", "images/main/heart.png");
        this.loadMain("heart");
        game.load.audio("backgroundMusic", "audio/background/piano.mp3");
        //game.load.audio("elephant","audio/sfx/elephant.mp3");
        this.loadSFX("elephant");

        game.load.image('floor','data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAr0lEQVR4Xu3YQQ3AIBAEQNBBUhU8KhADaENEZbQJj6bVsIMDNndwN/Va6y7Bp8YHMMfYFXD2HlUHR2v7vlUAKkALeAM8gn4B36A5wCBkEjQK2wWSErAM2QatwzwAiBAhJMYEoSgVpsJUmApTYSpMhakwFabCVDjJRAsUhaJQFIpCUSgKRaEoFIWiUBSKQlEoCkWhKBSFolAUikLRpASoMBWmwn8VTur/711fEUoN4AEQ1+FZiO8S4QAAAABJRU5ErkJggg==');

        game.load.image('wall1','data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAABfUlEQVR4Xu2bMQ7CMAxF2xPAjAQIiUMwcRYEYmBnYEGMMHAqJg7BwklAKg1qq0akkm0CeczINj/f3x+nzbMse2QJf3IAKBlwum2T4sFuei5+75sBAFAywCGjTYcm4NZ5vQywLsQBbZ33IwCrzbKo7XDci5Jh1J8U8XwMsMoLAD4RdMi4k1jvFiIMGPSGRZxQBmjnDWaAdiFNDbACHgBoAY8RQgNKalj1IhpQImDNPEQQEUQE2/8OW/ciIogIvhCwZh5TgCnAFGAKtG6FrcUo+jEosg6q7BZDN0LaeYOngHYhPgZo5/0IgFQBvjjcCzSu4qK5F9A++VjiczfYdIKxnIx1HTwf4B6QuN4v1uB/Nd9sPK9bYQCAAbSASE+63oq9pdQ0IHkARGhkEESNAQa1i6RIBgBfSwIARggniBWubYVjNy4i0l8JkowI+oADAKYAU4ApwBSovjLDGGQlxkpM2mxFHS/YCP3Kiqsr2gCAE8QJ1p1g1x76l+8nfzv8BAGcIB//GDLSAAAAAElFTkSuQmCC');

        game.load.image('wall2','data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAABaklEQVR4Xu2bQQoCMQxFOyfQtaAgeDBRXLh3MRtxqQuP6F0UaqtSpraLJgT65gBN5vc3SfPTwTn3dB1/AwAEBtwep654MG7u/n8/DACAwICIjDQdUsC17WYZoO1IBFrbbhGA/XHnfbtcz03JsJqv/Xo5BmjZBYBcEIzIxJ04jNsmDFjMln6dWgZI261mgLQjaQzQAh4AOAKZQogYEKihdRaJAQEBbeYRBAmCBMHp67D2WSQIEgTfCGgzjyxAFiALkAUmu8Lawch8GmzSDvrpLdZ2hKTtVmcBaUdyDJC2WwSglQO5ddAFEinOjC4gvfNW1kcbRBxFHf5fCUqfVbKA1SyQlsKow73L44ijyOPMBzTJiAxIMCHCiAwzQgxJMSXGmBxzgrVtcekSvNgVZkgqDEtL74R5ZQgAuA1yG+z7Ntjk71GHv09vausAaeCLdUArB1CHMwiYFUakd97K+qjDqTpsZWe0/ej+9fgLQA00Ln4/YPMAAAAASUVORK5CYII=');

        game.load.spritesheet('player', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAACWElEQVR4Xu2ay1HEMAxAN4XQDzc6oQQOWwKdcKMfCjGTTbRjHFvWz58E7YVh1vo9SbYT7XL7558FiT8o2GB6FWrtRVEA4XszuLxufyn/72stAHRJAAkAh7slAArwNEFc+zO3QAAALRMwNQBO4MlacgtWAYSfT7Ify8s7rCU7MHoTnh5A6wQ4gFoJQgbW8i5lA75r0QJeAfse1CoBaQscLh/CDMSFxdkQu9sH54q3LgMApS7LgWkBALWfBfDxFm73r+0rCYBYHtljYgB/Au9pvwcASgu0BIDadwB7iQ7LwGj71Qog34OjhckeoGqB1vYdQET42QZrBrUfOEXW9ykEXYcWJMigS6j2sxehAQAeJy5E1NP+TACeEBxAxxb0Ckh2kkcf9izB0farT4Pa3Zh4CoAZ/fFzdJh0FR7mQK4CDKCTH8exR1LK+Z3zFbIolY+PRK4Otm0HkEkhm2KhjLnZi9VIfWDLeQUYbzinU6cp09MFm3PYASBp1FxKTgMWHY31mM+P7iMSAI6T3B8ocHS3WIsCUBi8Rgs4AOFkiPkEqOCsF622gGQ05gBob4L16TPQQK6AVvN5gxhUKqpvhIQtQH4hofLeQLgHgJKbUxyV1dGYpAIEvw8wyKVMRQ8AU2S6Voajx+Oy9BlIeQXsEIsVIIEs+H2AxIyJTLUCJFYuAUASeCxDnc9r7Wjl4x16yHxeG4BWfrbpsDYetrwDSJCNHo+zM6gV8ArIVYCWaiJ/iqsw+KyZBdSu28ZcbdTNOhy1iY6gxQFkILFn7IV9ZOreB5+9Aghtcuklvwhmk1C/1Og+AAAAAElFTkSuQmCC',32,32);

        game.load.spritesheet('door','data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAACfklEQVR4Xu2bTU7DMBCFkxPAskIChMQNqkqsuEDVOyAQC/YgdYPoDgTsWcEtegFWHAIJwapLbhDUKGO5zjiZ+Gdwk2EJydj+/ObN2BF5lmVFNuCfXABUCnj4vB6UDubHz+V6lQIEQKUAIBNbDiZw7nGtCuCeCIDmHrcVwMXVeTm3u/vboGI42D0q49kUwDWuALCZIJCBnbicnwVRwN7OfhmHqoDY45IVEHsipgdwgRcAkgKWRkg8oJIGVy6KB1QEuJUnJigmSDDB15e3IE0QFoTrMPTz+4U2YKQUEACVArbxrgB2OIgCBADzZYmP8cBmRVEA16VF8gCKxcJnjurdvIoTIh7EYlFAMZ36A5hMMgXAN54WSwAYfhW0CoAHpKSAp9Uqu5nNlJoGp4BoAPQkN6lukwJMszLXUvsyhJW6QQFosvcUPaCcL1IF2sqU07fBXgNoI6b/PSUPMBXQZR0bX4e7vNhLAB/f760MTg5Py2dSBkBZx3oNsBZVBSgvCgCLAspmZDRqVdDGA5HOApSNFAVICogHhDFBp9wHI+iDBwgAxP3z5bJWDdC+gaAAl1hmFYDSbfu9Vx+AKcBl0rbGyiVWMgDWi4IF+CqgSyzWPsBUALZjkA81CC0p4BpLABDONNE6QUzy1jQgKkBXDiUWqwJMuxcASAmM6QHKgzQ1JaEA7FjYOxP06gKNi0zvC5b/UMCgATyOx90vQMy8ILTC5BsWbgUIAEQBnVNimxWAmRYngNpY3CngAwCr3Xq8ziCNihK8D9DP003X4vrEmxYREgBLI9QEwGW3XAFggFkA6KXIVIALABXPwwRh3GQAkCQfsA+IAoDcdPTswcH/9/gfuZg5PbPZMrAAAAAASUVORK5CYII=',64,64);
        game.load.spritesheet('enemy1', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAhUlEQVRYR+2XSw6AIAxEp/c/NMZFDTF+ZohKTYZ1oY8HtCEANEwcUQagtW9FRKx7BzYDBrABGyhtIN8sC8nES3WAWbCv5ky8BPBGqzCADdjAvwwkrVoPrionbWA0ecKeQVAAfXK2D2Tiu7kSgJp8D3E0nwJQz1yJN4AN1DOg3OAnY6f/jhdB6pIB3FepFAAAAABJRU5ErkJggg==',32,32);
        game.load.spritesheet('ghost', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAABACAYAAAB7jnWuAAABTUlEQVRoQ+1Y2Q7DIAwb///RTK0G4wjkwBRNS5/WtcXGIWd44a44WCrMIKYPhdxGwO3nJNYqgQweI80jhAqiw1shcCOOgLvtf4nMGWlkl4KnNQs1MgmLAqqdc0r8HIGl3VOm0CpwlAAEvFGhdlLGA0QE0klvPaT9P91rTHCUgAhcGEPu17QKOAE26WjkdxOYFdCkX84k7gUmBdwE2hJsWo5/8iCXjOABqC1KRgS6Ghu5e0kcqAigwTkC8MxHnYWRG7Lg14dJEe3vksiUABdGkc/bQyhtNFEcVEUpCrRah4sDW0Crs7AdgQFAKuATElJsn5BQ0e9qjHJWNHgBG64ldUAiYfGCowSWwH1CQhxIVTISye8TEqlbe2dkUgBZnpsIeHPqJjiuwAkC/zcfIGt7pPTUhOQx0FF7LsrzJXP0fODplrzrjo8TkNYQW957A+fpDildpujeAAAAAElFTkSuQmCC',32,32);
        game.load.spritesheet('sword1', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAABACAYAAAB7jnWuAAAA0ElEQVRoQ+2ZyQ6AIAxE5f8/GgNaw6IpaGw5PI7GMNMH0S5hc17BWX/DAAQgsByBeH4XzIyVQjHGQz+E/NjExDIGcugNARMKQsDfgEQvPyere3ARwAAEIAABCHgSkCTkqUb5NS9Im7sbKCN3TclyTuKZE7rUqb9esJGIMAABCEAAAhCAAAQgAAEIQKBqVluXZW0zWquStULn1XF2BNpGhap6zBbKNWWk6w/MGujUJ4cdSxiQIKqZgYa+aet/OoLKwKjwzXtTZ38FUGxk3h1J2jvbAllB6jXmzwAAAABJRU5ErkJggg==',32,32);

    },
    loadMain(name) {
        game.load.image(name, "images/main/" + name + ".png");
    },
    loadSFX(name) {
        game.load.audio(name, "audio/sfx/" + name + ".mp3");
        model.regSound(name);
    },
    loadSFX2(name) {
        game.load.audio(name, "audio/sfx/" + name + ".wav");
        model.regSound(name);
    },
    create: function() {
        //pass the key for background music to the media manager
        mediaManager.setBackgroundMusic("backgroundMusic");
        //pass sound keys to the media manager
        //a sound object will be created
        model.sfx.forEach(function(sound) {
            mediaManager.addSound(sound);
        }.bind(this));
        if (model.devMode == true) {
            model.musicOn = false;
            game.state.start("StateMain");
        } else {
            game.state.start("StateTitle");
        }
    },
    update: function() {}
}