# cloudflare network tunnels

{% tag 'created','20250602' %} {% endtag %} {% tag 'updated','20250602' %} {% endtag %} {% tag 'authors','alick97' %} {% endtag %}

---

#### use case for export internal port to internet permanently
1. go to dash board  https://dash.cloudflare.com/
2. click zerotrust -> networks -> tunnels  create a tunnel
3. install cloudflared and run it.
4. config port mapping in dashboard.(you must have one public hostname)

### eg:

```
# Add cloudflare gpg key
sudo mkdir -p --mode=0755 /usr/share/keyrings
curl -fsSL https://pkg.cloudflare.com/cloudflare-main.gpg | sudo tee /usr/share/keyrings/cloudflare-main.gpg >/dev/null

# Add this repo to your apt repositories
echo 'deb [signed-by=/usr/share/keyrings/cloudflare-main.gpg] https://pkg.cloudflare.com/cloudflared any main' | sudo tee /etc/apt/sources.list.d/cloudflared.list

# install cloudflared
sudo apt-get update && sudo apt-get install cloudflared
```

### After you have installed cloudflared on your machine, you can install a service to automatically run your tunnel whenever your machine starts:

```
sudo cloudflared service install [token]
```

### OR run the tunnel manually in your current terminal session only:

```
cloudflared tunnel run --token [token]
```



#### use case for export internal port to internet temporarily
##### eg export port 8000
```
cloudflared tunnel --url http://localhost:8000
```