
# Master Kitchen Solution (MKS) Website

This is the official repository for the Master Kitchen Solution (MKS) e-commerce style product showcase website.

## Overview

The application is a modern, responsive website built with React and styled with Tailwind CSS. It serves as a product catalog and a "request for quote" platform.

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

You will need [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/) installed on your machine.

### Installation

1.  Clone the repository to your local machine:
    ```sh
    git clone <repository-url>
    ```
2.  Navigate to the project directory:
    ```sh
    cd <project-directory>
    ```
3.  Install the required dependencies using npm:
    ```sh
    npm install
    ```

### Running the Application Locally

To start the application in a local development environment, run the following command:

```sh
npm start
```

This will start a local server, and you can view the application by navigating to the URL provided in your terminal (usually `http://localhost:3000`).

## Deployment

This is a static single-page application (SPA) that can be deployed to any modern static hosting provider.

### Hosting Provider Setup

1.  **Choose a Host**: Popular choices include Vercel, Netlify, GitHub Pages, or any cloud provider with static site hosting (e.g., AWS S3, Google Cloud Storage).

2.  **Build Command**: There is no build step required for this project. The files are served as-is.

3.  **Publish Directory**: The root directory of the project should be set as the publish directory.

4.  **Redirects/Rewrites for SPA**: This is the most critical step. Since this is a single-page application using React Router, you must configure your hosting provider to redirect all requests to `index.html`. This allows client-side routing to function correctly.

    -   If you are using the `serve` package (for example, on a custom server), the included `serve.json` file handles this automatically.
    -   For **Netlify**, create a `_redirects` file in the root with the line: `/* /index.html 200`
    -   For **Vercel**, this is typically handled automatically. If not, you can add a `vercel.json` file.
    -   For other providers, consult their documentation for configuring rewrites for an SPA.

### Example Deployment with `serve`

If you are deploying to a server where you have command-line access:

1.  Upload all project files to your server.
2.  Install dependencies: `npm install`
3.  Start the server: `npm start`
4.  It is recommended to use a process manager like `pm2` to keep the server running in the background.
    ```sh
    npm install -g pm2
    pm2 start npm --name "mks-website" -- start
    ```
