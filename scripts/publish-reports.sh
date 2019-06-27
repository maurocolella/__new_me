#!/bin/bash
# Relax ident for github
# mkdir ~/.ssh/
echo -e "Host github.com\n\tStrictHostKeyChecking no\n" >> ~/.ssh/config

git clone git@github.com:maurocolella/maurocolella.github.io.git ../page
rm -R ../page/reports
cp -R ~/workflow/reports ../page
git config credential.helper 'cache --timeout=180'
git config --global user.email "<email>"
git config --global user.name "CircleCI"

ls -al ../page/reports

cd ../page || exit
git add .
git commit -a -m "Update reports"
git push
