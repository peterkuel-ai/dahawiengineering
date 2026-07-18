# Dahawi Engineering Admin Dashboard

This admin dashboard is a separate interface for editing website files from the `admin/` folder.

## How to use

1. Run a PHP-capable server from the project root. For example:

```bash
cd '/Users/ministerpeterkuel/Files/Web-Designing/Websites/Dahawi Engineering Website/project2/Dahawi Engineering Website'
php -S localhost:8000
```

2. Open the admin dashboard in your browser:

```text
http://localhost:8000/admin/index.html
```

3. Enter the admin password and click **Sign in**.
4. Select a file from the list.
5. Edit the file content and click **Save**.

## Supported file types

The dashboard currently allows editing:
- `.html`
- `.php`
- `.css`
- `.js`
- `.sql`
- `.txt`
- `.json`
- `.md`

## Important security notes

- The default password in `admin/list.php`, `admin/file.php`, and `admin/save.php` is `admin123`. Change it before use.
- This dashboard is only secure when served over a trusted local environment.
- Do not use this interface without proper access control on a public server.

## Files

- `admin/index.html` — admin dashboard UI
- `admin/css/admin.css` — dashboard styles
- `admin/js/admin.js` — dashboard behavior
- `admin/list.php` — list editable files
- `admin/file.php` — load file contents
- `admin/save.php` — save updated content
