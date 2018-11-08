import { ExtractedRepoSlug } from "@r2c/extension/utils";
import { last } from "lodash";
import * as React from "react";

interface TreeMetadataProps {
  repoSlug: ExtractedRepoSlug;
  children(state: TreeMetadataState): React.ReactNode;
}

interface TreeMetadataState {
  currentPath: string;
  commitHash: string;
}

export default class TreeMetadata extends React.Component<
  TreeMetadataProps,
  Partial<TreeMetadataState>
> {
  public state: Partial<TreeMetadataState> = {
    currentPath: undefined,
    commitHash: undefined
  };

  public componentDidMount() {
    this.extractTreeMetadata();
  }

  public componentDidUpdate() {
    this.extractTreeMetadata();
  }

  public render() {
    if (this.state.currentPath != null && this.state.commitHash != null) {
      return this.props.children(this.state as TreeMetadataState);
    }

    return null;
  }

  private extractTreeMetadata = () => {
    const { rest } = this.props.repoSlug;
    const commitNode = document.querySelector(".commit-tease-sha");
    const commitLink =
      commitNode != null ? commitNode.getAttribute("href") : null;
    const commitHash =
      commitLink != null ? last(commitLink.split("/")) || undefined : undefined;

    if (rest.startsWith("tree")) {
      const pathName = rest.split("/");
      const currentPath = `${pathName.slice(2).join("/")}/`;
      this.updateMetadata(currentPath, commitHash);
    } else if (rest.length === 0) {
      // at root
      this.updateMetadata("", commitHash);
    } else {
      this.clearMetadata();
    }
  };

  private updateMetadata(currentPath: string, commitHash: string | undefined) {
    if (
      this.state.currentPath !== currentPath ||
      this.state.commitHash !== commitHash
    ) {
      this.setState({ currentPath, commitHash });
    }
  }

  private clearMetadata() {
    if (this.state.currentPath != null || this.state.commitHash != null) {
      this.setState({ currentPath: undefined, commitHash: undefined });
    }
  }
}
