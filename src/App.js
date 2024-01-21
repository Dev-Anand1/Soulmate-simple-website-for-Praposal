// App.js
import React, { useState, useEffect } from 'react';
import Home from './Home';
import Question from './Question';
import Chart from 'chart.js/auto';
import './App.css';

const allQuestions = [
  "Do you believe in love at first sight?",
  "Have we shared unforgettable moments together?",
  "Do you think we complement each other perfectly?",
  "Would you want to build a home and a life with me?",
  "Can you imagine a future where we grow old together?",
  "Do you feel a deep connection and chemistry between us?",
  "Have we overcome challenges as a couple?",
  "Do you see me as your best friend and life partner?",
  "Can you picture us building a family together?",
  "Have we celebrated each other's successes and joys?",
  "Do you feel complete when we're together?",
  "Have we created a bond that goes beyond words?",
  "Do you believe we bring out the best in each other?",
  "Could you see yourself standing by my side on our wedding day?",
  "Have we laughed and cried together that mean a lot for us?",
  "Do you see us supporting each other's dreams?",
  "Can you imagine a life filled with love, laughter, and adventure with me?",
  "Do you feel a sense of calm and comfort in my presence?",
  "Do you believe we're meant to be together?",
  "Can you see yourself spending forever with me?",
];

const getRandomQuestions = () => {
  const shuffledQuestions = [...allQuestions].sort(() => 0.5 - Math.random());
  return shuffledQuestions.slice(0, 10);
};

function App() {
  const [showHome, setShowHome] = useState(true);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState(0);
  const [chart, setChart] = useState(null);

  useEffect(() => {
    setQuestions(getRandomQuestions());
  }, []);

  const handleStart = () => {
    setShowHome(false);
  };

  const handleAnswer = (answer) => {
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    setAnsweredQuestions((prevCount) => prevCount + 1);
    setAnswers((prevAnswers) => [...prevAnswers, answer]);
  };

  const generateChartData = () => {
    const yesCount = answers.filter((answer) => answer === 'yes').length;
    const noCount = answers.filter((answer) => answer === 'no').length;

    return {
      labels: ['Yes', 'No'],
      datasets: [
        {
          data: [yesCount, noCount],
          backgroundColor: ['#ff66b2', '#FF0000'], // Use your desired gradient colors
        },
      ],
    };
  };

  useEffect(() => {
    if (chart) {
      chart.destroy();
    }
    const ctx = document.getElementById('pie-chart');
    if (ctx) {
      const newChart = new Chart(ctx, {
        type: 'pie',
        data: generateChartData(),
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false,
            },
          },
        },
      });
      setChart(newChart);
    }
  }, [answers]);

  return (
    <div>
      {showHome ? (
        <Home onClick={handleStart} />
      ) : currentQuestionIndex < questions.length ? (
        <Question
          question={`${currentQuestionIndex + 1}. ${questions[currentQuestionIndex]}`}
          onYes={() => handleAnswer('yes')}
          onNo={() => handleAnswer('no')}
        />
      ) : (
        <div className="result-container">
          <h2 className="result-message">"Maybe, it will help if we find answers about our future together."</h2>
          
          {answeredQuestions > 0 && (
            <div className="chart-container">
              <canvas id="pie-chart" className="love-chart" />
            </div>
          )}

          {answeredQuestions >= 7 && answers.filter(answer => answer === 'yes').length >= 7 && (
            <p className="custom-message">
              "Hey Love, Just wanted to tell you - I love you. How about you?"
            </p>
          )}

          <button className="restart-btn" onClick={() => window.location.reload()}>
            Restart
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
