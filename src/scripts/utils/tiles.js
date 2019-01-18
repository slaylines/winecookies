// https://leaflet-extras.github.io/leaflet-providers/preview/

const tiles = {
  wikimedia: {
    url: 'https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}{r}.png',
    attribution: `
      &copy; <a href='http://www.openstreetmap.org/copyright' target="_blank">OpenStreetMap</a>
      &copy; <a href="https://wikimediafoundation.org/wiki/Maps_Terms_of_Use" target="_blank">Wikimedia</a>
    `,
  },
};

export default tiles;
