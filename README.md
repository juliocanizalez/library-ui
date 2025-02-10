# My U Library

My U Library is a simple and easy-to-use library management system built with Vite, React, Redux, and HeroUI. This project allows users to manage books, checkouts, and users within a library.

## Table of Contents

- [My U Library](#my-u-library)
  - [Table of Contents](#table-of-contents)
  - [Technologies Used](#technologies-used)
  - [Features](#features)
  - [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
    - [Running the Development Server](#running-the-development-server)
    - [Environment Variables](#environment-variables)
  - [Project Structure](#project-structure)
  - [License](#license)

## Technologies Used

- [Vite](https://vitejs.dev/guide/)
- [React](https://reactjs.org/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [HeroUI](https://heroui.com)
- [Tailwind CSS](https://tailwindcss.com)
- [TypeScript](https://www.typescriptlang.org/)
- [Axios](https://axios-http.com/)

## Features

- User authentication and role-based access control
- Manage books, checkouts, and users
- Search and filter books
- Responsive design

## Getting Started

### Prerequisites

Make sure you have the following installed on your machine:

- [Node.js](https://nodejs.org/) (version 14 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/juliocanizalez/library-ui.git
cd library-ui
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

### Running the Development Server

Start the development server:

```bash
npm run dev
# or
yarn dev
```

The application will be available at `http://localhost:5173`.

### Environment Variables

Create a `.env` file in the root directory of the project and add the following environment variables:

```env
VITE_API_URL=http://localhost:8000/
VITE_API_VERSION=api
```

These variables define the base URL and version of the API used by the application.

## Project Structure

Here is an overview of the project structure:

```
my-u-library/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── books/
│   │   │   ├── add-book-modal.tsx
│   │   │   ├── book-details.tsx
│   │   │   └── books-list.tsx
│   │   ├── checkouts/
│   │   │   ├── book-return.tsx
│   │   │   ├── manage-books.tsx
│   │   │   ├── manage-user.tsx
│   │   │   └── user-checkouts.tsx
│   │   ├── common/
│   │   │   ├── icons.tsx
│   │   │   ├── navbar.tsx
│   │   │   ├── primitives.ts
│   │   │   ├── protected-route.tsx
│   │   │   └── theme-switch.tsx
│   │   └── user/
│   │       └── add-user-modal.tsx
│   ├── config/
│   │   ├── endpoints.ts
│   │   └── site.ts
│   ├── hooks/
│   │   ├── use-api.ts
│   │   └── use-theme.ts
│   ├── interfaces/
│   │   ├── IApiError.ts
│   │   ├── IApiRequestConfig.ts
│   │   ├── IBook.ts
│   │   ├── ICheckout.ts
│   │   ├── ILogin.ts
│   │   ├── IUseApiResponse.ts
│   │   └── IUser.ts
│   ├── layouts/
│   │   └── default.tsx
│   ├── pages/
│   │   ├── checkouts.tsx
│   │   ├── index.tsx
│   │   └── login.tsx
│   ├── store/
│   │   ├── auth-slice.ts
│   │   └── index.ts
│   ├── styles/
│   │   └── globals.css
│   ├── types/
│   │   └── index.ts
│   ├── utils/
│   │   └── date-utils.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── provider.tsx
├── .env
├── .eslintrc.json
├── .gitignore
├── .npmrc
├── .prettierrc
├── index.html
├── package.json
├── postcss.config.js
├── README.md
├── tailwind.config.js
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts
```

## License

Licensed under the [MIT license](LICENSE).
