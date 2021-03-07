//Отрисовка базы
function drawBase(t_base) {
    ctx.drawImage(t_base.img, t_base.x, t_base.y, t_base.size, t_base.size);
}

//Отрисовка места для постройки
function drawSpot(t_spot) {
    ctx.drawImage(t_spot.img, t_spot.x, t_spot.y, t_spot.size, t_spot.size);
    ctx.beginPath();
    ctx.fillStyle = "DimGrey";
    ctx.fillText(t_spot.text, t_spot.x + t_spot.size + 5, t_spot.y + t_spot.size - 5);
    ctx.closePath();
    ctx.beginPath();
    ctx.strokeStyle = "Silver";
    ctx.arc(t_spot.x + t_spot.size / 2, t_spot.y + t_spot.size / 2, t_spot.radius, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.closePath();
}

//Отрисовка счета
function drawScope() {
    ctx.beginPath();
    ctx.rect(canvas.width - 220, 0, 220, 130);
    ctx.fillStyle = "Tan";
    ctx.fill();
    ctx.fillStyle = "Black";
    ctx.fillText("Счёт: " + scope, canvas.width - 210, 25);
    ctx.fillText("Деньги: " + gold, canvas.width - 210, 55);
    ctx.fillText("Жизни: " + life, canvas.width - 210, 85);
    ctx.fillText("Врагов в волне: " + enemycount + "/" + maxenemy, canvas.width - 210, 115);
    ctx.closePath();
}

//Отрисовка пути
function drawWay() {
    ctx.drawImage(road1, way[0][0] + 15, way[0][1], -roadsize - 30, roadsize + 35);
    ctx.drawImage(road1, way[0][0] + 15, way[0][1] + 45, -roadsize - 30, roadsize + 35);
    ctx.drawImage(road1, way[0][0] + 15, way[0][1] + 95, -roadsize - 30, roadsize + 35);

    ctx.drawImage(road2, way[1][0] + 60, way[1][1], -roadsize - 30, roadsize + 30);
    ctx.drawImage(road2, way[1][0] + 105, way[1][1], -roadsize - 30, roadsize + 30);
    ctx.drawImage(road2, way[1][0] + 150, way[1][1], -roadsize - 30, roadsize + 30);
    ctx.drawImage(road2, way[1][0] + 195, way[1][1], -roadsize - 30, roadsize + 30);
    ctx.drawImage(road2, way[1][0] + 240, way[1][1], -roadsize - 30, roadsize + 30);
    ctx.drawImage(road2, way[1][0] + 265, way[1][1], -roadsize - 30, roadsize + 30);

    ctx.drawImage(road1, way[2][0] + 15, way[2][1] + 45, -roadsize - 30, roadsize + 35);
    ctx.drawImage(road1, way[2][0] + 15, way[2][1] + 95, -roadsize - 30, roadsize + 35);
    ctx.drawImage(road1, way[2][0] + 15, way[2][1] + 145, -roadsize - 30, roadsize + 35);

    ctx.drawImage(road2, way[3][0] + 60, way[3][1], -roadsize - 30, roadsize + 30);
    ctx.drawImage(road2, way[3][0] + 105, way[3][1], -roadsize - 30, roadsize + 30);
    ctx.drawImage(road2, way[3][0] + 150, way[3][1], -roadsize - 30, roadsize + 30);
    ctx.drawImage(road2, way[3][0] + 195, way[3][1], -roadsize - 30, roadsize + 30);
    ctx.drawImage(road2, way[3][0] + 240, way[3][1], -roadsize - 30, roadsize + 30);
    ctx.drawImage(road2, way[3][0] + 275, way[3][1], -roadsize - 30, roadsize + 30);
    ctx.drawImage(road2, way[3][0] + 315, way[3][1], -roadsize - 30, roadsize + 30);

    ctx.drawImage(road1, way[4][0] + 15, way[4][1] + 45, -roadsize - 30, roadsize + 30);
    ctx.drawImage(road1, way[4][0] + 15, way[4][1] + 90, -roadsize - 30, roadsize + 30);
    ctx.drawImage(road1, way[4][0] + 15, way[4][1] + 135, -roadsize - 30, roadsize + 30);
    ctx.drawImage(road1, way[4][0] + 15, way[4][1] + 180, -roadsize - 30, roadsize + 30);
    ctx.drawImage(road1, way[4][0] + 15, way[4][1] + 225, -roadsize - 30, roadsize + 30);
    ctx.drawImage(road1, way[4][0] + 15, way[4][1] + 270, -roadsize - 30, roadsize + 30);

    ctx.drawImage(road2, way[5][0] + 60, way[5][1], -roadsize - 30, roadsize + 30);
    ctx.drawImage(road2, way[5][0] + 105, way[5][1], -roadsize - 30, roadsize + 30);
    ctx.drawImage(road2, way[5][0] + 150, way[5][1], -roadsize - 30, roadsize + 30);
    ctx.drawImage(road2, way[5][0] + 195, way[5][1], -roadsize - 30, roadsize + 30);
    ctx.drawImage(road2, way[5][0] + 240, way[5][1], -roadsize - 30, roadsize + 30);
}

//Отрисовка пути врагов
function drawEnemy(t_enemy) {
    if (t_enemy.dead == false) {
        ctx.drawImage(t_enemy.img, t_enemy.x, t_enemy.y, 15, 15);
        ctx.beginPath();
        ctx.strokeStyle = "Black";
        ctx.rect(t_enemy.x - 2.5, t_enemy.y - 10, waveHP * 2, 3);
        ctx.stroke();
        ctx.closePath();
        ctx.beginPath();
        ctx.rect(t_enemy.x - 2.5, t_enemy.y - 10, Math.abs(t_enemy.hp * 2), 3);
        ctx.fillStyle = "ForestGreen";
        ctx.fill();
        ctx.closePath();
        if (t_enemy.x > way[5][0] - t_enemy.deviation) {
            t_enemy.x -= t_enemy.speed;
        }
        else if (t_enemy.y > way[4][1] + t_enemy.deviation) {
            t_enemy.y -= t_enemy.speed;
        }
        else if (t_enemy.x > way[3][0] - t_enemy.deviation) {
            t_enemy.x -= t_enemy.speed;
        }
        else if (t_enemy.y > way[2][1] + t_enemy.deviation) {
            t_enemy.y -= t_enemy.speed;
        }
        else if (t_enemy.x > way[1][0] - t_enemy.deviation) {
            t_enemy.x -= t_enemy.speed;
        }
        else if (t_enemy.y > way[0][1]) {
            t_enemy.y -= t_enemy.speed;
        }
        else {
            base.getDamage();
            enemycount -= 1;
            t_enemy.hp = 0;
            t_enemy.dead = true;
        }
    }
    else {
        ctx.drawImage(t_enemy.imgD, t_enemy.x, t_enemy.y, 15, 15);
    }
}

//Выбор цели
function drawAttack(t_spot) {
    for (let i = 0; i < enemies.length; i++) {
        let t_x1 = t_spot.x + t_spot.size / 2 + t_spot.radius;
        let t_x2 = t_spot.x + t_spot.size / 2 - t_spot.radius;
        let t_y1 = t_spot.y + t_spot.size / 2 + t_spot.radius;
        let t_y2 = t_spot.y + t_spot.size / 2 - t_spot.radius;
        if ((enemies[i].x < t_x1) && (enemies[i].x > t_x2) && (enemies[i].y < t_y1) && (enemies[i].y > t_y2)) { //Если враг в радиусе башни
            inzone = true;
        }
        else {
            inzone = false;
        }
        if ((t_spot.enemiesInRange == enemies[i]) && ((inzone == false) || (enemies[i].hp <= 0))) { //Если враг под прицелом, но умер или ушел
            t_spot.enemiesInRange = 0;
        }
        if ((inzone) && (t_spot.enemiesInRange == 0) && (enemies[i].hp > 0)) { //Если нет врага под прицелом, но есть доступные враги
            t_spot.enemiesInRange = enemies[i];
        }
    }
}

//Отрисовывает выстрелы
function drawBullets() {
    for (let i = 0; i < enemies.length; i++) {
        for (let j = 0; j < enemies[i].bulletsAtMe.length; j++) {
            let t_dist = Math.abs(enemies[i].bulletsAtMe[j].x - enemies[i].x) + Math.abs(enemies[i].bulletsAtMe[j].y - enemies[i].y); //Расстояние от пули до врага
            if (t_dist <= enemies[i].bulletsAtMe[j].size) {
                enemies[i].hp -= enemies[i].bulletsAtMe[j].damage;
                enemies[i].bulletsAtMe.splice(j, 1);
                j -= 1;
                if ((enemies[i].hp <= 0) && (enemies[i].dead == false)) {
                    enemycount -= 1;
                    gold += 100;
                    enemies[i].dead = true;
                    scope += 100;
                }
            }
            else {
                enemies[i].bulletsAtMe[j].x = enemies[i].bulletsAtMe[j].x - (enemies[i].bulletsAtMe[j].x - enemies[i].x) / t_dist * 3;
                enemies[i].bulletsAtMe[j].y = enemies[i].bulletsAtMe[j].y - (enemies[i].bulletsAtMe[j].y - enemies[i].y) / t_dist * 3;
                ctx.drawImage(enemies[i].bulletsAtMe[j].img, enemies[i].bulletsAtMe[j].x, enemies[i].bulletsAtMe[j].y, enemies[i].bulletsAtMe[j].size, enemies[i].bulletsAtMe[j].size);
            }
        }
    }
}