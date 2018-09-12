import { Icon, Intent, NonIdealState, Spinner } from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";
import { WARNING_SIGN } from "@blueprintjs/icons/lib/esm/generated/iconNames";
import { PermissionsResponse, permissionsUrl } from "@r2c/extension/api/permissions";
import DomElementLoadedWatcher from "@r2c/extension/content/github/DomElementLoadedWatcher";
import RepoPackageSection from "@r2c/extension/content/PackageCopyBox";
import * as React from "react";
import * as ReactDOM from "react-dom";
import Fetch from "react-fetch-component";
import "./RepoHeadsUp.css";

const PreflightPermissionsItem: React.SFC = () => (
  <Fetch<PermissionsResponse> url={permissionsUrl()}>
  {({ loading, data, error, response }) => {
    const permissionKeys = data && Object.keys(data.permissions);
    const numPermissions: number = permissionKeys ? permissionKeys.length : 0;

    return (
      <li className="preflight-checklist-item">
        {loading && (
          <div className="nutrition-section-value loading">
            <NonIdealState icon={<Spinner />} title="Loading..." />
          </div>
        )}
        {data && 
          <Icon
            className="preflight-checklist-icon"
            intent={numPermissions > 0 ? Intent.WARNING : Intent.SUCCESS}
            icon={numPermissions > 0 ? IconNames.WARNING_SIGN : IconNames.TICK}
          />
        }
        <span className="preflight-checklist-title">            
          { numPermissions > 0 ? `${numPermissions} ${ numPermissions > 1 ? "permissions" : "permission"} detected` : "No special permissions"}
        </span>
      </li>)
    }
  }
  </Fetch >
)

class PreflightChecklist extends React.PureComponent {
  public render() {
    return (
      <section className="preflight-checklist-container">
        <ul className="preflight-checklist">
            <PreflightPermissionsItem />
            <li className="preflight-checklist-item">
              <Icon
                className="preflight-checklist-icon"
                intent={Intent.SUCCESS}
                icon={IconNames.TICK}
              />
              <span className="preflight-checklist-title">
                Top 10 popular package
              </span>
            </li>
            <li className="preflight-checklist-item">
              <Icon
                className="preflight-checklist-icon"
                intent={Intent.SUCCESS}
                icon={IconNames.TICK}
              />
              <span className="preflight-checklist-title">
                Endorsed by 100+ Superstars
              </span>
            </li>
            <li className="preflight-checklist-item">
              <Icon
                className="preflight-checklist-icon"
                intent={Intent.SUCCESS}
                icon={IconNames.TICK}
              />
              <span className="preflight-checklist-title">
                Used by 8 major orgs
              </span>
            </li>
            <li className="preflight-checklist-item">
              <Icon
                className="preflight-checklist-icon"
                intent={Intent.SUCCESS}
                icon={IconNames.TICK}
              />
              <span className="preflight-checklist-title">
                Reproducible package
              </span>
            </li>
            <li className="preflight-checklist-item">
              <Icon
                className="preflight-checklist-icon"
                intent={Intent.SUCCESS}
                icon={IconNames.TICK}
              />
              <span className="preflight-checklist-title">
                No known vulnerabilities
              </span>
            </li>
            <li className="preflight-checklist-item">
              <Icon
                className="preflight-checklist-icon"
                intent={Intent.SUCCESS}
                icon={IconNames.TICK}
              />
              <span className="preflight-checklist-title">
                No special permissions
              </span>
            </li>          
        </ul>
      </section>
    );
  }
}

class ExceptionalHeadsUp extends React.PureComponent {
  public render() {
    return (
      <div className="r2c-repo-headsup exceptional-headsup">
        <header>
          <h1>Danger, Will Robinson!</h1>
        </header>
        <div className="repo-headsup-body">
          <div className="repo-headsup-icon">
            <Icon icon={WARNING_SIGN} />
          </div>
          <div className="repo-headsup-message">
            <h2>There's a known vulnerability in this package</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse pretium, libero eu varius dignissim, lorem turpis
              maximus dolor, sit amet pharetra enim felis in odio. In hac
              habitasse platea dictumst.
            </p>
          </div>
        </div>
      </div>
    );
  }
}

class RepoHeadsUp extends React.PureComponent {
  public render() {
    const navigation = document.querySelector(".repository-lang-stats-graph");
    const existingElem = document.querySelector(".r2c-repo-headsup-container");

    if (navigation == null) {
      return null;
    }

    if (existingElem != null) {
      existingElem.remove();
    }

    const injected = document.createElement("div");
    injected.classList.add("r2c-repo-headsup-container");
    navigation.after(injected);

    return ReactDOM.createPortal(
      <>
        <ExceptionalHeadsUp />
        <div className="r2c-repo-headsup">
          <header>
            <h1>Preflight checks</h1>
          </header>
          <div className="repo-headsup-body">
            <div className="repo-headsup-checklist">
              <PreflightChecklist />
            </div>
            <div className="repo-headsup-actions">
              <RepoPackageSection />
            </div>
          </div>
        </div>
      </>,
      injected
    );
  }
}

export default class RepoHeadsUpInjector extends React.PureComponent {
  public render() {
    return (
      <DomElementLoadedWatcher querySelector=".repository-lang-stats-graph">
        {({ done }) => done && <RepoHeadsUp />}
      </DomElementLoadedWatcher>
    );
  }
}
