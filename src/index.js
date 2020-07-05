import AuthorizationPage from './components/pages/authorization-page/authorization-page';

import Main from './components/pages/main-page/main-page';
import Stat from './components/pages/stat-page/stat-page';
import NotFound from './components/pages/not-found/not-found';
import OurGames from './components/pages/our-games-page/our-games-page';

import HeaderPromo from './components/shared/layout/header/header-promo/header-promo';
import Footer from './components/shared/layout/footer/footer';

import Utils from './services/Utils';

// List of supported routes. Any url other than these routes will throw a 404 error
const routes = {
  '/': Main,
  '/stat': Stat,
  '/login': AuthorizationPage,
  '/games': OurGames,
};

// The router code. Takes a URL, checks against the list of supported routes
// and then renders the corresponding content page.
const router = async () => {
  // Lazy load view element:
  const header = null || document.getElementById('header_container');
  const content = null || document.getElementById('page_container');
  const footer = null || document.getElementById('footer_container');

  // Render the Header and footer of the page
  header.innerHTML = await HeaderPromo.render();
  await HeaderPromo.afterRender();

  footer.innerHTML = await Footer.render();

  // Get the parsed URl from the addressbar
  const request = Utils.parseRequestURL();

  // Parse the URL and if it has an id part, change it with the string ":id"
  const parsedURL = (request.resource ? `/${request.resource}` : '/') + (request.id ? '/:id' : '')
   + (request.verb ? `/${request.verb}` : '');

  // Get the page from our hash of supported routes.
  // If the parsed URL is not in our list of supported routes, select the 404 page instead
  const page = routes[parsedURL] ? routes[parsedURL] : NotFound;
  content.innerHTML = await page.render();
  if (page.afterRender) await page.afterRender();
};

// Listen on hash change:
window.addEventListener('hashchange', router);

// Listen on page load:
window.addEventListener('load', router);
