# Social Network
This project, developed as part of the "TDP013" course at Linköping University, was created for educational purposes in web development. It's a basic social networking platform using Node, React, Express, and MongoDB, with features like friend requests, wall posts, and real-time chat via sockets.

I've also focused on testing and code coverage. I used the Mocha testing framework to ensure that the code works as intended and C8 for tracking how much of the code is tested. This project is primarily a learning exercise with practical application and a focus on code quality.

The site is designed to be accessible on both desktop and mobile devices, offering a responsive and user-friendly experience. However, it's important to note that live chatting functionality is exclusively available on the desktop version of the platform.

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

### Images
When a user opens the feed:
![Screenshot from 2023-10-17 16-14-51](https://github.com/alexandengstrom/social-network/assets/123507241/c1d3229c-c682-4b07-b5ef-cd9bafbc2f01)

Chatting with other users:
![Screenshot from 2023-10-17 16-17-09](https://github.com/alexandengstrom/social-network/assets/123507241/af0ba177-e243-48a7-b9a3-be58b84ccaad)




