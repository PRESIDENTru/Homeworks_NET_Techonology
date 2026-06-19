import * as React from 'react';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { industries, yearsGrouped } from './groupdata';
import GroupGrid from './components/GroupGrid';
import GroupChart from './components/GroupChart';

type tSelect = 'Отрасль' | 'Год';

function Chart() {
  const [group, setGroup] = React.useState<tSelect>('Отрасль');
  const [groupData, setGroupData] = React.useState(industries);

  const handleChange = (event: SelectChangeEvent) => {
    const value = event.target.value as tSelect;
    setGroup(value);
    if (value === 'Отрасль') {
      setGroupData(industries);
    } else {
      setGroupData(yearsGrouped);
    }
  };

  return (
    <div>
      <Navbar activePage="3" />
      <Box sx={{ width: '200px', m: 'auto' }}>
        <FormControl fullWidth>
          <InputLabel> Группировать по </InputLabel>
          <Select
            id="select-group"
            value={group}
            label="Группировать по"
            onChange={handleChange}
          >
            <MenuItem value="Отрасль"> Отрасли </MenuItem>
            <MenuItem value="Год"> Году основания </MenuItem>
          </Select>
        </FormControl>
      </Box>
      <GroupChart data={groupData} />
      <GroupGrid data={groupData} />
      <Footer />
    </div>
  );
}

export default Chart;