# Tenzies game 🎲

Tenzies is a fun and fast-paced React dice game where the goal is to roll until all dice show the same number. Click on individual dice to hold their value between rolls and race against your own luck to win! Includes confetti and a win message when you succeed!


## Features

- Interactive dice generation with random values
- "Hold" dice to lock their current value between rolls
- "Roll" button becomes "New Game" on win
- Confetti animation and win message when all dice are the same
- Mobile first approach and UI with clear, full-responsive design
- Accessibility-first approach (`aria-live` `aria-label`, `aria-pressed`, semantic tags)


## Technologies Used

- **React** (Props, State, Conditional Rendering useState, useRef, useEffect)
- **JavaScript (ES6+)**
- **Vite** (for modern fast dev environment)
- **CSS** (clean UI styling and animations)
- **Confetti** (celebratory confetti on win) via `react-confetti`
- **nanoid** (for unique die IDs)


## How to run locally 

**1. Clone the repository:** <br/>
    - git clone https://github.com/filipdev3/tenzies-game

**2. Navigate into the project directory:** <br/>
    - cd tenzies-app

**3. Install dependencies:** <br/>
    - npm install

**4. Start the development server:** <br/>
    - npm run dev 



## Gameplay Instructions

- Click **"Roll"** button to roll all dice that are not held.
- Click any die to **hold** its value.
- Keep rolling until **all dice match** and are held.
- When you win, press **"New Game"** button or just hit enter to start again!


## Application preview

**Playing game**<br/>
![Tenzies Preview](https://github.com/filipdev3/tenzies-game/blob/main/src/assets/gifs/playing-tenzies.gif)


**Game won** <br/>
![Tenzies Preview](https://github.com/filipdev3/tenzies-game/blob/main/src/assets/gifs/game-won.gif)


**New Game** <br/>
![Screenshot](https://github.com/filipdev3/tenzies-game/blob/main/src/assets/gifs/new-game.gif)

