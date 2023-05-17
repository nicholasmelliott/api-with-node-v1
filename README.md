# Twitter Dashboard

This is a simple Twitter dashboard application built with Node.js and Express. It allows users to view their account information, latest tweets, friends, and direct messages. Users can also post new tweets from the dashboard.

## Prerequisites

- Node.js installed on your machine
- Twitter API credentials (consumer key, consumer secret, access token, and access token secret)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/twitter-dashboard.git
   ```

2. Navigate to the project directory:

   ```bash
   cd twitter-dashboard
   ```

3. Install the dependencies:

   ```bash
   npm install
   ```

4. Create a `config.js` file in the project directory and add your Twitter API credentials:

   ```javascript
   module.exports = {
     consumer_key: 'your_consumer_key',
     consumer_secret: 'your_consumer_secret',
     access_token: 'your_access_token',
     access_token_secret: 'your_access_token_secret'
   };
   ```

5. Start the application:

   ```bash
   npm start
   ```

6. Open your browser and visit `http://localhost:3000` to access the Twitter dashboard.

## Usage

The dashboard displays the following information:

- Account information: Name, handle, profile picture, banner image, and number of friends.
- Latest tweets: The five most recent tweets, including the text, retweet count, favorite count, and timestamp.
- Friends: The five most recent friends, including their name, screen name, profile picture, and following status.
- Direct messages: The five most recent direct messages received, including the text, timestamp, and sender information.

You can also post new tweets from the dashboard by entering the tweet text in the input field and clicking the "Tweet" button.

## License

This project is licensed under the [MIT License](LICENSE).
