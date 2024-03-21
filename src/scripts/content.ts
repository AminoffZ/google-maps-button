import { TRANSLATIONS } from './internal/translations';

/**
 * Create a maps button in the google search page
 * that will redirect to google maps with the search query.
 *
 * @param options - The options for the maps button
 * @param options.location - The user location
 * @param options.retries - The number of retries to create the maps button
 */
function createMapsButton(options: { location: string; retries: number }) {
  try {
    const search = document.querySelector('textarea');

    if (!search) {
      throw 'search bar not found';
    }

    // Replace spaces with '+' for the google maps search
    const searchText = search.textContent?.replaceAll(' ', '+');

    // Selector might change in the future
    const nav = document.getElementsByClassName('IUOThf');
    if (!nav) {
      throw 'nav not found';
    }

    // Get the language of the page (default to English)
    const language = document.documentElement.lang.split('-')[0] ?? 'en';

    // Using the aria-label, find existing 'Maps' or 'Map' buttons (incl. translations)
    const existingMapsElement =
      document.querySelector(
        `[aria-label='${TRANSLATIONS[language]['Add Maps']}'`
      )?.parentElement ??
      document.querySelector(
        `[aria-label='${TRANSLATIONS[language]['Add Map']}'`
      )?.parentElement;

    const mapsElement =
      /* Replaces the Google-provided 'Maps' or 'Map' button that only shows an image
       * of the map (which is useless). Otherwise, it will replace the
       * last element in the nav bar. The selector might change in the future.
       */
      existingMapsElement ?? <Element>nav.item(0)?.lastChild;
    if (!mapsElement) {
      throw 'mapsElement could not be created';
    }

    const mapsSpan = mapsElement.querySelector('span');
    if (!mapsSpan) {
      throw 'mapsSpan not found';
    }

    mapsSpan.textContent = TRANSLATIONS[language]['Maps'];

    const mapsAnchor = mapsElement.querySelector('a');
    if (!mapsAnchor) {
      throw 'mapsAnchor not found';
    }

    // Set the href to the google maps search
    mapsAnchor.setAttribute(
      'href',
      `https://www.google.com/maps/search/${searchText}/@${options.location}`
    );

    // Style the maps button
    mapsSpan.style.justifyContent = 'center';
    mapsSpan.style.display = 'flex';
    mapsSpan.style.flexDirection = 'row-reverse';

    // Add the logo
    const logo = document.createElement('img');
    logo.src = chrome.runtime.getURL('assets/images/icon16.png');
    mapsSpan.appendChild(logo);

    // Set the button as the second element in the nav bar
    const secondNavElement =
      mapsElement?.parentElement?.firstChild?.nextSibling;
    if (secondNavElement) {
      mapsElement.parentElement?.insertBefore(mapsElement, secondNavElement);
    }
  } catch (e) {
    console.error(e);
    if (options.retries > 0) {
      console.log('Retrying...');
      setTimeout(
        () =>
          createMapsButton({
            location: options.location,
            retries: options.retries - 1,
          }),
        1000
      );
    }
  }
}

function main() {
  // https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/getCurrentPosition
  navigator.geolocation.getCurrentPosition(
    (success) => {
      const location = success.coords.latitude + ',' + success.coords.longitude;
      createMapsButton({ location: location, retries: 3 });
    },
    (error) => {
      console.error(error);
      createMapsButton({ location: '', retries: 3 });
    }
  ),
    {
      timeout: 5000,
    };
}

main();
