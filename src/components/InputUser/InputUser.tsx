import * as React from 'react';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';

const filter = createFilterOptions<any>();

const InputUser: React.FC<any> = function ({ data, setAddressee }) {
  const [value, setValue] = React.useState<any | null>(null);
  const [open, toggleOpen] = React.useState(false);

  const [dialogValue, setDialogValue] = React.useState({
    name: '',
  });

  const handleClose = () => {
    setDialogValue({
      name: '',
    });
    toggleOpen(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setValue({
      name: dialogValue.name,
    });
    handleClose();
  };

  return (
    <>
      <Autocomplete
        value={value}
        sx={{
          m: 1,
        }}
        onChange={(event, newValue) => {
          if (typeof newValue === 'string') {
            // timeout to avoid instant validation of the dialog's form.
            setTimeout(() => {
              toggleOpen(true);
              setDialogValue({
                name: newValue,
              });
            });
          } else if (newValue && newValue.inputValue) {
            toggleOpen(true);
            setDialogValue({
              name: newValue.inputValue,
            });
          } else {
            setValue(newValue);
          }
          setAddressee(newValue);
        }}
        filterOptions={(options, params) => {
          const filtered = filter(options, params);

          if (params.inputValue !== '') {
            filtered.push({
              inputValue: params.inputValue,
              name: `Add "${params.inputValue}"`,
            });
          }

          return filtered;
        }}
        id="free-solo-dialog-demo"
        options={data}
        getOptionLabel={(option) => {
          // e.g value selected with enter, right from the input
          if (typeof option === 'string') {
            return option;
          }
          if (option.inputValue) {
            return option.inputValue;
          }
          return option.name;
        }}
        selectOnFocus
        clearOnBlur
        handleHomeEndKeys
        // eslint-disable-next-line react/jsx-props-no-spreading
        renderOption={(props, option) => <li {...props}>{option.name}</li>}
        freeSolo
        renderInput={(params) => (
          <TextField
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...params}
            variant="standard"
            label="Addressee"
            required
          />
        )}
      />
      <Dialog open={open} onClose={handleClose}>
        <form onChange={handleSubmit}>
          <DialogTitle>Add a new film</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Did you miss any film in our list? Please, add it!
            </DialogContentText>
            <TextField
              required
              autoFocus
              margin="dense"
              id="name"
              value={dialogValue.name}
              onChange={(event) => setDialogValue({
                ...dialogValue,
                name: event.target.name,
              })}
              label="title"
              type="text"
              variant="standard"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit">Add</Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};

export default InputUser;
