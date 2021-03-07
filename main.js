let canvas = document.getElementById("Game");
let ctx = canvas.getContext("2d");
ctx.font = "20px Arial";

//Общие переменные игрока
let start = true; //Идёт ли игра
let life = 20; //Жизни
let gold = 500; //Деньги
let scope = 0; //Счёт
let latencyEnemy = 0; //Частота появления врагов
let latencyShot = 0; //Скорострельность башен
let maxenemy = 20; //Количество врагов
let enemycount = 0; //Текущее количество врагов
let enemies = []; //Враги
let towers = []; //Башни
let waveHP = 10; //Здоровье врагов на волне
let towerspos = [[120, 220], [320, 220], [70, 300], [270, 300], [370, 370], [620, 370], [320, 450], [570, 450], [670, 640]]; //Позиции башен
let roadsize = 15; //Ширина пути врагов
let way = [[100, 150], [100, 250], [350, 250], [350, 400], [650, 400], [650, 670], [890, 670]]; //Путь врагов
let inzone = false;
let road1 = new Image();
let road2 = new Image();
road1.src = "img/way1.jpg";
road2.src = "img/way2.jpg";

//Создание баз
let map = new Image();
map.src = "img/map.jpg";
let base = new Base(40, 50);
base.img.src = "img/base.jpg";
let base_enemy = new Base(canvas.width - 135, canvas.height - 130);
base_enemy.img.src = "img/baseEn.jpg";

//Создание мест для постройки
for (let i = 0; i < towerspos.length; i++) {
    towers[i] = new Tower(towerspos[i][0], towerspos[i][1]);
}

//Функции, которые будут выполняться после клика мыши/нажатия на экран
document.addEventListener("click", ClickHandler);

//Отрисовка
function Draw() {
    if (start) {
        ctx.drawImage(map, -50, -50, canvas.width + 100, canvas.height + 100);
        drawBase(base);
        drawBase(base_enemy);
        drawScope();
        drawWay();
        drawBullets();
        for (let i = 0; i < towers.length; i++) {
            drawSpot(towers[i]);
            drawAttack(towers[i]);
        }
        for (let i = 0; i < enemies.length; i++) {
            drawEnemy(enemies[i]);
        }
        if (latencyEnemy == 60) {
            AddEnemies(waveHP);
            if (enemycount == 0) {
                start = false;
            }
            latencyEnemy = 0;
        }
        else {
            latencyEnemy += 1;
        }
        if (latencyShot == 30) { //Выстрелы
            for (let i = 0; i < towers.length; i++) {
                if (towers[i].enemiesInRange != 0) {
                    towers[i].enemiesInRange.bulletsAtMe.push(new Bullet(towers[i].x, towers[i].y, towers[i].damage));
                }
            }
            latencyShot = 0;
        }
        else {
            latencyShot += 1;
        }
    }
    //Новая волна
    else if (life > 0) {
        ctx.beginPath();
        ctx.rect(canvas.width - 220, 130, 220, 30);
        ctx.fillStyle = "DarkOliveGreen";
        ctx.fill();
        ctx.fillStyle = "White";
        ctx.fillText("Следующая волна >>", canvas.width - 210, 150);
        ctx.closePath();
    }
    //Поражение
    else {
        ctx.beginPath();
        ctx.rect(canvas.width - 220, 130, 220, 30);
        ctx.fillStyle = "DarkSlateGrey";
        ctx.fill();
        ctx.fillStyle = "White";
        ctx.fillText("Начать сначала?", canvas.width - 190, 150);
        ctx.closePath();
    }
}

//Обновление с частотой 60 кадров в секунду
//Подходит лучше, чем requestAnimationFrame(), так как не зависит от частоты обновления монитора
//setInterval(Draw, 16.667);
