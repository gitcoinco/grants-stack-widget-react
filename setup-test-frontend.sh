#!/bin/bash

# Remove existing test-frontend folder if it exists
if [ -d "test-frontend" ]; then
  rm -rf test-frontend
fi

# Build the package (ensure built files exist before linking)
npm run build

npm link

# Check for npm errors and potentially fix them
if [ $? -eq 1 ]; then
  echo "** Warning: npm errors encountered during build. Cleaning cache..."
  npm cache clean --force
  echo "** Try running the script again."
  exit 1
fi

# Create test-frontend folder
mkdir -p test-frontend
cd test-frontend

# Initialize a new React app
npx create-react-app . --template typescript -y

# Link the local widget dependency (using relative path)
npm link @gitcoin/grants-stack-widget-react

# Overwrite App.js with the widget implementation
cat <<EOL > src/App.tsx
import React from "react";
import Widget from "@gitcoin/grants-stack-widget-react";

const App = () => (
  <div>
    <Widget
      projectId={
        "0x0ad4d07d45ef3c6807b71f09342201baee881e13b67906d7067df59588dd4879"
      }
      testnet={true}
      // scale={1}
      // explorerUrl="https://mycustomexplorer.com"
      // indexerEndpoint="https://myindexer.com"
      // chainsOverride={[1, 42, 100]}
    />
  </div>
);

export default App;
EOL

echo "Test frontend setup complete. Navigate to './test-frontend' and run 'npm start' to start the development server."
