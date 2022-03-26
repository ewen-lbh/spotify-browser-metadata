#!/usr/bin/env python
from http.server import BaseHTTPRequestHandler, HTTPServer
from urllib.parse import parse_qs
import sys
import os
from rich import print
from pathlib import Path


_, hostname, port, format_string, output_filepath = sys.argv

def resolve_parsed_qs(parsed_qs):
    """
    Returns a dict that is identical to parse_qs from urllib.parse, except that:

    - 'true' and 'false' become resp. True and False
    - 'undefined' becomes None
    - lists of one element are converted to their only element
    - strings of numbers (such that calling int or float does not raise a ValueError) become either ints or floats
    """
    def value(v):
        if isinstance(v, list) and len(v) == 1:
            v = v[0]
        if v == "true":
            return True
        if v == "false":
            return False
        if v == "undefined":
            return None
        try:
            v = int(v)
        except ValueError:
            try:
                v = float(v)
            except ValueError:
                v = str(v)
        return v
    return { k: value(v) for k, v in parsed_qs.items() } 

# custom formatting to use boolean values more cleanly.
# essentially, {thing:stuff?} becomes a shorthand for {thing if stuff else ""}
def i(text, value):
    return text if value else ""

# Cuts up a number by dividing it successively, returning len(divisors)+1 arguments (last is the rest of the last division)
def divmod_n(amount: int, *divisors: int) -> list[int]:
    divided = []
    for divisor in divisors:
        result, rest = divmod(amount, divisor)
        divided.append(result)
        amount = rest
    return divided + [rest]

# Turns an amount of seconds into a duration string, using hours:minutes'seconds" notation
def duration_string(seconds: int) -> str:
    print(f"turning {seconds} into a duration string")
    hours, minutes, seconds = divmod_n(seconds, 3600, 60)
    if not hours:
        return f"{minutes:02}'{seconds:02}\""
    return f"{hours:02}:{minutes:02}'{seconds:02}\""


# TODO: a better syntax, make this work:
# $ python spotfify-metadata-receiver.py localhost 8888 '{♥ :heart?}{↦ :!repeat?}{artist}: {title}'
# instead of using '{i("♥ ", heart)}{i("↦ ", not repeat)}{artist}: {title}'

class SpotifyReceiver(BaseHTTPRequestHandler):
    def log_request(self, code='-', size='-'):
        pass
    def do_GET(self):
        _, qs = self.path.split('?')
        data = resolve_parsed_qs(parse_qs(qs, keep_blank_values=True))
        if data.get('title') is None and data.get('artist') is None:
            evaluated_format_string = ""
        else:
            evaluated_format_string = eval(f"(lambda {', '.join(data.keys())}: f'{format_string}')(" + ", ".join(f"data[{key!r}]" for key in data)  + ")")
        Path(output_filepath).expanduser().write_text(evaluated_format_string, encoding="utf8")
        self.send_response(200)
        self.send_header("Access-Control-Allow-Origin", "*")
        self.end_headers()

receiver = HTTPServer((hostname, int(port)), SpotifyReceiver)
receiver.serve_forever()


