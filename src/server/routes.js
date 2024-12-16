const postPredictHandler = require('./handler');
const getHistoriesHandler = require('./getHistoriesHandler');

const routes = [
    {
        path: '/predict',
        method: 'POST',
        handler: postPredictHandler,
        options: {
            payload: {
                allow: 'multipart/form-data',
                multipart: true
            }
        }
    },
    {
        path: '/predict/histories',
        method: 'GET',
        handler: getHistoriesHandler
    }
];

module.exports = routes;