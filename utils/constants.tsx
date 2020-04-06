const knuthShuffle = require('knuth-shuffle').knuthShuffle

export const BACKGROUND_CELL_VALUES = [
  { key: 'jugar:backgrounds.yellow', type: 'color', value: 'yellow' },
  { key: 'jugar:backgrounds.blue', type: 'color', value: 'blue' },
  { key: 'jugar:backgrounds.orange', type: 'color', value: 'orange' },
  { key: 'jugar:backgrounds.green', type: 'color', value: 'green' },
  {
    key: 'jugar:backgrounds.pikachu',
    type: 'img',
    value: 'pikachu.png'
  },
  {
    key: 'jugar:backgrounds.cremona',
    type: 'img',
    value: 'cremona.png'
  },
  {
    key: 'jugar:backgrounds.covid-19',
    type: 'img',
    value: 'coronavirus.gif'
  },
  {
    key: 'jugar:backgrounds.clippy',
    type: 'img',
    value: 'clippy.png'
  }
]
export const BALL_COLORS = ['blue', 'green', 'red', 'yellow']
export const BOARD_NUMBERS = [...Array(90).keys()].map(n => n + 1)
export const BOARD_NUMBER_COLOR = BOARD_NUMBERS.map(
  () => knuthShuffle(BALL_COLORS.slice(0))[0]
)
export const MAX_PLAYERS = 60
/* TODO: Add Patao sounds with an easter egg */
export const SOUNDS = [
  {
    name: 'Cardi B - Coronavirus',
    language: '🇺🇸',
    url: '/sounds/coronavirus.mp3'
  },
  {
    name: 'Chino cirujano - Pero pagaraprata',
    language: '🇦🇷',
    url: '/sounds/chino-cirujano/pero-pagaraprata.mp3'
  },
  {
    name: 'GTA - Ah sh*t, here we go again',
    language: '🇺🇸',
    url: '/sounds/gta-ah-shit-here-we-go-again.mp3'
  },
  {
    name: 'Guido Kaczka  - Mirá la repe',
    language: '🇦🇷',
    url: '/sounds/guido/mira-la-repe.mp3'
  },
  {
    name: 'Guido Kaczka - Preparado, listo, ya',
    language: '🇦🇷',
    url: '/sounds/guido/preparado-listo-ya.mp3'
  },
  {
    name: 'Los Simpsons - Hundiste mi acorazado',
    language: '🇦🇷',
    url: '/sounds/simpsons/hundiste-mi-acorazado.mp3'
  },
  {
    name: 'Riverito - A cruzar los dedos',
    language: '🇦🇷',
    url: '/sounds/riverito/cruzar-dedos.mp3'
  },
  {
    name: 'Snoop dog!',
    language: '🇺🇸',
    url: '/sounds/snoop-dog.mp3'
  },
  {
    name: 'Susana - Correctou',
    language: '🇦🇷',
    url: '/sounds/susana/correctou.mp3'
  },
  {
    name: 'Tano Pasman - Nooooo',
    language: '🇦🇷',
    url: '/sounds/tano/nooooo.mp3'
  },
  {
    name: 'The Simpsons - Bingo',
    language: '🇺🇸',
    url: '/sounds/simpsons/homer-bingo.mp3'
  },
  {
    name: 'You what?',
    language: '🇺🇸',
    url: '/sounds/you-what.mp3'
  },
  {
    name: 'Windows - Error',
    language: '🇺🇸',
    url: '/sounds/windows/windows-error.mp3'
  }
]
