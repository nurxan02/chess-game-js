# ♔ Chess Master

**A modern, elegant chess game with Apple-inspired design**

\*Designed and developed by **Nurkhan Masimzada\***

---

## 🎯 Overview

Chess Master is a fully-featured, web-based chess game that combines classic gameplay with modern, sleek design principles inspired by Apple's aesthetic. Built with vanilla JavaScript, HTML5, and CSS3, this application delivers a premium chess experience with smooth animations, intuitive controls, and comprehensive game features.

## ✨ Features

### 🎮 Core Gameplay

- **Complete Chess Implementation**: Full adherence to official chess rules
- **Legal Move Validation**: Intelligent move checking and validation
- **Check & Checkmate Detection**: Automatic game state recognition
- **Interactive Board**: Click-to-move interface with visual feedback
- **Turn-based System**: Alternating player turns with clear indicators

### 🎨 User Interface

- **Apple-Inspired Design**: Clean, modern aesthetic with premium feel
- **Responsive Layout**: Optimized for desktop and mobile devices
- **Dark/Light Theme**: Toggle between beautiful light and dark modes
- **Smooth Animations**: Fluid transitions and visual effects
- **Professional Typography**: Clean, readable fonts throughout

### 📊 Game Management

- **Move History**: Complete log of all moves with algebraic notation
- **Game Status Display**: Real-time updates on current game state
- **New Game Function**: Instant board reset and game restart
- **Modal Notifications**: Elegant alerts for game events

### 🌙 Theme System

- **Dynamic Theme Switching**: Seamless transition between themes
- **Persistent Settings**: Theme preferences saved locally
- **Beautiful Color Schemes**: Carefully crafted light and dark palettes

## 🚀 Quick Start

### Prerequisites

- Modern web browser (Chrome, Firefox, Safari, Edge)
- No additional dependencies required

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/chess-master.git
   cd chess-master
   ```

2. **Launch the game:**

   ```bash
   # Simply open index.html in your web browser
   open index.html
   # or
   double-click index.html
   ```

3. **For local development:**
   ```bash
   # Use any local server (optional)
   python -m http.server 8000
   # or
   npx serve .
   ```

## 🎯 How to Play

1. **Start Playing**: The game begins with White's turn
2. **Make Moves**: Click on a piece to select it, then click on a valid destination square
3. **Visual Feedback**: Selected pieces and valid moves are highlighted
4. **Game Status**: Monitor the current player and game status in the info panel
5. **Move History**: Track all moves in the sidebar history log
6. **New Game**: Click "New Game" to reset the board at any time

## 🏗️ Project Structure

```
chess-game-js/
│
├── index.html              # Main HTML file
├── README.md              # Project documentation
│
├── assets/
│   ├── css/
│   │   └── style.css      # Modern styling with theme support
│   │
│   ├── js/
│   │   └── script.js      # Core game logic and interactions
│   │
│   └── img/
│       └── elements/
│           ├── moon.png   # Dark theme icon
│           └── sun.png    # Light theme icon
```

## 🛠️ Technical Details

### Technologies Used

- **HTML5**: Semantic markup and structure
- **CSS3**: Advanced styling with CSS Grid, Flexbox, and custom properties
- **Vanilla JavaScript**: ES6+ features for game logic and DOM manipulation
- **Local Storage**: Theme persistence

### Key Components

- **ChessGame Class**: Core game engine with complete chess logic
- **Board Management**: Dynamic board creation and piece rendering
- **Move Validation**: Comprehensive legal move checking
- **Theme System**: Dynamic CSS custom property management
- **Game State**: Check, checkmate, and game flow control

### Browser Support

- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

## 🎨 Design Philosophy

Chess Master follows Apple's design principles:

- **Simplicity**: Clean, uncluttered interface
- **Elegance**: Premium visual aesthetics
- **Functionality**: Intuitive user interactions
- **Consistency**: Uniform design language throughout
- **Accessibility**: Clear visual hierarchy and readable typography

## 🔧 Customization

### Themes

The game includes a sophisticated theme system using CSS custom properties. You can easily customize colors by modifying the CSS variables in `style.css`:

```css
:root {
  --bg-gradient-start: #f5f7fa;
  --bg-gradient-end: #c3cfe2;
  --text-primary: #1d1d1f;
  /* ... more variables */
}
```

### Game Rules

All chess rules are implemented in the `ChessGame` class. You can extend or modify game behavior by editing the relevant methods in `script.js`.

## 📱 Responsive Design

Chess Master is fully responsive and provides an optimal experience across all device sizes:

- **Desktop**: Full-featured layout with sidebar
- **Tablet**: Optimized board size and touch interactions
- **Mobile**: Compact layout with essential features

## 🔮 Future Enhancements

- **AI Opponent**: Computer player with multiple difficulty levels
- **Online Multiplayer**: Real-time games with other players
- **Game Analysis**: Move suggestions and position evaluation
- **Tournament Mode**: Multiple game management
- **Sound Effects**: Audio feedback for moves and events
- **Piece Animations**: Smooth piece movement animations

## 👨‍💻 About the Developer

**Nurkhan Masimzada** is a passionate developer focused on creating elegant, user-friendly applications. This chess game represents a commitment to combining traditional gameplay with modern design principles.

### Connect

- Portfolio: https://nurkhanmasimzada.site
- LinkedIn: https://www.linkedin.com/in/nurxanmasimzade
- GitHub: https://github.com/nurxan02

## 📄 License

© 2025 **Nurkhan Masimzada**. All rights reserved.

This software is the intellectual property of Nurkhan Masimzada. No part of this software may be reproduced, distributed, or transmitted in any form or by any means without the prior written permission of the author.

For permissions and licensing inquiries, please contact Nurkhan Masimzada.

---

## 🙏 Acknowledgments

- Chess piece Unicode symbols
- Apple Design Guidelines inspiration
- Modern web development best practices

---

<div align="center">

**Enjoy playing Chess Master!** ♔

_Crafted by Nurkhan Masimzada_

</div>
