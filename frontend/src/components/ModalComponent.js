import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

function DataModal({ show, handleClose, handleChange, handleSubmit, data }) {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{data.id ? 'Edit Record' : 'Add New Record'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          {Object.keys(data).map((key) => {
            // Exclude 'id' and 'file_id' from the form
            if (key !== 'id' && key !== 'file_id') {
              return (
                <Form.Group key={key}>
                  <Form.Label>{key.charAt(0).toUpperCase() + key.slice(1)}</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder={`Enter ${key}`}
                    name={key}
                    value={data[key]}
                    onChange={handleChange}
                  />
                </Form.Group>
              );
            }
            return null;
          })}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default DataModal;
