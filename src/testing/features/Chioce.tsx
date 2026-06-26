import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText, Checkbox, Radio } from '@mui/material';
import { tTasks } from "../quizData";
import { addList, setDraggedItems } from './quizSlice';
import { RootState } from '../../store';

interface ComponentProps {
    index: number,
    tasks: tTasks;
  }

function Choice({index, tasks}: ComponentProps) {
    const dispatch = useDispatch();
    const selected = useSelector((state: RootState) => state.lists.lists[index]) || [];

    const correctAnswers = tasks
        .filter(task => task.answer === "true")
        .map(task => task.question);
    const multiple = correctAnswers.length > 1;
    useEffect(() => {
      dispatch(addList({ index, items: [] }));
    }, []);

    const handleToggle = (option: string) => {
      const isSelected = selected.includes(option);
      let updated: string[];

      if (multiple) {
        updated = isSelected
          ? selected.filter((a) => a !== option)
          : [...selected, option];
      } else {
        updated = isSelected ? [] : [option];
      }

      dispatch(setDraggedItems({ index, items: updated }));
    };

  return (
    <List>
      {tasks.map((task, i) => {
        const isChecked = selected.includes(task.question);
        return (
          <ListItem key={i} disablePadding sx={{ mb: 1 }}>
            <ListItemButton
              onClick={() => handleToggle(task.question)}
              sx={{
                border: '1px solid gray',
                borderRadius: '5px',
              }}
            >
              <ListItemIcon>
                {multiple
                  ? <Checkbox edge="start" checked={isChecked} tabIndex={-1} disableRipple />
                  : <Radio edge="start" checked={isChecked} tabIndex={-1} disableRipple />}
              </ListItemIcon>
              <ListItemText primary={task.question} />
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  );
}

export default Choice