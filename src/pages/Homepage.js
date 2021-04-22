import React,{ useEffect, useState, Fragment } from 'react'
import Tabletop from "tabletop";
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import styled from 'styled-components';
import { MultiSelect } from '@progress/kendo-react-dropdowns';

const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  }))(TableCell);
  
  const StyledTableRow = withStyles((theme) => ({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
    },
  }))(TableRow);

  const DropDownContainer = styled("div")`
  width: 10.5em;
  margin: 0 auto;
`;

const DropDownHeader = styled("div")`
  margin-bottom: 0.8em;
  padding: 0.4em 2em 0.4em 1em;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.15);
  font-weight: 500;
  font-size: 1.3rem;
  color: #3faffa;
  background: #ffffff;
`;

const DropDownListContainer = styled("div")``;

const DropDownList = styled("ul")`
  padding: 0;
  margin: 0;
  padding-left: 1em;
  background: #ffffff;
  border: 2px solid #e5e5e5;
  box-sizing: border-box;
  color: #3faffa;
  font-size: 1.3rem;
  font-weight: 500;
  &:first-child {
    padding-top: 0.8em;
  }
`;

const ListItem = styled("li")`
  list-style: none;
  margin-bottom: 0.8em;
`;

  

  const useStyles = makeStyles({
    table: {
      minWidth: 700,
    },
  });



  const states_data = [ "Gujarat", "Maharashtra", "Pan India", "Chhattisgarh", "Madhya Pradesh", "Table Tennis", "Tennis", "Volleyball" ];
  const status = ["Verified","Not Verified"]
  




export default function Outsource(){

    const [data, setData] = useState([]);
    const [states, setStates] = useState("");
    const classes = useStyles();
    const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [filterData,setFilterData]= useState({
      "state":"",
      "status":"",

  })
  const [newData,setNewData]=useState([]);

  const toggling = () => setIsOpen(!isOpen);

  const onOptionClicked = (value,type) => () => {
    let temp_data =filterData 
    if(type =="state"){
        temp_data.state = value;
    }
    if(type =="status"){
        temp_data.status = value;
    }


    setFilterData(temp_data);
    console.log("Filter_data =>",temp_data)
    setIsOpen(false);
    // console.log(selectedOption);
  };
    

  useEffect(() => {
    Tabletop.init({
      key: "1RT_UgMikoSwWNzo2FNwb3yb8ZP5TAP_h0eRmQ4TfxR8",
      simpleSheet: true
    })
      .then((data) =>{ 
          console.log("data successfully obtained =>")
          setData(data)
          console.log(data)

    
    })
      .catch((err) => {
          
        console.warn("Got Error => ",err)});
  }, []);


  const onFilterAllData = () => {
      let temp_data = data;
      if(filterData.state!=""){

        temp_data = data.filter(i => {
        //    console.log( i.State == filterData.state , i);
           return i.State == filterData.state 
        } )
      }
      if(filterData.state!=""){

        temp_data = temp_data.filter(i => {
        //    console.log( i.State == filterData.state , i);
           return i.Status == filterData.status
        } )
      }
     
        setNewData(temp_data);

        console.log("new data data is here =>" ,temp_data)
  
  
    }



  




    return (
        <div>
           
        <h1>data from google sheets</h1>

        <DropDownContainer>
            Select State
        <DropDownHeader onClick={toggling}>
          {filterData.state || ""}
        </DropDownHeader>
        {isOpen && (
          <DropDownListContainer>
            <DropDownList>
              {states_data.map(option => (
                <ListItem onClick={onOptionClicked(option,"state")} key={Math.random()}>
                  {option}
                </ListItem>
              ))}
            </DropDownList>
          </DropDownListContainer>
        )}
      </DropDownContainer>
      <DropDownContainer>
            Select Status
        <DropDownHeader onClick={toggling}>
          {filterData.status || ""}
        </DropDownHeader>
        {isOpen && (
          <DropDownListContainer>
            <DropDownList>
              {status.map(option => (
                <ListItem onClick={onOptionClicked(option,"status")} key={Math.random()}>
                  {option}
                </ListItem>
              ))}
            </DropDownList>
          </DropDownListContainer>
        )}
      </DropDownContainer>



      <button type="button" className="btn btn-info" onClick={onFilterAllData}>Filter</button>

        <TableContainer component={Paper}>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Status</TableCell>
            <TableCell align="right">TypeofHelp</TableCell>
            <TableCell align="right">State</TableCell>
            <TableCell align="right">Currently Available</TableCell>
            <TableCell align="right">Area City</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {newData.map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.Status}
              </TableCell>
              <TableCell align="right">{row.TypeofHelp}</TableCell>
              <TableCell align="right">{row.State}</TableCell>
              <TableCell align="right">{row.CurrentlyAvailable}</TableCell>
              <TableCell align="right">{row.Area_City}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

        </div>
    

    )
   
}

