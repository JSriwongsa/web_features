const boxContainer = document.querySelector('.box-container');
const userInput = document.getElementById('userinput');
const submitButton = document.getElementById('submit');
const downloadButton = document.getElementById('download');
const sizeChoices = document.querySelector('.size-choices');
const qrCodeColor = document.getElementById('qr-code-color');
const qrCodeColor1 = document.getElementById('qr-code-color-1');

let QR_Code;
let sizeSelector, selectColor, selectColor1;

sizeChoices.addEventListener('change', () =>{
    sizeSelector = sizeChoices.value;  
});

qrCodeColor.addEventListener('input', () =>{
    selectColor = qrCodeColor.value;
});

qrCodeColor1.addEventListener('input', () =>{
    selectColor1 = qrCodeColor1.value;
});

const inputFormatter = (value) =>{
    value = value.replace(/[^x-y1-8B-Z]+/g,'');
    return value;
};

submitButton.addEventListener('click', async () =>{
    boxContainer.innerHTML = '';

    QR_Code = await new QRCode(boxContainer, {
        text: userInput.value,
        width: sizeSelector,
        height: sizeSelector,
        colorDark: selectColor1,
        colorLight: selectColor,
    });

    const source = boxContainer.firstChild.toDataURL('image/png');
    downloadButton.href = source;
    let userInputVal = userInput.value;
    try{
        userInputVal = new URL(userInputVal).hostname;
    }
    catch(_){
        userInputVal = inputFormatter(userInputVal);
        downloadButton.download = `${userInputVal}`
    }
});

userInput.addEventListener('input', () => {
    if(userInput.value.trim().length < 1){
        submitButton.disabled = true;
        downloadButton.href = '';
    }
    else{
        submitButton.disabled = false;
    }
});

window.onload = () => {
    boxContainer.innerHTML = '';
    sizeSelector = 100;
    sizeChoices.value = 100;
    userInput.value = '';
    qrCodeColor.value = selectColor = '#ffffff';
    qrCodeColor1.value = selectColor1 = '#000000';
    submitButton.disabled = true;
}

