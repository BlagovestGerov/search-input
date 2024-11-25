# SOLUTION.md

## Overview

This project fulfills the requirements of converting a vanilla JavaScript Autocomplete/Typeahead component to a reusable React component while adding new features such as:

- Displaying the selected item in the search field upon selection.
- Maintaining a list of the last 10 searches.
- Supporting data querying from both static arrays and external HTTP endpoints.
- Navigating results using keyboard shortcuts (Arrow Up/Down and Enter).

The implementation adheres to React best practices, and the resulting components are modular, reusable, and functional.

---

## Implementation Details

### 1. **Autocomplete Component**

- The component is designed to be reusable, supporting multiple instances on the same page.
- It accepts both a `data` prop for local queries and a `fetchResults` function prop for HTTP-based querying.
- The dropdown supports keyboard navigation and mouse selection.
- The `lastSearches` feature shows the 10 most recent searches made by the user.
- Styling is handled using SCSS for improved maintainability.

### 2. **App Component**

- Integrates two instances of the `Autocomplete` component:
  - A static array-based search for US states.
  - A dynamic search powered by GitHub's user search API.
- Utilizes `useMemo` to optimize the state-based data filtering function.

### 3. **Unit Testing**

- Tests cover:
  - Rendering of input fields.
  - API call correctness and error handling.
  - Functionality of keyboard navigation and item selection.
  - Filtering local data accurately.

---

## Enhancements and Improvements

### Features Added

1. **Rate Limiting Warning**:
   - Logs a warning if GitHub’s API rate limit is exceeded.
2. **Environment Configuration**:
   - GitHub API URL is extracted into an environment variable (`REACT_APP_GITHUB_API_URL`) for easy configuration.
3. **Responsive Layout**:
   - Components are displayed in a responsive grid using CSS Grid and media queries.
4. **SCSS Migration**:
   - The project uses SCSS for styling, enabling nesting and reusable variables.

### Suggested Future Improvements

1. **Integrate Last Searches into the Dropdown**:

   - Last searches will appear above the fetched results in the dropdown.
   - Clicking on a last search will immediately trigger a new search for the selected query.
   - Add functionality to delete individual or all search history items.

2. **Persistent Search History**:

   - Save search history for logged-in users, ensuring it persists across sessions.
   - Use localStorage or backend storage to maintain consistency.
   - Integrate Clerk for easy user authentication and session management.
   - When users log in, fetch their saved searches and sync them with the dropdown suggestions.

3. **Debounce Implementation**:

   - Introduce a debounce mechanism to prevent excessive API calls during typing.

4. **Loading Indicators**:

   - Display loaders while fetching results, improving user feedback.

5. **Content Security Policy (CSP)**:

   - Add a CSP to safeguard against malicious external links and APIs.

6. **UI Enhancements**:

   - Integrate a UI library (e.g., Material-UI) for consistent and polished components.

7. **Error Handling and Notifications**:

   - Show user-friendly error messages using toast notifications (e.g., when API requests fail).

8. **Accessibility**:

   - Improve accessibility by adding `aria` attributes and enhancing keyboard navigation.

9. **Localization and Internationalization**:

   - Add support for multiple languages using libraries like `react-i18next`.

10. **Lazy Loading and Pagination**:

    - Implement lazy loading or infinite scroll for large datasets.

11. **E2E Testing**:
    - Use Cypress or Playwright for end-to-end testing to validate complete user flows.
