#!/bin/sh
# for qute only for now
if [[ $(xdg-mime query default x-scheme-handler/http) = org.qutebrowser.qutebrowser.desktop ]]; then
	cp scraper.js ~/.config/qutebrowser/greasemonkey/spotify-metadata-scraper.js
	cp receiver.py ~/.config/polybar/spotify-metadata-receiver.py
else if # WIP #
