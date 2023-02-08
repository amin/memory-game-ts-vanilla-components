/*
    Memory game build using ESNext features.
    By: Amin El-Rifai
    Github: @amin
    Blog: https://amin.sh
 */

import './src/memory/script'

const App = document.getElementById('app')
const memory = document.createElement('memory-module')

App ? App.append(memory) : console.error('Something went wrong.')
