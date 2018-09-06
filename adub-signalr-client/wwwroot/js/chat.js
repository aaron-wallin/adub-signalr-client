﻿// The following sample code uses modern ECMAScript 6 features 
// that aren't supported in Internet Explorer 11.
// To convert the sample for environments that do not support ECMAScript 6, 
// such as Internet Explorer 11, use a transpiler such as 
// Babel at http://babeljs.io/. 
//
// See Es5-chat.js for a Babel transpiled version of the following code:

//const connection = new signalR.HubConnectionBuilder()
//    .withUrl("https://adub-signalr-sample.apps.pcf.sandbox.cudirect.com/chatHub", {
//        skipNegotiation: true,
//        transport: signalR.HttpTransportType.WebSockets
//    })
//    .configureLogging(signalR.LogLevel.Information)
//    .build();

const connection = new signalR.HubConnectionBuilder()
    .withUrl("https://adub-signalr-hub.apps.pcf.nonprod.cudirect.com/chatHub")
    .configureLogging(signalR.LogLevel.Information)
    .build();



connection.on("ReceiveMessage", (user, message) => {
    const msg = message.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    const encodedMsg = user + " says " + msg;
    const li = document.createElement("li");
    li.textContent = encodedMsg;
    document.getElementById("messagesList").appendChild(li);
});

connection.onclose(function (e) {
    alert(document.getElementById("userInput").value + 'Connection Closed');

    const msg = 'CONNECTION CLOSED';
    const li = document.createElement("li");
    li.textContent = msg;
    document.getElementById("messagesList").appendChild(li);

    connection.start().catch(err => console.error(err.toString()));

});

connection.start().catch(err => console.error(err.toString()));

document.getElementById("sendButton").addEventListener("click", event => {
    const user = document.getElementById("userInput").value;
    const message = document.getElementById("messageInput").value;
    const from = document.getElementById("userName").value;
    connection.invoke("SendMessage", user, from, message).catch(err => console.error("UNABLE TO SEND MESSAGE: " + err.toString()));
    event.preventDefault();
});

document.getElementById("registerButton").addEventListener("click", event => {
    const user = document.getElementById("userName").value;
    connection.invoke("RegisterUser", user).catch(err => console.error("UNABLE TO SEND MESSAGE: " + err.toString()));
    event.preventDefault();
});