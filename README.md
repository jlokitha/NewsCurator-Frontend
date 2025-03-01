<div style="display: flex; align-items: center; justify-content: center;">
  <h1 style="margin: 0;">NewsCurator Frontend</h1>
</div>
<br>

NewsCurator is a personalized news dashboard mobile application built with React Native and Expo. The app aggregates trending articles from NewsAPI and lets users filter news by interests (tech, science, etc.), bookmark favorite articles, and manage their profile—all through an intuitive, user-friendly interface.

---

<details>
  <summary>Table of Contents</summary>

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Backend Repository](#backend-repository)
- [Postman Collection](#postman-collection)
- [License](#license)
  
</details>

---

## Overview

NewsCurator delivers a personalized news experience by:
- Presenting trending articles based on user interests.
- Enabling users to filter news using common tags or custom text searches.
- Offering bookmark functionality to save and manage favorite articles.
- Providing a secure user authentication system with JWT-based sign-up and sign-in.
- Allowing users to review their profile details and logout seamlessly.

---

## Features

- **User Authentication:**  
  Secure sign-up and sign-in with JWT authentication.
  
- **News Dashboard:**  
  - Loads trending news articles from NewsAPI with pagination support.
  - Allows filtering by predefined tags (e.g., tech, science) and custom search queries.
  
- **Bookmark Management:**  
  - Bookmark favorite news articles.
  - View and delete bookmarks from a dedicated section.
  
- **User Profile:**  
  - Access personal details.
  - Logout functionality to ensure a secure session.

---

## Tech Stack

- **React Native & Expo:**  
  Cross-platform mobile development with Expo.
- **TypeScript:**  
  Robust and scalable code with static type-checking.
- **Redux & Redux-Thunk:**  
  Efficient state management and asynchronous API integration.
- **Axios:**  
  Simplified HTTP requests to the backend API.
- **NativeWind:**  
  Utility-first styling for rapid and responsive design.

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/en/download)
- [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)

### Installation

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/jlokitha/NewsCurator-Frontend.git
   cd NewsCurator-Frontend
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Run the Application:**
   ```bash
   npm start
   ```
   or
   ```bash
   expo start
   ```

4. **Test on Device/Emulator:**
   - Scan the QR code with the Expo Go app on your mobile device.
   - Alternatively, run on an emulator using the provided Expo options.

---

## Backend Repository

Access the NewsCurator Backend repository on GitHub [here](https://github.com/jlokitha/NewsCurator-Backend.git).

---

## Postman Collection

For API testing and integration details, check out the Postman collection [here](https://documenter.getpostman.com/view/35384124/2sAYdhLAyB).

---

## License

This project is licensed under the [MIT License](LICENSE).

---

<div align="center">
  <a href="https://github.com/jlokitha/NewsCurator-Frontend" target="_blank">
    <img src="https://img.shields.io/badge/React_Native-000000?style=for-the-badge&logo=react&logoColor=white" alt="React Native">
  </a>
  <a href="https://expo.dev/" target="_blank">
    <img src="https://img.shields.io/badge/Expo-000000?style=for-the-badge&logo=expo&logoColor=white" alt="Expo">
  </a>
  <a href="https://www.typescriptlang.org/" target="_blank">
    <img src="https://img.shields.io/badge/TypeScript-000000?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript">
  </a>
  <a href="https://redux.js.org/" target="_blank">
    <img src="https://img.shields.io/badge/Redux-000000?style=for-the-badge&logo=redux&logoColor=white" alt="Redux">
  </a>
  <a href="https://axios-http.com/" target="_blank">
    <img src="https://img.shields.io/badge/Axios-000000?style=for-the-badge&logo=axios&logoColor=white" alt="Axios">
  </a>
  <a href="https://nativewind.dev/" target="_blank">
    <img src="https://img.shields.io/badge/NativeWind-000000?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="NativeWind">
  </a>
</div>
<br>
<p align="center">
  &copy; 2025 Janindu Lokitha
</p>

---