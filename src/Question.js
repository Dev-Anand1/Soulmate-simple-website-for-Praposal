// Question.js

import React from 'react';

const Question = ({ question, onYes, onNo }) => {
  return (
    <div className="question-container">
      <h2>{question}</h2>
      <div className="button-container">
        <button className="btn btn-primary" onClick={onYes}>
          Yes
        </button>
        <button className="btn btn-danger" onClick={onNo}>
          No
        </button>
      </div>
    </div>
  );
};

export default Question;
