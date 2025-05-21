# python conda environment

{% tag 'created','20250521' %} {% endtag %} {% tag 'updated','20250521' %} {% endtag %} {% tag 'authors','alick97' %} {% endtag %}

---

#### cheatsheet
- exit
```
conda deactivate
```

- find version
```
conda env list
conda run -n innolabMes python --version
```
- create env
```
conda create --name dh_erp python=3.10.4

```

- active env
```
conda activate dh_erp
```

- has other err need
```
source $(conda info --base)/etc/profile.d/conda.sh

```