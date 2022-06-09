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

document.addEventListener("DOMContentLoaded", function(e) {
  const currentTheme = localStorage.getItem('@alugaste/theme');
  if (currentTheme === "dark") {
    setDarkTheme();
  }
  updateFontSize();
});

