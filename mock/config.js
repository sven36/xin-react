const fs = require('fs');

const configList = [

    {
        url: '/vip/classifyDisplay',
        type: 'get',
        // delay: 1000,
        dataPath: '/db/orgList.json'
        // customRouter: function (req, res) {
        //     const resulteData = fs.readFileSync(__dirname + '/db/test.json', 'utf-8');
        //     res.send(JSON.parse(resulteData));
        // }
    },
    {

        url: '/vipinfo',
        type: 'get',
        // delay: 3000,
        dataPath: '/db/vipInfo.json'
    },
    {
        url: '/apply',
        type: 'get',
        delay: 1000,
        dataPath: '/db/apply.json'
    },
    {

        url: '/test/aaa',
        type: 'post',
        delay: 1000,
        dataPath: '/db/delay.json'
    }

];

module.exports = configList;
