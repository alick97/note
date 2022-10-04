#!/bin/bash

echo "input title"
read title
title=${title:-title} 

now_date_str=$(date "+%Y%m%d")

echo "input author"
read author
author=${author:=author}

title_to_file_name=${title##*/}
title_to_file_name=${title//[_ ]/-}

file_path="tmp-$(date +%s)-${title_to_file_name}".md

echo "### $title" >> $file_path
echo "" >> $file_path
echo "created: ${now_date_str} updated: ${now_date_str} authors: ${author}" >> $file_path
echo "" >> $file_path
echo "---" >> $file_path
echo "" >> $file_path


echo "new file ${file_path} done"