const changeTheme = () => {
  const currentTheme = localStorage.getItem('@alugaste/theme');
  if (currentTheme === "light") {
    setDarkTheme();
  } else {
    setLightTheme();
  }
};

const setDarkTheme = () => {
  const themeIcon = document.getElementById('theme-icon');
  localStorage.setItem('@alugaste/theme', 'dark');
  document.body.classList.add('dark-mode');
  themeIcon.classList.add('fa-moon');
  themeIcon.classList.remove('fa-sun');
}

const setLightTheme = () => {
  const themeIcon = document.getElementById('theme-icon');
  localStorage.setItem('@alugaste/theme', 'light');
  document.body.classList.remove('dark-mode');
  themeIcon.classList.remove('fa-moon');
  themeIcon.classList.add('fa-sun');
}

const updateFontSize = (type) => {
  let fontSizeMultiplier = parseFloat(localStorage.getItem('@alugaste/fontSizeMultiplier')) || 1;
  if (type === '+') {
    fontSizeMultiplier += 0.25;
  } else if (type === '-') {
    fontSizeMultiplier -= 0.25;
  }

  localStorage.setItem('@alugaste/fontSizeMultiplier', fontSizeMultiplier);
  document.body.style.fontSize = `${16 * fontSizeMultiplier}px`;
};

const updateStars = (stars) => {
  const totalStars = parseInt(stars);
  document.getElementsByName('rating')[0].value = stars;
  Array.from(document.getElementsByClassName('form-stars')).forEach((element, index) => {
    if (stars > index) {
      element.classList.add('checked')
    } else {
      element.classList.remove('checked')
    }
  })
}

document.addEventListener("DOMContentLoaded", function(e) {
  const currentTheme = localStorage.getItem('@alugaste/theme');
  if (currentTheme === "dark") {
    setDarkTheme();
  }
  updateFontSize();
});

const editComment = (content) => {
  document.getElementById('show-comment').classList.add("hidden");
  document.getElementById('edit-comment-form').classList.remove("hidden");
  document.getElementById('edit-comment-content').innerText = content;
}

const undoEdit = () => {
  document.getElementById('show-comment').classList.remove("hidden");
  document.getElementById('edit-comment-form').classList.add("hidden");
}

if (document.getElementById('load-rooms')) {
  document.getElementById('load-rooms').addEventListener("click", (currentPage = 0) => {
    next_page = parseInt(document.getElementById('load-rooms').getAttribute('data-page'))
    fetch(`/rooms/json?page=${next_page}`)
      .then((response) => response.json())
      .then((res) => {
        document.getElementById('load-rooms').setAttribute('data-page', next_page + 1)
  
        if (res.length <= 3) {
          document.getElementById('load-rooms').remove()
        }
  
        res.forEach(room => {
          rooms_container = document.getElementsByClassName('container-imoveis')[0]
          let card = document.createElement("div");
          card.classList.add('imovel', 'card')
          let room_link = document.createElement("a");
          room_link.setAttribute('href', `/rooms/${room._id}`)
          let img_imovel_div = document.createElement('div')
          img_imovel_div.classList.add('img-imovel')
          let imovel_image = document.createElement('img')
  
          if (room.photos[0]) {
            imovel_image.setAttribute('src', `data:image/png;base64, ${room.photos[0].toString('base64')}`)
          }
  
          let info_imovel = document.createElement('div')
          info_imovel.classList.add('info-imovel')
          let h31 = document.createElement('h3')
          let h42 = document.createElement('h4')
          let h43 = document.createElement('h4')
          h31.textContent = `${room.name} (${room.reviewMean || 0} ⭐)`
          h42.textContent = room.address
          h43.textContent = `${room.maxGuests} hóspedes`
  
          rooms_container.appendChild(card)
          card.appendChild(room_link)
          room_link.appendChild(img_imovel_div)
          img_imovel_div.appendChild(imovel_image)
          room_link.appendChild(info_imovel)
          info_imovel.appendChild(h31)
          info_imovel.appendChild(h42)
          info_imovel.appendChild(h43)
        })
      });
  });
}
