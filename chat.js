const chatWindow = document.getElementById('chat');
const messageInput = document.getElementById('messageInput');
const sendButton = document.getElementById('sendButton');
const locationButton = document.getElementById('locationButton');

const socket = new WebSocket('wss://echo.websocket.org');

socket.onmessage = function(event) {
    if (event.data && !event.data.includes("Request served by")) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message-receiver';
        messageDiv.textContent = event.data; // Отображает сообщения от сервера
        chatWindow.appendChild(messageDiv);
        chatWindow.scrollTop = chatWindow.scrollHeight;
    }
};

sendButton.onclick = function() {
    const message = messageInput.value;
    if (message) {
        const messageDiv = document.createElement('div');
        messageDiv.textContent = `Я: ${message}`;
        chatWindow.appendChild(messageDiv);
        socket.send(message);
        messageInput.value = '';
        chatWindow.scrollTop = chatWindow.scrollHeight;
    }
};

locationButton.onclick = function() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            const locationMessage = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
            socket.send(locationMessage);
        }, function() {
            alert('Не удалось получить гео-локацию.');
        });
    } else {
        alert('Гео-локация не поддерживается этим браузером.');
    }
};
