/* =============================typing animation ================*/
var typed = new Typed(".typing", {
    strings: ["Frontend Developer", "Web Designer", "Content Marketer"],
    typeSpeed: 100,
    backSpeed: 60,
    loop: true
});

/* =============================Aside  ================*/
const nav = document.querySelector(".nav"),
    navList = nav.querySelectorAll("li"),
    totalNavList = navList.length,
    allSection = document.querySelectorAll(".section"),
    totalSection = allSection.length;
// Event delegation for navigation
nav.addEventListener("click", function(event) {
    const clickedElement = event.target;
    if (clickedElement.tagName === "A") {
        removeBackSection();
        for (let j = 0; j < totalNavList; j++) {
            if (navList[j].querySelector("a").classList.contains("active")) {
                addBackSection(j);
            }
            navList[j].querySelector("a").classList.remove("active");
        }
        clickedElement.classList.add("active");
        showSection(clickedElement);
        if (window.innerWidth < 1200) {
            asideSectionTogglerBtn();
        }
    }
});

function removeBackSection() {
    for (let i = 0; i < totalSection; i++) {
        allSection[i].classList.remove("back-section");
    }
}
function addBackSection(num) {
    allSection[num].classList.add("back-section");
}
function showSection(element) {
    for (let i = 0; i < totalSection; i++) {
        allSection[i].classList.remove("active");
    }
    const target = element.getAttribute("href").split("#")[1];
    document.querySelector("#" + target).classList.add("active");
}
function updateNav(element) {
    for (let i = 0; i < totalNavList; i++) {
        navList[i].querySelector("a").classList.remove("active");
        const target = element.getAttribute("href").split("#")[1];
        if (target === navList[i].querySelector("a").getAttribute("href").split("#")[1]) {
            navList[i].querySelector("a").classList.add("active");
        }
    }
}
// Hire me button logic
document.querySelector(".hire-me").addEventListener("click", function() {
    const sectionIndex = this.getAttribute("data-section-index");
    showSection(this);
    updateNav(this);
    removeBackSection();
    addBackSection(sectionIndex);
});
// Toggling aside section on button click
const navTogglerBtn = document.querySelector(".nav-toggler"),
    aside = document.querySelector(".aside");

navTogglerBtn.addEventListener("click", () => {
    asideSectionTogglerBtn();
});
function asideSectionTogglerBtn() {
    aside.classList.toggle("open");
    navTogglerBtn.classList.toggle("open");
    allSection.forEach(section => section.classList.toggle("open"));
}
/* connect contact form to gmail */ 
function sendMail() {
    // Get form values
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    // Validate inputs
    if (!name || !email || !message) {
        alert("Please fill in all fields before submitting.");
        return; // Stop function execution if any field is empty
    }

    const params = {
        name: name,
        email: email,
        message: message,
    };
    const serviceID = "service_bzt98kn";
    const templateID = "template_w7ra6a9";

    emailjs.send(serviceID, templateID, params)
        .then(res => {
            // Clear form fields after successful submission
            document.getElementById("name").value = "";
            document.getElementById("email").value = "";
            document.getElementById("message").value = "";
            console.log("Email sent successfully:", res);
            alert("Your message was sent successfully!");
        })
        .catch(err => console.error("Error sending email:", err));
}