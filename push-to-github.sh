#!/bin/bash

if [ "$TRAVIS_PULL_REQUEST" == "false" ] && [ "$TRAVIS_REPO_SLUG" == "coughingmouse/vowel_triangle" ] && [ "$TRAVIS_TAG" != "" ]; then
    echo "Commit made to coughingmouse/vowel_triangle, is not a pull request and has a tag"
    echo "Pushing master branch to gh-pages."
    
    cp ./travis-ssh ~/.ssh/id_rsa
    chmod 600 ~/.ssh/id_rsa

    git config --global user.email "travis@travis-ci.org"
    git config --global user.name "travis-ci"

    git remote add github git@github.com:coughingmouse/vowel_triangle.git

    git checkout -b gh-pages
    git add -f doc
    git add -f README.html
    git add -f out
    git commit -m "Travis auto push $TRAVIS_TAG to gh-pages"
    git push -f github gh-pages
fi
