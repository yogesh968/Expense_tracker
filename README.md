# Expense Tracker App (Expo + React Native)

A modern, minimal expense tracker built with Expo and React Native. It uses NativeWind (Tailwind for RN) for styling, React Navigation for navigation, AsyncStorage for local persistence, and react-native-chart-kit for analytics.

## Features
- **Home Dashboard**: Monthly total and quick category summary.
- **Add Expense**: Title, amount, category, date.
- **Expense List**: Search, category filters, date range filters.
- **Analytics**: Pie and bar charts for insights.
- **Settings**: Dark mode toggle, reset data, export CSV.
- **Floating + Button**: Quick add from Home.

## Tech Stack
- **Expo SDK 51**
- **React Navigation v6**
- **NativeWind (Tailwind CSS)**
- **AsyncStorage** for local storage
- **react-native-chart-kit** with **react-native-svg**
- **Reanimated** for smooth animations

## Project Structure
```
/ExpenseTrackerApp
├── App.js
├── app.json
├── babel.config.js
├── tailwind.config.js
├── /components
│   ├── CategoryFilter.js
│   ├── ChartView.js
│   ├── ExpenseCard.js
│   └── FloatingButton.js
├── /context
│   ├── ExpensesContext.js
│   └── ThemeContext.js
├── /screens
│   ├── AddExpenseScreen.js
│   ├── AnalyticsScreen.js
│   ├── ExpenseListScreen.js
│   ├── HomeScreen.js
│   └── SettingsScreen.js
├── /utils
│   ├── dateRange.js
│   ├── formatDate.js
│   └── storage.js
└── /assets
    └── .gitkeep
```

## Setup
1. Install dependencies:
```
npm install
```

2. Start the dev server:
```
npx expo start
```

3. Run on device/simulator:
- Press `i` for iOS Simulator (macOS), or `a` for Android.
- Or scan the QR with Expo Go app.

## Notes
- Dark mode is persisted and wired to NativeWind's color scheme.
- Initial dummy data seeds on first run (stored in AsyncStorage).
- CSV export shows a preview via alert for now (you can extend to share/save file).

## Next Ideas
- Edit expense flow (prefill AddExpense with item).
- SQLite persistence for larger datasets.
- Push notifications for daily spend reminders.
- Firebase Auth for syncing across devices.
