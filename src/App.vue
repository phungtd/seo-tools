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
              <a href="#loc-link" :class="{ 'nav-link': true, 'active': this.active === 0 }" @click="this.active = 0">
                <i class="nav-icon fas fa-link"></i>
                <p>Lọc Link</p>
              </a>
            </li>
            <li class="nav-item">
              <a href="#team-table" :class="{ 'nav-link': true, 'active': this.active === 1 }" @click="this.active = 1">
                <i class="nav-icon fas fa-table"></i>
                <p>Team Table</p>
              </a>
            </li>
            <li class="nav-item">
              <a href="#h2h-table" :class="{ 'nav-link': true, 'active': this.active === 2 }" @click="this.active = 2">
                <i class="nav-icon fas fa-table"></i>
                <p>H2H Table</p>
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
              <h1 class="m-0" v-if="this.active === 2">H2H Table</h1>
            </div>
            <div class="col-sm-6">
              <ol class="breadcrumb float-sm-right">
                <li class="breadcrumb-item"><a href="/">Tools</a></li>
                <li class="breadcrumb-item active" v-if="this.active === 0">Lọc Link</li>
                <li class="breadcrumb-item active" v-if="this.active === 1">Team Table</li>
                <li class="breadcrumb-item active" v-if="this.active === 2">H2H Table</li>
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
                    <textarea v-model="this.teams" @input="this.team2table" class="form-control input-lg" rows="15"
                      placeholder=""></textarea>
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
                    <div contenteditable="true" ref="tableHTML">
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
                          <template v-for="stt in Array.from({ length: 11 }, (_, i) => i)" :key="stt">
                            <tr>
                              <td style="text-align: center;">{{ stt + 1 }}</td>
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

          <div class="row" v-if="this.active === 2">
            <div class="col-lg-6">
              <div class="card card-primary card-outline">
                <div class="card-header">
                  <h3 class="card-title">Source</h3>
                </div>
                <form action="">
                  <div class="card-body">
                    <textarea v-model="this.h2h" @input="this.h2h2table" class="form-control input-lg" rows="15"
                      placeholder=""></textarea>
                  </div>
                  <div class="card-footer">
                    <button @click.prevent="this.h2h2table" type="submit" class="btn btn-primary">Chuyển</button>
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
                    <div contenteditable="true" ref="h2hHTML">
                      <table
                        style="border-collapse: collapse; width: 100%; margin-left: auto; margin-right: auto; font-size: 12px;"
                        border="0" cellspacing="0" cellpadding="5">
                        <thead>
                          <tr style="border: 1px solid  #7e8c8d;white-space:nowrap">
                            <th>Thời gian</th>
                            <th style="text-align:right">Đội nhà</th>
                            <th style="text-align:center">Tỷ số</th>
                            <th style="text-align:left">Đội khách</th>
                            <!-- <th>Kèo</th> -->
                            <!-- <th>Kết quả</th> -->
                          </tr>
                        </thead>
                        <tbody>
                          <template v-for="(match, idx) in this.h2hMatches" :key="idx">
                            <tr
                              :style="'border: 1px solid  #7e8c8d;border-top:0 none;' + (idx % 2 === 0 ? 'background: #f6f6f6' : '')">
                              <td>{{ match.time }}<br />{{ match.comp }}</td>
                              <td style="text-align:right">
                                <template v-if="match.handicap.indexOf('-') !== -1"><b>{{ match.homeTeam }}</b></template>
                                <template v-else>{{ match.homeTeam }}</template>
                              </td>
                              <td style="text-align:center">{{ match.scoreHome }} - {{ match.scoreAway }}</td>
                              <td style="text-align:left">
                                <template v-if="match.handicap.indexOf('+') !== -1"><b>{{ match.awayTeam }}</b></template>
                                <template v-else>{{ match.awayTeam }}</template>
                              </td>
                              <!-- <td align="center">{{ match.handicap }}</td> -->
                              <!-- <td align="center">{{ match.result }}</td> -->
                            </tr>
                          </template>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div class="card-footer">
                    <button @click.prevent="this.copyH2H" type="submit" class="btn btn-primary">Copy</button>
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
import axios from 'axios';

export default {
  name: "App",
  data() {
    return {
      'active': 0,
      // link
      'links': '',
      'filtered': '',
      // team
      'teams': '',
      'table': {},
      'rows': 0,
      // h2h
      'h2h': '',
      'h2hMatches': []
    }
  },
  mounted() {
    // Check for hash value on initial load
    const hash = window.location.hash;
    if (hash) {
      this.setCurrentTab(hash);
    }

    // Listen to hashchange event for updating tab on URL change
    window.addEventListener('hashchange', () => {
      const hash = window.location.hash;
      if (hash) {
        this.setCurrentTab(hash);
      }
    });
  },
  methods: {
    setCurrentTab(tab) {
      this.active = ['#loc-link', '#team-table', '#h2h-table'].indexOf(tab);
    },
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
      this.table = {}
      const lines = this.teams.split('\n').filter(line => line.trim() !== '').map(line => line.trim().replace('.', ''))
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
    h2h2table() {
      const parser = new DOMParser();
      const doc = parser.parseFromString(this.h2h, 'text/html');
      const h2hDiv = doc.querySelector('.h2h');
      if (h2hDiv) {
        const bgWhiteDiv = h2hDiv.querySelector('.bg-white');
        if (bgWhiteDiv) {
          // Find all the 'grid-lich-su-ct' elements, which represent individual match entries
          var matchElements = bgWhiteDiv.getElementsByClassName('grid-lich-su-ct');

          // Create an empty array to store the match data
          this.h2hMatches = [];

          // Iterate over each match element and extract the relevant data
          for (var i = 0; i < matchElements.length; i++) {
            var matchElement = matchElements[i];

            // Extract the required data from the match element
            var time = matchElement.querySelector('.time-giai-1-ct').textContent;
            var comp = matchElement.querySelector('.time-giai-2-ct').textContent;
            var homeTeam = matchElement.querySelectorAll('.ten-chu-ct span')[0].textContent;
            var awayTeam = matchElement.querySelectorAll('.ten-chu-ct span')[1].textContent;
            var handicap = matchElement.querySelectorAll('.ket-qua-lich-su-ct')[0].textContent;
            var score = matchElement.querySelectorAll('.ket-qua-lich-su-ct')[1]
            var scoreHome = score.querySelectorAll('span')[0].textContent;
            var scoreAway = score.querySelectorAll('span')[1].textContent;
            var result = matchElement.querySelector('.w-ct, .l-ct, .d-ct').textContent;

            var timeParts = time.split(' ')
            time = timeParts[timeParts.length - 1]

            // Create an object to store the match data
            var match = {
              time: time.trim(),
              comp: comp.trim(),
              homeTeam: homeTeam.trim(),
              awayTeam: awayTeam.trim(),
              handicap: handicap.trim(),
              scoreHome: scoreHome.trim(),
              scoreAway: scoreAway.trim(),
              result: result.trim()
            };

            // Add the match data to the array
            this.h2hMatches.push(match);
          }

          this.h2hMatches = this.h2hMatches.slice(0, 6)
        }
      }
    },
    copyLinks() {
      navigator.clipboard.writeText(this.filtered).then(() => {
        alert('Copied')
      }).catch((error) => {

      });
    },
    copyTable() {
      navigator.clipboard.writeText(this.$refs.tableHTML.innerHTML).then(() => {
        alert('Copied')
      }).catch((error) => {

      });
    },
    copyH2H() {
      navigator.clipboard.writeText(this.$refs.h2hHTML.innerHTML).then(() => {
        alert('Copied')
      }).catch((error) => {

      });
    }
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,400i,700&display=fallback');
@import url('../node_modules/admin-lte/plugins/fontawesome-free/css/all.min.css');
@import url('../node_modules/admin-lte/dist/css/adminlte.min.css');
</style>