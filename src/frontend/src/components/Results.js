import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Question from './Question';
import Answer from './Answer';
import './../css/source/Quiz.css';

class Results extends Component {

    parseResults() {
        const results = this.props.results;

        return results.map( r => ({
            question: r.question,
            correctAnswer: r.correctAnswer,
            wrongAnswer: ( r.selectedAnswer.ID === r.correctAnswer.ID) ?
                null : r.selectedAnswer
            })
        )
    }

    getResultsHTML() {
        const data = this.parseResults();
        return data.map( (d, index) => {
                return (
                    <div className="results" key={d.question.ID}>
                        <Question
                            number={d.question.ID + 1}
                            text={d.question.question}
                        />
                        { d.wrongAnswer !== null &&
                            <Answer key={index + '-' + d.wrongAnswer.ID}
                                aID={index + '-' + d.wrongAnswer.ID}
                                letter={d.wrongAnswer.ID}
                                className="wrong-answer"
                                value={d.wrongAnswer.value}
                                name={index + '-choices'}
                                onSelectAnswer={function() {}}
                                checked={true}
                                text={d.wrongAnswer.answer}
                            />
                        }
                        <Answer key={index + '-' + d.correctAnswer.ID}
                                aID={index + '-' + d.correctAnswer.ID}
                                letter={d.correctAnswer.ID}
                                className="correct-answer"
                                value={d.correctAnswer.value}
                                name={index + '-choices'}
                                onSelectAnswer={function() {}}
                                checked={d.wrongAnswer === null}
                                text={d.correctAnswer.answer}
                            />
                    </div>
                )
        })
    }

    render(){
      return(
          <div>
              {this.getResultsHTML()}
          </div>
      )
    }

}

Results.propTypes = {
   results: PropTypes.array,
    questions: PropTypes.array
};

export default Results;