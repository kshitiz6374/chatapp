const socket =io('http://localhost:8000');

//DOM elements obtained in respective  JS variables
const form =document.getElementById('send-container')

const messageinput= document.getElementById('inpmsg');

const messageContainer =document.querySelector(".container");

//This alert audio will be received by users when notiifed about something 
var audio = new Audio('alert.mp3');

//Function which will append  event information in the container
const append = (message, position)=>{
    const messageElement =document.createElement('div');
    messageElement.innerText =message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
   if(position =='left'){
       audio.play();
   }

}

//Ask New User for His/Her Name and tell the server
const names =prompt("Plz Enter your name");
socket.emit('new-user-joined',names);

//If A new user Joins,Receive the user name from the server

socket.on('user-joined', names =>{

    append(`${names} joined the chat`,'right');

});

//If A message sent By server receive it
socket.on('receive', data =>{

    append(`${data.names}: ${data.message}`,'left');

});

//If A user Leaves the chat, Append The info to the container
socket.on('left', names =>{

    append(`${names} left the chat `,'right');

});


//If The Form gets Submitted ,send Server The message 
form.addEventListener('submit',(e)=>{
    e.preventDefault();//no page reloading
    const message = messageinput.value;
    append(`You:${message}`, 'right');
    socket.emit('send', message);
    messageinput.value=' ';
})

