import { _ } from 'underscore';
import { ajax, getJSON } from 'jquery';
import constants from './constants.js';

const baseUrl = constants.baseUrl;

function getProps(prop, data) {
  const propKeyMap = {
    description: ['http://purl.org/dc/terms/description',],
    sort: ['http://purl.org/dc/terms/spatial', true, 0,],
    title: ['http://purl.org/dc/terms/title',],
    type: ['http://purl.org/dc/terms/type',],

    background: ['http://scalar.usc.edu/2012/01/scalar-ns#background', false,],
    content: ['http://rdfs.org/sioc/ns#content',],
    credit: ['http://ns.exiftool.ca/IPTC/IPTC/1.0/Credit', true],

    backgroundSrc: ['http://simile.mit.edu/2003/10/ontologies/artstor#hasMediaFile'],
    backgroundType: ['http://simile.mit.edu/2003/10/ontologies/artstor#mediafileFormat', true, 'photo'],
    mediaUrl: ['http://simile.mit.edu/2003/10/ontologies/artstor#url',],
    thumbnail: ['http://simile.mit.edu/2003/10/ontologies/artstor#thumbnail', false],
  };

  const [key, versioned = true, def = ''] = propKeyMap[prop];
  const obj = versioned ? data.versionedData : data.unversionedData;
  return obj.hasOwnProperty(key) ? obj[key][0].value : def;
}

function getData(data, slug) {
  const dataKeys = Object.keys(data);

  let state = { self: {}, children: [], loaded: true };

  for (var i = 0; i < dataKeys.length; i++) {
    const dataForKey = getDataForKey(data, dataKeys[i]);

    if (dataForKey) {
      const normalizedData = {
        parentSlug: slug,
        slug: dataForKey.unversionedSlug,
        self: dataForKey.unversionedSlug === slug,

        description: getProps('description', dataForKey),
        sort: getProps('sort', dataForKey),
        title: getProps('title', dataForKey),
        type: getProps('type', dataForKey),

        background: getProps('background', dataForKey),
        content: getProps('content', dataForKey),
        credit: getProps('credit', dataForKey),

        backgroundSrc: getProps('backgroundSrc', dataForKey),
        backgroundType: getProps('backgroundType', dataForKey),
        thumbnail: getProps('thumbnail', dataForKey),
        url: getProps('mediaUrl', dataForKey),
      };

      if (normalizedData.self) {
        state.self = normalizedData;
      } else {
        state.children.push(normalizedData);
      }
    }
  }

  function filterChildrenByMedium(element, index, array) {
    if (state.self.type === 'home') return true;

    if (state.self.type === 'news' && element.type === 'article') return true;

    if (state.self.type === 'searcg') {
      if (element.type === 'subtopic') return false;
      return true;
    }

    if (state.self.type === 'tag') {
      if (element.type === 'tag') return false;
      return element.type !== 'searcg';
    }

    if (state.self.type === 'topic') {
      if (element.type === 'home') state.parent = element;
      return !(element.type === 'home' || element.type === 'searcg');
    }

    if (state.self.type === 'subtopic') {
      if (element.type === 'topic') state.parent = element;
      return !(element.type === 'topic' || element.type === 'searcg');
    }
  }

  state.children = _.sortBy(state.children, 'sort').filter(filterChildrenByMedium);

  return state;
}

function getDataForKey(data, versionedDataKey) {
  const baseUrlLength = baseUrl.length;

  // Hoping the current data key is versioned:
  // * Get the slug of the current key
  // * Get the index of the version period
  // * If there is no version period, the slug is not versioned
  //     * Return immediately
  const versionedSlug = versionedDataKey.slice(baseUrlLength + 1);
  const slugVersionIndex = versionedSlug.indexOf('.');
  if (slugVersionIndex === -1) return null;

  const unversionedSlug = versionedSlug.slice(0, slugVersionIndex);
  const unversionedDataKey = `${baseUrl}/${unversionedSlug}`;
  const unversionedData = data[unversionedDataKey];
  const versionedData = data[versionedDataKey];

  return {
    unversionedSlug: unversionedSlug,
    unversionedData: unversionedData,
    versionedData: versionedData
  };
}

function getServerRequest(slug, callback) {
  return ajax({
    url: `${baseUrl}/rdf/node/${slug}?format=json&rec=1&ref=1`,
    dataType: 'jsonp',
    success: function(json) {
      callback(getData(json, slug));
    }
  });
}

function getOgInfo(url, callback) {
  const appId = '593a3a87b8f7370d00beedf1';
  const requestUrl = 'https://opengraph.io/api/1.0/site/' + encodeURI(url) + '?app_id=' + appId;

  return getJSON(requestUrl, callback);
}

export { getServerRequest, getOgInfo };
