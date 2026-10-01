//browser

const socket=io();

socket.on('clients-total', (data) => {
  clientsTotal.innerText=`Total Clients: ${data}`
})

const clientsTotal = document.getElementById('client-total')
const messageContainer = document.getElementById('message-container')
const nameInput = document.getElementById('name-input')
const messageForm = document.getElementById('message-form')
const messageInput = document.getElementById('message-input')

const messageTone= new Audio('/tone.mp3')

messageForm.addEventListener('submit',(e)=>{

  e.preventDefault()
  sendMessage()
   

})





socket.on('clients-total', (data) => {
    clientsTotal.innerText = `Total Clients: ${data}`;
});

//live update of no of clients

function sendMessage(){

 if(messageInput.value==""){
  return
 }


  
  console.log(messageInput.value)

  const data={
    name: nameInput.value,
    message:messageInput.value,
    dateTime:new Date()
  }
  
  socket.emit('message', data)
    addMessagetoUI(true, data)
messageInput.value=''
}

//this is for recieving message from our end and rendering it to ui
socket.on('message', (data) => {
  //  console.log(data);
  messageTone.play()
  addMessagetoUI(false, data)
})


function addMessagetoUI(isownMessage,data){
   
  const element=`<li class= "${isownMessage? "message-right": "message-left"}" >
    <p class="message">
      ${data.message}
      <span>${data.name} ● ${moment(data.dateTime).format('DD MMMM HH:mm')}</span>
    </p>
  </li>
  `;
   

  messageContainer.innerHTML+=element
  scrollToBottom()
}


function scrollToBottom(){
  messageContainer.scrollTo(0,messageContainer.scrollHeight)
}

messageInput.addEventListener('focus',(e)=>{
  socket.emit('feedback', {
    feedback: `✍${nameInput.value} is typing...`
  })
})

messageInput.addEventListener('keypress',(e)=>{
  socket.emit('feedback', {
    feedback: `✍${nameInput.value} is typing...`
  })
})

messageInput.addEventListener('blur',(e)=>{
  socket.emit('feedback', {
    feedback: ``
  })
})

const feedbackElement = document.getElementById('feedback');

   socket.on('feedback', (data) => {
    feedbackElement.innerHTML = `<li class="message-feedback">
<p class="feedback" id="feedback" style="color: black">
${data.feedback}
</p>
</1i>`;


  });