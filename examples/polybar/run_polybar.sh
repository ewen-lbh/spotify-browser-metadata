#!/bin/bash

# Terminate already running bar instances
killall -q polybar

# Wait until the processes have been shut down
while pgrep -u $UID -x polybar >/dev/null; do sleep 1; done

# Launch spotify metadata receiver script
# TODO: kill previous instances within spotify-metadata-receiver.py itself
kill $(pgrep -af "python $HOME/.config/polybar/spotify-metadata-receiver.py" | cut -d' ' -f1)
python ~/.config/polybar/spotify-metadata-receiver.py localhost 8887 '{i("♥ ", liked)}{i("→ ", not repeat)}{i("¹↷", loop)}{i("⇄", shuffle)}{artist} — {title}'

# Launch Polybar
polybar -c ~/.config/polybar/config.ini top &

echo "Polybar launched."

