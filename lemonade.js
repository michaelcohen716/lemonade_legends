import Game from './game_folder/game';
import View from './game_folder/view';
import $ from 'jquery';
import 'jquery-ui';

// var images = [];
// preload(
//   "assets/madLady"
// )
// function preload() {
//   for (var i = 0; i < arguments.length; i++){
//     images[i] = new Image();
//     images[i].src = preload.arguments[i];
//   }
// }

document.addEventListener("DOMContentLoaded", () => {

  const canvas = document.getElementById("canvas");
  canvas.height = 200;
  canvas.width = 300;

  const game = new Game();
  const rootEl = $('.game');
  new View(game, rootEl, canvas);
});
