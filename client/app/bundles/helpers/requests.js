import { _ } from 'underscore';
import { ajax, getJSON } from 'jquery';
import constants from './constants.js';

const baseUrl = constants.baseUrl;

function getProps(prop, data) {
  const propKeyMap = {
    background: ['http://scalar.usc.edu/2012/01/scalar-ns#background', false,],
    description: ['http://purl.org/dc/terms/description',],
    title: ['http://purl.org/dc/terms/title',],
    sort: ['http://purl.org/dc/terms/spatial', true, 0,],
    format: ['http://purl.org/dc/terms/format',],
    content: ['http://rdfs.org/sioc/ns#content',],
    thumbnail: ['http://simile.mit.edu/2003/10/ontologies/artstor#thumbnail',],
    mediaUrl: ['http://simile.mit.edu/2003/10/ontologies/artstor#url',],
    medium: ['http://purl.org/dc/terms/medium',],
    type: ['http://purl.org/dc/terms/type',],
  };

  const [key, versioned = true, def = ''] = propKeyMap[prop];
  const obj = versioned ? data.versionedData : data.unversionedData;
  return obj.hasOwnProperty(key) ? obj[key][0].value : def;
}

function getData(data, slug) {
  const dataKeys = Object.keys(data);

  let state = { self: {}, children: [], loaded: true };

  for (var i = 0; i < dataKeys.length; i++) {
    const dataKey = dataKeys[i];
    const dataForKey = getDataForKey(data, dataKey);

    if (dataForKey) {
      const normalizedData = {
        slug: dataForKey.unversionedSlug,
        self: dataForKey.unversionedSlug === slug,
        medium: getProps('medium', dataForKey),
        title: getProps('title', dataForKey),
        description: getProps('description', dataForKey),
        background: getProps('background', dataForKey),
        thumbnail: getProps('thumbnail', dataForKey),
        content: getProps('content', dataForKey),
        url: getProps('mediaUrl', dataForKey),
        sort: getProps('sort', dataForKey),
        type: getProps('type', dataForKey),
        parentSlug: slug
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

    if (state.self.type === 'tags') return true;

    if (state.self.type === 'tag') {
      if (element.type === 'tag') return false;
      return element.type !== 'tags';
    }

    if (state.self.type === 'topic') {
      if (element.type === 'home') state.parent = element;
      return !(element.type === 'home' || element.type === 'tags');
    }

    if (state.self.type === 'subtopic') {
      if (element.type === 'topic') state.parent = element;
      return !(element.type === 'topic' || element.type === 'tags');
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
  const appId = '588e83ad46cdcd0d00fd827e';
  const requestUrl = 'https://opengraph.io/api/1.0/site/' + encodeURI(url) + '?app_id=' + appId;

  return getJSON(requestUrl, function(json) {
    callback(json);
  });
}

export { getServerRequest, getOgInfo };
