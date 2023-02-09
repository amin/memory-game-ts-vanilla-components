/*
    Memory game build using ESNext features.
    By: Amin El-Rifai
    Github: @amin
    Blog: https://amin.sh
 */

import './src/components/menu/instance'
import './src/components/memory/instance'

const App = document.getElementById('app')
const menu = document.createElement('game-menu')

App ? App.append(menu) : console.error('Something went wrong.')
