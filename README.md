# Minecraft Education Edition to Bedrock Converter

This project is a web-based tool that converts Minecraft Education Edition
worlds into a format playable in the vanilla Bedrock client directly on your
device with no installation needed.

After downloading the converted world, you can import it into Minecraft Bedrock
using the "Import" button in the world list.

## Development

### Prerequisites

- Node.js (v22, though older versions probably work)
- pnpm (v9)

### Setup

1. Clone the repository:

```sh
git clone https://github.com/zabackary/mee-to-pe-web.git
cd mee-to-pe-web
```

2. Install dependencies:

```sh
pnpm install
```

3. Run the development server:

```sh
pnpm dev
```

4. Build for production:

```sh
pnpm build
```

5. Preview the production build:

```sh
pnpm preview
```

### Scripts

- `pnpm dev`: Start the development server.
- `pnpm build`: Build the project for production.
- `pnpm preview`: Preview the production build.
- `pnpm check`: Run type checks and linting.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request on
GitHub.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file
for details.
