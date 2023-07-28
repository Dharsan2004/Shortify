
# Scalable Shortify

Scalable Shortify is a URL shortening service built using HTML, Bootstrap, JavaScript, Express, Node.js, Redis, and Git. It allows you to encode URLs using the MD5 hashing algorithm and provides caching using Redis to improve response times.

## Features

- URL encoding algorithm using SHA512
- Caching using Redis for improved response times
- Scalable architecture

## Installation and Local Setup

To run Scalable Shortify locally, please follow the instructions below:

### Prerequisites

- Node.js (version >= 12.0.0)
- Redis (version >= 5.0.0)

### 1. Clone the repository

Clone the Scalable Shortify repository to your local machine using the following command:





```bash
 git clone https://github.com/your-username/scalable-shortify.git
```


### 2. Install dependencies

Navigate to the project directory and install the required dependencies by running the following command:

```bash
cd scalable-shortify
npm install
```


### 3. Configure Redis

Make sure Redis is installed and running on your local machine. If not, you can download it from the official Redis website and follow the installation instructions.

### 4. Set up environment variables

Create a `.env` file in the root directory of the project and provide the following environment variables:

```bash
REDIS_HOST=localhost
REDIS_PORT=6379
```

Adjust the values according to your Redis configuration.

### 5. Start the application

Start the application by running the following command:

```bash
npm start
```

This will start the Node.js server and make the application available at `http://localhost:3000`.

## Usage

Once the application is running locally, you can access it through your web browser or use API endpoints to interact with the URL shortening service.

### Web Interface

Open your preferred web browser and navigate to `http://localhost:3000` to access the web interface. Enter a long URL and click the "Shorten" button to generate a shortened URL using the MD5 hashing algorithm.

### API Endpoints

- **Shorten a URL:**

  - **Endpoint:** `/api/shorten`
  - **Method:** POST
  - **Request body:**
    ```json
    {
      "url": "https://example.com/very/long/url"
    }
    ```
  - **Response:**
    ```json
    {
      "shortUrl": "http://localhost:3000/abcd1234"
    }
    ```

- **Redirect to original URL:**

  - **Endpoint:** `/:shortCode`
  - **Method:** GET
  - **Response:** Redirects to the original URL associated with the provided `shortCode`.

## Contributing

Contributions are welcome! If you want to contribute to Scalable Shortify, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Make the necessary changes and commit them.
4. Push your branch to your forked repository.
5. Submit a pull request with a detailed description of your changes.

Please make sure to follow the code style and provide appropriate tests for your changes.

## License

Scalable Shortify is open-source software licensed under the [MIT license](https://opensource.org/licenses/MIT).

## Contact

If you have any questions or suggestions, please feel free to contact the project maintainer at [dharsansrinivasan@gmail.com](mailto:dharsansrinivasan@gmail.com).
