# Quote Gallery Application

## Overview
The Quote Gallery application is a React-based web application that allows users to explore inspirational quotes, add their favorite quotes to a personalized list, and toggle between light and dark modes. The application fetches quotes dynamically from an API and provides a seamless and visually appealing user experience.

## Features
- **Random Quotes:** Generate and display random quotes using a dedicated button.
- **Favorites Management:** Add or remove quotes from a favorites list.
- **Dark Mode Toggle:** Persistent dark mode that remembers the user's preference.
- **Pagination:** Navigate through paginated lists of quotes.

## Technologies Used
- **Frontend:** React with TypeScript
- **Styling:** Tailwind CSS
- **Icons:** FontAwesome and React Icons
- **State Management:** React hooks (useState, useEffect)
- **Local Storage:** Used to persist dark mode and favorites across sessions.
- **API Integration:** Fetch quotes dynamically from a mock API.

## Prerequisites
Ensure you have the following installed on your system:
- **Node.js:** v14+ (https://nodejs.org/)
- **npm** or **yarn** package manager

## Getting Started
Follow the steps below to set up and run the application locally.

### 1. Clone the Repository
```bash
git clone <repository-url>
cd quote-gallery

### 2. Install the depencies
npm install
# or
yarn install

### 3. Run the development server
npm run dev
# or
yarn dev


### Below is the file structure
.
├── src
│   ├── components
│   │   ├── RandomQuote.tsx
│   │   ├── QuoteCard.tsx
│   │   └── Pagination.tsx
│   ├── pages
│   │   └── Home.tsx
│   ├── utils
│   │   └── api.ts
│   ├── types
│   │   └── Quote.ts
│   └── App.tsx
├── public
├── .env
├── package.json
├── tailwind.config.js
└── README.md

