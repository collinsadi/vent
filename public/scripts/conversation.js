
const id = localStorage.getItem("id")
const message = document.getElementById("user-message")
    

const userId = location.href.split("/").pop()

const sendMessage = async () => {

    const chatContainer = document.querySelector(".chat-container");
    
    const response = await fetch("/message/new", {
        method: "POST",
        headers: {
            "Content-Type":"application/json"
        },
        body: JSON.stringify({
            message: message.value,
            to:userId
        })
    })

    const data = await response.json()

    if(data.messages.length > 0){

        chatContainer.innerHTML = data.messages.map(message => {

            return `
            
            <div class="chat-bubble ${message.from == id ? "user-bubble" : "bot-bubble"}">
      
        <p>${message.message}</p>

        </div>
            
            `
            
        }).join("")


    }

    


}


// sendMessage()