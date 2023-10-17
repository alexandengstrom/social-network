# Social Network
This project, developed as part of the "TDP013" course at Linköping University, was created for educational purposes in web development. It's a basic social networking platform using Node, React, Express, and MongoDB, with features like friend requests, wall posts, and real-time chat via sockets.

I've also focused on testing and code coverage. I used the Mocha testing framework to ensure that the code works as intended and C8 for tracking how much of the code is tested. This project is primarily a learning exercise with practical application and a focus on code quality.

A notable aspect of this project is that it was primarily developed using callbacks, aligning with a specific goal of the course. While callbacks were the focus, there were cases where the use of the `await` keyword might have been more suitable, demonstrating a balance between educational objectives and practical considerations.
### Installation
Clone the repository with the following command:
```bash
git clone git@github.com:alexandengstrom/social-network.git
```

Install the dependencies for the frontend:
```bash
cd frontend
npm install
```

Install the dependencies for the backend:
```bash
cd backend
npm install
```

You also need to create the .env file in the backend directory. This file should contain these variables:
```
JWT_SECRET
FIREBASE_API_KEY
FIREBASE_MESSAGING_SENDER_ID
FIREBASE_APP_ID
FIREBASE_MEASUREMENT_ID
```

### Setup
To start the backend server, run the following command:
```bash
cd backend
npm run dev
```

To start the frontend server, run the following command:
```bash
cd frontend
npm run dev
```

### Testing
To run all available test, run the following command:
```bash
cd backend
npm test
```

To create code coverage, run the following command:
```bash
cd backend
npm run coverage
```
