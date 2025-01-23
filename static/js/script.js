'use strict';



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

// Function to toggle project modal visibility
function toggleProjectModal() {
  projectModalContainer.classList.toggle("active");
  projectOverlay.classList.toggle("active");
}

// Loop through each project item and set up the click event for the eye icon
const projectItems = document.querySelectorAll(".project-item");

projectItems.forEach(project => {
  // Select the eye icon element inside the project item
  const eyeIcon = project.querySelector("[data-project-eye]");
  // console.log(eyeIcon)

  if (eyeIcon) {
    eyeIcon.addEventListener("click", function (e) {
      e.preventDefault(); // Prevent navigation if wrapped in an anchor
      
      // Get project data elements
      const projectImgEl = project.querySelector("img");
      const projectTitleEl = project.querySelector(".project-title");
      const projectDescEl = project.querySelector(".project-description");
      const projectRepoEl = project.querySelector(".project-repo");
      const projectDemoEl = project.querySelector(".project-demo");
      // projectDescEl.removeAttribute('style');

      // Update modal content with project details
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

      if (projectRepoEl.href) {
        // console.log(projectRepoEl);
        projectModalRepo.style.display = 'flex'
        projectModalRepo.href = projectRepoEl.href;
      }
      else {
        // projectModalRepo.removeAttribute('href');
        projectModalRepo.style.display = 'none';
      }

      if (projectDemoEl.href) {
        // console.log(projectDemoEl);
        projectModalDemo.style.display = 'flex'
        projectModalDemo.href = projectDemoEl.href;
      }
      else {
        // projectModalDemo.removeAttribute('href');
        projectModalDemo.style.display = 'none';
      }
      // Show the project modal
      toggleProjectModal();
    });
  }
});

// Set click events on the close button and overlay to hide the modal
projectModalCloseBtn.addEventListener("click", toggleProjectModal);
projectOverlay.addEventListener("click", toggleProjectModal);




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
