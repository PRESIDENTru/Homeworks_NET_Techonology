import { Box, Button, Container, Typography } from '@mui/material';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { quiz } from "../quizData";
import { RootState } from '../../store';
import Matching from './Matching';
import Sorting from './Sorting';
import Choice from './Chioce';

function Quiz() {
  const [results, setResults] = useState<string[] | null>(null);
  const lists = useSelector((state: RootState) => state.lists.lists);

  const handleCheck = () => {
    const res = quiz.map((item, index) => {
      const userOrder = lists[index] || [];

      if (item.type === "C") {
        const correctAnswers = item.tasks
          .filter((task) => task.answer === "true")
          .map((task) => task.question);

        const isFullyCorrect =
          userOrder.length === correctAnswers.length &&
          correctAnswers.every((answer) => userOrder.includes(answer));

        if (isFullyCorrect) {
          return `Задание ${index + 1}. Все ответы верные.`;
        }

        const correctlySelected = userOrder.filter((answer) =>
          correctAnswers.includes(answer)
        ).length;
        return `Задание ${index + 1}. Верных ответов: ${correctlySelected} из ${correctAnswers.length}. Неверных: ${userOrder.length-correctlySelected}`;
      }

      let correct = 0;
      const total = item.tasks.length;
      item.tasks.forEach((task, i) => {
        if (userOrder[i] === task.answer) correct += 1;
      });

      return correct === total
        ? `Задание ${index + 1}. Все ответы верные.`
        : `Задание ${index + 1}. Верных ответов: ${correct} из ${total}.`;
    });

    setResults(res);
  };

  const handleRestart = () => {
    setResults(null);
  };

  return (
    <Container maxWidth="md">
      {quiz.map((item, index) => (
        <Box key={item.id} component="section" sx={{ m: 2, p: 2 }}>
          <Typography variant="h5" gutterBottom>
            {index + 1}. {item.title}
          </Typography>

          {item.type === "M" && <Matching index={index} tasks={item.tasks} />}
          {item.type === "S" && <Sorting index={index} tasks={item.tasks} />}
          {item.type === "C" && <Choice index={index} tasks={item.tasks} />}
        </Box>
      ))}
      
      <Box sx={{ display: 'flex', justifyContent: 'space-around', mt: 3 }}>
        <Button variant="contained" onClick={handleCheck}>
          Проверить
        </Button>
        <Button variant="contained" onClick={handleRestart}>
          Начать снова
        </Button>
      </Box>

      {results && (
        <Box sx={{ mt: 3, textAlign: 'center' }}>
          <Typography variant="h4" gutterBottom>
            Результаты теста
          </Typography>
          {results.map((line, i) => (
            <Typography key={i} variant="body1" sx={{ mt: 1 }}>
              {line}
            </Typography>
          ))}
        </Box>
      )}
    </Container>
  );
}

export default Quiz;