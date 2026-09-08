find . -name '*.md' |xargs -I {} sed -i "s/created: \([0-9]\{8\}\)/{% tag 'created','\1' %} {% endtag %}/g" {}
find . -name '*.md' |xargs -I {} sed -i "s/updated: \([0-9]\{8\}\)/{% tag 'updated','\1' %} {% endtag %}/g" {}
find . -name '*.md' |xargs -I {} sed -i "s/authors: \([0-9a-zA-Z, ]\+\)/{% tag 'authors','\1' %} {% endtag %}/g" {}
