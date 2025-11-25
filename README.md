# Hacker Theme for Nginx Proxy Manager

This theme transforms NPM into a Matrix-style hacker interface with jude.me.uk branding.

## Installation via Custom Locations

1. **Deploy the theme files** to a web server or local directory accessible by NPM
   
   Option A: Copy files to NPM data directory:
   ```bash
   mkdir -p ./data/custom-theme
   cp custom-theme/* ./data/custom-theme/
   ```

   Option B: Host on a separate web server (recommended)

2. **Configure Nginx Proxy Manager**

   - Go to **Proxy Hosts**
   - Edit your NPM proxy host (e.g., `npm.jude.me.uk`)
   - Go to **Custom Locations** tab
   - Add these locations:

### Custom Location 1: CSS Theme
```
Define location: = /custom-theme.css
Scheme: http (or file://)
Forward Hostname/IP: localhost (or path to file)
Forward Port: (blank if using file path)
```

Under **Advanced** tab, add:
```nginx
alias /data/custom-theme/hacker-theme.css;
add_header Content-Type text/css;
add_header Cache-Control "no-cache, must-revalidate";
```

### Custom Location 2: JS Theme
```
Define location: = /custom-theme.js
Scheme: http
Forward Hostname/IP: localhost
Forward Port: (blank)
```

Under **Advanced** tab, add:
```nginx
alias /data/custom-theme/hacker-logo.js;
add_header Content-Type application/javascript;
add_header Cache-Control "no-cache, must-revalidate";
```

### Custom Location 3: Inject into HTML
```
Define location: /
```

Under **Advanced** tab, add:
```nginx
# Inject theme files into HTML
sub_filter '</head>' '<link rel="stylesheet" href="/custom-theme.css"><script src="/custom-theme.js"></script></head>';
sub_filter_once on;
sub_filter_types text/html;
```

## Alternative: Direct Injection via Advanced Config

In your proxy host's **Advanced** tab, add:

```nginx
location / {
    # Normal proxy settings
    proxy_pass $forward_scheme://$server:$port$request_uri;
    
    # Inject theme
    sub_filter '</head>' '<link rel="stylesheet" href="https://your-cdn.com/hacker-theme.css"><script src="https://your-cdn.com/hacker-logo.js"></script></head>';
    sub_filter_once on;
    sub_filter_types text/html;
}

# Serve theme files
location = /custom-theme.css {
    alias /data/custom-theme/hacker-theme.css;
    add_header Content-Type text/css;
}

location = /custom-theme.js {
    alias /data/custom-theme/hacker-logo.js;
    add_header Content-Type application/javascript;
}
```

## Quick Test

You can also inject directly via browser console to test:

```javascript
// Inject CSS
const css = document.createElement('link');
css.rel = 'stylesheet';
css.href = '/custom-theme.css'; // or full URL
document.head.appendChild(css);

// Inject JS
const js = document.createElement('script');
js.src = '/custom-theme.js'; // or full URL
document.body.appendChild(js);
```

## Features

✅ Matrix-style green on black theme
✅ Terminal/hacker aesthetic
✅ Glowing effects on interactive elements
✅ Custom jude.me.uk branding
✅ Animated scanline effects
✅ Custom scrollbars
✅ Blinking cursor effect
✅ Works without rebuilding Docker container

## Troubleshooting

- **Theme not loading?** Check browser console for 404 errors
- **Permission denied?** Ensure NPM has read access to theme files
- **Changes not appearing?** Clear browser cache or add `?v=123` to URLs
