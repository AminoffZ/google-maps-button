#!/bin/bash
echo "Starting script in directory: $(pwd)"

# Remove existing zip files to ensure that new zip commands replace them completely
rm -f firefox.zip
rm -f chrome.zip

echo "Removing any existing archives..."

# Navigate into the dist directory to zip its contents without including the 'dist' folder itself for firefox.zip
cd dist
echo "Creating firefox.zip with contents of dist..."
zip -r ../firefox.zip *
cd ..

# Now, zip the entire 'dist' folder for chrome.zip
echo "Creating chrome.zip including dist folder..."
zip -r chrome.zip dist

echo "Zipping complete."
