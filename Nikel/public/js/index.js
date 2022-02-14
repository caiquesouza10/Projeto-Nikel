const myModal = new bootstrap.Modal("#register-modal");

let logged = sessionStorage.getItem("logged");

const session = localStorage.getItem("session");

checkLogged();


//Logar no Sistema
document.getElementById("login-form").addEventListener("submit", function (e){
    e.preventDefault();

    const email = document.getElementById("email-input").value;
    const password = document.getElementById("password-input").value;
    const checkSession = document.getElementById("session-check").checked;

    const account = getAccount(email);

    if(!account){
        alert("Opps! Verifique o usuario ou a senha novamente.");
        return;
    }

    if(account){
        if(account.password !== password){
            alert("Opps! Verifique o usuario ou a senha novamente.");
            return;
        }

        saveSession(email, checkSession);

        window.location.href = "home.html";
    }
});



// criar conta
document.getElementById("create-form").addEventListener("submit", function(e){
    //preventDefault faz com que fique na mesma pagina e nao mude para uma externa.(na propria aplicação)
    e.preventDefault(); 

    const email = document.getElementById("email-create-input").value;
    const password = document.getElementById("password-create-input").value;

    if(email.length < 5){
        alert("Preencha o campo com um email valido");
        return;
    }


    if(password.length < 4 ){
        alert("Preencha com no minimo 4 digitos");
        return;
    }

    saveAccount({
        login: email,
        password: password,
        transaction: []
    });

    myModal.hide();  // modal do bootstrap


    alert("Conta criada com sucesso!!!")
});


//verifica se esta logado a sessão
function checkLogged(){     
    if(session){
        sessionStorage.setItem("logged", session);

        logged = session;
    }

    if(logged){
        saveSession(logged, session);

        window.location.href = "home.html";
    }
}     



function saveAccount(data){
    localStorage.setItem(data.login, JSON.stringify(data))  // JSON.stringify transforma um obejeto em uma string (tudo uma palavra só)

}


//salvar sessão 
function saveSession(data, saveSession){
    if(saveSession){
        localStorage.setItem("session", data);
    }

    sessionStorage.setItem("logged", data);
}

function getAccount(key){
    const account = localStorage.getItem(key);

    if(account){
        return JSON.parse(account);   //desfaz a string e volta a ser um objeto
    }

    return "";
}

