// sub-component table row
function TableRow(props) {
    return(
        <tr>
            <td><button onClick = {props.removeSubmission}>X</button></td>
            <td>{props.info[0]}</td>
            <td>{props.info[1]}</td>
            <td>{props.info[2]}</td>
            <td>{props.info[3]}</td>
        </tr>
    )
}

// component table containing header + rows
function FullTable(props) {
    var style = {
        "text-align": "center",
        width: "500px"
    }
    var rows = []

    props.submissions.map((item, index) =>
        rows.push(<TableRow info = {item} removeSubmission = {() => props.removeSubmission(index)}/>)
    )

    return(
        <table style = {style}>
            <tr>
                <th>Remove</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Activity</th>
                <th>Restrictions</th>
            </tr>
            {rows}
        </table>
    )
}

// App component containing everything
class App extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            firstName: "",
            lastName: "",
            activity: "Science Lab",
            submissions: [],
            optionList: ["Science Lab", "Swimming", "Cooking", "Painting"],
            checkboxList: ["Dietary Restrictions", "Physical Disabilities", "Medical Needs"],
            restrictionChecked: [0,0,0]
        }

        // bind
        this.handleChange = this.handleChange.bind(this)
        this.handleCheckbox = this.handleCheckbox.bind(this)
        this.addSubmission = this.addSubmission.bind(this)
        this.removeSubmission = this.removeSubmission.bind(this)
    }

    // handle text inputs and select option 
    handleChange(event) {
        this.setState({[event.target.name]: event.target.value})
    }

    // handle checkbox input
    handleCheckbox(index) {
        var copy = this.state.restrictionChecked.slice() // make copy of current 
        copy[index] = copy[index] == 1 ? 0 : 1 // switch
        this.setState({restrictionChecked: copy}) //update state
    }

    // handle submit button, add submission to table 
    addSubmission() {
        var restrictions = (this.state.restrictionChecked[0] ? "a" : "") + (this.state.restrictionChecked[1] ? "b" : "") + (this.state.restrictionChecked[2] ? "c" : "")

        var newSubmission = [
            this.state.firstName,
            this.state.lastName, 
            this.state.activity,
            restrictions
        ]

        var copy = this.state.submissions.slice()
        copy.push(newSubmission)
        this.setState({
            firstName: "",
            lastName: "",
            restrictionChecked: [0,0,0],
            activity: "Science Lab",
            submissions: copy
        })
    }

    // handle remove button, remove submission
    removeSubmission(index) {
        var copy = this.state.submissions.slice()
        copy.splice(index, 1)
        this.setState({submissions: copy})
    }

    render() {
        var sample_submissions = [
            ["john", "smith", "science", "abc"],
            ["jane", "doe", "painting", "a"]
        ]

        var divStyle = {
            display: "flex",
            "flex-direction": "column",
        }
    
        var buttonStyle = {
            width: "150px",
            padding: "2px"
        }
    
        var options = []
        this.state.optionList.map((item) => 
            options.push(<option value={item}>{item}</option>)
        )
    
        var checkboxes = []
        this.state.checkboxList.map((item, index) => 
            checkboxes.push(
                <label>
                    <input type= "checkbox" id={item} name={item} value={item} checked = {this.state.restrictionChecked[index]} onChange = {() => this.handleCheckbox(index)}/>
                    {String.fromCharCode(97 + index)}) {item}
                    <br/>
                </label>
            )
        )

        return(
            <div>
                <div style = {divStyle}>
                    <label>
                        First Name<br/> 
                        <input type="text" name = "firstName" value = {this.state.firstName} style = {buttonStyle} onChange = {this.handleChange} /> 
                    </label>
                    <label>
                        Last Name<br/> 
                        <input type="text" name = "lastName" value = {this.state.lastName} style = {buttonStyle} onChange = {this.handleChange}/> 
                    </label>
                    <label>
                        Select Activity<br/> 
                        <select name="activity" style = {buttonStyle} onChange = {this.handleChange}>
                            {options}
                        </select>
                    </label>
                    <label>
                        Check all that apply:<br/>
                        {checkboxes}
                    </label>
                    <button style = {buttonStyle} onClick={this.addSubmission}>Submit</button>
                </div>
                <FullTable submissions = {this.state.submissions} removeSubmission = {this.removeSubmission}/>
            </div>
        )
    }
}

ReactDOM.render(
    <App/>,
    document.getElementById("root")
)
