const compression = require('compression');
const helmet = require('helmet');
const express = require('express');

const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 3001;

express()
    .use(helmet())
    .use(compression())
    .use(express.static('./dist'))
    .listen(PORT, () =>
        console.log(`✅  Server started: http://${HOST}:${PORT}`)
    );
