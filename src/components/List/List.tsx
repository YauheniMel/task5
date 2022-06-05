import * as React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import { List } from '@mui/material';

const ListComponent: React.FC<any> = function ({ data }) {
  return (
    <List
      sx={{
        width: '100%',
        bgcolor: 'background.paper',
        position: 'relative',
        overflow: 'auto',
        maxHeight: 200,
        '& ul': { padding: 0 },
      }}
      subheader={<li />}
    >
      {data.send.map((info: any, idx: number) => (
        // eslint-disable-next-line react/no-array-index-key
        <li key={`section-${idx}`}>
          <ul>
            <ListSubheader>{`${info.date}`}</ListSubheader>
            {data.send.map((item: any, i: any) => (
              // eslint-disable-next-line react/no-array-index-key
              <ListItem key={`item-${item.date}-${i}`}>
                <ListItemText primary={`Item ${item.content}`} />
              </ListItem>
            ))}
          </ul>
        </li>
      ))}
    </List>
  );
};

export default ListComponent;
