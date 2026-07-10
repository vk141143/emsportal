#!/usr/bin/env python3
"""
Download and convert Google icon to favicon
"""

import urllib.request
import os
from PIL import Image
import io

def download_and_convert_favicon():
    """Download the icon and convert to favicon"""
    
    # Create public directory if it doesn't exist
    os.makedirs('public', exist_ok=True)
    
    # Icon URL
    icon_url = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTL6ae8sAY6zsQcO3SQoRg24Zf712ePeqvGJq0lrOZAHg&s"
    
    print("🎨 Downloading Google icon...")
    
    try:
        # Download the image
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        }
        req = urllib.request.Request(icon_url, headers=headers)
        with urllib.request.urlopen(req) as response:
            image_data = response.read()
        
        # Open image
        img = Image.open(io.BytesIO(image_data))
        
        # Convert to RGB if necessary
        if img.mode in ('RGBA', 'LA', 'P'):
            background = Image.new('RGB', img.size, (255, 255, 255))
            background.paste(img, mask=img.split()[-1] if img.mode == 'RGBA' else None)
            img = background
        
        # Resize to favicon size
        img = img.resize((256, 256), Image.Resampling.LANCZOS)
        
        # Save as ICO
        favicon_path = 'public/favicon.ico'
        img.save(favicon_path, 'ICO', sizes=[(256, 256), (128, 128), (96, 96), (64, 64), (48, 48), (32, 32), (16, 16)])
        
        print(f"✅ Favicon created: {favicon_path}")
        
        # Also save PNG versions for better compatibility
        png_sizes = [
            ('public/favicon-16x16.png', (16, 16)),
            ('public/favicon-32x32.png', (32, 32)),
            ('public/apple-touch-icon.png', (180, 180)),
            ('public/android-chrome-192x192.png', (192, 192)),
        ]
        
        for path, size in png_sizes:
            resized = img.resize(size, Image.Resampling.LANCZOS)
            resized.save(path, 'PNG')
            print(f"✅ Created: {path}")
        
        print("\n🎉 All favicon files created successfully!")
        print("\nFiles created:")
        print("  - public/favicon.ico")
        print("  - public/favicon-16x16.png")
        print("  - public/favicon-32x32.png")
        print("  - public/apple-touch-icon.png")
        print("  - public/android-chrome-192x192.png")
        
    except Exception as e:
        print(f"❌ Error: {e}")
        print("\nFallback: Using placeholder favicon")
        # Create a simple placeholder
        img = Image.new('RGB', (256, 256), color=(66, 133, 244))  # Google blue
        img.save('public/favicon.ico', 'ICO')
        print("✅ Placeholder favicon created")

if __name__ == '__main__':
    download_and_convert_favicon()
