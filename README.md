# FVU Reporting Tool

Dies ist ein webbasiertes Meldesystem für das Gymnasium Dresden Klotzsche, mit dem Vorfälle wie Diskriminierung, Rassismus, Mobbing oder andere besorgniserregende Ereignisse gemeldet werden können. Die Meldung kann anonym oder mit Kontaktdaten erfolgen.

## Funktionen

- **Mehrstufiges Formular**: Schrittweise Erfassung aller relevanten Informationen.
- **Dateiupload**: Anhänge wie Screenshots oder Dokumente (JPG, PNG, PDF, max. 5 MB pro Datei).
- **Anonyme Meldung möglich**: Auf Wunsch werden keine Kontaktdaten übermittelt.
- **Empfängerwahl**: Auswahl, wer die Meldung erhalten soll (z.B. Vertrauenslehrer, Schulsozialarbeiter).
- **E-Mail-Versand**: Automatischer Versand der Meldung per EmailJS an die gewählte Ansprechperson.
- **Barrierefreiheit**: Verbesserte Bedienbarkeit und Fokus-Indikatoren.
- **Mehrsprachigkeit**: Texte können über das Attribut `data-i18n` übersetzt werden.

## Installation & Nutzung

1. **Repository herunterladen oder klonen**
2. **Dateien auf einen Webserver oder lokal ablegen**
3. **EmailJS einrichten**  
   - [EmailJS](https://www.emailjs.com/) Konto anlegen
   - Einen Service und ein Template anlegen
   - Die Platzhalter im Template müssen exakt mit den Schlüsseln im JS (`formData`) übereinstimmen (siehe unten)
   - Die Service-ID, Template-ID und User-ID im JS-Code anpassen, falls nötig

4. **index.html** im Browser öffnen

## Wichtige Hinweise zur Konfiguration

- Die Platzhalter im EmailJS-Template müssen exakt wie folgt lauten:
  ```
  {{incident_type}}
  {{recipient_email}}
  {{incident_date}}
  {{incident_location}}
  {{incident_description}}
  {{reporter_name}}
  {{reporter_email}}
  {{send_copy}}
  ```
- Das Datumsformat wird automatisch auf das deutsche Format (TT.MM.JJJJ) gesetzt.

## Projektstruktur

```
fvu-reporting-tool/
│
├── index.html         # Hauptseite mit Formular
├── js/
│   └── app.js        # Haupt-JavaScript für Formular-Logik
├── styles.css         # Haupt-Stylesheet
├── images/            # Logos und Bilder
└── ...                # Weitere Dateien (z.B. about.html, faq.html)
```

## Anpassung

- **Empfängeradressen** können in der Datei `js/app.js` im Objekt `recipientEmails` geändert werden.
- **Texte** können direkt in der `index.html` oder über das Attribut `data-i18n` für Mehrsprachigkeit angepasst werden.
- **Design** kann in der `styles.css` angepasst werden.

## Support

Bei Fragen oder Problemen wenden Sie sich bitte an das IT-Team des Gymnasiums Dresden Klotzsche oder den/die Projektverantwortliche/n.

---

© 2025 Gymnasium Dresden Klotzsche. Alle Rechte vorbehalten.