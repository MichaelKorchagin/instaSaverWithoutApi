let data = null;

async function sendRequest(params) {
    await fetch(
        `http://localhost:3000/post`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(params)
        }
    )
        .then((res) => {
            return res.json();
        })
        .then((res) => {
            data = res;
            console.log(res);

            createGallery();

            // resp = res;
            // content = res.body;
            // document.getElementById('test').innerHTML = res.body;
        })
}
let resp = null;
let content = null;

const applicantForm = document.querySelector('#formForLink');
applicantForm.addEventListener('submit', submit);

function submit(event) {
    event.preventDefault();

    const curLink = document.getElementById('linkInput').value;
    let insParams = null;
    if (curLink.includes('instagram.com/')) {
        insParams = curLink.split('instagram.com/')[1].split('/');
    }

    let params = {
        cookies: document.getElementById('cookiesInput').value
    };

    if (insParams !== null && insParams[0] !== 'p') {
        params.link = insParams[0];
        sendRequest(params);
    } else if (insParams !== null && insParams[0] === 'p') {
        params.post = insParams[1];
        sendRequest(params);
    } else {
        console.log('Params not found!');
        console.log(insParams);
    }
}
const els = document.querySelector('#elsa');
els.addEventListener('click', submitEls);
function submitEls(event) {
    event.preventDefault();
    const param = 'elsa__rud';
    sendRequest(param);
}
const ang = document.querySelector('#angelina');
ang.addEventListener('click', submitAng);
function submitAng(event) {
    event.preventDefault();
    const param = 'angelin_a_michelle';
    sendRequest(param);
}
