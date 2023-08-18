
const id = localStorage.getItem("id")
const username = localStorage.getItem("username")
let Name;
const headerTitle = document.getElementById("user-name")

const message = document.getElementById("user-message")
     const chatContainer = document.querySelector(".chat-container");

const userId = location.href.split("/").pop()


const goback = () => {
    history.back()
}

const getMessages = async ()=>{

    const response = await fetch("/message/users/get", {
        method: "POST",
        headers: {
            "Content-Type":"application/json"
        },
        body: JSON.stringify({
            to:userId
        })
    })


    const data = await response.json()



    console.log(data)

    if(data.messages.length > 0){

        chatContainer.innerHTML = data.messages.map(message => {

            if(message.from.usersname === username){

                Name = message.to.usersname
            }
            if(message.to.usersname === username){

                Name = message.from.usersname
            }

            return `
            
            <div class="chat-bubble ${message.from._id == id ? "user-bubble" : "bot-bubble"}">
      
        <p>${message.message}</p>

        </div>
            
            `
            
        }).join("")


    }

    headerTitle.innerHTML = Name

    console.log(Name)

        chatContainer.scrollIntoView({behavior:"smooth",block:"end",inline:"nearest"})

}

const sendMessage = async () => {

   
    
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

    message.value = ""

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

getMessages()




// sendMessage()