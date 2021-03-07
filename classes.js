//База
class Base {

    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = 100;
        this.img = new Image();
    }

    //Будут вызываться, когда враг пройдет на территорию базы
    getDamage() {
        life -= 1;
        if (life < 0) {
            start = false;
            scope -= 200;
        }
    }
}

//Меcто для постройки
class Tower {

    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = 25;
        this.text = "H"
        this.radius = 0;
        this.damage = 0;
        this.level = 0;
        this.isbuild = false;
        this.cost = 100;
        this.enemiesInRange = 0;
        this.img = new Image();
        this.img.src = "img/tower0.jpg";
    }

    //Случается с местом, если на него кликнуть
    build() {
        this.radius = 100;
        this.damage = 1;
        this.level = 1;
        this.text = "1";
        this.img.src = "img/tower1.jpg";
    }

    //Улучшение башни
    upgrade() {
        this.level += 1;
        this.text = this.level;
        this.radius += 10;
        this.damage += 0.5;
        this.cost += 50;
        if (this.level == 2) {
            this.img.src = "img/tower2.jpg";
        }
        else if (this.level == 3) {
            this.img.src = "img/tower3.jpg";
        }
        else if (this.level == 4) {
            this.img.src = "img/tower4.jpg";
        }
        else if (this.level == 5) {
            this.img.src = "img/tower5.jpg";
        }
    }
}

//Враги
class Enemy {

    constructor(hp) {
        this.hp = hp;
        this.speed = 1;
        this.deviation = Math.floor(Math.random() * (roadsize * 2));
        this.x = 890;
        this.y = 670 + this.deviation;
        this.dead = false;
        this.bulletsAtMe = [];
        this.img = new Image();
        this.img.src = "img/enemy.jpg";
        this.imgD = new Image();
        this.imgD.src = "img/enemyD.jpg";
    }
}

//Выстрелы
class Bullet {
    constructor(x, y, d) {
        this.x = x;
        this.y = y;
        this.damage = d;
        this.size = 5;
        this.img = new Image();
        this.img.src = "img/shot.jpg";
    }
}