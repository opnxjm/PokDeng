# Pok-Deng CLI Game

A simple command-line Pok-Deng game implemented in Node.js.

## Run the game
```bash
npm install
npm start
```

## Project Structure
```bash
src/
  deck.js        => deck creation, shuffle, dealing
  rules.js       => scoring and game rules
  format.js      => card display formatting
  cli.js         => command-line input handling
  game.js        => game loop and flow
index.js         => entry point
```

## Run tests
```bash
npm test