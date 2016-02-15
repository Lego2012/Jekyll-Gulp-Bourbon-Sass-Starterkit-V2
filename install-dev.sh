#!/bin/bash
bundle
echo '++++++++++++++++++++'
echo '++++++++++++++++++++'
echo 'Bundle installed.'
echo '++++++++++++++++++++'
echo '++++++++++++++++++++'
bower install
echo '++++++++++++++++++++++++++++'
echo '++++++++++++++++++++++++++++'
echo 'Bower programs installed.'
echo '++++++++++++++++++++++++++++'
echo '++++++++++++++++++++++++++++'
cd app/_assets/scss/0-plugins
bourbon install
neat install
bitters install
echo '+++++++++++++++++++++++++++++++++++++'
echo '+++++++++++++++++++++++++++++++++++++'
echo 'Bourbon, Neat and Bitters installed.'
echo '+++++++++++++++++++++++++++++++++++++'
echo '+++++++++++++++++++++++++++++++++++++'
npm install
echo '++++++++++++++++++++++++++++'
echo '++++++++++++++++++++++++++++'
echo 'npm dependencies installed.'
echo 'The Script ends here.'
echo '++++++++++++++++++++++++++++'
echo '++++++++++++++++++++++++++++'
