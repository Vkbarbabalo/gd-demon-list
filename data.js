const defaultDemonListData = [
  { rank: 1, name: "Bloodbath", id: "10565740", creator: "Riot", verifier: "Vk_barbabalo", points: 100, video: "https://youtube.com", victors: [] },
  { rank: 2, name: "Cataclysm", id: "3979721", creator: "Ggb0y", verifier: "Vk_barbabalo", points: 75, video: "https://youtube.com", victors: [] },
  { rank: 3, name: "Acropolis", id: "5155022", creator: "Zobros", verifier: "Vk_barbabalo", points: 50, video: "", victors: [{ name: "Swedishvic", video: "https://youtube.com" }] },
  { rank: 4, name: "Oblivion", id: "114755656", creator: "Defentum", verifier: "Vk_barbabalo", points: 30, video: "https://youtube.com", victors: [] },
  { rank: 5, name: "Nine circles", id: "4284013", creator: "Zobros", verifier: "Vk_barbabalo", points: 20, video: "", victors: [{ name: "Swedishvic", video: "https://outplayed.tv" }] }
];

const coreUIStructure = `
    <style>
        body { font-family: sans-serif; background: #0a0a0c; color: #e2e8f0; max-width: 800px; margin: 0 auto; padding: 20px; }
        h1 { text-align: center; color: #00d2ff; text-shadow: 0 0 10px rgba(0,210,255,0.3); }
        .tabs { display: flex; justify-content: center; gap: 10px; margin-bottom: 20px; }
        .tab-btn { background: #111318; color: #8a99ad; border: 1px solid #1e293b; padding: 10px 20px; font-weight: bold; border-radius: 6px; cursor: pointer; }
        .tab-btn.active { background: #00d2ff; color: #000; border-color: #00d2ff; }
        .content-section { display: none; } .content-section.active { display: block; }
        .level-card { background: #12141c; border-radius: 8px; padding: 20px; margin-bottom: 20px; border: 1px solid #1e293b; border-left: 5px solid #00d2ff; position: relative; }
        .level-header { display: flex; justify-content: space-between; align-items: center; }
        .rank-name { font-size: 22px; font-weight: bold; color: #fff; }
        .points-badge { background: rgba(0,210,255,0.1); color: #00d2ff; padding: 4px 8px; border-radius: 4px; font-weight: bold; }
        .meta { color: #94a3b8; font-size: 14px; margin: 5px 0; } .meta strong { color: #00d2ff; }
        iframe { width: 100%; height: 350px; border: none; margin-top: 15px; border-radius: 6px; background: #000; }
        .victor-list { margin-top: 15px; background: #090a0f; padding: 12px; border-radius: 6px; border: 1px solid #1e293b; }
        a { color: #38bdf8; text-decoration: none; }
        .leaderboard-table { width: 100%; border-collapse: collapse; background: #12141c; border-radius: 8px; overflow: hidden; }
        .leaderboard-table th { background: #1e293b; color: #00d2ff; padding: 12px; text-align: left; }
        .leaderboard-table td { padding: 12px; border-bottom: 1px solid #1e293b; }
        .admin-form { background: #12141c; padding: 20px; border-radius: 8px; border: 1px solid #1e293b; }
        .form-group { margin-bottom: 12px; } .form-group label { display: block; margin-bottom: 4px; color: #00d2ff; font-weight: bold; }
        .form-group input, .form-group textarea { width: 100%; padding: 8px; background: #090a0f; border: 1px solid #1e293b; border-radius: 5px; color: #fff; box-sizing: border-box; }
        .btn-submit { background: #00d2ff; color: #000; border: none; padding: 10px 15px; font-weight: bold; border-radius: 5px; cursor: pointer; width: 100%; }
        .delete-btn { position: absolute; top: 15px; right: 15px; background: #ff4757; color: #fff; border: none; padding: 4px 8px; border-radius: 4px; cursor: pointer; font-size: 11px; }
    </style>
    
    <h1>GD Custom Demon List</h1>
    <div class="tabs">
        <button class="tab-btn active" id="btn-demons">Demons List</button>
        <button class="tab-btn" id="btn-ranking">Player Rankings</button>
        <button class="tab-btn" id="btn-admin" style="border-color:#ff4757; color:#ff4757;">⚙ Creator Panel</button>
    </div>
    <div id="demons-section" class="content-section active"><div id="list-container"></div></div>
    <div id="leaderboard-section" class="content-section">
        <table class="leaderboard-table"><thead><tr><th>Rank</th><th>Player Name</th><th>Points</th></tr></thead><tbody id="leaderboard-container"></tbody></table>
    </div>
    <div id="admin-section" class="content-section">
        <div class="admin-form">
            <h2>Add a New Demon Level</h2>
            <div class="form-group"><label>Level Name</label><input type="text" id="levelName"></div>
            <div class="form-group"><label>Placement Number</label><input type="number" id="levelRank"></div>
            <div class="form-group"><label>Level ID</label><input type="text" id="levelId"></div>
            <div class="form-group"><label>Creator</label><input type="text" id="levelCreator"></div>
            <div class="form-group"><label>Verifier</label><input type="text" id="levelVerifier"></div>
            <div class="form-group"><label>Leaderboard Points</label><input type="number" id="levelPoints"></div>
            <div class="form-group"><label>YouTube Link</label><input type="text" id="levelVideo"></div>
            <div class="form-group"><label>Victors (Format: Name,Link | Name2,Link2)</label><textarea id="levelVictors"></textarea></div>
            <button class="btn-submit" id="btn-submit-level">Add Level to Website</button>
            <button id="btn-reset" style="background:transparent; color:#ff4757; border:none; margin-top:10px; cursor:pointer; width:100%;">⚠️ Reset Everything</button>
        </div>
    </div>
`;
document.getElementById('list-core-engine').innerHTML = coreUIStructure;

if (!localStorage.getItem('customGDList')) { localStorage.setItem('customGDList', JSON.stringify(defaultDemonListData)); }
let dynamicList = JSON.parse(localStorage.getItem('customGDList'));

document.getElementById('btn-demons').onclick = function() { switchTab('demons-section', this); };
document.getElementById('btn-ranking').onclick = function() { switchTab('leaderboard-section', this); };
document.getElementById('btn-admin').onclick = function() { switchTab('admin-section', this); };
document.getElementById('btn-submit-level').onclick = function() { addNewLevel(); };
document.getElementById('btn-reset').onclick = function() { resetToDefaultData(); };

function switchTab(sectionId, btnElement) {
    document.querySelectorAll('.content-section').forEach(sec => sec.classList.remove('active'));
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.getElementById(sectionId).classList.add('active');
    btnElement.classList.add('active');
    if(sectionId !== 'admin-section') renderWebsite();
}

function renderWebsite() {
    const listContainer = document.getElementById('list-container');
    const leaderboardContainer = document.getElementById('leaderboard-container');
    listContainer.innerHTML = ''; leaderboardContainer.innerHTML = '';
    let playerScores = {};

    dynamicList.sort((a, b) => a.rank - b.rank);
    dynamicList.forEach((level, index) => { level.rank = index + 1; });
    localStorage.setItem('customGDList', JSON.stringify(dynamicList));

    dynamicList.forEach(level => {
        let victorsHTML = '';
        if (level.verifier && level.verifier.trim() !== "") {
            if (!playerScores[level.verifier]) playerScores[level.verifier] = 0;
            playerScores[level.verifier] += Number(level.points);
        }
        if(level.victors && level.victors.length > 0) {
            level.victors.forEach(v => {
                victorsHTML += `<li><a href="${v.video}" target="_blank">${v.name}</a></li>`;
                if (!playerScores[v.name]) playerScores[v.name] = 0;
                playerScores[v.name] += Number(level.points);
            });
        } else { victorsHTML = '<li>No victors yet!</li>'; }

        let videoHTML = '';
        if (level.video && level.video.trim() !== "") {
            let finalUrl = level.video.replace("youtube.com/watch?v=", "://youtube.com").replace("&t=", "?start=").replace("?t=", "?start=");
            videoHTML = `<iframe src="${finalUrl}" allowfullscreen></iframe>`;
        }

        listContainer.innerHTML += `
            <div class="level-card">
                <button class="delete-btn" onclick="deleteLevel(${level.id})">Remove</button>
                <div class="level-header">
                    <div class="rank-name">#${level.rank} - ${level.name}</div>
                    <div class="points-badge">+${level.points} Points</div>
                </div>
                <div class="meta"><strong>ID:</strong> ${level.id} | <strong>Creator:</strong> ${level.creator}</div>
                <div class="meta"><strong>Verifier:</strong> ${level.verifier}</div>
                ${videoHTML}
                <div class="victor-list"><h4>Victors:</h4><ul>${victorsHTML}</ul></div>
            </div>`;
    });

    let sortedPlayers = Object.keys(playerScores).map(name => ({ name, points: playerScores[name] }));
    sortedPlayers.sort((a, b) => b.points - a.points);
    sortedPlayers.forEach((player, index) => {
        leaderboardContainer.innerHTML += `<tr><td>#${index + 1}</td><td><strong>${player.name}</strong></td><td><span style="color:#00d2ff">${player.points} pts</span></td></tr>`;
    });
}

function addNewLevel() {
    const name = document.getElementById('levelName').value;
    const targetRank = Number(document.getElementById('levelRank').value) || (dynamicList.length + 1);
    const id = document.getElementById('levelId').value;
    const creator = document.getElementById('levelCreator').value;
    const verifier = document.getElementById('levelVerifier').value;
    const points = Number(document.getElementById('levelPoints').value) || 0;
    const video = document.getElementById('levelVideo').value;
    const victorsText = document.getElementById('levelVictors').value;

    if(!name || !id) { alert("Fill out Name and ID!"); return; }

    let processedVictors = [];
    if(victorsText.trim() !== "") {
        victorsText.split('|').forEach(pair => {
            const parts = pair.split(',');
            if(parts.length >= 1) { processedVictors.push({ name: parts[0].trim(), video: parts[1] ? parts[1].trim() : "" }); }
        });
    }

    dynamicList.push({ rank: targetRank - 0.5, name, id, creator, verifier, points, video, victors: processedVictors });
    localStorage.setItem('customGDList', JSON.stringify(dynamicList));
    document.querySelectorAll('.admin-form input, .admin-form textarea').forEach(el => el.value = '');
    alert("Level Added!");
    switchTab('demons-section', document.getElementById('btn-demons'));
}

window.deleteLevel = function(id) {
    if(confirm("Remove level?")) {
        dynamicList = dynamicList.filter(lvl => Number(lvl.id) !== Number(id));
        localStorage.setItem('customGDList', JSON.stringify(dynamicList));
        renderWebsite();
    }
}

function resetToDefaultData() {
    if(confirm("Reset everything?")) { localStorage.removeItem('customGDList'); location.reload(); }
}

renderWebsite();
