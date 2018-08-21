
const migTool = require('./tool.js');
const admins = require('./data/admin');

migTool.initApp()
    .then(() => {
        return Promise.all([
            migTool.initModel('admin', admins, { drop: true })
        ])
    })
    .then(results => {
        console.log(results)
        process.exit();
    })
    .catch(err => {
        console.log(err);
        process.exit();
    })