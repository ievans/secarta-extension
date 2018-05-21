onload = function() {
  Promise.all([
    browser.tabs.query({ active: true, currentWindow: true }),
    browser.storage.sync.get("projects")
  ])
    .then(([tabs, store]) => [tabs, store.projects])
    .then(([tabs, projects]) => {
      console.log("current tabs", tabs);
      console.log("projects:", projects);

      if (projects == null) {
        document.querySelector("body").innerHTML = "No repos analyzed yet.";
      } else if (tabs != null && tabs.length > 0 && tabs[0].url != null) {
        const activeTab = tabs[0];
        const url = activeTab.url;
        const repo = getRepoFromGitHubUrl(url);
        console.log("active tab url:", url);
        console.log("active repo:", repo);

        if (repo != null) {
          const projectForRepo = projects[repo];

          if (projectForRepo != null) {
            console.log("response for repo", projectForRepo);
            document.querySelector("body").innerHTML =
              `<h4>${repo}</h4></br>Score: ` +
              projectForRepo.score.result.score +
              "</br>Breakdown:</br>" +
              `<pre>${JSON.stringify(
                projectForRepo.score.result.factors,
                null,
                2
              )}</pre>`;
          } else {
            document.querySelector(
              "body"
            ).innerHTML = `<p>Haven't analyzed current tab</p>`;
          }
        } else {
          document.querySelector(
            "body"
          ).innerHTML = `<p>Current tab isn't GitHub, or couldn't divine repo from url ${url}</p>`;
        }
      } else {
        console.log("No score in storage");
        browser.storage.sync.get(["access_token", "expires_at"]).then(
          res => {
            document.querySelector(
              "body"
            ).innerHTML = `<p>Access token: <code>${res.access_token}</code></p>
        <p>Expires at: <code>${res.expires_at}</code></p>`;
          },
          err => {
            document.querySelector("body").innerHTML = `Error: ${err}`;
          }
        );
      }
    });
};

function getRepoFromGitHubUrl(url) {
  const regexed = /^https:\/\/github.com\/([A-Za-z0-9\-\.\_\/]+)$/.exec(url);
  if (regexed.length > 1) {
    return regexed[1];
  } else {
    return null;
  }
}

onload();
