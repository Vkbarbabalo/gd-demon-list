const defaultDemonListData = [
  {
    "rank": 1,
    "name": "Bloodbath",
    "id": "10565740",
    "creator": "Riot",
    "verifier": "Vk_barbabalo",
    "points": 100,
    "minProgress": 70,
    "progressPoints": 10,
    "video": "https://www.youtube.com/watch?v=Uy92UvhyNl0&t=1s",
    "thumbnail": "https://cdn.phototourl.com/free/2026-08-04-ae8b0644-8ee5-4c44-8f8d-7d15cbda0bd2.gif",
    "victors": [],
    "progressRecords": []
  },
  {
    "rank": 2,
    "name": "Cataclysm",
    "id": "3979721",
    "creator": "Ggb0y",
    "verifier": "Vk_barbabalo",
    "points": 75,
    "minProgress": 64,
    "progressPoints": 7.5,
    "video": "https://www.youtube.com/watch?v=dXs_UjKpQUQ&t=3s",
    "thumbnail": "https://plain-weur-prod-public.komododecks.com/202608/04/bsb2oiNPs5FRVeKKC3Fr/image.jpg",
    "victors": [],
    "progressRecords": []
  },
  {
    "rank": 3,
    "name": "Acropolis",
    "id": "5155022",
    "creator": "Zobros",
    "verifier": "Vk_barbabalo",
    "points": 50,
    "minProgress": 52,
    "progressPoints": 5,
    "video": "",
    "thumbnail": "https://plain-weur-prod-public.komododecks.com/202608/04/fI4RUDUp7hOSp4630VPn/image.jpg",
    "victors": [
      {
        "name": "Swedishvic",
        "video": "https://www.youtube.com/watch?v=fVBmzkqykKE"
      }
    ],
    "progressRecords": []
  },
  {
    "rank": 4,
    "name": "Oblivion",
    "id": "114755656",
    "creator": "Defentum",
    "verifier": "Vk_barbabalo",
    "points": 30,
    "minProgress": 64,
    "progressPoints": 3,
    "video": "https://www.youtube.com/watch?v=2F0VMXlWq4Y",
    "thumbnail": "https://plain-weur-prod-public.komododecks.com/202608/04/G0htqNgyE9VkTsc26Gqu/image.jpg",
    "victors": [],
    "progressRecords": []
  },
  {
    "rank": 5,
    "name": "Nine circles",
    "id": "4284013",
    "creator": "Zobros",
    "verifier": "Vk_barbabalo",
    "points": 20,
    "minProgress": 72,
    "progressPoints": 2,
    "video": "https://outplayed.tv/media/Q16k5K",
    "thumbnail": "https://plain-weur-prod-public.komododecks.com/202608/04/t20jnknzVe4XF5ZivVqq/image.jpg",
    "victors": [
      {
        "name": "Swedishvic",
        "video": "https://outplayed.tv/geometry-dash/K4jm60"
      }
    ],
    "progressRecords": []
  }
];
// 2. DESIGN FRAMEWORK WITH SELECTIVE ACCORDION HIDDEN WRAPPERS
const coreUIStructure = `
    <style>
        body { font-family: sans-serif; background: #0a0a0c; color: #e2e8f0; max-width: 800px; margin: 0 auto; padding: 20px; }
        h1 { text-align: center; color: #00d2ff; text-shadow: 0 0 10px rgba(0,210,255,0.3); }
        .tabs { display: flex; justify-content: center; gap: 10px; margin-bottom: 20px; }
        .tab-btn { background: #111318; color: #8a99ad; border: 1px solid #1e293b; padding: 10px 20px; font-weight: bold; border-radius: 6px; cursor: pointer; }
        .tab-btn.active { background: #00d2ff; color: #000; border-color: #00d2ff; }
        .content-section { display: none; } .content-section.active { display: block; }
        .level-card { background: #12141c; border-radius: 8px; padding: 22px; margin-bottom: 25px; border: 1px solid #1e293b; border-left: 5px solid #00d2ff; position: relative; box-shadow: 0 4px 12px rgba(0,0,0,0.5); }
        .level-header { display: flex; justify-content: space-between; align-items: center; }
        .rank-name { font-size: 24px; font-weight: bold; color: #fff; cursor: pointer; transition: color 0.2s; }
        .rank-name:hover { color: #00d2ff; text-decoration: underline; }
        .points-badge { background: rgba(0,210,255,0.1); color: #00d2ff; padding: 4px 10px; border-radius: 4px; font-weight: bold; font-size: 14px; border: 1px solid rgba(0,210,255,0.3); }
        .meta { color: #94a3b8; font-size: 14px; margin: 6px 0; } .meta strong { color: #00d2ff; }
        .video-link-btn { display: inline-block; margin-top: 15px; margin-bottom: 5px; background: #1e293b; color: #00d2ff; padding: 10px 16px; border-radius: 6px; font-weight: bold; border: 1px solid rgba(0,210,255,0.2); text-decoration: none; }
        .video-link-btn:hover { background: #00d2ff; color: #000; }
        .thumb-img { width: 100%; height: 350px; object-fit: cover; border-radius: 6px; margin-top: 15px; border: 1px solid #1e293b; }
        .records-accordion { display: none; margin-top: 15px; border-top: 1px solid #1e293b; padding-top: 10px; }
        .victor-list { margin-top: 18px; background: #090a0f; padding: 15px; border-radius: 6px; border: 1px solid #1e293b; box-shadow: inset 0 2px 4px rgba(0,0,0,0.3); }
        .victor-list h4 { margin: 0 0 10px 0; color: #00d2ff; font-size: 15px; }
        .victor-list ul { margin: 0; padding-left: 20px; } .victor-list li { margin-bottom: 6px; }
        a { color: #38bdf8; text-decoration: none; cursor: pointer; }
        .leaderboard-table { width: 100%; border-collapse: collapse; background: #12141c; border-radius: 8px; overflow: hidden; border: 1px solid #1e293b; }
        .leaderboard-table th { background: #1e293b; color: #00d2ff; padding: 15px; text-align: left; }
        .leaderboard-table td { padding: 15px; border-bottom: 1px solid #1e293b; }
        .admin-form { background: #12141c; padding: 25px; border-radius: 8px; border: 1px solid #1e293b; margin-bottom: 20px; }
        .form-group { margin-bottom: 12px; } .form-group label { display: block; margin-bottom: 4px; color: #00d2ff; font-weight: bold; }
        .form-group input, .form-group textarea, .form-group select { width: 100%; padding: 10px; background: #090a0f; border: 1px solid #1e293b; border-radius: 5px; color: #fff; box-sizing: border-box; }
        .btn-submit { background: #00d2ff; color: #000; border: none; padding: 12px 20px; font-weight: bold; border-radius: 5px; cursor: pointer; width: 100%; margin-top: 10px; }
        .card-actions { margin-top: 15px; display: flex; gap: 10px; }
        .action-btn { background: #1e293b; color: #e2e8f0; border: 1px solid #334155; padding: 6px 12px; border-radius: 4px; cursor: pointer; font-size: 13px; font-weight: bold; }
        .modal { display: none; position: fixed; z-index: 100; left: 0; top: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.8); align-items: center; justify-content: center; }
        .modal-content { background: #12141c; border: 1px solid #00d2ff; padding: 30px; border-radius: 8px; width: 90%; max-width: 500px; position: relative; }
        .close-btn { position: absolute; top: 15px; right: 15px; color: #ff4757; font-size: 24px; cursor: pointer; font-weight: bold; }
        .profile-list { margin-top: 15px; background: #090a0f; padding: 15px; border-radius: 6px; border: 1px solid #1e293b; max-height: 120px; overflow-y: auto; }
    </style>
    <h1>GD Custom Demon List</h1>
    <div class="tabs">
        <button class="tab-btn active" id="btn-demons">Demons List</button>
        <button class="tab-btn" id="btn-ranking">Player Rankings</button>
        <button class="tab-btn" id="btn-admin" style="border-color:#ff4757; color:#ff4757;">⚙ Creator Panel</button>
    </div>
    <div id="demons-section" class="content-section active"><div id="list-container"></div></div>
    <div id="leaderboard-section" class="content-section">
        <p style="color:#94a3b8; text-align:center; font-size:14px; margin-bottom:20px;">💡 Click any name to open profile information!</p>
        <table class="leaderboard-table"><thead><tr><th>Rank</th><th>Player Name</th><th>Points</th></tr></thead><tbody id="leaderboard-container"></tbody></table>
    </div>
    <div id="admin-section" class="content-section">
        <div class="admin-form">
            <h3>Create a Brand New Level</h3>
            <div class="form-group"><label>Level Name</label><input type="text" id="levelName"></div>
            <div class="form-group"><label>Rank Placement</label><input type="number" id="levelRank"></div>
            <div class="form-group"><label>Level ID</label><input type="text" id="levelId"></div>
            <div class="form-group"><label>Creator</label><input type="text" id="levelCreator"></div>
            <div class="form-group"><label>Verifier</label><input type="text" id="levelVerifier"></div>
            <div class="form-group"><label>Completions Points</label><input type="number" id="levelPoints"></div>
            <div class="form-group"><label>Min Progress % Required</label><input type="number" id="levelMinProg" value="50"></div>
            <div class="form-group"><label>Points awarded for Progress</label><input type="number" id="levelProgPoints" value="10"></div>
            <div class="form-group"><label>YouTube Link</label><input type="text" id="levelVideo"></div>
            <div class="form-group"><label>Thumbnail Image URL</label><input type="text" id="levelThumb"></div>
            <button class="btn-submit" id="btn-submit-level">Add Level to Website</button>
        </div>
        <div class="admin-form" style="border-color: #00d2ff;">
            <h3>Edit an Existing Level Data</h3>
            <div class="form-group"><label>Select Level</label><select id="editSelectLevel" onchange="loadLevelToEditForm()"></select></div>
            <div class="form-group"><label>Edit Placement / Rank</label><input type="number" id="editRank"></div>
            <div class="form-group"><label>Edit Name</label><input type="text" id="editName"></div>
            <div class="form-group"><label>Edit ID</label><input type="text" id="editId"></div>
            <div class="form-group"><label>Edit Creator</label><input type="text" id="editCreator"></div>
            <div class="form-group"><label>Edit Verifier</label><input type="text" id="editVerifier"></div>
            <div class="form-group"><label>Edit Completion Points</label><input type="number" id="editPoints"></div>
            <div class="form-group"><label>Edit Min Progress %</label><input type="number" id="editMinProgress"></div>
            <div class="form-group"><label>Edit Progress Points Reward</label><input type="number" id="editProgressPoints"></div>
            <div class="form-group"><label>Edit YouTube Link</label><input type="text" id="editVideo"></div>
            <div class="form-group"><label>Edit Thumbnail Image URL</label><input type="text" id="editThumb"></div>
            <div class="form-group"><label>Victors (Format: Name -- Link | Name2 -- Link2)</label><textarea id="editVictors"></textarea></div>
            <div class="form-group"><label>Progress (Format: Name -- Percentage -- Link | Name2 -- Percentage2 -- Link2)</label><textarea id="editProgressRecords"></textarea></div>
            <button class="btn-submit" id="btn-save-edit" style="background:#00d2ff;">Save Changes to Level</button>
            <button onclick="exportDataToLog()" class="btn-submit" style="background:#2ed573; color:#000; margin-top:15px;">💾 Export List Code For Friends</button>
            <button id="btn-reset" style="background:transparent; color:#ff4757; border:none; margin-top:15px; cursor:pointer; width:100%;">⚠️ Reset Changes</button>
        </div>
    </div>
    <div id="profileModal" class="modal"><div class="modal-content"><span class="close-btn" onclick="closeProfile()">&times;</span><h2 id="profName" style="color:#00d2ff; margin:0;"></h2><h4 id="profPoints" style="color:#fff; margin:5px 0;"></h4><h4 style="color:#00d2ff; margin:10px 0 5px 0;">Verifications:</h4><div class="profile-list"><ul id="profVerifications"></ul></div><h4 style="color:#38bdf8; margin:10px 0 5px 0;">Completions (100%):</h4><div class="profile-list"><ul id="profCompletions"></ul></div><h4 style="color:#ffa502; margin:10px 0 5px 0;">Progress Records:</h4><div class="profile-list"><ul id="profProgress"></ul></div></div></div>
\`;
`;
document.getElementById('list-core-engine').innerHTML = coreUIStructure;

if (!localStorage.getItem('customGDList')) { localStorage.setItem('customGDList', JSON.stringify(defaultDemonListData)); }
let dynamicList = JSON.parse(localStorage.getItem('customGDList'));

document.getElementById('btn-demons').onclick = function() { switchTab('demons-section', this); };
document.getElementById('btn-ranking').onclick = function() { switchTab('leaderboard-section', this); };
document.getElementById('btn-admin').onclick = function() { switchTab('admin-section', this); };
document.getElementById('btn-submit-level').onclick = function() { addNewLevel(); };
document.getElementById('btn-save-edit').onclick = function() { saveLevelEdits(); };
document.getElementById('btn-reset').onclick = function() { resetToDefaultData(); };

let playersDatabase = {};

function switchTab(sectionId, btnElement) {
    document.querySelectorAll('.content-section').forEach(sec => sec.classList.remove('active'));
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.getElementById(sectionId).classList.add('active');
    btnElement.classList.add('active');
    if(sectionId === 'admin-section') populateAdminDropdown();
    if(sectionId !== 'admin-section') renderWebsite();
}

window.toggleLevelRecords = function(levelId) {
    let targetBox = document.getElementById('records-box-' + levelId);
    targetBox.style.display = (targetBox.style.display === 'block') ? 'none' : 'block';
};

function renderWebsite() {
    const listContainer = document.getElementById('list-container');
    const leaderboardContainer = document.getElementById('leaderboard-container');
    listContainer.innerHTML = ''; leaderboardContainer.innerHTML = '';
    playersDatabase = {};
    
    dynamicList.sort((a, b) => a.rank - b.rank);
    dynamicList.forEach((level, index) => { level.rank = index + 1; });
    localStorage.setItem('customGDList', JSON.stringify(dynamicList));

    dynamicList.forEach(level => {
        let victorsHTML = ''; let progHTML = '';
        
        if (level.verifier && level.verifier.trim() !== "") {
            let vName = level.verifier.trim();
            if (!playersDatabase[vName]) playersDatabase[vName] = { points: 0, verifications: [], completions: [], progress: [] };
            playersDatabase[vName].points += Number(level.points);
            playersDatabase[vName].verifications.push({ levelName: level.name, video: level.video });
        }
        if(level.victors && level.victors.length > 0) {
            level.victors.forEach(v => {
                let pName = v.name.trim();
                victorsHTML += `<li><a onclick="openProfile('${pName}')">${pName}</a></li>`;
                if (!playersDatabase[pName]) playersDatabase[pName] = { points: 0, verifications: [], completions: [], progress: [] };
                playersDatabase[pName].points += Number(level.points);
                playersDatabase[pName].completions.push({ levelName: level.name, video: v.video });
            });
        } else { victorsHTML = '<li>No victors yet!</li>'; }

        if(level.progressRecords && level.progressRecords.length > 0) {
            level.progressRecords.forEach(p => {
                let pName = p.name.trim();
                progHTML += `<li><a onclick="openProfile('${pName}')">${pName}</a> - <strong>${p.percent}%</strong></li>`;
                if (!playersDatabase[pName]) playersDatabase[pName] = { points: 0, verifications: [], completions: [], progress: [] };
                playersDatabase[pName].points += Number(level.progressPoints || 0);
                playersDatabase[pName].progress.push({ levelName: level.name, percent: p.percent, video: p.video });
            });
        } else { progHTML = '<li>None</li>'; }

        let mediaHTML = '';
        if (level.thumbnail && level.thumbnail.trim() !== "") {
            mediaHTML = `<img src="${level.thumbnail}" class="thumb-img" alt="level thumbnail">`;
        }
        
        let watchVideoBtnHTML = '';
        if (level.video && level.video.trim() !== "") {
            watchVideoBtnHTML = `<a href="${level.video}" target="_blank" class="video-link-btn">▶ Watch Verification Proof</a>`;
        }

        listContainer.innerHTML += `
            <div class="level-card">
                <div class="level-header">
                    <div class="rank-name" onclick="toggleLevelRecords(${level.id})">#${level.rank} - ${level.name}</div>
                    <div class="points-badge">+${level.points} pts</div>
                </div>
                <div class="meta"><strong>ID:</strong> ${level.id} | <strong>Creator:</strong> ${level.creator}</div>
                <div class="meta"><strong>Verifier:</strong> <a onclick="openProfile('${level.verifier}')">${level.verifier}</a></div>
                <p style="color:#00d2ff; font-size:13px; margin:6px 0 0 0;">💡 Click level name to check victors and progress list</p>
                ${mediaHTML}
                ${watchVideoBtnHTML}
                <div id="records-box-${level.id}" class="records-accordion">
                    <div class="victor-list"><h4>Completions (100%):</h4><ul>${victorsHTML}</ul></div>
                    <div class="victor-list" style="border-color:#ffa502;"><h4>Progress (>=${level.minProgress || 50}% = +${level.progressPoints || 0} pts):</h4><ul>${progHTML}</ul></div>
                </div>
                <div class="card-actions">
                    <button class="action-btn" onclick="movePlacement(${level.id}, -1)">▲ Up</button>
                    <button class="action-btn" onclick="movePlacement(${level.id}, 1)">▼ Down</button>
                    <button class="action-btn" style="color:#ff4757;" onclick="deleteLevel(${level.id})">Remove</button>
                </div>
            </div>`;
    });

    let sortedPlayers = Object.keys(playersDatabase).map(name => ({ name, points: playersDatabase[name].points }));
    sortedPlayers.sort((a, b) => b.points - a.points).forEach((player, index) => {
        leaderboardContainer.innerHTML += `<tr><td>#${index + 1}</td><td><a onclick="openProfile('${player.name}')"><strong>${player.name}</strong></a></td><td><span style="color:#00d2ff">${player.points} pts</span></td></tr>`;
    });
}
window.movePlacement = function(id, direction) {
    let index = dynamicList.findIndex(lvl => Number(lvl.id) === Number(id));
    if (index === -1) return;
    let targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= dynamicList.length) return;
    let tempRank = dynamicList[index].rank;
    dynamicList[index].rank = dynamicList[targetIndex].rank;
    dynamicList[targetIndex].rank = tempRank;
    renderWebsite();
};

function populateAdminDropdown() {
    const dropdown = document.getElementById('editSelectLevel');
    dropdown.innerHTML = '<option value="">-- Choose Level --</option>';
    dynamicList.sort((a,b) => a.rank - b.rank).forEach(lvl => { dropdown.innerHTML += `<option value="${lvl.id}">#${lvl.rank} - ${lvl.name}</option>`; });
}

window.loadLevelToEditForm = function() {
    const id = document.getElementById('editSelectLevel').value;
    const level = dynamicList.find(lvl => Number(lvl.id) === Number(id));
    if (!level) return;
    document.getElementById('editRank').value = level.rank;
    document.getElementById('editName').value = level.name;
    document.getElementById('editId').value = level.id;
    document.getElementById('editCreator').value = level.creator;
    document.getElementById('editVerifier').value = level.verifier;
    document.getElementById('editPoints').value = level.points;
    document.getElementById('editMinProgress').value = level.minProgress || 50;
    document.getElementById('editProgressPoints').value = level.progressPoints || 0;
    document.getElementById('editVideo').value = level.video || "";
    document.getElementById('editThumb').value = level.thumbnail || "";
    document.getElementById('editVictors').value = (level.victors || []).map(v => `${v.name} -- ${v.video}`).join(' | ');
    document.getElementById('editProgressRecords').value = (level.progressRecords || []).map(p => `${p.name} -- ${p.percent} -- ${p.video}`).join(' | ');
};

function saveLevelEdits() {
    const selectId = document.getElementById('editSelectLevel').value;
    if (!selectId) return;
    let index = dynamicList.findIndex(lvl => Number(lvl.id) === Number(selectId));
    if(index === -1) return;
    
    let processedVictors = [];
    let victorsText = document.getElementById('editVictors').value;
    if(victorsText.trim() !== "") {
        victorsText.split('|').forEach(pair => {
            if(pair.trim() !== "") {
                let parts = pair.split('--');
                let pName = parts[0] ? parts[0].trim() : "";
                let pVid = parts[1] ? parts[1].trim() : "";
                if(pName !== "") processedVictors.push({ name: pName, video: pVid });
            }
        });
    }

    let processedProg = [];
    let progText = document.getElementById('editProgressRecords').value;
    if(progText.trim() !== "") {
        progText.split('|').forEach(pair => {
            if(pair.trim() !== "") {
                let parts = pair.split('--');
                let pName = parts[0] ? parts[0].trim() : "";
                let pPct = parts[1] ? Number(parts[1].trim()) : 50;
                let pVid = parts[2] ? parts[2].trim() : "";
                if(pName !== "") processedProg.push({ name: pName, percent: pPct, video: pVid });
            }
        });
    }

    dynamicList[index] = {
        rank: Number(document.getElementById('editRank').value) - 0.5,
        name: document.getElementById('editName').value, id: document.getElementById('editId').value,
        creator: document.getElementById('editCreator').value, verifier: document.getElementById('editVerifier').value,
        points: Number(document.getElementById('editPoints').value) || 0,
        minProgress: Number(document.getElementById('editMinProgress').value) || 50,
        progressPoints: Number(document.getElementById('editProgressPoints').value) || 0,
        video: document.getElementById('editVideo').value, thumbnail: document.getElementById('editThumb').value,
        victors: processedVictors, progressRecords: processedProg
    };
    localStorage.setItem('customGDList', JSON.stringify(dynamicList));
    alert("Level updated successfully!"); switchTab('demons-section', document.getElementById('btn-demons'));
}

window.openProfile = function(name) {
    let player = playersDatabase[name]; if(!player) return;
    document.getElementById('profName').innerText = name;
    document.getElementById('profPoints').innerText = `Points: ${player.points} pts`;
    let verHTML = ''; player.verifications.forEach(v => { verHTML += `<li>${v.levelName} ${v.video ? `(<a href="${v.video}" target="_blank">Link</a>)` : ''}</li>`; });
    document.getElementById('profVerifications').innerHTML = verHTML || '<li>None</li>';
    let compHTML = ''; player.completions.forEach(c => { compHTML += `<li>${c.levelName} ${c.video ? `(<a href="${c.video}" target="_blank">Proof</a>)` : ''}</li>`; });
    document.getElementById('profCompletions').innerHTML = compHTML || '<li>None</li>';
    let prgHTML = ''; player.progress.forEach(p => { prgHTML += `<li>${p.levelName} - <strong>${p.percent}%</strong> ${p.video ? `(<a href="${p.video}" target="_blank">Proof</a>)` : ''}</li>`; });
    document.getElementById('profProgress').innerHTML = prgHTML || '<li>None</li>';
    document.getElementById('profileModal').style.display = 'flex';
};

window.closeProfile = function() { document.getElementById('profileModal').style.display = 'none'; };

function addNewLevel() {
    const name = document.getElementById('levelName').value;
    const id = document.getElementById('levelId').value;
    if(!name || !id) return;
    dynamicList.push({
        rank: (Number(document.getElementById('levelRank').value) || (dynamicList.length + 1)) - 0.5,
        name: name, id: id, creator: document.getElementById('levelCreator').value, verifier: document.getElementById('levelVerifier').value,
        points: Number(document.getElementById('levelPoints').value) || 0,
        minProgress: Number(document.getElementById('levelMinProg').value) || 50,
        progressPoints: Number(document.getElementById('levelProgPoints').value) || 0,
        video: document.getElementById('levelVideo').value, thumbnail: document.getElementById('levelThumb').value,
        victors: [], progressRecords: []
    });
    localStorage.setItem('customGDList', JSON.stringify(dynamicList));
    alert("Level added!"); switchTab('demons-section', document.getElementById('btn-demons'));
}

window.deleteLevel = function(id) {
    if(confirm("Remove?")) { dynamicList = dynamicList.filter(lvl => Number(lvl.id) !== Number(id)); renderWebsite(); }
};

window.exportDataToLog = function() {
    let out = "const defaultDemonListData = " + JSON.stringify(dynamicList, null, 2) + ";";
    console.log(out);
    alert("COMPLETE WEBSITE CODE COPIED TO SYSTEM LOG! Press F12, look at your console tab, copy the clean text layout from there, and paste it to update everyone permanently!");
};

function resetToDefaultData() { if(confirm("Reset Everything?")) { localStorage.removeItem('customGDList'); location.reload(); } }
renderWebsite();
