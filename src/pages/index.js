// * * * IMPORTS * * *
import '../pages/index.css'; // connecting the font table
import { selectors, spaceZ } from '../utils/constants.js';

// * * * CONSTS * * *

let lastPos = 0;
const body = document.querySelector(selectors.body);
const arrFrames = [...document.querySelectorAll(selectors.galleryFrame)];
const zVals = [];
const btnAudio = document.querySelector(selectors.soundbutton.default);
const audioFrame = document.querySelector(selectors.audio);

// * * * MAIN CODE * * *

// 3D Scroll
arrFrames.forEach((frame, index) => {
  zVals.push(index * spaceZ);
  frame.setAttribute('style', `transform: translateZ(${zVals[index]}px)`);
});

body.setAttribute('style', `height: ${Math.abs(spaceZ) * (arrFrames.length)}px`);

window.onscroll = function () {
  const top = document.documentElement.scrollTop;
	const delta = lastPos - top;
	lastPos = top;
  arrFrames.forEach((frame, index) => {
    zVals[index] -= delta;
    frame.setAttribute('style', `transform: translateZ(${zVals[index]}px); opacity: ${zVals[index] < Math.abs(spaceZ) / 2? 1: 0}`);
  });
};

window.scrollTo(0, 1);

// Audio
btnAudio.addEventListener('click', (evt) => {
  btnAudio.classList.toggle(selectors.soundbutton.paused);
	audioFrame.paused? audioFrame.play(): audioFrame.pause();
});

window.onfocus = function () {
	btnAudio.classList.contains(selectors.soundbutton.paused)? audioFrame.pause(): audioFrame.play();
};

window.onblur = function () {
	audioFrame.pause();
};
