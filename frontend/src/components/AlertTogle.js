import { IconButton, Collapse, Alert } from '@mui/material';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { Close } from '@mui/icons-material';

function AlertTogle({ severity, children, switchValue }) {
  const [alertOpen, setAlertOpen] = switchValue;
  const TIME_FOR_CLOSE_ALERT = 3000;

  useEffect(() => {
    if (alertOpen) {
      setTimeout(() => setAlertOpen(false), TIME_FOR_CLOSE_ALERT);
    }
  }, [alertOpen, setAlertOpen]);

  return (
    <Collapse
      sx={ { position: 'fixed',
        top: '5px',
        left: '30%',
        zIndex: '99999' } }
      in={ alertOpen }
    >
      <Alert
        severity={ severity }
        variant="filled"
        action={
          <IconButton
            aria-label="close"
            size="medium"
            onClick={ () => {
              setAlertOpen(false);
            } }
          >
            <Close />
          </IconButton>
        }
        sx={ { mb: 2, width: '80%' } }
      >
        {children}
      </Alert>
    </Collapse>
  );
}

AlertTogle.propTypes = {
  severity: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  switchValue: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.func,
  ])).isRequired,
};

export default AlertTogle;
