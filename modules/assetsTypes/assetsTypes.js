/**
 * Analyzes number of requests and sizes of different types of assets
 *
 * setMetric('htmlCount') @desc number of HTML responses
 * setMetric('htmlSize')  @desc size of HTML responses @unreliable
 * setMetric('cssCount') @desc number of CSS responses
 * setMetric('cssSize')  @desc size of CSS responses @unreliable
 * setMetric('jsCount') @desc number of JS responses
 * setMetric('jsSize')  @desc size of JS responses @unreliable
 * setMetric('jsonCount') @desc number of JSON responses
 * setMetric('jsonSize')  @desc size of JSON responses @unreliable
 * setMetric('imageCount') @desc number of image responses
 * setMetric('imageSize')  @desc size of image responses @unreliable
 * setMetric('webfontCount') @desc number of web font responses
 * setMetric('webfontSize')  @desc size of web font responses @unreliable
 * setMetric('base64Count') @desc number of base64 encoded "responses" (no HTTP request was actually made)
 * setMetric('base64Size')  @desc size of base64 encoded responses @unreliable
 * setMetric('otherCount') @desc number of other responses
 * setMetric('otherSize')  @desc size of other responses @unreliable
 */
exports.version = '0.1';

exports.module = function(phantomas) {
	['html', 'css', 'js', 'json', 'image', 'webfont', 'base64', 'other'].forEach(function(key) {
		phantomas.setMetric(key + 'Count');
		phantomas.setMetric(key + 'Size');
	});

	phantomas.on('recv', function(entry, res) {
		phantomas.incrMetric(entry.type + 'Count');
		phantomas.incrMetric(entry.type + 'Size', entry.bodySize);

		phantomas.addOffender(entry.type + 'Count', entry.url + ' (' + (entry.bodySize / 1024).toFixed(2)  + ' kB)');
	});

	phantomas.on('base64recv', function(entry, res) {
		phantomas.incrMetric('base64Count');
		phantomas.incrMetric('base64Size', entry.bodySize);
	});
};
