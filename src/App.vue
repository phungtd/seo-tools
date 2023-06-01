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
          class="brand-image img-circle elevation-3" style="opacity: .8">
        <span class="brand-text font-weight-light">SEO Tools</span>
      </a>

      <div class="sidebar">

        <nav class="mt-3">
          <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
            <li class="nav-item">
              <a href="#" :class="{ 'nav-link': true, 'active': this.active === 0 }" @click="this.active = 0">
                <i class="nav-icon fas fa-link"></i>
                <p>Lọc Link</p>
              </a>
            </li>
            <li class="nav-item">
              <a href="#" :class="{ 'nav-link': true, 'active': this.active === 1 }" @click="this.active = 1">
                <i class="nav-icon fas fa-table"></i>
                <p>Team Table</p>
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
              <h1 class="m-0" v-if="this.active === 0">Lọc Link</h1>
              <h1 class="m-0" v-if="this.active === 1">Team Table</h1>
            </div>
            <div class="col-sm-6">
              <ol class="breadcrumb float-sm-right">
                <li class="breadcrumb-item"><a href="/">Tools</a></li>
                <li class="breadcrumb-item active" v-if="this.active === 0">Lọc Link</li>
                <li class="breadcrumb-item active" v-if="this.active === 1">Team Table</li>
              </ol>
            </div>
          </div>
        </div>
      </div>


      <div class="content">
        <div class="container-fluid">
          <div class="row" v-if="this.active === 0">
            <div class="col-lg-6">
              <div class="card card-primary card-outline">
                <div class="card-header">
                  <h3 class="card-title">Danh sách</h3>
                </div>
                <form action="">
                  <div class="card-body">
                    <textarea v-model="this.links" class="form-control input-lg" rows="15" placeholder=""></textarea>
                  </div>
                  <div class="card-footer">
                    <button @click.prevent="this.linkFilter" type="submit" class="btn btn-primary">Lọc</button>
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
                    <textarea v-model="this.filtered" class="form-control input-lg" rows="15" placeholder=""></textarea>
                  </div>
                  <div class="card-footer">
                    <button @click.prevent="this.copyLinks" type="submit" class="btn btn-primary">Copy</button>
                  </div>
                </form>
              </div>
            </div>

          </div>

          <div class="row" v-if="this.active === 1">
            <div class="col-lg-6">
              <div class="card card-primary card-outline">
                <div class="card-header">
                  <h3 class="card-title">Danh sách</h3>
                </div>
                <form action="">
                  <div class="card-body">
                    <textarea v-model="this.teams" class="form-control input-lg" rows="15" placeholder=""></textarea>
                  </div>
                  <div class="card-footer">
                    <button @click.prevent="this.team2table" type="submit" class="btn btn-primary">Chuyển</button>
                  </div>
                </form>
              </div>
            </div>

            <div class="col-lg-6">
              <div class="card card-primary card-outline">
                <div class="card-header">
                  <h3 class="card-title">HTML</h3>
                </div>
                <form action="">
                  <div class="card-body">
                    <div contenteditable="true">
                      <table
                        style="border-collapse: collapse; width: 100%; border-color: #7e8c8d; border-style: solid; margin-left: auto; margin-right: auto;"
                        border="1" cellspacing="0" cellpadding="5">
                        <thead>
                          <tr>
                            <th style="text-align: center;">STT</th>
                            <template v-for="(mems, team) in this.table" :key="team">
                              <th>Đội hình dự kiến của {{ team }}</th>
                            </template>
                          </tr>
                        </thead>
                        <tbody>
                          <template v-for="stt in Array.from({ length: 12 }, (_, i) => i)" :key="stt">
                            <tr>
                              <td style="text-align: center;">{{ stt }}</td>
                              <template v-for="(mems, team) in this.table" :key="team">
                                <td>{{ mems[stt] ?? '' }}</td>
                              </template>
                            </tr>
                          </template>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div class="card-footer">
                    <button @click.prevent="this.copyTable" type="submit" class="btn btn-primary">Copy</button>
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
      'active': 0,
      'links': '',
      'filtered': '',
      'teams': '',
      'table': {},
      'rows': 0
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

      this.filtered = uniqueUrls.join('\n')
    },
    team2table() {
      console.log(this.teams)
      this.rows = 0
      const lines = this.teams.split('\n').filter(line => line.trim() !== '').map(line => line.trim())
      for (const line of lines) {
        const parts = line.split(':').map(part => part.trim())
        if (parts.length !== 2) continue
        const team = parts[0]
        const mems = parts[1].split(/[;,]/).map(mem => mem.trim())
        this.table[team] = mems
        this.rows = Math.max(this.rows, mems.length)
      }
      console.log(this.table)
    },
    copyLinks() {
      navigator.clipboard.writeText(this.filtered)
    }
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,400i,700&display=fallback');
@import url('../node_modules/admin-lte/plugins/fontawesome-free/css/all.min.css');
@import url('../node_modules/admin-lte/dist/css/adminlte.min.css');
</style>