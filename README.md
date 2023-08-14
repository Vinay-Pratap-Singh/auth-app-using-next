# Full Stack Authentication App

## Project Overview

This is a full stack authentication app developed using Next.js, Tailwind CSS, and Mailtrap. The app is designed to provide a comprehensive user authentication experience with features such as login, logout, password recovery, email verification, and more. The project serves as a learning exercise and draws inspiration from Hitesh Choudhary's Next.js course series on YouTube.

## Features

- User registration and login functionality.
- Password reset using the Mailtrap email service.
- Email verification to enhance security.
- Profile management for authenticated users.
- Responsive design optimized for both mobile and laptop devices.
- Route protection to control user access.

## Technologies Used

- [Next.js](https://nextjs.org/): A React framework for building server-rendered applications.
- [Tailwind CSS](https://tailwindcss.com/): A utility-first CSS framework for creating responsive designs.
- [Mailtrap](https://mailtrap.io/): An email service for testing and development purposes.

## Getting Started

1. Clone the repository:

   ```sh
   git clone https://github.com/your-username/your-auth-app.git
   cd your-auth-app
   ```

2. Install dependencies:
   ```sh
   npm install
   ```
3. Configure environment variables:
   ```sh
   MONGO_DB_URL=your-mongodb-url
   TOKEN_SECRET=your-jwt-secret-key
   DOMAIN=your-domain
   TRANSPORT_USER=your-mailtrap-username
   TRANSPORT_PASS=your-mailtrap-password
   ```
4. Start the development server:
   ```sh
   npm run dev
   ```
5. Open http://localhost:3000 in your browser.

## Acknowledgements

This project is inspired by Hitesh Choudhary's [Next.js course series](https://youtu.be/eaQc7vbV4po) on YouTube. Special thanks to Hitesh for his educational content and guidance.

## Attribution

All the images used in this project is taken from the [Freepik](https://www.freepik.com/).

## License

This project is licensed under the MIT License. For more information, see the LICENSE file.

> Note: This project is intended for educational purposes and may require additional security enhancements before being used in production.
