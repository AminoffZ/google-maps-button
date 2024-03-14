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

    const mapsElement = <Element>nav.item(0)?.lastChild;
    console.log(mapsElement);
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
      maximumAge: 0,
    };
}

main();
