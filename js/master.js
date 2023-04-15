//Check if local storage have color item
let mainColor = localStorage.getItem("color-option");

//Get root color from local storage
if (mainColor !== null) {
  document.documentElement.style.setProperty("--main-color", mainColor);

  //Remove class active from all lis
  document.querySelectorAll(".colors-list li").forEach((element) => {
    element.classList.remove("active");

    //Add class active for target li from local storage
    if (element.dataset.color === mainColor) {
      element.classList.add("active");
    }
  });
}

// Variables ==> random background, background interval
let randomBackground = true,
  backgroundInterval;

//Check if local storage have random background item
let backgroundLocalItem = localStorage.getItem("random-background");

//Get random background option from local storage
if (backgroundLocalItem !== null) {
  if (backgroundLocalItem === "true") {
    randomBackground = true;
  } else {
    randomBackground = false;
  }

  //Remove class active from all spans
  let spans = document.querySelectorAll(".random-background span");
  for (let i = 0; i < spans.length; i++) {
    spans[i].classList.remove("active");
  }
  // Add class active for yes span
  if (backgroundLocalItem === "true") {
    document.querySelector(".random-background .yes").classList.add("active");
    // Add class active for no span
  } else {
    document.querySelector(".random-background .no").classList.add("active");
  }
}

//Check if local storage have an image or no
let backgroundFromLocal = localStorage.getItem("background-image");

//Get background from local storage
if (backgroundFromLocal !== null) {
  document.querySelector(
    ".landing-page"
  ).style.backgroundImage = `url(${backgroundFromLocal})`;
  if (backgroundLocalItem === "false") {
    randomBackground = false;
  }
}

// Select Settings Box
let settingsBox = document.querySelector(".settings-box"),
  settings = document.querySelector(".settings");

// Toggle class fa-spin for rotation on self & class open for open and close settings box
settings.addEventListener("click", () => {
  settingsBox.classList.toggle("open");
  settings.classList.toggle("fa-spin");
});

//Switch Colors

//Select Color List Li
const colorsLi = document.querySelectorAll(".colors-list li");

//Loop on color list li

colorsLi.forEach((li) => {
  //Click on every list item
  li.addEventListener("click", (e) => {
    // Set color on root
    let color = e.target.dataset.color;
    document.documentElement.style.setProperty("--main-color", color);

    //Set color on local storage
    localStorage.setItem("color-option", color);

    // Handle Active Class
    handleActive(e);
  });
});

//Switch random background option

//Select background span
const randomBackEle = document.querySelectorAll(".random-background span");

//Loop on span
randomBackEle.forEach((span) => {
  //Click on every span item
  span.addEventListener("click", (e) => {
    // Handle Active Class
    handleActive(e);

    if (e.target.dataset.background === "yes") {
      randomBackground = true;
      randomizeImgs();
      localStorage.setItem("random-background", true);
    } else {
      randomBackground = false;
      clearInterval(backgroundInterval);
      localStorage.setItem("random-background", false);
    }
  });
});

//Select settings images
let settingsImgs = document.querySelectorAll(".settings-images-box img");

//Add click event to images
settingsImgs.forEach((img) => {
  img.addEventListener("click", (e) => {
    let imageSrc = e.target.src;
    //Change backgroung
    landingPage.style.backgroundImage = `url(${imageSrc})`;
    //Select span no
    randomBackEle.forEach((span) => {
      span.classList.remove("active");
      if (span.classList.contains("no")) span.classList.add("active");
    });
    localStorage.setItem("background-image", e.target.src);
    randomBackground = false;
    clearInterval(backgroundInterval);
    localStorage.setItem("random-background", false);
  });
});

// Select landing page
let landingPage = document.querySelector(".landing-page");

// Get array of imgs
let imgsArray = ["01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg"];

//Function for randomize imgs

function randomizeImgs() {
  if (randomBackground === true) {
    // set timer
    backgroundInterval = setInterval(() => {
      // Get random number
      let randomNumber = Math.floor(Math.random() * imgsArray.length);

      //   change background
      landingPage.style.backgroundImage = `url("imgs/${imgsArray[randomNumber]}")`;
    }, 10000);
  }
}

randomizeImgs();

// Select Skills
let skills = document.querySelector(".skills");

window.onscroll = () => {
  //Select offset top
  let skillOffsetTop = skills.offsetTop;

  //select outer height
  let skillOuterHeight = skills.offsetHeight;

  //Select window height
  let windowHeight = this.innerHeight;

  //Select window scroll top
  let windowScrollTop = this.pageYOffset;

  if (windowScrollTop > skillOffsetTop + skillOuterHeight - windowHeight) {
    //Select skill progress
    let allSkills = document.querySelectorAll(".skills .skill-box span");
    allSkills.forEach((skill) => {
      skill.style.width = skill.dataset.progress;
    });
  }
};

// Start popup
//Select our gallery images
let ourGallery = document.querySelectorAll(".gallery img");

ourGallery.forEach((img) => {
  img.addEventListener("click", (e) => {
    //Create overlay Element
    let overlay = document.createElement("div");

    //Add class to overlay div
    overlay.classList.add("popup-overlay");

    //Add overlay to body
    document.body.appendChild(overlay);

    //Create popup box
    let popupBox = document.createElement("div");

    //Add class to popup box div
    popupBox.classList.add("popup-box");

    //Create close span
    let closeBtn = document.createElement("span");

    //Add calss to span
    closeBtn.classList.add("colse-btn");

    //Create text for span
    let sapnTxt = document.createTextNode("X");

    //Add sapnTxt to closeBtn
    closeBtn.appendChild(sapnTxt);

    //Add closeBtn to popup box
    popupBox.appendChild(closeBtn);

    if (img.alt !== null) {
      //Create image heading
      let imgHeading = document.createElement("h3");

      //Create text to image heading
      let headingText = document.createTextNode(img.alt);

      //Add heading Text to img Heading
      imgHeading.appendChild(headingText);

      //Add image heading to popupbox
      popupBox.appendChild(imgHeading);
    }

    //Create image
    let image = document.createElement("img");

    //Add class to popup image
    image.classList.add("popup-img");
    //Another way

    //Add image src
    image.src = e.target.src;

    //Add img to popup box
    popupBox.appendChild(image);

    //Add popup box to overlay div
    overlay.appendChild(popupBox);
    // console.log(e.target.src);
  });
});
// End popup
//Add click event to close btn
document.addEventListener("click", (e) => {
  if (e.target.className == "colse-btn") {
    // e.target.parentNode.remove();
    document.querySelector(".popup-overlay").remove();
  }
});

//Select All Bullets
let allBullets = document.querySelectorAll(".nav-bullets .bullet");

//Select All Links
let allLinks = document.querySelectorAll(".links a");

function scrollTo(element) {
  element.forEach((ele) => {
    ele.addEventListener("click", (e) => {
      e.preventDefault();
      document.querySelector(e.target.dataset.section).scrollIntoView({
        behavior: "smooth",
      });
    });
  });
}

scrollTo(allBullets);
scrollTo(allLinks);

//Handle Active State
function handleActive(event) {
  //Remove Active Class From All Children
  event.target.parentElement.querySelectorAll(".active").forEach((element) => {
    element.classList.remove("active");
  });

  //Add Active Class On Self
  event.target.classList.add("active");
}

//Select All Bullets Sapns
let bulletSpans = document.querySelectorAll(".bullets-option span");

//Select Bullets Container
let bulletsContainer = document.querySelector(".nav-bullets");

//Get Item From Local Storage
let bulletLocalItem = localStorage.getItem("bullets-option");
if (bulletLocalItem !== null) {
  bulletSpans.forEach((span) => {
    span.classList.remove("active");
  });
  if (bulletLocalItem === "block") {
    bulletsContainer.style.display = "block";
    document.querySelector(".bullets-option .yes").classList.add("active");
  } else {
    bulletsContainer.style.display = "none";
    document.querySelector(".bullets-option .no").classList.add("active");
  }
}

bulletSpans.forEach((span) => {
  span.addEventListener("click", (e) => {
    if (span.dataset.display === "show") {
      localStorage.setItem("bullets-option", "block");
      bulletsContainer.style.display = "block";
    } else {
      localStorage.setItem("bullets-option", "none");
      bulletsContainer.style.display = "none";
    }

    handleActive(e);
  });
});

//Select Reset Options
document.querySelector(".reset-options").onclick = () => {
  //Clear Data From Local Storage
  localStorage.clear();
  //Reload Window
  window.location.reload();
};

// Toggle Menu
//Select menu
let toggleMenu = document.querySelector(".toggle-menu");
//Select Links
let tLinks = document.querySelector(".links");
toggleMenu.onclick = (e) => {
  //Stop Propagation On Menu
  e.stopPropagation();
  //Toggle menu-active Class
  toggleMenu.classList.toggle("menu-active");
  //Toggle open Class
  tLinks.classList.toggle("open");
};

document.addEventListener("click", (e) => {
  if (e.target !== toggleMenu && e.target !== tLinks) {
    //Check If Menu Is Opend Or Not
    if (tLinks.classList.contains("open")) {
      //Remove menu-active & open Classes
      toggleMenu.classList.remove("menu-active");
      tLinks.classList.remove("open");
    }
  }
});

//Stop Propagation On Links
tLinks.onclick = (e) => {
  e.stopPropagation();
};
