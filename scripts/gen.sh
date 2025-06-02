#!/bin/bash
set -e

echo "input title"
read title
title=${title:-title} 

now_date_str=$(date "+%Y%m%d")

echo "input author"
read author
author=${author:=author}

title_to_file_name="${title##*/}"
title_to_file_name="$(echo -n $title_to_file_name | sed -e 's/[ _]\+/-/g' -e 's/-\+/-/g')"

file_path="tmp-$(date +%s)-${title_to_file_name}".md

echo "# $title" >> $file_path
echo "" >> $file_path
echo "{% tag 'created','${now_date_str}' %} {% endtag %} {% tag 'updated','${now_date_str}' %} {% endtag %} {% tag 'authors','${author}' %} {% endtag %}" >> $file_path
echo "" >> $file_path
echo "---" >> $file_path
echo "" >> $file_path


echo "new file ${file_path} done"