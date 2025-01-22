# Quote Generator App

This is a React application that allows users to browse a list of paginated quotes and generate random quotes. The app is built with React, Tailwind CSS, and TypeScript to ensure type safety, modularity, and responsive design.

---

## Features

### Core Features
1. **Home Page**:
   - Paginated list of quotes fetched from the API.
   - Each quote card displays the quote text and author (if available).
   - Pagination controls for navigating through pages.

2. **Random Quote Generator**:
   - A button to fetch and display a random quote from the API.
   - Displays the quote text and author.

3. **Responsive Design**:
   - Works seamlessly on both desktop and mobile devices.

4. **Clean UI/UX**:
   - Styled using Tailwind CSS for a consistent and user-friendly experience.

### Optional Features (Bonus):
- Loading indicators during API calls.
- Error handling for API failures.
- A dark mode toggle.
- Ability to save quotes locally as favorites.

---

## Technologies Used

1. **React**: For building the user interface.
2. **TypeScript**: For type safety and improved code quality.
3. **Tailwind CSS**: For responsive and modern styling.
4. **Axios**: For making API requests.

---

## API Endpoints

1. **Paginated Quotes**: `https://dummyjson.com/quotes?limit=3&skip=10`
   - Fetch a paginated list of quotes. Adjust the `limit` and `skip` parameters for pagination.

2. **Random Quote**: `https://dummyjson.com/quotes/random`
   - Fetch a random quote.

---

## Installation

Follow these steps to set up the project locally:

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/<your-username>/<repo-name>.git
   cd <repo-name>
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Run the Development Server**:
   ```bash
   npm start
   ```

4. **Build for Production**:
   ```bash
   npm run build
   ```

---

## Project Structure

```
quote-generator-app/
├── public/                     # Static assets
├── src/                        # Main source code
│   ├── api/                    # API interaction logic
│   ├── components/             # Reusable components
│   ├── pages/                  # Page components
│   ├── styles/                 # Tailwind CSS setup
│   ├── types/                  # TypeScript types and interfaces
│   ├── utils/                  # Utility functions
│   ├── App.tsx                 # Main application component
│   └── index.tsx               # ReactDOM entry point
├── tailwind.config.js          # Tailwind CSS configuration
├── tsconfig.json               # TypeScript configuration
├── package.json                # Dependencies and scripts
└── README.md                   # Documentation
```

---

## Assumptions

1. All quotes are fetched from the `dummyjson.com` API.
2. Errors during API calls are handled gracefully.
3. The application is designed for both light and dark modes.

---

## How It Works

1. **Paginated Quotes**:
   - The API is called to fetch quotes with pagination parameters (`limit` and `skip`).
   - Quote cards display the fetched data with pagination controls.

2. **Random Quote**:
   - Clicking the random quote button triggers an API call to fetch a single random quote.
   - The quote is displayed dynamically on the screen.

3. **Responsive Design**:
   - Tailwind CSS ensures the app looks good on any device.

---

## Contributing

1. Fork the repository.
2. Create a new branch for your feature/fix:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add feature/fix"
   ```
4. Push to your branch and submit a pull request.

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## Author

Developed by `Gaurang Khatavkar`.
