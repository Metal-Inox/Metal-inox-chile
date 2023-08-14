document.addEventListener("submit", (e)=> {
    e.preventDefault()

    const $nameForm = document.getElementById("name").value,
        $emailForm = document.getElementById("email").value,
        $subjectForm = document.getElementById("subject").value,
        $messageForm = document.getElementById("message").value,
        $form = document.getElementById("form"),
        $loader = document.getElementById("loader"),
        $errMessage = document.getElementById("errMessage"),
        $sentMessage = document.getElementById("sentMessage"),
        $errName = document.getElementById("errName"),
        $errEmail = document.getElementById("errEmail"),
        $errSubject = document.getElementById("errSubject"),
        $errComment = document.getElementById("errComment")

    let expresionName = /^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/, 
        expresionAdress = /[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})/i,
        expresionTitle = /^[\w'\-,.][^?÷?¿/\\+=@#$%ˆ*(){}|~<>;:[\]]{2,}$/,
        expresionComment = /^[\w'\-,.][^÷\ˆ]{2,300}$/

    if(expresionName.test($nameForm) === false){
        return $errName.classList.remove("hidden")
    }else{
        $errName.classList.add("hidden")
    }
    
    if(expresionAdress.test($emailForm) === false){
        return $errEmail.classList.remove("hidden")
    }else{
        $errEmail.classList.add("hidden")
    }
    
    if(expresionTitle.test($subjectForm) === false){
        return $errSubject.classList.remove("hidden")
    }else{
        $errSubject.classList.add("hidden")
    }
        
    if(expresionComment.test($messageForm) === false){
        return $errComment.classList.remove("hidden")
    }else{
        $errComment.classList.add("hidden")
    }

    $loader.classList.remove("hidden")

    fetch("https://formsubmit.co/ajax/metalinox362@gmail.com", {
    method: "POST",
    headers: { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
    body: JSON.stringify({
        nombre: $nameForm,
        correo: $emailForm,
        asunto: $subjectForm,
        mensaje: $messageForm
    })
    })
    .then(response => response.json())
    .then(data => {
        console.log(data)
        $sentMessage.classList.remove("hidden")
        $form.reset()
    })
    .catch(error => {
        console.log(error)
        $errMessage.classList.remove("hidden")
    })
    .finally(end => {
        $loader.classList.add("hidden")
    })

})