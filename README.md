# Jitendra Patel

## Installation

PHP 8.2 required 

- `cp .env.example .env`
- `composer install`
- `php artisan key:generate`
- `php artisan jwt:secret`
- Edit `.env` and set your database connection details

Node version 20 required 
- `yarn`
- `yarn run dev`

Create a new user by starting `php artisan tinker`

- `\App\Models\User::create(['email' => 'email@address.tld', 'name' => 'Name', 'password' => bcrypt('password')]);`

Please login with this created user's credentials and click on `Click here to test customer web route...` button to test issue https://github.com/PHP-Open-Source-Saver/jwt-auth/issues/290
