
const chatsContainer = document.getElementById('chats-container')




const fetchChats = async () => {
    
    const response = await fetch("/chats", {
        method: "GET",
        headers: {
            "Content-Type":"application/json"
        }
    })

    const data = await response.json()

    console.log(data)

    chatsContainer.innerHTML = data.chats.map(chat => {
        
        return `
        
         <div class="single-chat">

           

            <div class="user-image">
                <img src="/images/user.jpg" alt="men">
            </div>

            <div class="chat-right">

                <a href="/me/chats/${chat.to._id}">
                <h3>${chat.to.usersname}</h3>
                <p>${chat.lastmessage}</p>
                </a>


            </div>

        </div>
        
        
        `


    }).join("")

}


fetchChats()