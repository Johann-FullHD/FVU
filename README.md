# FVU Reporting Tool

Dies ist eine Webanwendung für das Gymnasium Dresden Klotzsche, mit der Vorfälle von Diskriminierung, Rassismus, Mobbing oder anderen besorgniserregenden Verhaltensweisen gemeldet werden können. Die Plattform ermöglicht anonyme oder persönliche Meldungen und unterstützt die Schule bei der Bearbeitung und Dokumentation solcher Vorfälle.

## Features

- **Mehrstufiges Meldeformular**: Schrittweises Ausfüllen mit Fortschrittsanzeige.
- **Anonyme oder persönliche Meldung**: Nutzer können entscheiden, ob sie ihre Kontaktdaten angeben möchten.
- **Dateiupload**: Screenshots, Dokumente oder andere Beweise können hochgeladen werden (JPG, PNG, PDF, max. 5 MB pro Datei).
- **Dunkelmodus**: Umschaltbar, speichert die Einstellung im Browser.
- **Zusammenfassung als PDF oder Druck**: Bericht kann vor dem Absenden als PDF gespeichert oder gedruckt werden.
- **Lokale Zwischenspeicherung**: Formularinhalte werden im Local Storage gespeichert und beim erneuten Laden wiederhergestellt.
- **Barrierefreiheit**: Fokus- und Tastatursteuerung, ARIA-Attribute.
- **Mehrsprachigkeit vorbereitet**: Textelemente mit `data-i18n`-Attributen.

## Projektstruktur

```
fvu-reporting-tool/
│
├── about.html           # Info-Seite zur Beschwerdestelle
├── index.html           # Hauptseite mit Meldeformular
├── styles.css           # Zentrales CSS für Layout und Darkmode
├── logo.png             # Schullogo
├── js/
│   └── app.js           # Haupt-JavaScript für Formular-Logik
└── FVU.docx             # (Optional) Dokumentation/Infomaterial
```

## Installation & Nutzung

1. **Herunterladen oder Klonen**  
   Lade das Repository herunter oder klone es auf deinen Webserver.

2. **Öffnen**  
   Öffne `index.html` im Browser, um das Meldeformular zu nutzen.

3. **Abschicken**  
   Das Formular verwendet [EmailJS](https://www.emailjs.com/) für den Versand der Meldungen per E-Mail.  
   Die Konfiguration erfolgt in [`js/app.js`](js/app.js) (Service-ID, Template-ID, User-ID).

4. **Darkmode**  
   Über den Button oben rechts kann zwischen hellem und dunklem Modus gewechselt werden.

## Anpassung

- **Empfänger-E-Mail-Adressen**:  
  Die Zuordnung der Empfänger erfolgt in [`js/app.js`](js/app.js) im Objekt `recipientEmails`.
- **EmailJS-Konfiguration**:  
  Passe Service-ID, Template-ID und User-ID in [`js/app.js`](js/app.js) an dein EmailJS-Konto an.
- **Texte & Übersetzungen**:  
  Alle Textelemente sind mit `data-i18n` versehen und können für Mehrsprachigkeit erweitert werden.

## Datenschutz & Sicherheit

- Es werden keine Daten dauerhaft auf dem Server gespeichert.
- Die Meldungen werden per E-Mail an die ausgewählten Empfänger gesendet.
- Hochgeladene Dateien werden nicht auf dem Server gespeichert, sondern als Anhang verschickt (sofern EmailJS dies unterstützt).

## Lizenz

Dieses Projekt ist für schulische Zwecke erstellt.  
© 2025 Gymnasium Dresden Klotzsche. Alle Rechte vorbehalten.

---

**Kontakt:**  
Karl-Marx-Straße 44, 01109 Dresden  
info@gymnasium-klotzsche.de
