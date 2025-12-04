# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Production stage
FROM nginx:alpine

# Install gettext for envsubst
RUN apk add --no-cache gettext

# Copy built files from builder
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy nginx configuration
COPY <<EOF /etc/nginx/conf.d/default.conf
server {
    listen 3000;
    server_name localhost;

    root /usr/share/nginx/html;
    index index.html;

    # Gzip compression
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;

    location / {
        try_files \$uri \$uri/ /index.html;
    }

    # Cache static assets
    location ~* \\.(?:css|js|jpg|jpeg|gif|png|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Don't cache index.html
    location = /index.html {
        add_header Cache-Control "no-cache, no-store, must-revalidate";
    }
}
EOF

# Create entrypoint script for runtime environment variable substitution
COPY <<'EOF' /docker-entrypoint.sh
#!/bin/sh
set -e

# Load config if exists
if [ -f /app/config/frontend-config.json ]; then
  export VITE_KAKAO_MAP_API_KEY=\$(cat /app/config/frontend-config.json | grep VITE_KAKAO_MAP_API_KEY | sed 's/.*"VITE_KAKAO_MAP_API_KEY": *"\([^"]*\)".*/\1/')
  export VITE_API_BASE_URL=\$(cat /app/config/frontend-config.json | grep VITE_API_BASE_URL | sed 's/.*"VITE_API_BASE_URL": *"\([^"]*\)".*/\1/')
fi

# Set defaults if not provided
: \${VITE_KAKAO_MAP_API_KEY:=}
: \${VITE_API_BASE_URL:=https://pokssak-api.goorm.training}

# Replace environment variables in index.html
envsubst '\$VITE_KAKAO_MAP_API_KEY \$VITE_API_BASE_URL' < /usr/share/nginx/html/index.html > /usr/share/nginx/html/index.html.tmp
mv /usr/share/nginx/html/index.html.tmp /usr/share/nginx/html/index.html

# Replace in JavaScript files
for file in /usr/share/nginx/html/assets/*.js; do
  if [ -f "\$file" ]; then
    sed -i "s|VITE_API_BASE_URL:\"\"|VITE_API_BASE_URL:\"\${VITE_API_BASE_URL}\"|g" "\$file"
    sed -i "s|import.meta.env.VITE_API_BASE_URL||\${VITE_API_BASE_URL}\"|g" "\$file"
  fi
done

exec nginx -g 'daemon off;'
EOF

RUN chmod +x /docker-entrypoint.sh

EXPOSE 3000

ENTRYPOINT ["/docker-entrypoint.sh"]
