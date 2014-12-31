#!/bin/bash

file=$1

echo inserting to $file

sed -i '' '
# find YAML header
/^---$/ {
# read next line
    N
# found empty line
    /\n$/ {
# insert above
      i\
author: Oversatt fra [Code Club UK](//codeclub.org.uk)\
license: "[Code Club World Limited Terms of Service](https://github.com/CodeClub/scratch-curriculum/blob/master/LICENSE.md)"
    }
}
' $file
