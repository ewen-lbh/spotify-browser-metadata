// ==UserScript==
// @name Spotify Browser Metadata -- Scraper userscript
// @namespace https://openuserjs.org/users/ewen-lbh
// @description Sends a GET request to notify a server of playback state changes
// @include https://open.spotify.com/*
// @copyright 2021, Ewen Le Bihan (https://ewen.works)
// @license MIT
// @version 0.0.1
// @homepageURL https://github.com/ewen-lbh/spotify-browser-metadata-script
// @contributionURL https://github.com/ewen-lbh/spotify-browser-metadata-script
// @supportURL https://github.com/ewen-lbh/spotify-browser-metadata-script/issues
// @updateURL https://raw.githubusercontent.com/ewen-lbh/spotify-browser-metadata-script/master/scraper.user.js
// @downloadURL https://raw.githubusercontent.com/ewen-lbh/spotify-browser-metadata-script/master/scraper.user.js
// ==/UserScript==
//
// ==OpenUserJS==
// @author ewen-lbh
// ==/OpenUserJS==

const PORT = 8887 // <---- PUT YOUR PORT HERE
const HOST = "localhost" // <--- PUT THE HOST HERE (you probably won't need to modify this)
const PROTOCOL = "http" // The protocol used to send the request. Supported protocols are XMLHttpRequest's supported protocols.

/*
 * arrive.js
 * v2.4.1
 * https://github.com/uzairfarooq/arrive
 * MIT licensed
 *
 * Copyright (c) 2014-2017 Uzair Farooq
 */

var Arrive=function(e,t,n){"use strict";function r(e,t,n){l.addMethod(t,n,e.unbindEvent),l.addMethod(t,n,e.unbindEventWithSelectorOrCallback),l.addMethod(t,n,e.unbindEventWithSelectorAndCallback)}function i(e){e.arrive=f.bindEvent,r(f,e,"unbindArrive"),e.leave=d.bindEvent,r(d,e,"unbindLeave")}if(e.MutationObserver&&"undefined"!=typeof HTMLElement){var o=0,l=function(){var t=HTMLElement.prototype.matches||HTMLElement.prototype.webkitMatchesSelector||HTMLElement.prototype.mozMatchesSelector||HTMLElement.prototype.msMatchesSelector;return{matchesSelector:function(e,n){return e instanceof HTMLElement&&t.call(e,n)},addMethod:function(e,t,r){var i=e[t];e[t]=function(){return r.length==arguments.length?r.apply(this,arguments):"function"==typeof i?i.apply(this,arguments):n}},callCallbacks:function(e,t){t&&t.options.onceOnly&&1==t.firedElems.length&&(e=[e[0]]);for(var n,r=0;n=e[r];r++)n&&n.callback&&n.callback.call(n.elem,n.elem);t&&t.options.onceOnly&&1==t.firedElems.length&&t.me.unbindEventWithSelectorAndCallback.call(t.target,t.selector,t.callback)},checkChildNodesRecursively:function(e,t,n,r){for(var i,o=0;i=e[o];o++)n(i,t,r)&&r.push({callback:t.callback,elem:i}),i.childNodes.length>0&&l.checkChildNodesRecursively(i.childNodes,t,n,r)},mergeArrays:function(e,t){var n,r={};for(n in e)e.hasOwnProperty(n)&&(r[n]=e[n]);for(n in t)t.hasOwnProperty(n)&&(r[n]=t[n]);return r},toElementsArray:function(t){return n===t||"number"==typeof t.length&&t!==e||(t=[t]),t}}}(),c=function(){var e=function(){this._eventsBucket=[],this._beforeAdding=null,this._beforeRemoving=null};return e.prototype.addEvent=function(e,t,n,r){var i={target:e,selector:t,options:n,callback:r,firedElems:[]};return this._beforeAdding&&this._beforeAdding(i),this._eventsBucket.push(i),i},e.prototype.removeEvent=function(e){for(var t,n=this._eventsBucket.length-1;t=this._eventsBucket[n];n--)if(e(t)){this._beforeRemoving&&this._beforeRemoving(t);var r=this._eventsBucket.splice(n,1);r&&r.length&&(r[0].callback=null)}},e.prototype.beforeAdding=function(e){this._beforeAdding=e},e.prototype.beforeRemoving=function(e){this._beforeRemoving=e},e}(),a=function(t,r){var i=new c,o=this,a={fireOnAttributesModification:!1};return i.beforeAdding(function(n){var i,l=n.target;(l===e.document||l===e)&&(l=document.getElementsByTagName("html")[0]),i=new MutationObserver(function(e){r.call(this,e,n)});var c=t(n.options);i.observe(l,c),n.observer=i,n.me=o}),i.beforeRemoving(function(e){e.observer.disconnect()}),this.bindEvent=function(e,t,n){t=l.mergeArrays(a,t);for(var r=l.toElementsArray(this),o=0;o<r.length;o++)i.addEvent(r[o],e,t,n)},this.unbindEvent=function(){var e=l.toElementsArray(this);i.removeEvent(function(t){for(var r=0;r<e.length;r++)if(this===n||t.target===e[r])return!0;return!1})},this.unbindEventWithSelectorOrCallback=function(e){var t,r=l.toElementsArray(this),o=e;t="function"==typeof e?function(e){for(var t=0;t<r.length;t++)if((this===n||e.target===r[t])&&e.callback===o)return!0;return!1}:function(t){for(var i=0;i<r.length;i++)if((this===n||t.target===r[i])&&t.selector===e)return!0;return!1},i.removeEvent(t)},this.unbindEventWithSelectorAndCallback=function(e,t){var r=l.toElementsArray(this);i.removeEvent(function(i){for(var o=0;o<r.length;o++)if((this===n||i.target===r[o])&&i.selector===e&&i.callback===t)return!0;return!1})},this},s=function(){function e(e){var t={attributes:!1,childList:!0,subtree:!0};return e.fireOnAttributesModification&&(t.attributes=!0),t}function t(e,t){e.forEach(function(e){var n=e.addedNodes,i=e.target,o=[];null!==n&&n.length>0?l.checkChildNodesRecursively(n,t,r,o):"attributes"===e.type&&r(i,t,o)&&o.push({callback:t.callback,elem:i}),l.callCallbacks(o,t)})}function r(e,t){return l.matchesSelector(e,t.selector)&&(e._id===n&&(e._id=o++),-1==t.firedElems.indexOf(e._id))?(t.firedElems.push(e._id),!0):!1}var i={fireOnAttributesModification:!1,onceOnly:!1,existing:!1};f=new a(e,t);var c=f.bindEvent;return f.bindEvent=function(e,t,r){n===r?(r=t,t=i):t=l.mergeArrays(i,t);var o=l.toElementsArray(this);if(t.existing){for(var a=[],s=0;s<o.length;s++)for(var u=o[s].querySelectorAll(e),f=0;f<u.length;f++)a.push({callback:r,elem:u[f]});if(t.onceOnly&&a.length)return r.call(a[0].elem,a[0].elem);setTimeout(l.callCallbacks,1,a)}c.call(this,e,t,r)},f},u=function(){function e(){var e={childList:!0,subtree:!0};return e}function t(e,t){e.forEach(function(e){var n=e.removedNodes,i=[];null!==n&&n.length>0&&l.checkChildNodesRecursively(n,t,r,i),l.callCallbacks(i,t)})}function r(e,t){return l.matchesSelector(e,t.selector)}var i={};d=new a(e,t);var o=d.bindEvent;return d.bindEvent=function(e,t,r){n===r?(r=t,t=i):t=l.mergeArrays(i,t),o.call(this,e,t,r)},d},f=new s,d=new u;t&&i(t.fn),i(HTMLElement.prototype),i(NodeList.prototype),i(HTMLCollection.prototype),i(HTMLDocument.prototype),i(Window.prototype);var h={};return r(f,h,"unbindAllArrive"),r(d,h,"unbindAllLeave"),h}}(window,"undefined"==typeof jQuery?null:jQuery,void 0);

console.log('[spotify-browser-metadata-script] initializing state');
let state = {
	repeat: false,
	loop: false,
	shuffle: false,
	liked: false,
	artist: "",
	title: "",
	playing: false,
	// album: "", can't get it via the DOM
};

let previousState = {}

function getElementByTestID(testid) {
	return document.querySelector(`[data-testid="${testid}"]`)
}

function stateToQuerystring(obj) {
	let str = [];
	for (let p in obj) {
		if (obj.hasOwnProperty(p)) {
		  str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
		}
	}
	return "?" + str.join("&");
}

function durationStringToSeconds(durationString) {
	let [seconds, minutes, hours] = durationString.split(':').reverse()
	return parseInt(seconds) + 60 * parseInt(minutes) + 3600 * (hours === undefined ? 0 : parseInt(hours))

}

function updateState(mutations) {
	if (mutations.every(mut => mut.target.className.includes('progress-bar'))) {
		// Don't send a request when time advances but nothing else.
		return
	}
	previousState = JSON.parse(JSON.stringify(state))
	state.repeat = getElementByTestID("control-button-repeat")?.getAttribute('aria-checked') !== "false";
	state.loop =  getElementByTestID("control-button-repeat")?.getAttribute('aria-checked') === "mixed";
	state.liked = document.querySelector('button.control-button-heart')?.getAttribute('aria-checked') === "true";
	state.shuffle = getElementByTestID("control-button-shuffle")?.getAttribute('aria-checked') === "true";
	state.artist = getElementByTestID("context-item-info-subtitles")?.innerText;
	state.title = getElementByTestID("context-item-link")?.text;
	state.playing = document.querySelector('.player-controls__buttons').querySelectorAll('[aria-label="Pause"]').length > 0;
	state.elapsed = durationStringToSeconds(getElementByTestID("playback-position")?.textContent)
	state.duration = durationStringToSeconds(getElementByTestID("playback-duration")?.textContent)
	state.current_lyric  = document.querySelector('[style="--animation-index:1;"]')?.textContent || ""
	state.upcoming_lyric  = document.querySelector('[style="--animation-index:2;"]')?.textContent || ""
	// Don't send the exact same data again
	// This won't work on browsers where JSON.stringify does not guarantee
	// object key order.
	// In that case, you'll get duplicate requests (around four while I was testing)
	// when switching songs instead of one. what a big deal!
	// I suspect it does nothing, performance-wise.
	if (JSON.stringify(state) == JSON.stringify(previousState)) {
		// console.log('[spotify-browser-metadata-script] skipping push: state did not change since last push')
		return
	}
	let request = new XMLHttpRequest();
	request.open("GET", `${PROTOCOL}://${HOST}:${PORT}/` + stateToQuerystring(state));
	request.send();
	// console.log(`[spotify-browser-metadata-script] pushed state ${JSON.stringify(state)}`)
}

function startObserving() {
	console.log('[spotify-browser-metadata-script] starting observers')
	const observer = new MutationObserver(updateState);
	observer.observe(document.querySelector('.Root__now-playing-bar'), {
		attributesFilter: ["aria-checked", "aria-label"],
		attributes: true,
		// childList: true,
		subtree: true,
		// characterData: true,
	});
	observer.observe(getElementByTestID("now-playing-widget"), {
		subtree: true,
		characterData: true,
	});
	observer.observe(document.querySelector('[style*=lyrics]'), {
		characterData: true,
		subtree: true,
	});
}

console.log('[spotify-browser-metadata-script] waiting for [data-testid="now-playing-widget"]...');
document.arrive('[data-testid="now-playing-widget"]', startObserving);
