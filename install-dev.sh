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
cp app/_bower_components/normalize-css/normalize.css app/_assets/scss/_normalize.scss
echo '+++++++++++++++++++++++'
echo '+++++++++++++++++++++++'
echo 'normalize.css renamed.'
echo '+++++++++++++++++++++++'
echo '+++++++++++++++++++++++'
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
echo '++++++++++++++++++++++++++++'
echo '++++++++++++++++++++++++++++'
cd ../../../../docs/bitters-adjusted
cp _base.scss ../../app/_assets/scss/0-plugins/base
cp _grid-settings.scss ../../app/_assets/scss/0-plugins/base
echo '+++++++++++++++++++++++++++++++++++++'
echo '+++++++++++++++++++++++++++++++++++++'
echo 'Bitters Files adjusted.'
echo 'The Script ends here.'
echo '+++++++++++++++++++++++++++++++++++++'
echo '+++++++++++++++++++++++++++++++++++++'
