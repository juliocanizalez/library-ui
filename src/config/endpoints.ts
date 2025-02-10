/**
 * API Endpoint Definitions
 *
 * This file defines the base URLs for various API endpoints used in the application.
 * The URLs are dynamically constructed using environment variables to ensure flexibility
 * and security across different environments (e.g., development, staging, production).
 *
 * Environment Variables Used:
 * - `VITE_API_URL`: The base URL of the API
 * - `VITE_API_VERSION`: The version of the API
 *
 * Each endpoint is constructed by combining the base URL, API version (if applicable),
 * and the specific resource path. This modular approach allows for easy updates and
 * consistency across the application.
 *
 * Example Usage:
 * - Import the desired endpoint URL into your service or API utility.
 * - Use the URL to make HTTP requests (e.g., GET, POST, PUT, DELETE).
 *
 * Endpoints Defined:
 * 1. `adminUrl`: URL for Django admin site.
 * 2. `tokenRefreshUrl`: URL for refreshing authentication tokens.
 * 3. `loginUrl`: URL for user authentication (login).
 * 4. `logoutUrl`: URL for user logout.
 * 5. `usersUrl`: URL for user-related operations (e.g., fetching, creating, updating users).
 * 6. `booksUrl`: URL for book-related operations (e.g., fetching, creating, updating books).
 * 7. `checkoutsUrl`: URL for book checkout operations (e.g., managing checkouts and returns).
 */

export const adminUrl = `${import.meta.env.VITE_API_URL}/admin/`;
export const tokenRefreshUrl = `${import.meta.env.VITE_API_URL}${import.meta.env.VITE_API_VERSION}/token/refresh/`;
export const loginUrl = `${import.meta.env.VITE_API_URL}${import.meta.env.VITE_API_VERSION}/login/`;
export const logoutUrl = `${import.meta.env.VITE_API_URL}${import.meta.env.VITE_API_VERSION}/logout/`;
export const usersUrl = `${import.meta.env.VITE_API_URL}${import.meta.env.VITE_API_VERSION}/users/`;
export const booksUrl = `${import.meta.env.VITE_API_URL}${import.meta.env.VITE_API_VERSION}/books/`;
export const checkoutsUrl = `${import.meta.env.VITE_API_URL}${import.meta.env.VITE_API_VERSION}/checkouts/`;
