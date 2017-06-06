#!/bin/sh

echo "Starting unoconv"
/usr/bin/unoconv --listener --server=0.0.0.0 --port=2002 &
sleep 2
node index.js
