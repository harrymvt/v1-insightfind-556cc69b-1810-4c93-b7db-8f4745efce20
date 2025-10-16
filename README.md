# InsightFind: A Minimalist Article Search Interface

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/harrymvt/generated-app-20251016-180811)

InsightFind is a visually stunning, minimalist single-page web application designed for searching and browsing a curated list of articles. The application provides an elegant and intuitive interface for users to instantly search through article titles and filter by topics. The core experience is centered around a clean, spacious layout with a prominent search bar. Results are displayed in a responsive grid of beautifully designed cards, each representing an article. The entire application is built on the client-side, fetching and parsing a local CSV file containing article data, ensuring a fast and seamless user experience without backend dependencies.

## Key Features

- **Minimalist & Focused UI**: A clean, uncluttered interface that prioritizes content and user experience.
- **Instant Client-Side Search**: Real-time search results as you type, powered by client-side logic for maximum speed.
- **Topic Filtering**: Easily filter articles by predefined topics with a single click.
- **Responsive Design**: A flawless experience across all devices, from mobile phones to desktops.
- **Zero Backend**: The entire application runs in the browser, parsing a local CSV file for data.
- **Polished Micro-interactions**: Smooth animations and hover effects provide a delightful user experience.

## Technology Stack

- **Framework**: React (with Vite)
- **Styling**: Tailwind CSS with shadcn/ui components
- **State Management**: Zustand
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Data Parsing**: Papaparse
- **Deployment**: Cloudflare Workers

## Getting Started

Follow these instructions to get a local copy of the project up and running for development and testing purposes.

### Prerequisites

You need to have [Bun](https://bun.sh/) installed on your machine.

### Installation

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/your-username/insightfind.git
    ```
2.  **Navigate to the project directory:**
    ```sh
    cd insightfind
    ```
3.  **Install dependencies:**
    ```sh
    bun install
    ```

## Development

To run the application in development mode with hot-reloading:

```sh
bun run dev
```

The application will be available at `http://localhost:3000`.

### Customizing Data

The article data is sourced from `public/articles.csv`. To use your own data, simply modify this file. Ensure it maintains the following columns: `title`, `url`, and `topic`.

## Deployment

This project is configured for seamless deployment to Cloudflare Pages.

1.  **Build the application:**
    ```sh
    bun run build
    ```
2.  **Deploy to Cloudflare:**
    ```sh
    bun run deploy
    ```

Alternatively, you can deploy your own instance with a single click.

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/harrymvt/generated-app-20251016-180811)