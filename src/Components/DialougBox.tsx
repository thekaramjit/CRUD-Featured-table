import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

type props={
    show:boolean
    handleClose: () => void
    handleAgree:()=>void
    nameToBeDelete:string
}

export const DialougBox: React.FC<props> = ({ show, handleClose, handleAgree, nameToBeDelete })=> {

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header >
                    <Modal.Title>Make sure</Modal.Title>
                </Modal.Header>
                <Modal.Body>Do you want to delete {nameToBeDelete}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleAgree}>
                        Delete
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}