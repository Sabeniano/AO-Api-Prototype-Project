function removeTrailingSlashes(url) {
  if (url.endsWith('/')) {
    //  replace the double forward slash with one
    const urlEnd = url.replace(/\/\/+/g, '/');
    //  remove the single forward slashamrk
    return urlEnd.substring(0, urlEnd.length - 1);
  }
  return url;
}

module.exports = removeTrailingSlashes;
