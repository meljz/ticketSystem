FROM php:8.3-cli

# Install system dependencies
RUN apt-get update && apt-get install -y \
    git \
    curl \
    zip \
    unzip \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    libpq-dev

# Install PHP extensions needed by Lumen (PostgreSQL FIX)
RUN docker-php-ext-install pdo pdo_pgsql mbstring

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Set working directory
WORKDIR /var/www

# Copy project
COPY . .

# Install dependencies
RUN composer install --no-dev --optimize-autoloader

# Lumen needs writable storage (important)
RUN chmod -R 775 storage bootstrap/cache || true

# Expose Render port
EXPOSE 10000

# Start Lumen using PHP built-in server -> NEWLY ADDED
CMD php artisan migrate --force && php -S 0.0.0.0:10000 -t public 