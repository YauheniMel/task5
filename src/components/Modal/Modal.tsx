import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const ModalComponent: React.FC<any> = function ({
  open,
  handleClose,
  newMessages,
}) {
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {newMessages && (
            <ul>
              {newMessages.received.map((msg: any) => (
                <>
                  <li key={msg.date}>
                    <strong>{msg.theme}</strong>
                    <p>{msg.content}</p>
                  </li>
                  <hr />
                </>
              ))}
            </ul>
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default ModalComponent;
