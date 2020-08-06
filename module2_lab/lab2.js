// Question Component 
function Question(props) {
  var style = {
    color: "red",
  }  

  return(
    <h2 style = {style}>{props.question}</h2>
  )
}

// Answer Buttons Component 
function Answers(props) {
  var divStyle = {
    display: "flex",
    "flex-direction": "column",
    "align-items": "center",
    marginRight: "50px",
  }
  var buttonStyle = {
    width: "400px",
    padding: "5px",
  }
  var buttons = [];

  for (const i in props.choice) {
    buttons.push(
      <button style = {buttonStyle}
        onClick = {() => props.handleAnswerClick(props.correctness[i])}
      >
        {props.choice[i]}
      </button>
    )
  }

  return(
    <div style = {divStyle}>
      {buttons}
    </div>
  )
}

function QASection(props) {
  var style = {
    display: "flex",
    "flex-direction": "column",
    "justify-content": "space-between",
    "align-items": "center"
  }

  var bottomStyle = {
    marginTop: "20px",
    "align-self": "flex-start"
  }

  return (
    <div style = {style}>
      <Question question = {props.q_a.question} />
      <Answers choice = {props.q_a.answers} correctness = {props.q_a.correctness} handleAnswerClick={props.handleAnswerClick}/>
      
      <div style = {bottomStyle}>
        <p>Question {props.current} out of {props.total}</p>
        <button onClick = {() => props.reset()}>Reset</button>
      </div>

    </div>
  )
}

// Results
function Results(props) {
  var style = {
    display: "flex",
    "flex-direction": "column",
    "justify-content" : "space-around",
    "align-items": "center"
  }; 

  return(
    <div style = {style}>
      <h3>Correct: {props.correct} </h3>
      <h3>Incorrect: {props.incorrect}</h3>
    </div>
  )
}

// Quiz App
class Quiz extends React.Component {
  constructor(props) {
    super(props);

    var questionAnswers = [
      {
        question: "What is 8 x 1?",
        answers: ["5", "6", "7", "8"],
        correctness: [0, 0, 0, 1]
      },
      {
        question: "What is 8 x 2?",
        answers: ["13", "16", "18", "20"],
        correctness: [0, 1, 0, 0]
      },
      {
        question: "What is 8 x 3?",
        answers: ["22", "24", "26", "28"],
        correctness: [0, 1, 0, 0]
      }
    ];

    this.state = {
      questionAnswers: questionAnswers,
      currentQuestion: 0,
      correctAnswers: 0,
      incorrectAnswers: 0,
      gameOver: 0
    }

    this.handleAnswerClick = this.handleAnswerClick.bind(this);
    this.reset = this.reset.bind(this);
  }

  handleAnswerClick(correct) {
    // ignore if all questions asked
    console.log("clicked")
    if (this.state.gameOver) {
      return
    }
    // update correct/incorrect displays
    this.setState((state, props) => ( correct ? 
      {correctAnswers: state.correctAnswers + 1} : 
      {incorrectAnswers: state.incorrectAnswers + 1}), 
      
      () => {
        if (this.state.currentQuestion + 1 == this.state.questionAnswers.length) {
          this.setState({gameOver: 1})
          console.log("over")
        } else {
          this.setState((state, props) => ({currentQuestion: state.currentQuestion + 1}))
        }
      }
    );
  }

  reset() {
    this.setState({
      currentQuestion: 0,
      correctAnswers: 0,
      incorrectAnswers: 0,
      gameOver: 0
    })
  }

  render() {
    var style = {
      display: "flex", 
      "justify-content": "center",
      "align-items": "center"
    }
    return(
      <div style = {style}>
        <QASection q_a = {this.state.questionAnswers[this.state.currentQuestion]} current = {this.state.currentQuestion + 1} total = {this.state.questionAnswers.length} handleAnswerClick={this.handleAnswerClick} reset={this.reset}/>
        <Results correct = {this.state.correctAnswers} incorrect = {this.state.incorrectAnswers}/>
      </div>
    )
  }
}
  
ReactDOM.render(
    <Quiz/>,
    document.getElementById("root")
)