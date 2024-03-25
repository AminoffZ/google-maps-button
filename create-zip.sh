#!/bin/bash
echo "Starting script in directory: $(pwd)"
# Navigate into the dist directory to zip its contents without including the 'dist' folder itself for firefox.zip
cd dist
zip -r ../firefox.zip *
cd ..

# Now, zip the entire 'dist' folder for chrome.zip
zip -r chrome.zip dist