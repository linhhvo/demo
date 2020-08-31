const body = document.body;
const sections = document.querySelectorAll('.page');

const navBar = document.querySelector('.nav-bar');
const navLinks = document.querySelectorAll('.nav-link');
const navItems = document.querySelectorAll('.nav-item');
const navItemHighlight = document.querySelector('.nav-item-highlight');

const burgerMenu = document.querySelector('.burger');

const lightBulb = document.querySelector('.light-bulb');
const lightBulbText = document.querySelector('.bulb-instruction-text');

const themeSwitchContainer = document.querySelector('.theme-switch');

const primaryGradient = document.getElementById('gradient-primary');
const iconGradient = document.getElementById('gradient-icon');
const glows = document.querySelectorAll('.glow');
const logoNameText = document.getElementById('text-name');
const logoBubble = document.getElementById('bubble');
const logoIconOutline = document.getElementById('icon-outline');
const logoIconInner = document.getElementById('icon-inner');
const logoIconBrackets = document.getElementById('icon-brackets');
const logoWelcomeText = document.getElementById('text-welcome');

const filterBtn = document.getElementById('filter-btn');
const filterList = document.querySelector('.filter ul')
const dropdownArrow = document.querySelector('.dropdown-arrow');

const portfolioPage = document.getElementById('portfolio');
const projectsSection = document.querySelector('.projects');
const smallScreen = window.matchMedia('(max-width: 767px)');
const mediumScreen = window.matchMedia('(min-width: 768px)');
const largeScreen = window.matchMedia('(min-width: 1300px');

const options = {
	threshold: 0.5,
};

const OSDarkMode = window.matchMedia("(prefers-color-scheme: dark)");
const themeMode = localStorage.getItem('theme');

const theme = {
	dark: () => {
		body.classList.replace('light', 'dark')
		lightBulb.classList.replace('on', 'off');
		lightBulbText.textContent = 'enable light mode';
		primaryGradient.classList.replace('gradient-primary-light', 'gradient-primary-dark');
		iconGradient.classList.replace('gradient-icon-light', 'gradient-icon-dark');
		glows.forEach(glow => glow.style.display = '')
		localStorage.setItem('theme', 'dark')
	},
	light: () => {
		body.classList.replace('dark', 'light')
		lightBulb.classList.replace('off', 'on');
		lightBulbText.textContent = 'enable dark mode';
		primaryGradient.classList.replace('gradient-primary-dark', 'gradient-primary-light');
		iconGradient.classList.replace('gradient-icon-dark', 'gradient-icon-light');
		glows.forEach(glow => glow.style.display = 'none')
		localStorage.setItem('theme', 'light')
	}
}

function setMode () {
	// Set dark mode 
	if (themeMode === 'dark') {
		theme.dark();
	}
	//Set light mode
	else if (themeMode === 'light') {
		theme.light();
	}
	// Set mode based on OS mode
	else {
		if (OSDarkMode.matches) {
			theme.dark();
			// Set light mode
		} else {
			theme.light();
		}
	}
}

function switchMode () {
	// Switch dark -> light
	if (lightBulb.classList.contains('off')) {
		theme.light();
		//Switch light -> dark
	} else {
		theme.dark();
	}
}

function navBarAnimation () {
	// Hide light bulb icons
	themeSwitchContainer.classList.toggle('bulb-hidden');
	// Burger menu animation
	burgerMenu.classList.toggle('burger-active');
	// nav bar display
	navBar.classList.toggle('nav-bar--active');
	// nav links display animation
	navItems.forEach((item, index) => {
		if (item.style.animationName === 'fadeIn') {
			item.style.animation = `fadeOut 0.3s ease forwards`;
		} else {
			item.style.animation = `fadeIn 0.4s ease forwards ${index / 7 + 0.4}s`;
		}
	});
}

// function getAllSiblingAnchors (activeAnchor) {
// 	const allAnchors = Array.from(document.querySelectorAll('.nav-link'));
// 	return allAnchors.filter((anchor) => anchor !== activeAnchor);
// }

function getAllSiblings (parent, currentElement, selector) {
	const children = Array.from(parent.querySelectorAll(`${selector}`));
	return children.filter((child) => child !== currentElement);
}

function changeNavLinksColor (navLink) {
	navLink.classList.add('nav-link--active');
	// let clickedLinkSiblings = getAllSiblingAnchors(navLink);
	let clickedLinkSiblings = getAllSiblings(document, navLink, '.nav-link')
	clickedLinkSiblings.forEach(
		(sibling) => sibling.classList.remove('nav-link--active')
	);
}

function matchNavLink (entries) {
	entries.forEach((entry) => {
		const idName = entry.target.id;
		const activeAnchor = document.querySelector(`[data-page=${idName}]`);
		// let anchorSiblings = getAllSiblingAnchors(activeAnchor);
		let anchorSiblings = getAllSiblings(document, activeAnchor, '.nav-link')
		const coords = activeAnchor.getBoundingClientRect();
		const directions = {
			height: coords.height,
			width: coords.width,
			top: coords.top,
			left: coords.left,
		};
		if (entry.isIntersecting) {
			navItemHighlight.style.setProperty('left', `${directions.left}px`);
			navItemHighlight.style.setProperty('top', `${directions.top}px`);
			navItemHighlight.style.setProperty('width', `${directions.width}px`);
			navItemHighlight.style.setProperty('height', `${directions.height}px`);
			changeNavLinksColor(activeAnchor);
		}
	})
}

const detailsHTML =
	`<img alt="Project thumbnail">
	<div class="details-container">
		<h2 class="project-thumbnail--title"></h2>
		<p class="project-desc"></p>
		<div class="project-thumbnail--techstack"></div>
		<div class="project-links"></div>`;

function populateProjectDetails (thumbnail, detailsCard) {
	detailsCard.innerHTML = detailsHTML;

	function getProjectDetails (infoType, attribute) {
		detailsCard.querySelector(`.project-details ${infoType}`)[ attribute ] = thumbnail.querySelector(`${infoType}`)[ attribute ];
	}

	getProjectDetails('img', 'src');
	getProjectDetails('h2', 'textContent');
	getProjectDetails('p', 'textContent');
	getProjectDetails('.project-thumbnail--techstack', 'innerHTML');
	getProjectDetails('.project-links', 'innerHTML');

}

// Get project info and populate to details card on hover
if (largeScreen.matches) {
	projectsSection.addEventListener('mouseover', (e) => {
		if (e.target !== projectsSection && e.target.tagName !== 'A') {
			const projectThumbnail = e.target.closest('.project-thumbnail');
			const projectDetailsCard = projectThumbnail.lastElementChild;

			populateProjectDetails(projectThumbnail, projectDetailsCard);
		}
	})
} else {
	projectsSection.addEventListener('click', (e) => {
		if (e.target !== projectsSection && e.target.tagName !== 'A') {
			const projectThumbnail = e.target.closest('.project-thumbnail');
			const projectDetailsCard = projectThumbnail.lastElementChild;

			populateProjectDetails(projectThumbnail, projectDetailsCard);

			projectDetailsCard.style.opacity = 1;
			projectDetailsCard.style.transform = 'scale(1)';
			projectDetailsCard.style.transition = `opacity 0.1s linear, transform 0.25s cubic-bezier(0.11, 0.8, 0.26, 0.93)`;

			let detailsCardSiblings = getAllSiblings(projectsSection, projectDetailsCard, '.project-details');
			detailsCardSiblings.forEach(sibling => hideElement(sibling)
			)

			projectDetailsCard.addEventListener('click', (e) => {
				e.stopPropagation();
				hideElement(projectDetailsCard);
			})
		}
	})
}

function hideElement (element) {
	element.style.opacity = 0;
	element.style.transform = 'scale(0)';
	element.style.transition = '';
}


window.onload = () => {
	// Set initial theme mode
	setMode();
	// Highlight nav item based on active page section
	let observer = new IntersectionObserver(matchNavLink, options);
	// Nav bar animation for big screen size
	if (mediumScreen.matches) {
		sections.forEach((section) => {
			observer.observe(section);
		});
	}
}

// Change theme light/dark
lightBulb.addEventListener('click', switchMode);

// Event handles for small screen size
if (smallScreen.matches) {
	// Hamburger menu toggle
	burgerMenu.addEventListener('click', () => {
		navBarAnimation();
	});
	// Close nav bar when click nav link
	navLinks.forEach((link) =>
		link.addEventListener('click', () => {
			navBarAnimation();
			changeNavLinksColor(link);
		})
	);
}

// Show/hide project filter list
filterBtn.addEventListener('click', () => {
	filterList.classList.toggle('collapsed');
	dropdownArrow.classList.toggle('up');

})

document.addEventListener('click', (e) => {
	if (e.target !== filterBtn) {
		filterList.classList.add('collapsed');
		dropdownArrow.classList.remove('up');
	}
})

