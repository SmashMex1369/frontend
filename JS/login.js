const form = document.getElementById('form')
const URL = 'https://backend-production-3215.up.railway.app'
const CREATE = 201

form.addEventListener('submit', async ( e ) => {
    e.preventDefault()
  
    const user = document.getElementById('user').value
    const password = document.getElementById('password').value
  
    if(user==""){
      const verificacion=document.getElementById('lbConfirmacionCorreo');
      verificacion.innerHTML ="Correo invalido";
    }  
    if(password==""){
      const verificacion2=document.getElementById('lbConfirmacionPassword');
      verificacion2.innerHTML ="Contraseña invalida";
    }
    
  
    try {
      const data = await axios.post(URL+"/loging", {
        "correo": user,
        "password": password
      })
      if(user=="eje@eje.com"&&password=="123"){
          alert("Bienvenido al sistema "+ user)
          location.href ='https://smashmex1369.github.io/frontend/HTML/ADMINISTRADOR/principal_admin.html';
          console.log(data.data);
      }else{
          alert("Bienvenido al sistema "+ user)
          location.href ='https://smashmex1369.github.io/frontend/HTML/CLIENTE/principal_cliente.html';
          console.log(data.data);
      }
  
    } catch (error) {
     console.log(error);
    }
  })