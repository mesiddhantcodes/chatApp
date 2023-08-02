const socket=io()

let textarea=document.querySelector('#textarea')
let messageArea=document.querySelector('.message_area')
let name;
do{
    name =prompt('Please Enter the name:');
}while(!name)

textarea.addEventListener('keyup',(e)=>{
    if(e.key==='Enter')
    {
        sendMessage(e.target.value)
    }
})


function sendMessage(mesg)
{
    let msg={
        user:name,
        message:mesg.trim()
    }
    appendMessag(msg,'outgoing')
    textarea.value=''
    scrollTobottom()
    socket.emit('message',msg)
}

function appendMessag(msg,type)
{
    let mainDiv=document.createElement('div');
    let className=type
    mainDiv.classList.add(className,'message')

    let markUp=`
    <h4>${msg.user}</h4>
    <p>${msg.message}</p>
    `

    mainDiv.innerHTML=markUp;

    messageArea.appendChild(mainDiv)
}

// receiving

socket.on('message',(msg)=>{
   appendMessag(msg,'incoming')
   scrollTobottom()
})


function scrollTobottom()
{
    messageArea.scrollTop=messageArea.scrollHeight
}