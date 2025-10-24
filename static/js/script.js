'use strict';


// theme toggle handling
const rootElement = document.documentElement;
const themeToggleBtn = document.querySelector("[data-theme-toggle]");
const themeSequence = ["sunrise", "twilight", "aurora"];

const safeGetStoredTheme = () => {
  try {
    return localStorage.getItem("preferred-theme");
  } catch (error) {
    return null;
  }
};

const safeStoreTheme = (theme) => {
  try {
    localStorage.setItem("preferred-theme", theme);
  } catch (error) {
    // storage might be unavailable (e.g., privacy mode); ignore gracefully
  }
};

const iconForTheme = (theme) => {
  switch (theme) {
    case "twilight":
      return "moon-outline";
    case "aurora":
      return "planet-outline";
    default:
      return "sunny-outline";
  }
};

const applyTheme = (theme) => {
  const normalizedTheme = themeSequence.includes(theme) ? theme : themeSequence[0];
  rootElement.setAttribute("data-theme", normalizedTheme);

  if (themeToggleBtn) {
    const iconElement = themeToggleBtn.querySelector("ion-icon");
    if (iconElement) {
      iconElement.setAttribute("name", iconForTheme(normalizedTheme));
    }

    const nextTheme =
      themeSequence[(themeSequence.indexOf(normalizedTheme) + 1) % themeSequence.length];

    themeToggleBtn.setAttribute("aria-label", `Switch to ${nextTheme} theme`);

    const srText = themeToggleBtn.querySelector(".visually-hidden");
    if (srText) {
      srText.textContent = `Switch to ${nextTheme} theme`;
    }
  }
};

const resolvedInitialTheme = (() => {
  const storedTheme = safeGetStoredTheme();
  if (storedTheme && themeSequence.includes(storedTheme)) {
    return storedTheme;
  }
  const prefersDark = window.matchMedia
    ? window.matchMedia("(prefers-color-scheme: dark)").matches
    : false;
  if (prefersDark) {
    return "twilight";
  }
  const currentTheme = rootElement.getAttribute("data-theme");
  return themeSequence.includes(currentTheme) ? currentTheme : themeSequence[0];
})();

applyTheme(resolvedInitialTheme);

if (themeToggleBtn) {
  themeToggleBtn.addEventListener("click", () => {
    const currentTheme = rootElement.getAttribute("data-theme") || themeSequence[0];
    const currentIndex = themeSequence.indexOf(currentTheme);
    const nextTheme = themeSequence[(currentIndex + 1) % themeSequence.length];
    applyTheme(nextTheme);
    safeStoreTheme(nextTheme);
  });
}

if (window.matchMedia) {
  const colorSchemeQuery = window.matchMedia("(prefers-color-scheme: dark)");
  colorSchemeQuery.addEventListener("change", (event) => {
    const storedTheme = safeGetStoredTheme();
    if (storedTheme) {
      return;
    }
    applyTheme(event.matches ? "twilight" : "sunrise");
  });
}


// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });


// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { elementToggleFunc(this); });

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);

  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {

  for (let i = 0; i < filterItems.length; i++) {

    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }

  }

}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {

  filterBtn[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;

  });

}

// Select project modal elements
const projectModalContainer = document.querySelector("[data-modal-container-project]");
const projectOverlay = document.querySelector("[data-overlay-project]");
const projectModalCloseBtn = document.querySelector("[data-modal-close-btn-project]");

const projectModalImg = document.querySelector("[data-project-modal-img]");
const projectModalTitle = document.querySelector("[data-project-modal-title]");
const projectModalText = document.querySelector("[data-project-modal-text]");
const projectModalRepo = document.querySelector("[data-project-modal-repo]");
const projectModalDemo = document.querySelector("[data-project-modal-demo]");

if (projectModalContainer && projectModalContainer.parentElement !== document.body) {
  document.body.appendChild(projectModalContainer);
}

let storedScrollTop = 0;

const setBodyScrollLock = (shouldLock) => {
  if (shouldLock) {
    storedScrollTop = window.pageYOffset || document.documentElement.scrollTop || 0;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.setProperty("--scrollbar-compensation", `${Math.max(scrollbarWidth, 0)}px`);
    document.body.classList.add("modal-open");
  } else {
    document.body.classList.remove("modal-open");
    document.body.style.removeProperty("--scrollbar-compensation");
    window.scrollTo(0, storedScrollTop);
  }
};

const openProjectModal = () => {
  if (!projectModalContainer || !projectOverlay) {
    return;
  }
  projectModalContainer.classList.add("active");
  projectOverlay.classList.add("active");
  projectModalContainer.scrollTop = 0;
  setBodyScrollLock(true);
};

const closeProjectModal = () => {
  if (!projectModalContainer || !projectOverlay) {
    return;
  }
  projectModalContainer.classList.remove("active");
  projectOverlay.classList.remove("active");
  setBodyScrollLock(false);
};

const isProjectModalOpen = () =>
  projectModalContainer && projectModalContainer.classList.contains("active");

// Loop through each project item and set up the click event for the eye icon
const projectItems = document.querySelectorAll(".project-item");

projectItems.forEach((project) => {
  const cardLink = project.querySelector("a");
  if (cardLink) {
    cardLink.addEventListener("click", (event) => event.preventDefault());
  }

  const eyeIcon = project.querySelector("[data-project-eye]");

  if (!eyeIcon) {
    return;
  }

  eyeIcon.addEventListener("click", (event) => {
    event.preventDefault();

    const projectImgEl = project.querySelector("img");
    const projectTitleEl = project.querySelector(".project-title");
    const projectDescEl = project.querySelector(".project-description");
    const projectRepoEl = project.querySelector(".project-repo");
    const projectDemoEl = project.querySelector(".project-demo");

    if (projectImgEl) {
      projectModalImg.src = projectImgEl.src;
      projectModalImg.alt = projectImgEl.alt || "Project image";
    }
    if (projectTitleEl) {
      projectModalTitle.innerHTML = projectTitleEl.innerHTML;
    }
    if (projectDescEl) {
      projectModalText.innerHTML = projectDescEl.innerHTML;
    }

    if (projectRepoEl && projectRepoEl.href) {
      projectModalRepo.style.display = "flex";
      projectModalRepo.href = projectRepoEl.href;
    } else {
      projectModalRepo.style.display = "none";
    }

    if (projectDemoEl && projectDemoEl.href) {
      projectModalDemo.style.display = "flex";
      projectModalDemo.href = projectDemoEl.href;
    } else {
      projectModalDemo.style.display = "none";
    }

    openProjectModal();
  });
});

if (projectModalCloseBtn) {
  projectModalCloseBtn.addEventListener("click", closeProjectModal);
}

if (projectOverlay) {
  projectOverlay.addEventListener("click", closeProjectModal);
}

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && isProjectModalOpen()) {
    closeProjectModal();
  }
});




// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {

    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }

  });
}
