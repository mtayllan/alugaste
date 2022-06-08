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

const paginateRooms = (currentPage) => {
  fetch(`/rooms/json?page=${currentPage + 1}`).then(function(response) {
    console.log('vc paginou!');
  })
}

document.getElementById('load-rooms').addEventListener("click", paginateRooms());