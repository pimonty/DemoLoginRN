#!/bin/bash
echo -n "Enter some text > "
read text
echo "You entered: $text"

while true; do
    read -p "Do you wish to install this program?" yn
    case $yn in
        [Yy]* ) git add .; git commit -m $1 ; git push -u origin master ; break;;
        [Nn]* ) exit;;
        * ) echo "Please answer yes or no.";;
    esac
done


