import { Button, Icon, Intent, Spinner } from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";
import { l } from "@r2c/extension/analytics";
import { PreflightChecklistErrors } from "@r2c/extension/content/headsup/PreflightFetch";
import { PreflightProjectState } from "@r2c/extension/content/headsup/PreflightProjectState";
import { MainToaster } from "@r2c/extension/content/Toaster";
import * as classnames from "classnames";
import * as React from "react";
import "./NonIdealHeadsup.css";

enum ClosedState {
  Open,
  DisplayOptions,
  Closed
}

interface UnsupportedMessageState {
  closed: ClosedState;
}

export class UnsupportedHeadsUp extends React.PureComponent<
  {},
  UnsupportedMessageState
> {
  public state: UnsupportedMessageState = {
    closed: localStorage.getItem("closed") === "true" ? ClosedState.Closed : ClosedState.Open
  };

  public render() {

    if (this.state.closed === ClosedState.Closed) {
      return null;
    }
    else if (this.state.closed === ClosedState.DisplayOptions) {
      return (
        <div
        className={classnames(
          "r2c-repo-headsup",
          "nonideal-headsup",
          "unsupported-headsup"
        )}
        >
          <span className="dismiss-options">
            <Button
              id="dismiss-always-button"
              minimal={true}
              small={true}
              onClick={
                this.handleDismissAlways
              }
            >
              Dismiss Always
            </Button>
            <Button
              id="dismiss-once-button"
              minimal={true}
              small={true}
              onClick={
                this.handleDismissOnce
              }
            >
              Dismiss Once
            </Button>
          </span>
        </div>
      );
    }

    l("preflight-unsupported-repo-load");

    return (
      <div
        className={classnames(
          "r2c-repo-headsup",
          "nonideal-headsup",
          "unsupported-headsup"
        )}
      >
        <span className="unsupported-message-text">
          🛫 Preflight couldn't find results or npm packages associated with
          this repository. If this seems in error, please{" "}
          <Button
            id="unsupported-message-request-button"
            rightIcon={IconNames.FLAG}
            minimal={true}
            small={true}
            onClick={l(
              "preflight-unsupported-request-click",
              this.handleRequestClick
            )}
            intent={Intent.SUCCESS}
          >
            let us know!
          </Button>
        </span>
        <Button
          icon={IconNames.SMALL_CROSS}
          minimal={true}
          small={true}
          onClick={this.closeMessage}
        />
      </div>
    );
  }

  private closeMessage: React.MouseEventHandler<HTMLElement> = e => {
    this.setState({ closed: ClosedState.DisplayOptions });
  };

  private handleRequestClick: React.MouseEventHandler<HTMLElement> = e => {
    MainToaster.show({
      message:
        "We've got your message! We'll look into why this project isn't available on Preflight.",
      icon: IconNames.HEART
    });
  };

  private handleDismissAlways: React.MouseEventHandler<HTMLElement> = e => {
    localStorage.setItem("closed", "true");
    this.setState({closed: ClosedState.Closed});
  }

  private handleDismissOnce: React.MouseEventHandler<HTMLElement> = e => {
    this.setState({closed: ClosedState.Closed});
  }
}

interface ErrorHeadsUpProps {
  projectState: PreflightProjectState;
  error: PreflightChecklistErrors | Error | React.ErrorInfo | string;
}

interface ErrorHeadsUpState {
  showDetails: boolean;
}

export class ErrorHeadsUp extends React.PureComponent<
  ErrorHeadsUpProps,
  ErrorHeadsUpState
> {
  public state: ErrorHeadsUpState = {
    showDetails: false
  };

  public render() {
    const hasError = Object.getOwnPropertyNames(this.props.error).length > 0;

    return (
      <div
        className={classnames(
          "r2c-repo-headsup",
          "nonideal-headsup",
          "error-headsup"
        )}
      >
        <div className="error-briefing">
          <div className="error-briefing-message">
            <Icon
              icon={IconNames.WARNING_SIGN}
              className="error-icon"
              intent={Intent.DANGER}
            />
            <div className="error-message-text">
              Couldn't load Preflight. Check that <code>api.secarta.io</code> is
              whitelisted in your browser.
            </div>
          </div>
          {hasError && (
            <div className="error-briefing-action">
              <Button
                onClick={this.handleToggleShowDetails}
                className="error-message-show-more"
                small={true}
                minimal={true}
              >
                Show {this.state.showDetails ? "less" : "details"}
              </Button>
            </div>
          )}
        </div>
        {this.state.showDetails && (
          <div className="error-details">
            <pre className="error-code">{this.props.projectState}</pre>
            <pre className="error-raw">{JSON.stringify(this.props.error)}</pre>
          </div>
        )}
      </div>
    );
  }

  private handleToggleShowDetails: React.MouseEventHandler<HTMLElement> = e =>
    this.setState({ showDetails: !this.state.showDetails });
}

export class LoadingHeadsUp extends React.PureComponent {
  public state: UnsupportedMessageState = {
    closed: ClosedState.Open
  };

  public render() {
    if (this.state.closed === ClosedState.Closed) {
      return null;
    } 

    return (
      <div
        className={classnames(
          "r2c-repo-headsup",
          "nonideal-headsup",
          "loading-headsup"
        )}
      >
        <div className="loading-message">
          <Spinner
            size={Spinner.SIZE_SMALL}
            className="loading-headsup-spinner"
          />
          <span className="loading-message-text">Contacting tower...</span>
        </div>
      </div>
    );
  }
}
