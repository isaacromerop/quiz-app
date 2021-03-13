import React, { useState } from "react";
import Head from "next/head";

import QuestionCard from "../components/QuestionCard";
import { fetchQuizQuestions, Difficulty, QuestionState } from "../api";

import { GlobalStyle, Wrapper } from "./index.styles";

const TOTAL_QUESTIONS: number = 10;

export type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
};

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);

  const startTrivia = async () => {
    setLoading(true);
    setGameOver(false);
    const newQuestions = await fetchQuizQuestions(
      TOTAL_QUESTIONS,
      Difficulty.EASY
    );
    setQuestions(newQuestions);
    setScore(0);
    setUserAnswers([]);
    setNumber(0);
    setLoading(false);
  };
  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!gameOver) {
      //User's answer
      const answer = e.currentTarget.value;
      //Check if answer is correct
      const correct = questions[number].correct_answer === answer;
      //Update score if answer is correct
      if (correct) setScore((prev) => prev + 1);
      //Save answer in answer's array
      const answerObject = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer,
      };
      setUserAnswers((prev) => [...prev, answerObject]);
    }
  };
  const nextQuestion = () => {
    //Move on to the next question if is not the last question
    const nextQuestion = number + 1;
    if (nextQuestion === TOTAL_QUESTIONS) {
      setGameOver(true);
    } else {
      setNumber(nextQuestion);
    }
  };
  return (
    <>
      <GlobalStyle />
      <div>
        <Head>
          <title>Create Next App</title>
          <link rel="icon" href="/favicon.ico" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Catamaran:wght@700&family=Fascinate+Inline&display=swap"
          />
        </Head>

        <Wrapper className="app">
          <h1>Quiz App</h1>
          {gameOver || userAnswers.length === TOTAL_QUESTIONS ? (
            <button className="start" onClick={startTrivia}>
              Start now
            </button>
          ) : null}
          {!gameOver ? <p className="score">Score:{score}</p> : null}
          {loading && <p>Loading Questions...</p>}
          {!loading && !gameOver && (
            <QuestionCard
              questionNo={number + 1}
              totalQuestions={TOTAL_QUESTIONS}
              question={questions[number].question}
              answers={questions[number].answers}
              userAnswer={userAnswers ? userAnswers[number] : undefined}
              callback={checkAnswer}
            />
          )}
          {!gameOver &&
          !loading &&
          userAnswers.length === number + 1 &&
          number !== TOTAL_QUESTIONS - 1 ? (
            <button className="next" onClick={nextQuestion}>
              Next question
            </button>
          ) : null}
        </Wrapper>
      </div>
    </>
  );
}
