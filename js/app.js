/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
 */

/**
 * Define Global Variables
 * 
 */
const secList = document.querySelectorAll('section'); // select all of the sections into an array "secList"
const navbar__list = document.body.querySelectorAll('[data-nav-nav]');
const toTopbutton = document.getElementById('totop');
const classes = ['your-active-class', 'active-link'];
const header = document.querySelector('header.page__header');

/**
 * End Global Variables
 * Start Helper Functions
 * 
 */

function buildLinks() {
    const navUl = document.getElementById('navbar__list');
    const theFragment = document.createDocumentFragment();
    secList.forEach(sec => {
        const secData = sec.getAttribute('data-nav');
        const li = document.createElement('li');
        const link = document.createElement('a');
        const linkTxt = document.createTextNode(secData);
        link.appendChild(linkTxt);
        li.appendChild(link);
        link.setAttribute('class', 'menu__link');
        link.setAttribute('data-nav-nav', secData);
        link.addEventListener('click', () => { sec.scrollIntoView() });
        theFragment.appendChild(li);
    })
    navUl.appendChild(theFragment)
}

function removeAllclasses(classes) {
    secList.forEach((sec) => {
        sec.classList.remove(classes[0])
        const selectedLink = document.querySelector('[data-nav-nav = "' + sec.getAttribute('data-nav') + '"]')
        selectedLink.classList.remove(classes[1])
    })
}

function menu(num) {
    const menu = document.createElement('div')
    menu.setAttribute('id', 'menu__show')
    for (let i = 1; i <= num; i++) {
        const ele = document.createElement('div')
        menu.appendChild(ele)
    }
    document.body.appendChild(menu)
}

function hideElement(element) {
    element.classList.remove('visible')
}

function showElement(element) {
    element.classList.add('visible')
}

/**
 * End Helper Functions
 * Begin Main Functions
 * 
 */

// build the nav
function buildNav() {
    buildLinks()
    menu(3)
}

// Add class ('your-active-class') to section when near top of viewport
function reActive(classes) {
    for (const sec of secList) {
        const secVP = sec.getBoundingClientRect()
        if (secVP.top >= 0 && secVP.top <= 350) {
            removeAllclasses(classes)
            sec.classList.add(classes[0])
            const selected = document.querySelector('[data-nav-nav = "' + sec.getAttribute('data-nav') + '"]')
            selected.classList.add(classes[1])
        }
    }
}

// Scroll to anchor ID using scrollTO event
// (I combined it into the helper function 'buildLinks' that's part of the main function 'buildNav')


// (show & hide the 'to top' button main function)
function showhide() {
    const dDESTop = document.documentElement.scrollTop
    if (dDESTop > 20) {
        showElement(toTopbutton)
    } else {
        hideElement(toTopbutton)
    };
};

/**
 * End Main Functions
 * Begin Events
 * 
 */

// Build menu 
buildNav();

// (show or hide the nav bar)
// (I had to define the variable 'menu__show' becuase the 'buildNav' function was not called yet)
// (When I put it above it returns null)
const menu__show = document.getElementById('menu__show');
menu__show.addEventListener('click', () => { header.classList.toggle('visible') });

// Scroll to section on link click
// (I combined it into the helper function 'buildLinks' that's part of the main function 'buildNav')
// (and the main function 'buildNav' is called already)


// Set sections as active
window.addEventListener('scroll', () => { reActive(classes) });

// (scroll to the top of the page)
toTopbutton.addEventListener('click', () => { window.scrollTo(0, 0) });

// (show & hide the 'to top ' button)
window.onscroll = function() { showhide() };