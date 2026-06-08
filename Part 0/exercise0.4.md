sequenceDiagram
    participant browser
    participant server
    browser->>server: POST new note
    server-->>browser: reload
    browser->>server: GET new note
    server-->>browser: return HTML, CSS, Javascript
    browser->>server: Get json data
    server-->>browser: update notes list