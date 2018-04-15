const EventBus = new Vue();

/* ==========================================================================
   Global Vue Variables
   ========================================================================== */

// Vue.prototype.State = State;

/* ==========================================================================
   Global Vue Functions
   ========================================================================== */

Vue.prototype.truncate = function(number, decimalPlaces = 0) {
	if (isNaN(number) || !number) return number;

	if (decimalPlaces == 0) {
		return Math.trunc(number);
	}

	return number.toFixed(decimalPlaces);
};

Vue.prototype.round = function(number) {
	return (isNaN(number)) ? number : Math.round(number);
};

Vue.prototype.percent = function(item) {
	if (!item) return item;

	return item + '%';
};

Vue.prototype.append = function(item, postFix) {
	if (!item) return item;

	return item + postFix;
};

Vue.prototype.plus = function(number) {
	if (isNaN(number)) return number;

	return (number > 0) ? `+${number}` : number;
};

Vue.prototype.formatNumber = function(number, addPlus = false) {
	if (isNaN(number)) return number;
	const prefix = (number > 0 && addPlus) ? '+' : '';
	return prefix + Math.round(number).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

Vue.prototype.humanizeNumber = function(number, decimalPlaces = 1) {
	if (isNaN(number)) return number;

	if (decimalPlaces == 0) {
		let humanizedNumber = Humanize.compactInteger(number, 1);

		if (humanizedNumber.includes('.')) {
			let numberPostfixString = humanizedNumber.substring(humanizedNumber.indexOf('.') + 1);
			let postfixMatch = numberPostfixString.match(/\D/g);

			humanizedNumber = humanizedNumber.substring(0, humanizedNumber.indexOf('.'));
			humanizedNumber = (postfixMatch && postfixMatch.length > 0) ? humanizedNumber + postfixMatch[0] : humanizedNumber;
		}

		return humanizedNumber;
	}

	return Humanize.compactInteger(number, decimalPlaces);
};

Vue.prototype.duration = function(seconds) {
	if (isNaN(seconds)) return seconds;
	return moment.duration(seconds * 1000).humanize();
};

Vue.prototype.positiveNegative = function(number) {
	if (isNaN(number) || number == 0) return '';
	return (number > 0) ? 'positive' : 'negative';
};

Vue.prototype.pullVanNumber = function(vanTitle) {
	if (!vanTitle) return '';
	return vanTitle.split("Van ")[1];
};

/* ==========================================================================
   Global Filters
   ========================================================================== */

Vue.filter('truncate', Vue.prototype.truncate);
Vue.filter('round', Vue.prototype.round);
Vue.filter('percent', Vue.prototype.percent);
Vue.filter('append', Vue.prototype.append);
Vue.filter('plus', Vue.prototype.plus);
Vue.filter('number', Vue.prototype.formatNumber);
Vue.filter('humanize', Vue.prototype.humanizeNumber);
Vue.filter('duration', Vue.prototype.duration);
Vue.filter('pullVanNumber', Vue.prototype.pullVanNumber);

/* ==========================================================================
   Global Functions
   ========================================================================== */

function cloneObject(obj) {
	if (obj === null || typeof(obj) !== 'object' || 'isActiveClone' in obj)
		return obj;

	if (obj instanceof Date)
		var temp = new obj.constructor(); //or new Date(obj);
	else
		var temp = obj.constructor();

	for (var key in obj) {
		if (Object.prototype.hasOwnProperty.call(obj, key)) {
			obj['isActiveClone'] = null;
			temp[key] = cloneObject(obj[key]);
			delete obj['isActiveClone'];
		}
	}

	return temp;
}

Array.prototype.sortBy = function(property, sortDirection) {
	const ACSENDING_CLASS = 'ascending';

	if (sortDirection == ACSENDING_CLASS) {
		return this.slice(0).sort(function(a, b) {
			return (a[property] > b[property]) ? -1 : (a[property] < b[property]) ? 1 : 0;
		});
	} else {
		return this.slice(0).sort(function(a, b) {
			return (a[property] > b[property]) ? 1 : (a[property] < b[property]) ? -1 : 0;
		});
	}
}

Array.prototype.uniqueMerge = function(array) {
	return [...new Set(this.concat(array))];
}

function scrollToTop() {
	document.body.scrollTop = document.documentElement.scrollTop = 0;
}

function isViewable(element, percentX, percentY){
    const tolerance = 0.01;   // needed because the rects returned by getBoundingClientRect provide the position up to 10 decimals

    if(percentX == null){
        percentX = 100;
    }

    if(percentY == null){
        percentY = 100;
    }

    const elementRect = element.getBoundingClientRect();
    const parentRects = [];

    while(element.parentElement != null){
        parentRects.push(element.parentElement.getBoundingClientRect());
        element = element.parentElement;
    }

    const visibleInAllParents = parentRects.every(function(parentRect){
        const visiblePixelX = Math.min(elementRect.right, parentRect.right) - Math.max(elementRect.left, parentRect.left);
        const visiblePixelY = Math.min(elementRect.bottom, parentRect.bottom) - Math.max(elementRect.top, parentRect.top);
        const visiblePercentageX = visiblePixelX / elementRect.width * 100;
        const visiblePercentageY = visiblePixelY / elementRect.height * 100;

        return visiblePercentageX + tolerance > percentX && visiblePercentageY + tolerance > percentY;
    });

    return visibleInAllParents;
}

String.prototype.hashCode = function() {
  let hash = 0, i, chr;
  if (this.length === 0) return hash;
  for (i = 0; i < this.length; i++) {
    chr   = this.charCodeAt(i);
    hash  = ((hash << 5) - hash) + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return Math.abs(hash);
};

function uuid() {
    function randomDigit() {
        if (crypto && crypto.getRandomValues) {
            var rands = new Uint8Array(1);
            crypto.getRandomValues(rands);
            return (rands[0] % 16).toString(16);
        } else {
            return ((Math.random() * 16) | 0).toString(16);
        }
    }

    const crypto = window.crypto || window.msCrypto;
    return 'xxxxxxxx-xxxx-4xxx-8xxx-xxxxxxxxxxxx'.replace(/x/g, randomDigit);
}

Date.prototype.getUnixTime = function() {
    return this.getTime() / 1000 | 0;
};

Date.time = function() {
    return new Date().getUnixTime();
}

function getActiveLocations() {
	const activeLocations = [];
	for (const location of Object.keys(State.filters.locations)) {
		if (State.filters.locations[location].isChecked) {
			activeLocations.push(location);
		}
	}

	return activeLocations;
}

function getActiveLocationStockTickers() {
	const activeLocations = {};
	for (const location of Object.keys(State.filters.locations)) {
		if (State.filters.locations[location].isChecked) {
			activeLocations[location] = Chains[location].stockTicker;
		}
	}

	return activeLocations;	
}

function stopRequest(request) {
	try {
		if (request) {
			request.abort();
		}
	} catch (ex) {}
}