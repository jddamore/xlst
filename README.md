# xlst

This repository uses a node module (saxon-js) to transform a C-CDA document into HTML displayable on screen. It was originally developed for the August 23/24 2023 C-CDA Implement-a-thon hosted by HL7. 

Specifically this web interface demonstrates the re-ordering possible of C-CDA document sections. 

To install dependencies (once you download and install nodejs: https://nodejs.org/en/download/package-manager)
``` npm i ```

To launch website locally:
```node app.js```

To just see a transform on your computer, you can just run the covert script
```node convert.js```

The C-CDA document it uses is based on a 2015 certified EHR sample. It's title bates.xml and feel free to switch. The modified CDA stylesheet for this to happen is located here: https://github.com/mjszczep/cda-core-xsl/tree/15-add-support-for-reordering-of-section-display
