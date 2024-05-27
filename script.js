function encryptMessage() {
    const message = document.getElementById('message').value;
    const key = document.getElementById('key').value;

    if (!message || !key) {
        alert('Lütfen mesaj ve anahtarı girin.');
        return;
    }

    const encrypted = CryptoJS.AES.encrypt(message, key).toString();
    const resultElement = document.getElementById('result');
    resultElement.innerHTML = `<strong>Şifrelenmiş Mesaj:</strong> ${encrypted}`;
    appendCopyButton(resultElement, encrypted); // Kopyalama işaretini ekleyin
}

function decryptMessage() {
    const encryptedMessage = document.getElementById('message').value;
    const key = document.getElementById('key').value;

    if (!encryptedMessage || !key) {
        alert('Lütfen şifrelenmiş mesaj ve anahtarı girin.');
        return;
    }

    try {
        const decrypted = CryptoJS.AES.decrypt(encryptedMessage, key);
        const originalMessage = decrypted.toString(CryptoJS.enc.Utf8);

        if (!originalMessage) {
            throw new Error('Çözme başarısız oldu.');
        }

        const resultElement = document.getElementById('result');
        resultElement.innerHTML = `<strong>Çözülmüş Mesaj:</strong><br>${originalMessage}`;
    } catch (error) {
        alert('Şifre çözme başarısız oldu. Lütfen geçerli bir anahtar ve şifrelenmiş mesaj girin.');
    }
}

function appendCopyButton(parentElement, message) {
    const copyButton = document.createElement('button');
    copyButton.innerHTML = '&#128203;'; // Kopyalama işareti (📋)
    copyButton.className = 'copy-button'; // Stil vermek için sınıf ekle
    copyButton.onclick = function() {
        copyToClipboard(message);
    };
    parentElement.insertAdjacentHTML('beforeend', ' '); // Araya boşluk ekleyin
    parentElement.insertAdjacentElement('beforeend', copyButton); // Kopyalama işaretini ekle
}

function copyToClipboard(text) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    alert('Mesaj panoya kopyalandı.');
}
