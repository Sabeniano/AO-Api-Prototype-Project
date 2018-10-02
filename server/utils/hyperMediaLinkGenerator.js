const removeTrailingSlashes = require('../utils/trailingSlashes');

function generateLinks(record, hostname, url, endPoints) {
  for (let i = 0; i < endPoints.length; i += 1) {
    if (endPoints[i].rel === 'owner') {
      //  shave off everything after the last slash in the url
      const newUrl = url.substring(0, url.lastIndexOf('/') + 1);
      record.links.push({
        rel: endPoints[i].rel,
        type: endPoints[i].type,
        href: `http://${hostname}${newUrl}`,
        description: endPoints[i].description,
      });
    } else if (endPoints[i].rel !== 'self') {
      record.links.push({
        rel: endPoints[i].rel,
        type: endPoints[i].type,
        href: `http://${hostname}${url}/${record._id}/${endPoints[i].rel}`,
        description: endPoints[i].description,
      });
    } else {
      record.links.push({
        rel: endPoints[i].rel,
        type: endPoints[i].type,
        href: `http://${hostname}${url}/${record._id}`,
        description: endPoints[i].description,
      });
    }
  }
}

function generateChildLinks(record, hostname, url, endPoints) {
  for (let i = 0; i < endPoints.length; i += 1) {
    if (endPoints[i].rel === 'owner') {
      //  shave off everything after the last slash in the url
      const newUrl = url.substring(0, url.lastIndexOf('/') + 1);
      record.links.push({
        rel: endPoints[i].rel,
        type: endPoints[i].type,
        href: `http://${hostname}${newUrl}`,
        description: endPoints[i].description,
      });
    } else {
      record.links.push({
        rel: endPoints[i].rel,
        type: endPoints[i].type,
        href: `http://${hostname}${url}`,
        description: endPoints[i].description,
      });
    }
  }
}

function hateoasGenerator(record, hostName, url, endPoints, options) {
  //  replace the double forward slash with one for link generator
  let newUrl = removeTrailingSlashes(url);

  const opts = options || {};
  if (opts.removeUrlSlashes && opts.removeUrlSlashes !== 0) {
    for (let i = 0; i < opts.removeUrlSlashes; i += 1) {
      newUrl = newUrl.substring(0, newUrl.lastIndexOf('/'));
    }
  }

  if (opts.isChild) {
    generateChildLinks(record, hostName, url, endPoints);
  } else {
    generateLinks(record, hostName, newUrl, endPoints);
  }
}

module.exports = hateoasGenerator;
