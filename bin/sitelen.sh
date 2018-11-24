#!/bin/sh

vim -c 'windo set cursorbind cursorline scrollbind nowrap' -O $1.en.txt $1.tp.txt
