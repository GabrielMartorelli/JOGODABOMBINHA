// Canvas
const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");
canvas.width = 512; // x
canvas.height = 480; // y
document.body.appendChild(canvas);

// Fundo
let bgReady = false;
const bgImage = new Image();
bgImage.onload = function () {
  bgReady = true;
};
bgImage.src = "images/background.png";

// Herói
let heroReady = false;
const heroImage = new Image();
heroImage.onload = function () {
  heroReady = true;
};
heroImage.src = "images/bomb.png";

// Monstro
let monsterReady = false;
const monsterImage = new Image();
monsterImage.onload = function () {
  monsterReady = true;
};
monsterImage.src = "images/ie.png";

// Objetos
const hero = {
  speed: 256, // Movimento em px/s
};
const monster = {};
let monstersCaught = 0;

// Controles
const keysDown = {};

window.addEventListener(
  "keydown",
  function (e) {
    keysDown[e.keyCode] = true;
  },
  false
);

window.addEventListener(
  "keyup",
  function (e) {
    delete keysDown[e.keyCode];
  },
  false
);

// Game loop
const reset = function () {
  hero.x = canvas.width / 2;
  hero.y = canvas.height / 2;

  // Posicionar monstro randomicamente
  monster.x = 32 + Math.random() * (canvas.width - 64);
  monster.y = 32 + Math.random() * (canvas.height - 64);
};

// Atualizar objetos
const update = function (modifier) {
  
  if (38 in keysDown && hero.y >= 32) {
    // Cima - Setinha
    hero.y -= hero.speed * modifier;
  }
  if (87 in keysDown && hero.y >= 32) {
    // Cima - W
    hero.y -= hero.speed * modifier;
  }
  if (40 in keysDown && hero.y <= canvas.height - 64) {
    // Baixo - Setinha
    hero.y += hero.speed * modifier;
  }
  if (83 in keysDown && hero.y <= canvas.height - 64) {
    // Baixo - S
    hero.y += hero.speed * modifier;
  }
  if (37 in keysDown && hero.x >= 32) {
    // Esquerda - Setinha
    hero.x -= hero.speed * modifier;
  }
  if (65 in keysDown && hero.x >= 32) {
    // Esquerda - A
    hero.x -= hero.speed * modifier;
  }
  if (39 in keysDown && hero.x <= canvas.height - 32) {
    // Direita - Setinha
    hero.x += hero.speed * modifier;
  }
  if (68 in keysDown && hero.x <= canvas.height - 32) {
    // Direita - D
    hero.x += hero.speed * modifier;
  }

  // Movimentação do monstro - Opcional
  // let respawnMonster = window.setInterval(respawn, 1000);
  // function respawn() {
  //   monster.x = 32 + Math.random() * (canvas.width - 64);
  //   monster.y = 32 + Math.random() * (canvas.height - 64);
  // }

  // Colisão
  if (
    hero.x <= monster.x + 32 &&
    monster.x <= hero.x + 32 &&
    hero.y <= monster.y + 32 &&
    monster.y <= hero.y + 32
  ) {
    ++monstersCaught;
    reset();
  }
};

// Render
const render = function () {
  if (bgReady) {
    ctx.drawImage(bgImage, 0, 0);
  }
  if (heroReady) {
    ctx.drawImage(heroImage, hero.x, hero.y);
  }
  if (monsterReady) {
    ctx.drawImage(monsterImage, monster.x, monster.y);
  }

  // Pontuação
  ctx.fillStyle = "rgb(250,250,250)";
  ctx.font = "24px Helvetica";
  ctx.textAlign = "left";
  ctx.textBaseline = "top";
  ctx.fillText("Pessoas Salvas: " + monstersCaught, 32, 32);
};

// Controle do loop
const main = function () {
  const now = Date.now();
  const delta = now - then;

  update(delta / 1000);
  render();

  then = now;

  requestAnimationFrame(main);
};

// Suporte cross-browser para requestAnimationFrame
const w = window;
const requestAnimationFrame =
  w.requestAnimationFrame ||
  w.webkitRequestAnimationFrame || // Navegadores antigos = webkit
  w.msRequestAnimationFrame || // Navegadores Microsoft = ms
  w.mozRequestAnimationFrame; // Mozilla = moz

// Inicio do loop
let then = Date.now();
reset();
main();
