sequenceDiagram
    participant browser
    participant server
    browser->>server: GET spa
    server-->>browser: html and css
    browser->>server: Get spa js
    server-->>browser: javascript logic
    browser->>server: Get data json
    server->>browser: raw json notes
    