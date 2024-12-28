const fs = require('fs');
const path = require('path')
let _tags = {}

module.exports = {
  book: {
    assets: './assets',
    js: ['tags.js'],
    css: ['tags.css']
  },
  blocks: {
    tag: {
      process: function(block) {
        const { ctx } = this;
        const { page, file }  = ctx.ctx;
        // console.log(page.title, file.path)
        // console.log("==12", block.args)
        const [key, value] = block.args;

        if (!_tags[key]) {
          _tags[key] = {};
        }
        if (!_tags[key][value]) {
          _tags[key][value] = [];
        }
        _tags[key][value].push({
          title: page.title,
          path: file.path.replace(/\.md$/, '.html')
        })
        const t = `${key}: ${value}`;
        // console.log(t)
        return t;
      }
    }
  },

  hooks: {
    'finish:before': function() {
      // reverse sort
      let _reverse_tags = {} 
      for (let k of Object.keys(_tags)) {
        _reverse_tags[k] = [];
        let valKeys = Object.keys(_tags[k]);
        valKeys.sort((a, b) => b.localeCompare(a));
        for (let k1 of valKeys) {
          _reverse_tags[k].push({
            key: k1,
            value: _tags[k][k1]
          })
        }
      }
      const jsonData = JSON.stringify(_reverse_tags, null, 2)
      _tags = {}
      _reverse_tags = {}

      const p = path.resolve(this.options.output, '__tags.json')
      fs.writeFile(p, jsonData, 'utf8', (err) => {
        if (err) {
          console.error('An error occurred while writing JSON Object to File:', err);
          return;
        }
        console.log(`JSON file has been saved, file: ${p}`);
      });
    },
  },
};
