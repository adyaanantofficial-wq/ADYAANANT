# ADYAANANT - Local Development Server Setup

## 🚀 Quick Start - Run the Website Locally

### Option 1: Python (Recommended)
```bash
# Navigate to your project directory
cd "c:\Users\prana\OneDrive\Desktop\adyaanant"

# Start local server (Python 3)
python -m http.server 8000

# Or for Python 2
python -m SimpleHTTPServer 8000
```

### Option 2: Node.js (if installed)
```bash
# Install http-server globally
npm install -g http-server

# Start server
http-server -p 8000
```

### Option 3: PHP (if installed)
```bash
php -S localhost:8000
```

### Option 4: Using VS Code Extension
- Install "Live Server" extension in VS Code
- Right-click on `index.html` → "Open with Live Server"

## 🌐 Access Your Website

Once the server is running, open your browser and go to:
```
http://localhost:8000
```

## 🔧 Troubleshooting

### Problem: "shop.html not opening when clicking Shop Now"
**Solution:** This happens because you're opening HTML files directly in the browser. Always use a local server!

### Problem: Links not working
**Solution:** Ensure you're accessing via `http://localhost:8000`, not `file://`

### Problem: Port already in use
**Solution:** Change the port number (e.g., 8001, 8080)

## 📁 Project Structure
```
adyaanant/
├── index.html          # Homepage
├── shop.html           # Shop page
├── contact.html        # Contact page
├── ABOUT US.html       # About page
├── PRIVACY POLICY...   # Privacy policy
├── logo.png            # Logo image
└── README.md           # Project info
```

## 🎯 Navigation Links
- **Home:** `index.html`
- **Shop:** `shop.html`
- **About:** `ABOUT US.html`
- **Contact:** `contact.html`
- **Privacy:** `PRIVACY POLICY and TERMS & CONDITIONS.html`
