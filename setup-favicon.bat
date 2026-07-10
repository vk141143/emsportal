@echo off
REM People Hub Pro - Favicon Setup Script (Windows)
REM This script helps set up the website icon as favicon

echo.
echo 🎨 Setting up website icon as favicon...
echo.

REM Create public directory if it doesn't exist
if not exist "public" mkdir public

echo.
echo ✅ Favicon setup complete!
echo.
echo 📝 Next steps:
echo 1. Download the icon from:
echo    https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTL6ae8sAY6zsQcO3SQoRg24Zf712ePeqvGJq0lrOZAHg
echo.
echo 2. Convert to .ico format using:
echo    - https://convertio.co/png-ico/
echo    - https://www.favicon-generator.org/
echo    - ImageMagick: convert image.png favicon.ico
echo.
echo 3. Save as: public/favicon.ico
echo.
echo 4. Commit and push to deploy
echo.
echo 💡 Tip: Use an online favicon generator for best results
echo.
pause
