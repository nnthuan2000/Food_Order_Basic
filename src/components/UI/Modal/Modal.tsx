import React from "react";
import ReactDOM from "react-dom";

import classes from "./Modal.module.css";

interface BackdropProps {
  onClose: () => void;
}

interface ModalOverlayProps {
  children: React.ReactNode;
}

interface ModalProps extends BackdropProps, ModalOverlayProps {}

const Backdrop = ({ onClose }: BackdropProps) => {
  return <div className={classes.backdrop} onClick={onClose}></div>;
};

const ModalOverlay = ({ children }: ModalOverlayProps) => {
  return <div className={classes.modal}>{children}</div>;
};

const Modal = ({ onClose, children }: ModalProps) => {
  const overlaysEl = document.getElementById("overlays")! as HTMLDivElement;

  return (
    <React.Fragment>
      {ReactDOM.createPortal(<Backdrop onClose={onClose} />, overlaysEl)}
      {ReactDOM.createPortal(<ModalOverlay>{children}</ModalOverlay>, overlaysEl)}
    </React.Fragment>
  );
};

export default Modal;
