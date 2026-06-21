/* ==========================================================================
   Dataset: Releases & Events
   ========================================================================== */

const RELEASES_DATA = [
  {
    id: "rel-1",
    date: { day: "20", month: "Jun", year: "2026" },
    title: "Support for standard SQL window frame clause 'GROUPS'",
    type: "feature",
    category: "sql",
    summary: "Introduced full support for the GROUPS frame specification in analytic window functions, providing precise group-based window definitions.",
    description: "BigQuery now supports the `GROUPS` frame clause in standard SQL analytic functions. Unlike `ROWS` (which counts physical rows) or `RANGE` (which filters by value difference), `GROUPS` defines window frames based on groups of duplicate values in the `ORDER BY` clause. This allows analysts to perform peer-group offsets easily, matching standard ANSI SQL:2011 compliance.",
    codeSnippet: `SELECT 
  date, 
  sales,
  SUM(sales) OVER(
    ORDER BY date
    GROUPS BETWEEN 1 PRECEDING AND 1 FOLLOWING
  ) as peer_group_sales
FROM sales_data;`,
    docUrl: "https://cloud.google.com/bigquery/docs/reference/standard-sql/analytic-function-concepts#window-frames"
  },
  {
    id: "rel-2",
    date: { day: "17", month: "Jun", year: "2026" },
    title: "Auto-refresh customization for materialized views",
    type: "improvement",
    category: "performance",
    summary: "Configure custom refresh intervals and maximum staleness parameters for materialized views to optimize cost and performance.",
    description: "You can now customize the automatic refresh behavior of materialized views. BigQuery lets you set a maximum staleness threshold via `max_staleness` parameter, allowing queries to utilize cached views even if data updates are ongoing. This significantly cuts query scan costs for large tables while maintaining acceptable data latency.",
    codeSnippet: `ALTER MATERIALIZED VIEW my_project.my_dataset.my_mv
SET OPTIONS (
  enable_refresh = true,
  refresh_interval_minutes = 60,
  max_staleness = INTERVAL "4" HOUR
);`,
    docUrl: "https://cloud.google.com/bigquery/docs/materialized-views-manage#alter-mv-options"
  },
  {
    id: "rel-3",
    date: { day: "12", month: "Jun", year: "2026" },
    title: "Column-level data masking with custom SQL expressions",
    type: "feature",
    category: "security",
    summary: "Define advanced security policies using custom SQL expressions to mask sensitive columns for unauthorized users.",
    description: "BigQuery security expands with Custom SQL Expression Masking. Administrators can now write conditional expressions (e.g., hash functions, conditional strings, or nullification) to dynamically mask sensitive columns depending on the session user's role or group memberships, going beyond simple default hash/null value options.",
    codeSnippet: `CREATE MASKING POLICY email_mask
AS (val STRING) -> 
  IF(
    SESSION_USER() IN ('admin@company.com', 'security@company.com'),
    val,
    REGEXP_REPLACE(val, r'(?i)(?<=.)[^@](?=[^@]*?[^@]@)', '*')
  );`,
    docUrl: "https://cloud.google.com/bigquery/docs/column-level-security-masking"
  },
  {
    id: "rel-4",
    date: { day: "08", month: "Jun", year: "2026" },
    title: "Enhanced object tables for unstructured data analytics",
    type: "improvement",
    category: "connections",
    summary: "Object tables now support remote functions with signed URLs, allowing ML models to analyze PDFs, audio, and images.",
    description: "Object tables (which expose unstructured data in Cloud Storage as read-only SQL tables) now seamlessly integrate with BigQuery ML remote functions. You can pass signed URLs of files directly to Cloud Vertex AI APIs to perform audio transcription, optical character recognition (OCR) on PDFs, and image classification directly using SQL commands.",
    codeSnippet: `SELECT 
  uri,
  ml_generate_text_result
FROM ML.GENERATE_TEXT(
  MODEL \`my_dataset.gemini_pro_model\`,
  TABLE \`my_dataset.unstructured_docs_table\`,
  STRUCT(0.2 AS temperature)
);`,
    docUrl: "https://cloud.google.com/bigquery/docs/object-table-introduction"
  },
  {
    id: "rel-5",
    date: { day: "03", month: "Jun", year: "2026" },
    title: "BigQuery ML: Vertex AI Gemini 1.5 Pro remote model integration",
    type: "feature",
    category: "ml",
    summary: "Deploy LLM workflows directly within SQL using Gemini 1.5 Pro models for multimodal analysis and high token-context reasoning.",
    description: "You can now register Vertex AI's Gemini 1.5 Pro as a remote model inside BigQuery. This allows running large language model (LLM) prompts, sentiment analysis, translation, and structured extraction queries over massive columns of text, code, or linked media objects using SQL commands.",
    codeSnippet: `CREATE OR REPLACE MODEL \`my_dataset.gemini_pro\`
REMOTE WITH CONNECTION \`us.vertex-ai-conn\`
OPTIONS (ENDPOINT = 'gemini-1.5-pro');`,
    docUrl: "https://cloud.google.com/bigquery/docs/generate-text-tutorial"
  },
  {
    id: "rel-6",
    date: { day: "28", month: "May", year: "2026" },
    title: "Query execution graph visualization improvements",
    type: "improvement",
    category: "administration",
    summary: "The Google Cloud Console Query Execution Graph now displays detailed read/write skew metrics and compute hotspots.",
    description: "To aid developers in query tuning, the visual Query Execution Graph inside the Google Cloud Console has been redesigned. It now color-codes execution stages by resource utilization, highlights data skew issues where individual slot workloads are unbalanced, and offers recommendations on clustering keys.",
    codeSnippet: "",
    docUrl: "https://cloud.google.com/bigquery/docs/query-plan-explanation"
  },
  {
    id: "rel-7",
    date: { day: "22", month: "May", year: "2026" },
    title: "Deprecation of legacy SQL dialect in new projects",
    type: "deprecation",
    category: "sql",
    summary: "Legacy SQL (BQL) is now disabled by default for new projects. Google encourages migrating all queries to GoogleSQL.",
    description: "To streamline service maintenance and performance optimization, BigQuery is starting the phased retirement of Legacy SQL. New Google Cloud projects created after May 2026 will have Legacy SQL execution blocked by default. Existing projects are unaffected, but developers are strongly advised to migrate queries to standard GoogleSQL syntax.",
    codeSnippet: `/* Standard SQL is selected automatically. 
   Do not use #legacySQL prefix anymore. */
SELECT user_id, SUM(cost) 
FROM \`my_project.dataset.billing\`
GROUP BY user_id;`,
    docUrl: "https://cloud.google.com/bigquery/docs/reference/standard-sql/migrating-from-legacy-sql"
  },
  {
    id: "rel-8",
    date: { day: "15", month: "May", year: "2026" },
    title: "SQL command error bugfix in JSON path evaluation",
    type: "fix",
    category: "sql",
    summary: "Resolved a parsing issue where nested JSON paths with wildcard brackets caused unexpected null values.",
    description: "Fixed a bug in standard SQL JSON extraction. Previously, evaluating paths with complex wildcard selections (e.g. \`json_col.items[*].details\`) could occasionally return a NULL result instead of raising an error or returning the correct JSON array when processing high-volume batch queries. Path evaluation is now stable and compliant.",
    codeSnippet: `/* This expression now correctly extracts all detail objects as a JSON array */
SELECT JSON_EXTRACT_ARRAY(json_doc, '$.orders[*].items[*].id') 
FROM ecom_dataset.logs;`,
    docUrl: "https://cloud.google.com/bigquery/docs/reference/standard-sql/json_functions"
  }
];

const TALKS_DATA = [
  {
    id: "talk-1",
    title: "BigQuery Architecture Deep Dive: Next-Gen Storage & Slot Allocation",
    type: "conference",
    dateTime: "June 25, 2026 - 10:00 AM PST",
    location: "Google Cloud Next '26, San Francisco & Online",
    presenter: { name: "Maria Chen", title: "Principal Architect, BigQuery Engine", initial: "MC" },
    abstract: "Explore the internal mechanics of BigQuery's decoupled storage and compute. This session covers the new slot autoscaling algorithms, metadata caching layers, and optimization techniques for petabyte-scale queries.",
    agenda: [
      "10:00 AM - Introductions and decoupling review",
      "10:15 AM - Autoscaling slots and compute allocation deep dive",
      "10:45 AM - Metadata caching under the hood",
      "11:15 AM - Q&A Session"
    ]
  },
  {
    id: "talk-2",
    title: "Mastering BigQuery ML: Running Vertex AI Gemini Models directly with SQL",
    type: "webinar",
    dateTime: "July 02, 2026 - 11:00 AM EST",
    location: "Google Cloud Developers Webinar",
    presenter: { name: "Alex Mercer", title: "Developer Advocate, Google Cloud ML", initial: "AM" },
    abstract: "Learn how to build intelligent, LLM-powered applications inside your database. We will walk through registering remote Gemini models, structuring prompts via SQL, and extracting structured insights from raw text data.",
    agenda: [
      "11:00 AM - Setting up Vertex AI remote connections",
      "11:15 AM - Creating LLM remote models in BigQuery",
      "11:35 AM - Practical examples: Sentiment analysis & formatting",
      "11:50 AM - Interactive Q&A"
    ]
  },
  {
    id: "talk-3",
    title: "BigQuery Row-Level & Column-Level Security Best Practices",
    type: "workshop",
    dateTime: "July 09, 2026 - 2:00 PM GMT",
    location: "Hands-on Technical Lab (Virtual)",
    presenter: { name: "Sarah Jenkins", title: "Security Engineer, Cloud Datashield", initial: "SJ" },
    abstract: "A highly practical hands-on workshop focused on securing sensitive data assets. Configure row-level access control, implement data masking policies with hashing/expressions, and audit security events using Cloud Logging.",
    agenda: [
      "2:00 PM - Security architecture overview",
      "2:15 PM - Lab 1: Configuring Row-Level Security policies",
      "2:45 PM - Lab 2: Setting up custom Data Masking Policies",
      "3:15 PM - Lab 3: Log audits & compliance validation",
      "3:45 PM - Wrap-up"
    ]
  },
  {
    id: "talk-4",
    title: "BigQuery User Group: Analytics & Real-Time Dashboards Hub",
    type: "meetup",
    dateTime: "July 15, 2026 - 6:30 PM CET",
    location: "Google Munich Office & YouTube Live stream",
    presenter: { name: "Dieter Schmidt", title: "Co-Organizer, Munich Data Community", initial: "DS" },
    abstract: "A community meet-and-greet detailing how local scale-ups use BigQuery with Looker and Open Source dashboard tools. Features quick lightning talks and networking drinks afterward.",
    agenda: [
      "6:30 PM - Welcome drinks and networking",
      "7:00 PM - Showcase: Looker + Materialized Views optimizations",
      "7:30 PM - Showcase 2: Building live dashboards with Pub/Sub & BigQuery storage write API",
      "8:00 PM - Panel discussion & Pizza"
    ]
  }
];

/* ==========================================================================
   Application State & Orchestration
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  initApp();
});

function initApp() {
  // Theme initialization
  initTheme();
  
  // Render views
  renderDashboard();
  renderReleases();
  renderTalks();
}

/* Theme Management */
function initTheme() {
  const themeToggle = document.getElementById("theme-toggle-btn");
  
  // Check local storage or system preference
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "light") {
    document.body.classList.remove("dark-theme");
    document.body.classList.add("light-theme");
  } else {
    document.body.classList.remove("light-theme");
    document.body.classList.add("dark-theme");
  }
  
  themeToggle.addEventListener("click", () => {
    if (document.body.classList.contains("dark-theme")) {
      document.body.classList.replace("dark-theme", "light-theme");
      localStorage.setItem("theme", "light");
    } else {
      document.body.classList.replace("light-theme", "dark-theme");
      localStorage.setItem("theme", "dark");
    }
  });
}

/* Navigation Management */
function switchTab(tabId) {
  // Update nav buttons
  const navButtons = document.querySelectorAll(".nav-link");
  navButtons.forEach(btn => {
    if (btn.id === `nav-btn-${tabId}`) {
      btn.classList.add("active");
    } else {
      btn.classList.remove("active");
    }
  });
  
  // Update view panes
  const tabPanes = document.querySelectorAll(".tab-pane");
  tabPanes.forEach(pane => {
    if (pane.id === `tab-${tabId}`) {
      pane.classList.add("active");
    } else {
      pane.classList.remove("active");
    }
  });
  
  // Smooth scroll back to top on switch
  window.scrollTo({ top: 0, behavior: "smooth" });
}

/* ==========================================================================
   Dashboard Render
   ========================================================================== */
function renderDashboard() {
  // Update metric counters
  document.getElementById("stat-count-releases").textContent = RELEASES_DATA.length;
  document.getElementById("stat-count-talks").textContent = TALKS_DATA.length;
  
  // Find latest update date
  if (RELEASES_DATA.length > 0) {
    const latest = RELEASES_DATA[0];
    document.getElementById("stat-last-updated").textContent = `${latest.date.month} ${latest.date.day}`;
  }

  // Render recent releases in dashboard list
  const recentReleasesList = document.getElementById("dashboard-recent-releases");
  recentReleasesList.innerHTML = "";
  
  // Display up to 4 recent releases
  const recentReleases = RELEASES_DATA.slice(0, 4);
  recentReleases.forEach(rel => {
    const item = document.createElement("div");
    item.className = "recent-release-item";
    item.onclick = () => openReleaseModal(rel.id);
    
    item.innerHTML = `
      <span class="item-badge ${rel.type}">${rel.type}</span>
      <div class="item-content">
        <h3 class="item-title">${rel.title}</h3>
        <p class="item-desc">${rel.summary}</p>
      </div>
      <span class="item-date">${rel.date.day} ${rel.date.month}</span>
    `;
    recentReleasesList.appendChild(item);
  });

  // Render upcoming events in dashboard timeline
  const upcomingTalksList = document.getElementById("dashboard-upcoming-talks");
  upcomingTalksList.innerHTML = "";
  
  TALKS_DATA.forEach(talk => {
    const item = document.createElement("div");
    item.className = "timeline-item";
    
    item.innerHTML = `
      <div class="timeline-marker"></div>
      <div class="timeline-date">${talk.dateTime.split(" - ")[0]}</div>
      <h3 class="timeline-title" onclick="openTalkModal('${talk.id}')">${talk.title}</h3>
      <div class="timeline-meta">${talk.presenter.name} | ${talk.location.split(",")[0]}</div>
    `;
    upcomingTalksList.appendChild(item);
  });
}

/* ==========================================================================
   Releases View Render
   ========================================================================== */
function renderReleases(filteredReleases = RELEASES_DATA) {
  const container = document.getElementById("releases-container");
  const matchCount = document.getElementById("releases-match-count");
  
  container.innerHTML = "";
  matchCount.textContent = `Showing ${filteredReleases.length} ${filteredReleases.length === 1 ? "release" : "releases"}`;
  
  if (filteredReleases.length === 0) {
    container.innerHTML = `
      <div class="dashboard-card" style="text-align: center; padding: 3rem;">
        <p style="color: var(--text-secondary); margin-bottom: 1rem;">No releases match your search filters.</p>
        <button class="btn-primary" onclick="resetReleaseFilters()">Reset Filters</button>
      </div>
    `;
    return;
  }
  
  filteredReleases.forEach(rel => {
    const card = document.createElement("div");
    card.className = "release-card";
    
    // Tag component conversion
    let categoryLabel = "";
    switch(rel.category) {
      case "sql": categoryLabel = "SQL & Syntax"; break;
      case "security": categoryLabel = "Security & IAM"; break;
      case "performance": categoryLabel = "Performance & Storage"; break;
      case "connections": categoryLabel = "Connections"; break;
      case "ml": categoryLabel = "BigQuery ML"; break;
      case "administration": categoryLabel = "Admin & Billing"; break;
      default: categoryLabel = rel.category;
    }
    
    card.innerHTML = `
      <div class="card-sidebar">
        <div class="card-date-badge">
          <span class="card-date-day">${rel.date.day}</span>
          <span class="card-date-month">${rel.date.month}</span>
        </div>
        <span class="item-badge ${rel.type}">${rel.type}</span>
      </div>
      <div class="card-main">
        <div class="card-title-row">
          <h2 class="card-title">${rel.title}</h2>
          <span class="tag ${rel.category}">${categoryLabel}</span>
        </div>
        <p class="card-description">${rel.summary}</p>
        <div class="card-actions">
          <button class="btn-secondary" onclick="openReleaseModal('${rel.id}')">View Details & Sample Code</button>
        </div>
      </div>
    `;
    container.appendChild(card);
  });
}

function filterReleases() {
  const query = document.getElementById("search-input-releases").value.toLowerCase().trim();
  const typeFilter = document.getElementById("filter-release-type").value;
  const catFilter = document.getElementById("filter-release-category").value;
  
  const filtered = RELEASES_DATA.filter(rel => {
    const matchesSearch = 
      rel.title.toLowerCase().includes(query) ||
      rel.summary.toLowerCase().includes(query) ||
      rel.description.toLowerCase().includes(query);
      
    const matchesType = typeFilter === "all" || rel.type === typeFilter;
    const matchesCat = catFilter === "all" || rel.category === catFilter;
    
    return matchesSearch && matchesType && matchesCat;
  });
  
  renderReleases(filtered);
}

function resetReleaseFilters() {
  document.getElementById("search-input-releases").value = "";
  document.getElementById("filter-release-type").value = "all";
  document.getElementById("filter-release-category").value = "all";
  renderReleases(RELEASES_DATA);
}

/* ==========================================================================
   Events & Talks View Render
   ========================================================================== */
function renderTalks(filteredTalks = TALKS_DATA) {
  const container = document.getElementById("talks-container");
  const matchCount = document.getElementById("talks-match-count");
  
  container.innerHTML = "";
  matchCount.textContent = `Showing ${filteredTalks.length} ${filteredTalks.length === 1 ? "talk & event" : "talks & events"}`;
  
  if (filteredTalks.length === 0) {
    container.innerHTML = `
      <div class="dashboard-card" style="grid-column: 1 / -1; text-align: center; padding: 3rem;">
        <p style="color: var(--text-secondary); margin-bottom: 1rem;">No events match your search query.</p>
        <button class="btn-primary" onclick="resetTalkFilters()">Reset Search</button>
      </div>
    `;
    return;
  }
  
  filteredTalks.forEach(talk => {
    const card = document.createElement("div");
    card.className = "talk-card";
    
    card.innerHTML = `
      <div class="talk-badge-row">
        <span class="talk-type-badge ${talk.type}">${talk.type}</span>
        <span class="talk-time">${talk.dateTime.split(" - ")[0]}</span>
      </div>
      <h2 class="talk-title">${talk.title}</h2>
      <p class="talk-abstract">${talk.abstract}</p>
      <div class="talk-footer">
        <div class="presenter-info">
          <div class="presenter-avatar">${talk.presenter.initial}</div>
          <div class="presenter-details">
            <span class="presenter-name">${talk.presenter.name}</span>
            <span class="presenter-title">${talk.presenter.title}</span>
          </div>
        </div>
        <button class="btn-primary" onclick="openTalkModal('${talk.id}')">View Agenda</button>
      </div>
    `;
    container.appendChild(card);
  });
}

function filterTalks() {
  const query = document.getElementById("search-input-talks").value.toLowerCase().trim();
  const typeFilter = document.getElementById("filter-talk-type").value;
  
  const filtered = TALKS_DATA.filter(talk => {
    const matchesSearch = 
      talk.title.toLowerCase().includes(query) ||
      talk.abstract.toLowerCase().includes(query) ||
      talk.presenter.name.toLowerCase().includes(query) ||
      talk.location.toLowerCase().includes(query);
      
    const matchesType = typeFilter === "all" || talk.type === typeFilter;
    
    return matchesSearch && matchesType;
  });
  
  renderTalks(filtered);
}

function resetTalkFilters() {
  document.getElementById("search-input-talks").value = "";
  document.getElementById("filter-talk-type").value = "all";
  renderTalks(TALKS_DATA);
}

/* ==========================================================================
   Details Modal Logic
   ========================================================================== */
function openModal() {
  const modal = document.getElementById("details-modal");
  modal.classList.remove("hidden");
  document.body.style.overflow = "hidden"; // Prevent body scrolling
}

function closeModal(event) {
  const modal = document.getElementById("details-modal");
  modal.classList.add("hidden");
  document.body.style.overflow = ""; // Re-enable scrolling
}

function openReleaseModal(releaseId) {
  const release = RELEASES_DATA.find(r => r.id === releaseId);
  if (!release) return;
  
  const content = document.getElementById("modal-content");
  
  // Format Category name
  let categoryLabel = "";
  switch(release.category) {
    case "sql": categoryLabel = "SQL & Syntax"; break;
    case "security": categoryLabel = "Security & IAM"; break;
    case "performance": categoryLabel = "Performance & Storage"; break;
    case "connections": categoryLabel = "Connections"; break;
    case "ml": categoryLabel = "BigQuery ML"; break;
    case "administration": categoryLabel = "Admin & Billing"; break;
    default: categoryLabel = release.category;
  }
  
  let codeHtml = "";
  if (release.codeSnippet) {
    // Escape HTML inside code snippet
    const escapedCode = release.codeSnippet
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
      
    codeHtml = `
      <h3>SQL Code Example / Integration</h3>
      <div class="code-block-wrapper">
        <span class="code-block-header">SQL</span>
        <pre><code class="language-sql">${escapedCode}</code></pre>
      </div>
    `;
  }
  
  content.innerHTML = `
    <div class="modal-header-section">
      <div class="modal-category-row">
        <span class="item-badge ${release.type}">${release.type}</span>
        <span class="tag ${release.category}">${categoryLabel}</span>
      </div>
      <h2 class="modal-title">${release.title}</h2>
      <div class="modal-meta-row">
        <div class="modal-meta-item">
          <svg viewBox="0 0 24 24" width="16" height="16"><path fill="currentColor" d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11z"/></svg>
          <span>Released on ${release.date.month} ${release.date.day}, ${release.date.year}</span>
        </div>
      </div>
    </div>
    <div class="modal-body-section">
      <h3>Change Summary</h3>
      <p>${release.summary}</p>
      
      <h3>Detailed Description</h3>
      <p>${release.description}</p>
      
      ${codeHtml}
    </div>
    <div class="modal-footer-section">
      <button class="btn-secondary" onclick="closeModal()">Close</button>
      <a href="${release.docUrl}" target="_blank" rel="noopener" class="btn-primary" style="display: inline-flex; align-items: center; justify-content: center; text-decoration: none;">Read Official Documentation</a>
    </div>
  `;
  
  openModal();
}

function openTalkModal(talkId) {
  const talk = TALKS_DATA.find(t => t.id === talkId);
  if (!talk) return;
  
  const content = document.getElementById("modal-content");
  
  const agendaList = talk.agenda.map(item => `<li>${item}</li>`).join("");
  
  content.innerHTML = `
    <div class="modal-header-section">
      <div class="modal-category-row">
        <span class="talk-type-badge ${talk.type}">${talk.type}</span>
      </div>
      <h2 class="modal-title">${talk.title}</h2>
      <div class="modal-meta-row" style="flex-wrap: wrap;">
        <div class="modal-meta-item">
          <svg viewBox="0 0 24 24" width="16" height="16"><path fill="currentColor" d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
          <span>${talk.location}</span>
        </div>
        <div class="modal-meta-item">
          <svg viewBox="0 0 24 24" width="16" height="16"><path fill="currentColor" d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67V7z"/></svg>
          <span>${talk.dateTime}</span>
        </div>
      </div>
    </div>
    <div class="modal-body-section">
      <h3>About this Session</h3>
      <p>${talk.abstract}</p>
      
      <h3>Presenter</h3>
      <div class="presenter-info" style="margin-bottom: 1.5rem; background: var(--bg-card); padding: 0.75rem 1rem; border-radius: 12px; border: 1px solid var(--border-color);">
        <div class="presenter-avatar">${talk.presenter.initial}</div>
        <div class="presenter-details">
          <span class="presenter-name">${talk.presenter.name}</span>
          <span class="presenter-title">${talk.presenter.title}</span>
        </div>
      </div>
      
      <h3>Session Agenda</h3>
      <ul style="padding-left: 1.25rem; color: var(--text-secondary); line-height: 1.6; margin-bottom: 1rem;">
        ${agendaList}
      </ul>
    </div>
    <div class="modal-footer-section">
      <button class="btn-secondary" onclick="closeModal()">Close</button>
      <button class="btn-primary" onclick="alert('Session successfully bookmarked! A calendar notification will be sent to you.')">Bookmark Session</button>
    </div>
  `;
  
  openModal();
}
