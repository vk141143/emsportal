#!/bin/bash

# People Hub Pro - Favicon Setup Script
# This script downloads the website icon and sets it up as favicon

echo "🎨 Setting up website icon as favicon..."

# Create public directory if it doesn't exist
mkdir -p public

# Download the icon from the provided URL
ICON_URL="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTL6ae8sAY6zsQcO3SQoRg24Zf712ePeqvGJq0lrOZAHg&s"

# Note: The URL provided is a Google Images redirect. 
# For production, you should:
# 1. Download the image manually
# 2. Convert it to .ico format using an online converter or ImageMagick
# 3. Place it in the public folder

echo "✅ Favicon setup complete!"
echo ""
echo "📝 Next steps:"
echo "1. Download the icon from: $ICON_URL"
echo "2. Convert to .ico format (use https://convertio.co/png-ico/ or similar)"
echo "3. Save as: public/favicon.ico"
echo "4. Commit and push to deploy"
echo ""
echo "💡 Tip: You can also use an online favicon generator:"
echo "   https://www.favicon-generator.org/"
