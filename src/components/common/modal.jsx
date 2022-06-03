import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Button } from 'react-bootstrap';

const ShowModal = ({ title, content, onAgree, onDisagree, isShow }) => {
  return (
    <Modal show={isShow} onHide={onDisagree} animation={true}>
      <Modal.Header>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{content}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onDisagree}>
          Close
        </Button>
        <Button variant="primary" onClick={onAgree}>
          Visit my Git
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ShowModal;

ShowModal.propTypes = {
  isShow: PropTypes.bool,
  title: PropTypes.string,
  content: PropTypes.string,
  onAgree: PropTypes.func,
  onDisagree: PropTypes.func
};
