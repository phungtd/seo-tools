<template>
  <div class="wrapper">

    <nav class="main-header navbar navbar-expand navbar-white navbar-light">

      <ul class="navbar-nav">
        <li class="nav-item">
          <a class="nav-link" data-widget="pushmenu" href="#" role="button"><i class="fas fa-bars"></i></a>
        </li>
      </ul>
    </nav>


    <aside class="main-sidebar sidebar-dark-primary elevation-4">

      <a href="#" class="brand-link">
        <img src="/src/assets/fav/android/res/mipmap-hdpi/ic_launcher.png" alt="SEO Tools Logo"
             class="brand-image img-circle elevation-3"
             style="opacity: .8">
        <span class="brand-text font-weight-light">SEO Tools</span>
      </a>

      <div class="sidebar">

        <nav class="mt-3">
          <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">

            <li class="nav-item">
              <a href="#" class="nav-link">
                <i class="nav-icon fas fa-link"></i>
                <p>Lọc backlink</p>
              </a>
            </li>
          </ul>
        </nav>

      </div>

    </aside>

    <div class="content-wrapper">

      <div class="content-header">
        <div class="container-fluid">
          <div class="row mb-2">
            <div class="col-sm-6">
              <h1 class="m-0">Lọc backlink</h1>
            </div>
            <div class="col-sm-6">
              <ol class="breadcrumb float-sm-right">
                <li class="breadcrumb-item"><a href="#">Tools</a></li>
                <li class="breadcrumb-item active">Lọc backlink</li>
              </ol>
            </div>
          </div>
        </div>
      </div>


      <div class="content">
        <div class="container-fluid">
          <div class="row">
            <div class="col-lg-6">
              <div class="card card-primary card-outline">
                <div class="card-header">
                  <h3 class="card-title">Danh sách</h3>
                </div>
                <form action="">
                  <div class="card-body">
                    <textarea v-model="links" class="form-control input-lg" rows="15" placeholder=""></textarea>
                  </div>
                  <div class="card-footer">
                    <button @click.prevent="this.linkFilter" type="submit" class="btn btn-primary">Submit</button>
                  </div>
                </form>
              </div>
            </div>

            <div class="col-lg-6">
              <div class="card card-primary card-outline">
                <div class="card-header">
                  <h3 class="card-title">Kết quả</h3>
                </div>
                <form action="">
                  <div class="card-body">
                    <textarea v-model="linkFiltered" class="form-control input-lg" rows="15" placeholder=""></textarea>
                  </div>
                  <div class="card-footer">
                    <button @click.prevent="this.copyLinks" type="submit" class="btn btn-primary">Copy</button>
                  </div>
                </form>
              </div>
            </div>

          </div>

        </div>
      </div>

    </div>

    <footer class="main-footer">

      <div class="float-right d-none d-sm-inline">
        Just4Fun
      </div>

      &copy; 2023 <a href="https://github.com/phungtd/">PhungTran</a>
    </footer>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      'links': '',
      'linkFiltered': ''
    }
  },
  methods: {
    linkFilter() {
      console.log(this.links)
      const urls = this.links.split('\n');
      const domains = {};
      const uniqueUrls = urls.filter(function (url) {
        let _url = url.replace(/^\/|\/$/g, '');
        _url = _url.startsWith('http') ? _url : 'http://' + _url;
        const a = document.createElement('a');
        a.href = _url
        const domain = a.hostname;
        if (domains[domain]) {
          // we have seen this domain before, so ignore the URL
          return false;
        }
        // mark domain, retain URL
        domains[domain] = true;
        return true;
      });

      this.linkFiltered = uniqueUrls.join('\n')
    },
    copyLinks() {
      navigator.clipboard.writeText(this.linkFiltered)
    }
  }
}
</script>

<style scoped>
</style>