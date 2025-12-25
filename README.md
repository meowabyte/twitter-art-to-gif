# ArtToGIF for Twitter

A simple web tool designed to help artists convert their artwork into GIF format. The primary goal is to help prevent AI tools from easily scraping or using the images when posted on platforms like Twitter/X.

## Features

-   **Client-Side Processing:** All conversions happen locally in your browser using WebAssembly. Your images are never uploaded to a remote server.
-   **Batch Processing:** Convert multiple images at once.
-   **AI Protection:** Converts static images into GIFs to deter AI scraping tools.

## Tech Stack

-   **Framework:** [Svelte 5](https://svelte.dev/) (SvelteKit)
-   **Build Tool:** [Vite](https://vitejs.dev/)
-   **Image Processing:** [ImageMagick (WASM)](https://github.com/dlemstra/magick-wasm)
-   **Language:** TypeScript

## Development

To run this project locally:

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd twitter-art-to-gif
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # or
    bun install
    ```

3.  **Start the development server:**
    ```bash
    npm run dev
    # or
    bun run dev
    ```

4.  **Open your browser:**
    Navigate to `http://localhost:5173` (or the port shown in your terminal).

## Building

To create a production build (static site):

```bash
npm run build
```

You can preview the production build using:

```bash
npm run preview
```

## Contributing

Contributions are welcome! If you have suggestions for improvements or bug fixes, please feel free to submit a Pull Request.

1.  Fork the repository.
2.  Create your feature branch (`git checkout -b feature/AmazingFeature`).
3.  Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4.  Push to the branch (`git push origin feature/AmazingFeature`).
5.  Open a Pull Request.

## License

This project is licensed under the [MIT License](LICENSE).