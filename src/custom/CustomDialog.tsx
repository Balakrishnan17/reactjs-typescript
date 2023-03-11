import React, { ReactElement } from "react";
import ReactDOM from "react-dom";

interface Props {
  header: string;
  children: ReactElement;
  type: string;
  toggleModal(): void;
}

interface State {}

class CustomDialog extends React.Component<Props, State> {
  el: HTMLInputElement;
  rootElement: HTMLInputElement = document.getElementById(
    "modal-root"
  ) as HTMLInputElement;
  constructor(props: Props) {
    super(props);
    this.el = document.createElement("div") as HTMLInputElement;
    this.el.id = "portal";
  }

  componentDidMount() {
    this.rootElement.appendChild(this.el);
  }

  componentWillUnmount() {
    console.log("dialog unmound");
    this.rootElement.removeChild(this.el);
  }

  render() {
    return ReactDOM.createPortal(
      <div
        className="portal"
        id="portal-outer"
        onClick={(e: React.MouseEvent<any>) => this.outsideClick(e)}
      >
        <div className="portal-main">
          <div className="portal-header">{this.props.header}</div>

          <div className="portal-body">{this.props.children}</div>
        </div>
      </div>,
      this.el
    );
  }

  outsideClick(e?: React.MouseEvent<any>) {
    if (!e || e.target === document.getElementById("portal-outer")) {
      return this.props.toggleModal();
    }
  }
}

export default CustomDialog;
