import Game from './game_folder/game';
import View from './game_folder/view';
import $ from 'jquery';
import 'jquery-ui';


document.addEventListener("DOMContentLoaded", () => {

  const canvas = document.getElementById("canvas");
  canvas.height = 435;
  canvas.width = 750;

  const game = new Game();
  const rootEl = $('.game');
  new View(game, rootEl, canvas);
});
