const btnStart = document.getElementById('btnStart');
const btnRecording = document.getElementById('btnRecording');
const btnFinish = document.getElementById('btnFinish');
const btnSaveGifo = document.getElementById('btnSaveGifo');
//console.log(btnSaveGifo);

const centerCont = document.getElementById('center-cont');
const title = document.getElementById('title');
const paragraph = document.getElementById('paragraph');
const preview = document.getElementById('video');
const recordedGifo = document.getElementById('recordedGifo');

const paso1 = document.getElementById('paso1');
const paso2 = document.getElementById('paso2');
const paso3 = document.getElementById('paso3');

const paso1H5 = document.getElementById('paso1H5');
const paso2H5 = document.getElementById('paso2H5');
const paso3H5 = document.getElementById('paso3H5');

const timeRecorder = document.getElementById('time');
const repeatSnapshot = document.getElementById('repeatSnapshot');

const arrayMisGifos = [];

const apiKey = 'SNJ9a5GbDjgSmOddC8ab03rQXLhxjPvS';

title.innerHTML = 'Aqui podras <br>crear tus propios <span>GIFOS</span>';
paragraph.innerHTML = '¡Crea tu GIFO en solo 3 pasos!<br>(solo necesitas una camara para grabar un video)';


//--- eventos ---

btnStart.addEventListener('click', () => {
    getStreamAndRecord();
});

btnRecording.addEventListener('click', () => {
    createGifo();
});

btnFinish.addEventListener('click', () => {
    stopCreatingGif();
});

btnSaveGifo.addEventListener('click', () => {
    uploadCrateGif();
});

//--- funciones ----
let recorder;

const getStreamAndRecord = async () => {
    if (recorder) {
        recorder.destroy();
    }
    title.innerHTML = '¿Nos das acceso<br> a tu camara?';
    paragraph.innerHTML = 'El acceso a tu camara sera valido solo<br> por el tiempo en el que este creando el GIFO.';

    paso1.classList.toggle('paso_active');
    paso1H5.classList.toggle('h5_active');

    btnStart.classList.add('hidden');

    await navigator.mediaDevices.getUserMedia({
        audio: false,
        video: {
            height: { max: 480 }
        }
    })
        .then((mediaStreamObj) => {

            paso1.classList.toggle('paso_active');
            paso1H5.classList.toggle('h5_active');

            paso2.classList.toggle('paso_active');
            paso2H5.classList.toggle('h5_active');

            title.classList.add('hidden');
            paragraph.classList.add('hidden');

            preview.classList.remove('hidden');


            btnRecording.classList.remove('hidden');

            preview.srcObject = mediaStreamObj;
            preview.play();
            recorder = RecordRTC(mediaStreamObj, {
                type: 'gif', frameRate: 1, quality: 10, width: 360, hidden: 240, onGifRecordingStarted: function () { }
            });
        })
        .catch((err) => console.log(err));
};

let timer;

const createGifo = () => {
    btnRecording.classList.add('hidden');
    btnFinish.classList.remove('hidden');

    timeRecorder.classList.remove('hidden');

    recorder.startRecording();
    timer = setInterval(timeActive, 1000);

};

let form;
let blob;
let hours = '00';
let minutes = '00';
let seconds = '00';
const stopCreatingGif = () => {

    form = new FormData();
    form.delete('file');
    preview.classList.add('hidden');
    btnFinish.classList.add('hidden');
    btnSaveGifo.classList.remove('hidden');
    recordedGifo.classList.remove('hidden');
    timeRecorder.classList.add('hidden');
    repeatSnapshot.classList.remove('hidden');
    repeatSnapshot.addEventListener('click', (e) => {
        e.preventDefault;
        repeatSnapshot.classList.add('hidden');
        recordedGifo.classList.add('hidden');

        btnRecording.classList.add('hidden');
        btnSaveGifo.classList.add('hidden');

        paso1.classList.remove('paso_active');
        paso1H5.classList.remove('h5_active');

        paso2.classList.add('paso_active');
        paso2H5.classList.add('h5_active');

        paso3.classList.remove('paso_active');
        paso3H5.classList.remove('h5_active');

        getStreamAndRecord();
    });

    paso2.classList.remove('paso_active');
    paso2H5.classList.remove('h5_active');

    paso3.classList.add('paso_active');
    paso3H5.classList.add('h5_active');

    recorder.stopRecording(() => {
        blob = recorder.getBlob();
        recordedGifo.src = URL.createObjectURL(blob);
        form.append('file', recorder.getBlob(), 'myGif.gif');
    });
    clearInterval(timer);
    hours = '00';
    minutes = '00';
    seconds = '00';
    timeRecorder.innerText = `${hours}:${minutes}:${seconds}`;
};

let myGifID;
const uploadCrateGif = async () => {
    repeatSnapshot.classList.add('hidden');
    timeRecorder.classList.add('hidden');
    btnSaveGifo.classList.add('hidden');
    let divBgSaving = document.createElement('div');
    divBgSaving.classList.add('divBgSaving');
    centerCont.appendChild(divBgSaving);
    let text = document.createElement('h3');
    text.classList.add('text');
    text.textContent = 'Estamos subiendo tu gifo';
    divBgSaving.appendChild(text);
    let imgLoad = document.createElement('div');
    imgLoad.classList.add('imgLoad');
    divBgSaving.appendChild(imgLoad);
    await fetch(`https://upload.giphy.com/v1/gifs?=${form}&api_key=${apiKey}`, {
        method: 'POST',
        body: form,
    })
        .then((res) => res.json())
        .then((myGif) => {
            myGifID = myGif.data.id;
            let btnMyGif = document.createElement('div');
            btnMyGif.classList.add('btnMyGif');
            divBgSaving.appendChild(btnMyGif);
            let btnDownload = document.createElement('div');
            btnDownload.classList.add('btnDownload');
            btnMyGif.appendChild(btnDownload);
            let btnLink = document.createElement('div');
            btnLink.classList.add('btnLink');
            btnMyGif.appendChild(btnLink);
            imgLoad.classList.remove('imgLoad');
            imgLoad.classList.add('imgOK');
            text.textContent = 'Gifo subido con exito';
            btnDownload.addEventListener('click', async() => {
                let a = document.createElement('a');
                let response = await fetch(`https://media2.giphy.com/media/${myGifID}/giphy.gif`);
                let file = await response.blob();
                a.download = 'mi Gifo';
                a.href = window.URL.createObjectURL(file);
                a.dataset.downloadurl = ['application/octet-stream', a.download, a.href].join(':');
                a.click();
            });
           /*  btnLink.addEventListener('click',(e)=>{
                let aux = document.createElement('input');
                aux.value = `https://media2.giphy.com/media/${myGifID}/giphy.gif`;
                document.body.appendChild(aux);
                aux.select();
            }) */
            const objectGifo = {
                id : myGifID,
                url: `https://media2.giphy.com/media/${myGifID}/giphy.gif`,
                title: 'Mi Gifo'
            };
            arrayMisGifos.push(objectGifo);
            localStorage.setItem('Mis Gifos', JSON.stringify(arrayMisGifos));
        });
};


const timeActive = () => {
    seconds++;
    if (seconds < 10) seconds = `0` + seconds;
    if (seconds > 59) {
        seconds = `00`;
        hours++;
        if (hours < 10) hours = `0` + hours;
    }
    timeRecorder.innerHTML = `${hours}:${minutes}:${seconds}`;
};