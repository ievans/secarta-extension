
# Preflight Beta

## Your GitHub copilot for npm   
Preflight makes it fast and simple for you to make decisions about using npm packages. We surface data and a rubric for their quality and security, and if anything merits your attention, we alert you. You shouldn't have to needlessly read 3rd-party code and instead focus on the stuff that matters, like writing that killer new feature and shipping product.

If any of our checks come back with concerning answers we'll notify you through a modified GitHub UI, letting you investigate and focus on the stuff that's abnormal about a project.  

![Picture](./crx.png)
 To install the extension, visit the [Chrome Web Store](https://chrome.google.com/webstore/detail/emaioeinhnifhcmlihcbooknbpjdbllb) or our [Mozilla Add-ons page](https://addons.mozilla.org/addon/r2c-beta/).  
 [![Chrome Web Store](https://img.shields.io/chrome-web-store/v/emaioeinhnifhcmlihcbooknbpjdbllb.svg)](https://chrome.google.com/webstore/detail/r2c-beta/emaioeinhnifhcmlihcbooknbpjdbllb) [![Chrome Web Store](https://img.shields.io/chrome-web-store/d/emaioeinhnifhcmlihcbooknbpjdbllb.svg)](https://chrome.google.com/webstore/detail/r2c-beta/emaioeinhnifhcmlihcbooknbpjdbllb) [![Mozilla Add-on registry](https://img.shields.io/amo/v/r2c-beta.svg)](https://addons.mozilla.org/addon/r2c-beta/) [![Number of Mozilla users](https://img.shields.io/amo/users/r2c-beta.svg)](https://addons.mozilla.org/addon/r2c-beta/)



## Preflight Checklist
* **Permissions:** What can it do? what resources does it use? Can it be used as a common attack vector?
* **Popularity & Usage:** Downloads, orgs that use, prominent authors that use
* **Development Activity:** test coverage, commit / issue acvitity, maintainers, release candence
* **Responsiveness:** Archieved? Time-to-response, Time-to-merge/fix
* **Known & Historical Vulnerabilities:** With an emphasis on response times
* **Dependency Auditing:** Transitive dependencies, dep vs. dev dep., alternatives, bundle size 
* **Code Quality:** Is the project a fork? Does the package have typings?
* **Code Weaknesses:** Does it embed libraries? Passwords in code, XSS

## We are Open 
We perform all of our development in the open. The code for this extension is publicly available on GitHub: github.com/returntocorp/secarta-extension

This extension requests access to read and modify www.github.com for the purposes of extending and augmenting GitHub's repo page. We do not store any sensitive identifying information or credentials on our servers.

## Beta & Telemetry Disclaimer
This extension is in beta and contains a number of product experiments, so we collect telemetry to understand use and decide what to work on next. This telemetry contains a minimal amount of identifying information (your GitHub username, client IP address, and a unique installation ID that is local to your browser). If you have concerns about your privacy or how we use telemetry, please let us know!

We want your thoughts and ideas! Reach out to us via our Beta Slack room or via feedback@ret2.co
