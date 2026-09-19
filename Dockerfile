FROM php:8.3-cli

# Install system dependencies and PHP extensions
RUN apt-get update && apt-get install -y \
    git \
    curl \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    libpq-dev \
    zip \
    unzip \
    sqlite3 \
    libsqlite3-dev \
    && docker-php-ext-install pdo_mysql pdo_pgsql pdo_sqlite mbstring exif pcntl bcmath gd \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Install Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# Create user with UID 1000 (standard for Hugging Face Spaces non-root containers)
RUN useradd -m -u 1000 user

WORKDIR /home/user/app

# Copy project files with ownership set to user
COPY --chown=user:user . /home/user/app

# Switch to non-root user
USER user

# Set default production environment variables
ENV APP_ENV=production \
    APP_DEBUG=false \
    APP_KEY=base64:1JnAVNehGzqtCWGaAvhOvt2neYclUoq5siczWTc75+Q= \
    APP_NAME="Dashboard Dekan FMIPA" \
    DB_CONNECTION=sqlite \
    SESSION_DRIVER=cookie \
    CACHE_STORE=file \
    PORT=8000

# Install production PHP dependencies
RUN composer install --no-dev --optimize-autoloader --no-interaction

# Prepare storage, cache, and sqlite database
RUN mkdir -p storage/framework/sessions storage/framework/views storage/framework/cache bootstrap/cache database \
    && touch database/database.sqlite \
    && chmod -R 777 storage bootstrap/cache database

# Port exposed for Koyeb / Container cloud hosting
EXPOSE 8000

CMD ["sh", "-c", "php artisan config:clear && php artisan serve --host=0.0.0.0 --port=${PORT:-8000}"]
