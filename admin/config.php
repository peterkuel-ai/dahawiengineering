<?php
// Admin configuration for the dashboard.
// Replace this password hash with your own secure hash.
// Generate a new hash with: php -r "echo password_hash('YourNewPassword', PASSWORD_DEFAULT);"

$envHash = getenv('DAHAWI_ADMIN_PASSWORD_HASH');
if ($envHash !== false && $envHash !== '') {
    define('ADMIN_PASSWORD_HASH', $envHash);
} else {
    define('ADMIN_PASSWORD_HASH', '$2y$10$slYQmyNdGzin7olVN3p5OPST9/PgBkqquzi8Aib3Z9AUgCvzW5nDm');
}
