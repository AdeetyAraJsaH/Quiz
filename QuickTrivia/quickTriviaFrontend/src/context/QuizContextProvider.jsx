import React, { useContext, useState } from 'react'
import UserContext, { QuizContext } from './context';
import axios from 'axios';

function QuizContextProvider({ children }) {
  const [questions, setQuestions] = useState([]);
  const [quizID, setQuizID] = useState('');
  const [hidden, setHidden] = useState(false);
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [categoryName, setCategoryName] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const { isLogin } = useContext(UserContext)
  const fetchData = async () => {
    try {
      const response = !isLogin ? await axios.get('/api/questions') : await axios.post('/user/auth/questions', { amount, category, difficulty });
      console.log(response.data);
      setQuizID(response.data.quizID)
      setHidden(!hidden);
      setQuestions([...response.data.questions])
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <QuizContext.Provider value={{ questions, setQuestions, quizID, hidden, setHidden, setAmount, setCategory, setDifficulty, amount, category, difficulty, fetchData, categoryName, setCategoryName }}>
      {children}
    </QuizContext.Provider>
  )
}

export default QuizContextProvider