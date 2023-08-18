const username = document.getElementById("username")
const password = document.getElementById("password")
const errorStatus = document.getElementById("error")
const joinBtn = document.getElementById("join_btn")


const newUser = async () => {
    
    const response = await fetch("/user/login", {
        method: 'POST',
        headers: {
            "Content-Type":"application/json"
        },
        body: JSON.stringify({
            usersname: username.value,
            password:password.value
        })
    })


    const data = await response.json()

    console.log(data)

    if (!data.status) {
        errorStatus.style.color = "red"
        errorStatus.innerHTML = data.message
    }

    if (data.status) {
        errorStatus.style.color = "green"
        errorStatus.innerHTML = data.message

        setTimeout(() => {

            localStorage.setItem("id", data.user._id)
            localStorage.setItem("username", data.user.usersname)
            window.location.href = "/me/chats"
            
            
        }, 1000);
    }
}

joinBtn.addEventListener("click", (e) => {

    e.target.innerHTML = "Loging in..."

    setTimeout(() => {
        newUser()
            .then(() => {
            e.target.innerHTML = "Log In"
        })
    }, 1000);

})
