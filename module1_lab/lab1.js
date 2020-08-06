function Heading(props) {
    return(
      <h2>{props.title}</h2>
    )
  }
  
function Title(props) {
  return(
    <div>
      <Heading title={props.title}/>
      <p>{props.description}</p>
    </div>
  )
}

function Checkbox(props) {
  return(
    <div>
      <Heading title = {props.title}/>
      <div>
        {props.label} 
        <input type="checkbox" id={props.id} name={props.name} value={props.value}/>
        </div>
    </div>
  )
}

function MenuOption(props) {
  return <option value={props.value}>{props.value}</option>
}

function Options(props) {
  let options = [];
  for (const x of props.options) {
    options.push(<MenuOption value={x}/>);
  }
  
  return(
    <div>
      <p></p>
      {props.label}
      <select>
        {options}
      </select>
    </div>
  )
}

function TableHeader(props) {
  let headings = [];
  for (const x of props.headings) {
      headings.push(<th>{x}</th>)
  }
  
  return(
      <tr>{headings}</tr>
  )
}

function TableValues(props) {
  let values = [];
  for (const x of props.values) {
      values.push(<td>{x}</td>)
  }  
  return(
      <tr>
        {values}
        <td><button>Buy Now</button></td>
      </tr>
  )
}

function Table(props) {
  return(
    <ul>
      <table>
        <TableHeader headings={props.headings}/>
        <TableValues values={props.values}/>
      </table>
    </ul>
  )
}

function Transportation(props) {
  let t_heading = ["Year", "Model", "Price", "Buy"];
  return (
      <div>
          <Title title="Welcome to React Transportation" description="The best place to buy vehicles online"/>
          <Checkbox title="Choose Options" label="New Only" id="coding" name="interest" value="coding"/>
          <Options label="Select Type" options={["All","Cars", "Trucks", "Convertibles"]}/>
      
      
          <div>
              <Heading title="Cars"/>
              <Table headings={t_heading} values={["2013","A","$32000"]}/>
              <Table headings={t_heading} values={["2011","B","$4400"]}/>
              <Table headings={t_heading} values={["2016","B","$15500"]}/>
              
              <Heading title="Trucks"/>
              <Table headings={t_heading} values={["2014","D","$18000"]}/>
              <Table headings={t_heading} values={["2013","E","$5200"]}/>

              <Heading title="Convertibles"/>
              <Table headings={t_heading} values={["2009","F","$2000"]}/>
              <Table headings={t_heading} values={["2010","G","$6000"]}/>
              <Table headings={t_heading} values={["2012","H","$12500"]}/>
              <Table headings={t_heading} values={["2017","MB","$50000"]}/>
          </div>
      </div>
  )
  
}
            
  
ReactDOM.render(
    <Transportation/>,
    document.getElementById("root")
)
              
  