# Spotify Browser Metadata Script

> Continuously extract metadata in real-time from a open.spotify.com page to a file with a custom Python format string

## Features
- Does not use Spotify's Web API, so you are not subject to rate-limiting
- It relies on the web page, so the playback does not have to actually happen on the device running the script
  (i.e. it works fine when playing remotely with Spotify Connect)
- It's pretty dang fast. This is because it reacts as soon as the UI changes, using `MutationObserver`, and the HTTP traffic does not exit the machine (except if you use an actual IP for `HOST` instead of `localhost`)
- It provides the following information on the current track:
  - The artist(s) (`artist`) (,-separated)
  - The track's name (`title`)
  - If it was liked (`liked`)
  - If we are in shuffle mode (`shuffle`)
  - If we are looping ('repeat current track', i.e. a loop icon with a 1 in the UI) (`loop`)
  - If we are repeating (repeating the current album/playlist/whatever) (`repeat`) (`loop` implies `repeat`, but not the other way around)
  - If the track is playing right now (`playing`)
- You format your string using [Python f-strings](https://realpython.com/python-f-strings), so you can do pretty much anything (even execute remote code, technically).

## Caveats

- It relies on the web page, so if Spotify changes its DOM structure, things will break.
  As long as I use the script, any breakage will be fixed relatively soon.
  A bit of experience with your browser's DevTools is enough to fix it by yourself, though.
- It does not provide the album's name at the moment, since this does not appear anywhere in the persistent player controls at the bottom.
- It's a bit more complicated to setup than simply running `sudo pacman -S spotify-tui`, but this can be improved with setup scripts, I'm considering that.
- You format your strings using [Python f-strings](https://realpython.com/python-f-strings), so there are some annoying gotchas, like:
  - You can't use backlashes (so no escape sequences) inside an `{expression}` (a workaround: use `chr(92)`. Yeah, it ain't pretty. You could also use a visually similar character like set minus `∖` instead. For escape sequences, you could also use `chr`. Use `ord` in a Python shell to get the desired escape sequence's number.)
  - You can't use single quotes inside an `{expression}` (a workaround: use single quotation marks `‘` or `’` instead of an apostrophe `'`)
    

## How it works

This is made of two parts:

- A client userscript that injects itself in any `open.spotify.com` page:
  1. It listens to DOM changes in the Spotify player controls bar at the bottom of the page
  2. When anything interesting changes:
     1. It extracts information from the DOM into a status object
     1. It sends a GET HTTP request to `localhost:8887` (the port can be changed by editing the userscript), transmitting the status object via query parameters

- A server that receives status updates
  1. It listens for requests to the provided host and port
  2. When a request arrives, it uses the provided f-string to render a status text
  3. That status text is written to a file at the provided location

Then, you can use that file anywhere to, for example, display it in your status bar

## Installation

### The userscript (`scraper.user.js`)

#### Firefox & Chromium derivatives (Chrome, Brave, Opera, Edge,…)

1. Install the Greasemonkey extension/addon through the store
1. Install the userscript with OpenUserJS at <https://openuserjs.org/scripts/ewen-lbh/Spotify_Browser_Metadata_--_Scraper_userscript>

#### Qutebrowser

Place `scraper.user.js` in `~/.config/qutebrowser/greasemonkey/`

### The receiver (`receiver.py`)

It requires python ≥3.6.
This can be placed anywhere, you'll just have to let it run in the background.
If you ever want to reload it, be sure to terminate all previous instances, it can't use the same port twice.

## Configuration

Be sure to select a port that will be free.
Specify that port in `scraper.user.js` by modifying `PORT` at the top:

```javascript
// ==UserScript==
// @name Spotify Browser Metadata -- Scraper userscript
// @namespace https://open.spotify.com
// @description Sends a GET request to notify a server of playback state changes
// @include https://open.spotify.com/*
// @author ewen-lbh <hey@ewen.works>
// ==/UserScript==

const PORT = 8887 // <---- PUT YOUR PORT HERE
const HOST = "localhost" // <--- PUT THE HOST HERE (you probably won't need to modify this)
```

The server takes four arguments:

```sh
python receiver.py HOST PORT FORMAT_STRING OUTPUT_FILEPATH
```

- `PORT`: Use the same port as `scraper.user.js`'s
- `HOST`: Use the same hostname as `scraper.user.js`'s (probably "localhost")
- `FORMAT_STRING`: A python f-string, without the `f"` at the start nor the `"` at the end. 
  Allowed variables are the ones described in [Features](#features).
  Note that `receiver.py` quotes your f-string with single quotes. 
  This is to be consistent with how you'll pass the string to your shell, since you'll probably use single quotes too to avoid having to escape backslashes twice, for example.
  This means that you'll have to escape single quotes inside the format string.
  A small function is available for convenience: `i(text, boolean)`, which outputs `text` if `boolean` is True and `""` otherwise.
- `OUTPUT_FILEPATH`: A filepath to write the evaluated `FORMAT_STRING` (i.e. the output) to.
  The filepath's parent directory must exist before running the script.
  `~` and `~user` constructs are handled, using [`pathlib.Path.expanduser`](https://docs.python.org/3/library/pathlib.html#pathlib.Path.expanduser)

## Examples

Currently, one Polybar example is available in `examples/polybar/`. (It's a trim of my polybar configuration with just enough to illustrate this Spotify script)
I might add others.
I'll happily accept PRs too, if you have any other setup (be it just another bar like lemonbar or i3status, or something completely different)
