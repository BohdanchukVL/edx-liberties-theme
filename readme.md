# Clone
```bash
mkdir /edx-themes
git clone https://github.com/BohdanchukVL/edx-liberties-theme -b master liberties-theme
```

# Change server configuration

In /edx/etc/lms.yml change the following variables to:

```bash
ENABLE_COMPREHENSIVE_THEMING: true
DEFAULT_SITE_THEME: liberties-theme
COMPREHENSIVE_THEME_DIRS:
- /edx-themes
```

# Compile frontend assets

```bash
sudo -H -u edxapp bash
source /edx/app/edxapp/edxapp_env
cd /edx/app/edxapp/edx-platform
paver update_assets lms --settings=production
python manage.py lms --settings=production collectstatic --noinput
```


# Restart services

```bash
sudo /edx/bin/supervisorctl restart all
```