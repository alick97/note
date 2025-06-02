require(['gitbook', 'jquery'], function(gitbook, $) {

let $tagsContainer
let $originalSearchResult
let $searchInput
let $tagsLink
let $tagsKey
let $tagsValue
let $tagsPageList


function bindElement() {
  $tagsContainer = $('#tags-container')
  $originalSearchResult = $('#original-search-result')
  $searchInput = $('#book-search-input input');
  $tagsLink = $('#tags-link')
  $tagsKey = $('#tags-key')
  $tagsValue = $('#tags-value')
  $tagsPageList = $('#tags-page-list')
}

async function _fetchTagsData() {
    let d = {};
    // {                                                                    
    //   "created": [                    
    //     {                             
    //       "key": "20241216",          
    //       "value": [                  
    //         {                         
    //           "title": "music",                                          
    //           "path": "tools/music.html"                                 
    //         }                         
    //       ]                           
    //     },                            
    //     {                             
    //       "key": "20241116",          
    //       "value": [                  
    //         {                                                            
    //           "title": "music",                                          
    //           "path": "tools/music.html"                                 
    //         },                        
    //         {                         
    //           "title": "music",       
    //           "path": "tools/music.html"                                 
    //         },                        
    //         {                         
    //           "title": "music",       
    //           "path": "tools/music.html"                                 
    //         },                                                           
    //         {                                                            
    //           "title": "music",                                          
    //           "path": "tools/music.html"                                 
    //         }                                                            
    //       ]                                                              
    //     }                                                                
    //   ],                     
    
    d = await $.getJSON(`${gitbook.state.basePath}/__tags.json`);
    return d;
}


let _current_tags_key = null;
let _current_tags_value = null;

function resetTagsKeyValue() {
    _current_tags_key = null;
    _current_tags_value = null;
};

let _tag_data = {};
async function initTagPage() {
  console.log('init tag page');
  _tag_data = await _fetchTagsData();
  renderKeyList();
};

function renderKeyList() {
  $tagsKey.empty();
  for (let k of Object.keys(_tag_data)) {
    let classname = 'tag-key-callback';
    if (k === _current_tags_key) {
        classname = `${classname} active`;
    }
    $tagsKey.append($('<span>', {
      'data-value': k,
      'text': k,
      'class': classname
    }));
  };
  $('.tag-key-callback').on('click', handleKeyChange);
};

function renderValueList() {
  $tagsValue.empty();
  for (let k of _tag_data[_current_tags_key]) {
    let classname = 'tag-value-callback';
    if (k['key'] === _current_tags_value) {
        classname = `${classname} active`
    }
    $tagsValue.append($('<span>', {
      'data-value': k['key'],
      'text': k['key'],
      'class': classname
    }));
  };
  $('.tag-value-callback').on('click', handleValueChange);
};

function renderPageList() {
  let data = _tag_data;
  $tagsPageList.empty();
  if (!_current_tags_key || !_current_tags_value) {
    return;
  }
  for (let p of data[_current_tags_key].filter(i => i['key'] === _current_tags_value)[0]['value']) {
    $tagsPageList.append($('<div>', {
      'class': 'tags-page-item'
    }).append($('<a>', {
      'href': `${gitbook.state.basePath}/${p['path']}`,
      'text': p['title'],
      'target': '_blank'
    })));

  };

};

function handleKeyChange(e) {
  resetTagsKeyValue();
  let key = e.target.dataset.value;
  _current_tags_key = key;
  console.log(`key change ${key}`)
  showTags();
};

function handleValueChange(e) {
  let val = e.target.dataset.value;
  _current_tags_value = val;
  console.log(`val change ${val}`)
  showTags();
}

function showTags() {
  let data = _tag_data;
  renderKeyList();
  if (_current_tags_key) {
    // render value list
    renderValueList();
    
    let valMap = data[_current_tags_key] || {};
    let pageList = null;
    if (_current_tags_value) {
      pageList = valMap[_current_tags_value] || [];
    }
    // render page list
    renderPageList();
  
  };
};


function handleShow(isShow) {
  console.log('call tags- show handle', isShow);
  $tagsContainer.toggleClass('active', isShow);
  $originalSearchResult.toggleClass('active', !isShow);
}

gitbook.events.on('page.change', function()  {
  bindElement();
  console.log('start tags init');
  handleShow(false);
  $tagsLink.on('click', function() {
    handleShow(true);
    initTagPage();
  });
  $searchInput.on('input', function() {
    handleShow(false)
  });
  console.log('end tags init');
});
});
