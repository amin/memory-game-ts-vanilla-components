/*
    Memory game build using ESNext features.
    By: Amin El-Rifai
    Github: @amin
    Blog: https://amin.sh
 */

import './src/menu/instance'
import './src/memory/instance'

const App = document.getElementById('app')
const menu = document.createElement('game-menu')

App ? App.append(menu) : console.error('Something went wrong.')
