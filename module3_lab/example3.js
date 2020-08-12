// sub-component representing square buttons that are part of each post
function PostButton(props) {
    var style = {
        width: 24,
        height: 24
    }
    return (
        <button style={style} onClick={() => props.handleClick()}>{props.label}</button>
    )
}

// sub-component representing text areas that are part of each post
function PostText(props) {
    var style = {
        border: "1px solid black",
        width: props.width
    }

    return(
        <div style={style}>{props.text}</div>
    )
}

// sub-component that represents individual post that go in the list of posts
function Post(props) {
    var style = {
        display: "flex"
    }
    
    // for newer versions of react and react-dom, would need to specify 20px, 200px
    return (
        <div style={style}>
            <PostButton label="x" handleClick={props.removeItem}/>
            <PostText text={props.title} width = "200"/>
            <PostButton label="+" handleClick = {props.incrementScore}/>
            <PostText text={props.score} width = "20"/>
            <PostButton label="-" handleClick = {props.decrementScore}/>
        </div>
    )
}

// component that represents entire list of posts
function PostList(props) {
    return (
        <ol>
            {
                props.postList.map((item, index) =>
                    <Post key = {index}
                          title = {item.title}
                          score = {item.score}
                          incrementScore = {() => props.updateScore(index, 1)}
                          decrementScore = {() => props.updateScore(index, -1) }
                          removeItem = {() => props.removeItem(index)}
                    />
                )
            }
        </ol>
    )
}

// App component that holds all other components 
class App extends React.Component {
    constructor(props) {
        super(props)

        // 2 state attributes: input element value and array of post data
        this.state = { value: "", items: [] }

        // functions/handlers that are passed to children need to be bound
        this.handleChange = this.handleChange.bind(this)
        this.updateScore = this.updateScore.bind(this)
        this.removeItem = this.removeItem.bind(this)
    }

    // event handler to handle text input 
    handleChange(event) {
        this.setState({ value: event.target.value })
        console.log(this.state.value)
    }   
    // event handler to add items to state array (submit button)
    addItem() {
        var itemsCopy = this.state.items.slice() //make copy of current array
        var truncatedString = this.state.value.substring(0,20); // truncate string to 20 char
        itemsCopy.push({"title": truncatedString, "score": 0}) // add item to array
        itemsCopy.sort((a,b) =>{
            return b.score - a.score;
        }) // sort copied items in descending order by score
        this.setState({items:itemsCopy,value:""}) // update state, set value back to empty string
    }
    // event handler to update score when + or - buttons pressed
    updateScore(index, val) {
        var itemsCopy = this.state.items.slice() // make copy of current items
        itemsCopy[index].score += val //reference specific index and update score based on val argument
        itemsCopy.sort((a,b) => { return b.score - a.score }) // sort based on score
        this.setState({items: itemsCopy}) // update state
    }
    //event handler to remove posts
    removeItem(index) {
        var itemsCopy = this.state.items.slice() //make copy of current items
        itemsCopy.splice(index, 1); // remove specified index
        itemsCopy.sort((a,b) => { return b.score - a.score }) //sort in descending order
        this.setState({items: itemsCopy}) //update state
    }

    render() {
        return(
            <div>
                <input value = {this.state.value} onChange = {this.handleChange}/>
                <button onClick = {() => this.addItem()}>Submit</button>
                <PostList postList = {this.state.items}
                    updateScore = {this.updateScore}
                    removeItem = {this.removeItem}/>
            </div>
        )
    }
}

ReactDOM.render(
    <App />,
    document.getElementById("root")
)