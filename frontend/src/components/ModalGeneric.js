import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import PropTypes from 'prop-types';
import Modal from '@mui/material/Modal';

function ModalGeneric({ children,
  stateForOpen, sx }) {
  const [openModal, setOpenModal] = stateForOpen;
  const handleClose = () => setOpenModal(false);

  const style = {
    position: 'absolute',
    display: 'flex',
    justifyContent: 'space-arround',
    flexFlow: 'column',
    top: '50%',
    color: 'white',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 250,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 3,
  };

  return (
    <Modal
      open={ openModal }
      onClose={ handleClose }
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={ { ...style, ...sx } }>
        {children}
        <Box sx={ { display: 'flex', justifyContent: 'space-around' } }>
          <Button
            onClick={ handleClose }
            size="small"
            color="error"
          >
            Cancelar
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}

ModalGeneric.defaultProps = {
  sx: {},
};

ModalGeneric.propTypes = {
  children: PropTypes.node.isRequired,
  stateForOpen: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.func,
  ])).isRequired,
  sx: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ])),
};

export default ModalGeneric;
