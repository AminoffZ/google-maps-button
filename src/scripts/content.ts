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

    const searchText = search.textContent?.replaceAll(' ', '+');

    // Selector might change in the future
    const nav = document.getElementsByClassName('IUOThf');
    if (!nav) {
      throw 'nav not found';
    }

    const mapsElement =
      /* Replaces the Google-provided 'Map' button that only shows an image
       * of the map (which is useless). Otherwise, it will replace the
       * last element in the nav bar. The selector might change in the future.
       */
      document.querySelector("[aria-label='Add Map'")?.parentElement ??
      <Element>nav.item(0)?.lastChild;
    if (!mapsElement) {
      throw 'mapsElement could not be created';
    }

    const mapsSpan = mapsElement.querySelector('span');
    if (!mapsSpan) {
      throw 'mapsSpan not found';
    }

    mapsSpan.textContent = 'Maps';

    const mapsAnchor = mapsElement.querySelector('a');
    if (!mapsAnchor) {
      throw 'mapsAnchor not found';
    }

    mapsAnchor.setAttribute(
      'href',
      `https://www.google.com/maps/search/${searchText}/@${options.location}`
    );
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
