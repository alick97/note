# monitor-prometheus

{% tag 'created','20260616' %} {% endtag %} {% tag 'updated','20260616' %} {% endtag %} {% tag 'authors','alick97' %} {% endtag %}

---
On ARM64 architecture (such as your Ubuntu 26.04 device), using Docker Compose is the most lightweight and highly recommended way to deploy Grafana + Prometheus. 

The official Grafana and Prometheus images fully support the ARM64 architecture out of the box, so there is no need to look for special third-party images.

Here is the complete guide for a one-click deployment:

---

### Step 1: Install Docker & Docker Compose

If you haven't installed Docker yet, run the following commands in your terminal:

```bash
# 1. Update package list and install Docker and the Compose plugin
sudo apt update
sudo apt install -y docker.io docker-compose-v2

# 2. Start Docker and enable it to run on boot
sudo systemctl enable --now docker

# 3. Add the current user to the docker group (allows running docker without sudo; requires relog to take effect)
sudo usermod -aG docker $USER
```

---

### Step 2: Create Project Directory

Create a dedicated directory to store the configuration files:

```bash
mkdir -p ~/prometheus-grafana/prometheus
cd ~/prometheus-grafana
```

---

### Step 3: Write Prometheus Configuration

Create `prometheus.yml` under the `~/prometheus-grafana/prometheus` directory:

```bash
nano prometheus/prometheus.yml
```

Paste the following basic configuration (allowing Prometheus to monitor itself):

```yaml
global:
  scrape_interval: 15s # Default scrape interval

scrape_configs:
  - job_name: 'prometheus'
    static_configs:
      - targets: ['localhost:9090']
```

---

### Step 4: Write Docker Compose Configuration

Return to the project root directory `~/prometheus-grafana` and create `docker-compose.yml`:

```bash
nano docker-compose.yml
```

Paste the following configuration. *(Note: The deprecated `version` attribute has been omitted to comply with the modern Compose specification)*:

```yaml
services:
  prometheus:
    image: prom/prometheus:latest
    container_name: prometheus
    restart: unless-stopped
    volumes:
      - ./prometheus/prometheus.yml:/etc/prometheus/prometheus.yml
      - prometheus-data:/prometheus
    command:
      - '--config.file=/etc/prometheus/prometheus.yml'
      - '--storage.tsdb.path=/prometheus'
    ports:
      - "9090:9090"
    networks:
      - monitoring

  grafana:
    image: grafana/grafana:latest
    container_name: grafana
    restart: unless-stopped
    ports:
      - "3000:3000"
    volumes:
      - grafana-data:/var/lib/grafana
    environment:
      - GF_SECURITY_ADMIN_PASSWORD=admin # Default admin password
    networks:
      - monitoring

volumes:
  prometheus-data:
  grafana-data:

networks:
  monitoring:
    driver: bridge
```

---

### Step 5: Start Containers

In the `~/prometheus-grafana` directory, run the following command to start the services in the background:

```bash
docker compose up -d
```

Once started, you can check the status of the containers using:

```bash
docker compose ps
```

---

### Step 6: Connect Prometheus in Grafana

1. Open your browser and navigate to `http://<your_device_IP>:3000`.
2. Log in with the default credentials: `admin` / `admin` (you will be prompted to change the password on your first login).
3. Click **Connections** -> **Data sources** in the left menu.
4. Click **Add data source**, and select **Prometheus**.
5. In the **Connection** -> **Prometheus server URL** input field, enter:
   ```text
   http://prometheus:9090
   ```
   *(Note: Since they are in the same Docker network, you can use the container name `prometheus` directly instead of an IP address.)*
6. Scroll to the bottom of the page and click **Save & test**. If a green "Data source is working" message appears, the connection is successful!

---

### 💡 Advanced: How to monitor ARM host metrics?

If you want to monitor the physical metrics of this Ubuntu 26.04 machine itself (CPU, memory, disk, etc.), you can integrate `node-exporter`.

Simply append the following service definition under `services` in your `docker-compose.yml`:

```yaml
  node-exporter:
    image: prom/node-exporter:latest
    container_name: node-exporter
    restart: unless-stopped
    volumes:
      - /proc:/host/proc:ro
      - /sys:/host/sys:ro
      - /:/rootfs:ro
    command:
      - '--path.procfs=/host/proc'
      - '--path.sysfs=/host/sys'
      - '--collector.filesystem.mount-points-exclude=^/(sys|proc|dev|host|etc)($|/)'
    ports:
      - "9100:9100"
    networks:
      - monitoring
```
