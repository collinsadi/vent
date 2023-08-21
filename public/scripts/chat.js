
const chatsContainer = document.getElementById('chats-container')
const id = localStorage.getItem("id")
const username = localStorage.getItem("username")
const newMessageButton = document.getElementById("new-message")
const usersContainer = document.getElementById("users-container")


const fetchChats = async () => {
    
    const response = await fetch("/chats", {
        method: "GET",
        headers: {
            "Content-Type":"application/json"
        }
    })

    const data = await response.json()

    //console.log(data)

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



const fetchUsers = async () => {
    

    const response = await fetch("/users", {
        method: "GET",
        headers: {
            "Content-Type":"application/json"
        }
    })

    const data = await response.json()

    usersContainer.innerHTML += data.users.map(user => {
        
        return `
        
        <div class="single-chat">

           

            <div class="user-image">
                <img src="/images/user.jpg" alt="men">
            </div>

            <div class="chat-right">

                <a href="/me/chats/${user._id}">
                <h3>${user.usersname}</h3>
                </a>


            </div>

        </div>
        
        
        `


    }).join("")

    //console.log(data)

}



newMessageButton.addEventListener("click", () => {

    usersContainer.style.display = "block"
    fetchUsers()

})