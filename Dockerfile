FROM php:8.3-apache

# Install required system packages and PHP extensions
RUN apt-get update && apt-get install -y \
    git \
    curl \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    zip \
    unzip \
    && docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Install Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# Configure Apache DocumentRoot to Laravel's public directory
ENV APACHE_DOCUMENT_ROOT=/var/www/html/public
RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/sites-available/*.conf \
    && sed -ri -e 's!/var/www/!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/apache2.conf /etc/apache2/conf-available/*.conf \
    && echo '<Directory /var/www/html/public>\n    AllowOverride All\n    Require all granted\n</Directory>' >> /etc/apache2/apache2.conf \
    && a2enmod rewrite

# Set working directory
WORKDIR /var/www/html

# Copy application files
COPY . /var/www/html

# Install production PHP dependencies
RUN composer install --no-dev --optimize-autoloader --no-interaction

# Set appropriate permissions for Laravel storage and bootstrap/cache
RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache \
    && chmod -R 775 /var/www/html/storage /var/www/html/bootstrap/cache

# Render injects $PORT (defaults to 80 if not set)
EXPOSE 80

CMD sh -c "PORT=\${PORT:-80} && sed -i \"s/Listen 80/Listen \$PORT/g\" /etc/apache2/ports.conf && sed -i \"s/:80/:\$PORT/g\" /etc/apache2/sites-available/000-default.conf && apache2-foreground"
