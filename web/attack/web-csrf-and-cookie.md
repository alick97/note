# web csrf and cookie

{% tag 'created','20240214' %} {% endtag %} {% tag 'updated','20240214' %} {% endtag %} {% tag 'authors','alick97' %} {% endtag %}

---

### csrf
- [csrf wiki](https://en.wikipedia.org/wiki/Cross-site_request_forgery)


### debug example code
file: ttt/t.html
```
<html>

<body>
    <iframe name="dummyframe" id="dummyframe"></iframe>
    <img src="http://1.local:8881/cc">
    <form id="myForm" action="http://1.local:8881/api/v1/messages" method="post">
        <ul>
          <li>
            <label for="name">Name:</label>
            <input type="text" id="name" name="user_name" />
          </li>
          <li>
            <label for="mail">Email:</label>
            <input type="email" id="mail" name="user_email" />
          </li>
          <li>
            <label for="msg">Message:</label>
            <textarea id="msg" name="user_message"></textarea>
          </li>
        </ul>
        <button type="submit">submit</button>
      </form>
</body>

<script defer>
function formSubmit(event) {
  var url = "http://1.local:8881/s1";
  var request = new XMLHttpRequest();
  request.open('POST', url, true);
  request.withCredentials = true;
  request.onload = function() {
    console.log(request.responseText);
  };
  request.onerror = function(e) {
    console.log(`err: ${e}`);
  };
  request.send(new FormData(event.target));
  event.preventDefault();
}

document.getElementById('myForm').addEventListener("submit", formSubmit);

</script>
</html>

```
run web site localhost:8888
```
python3 -m http.server --directory ttt 8888
```
config /etc/hosts
```
# local example 1
127.0.0.1 1.local
```
run web site 1.local:8881
```bash
 while :; do echo -e "HTTP/1.1 200 OK\r\nContent-Length:5\r\nAccess-Control-Allow-Origin: *\r\nVary: Origin\r\nAccess-Control-Allow-Credentials: true\r\nSet-Cookie: id=a3fWa; Max-Age=2592000;\r\n\r\nhello" |nc -lv 127.0.0.1  8881; done
```

### conclusion
- Browser do more to prevent send with cookies of site B from site A to site B for preventing attack of csrf. Set cookie safe fields like SameSite.
- Most csrf attack need cookie. but csrf is defined that it is a action can without cookie. So if api method is GET but do things is modify and it is not design by rest style or auth without cookie, it will by attacked easily.
- For preventing csrf, add csrf token to your api or other methods(TODO).

### reference
- https://www.ducktypelabs.com/csrf-tool/
- [cookie SameSite 1](https://ithelp.ithome.com.tw/articles/10251288)
- [mdn cookie SameSite](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie#samesitesamesite-value)
