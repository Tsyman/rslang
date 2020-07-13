import SavannahMiniGame from './components/minigames/savannah/savannah';
import Stat from './components/pages/stat-page/stat-page';
import Main from './components/pages/main-page/main-page';
import Login from './components/pages/authorization-page/login';
import Register from './components/pages/authorization-page/register';
import HeaderMain from './components/shared/layout/header/header-main';
import HeaderPromo from './components/shared/layout/header/header-promo';
import Dictionary from './components/pages/dictionary-page/dictionary-page';
import OurGames from './components/pages/our-games-page/our-games-page';
import OurTeam from './components/pages/our-team/our-team';
import Footer from './components/shared/layout/footer/footer';
import NotFound from './components/pages/not-found/not-found';

import './index.scss';

import Utils from './services/Utils';
import state from './common/state';

// List of supported routes. Any url other than these routes will throw a 404 error
const routes = {
  '/': Stat,
  '/main': Main,
  '/login': Login,
  '/register': Register,
  '/games': OurGames,
  '/team': OurTeam,
  '/dictionary': Dictionary,
  '/dictionary/:id': Dictionary,
  '/savannah': SavannahMiniGame,
};

const getParsedURL = (req) => {
  let resource = '/';
  if (!req.resource && state.isAuthenticated()) {
    resource = '/main';
  } else if (req.resource) {
    resource = `/${req.resource}`;
  }

  return `${resource}${req.id ? '/:id' : ''}${req.verb ? ` /${req.verb}` : ''}`;
};

// The router code. Takes a URL, checks against the list of supported routes
// and then renders the corresponding content page.
const router = async () => {
  // Lazy load view element:
  const header = document.getElementById('header_container');
  const content = document.getElementById('page_container');
  const footer = document.getElementById('footer_container');

  // Render the Header and footer of the page
  const currentHeader = state.isAuthenticated() ? HeaderMain : HeaderPromo;
  header.innerHTML = await currentHeader.render();
  await currentHeader.afterRender();

  footer.innerHTML = await Footer.render();

  // Get the parsed URl from the address bar
  const request = Utils.parseRequestURL();

  // Parse the URL and if it has an id part, change it with the string ":id"
  const parsedURL = getParsedURL(request);

  // Get the page from our hash of supported routes.
  // If the parsed URL is not in our list of supported routes, select the 404 page instead
  const page = routes[parsedURL] ? routes[parsedURL] : NotFound;
  content.innerHTML = await page.render();
  if (page.afterRender) {
    await page.afterRender();
  }
};

// Listen on hash change:
window.addEventListener('hashchange', router);

// Listen on page load:
window.addEventListener('load', router);
