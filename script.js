let playerState = "idle";
const dropDown = document.getElementById("animations");
dropDown.addEventListener("change", (e) => {
  playerState = e.target.value;
});

// mengambil canvas
const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");

// menentukan tinggi dan lebar  kanvas
const CANVAS_HEIGHT = (canvas.height = 600);
const CANVAS_WIDTH = (canvas.width = 600);

// mengambil asset
const playerImage = new Image();
playerImage.src = "shadow_dog.png";
const spriteWidth = 576;
const spriteHeight = 523;

// jeda tiap frame
let gameFrame = 0;
const staggerFrame = 3;

// informasi frame yang akan diiterasi
const spriteAnimations = [];

// informasi frame apa saja yang akan diiterasi
const animationState = [
  {
    name: "idle",
    frames: 7,
  },
  {
    name: "jump",
    frames: 7,
  },
  {
    name: "fall",
    frames: 7,
  },
  {
    name: "run",
    frames: 9,
  },
  {
    name: "hit",
    frames: 7,
  },
  {
    name: "skip",
    frames: 5,
  },
  {
    name: "roll",
    frames: 7,
  },
];

// menentukan informasi frame yang akan diiterasi
animationState.forEach((state, index) => {
  let frames = {
    loc: [],
  };

  for (let i = 0; i < state.frames; i++) {
    let positionX = i * spriteWidth;
    let positionY = index * spriteHeight;
    frames.loc.push({ x: positionX, y: positionY });
  }

  spriteAnimations[state.name] = frames;
});

//
const animate = () => {
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

  //   posisi frame dalam 1 baris
  let position =
    Math.floor(gameFrame / staggerFrame) %
    spriteAnimations[playerState].loc.length;

  // posisi frame awal
  let frameX = spriteWidth * position;
  let frameY = spriteAnimations[playerState].loc[position].y;

  ctx.drawImage(
    playerImage, //frame yang  diambil
    frameX, //posisi awal pada sumber yang diambil
    frameY, //posisi awal pada sumber yang diambil
    spriteWidth,
    spriteHeight,
    0,
    0,
    spriteWidth,
    spriteHeight
  );
  gameFrame++;
  requestAnimationFrame(animate);
};

animate();
