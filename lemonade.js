import Game from './game_folder/game';
import View from './game_folder/view';
import $ from 'jquery';
import 'jquery-ui';

document.addEventListener("DOMContentLoaded", () => {
  // window.$ = $;
  // var $ = window.$;
  // window.jQuery = jQuery;

  // const canvas = document.getElementById("canvas");
  // canvas.height = 200;
  // canvas.width = 300;
  // const ctx = canvas.getContext('2d');

  const game = new Game();
  // const dock = $('.dock');
  const rootEl = $('.game');
  new View(game, rootEl);
  // game.run();
});
