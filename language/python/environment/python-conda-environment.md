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
conda run -n env1 python --version
```
- create env
```
conda create --name env2 python=3.10.4

```

- active env
```
conda activate env2
```

- has other err need

```
source $(conda info --base)/etc/profile.d/conda.sh

```