
const chatsContainer = document.getElementById('chats-container')
const id = "64dc7398cb368bad88c221c6"
const username = "collinsadi20"



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
  

        let name;

        if (chat.users[0].usersname === username) {
            
            name = chat.users[1].usersname
        }

        if (chat.users[1].usersname === username) {
            
            name = chat.users[0].usersname
        }

        if (chat.users[1].usersname === username && chat.users[0].usersname === username) {
            
            name = "(You)"
        }

        
        return `
        
         <div class="single-chat">

           

            <div class="user-image">
                <img src="/images/user.jpg" alt="men">
            </div>

            <div class="chat-right">

                <a href="/me/chats/${chat.lastmessage.to === id ? chat.lastmessage.from : chat.lastmessage.to }">
                <h3>${name}</h3>
                <p>${chat.lastmessage.message}</p>
                </a>


            </div>

        </div>
        
        
        `


    }).join("")

}


fetchChats()