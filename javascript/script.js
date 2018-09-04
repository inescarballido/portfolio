window.onload = () => {
  let options = { fullWidth: true, indicators: true};
  let elems = document.querySelectorAll('.carousel');
  if(elems.length > 0) {
    const instances = M.Carousel.init(elems, options);
    const instance = M.Carousel.getInstance(elems[0]);
    let autoplay = setInterval(() => {
      instance.next();
    }, 5000)
  }


  const sendButton = document.getElementById('button-contact');
  const contactMessage = document.getElementById('contact-message');
  if(sendButton) {
    sendButton.addEventListener('click', (e) => {
      e.preventDefault();
      const name = document.querySelector('input[name=name]').value;
      const from = document.querySelector('input[name=email]').value;
      const message = document.querySelector('textarea[name=message]').value;
      const phone = '';
      const to = 'amoroddo@gmail.com';
      const subject = 'Tienes un nuevo correo de tu web!';
      const provider = 'Inés Carballido';
      const data = {name, from, phone, message, provider, to, subject };
      if(name == '' || from == '' || message == '') {
        contactMessage.innerHTML = 'Me ha llegado un silbidto pero para que me llegue el mensaje debes rellenar todos los campos.';
        contactMessage.style.color = '#829399';
        contactMessage.style.display = 'flex';
      } else {
        axios.post('https://emailing-microservice.herokuapp.com/send-email', data)
        .then(res => {
          name.value = '';
          name.from = '';
          name.value = '';
          contactMessage.innerHTML = '¡Genial! Tu mensaje se ha enviado correctamente.';
          contactMessage.style.color = '#8FB29B';
          contactMessage.style.display = 'flex';
        })
        .catch(error => {
          contactMessage.innerHTML = '¡Ups! Por culpa del servidores no se ha enviado el mensaje, ya sabes como son. Puedes escribirme a: amoroddo@gmail.com.';
          contactMessage.style.color = '#829399';
          contactMessage.style.display = 'flex';
          console.log(error)
        })
      }
    })
  }
}
