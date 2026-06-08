sequenceDiagram
    participant browser
    participant server
    browser->>server: user writes text into input field, clicks save; POST new note
    server-->browser: HHTP status 201 upload new note
