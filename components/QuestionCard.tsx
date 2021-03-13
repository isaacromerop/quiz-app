import React from "react";
import { AnswerObject } from "../pages/index";

import { Wrapper, ButtonWrapper } from "./questionCard.styles";

type Props = {
  question: string;
  answers: string[];
  callback: (e: React.MouseEvent<HTMLButtonElement>) => void; //have to be modified later on
  userAnswer: AnswerObject | undefined; //have to be modified later on
  questionNo: number;
  totalQuestions: number;
};

const QuestionCard: React.FC<Props> = ({
  question,
  answers,
  callback,
  userAnswer,
  questionNo,
  totalQuestions,
}) => {
  return (
    <Wrapper>
      <p className="number">
        Question {questionNo} / {totalQuestions}
      </p>
      <p dangerouslySetInnerHTML={{ __html: question }} />
      <div>
        {answers.map((answer) => (
          <ButtonWrapper
            correct={userAnswer?.correctAnswer === answer}
            userClicked={userAnswer?.answer === answer}
            key={answer}
          >
            <button disabled={!!userAnswer} value={answer} onClick={callback}>
              <span dangerouslySetInnerHTML={{ __html: answer }} />
            </button>
          </ButtonWrapper>
        ))}
      </div>
    </Wrapper>
  );
};

export default QuestionCard;
