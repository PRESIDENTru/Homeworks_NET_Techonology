import { Grid } from '@mui/material';
import { tTasks } from "../quizData";
import SortableList from './SortableList';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addList } from './quizSlice';

interface ComponentProps {
    index: number,
    tasks: tTasks;
  }

function Sorting({index, tasks}: ComponentProps) {
    const answers = tasks
        .map(item => item.answer)
        .sort(() => Math.random() - 0.5);
    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(addList({ index, items: answers }));
    }, []);

  return (
    <Grid>
      <Grid size={6}>
        <SortableList index={index} answers={answers}/>
      </Grid>
    </Grid>
  );
}

export default Sorting