# Deutsches Datum / Monatsnamen mit Jekyll

## Erste Methode:
Quelle: [jekyll-localized-date](https://gist.github.com/pattulus/3743007)

{{ date: "%d. %B %Y" | replace:"January","Januar" | replace:"February","Februar" | replace:"March","März" | replace:"May","Mai" | replace:"June","Juni" | replace:"July","Juli" | replace: "October","Oktober" | replace:"December","Dezember" }}

## Zweite Methode

Quelle: [Jekyll Blog](http://jekyllblog.de/2015/02/09/deutsches-datum-monatsnamen-mit-jekyll/)

## Für Hauptseite `index.html und Archiv:

Im `_includes` Ordner gibt es zwei neue HTML-Dateien: `date.html` und `date_post.html`.
Nun einfach an den Stellen wo z.B. in `ìndex.html` ein Datum auftaucht, den Schnipsel `{{ post.date | date_to_string }}` mit `{% include date.html %}` ersetzen.

Jetzt wird an der gleichen Stelle stets ein deutsches Datumsformat (Tag Monat Jahr) angezeigt.
