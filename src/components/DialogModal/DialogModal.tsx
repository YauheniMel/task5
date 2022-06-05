import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import { TextareaAutosize, TextField } from '@mui/material';
import InputUser from '../InputUser/InputUser';

const DialogModal: React.FC<any> = function ({ isOpen, close, users }) {
  return (
    <div>
      <Dialog
        open={isOpen}
        onClose={close}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <InputUser users={users} />
        <TextField label="Theme" variant="standard" sx={{ m: 1 }} />
        <TextareaAutosize
          aria-label="empty textarea"
          placeholder="Message"
          style={{
            resize: 'vertical',
            width: 400,
            minHeight: 100,
            padding: 10,
            margin: '10px',
          }}
        />
        <DialogActions>
          <Button onClick={close}>Cancel</Button>
          <Button variant="contained" onClick={close} autoFocus>
            Send
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DialogModal;
