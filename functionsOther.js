function ClickHandler(click) {
    //Координаты мыши
    mouseX = click.offsetX;
    mouseY = click.offsetY;
    //Проверка башен на выбор
    for (let i = 0; i < towers.length; i++) {
        BuildTower(towers[i]);
    }
    if ((mouseX > canvas.width - 220 && mouseX < canvas.width) && (mouseY > 130 && mouseY < 160) && (enemycount == 0 && life > 0)) {
        NextWave();
    }
    if ((mouseX > canvas.width - 220 && mouseX < canvas.width) && (mouseY > 130 && mouseY < 160) && (life <= 0)) {
        Restart();
    }
}

//Добавление врагов
function AddEnemies(hp) {
    if (enemies.length < maxenemy) {
        enemies.push(new Enemy(hp));
        enemycount += 1;
    }
}

//Постройка или улучшение башни
function BuildTower(t_spot) {
    if ((mouseX > t_spot.x && mouseX < (t_spot.x + t_spot.size)) && (mouseY > t_spot.y && mouseY < (t_spot.y + t_spot.size))) { //Если клик был на башню
        //Постройка
        if (t_spot.isbuild == false && gold >= t_spot.cost) {
            gold -= t_spot.cost;
            t_spot.build();
            t_spot.isbuild = true;
            scope += 20;
        }
        //Повышение уровня
        else if (gold >= t_spot.cost) {
            gold -= t_spot.cost;
            t_spot.upgrade();
            scope += 10;
        }
    }
}

//Следующая волна
function NextWave() {
    enemies = [];
    enemycount = 0;
    maxenemy += 5;
    waveHP += 5;
    start = true;
}

//Рестарт
function Restart() {
    life = 20;
    gold = 500;
    scope = 0;
    maxenemy = 20;
    enemycount = 0;
    enemies = [];
    d_enemies = [];
    towers = [];
    waveHP = 10;
    for (let i = 0; i < towerspos.length; i++) {
        towers[i] = new Tower(towerspos[i][0], towerspos[i][1]);
    }
    start = true;
}