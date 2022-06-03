import { useState } from "react";
import './log.css';

function Blogs(){

  const [inputmobile, setmobile] = useState("");
  const [inputDate, setDate] = useState("");
  const [defineLogData,setLogData] = useState(null);
  const [pagination, setPagination] = useState({
    start: 0,
    end: 10
  });
  const [displayPagination,setDisplayPagination]=useState({
    start:1,
    end:10,
    total:0
  });

  const userLog =  (pagination) => {
    fetch("http://192.168.40.170:4003/userlogs", {
      method: 'post',
      body: JSON.stringify({"data_city":"mumbai","mobileInput":inputmobile,"inputDate":inputDate,"pagination":pagination}),
      headers: {'Accept': 'application/json','Content-Type': 'application/json'}
    }).then(res => res.json())
    .then(
        (logData) => {
          if(logData.status===200){
            setLogData(logData.logDetails)
            setDisplayPagination(previousState => {
              return { ...previousState, start: logData.start,end:logData.end,total:logData.totalCount}
            });
          }
        },
      (error) => {
        //console.log(error);
      })
  }

  function reloadNextData(){
    let pageData = {"start":pagination.start+10,"end":10}
    setPagination(previousState => {
      return { ...previousState, start: pageData.start,end:pageData.end }
    });
    userLog(pageData);
  }

  function reloadPreviousData(){
    let pageData = {"start":pagination.start-10,"end":10}
    setPagination(previousState => {
      return { ...previousState, start: pageData.start,end:pageData.end }
    });
    userLog(pageData);
  }

  function formatAMPM(inputdate) {
    var date = new Date(inputdate);
    var getdate = date.getDate()+"-"+date.getMonth()+"-"+date.getFullYear();
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = getdate +" " +hours + ':' + minutes + ' ' + ampm;
    return strTime;
  }

  function resetData(){
    setPagination(previousState => {
      return { ...previousState, start: 0,end:10 }
    });
    setDate('');
    setmobile('');
    document.getElementById('mobile').value='';
    document.getElementById('date').value='';
  }

  function exportData(){
    fetch("http://192.168.40.170:4003/exportData", {
      method: 'post',
      body: JSON.stringify({"data_city":"mumbai","mobileInput":inputmobile,"inputDate":inputDate}),
      headers: {'Accept': 'application/json','Content-Type': 'application/json'}
    }).then(res => res.json())
    .then(
        (logData) => {
          if(logData.status===200){
             exportToCsv('logs.csv', logData.logDetails)
          }
        },
      (error) => {
        //console.log(error);
      })

  }

  function exportToCsv(filename, rows) {
   var csvFile = '';

    let headerArr = ["Name","Mobile","Last Action","Query","DateTime"];
    let row = headerArr.join(",");
    csvFile += row + "\r\n";

    var processRow = function (row) {
      var finalVal = '';
      let coloumCount = row.length;
      for (var j = 0; j < coloumCount; j++) {
        var innerValue = row[j] === null ? '' : row[j].toString();
        if (row[j] instanceof Date) {
          innerValue = row[j].toLocaleString();
        };
        var result = innerValue.replace(/"/g, '""');
        if (result.search(/("|,|\n)/g) >= 0)
          result = '"' + result + '"';
        if (j > 0)
          finalVal += ',';
          finalVal += result;
        }
      return finalVal + '\n';
    };

    let rowCount = rows.length;
    for (var i = 0; i < rowCount; i++) {
      csvFile += processRow(rows[i]);
    }
    var blob = new Blob([csvFile], {type: 'text/csv;charset=utf-8;'});
    if (navigator.msSaveBlob) { // IE 10+
        navigator.msSaveBlob(blob, filename);
    } else {
      var link = document.createElement("a");
      if (link.download !== undefined) { // feature detection
        // Browsers that support HTML5 download attribute
        var url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", filename);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    }
  }

  return (
    <>
     <h1 id='title'>User Logs Data </h1><br></br>
     
     <label>Mobile:</label> <input class="inputbutton" id="mobile" type="mobile"   onChange={(e)=> setmobile(e.target.value)} />&nbsp;&nbsp;&nbsp;
     <label>Date:</label><input class="inputbutton" id="date" type="date"     onChange={(e)=> setDate(e.target.value)} />&nbsp;
     <button class="button" onClick={()=> userLog(pagination)}>Get Data </button>&nbsp;&nbsp;
     <button class="button" onClick={()=> resetData()}>Reset Data </button>&nbsp;&nbsp;
     <button class="button" onClick={()=> exportData()}>Export  Data </button>
     <br></br><br></br>
     {defineLogData!=null ? <>  <table id="log" border="1"><tbody><tr><th>Name</th><th>Mobile</th><th>Last Action</th><th>Query</th><th>DateTime</th></tr>
     {defineLogData.map((logdata) => 
     <tr><td>{logdata.name}</td>
    <td>{logdata.mobile}</td>
     <td>{logdata.last_action}</td>
     <td>{logdata.query_text!='' ? logdata.query_text:'-' }</td>
     <td>{formatAMPM(logdata.entry_date)}</td></tr> ) } 
     </tbody></table> 
     Showing {displayPagination.start} to {displayPagination.end} of {displayPagination.total} entries
     <br></br><br></br>
     <p>{pagination.start >= 10 ? <button class="buttonclass" align="left"  onClick={() => reloadPreviousData()}>Previous</button>:null}&nbsp;&nbsp;
     {defineLogData.length >= 10 ? <button class="buttonclass" align="right"  onClick={() => reloadNextData()}>Next</button>:null}
     </p>
     </>:null}
    </>
  );
}

export default Blogs;
