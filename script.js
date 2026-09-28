// ==========================================
// ১. এডস্টাররা ১-ক্লিক স্মার্ট এড লজিক (Popunder Ad)
// ==========================================

// আপনার বিজ্ঞাপনের ডাইরেক্ট লিংকটি এখানে বসান
const AD_URL = "https://www.cpmnetwork.com/your_ad_link_here";

let hasClickedAd = false;

function triggerSmartAd(callback) {
  if (!hasClickedAd) {
    hasClickedAd = true;
    window.open(AD_URL, '_blank'); // ১ম ক্লিকে এড ওপেন হবে
    
    // ১৫ সেকেন্ড পর এড স্ট্যাটাস রিসেট হবে
    setTimeout(() => {
      hasClickedAd = false;
    }, 15000);
  } else {
    // ২য় ক্লিকে মূল লিংক বা কাজ সম্পন্ন হবে
    hasClickedAd = false;
    if (callback) {
      callback();
    }
  }
}

// ==========================================
// ২. ডিফল্ট ডামি ডাটা (লেআউট ডেমো প্রদর্শনের জন্য)
// ==========================================

const defaultMovies = [
  {
    id: 101,
    title: "Overgeared Season 01 Hindi, Tamil, Telugu, English, Japanese",
    category: "Animation",
    keywords: "overgeared season 1, overgeared hindi dub, anime bangla download, overgeared episode 1 1080p, overgeared crunchyroll",
    episodes: [
      {
        epNum: "Episode: 01",
        epDate: "[Upload Date: 28/08/2026]",
        size480: "79mb",
        links480: [
          { name: "Hcloud", url: "#" },
          { name: "Multi", url: "#" },
          { name: "MEGA", url: "#" },
          { name: "GDF", url: "#" },
          { name: "Fprs", url: "#" }
        ],
        size720: "140mb",
        links720: [
          { name: "Hcloud", url: "#" },
          { name: "Multi", url: "#" },
          { name: "MEGA", url: "#" },
          { name: "GDF", url: "#" },
          { name: "Fprs", url: "#" }
        ],
        size1080: "271mb",
        links1080: [
          { name: "Hcloud", url: "#" },
          { name: "Multi", url: "#" },
          { name: "MEGA", url: "#" },
          { name: "GDF", url: "#" },
          { name: "Fprs", url: "#" }
        ],
        size1080hq: "1.44GB",
        links1080hq: [
          { name: "Hcloud", url: "#" },
          { name: "MEGA", url: "#" },
          { name: "GDF", url: "#" },
          { name: "Fprs", url: "#" }
        ],
        watchOnlineUrl: "#"
      },
      {
        epNum: "Episode: 02",
        epDate: "[Upload Date: 06/09/2026]",
        size480: "84mb",
        links480: [
          { name: "Hcloud", url: "#" },
          { name: "Multi", url: "#" },
          { name: "MEGA", url: "#" },
          { name: "GDF", url: "#" },
          { name: "Fprs", url: "#" }
        ],
        size720: "130mb",
        links720: [
          { name: "Hcloud", url: "#" },
          { name: "Multi", url: "#" },
          { name: "MEGA", url: "#" },
          { name: "GDF", url: "#" },
          { name: "Fprs", url: "#" }
        ],
        size1080: "256mb",
        links1080: [
          { name: "Hcloud", url: "#" },
          { name: "Multi", url: "#" },
          { name: "MEGA", url: "#" },
          { name: "GDF", url: "#" },
          { name: "Fprs", url: "#" }
        ],
        size1080hq: "1.44GB",
        links1080hq: [
          { name: "Hcloud", url: "#" },
          { name: "MEGA", url: "#" },
          { name: "GDF", url: "#" },
          { name: "Fprs", url: "#" }
        ],
        watchOnlineUrl: "#"
      }
    ]
  }
];

// ==========================================
// ৩. লোকাল স্টোরেজ থেকে ডাটা লোড
// ==========================================

function getStoredMovies() {
  const saved = localStorage.getItem('moviebox_data');
  if (saved) {
    return JSON.parse(saved);
  } else {
    localStorage.setItem('moviebox_data', JSON.stringify(defaultMovies));
    return defaultMovies;
  }
}

// ==========================================
// ৪. ইউজার প্যানেল রেন্ডারিং (index.html)
// ==========================================

const contentArea = document.getElementById('contentArea');

function renderUserPanel(moviesList) {
  if (!contentArea) return;

  if (!moviesList || moviesList.length === 0) {
    contentArea.innerHTML = `<p style="text-align:center; color:#94a3b8; padding:30px;">কোনো মুভি বা সিরিজ পাওয়া যায়নি!</p>`;
    return;
  }

  const movie = moviesList[0];

  // 🔒 গোপন SEO মেটা ট্যাগ যুক্ত করা (গুগল সার্চ কনসোলের জন্য)
  const metaKeywords = document.getElementById('dynamic-keywords');
  if (metaKeywords && movie.keywords) {
    metaKeywords.setAttribute('content', movie.keywords);
  }

  let html = `<div class="episode-section">`;

  movie.episodes.forEach((ep, index) => {
    html += `
      <div class="episode-card">
        <h2 class="episode-title">${ep.epNum}</h2>
        <p class="upload-date">${ep.epDate}</p>

        <!-- 480P -->
        ${ep.links480 && ep.links480.length > 0 ? `
          <div class="quality-block">
            <div class="quality-title">480P x264 [Size: ${ep.size480 || '80mb'}]</div>
            <div class="download-links">
              ${ep.links480.map((l, i) => `<a onclick="openDownloadLink('${l.url}')">${l.name}</a>${i < ep.links480.length - 1 ? ' | ' : ''}`).join('')}
            </div>
          </div>
        ` : ''}

        <!-- 720P -->
        ${ep.links720 && ep.links720.length > 0 ? `
          <div class="quality-block">
            <div class="quality-title">720P x264 [Size: ${ep.size720 || '140mb'}]</div>
            <div class="download-links">
              ${ep.links720.map((l, i) => `<a onclick="openDownloadLink('${l.url}')">${l.name}</a>${i < ep.links720.length - 1 ? ' | ' : ''}`).join('')}
            </div>
          </div>
        ` : ''}

        <!-- 1080P -->
        ${ep.links1080 && ep.links1080.length > 0 ? `
          <div class="quality-block">
            <div class="quality-title">1080P x265 10bit [Size: ${ep.size1080 || '270mb'}]</div>
            <div class="download-links">
              ${ep.links1080.map((l, i) => `<a onclick="openDownloadLink('${l.url}')">${l.name}</a>${i < ep.links1080.length - 1 ? ' | ' : ''}`).join('')}
            </div>
          </div>
        ` : ''}

        <!-- 1080P HQ -->
        ${ep.links1080hq && ep.links1080hq.length > 0 ? `
          <div class="quality-block">
            <div class="quality-title">1080P x264 HQ [Size: ${ep.size1080hq || '1.44GB'}]</div>
            <div class="download-links">
              ${ep.links1080hq.map((l, i) => `<a onclick="openDownloadLink('${l.url}')">${l.name}</a>${i < ep.links1080hq.length - 1 ? ' | ' : ''}`).join('')}
            </div>
          </div>
        ` : ''}

        <!-- Watch Online -->
        ${ep.watchOnlineUrl ? `
          <p class="watch-online-link">Watch online:- <a onclick="openDownloadLink('${ep.watchOnlineUrl}')">Click Here</a></p>
        ` : ''}

      </div>
      ${index < movie.episodes.length - 1 ? '<hr class="divider">' : ''}
    `;
  });

  html += `</div>`;
  contentArea.innerHTML = html;
}

// ডাউনলোড লিংক ক্লিকে এড লজিক
function openDownloadLink(url) {
  triggerSmartAd(() => {
    window.open(url, '_blank');
  });
}

// সার্চ বার সিস্টেম
const searchInput = document.getElementById('searchInput');
if (searchInput) {
  searchInput.addEventListener('click', function() {
    triggerSmartAd(() => {
      searchInput.focus();
    });
  });

  searchInput.addEventListener('input', function(e) {
    const query = e.target.value.toLowerCase().trim();
    const allMovies = getStoredMovies();

    if (query === '') {
      renderUserPanel(allMovies);
      return;
    }

    // টাইটেল এবং গোপন কিওয়ার্ড দুই জায়গাতেই সার্চ করবে
    const filtered = allMovies.filter(m => 
      m.title.toLowerCase().includes(query) || 
      (m.keywords && m.keywords.toLowerCase().includes(query))
    );

    renderUserPanel(filtered);
  });
}

// ক্যাটাগরি ফিল্টার
function filterCategory(cat) {
  const allMovies = getStoredMovies();
  if (cat === 'all') {
    renderUserPanel(allMovies);
  } else {
    const filtered = allMovies.filter(m => m.category && m.category.toLowerCase() === cat.toLowerCase());
    renderUserPanel(filtered);
  }
}

// ==========================================
// ৫. এডমিন প্যানেল লজিক (admin.html)
// ==========================================

let epCount = 0;
const episodesContainer = document.getElementById('episodesContainer');
const addEpBtn = document.getElementById('addEpBtn');

function createEpField() {
  if (!episodesContainer) return;
  epCount++;

  const div = document.createElement('div');
  div.className = 'ep-form-box';
  div.id = `epBox_${epCount}`;
  div.innerHTML = `
    <h4>Episode ${epCount} Details</h4>
    <div class="form-group">
      <label>Episode Title:</label>
      <input type="text" class="epNum" value="Episode: 0${epCount}">
    </div>
    <div class="form-group">
      <label>Upload Date:</label>
      <input type="text" class="epDate" value="[Upload Date: ${new Date().toLocaleDateString('en-GB')}]">
    </div>
    
    <div class="form-group">
      <label>480P Size & Links (ফরম্যাট: Hcloud#url, Multi#url):</label>
      <input type="text" class="size480" placeholder="79mb">
      <input type="text" class="links480" placeholder="Hcloud#https://link.com, Multi#https://link.com, MEGA#https://link.com">
    </div>

    <div class="form-group">
      <label>720P Size & Links:</label>
      <input type="text" class="size720" placeholder="140mb">
      <input type="text" class="links720" placeholder="Hcloud#https://link.com, Multi#https://link.com, MEGA#https://link.com">
    </div>

    <div class="form-group">
      <label>1080P Size & Links:</label>
      <input type="text" class="size1080" placeholder="271mb">
      <input type="text" class="links1080" placeholder="Hcloud#https://link.com, Multi#https://link.com, MEGA#https://link.com">
    </div>

    <div class="form-group">
      <label>Watch Online URL:</label>
      <input type="text" class="watchOnlineUrl" placeholder="https://example.com/watch">
    </div>
  `;
  episodesContainer.appendChild(div);
}

if (addEpBtn) {
  addEpBtn.addEventListener('click', createEpField);
}

// হেলপার ফংশন: টেক্সট থেকে লিংক অবজেক্ট তৈরি
function parseLinks(str) {
  if (!str || !str.trim()) return [];
  const parts = str.split(',');
  return parts.map(p => {
    const [name, url] = p.split('#');
    return { name: name ? name.trim() : 'Server', url: url ? url.trim() : '#' };
  });
}

// এডমিন ফর্ম সাবমিট
const addMovieForm = document.getElementById('addMovieForm');
if (addMovieForm) {
  addMovieForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const title = document.getElementById('movieTitle').value;
    const category = document.getElementById('movieCategory').value;
    const keywords = document.getElementById('seoKeywords').value; // 🔒 গোপন কিওয়ার্ড

    const epBoxes = document.querySelectorAll('.ep-form-box');
    const episodesArr = [];

    epBoxes.forEach(box => {
      episodesArr.push({
        epNum: box.querySelector('.epNum').value,
        epDate: box.querySelector('.epDate').value,
        size480: box.querySelector('.size480').value,
        links480: parseLinks(box.querySelector('.links480').value),
        size720: box.querySelector('.size720').value,
        links720: parseLinks(box.querySelector('.links720').value),
        size1080: box.querySelector('.size1080').value,
        links1080: parseLinks(box.querySelector('.links1080').value),
        watchOnlineUrl: box.querySelector('.watchOnlineUrl').value
      });
    });

    const newM = {
      id: Date.now(),
      title: title,
      category: category,
      keywords: keywords,
      episodes: episodesArr
    };

    let allM = getStoredMovies();
    allM.unshift(newM);
    localStorage.setItem('moviebox_data', JSON.stringify(allM));

    alert('মুভি ও গোপন SEO কিওয়ার্ড সফলভাবে পাবলিশ হয়েছে!');
    window.location.reload();
  });
}

// এডমিন প্যানেলে মুভি লিস্ট ও ডিলিট অপশন
function renderAdminList() {
  const adminList = document.getElementById('adminMovieList');
  if (!adminList) return;

  const allM = getStoredMovies();
  if (allM.length === 0) {
    adminList.innerHTML = `<p>কোনো মুভি নেই।</p>`;
    return;
  }

  adminList.innerHTML = allM.map(m => `
    <div class="movie-item-admin">
      <div>
        <strong>${m.title}</strong> (${m.category})
      </div>
      <button class="btn-delete" onclick="deleteMovie(${m.id})">ডিলিট</button>
    </div>
  `).join('');
}

function deleteMovie(id) {
  if (confirm('আপনি কি নিশ্চিত এই মুভিটি ডিলিট করতে চান?')) {
    let allM = getStoredMovies();
    allM = allM.filter(m => m.id !== id);
    localStorage.setItem('moviebox_data', JSON.stringify(allM));
    renderAdminList();
  }
}

// পেজ লোড ইনিশিয়ালাইজেশন
window.addEventListener('DOMContentLoaded', () => {
  if (contentArea) {
    renderUserPanel(getStoredMovies());
  }
  if (document.getElementById('adminMovieList')) {
    createEpField();
    renderAdminList();
  }
});
