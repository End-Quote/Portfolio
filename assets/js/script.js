'use strict';



// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });



// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
}

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {

  testimonialsItem[i].addEventListener("click", function () {

    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;

    testimonialsModalFunc();

  });

}

// add click event to modal close button
modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);



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



// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {

    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }

  });
}



// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
navigationLinks.forEach((link) => {
  link.addEventListener("click", function () {
    // Remove active class from all pages and links
    pages.forEach(page => page.classList.remove("active"));
    navigationLinks.forEach(navLink => navLink.classList.remove("active"));

    // Add active class to clicked link
    this.classList.add("active");
    
    // Add active class to corresponding page
    const pageId = this.innerHTML.toLowerCase();
    const activePage = document.querySelector(`[data-page="${pageId}"]`);
    if (activePage) {
      activePage.classList.add("active");
    }

    // Scroll to top of the page or to a specific section
    window.scrollTo(0, 0);
  });
});

document.addEventListener('DOMContentLoaded', function() {
  const attachNavigationEventListeners = () => {
    const navigationLinks = document.querySelectorAll("[data-nav-link]");

    navigationLinks.forEach((link) => {
      link.addEventListener("click", function () {
        // Assuming data-nav-link values match the IDs or data-page attributes
        const targetPage = this.getAttribute('data-nav-link');

        // Hide all sections
        document.querySelectorAll("[data-page]").forEach(page => {
          page.classList.remove("active");
          page.innerHTML = ''; // Optionally clear content if it should not remain
        });

        // Special handling for dynamically loaded content like 'sound-design'
        if (targetPage === 'sound_design') {
          loadContent('./pages/sound_design.html', 'sound_design');
        } else {
          // Handle other pages, which might just need to be shown
          const activePage = document.querySelector(`[data-page="${targetPage}"]`);
          if (activePage) {
            activePage.classList.add("active");
          }
        }

        // Update navigation link states
        navigationLinks.forEach(navLink => navLink.classList.remove("active"));
        this.classList.add("active");

        window.scrollTo(0, 0);
      });
    });
  };

  // Load content dynamically into the specified container
  const loadContent = (url, containerId) => {
    fetch(url)
      .then(response => response.text())
      .then(html => {
        const container = document.getElementById(containerId);
        if (container) {
          container.innerHTML = html;
          container.classList.add("active"); // Mark the container as active
        }
      })
      .catch(error => {
        console.error('Error loading the page:', error);
      });
  };

  attachNavigationEventListeners();

  // Initially hide all sections or load default content as needed
  // Example: loadContent('./pages/about.html', 'about');
});