const {iwa, iwaId, iwaIdUrl} = require('instagram-without-api-node');
require('events').EventEmitter.defaultMaxListeners = 15;



const _userAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36'      // <!-- required!! please get your user-agent from your browser console (7)
const _xIgAppId = '936619743392459'                 // <!-- required!! please get your x-ig-app-id from your browser console (8)

let head = {
    headers: {
        'cookie': null,
        'user-agent': _userAgent,
        'x-ig-app-id': _xIgAppId
    }
}

function passCookies(cookies_) {
    head.headers.cookie = cookies_;
    console.log('Cookies passed');
}

async function _iwa(profile) {

    // get the latest 12 feeds from an account (example https://www.instagram.com/orsifrancesco/)

    return await iwa({

        headers: head.headers,

        base64images: true,                    // <!-- optional, but without it, you will be not able to store/show images
        maxImages: 12,                           // <!-- optional, 12 is the max number
        file: "instagram-cache.json",           // <!-- optional, instagram-cache.json is by default
        pretty: true,                           // <!-- optional, prettyfy json true/false
        time: 3600,                             // <!-- optional, reload contents after 3600 seconds by default

        id: profile                     // <!-- id is required
    })
}

async function _iwaIdUrl(pict) {

    // get picture and info from instagram id url (example https://www.instagram.com/p/Cgczi6qMuh1/)

    return await iwaIdUrl({

        headers: head.headers,

        base64images: false,                    // <!-- optional, but without it, you will be not able to store/show images
        file: "instagram-cache-byidurl.json",   // <!-- optional, instagram-cache.json is by default
        pretty: true,                           // <!-- optional, prettyfy json true/false
        time: 3600,                             // <!-- optional, reload contents after 3600 seconds by default

        id: pict                       // <!-- id is required
    })
}

async function _iwaId(id) {

    // get picture and info from instagram id (2890411760684296309 is the id of https://www.instagram.com/p/Cgczi6qMuh1/)

    const responseIwaId = await iwaId({

        headers: head.headers,

        base64images: false,                    // <!-- optional, but without it, you will be not able to store/show images
        file: "instagram-cache-byid.json",      // <!-- optional, instagram-cache.json is by default
        pretty: true,                           // <!-- optional, prettyfy json true/false
        time: 3600,                             // <!-- optional, reload contents after 3600 seconds by default

        id: id                         // <!-- id is required
    })

    console.log({responseIwaId});

}

// _iwaId('3048220363071837400');
// _iwaIdUrl('CpNdEUiAlTY');
_iwa('elsa__rud');

module.exports = {
    passCookies,
    _iwa,
    _iwaId,
    _iwaIdUrl
};
