function createMapsButton(location?: string) {
  const search = document.querySelector('textarea');

  if (!search) {
    console.warn('search bar not found');
    return;
  }

  const searchText = search.textContent?.replaceAll(' ', '+');

  // Selector might change in the future
  const nav = document.getElementsByClassName('IUOThf');
  if (!nav) {
    console.warn('nav not found');
    return;
  }

  const mapsElement = <Element>nav.item(0)?.lastChild;
  console.log(nav.length);
  if (!mapsElement) {
    console.warn('mapsElement could not be created');
    return;
  }

  const mapsSpan = mapsElement.querySelector('span');
  if (!mapsSpan) {
    console.warn('mapsSpan not found');
    return;
  }

  mapsSpan.textContent = 'Maps';

  const mapsAnchor = mapsElement.querySelector('a');
  if (!mapsAnchor) {
    console.warn('mapsAnchor not found');
    return;
  }

  mapsAnchor.setAttribute(
    'href',
    `https://www.google.com/maps/search/${searchText}/@${location}`
  );
}

function main() {
  // https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/getCurrentPosition
  navigator.geolocation.getCurrentPosition(
    (success) => {
      const location = success.coords.latitude + ',' + success.coords.longitude;
      createMapsButton(location);
    },
    (error) => {
      console.error(error);
      createMapsButton();
    }
  ),
    {
      timeout: 5000,
      maximumAge: 0,
    };
}

main();
