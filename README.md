# Grants Stack Widget React Component

This widget displays active donation rounds and offers a direct link for contributions to your project. Follow this guide for a quick and easy setup.

## 🚀 Getting Started

### Installation

First, install the widget using npm:

```bash
npm install @gitcoin/grants-stack-widget-react
```

### Usage

Import the `Widget` component and use it in your application as shown below:

```jsx
import Widget from "@gitcoin/grants-stack-widget-react";

<Widget
  projectId={
    "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef"
  }
/>;
```

## 📋 Props

The `Widget` component accepts the following props:

### Required Props

- `projectId: string` (Required): The project ID in bytes32 format (e.g., `0x1234...`).

### Optional Props

- `scale: number` (Optional, default: `1`): Adjust the scale of the widget.
- `testnet: boolean` (Optional, default: `false`): Use testnet configurations.
- `explorerUrl: string` (Optional): Custom explorer URL.
- `indexerEndpoint: string` (Optional): Custom indexer endpoint URL.
- `chainsOverride: number[]` (Optional): Override the list of chain IDs.

## 🔧 Customization

### Scaling the Widget

You can adjust the scale of the widget using the `scale` prop:

```jsx
<Widget
  projectId={
    "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef"
  }
  scale={1.5}
/>
```

### Using Testnet

If you want to show testnet rounds as well, set the `testnet` prop to `true`:

```jsx
<Widget
  projectId={
    "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef"
  }
  testnet={true}
/>
```

### Custom Explorer URL

You can specify a custom Gitcoin Explorer URL using the `explorerUrl` prop:

```jsx
<Widget
  projectId={
    "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef"
  }
  explorerUrl="https://mycustomexplorer.com"
/>
```

### Custom Indexer Endpoint

If you have a custom indexer endpoint, you can set it using the `indexerEndpoint` prop:

```jsx
<Widget
  projectId={
    "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef"
  }
  indexerEndpoint="https://myindexer.com"
/>
```

### Chains Override

To override the list of chain IDs, use the `chainsOverride` prop:

```jsx
<Widget
  projectId={
    "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef"
  }
  chainsOverride={[1, 3, 4]}
/>
```

## 📚 Full Example

Here's a complete example with all props:

```jsx
import React from "react";
import ReactDOM from "react-dom";
import Widget from "@gitcoin/grants-stack-widget-react";

const App = () => (
  <div>
    <Widget
      projectId={
        "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef"
      }
      scale={1.2}
      testnet={true}
      explorerUrl="https://mycustomexplorer.com"
      indexerEndpoint="https://myindexer.com"
      chainsOverride={[1, 42, 100]}
    />
  </div>
);

ReactDOM.render(<App />, document.getElementById("root"));
```

## 🛠️ Development

To contribute or make changes, follow these steps:

1. Clone the repository.
2. Run `npm install` to install dependencies.
3. Run `npm build` to build the package.
4. Make your changes and submit a pull request.

---

For any questions or issues, please open an issue on GitHub or contact the maintainers.

Happy coding! 🚀
