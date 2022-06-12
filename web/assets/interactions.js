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

document.addEventListener("DOMContentLoaded", function(e) {
  const currentTheme = localStorage.getItem('@alugaste/theme');
  if (currentTheme === "dark") {
    setDarkTheme();
  }
});

document.getElementById('load-rooms').addEventListener("click", (currentPage = 0) => {
  fetch(`/rooms/json?page=${currentPage + 1}`)
    .then((response) => response.json())
    .then((res) => {
      res.forEach(room => {
        rooms_container = document.getElementsByClassName('container-imoveis')[0]
        let card = document.createElement("div");
        card.classList.add('imovel', 'card')
        let room_link = document.createElement("a");
        room_link.setAttribute('href', `/rooms/${room._id}`)
        let img_imovel_div = document.createElement('div')
        img_imovel_div.classList.add('img-imovel')
        let imovel_image = document.createElement('img')
        imovel_image.setAttribute('src', '/')
        let info_imovel = document.createElement('div')
        info_imovel.classList.add('info-imovel')
        let h31 = document.createElement('h3')
        let h42 = document.createElement('h4')
        let h43 = document.createElement('h4')
        h31.textContent = `${room.name} (${room.reviewMean} ⭐)`
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
    })
});