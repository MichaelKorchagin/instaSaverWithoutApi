const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const {_iwa, _iwaIdUrl, _iwaId, passCookies} = require("./requests");

const port = 3000;

const app = express();
app.use(cors());
app.use(express.urlencoded({extended: true}))
const urlencodedParser = bodyParser.urlencoded({
    extended: false,
})
app.use(express.json());

const paramsMap = {
    cookies: 'cookies',
    link: 'link',
    post: 'post'
}
const defaultParamState = null;
let paramState = defaultParamState;

function resetParamState() {
    paramState = defaultParamState;
}

function getParamsOnServer(allUrlParams) {
    if (paramState === defaultParamState) {
        paramState = allUrlParams.split('&').reduce(
            (acc, param) => {
                const [paramKey, paramValue] = param.split('=');  // сплитим в разные переменные

                console.log('');
                console.log('key: ', paramKey);
                console.log('value: ', paramValue);

                const paramName = paramsMap[paramKey];

                console.log('param name: ', paramName);

                if (!paramName) {
                    throw new Error('Incorrect parameter');   // проверка на существование
                }
                acc[paramName] = paramValue;
                return acc;
            }, {}
        );
    }
    return paramState;
}


app.get('/get', cors(), async function (
    request,
    response
) {
    console.log('Got request:');

    const paramObj = getParamsOnServer(request.url.split('?')[1]);

    response.header('Content-Type', 'application/json');

    try {
        let items = null;
        if (paramObj.hasOwnProperty('link')) {
            // passCookies(paramObj.cookies);
            items = await _iwa(paramObj.link);
        } else if (paramObj.hasOwnProperty('post')) {
            // passCookies(paramObj.cookies);
            items = await _iwaIdUrl(paramObj.post);
        }

        response.send({items});
        console.log(`-> Response sent`);
        resetParamState();
    } catch (error) {
        response.status(500).json({error: error.message});
    }
});


app.post('/post', cors(), urlencodedParser, express.json(), async function (
    request,
    response
) {
    if (!request.body) return response.sendStatus(400);

    response.header('Content-Type', 'application/json');

    console.log(request.body);

    try {
        let items = null;
        passCookies(request.body.cookies);
        if (request.body.hasOwnProperty('link')) {
            items = await _iwa(request.body.link);
        } else if (request.body.hasOwnProperty('post')) {
            items = await _iwaIdUrl(request.body.post);
        }

        response.send({items});
        console.log(`-> Response sent`);
    } catch (error) {
        response.status(500).json({error: error.message});
    }
});

app.listen(port, () => console.log(`Server started on port: ${port}`));