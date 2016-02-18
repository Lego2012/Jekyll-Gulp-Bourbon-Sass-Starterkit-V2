# Leo's Jekyll Template mit Bourbon, Neat, Bitters powered by Gulp und Sass
##### Inspiriert von [stefanimhoff.de](http://stefanimhoff.de/)

### Aktuell ist der Branch `develop`!

## Installation
Klone das Repository auf Deinen Computer und wechsle in den Projektordner. Starte:

```sh
$ ./install-dev.sh
```

Damit werden automatisch `bundle`, `bower install` und `npm install` gestartet.

## Einstellungen

Öffne `gulpFiles/config.js` und ändere die Einstellungen falls nötig. Allerdings müssen eigentlich nur die `rsync` Einstellungen tatsächlich angepasst werden. Ändere `destination` zum Pfad Deines Webservers und ändere `hostname` und `username`.

## Gulp.js starten

Drei Tasks sind verfügbar:

```sh
$ gulp
$ gulp publish
$ gulp deploy
```

- `gulp` baut die Assets zusammen, erstellt die Jekyll Site, kopiert die Bitters-Gridsettings aus dem `bitters-adjusted` Ordner in `app/_assets/scss/0-plugins/base`, kopiert die `bower-components/normalize-css/normalize.css` in `app/_assets/scss` und benennt sie in `_normalize.scss` um, damit sie von der `main.scss` korrekt importiert werden kann und startet den Entwicklungsserver. Abschließend wird der `watch` Task gestartet.
- `gulp publish` kopiert und optimiert die Assets und startet ein Production-Build von Jekyll.
- `gulp deploy` transferiert die generierten Dateien mit Rsync auf den Server.
