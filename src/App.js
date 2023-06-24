import axios from "axios"
import './App.css';
import useFetchData from "./data";
import { Line } from 'react-chartjs-2'
import LineChart from "./components/LineChart";
import { Chart as ChartJS } from "chart.js/auto"
import { useState, useEffect } from "react";
import PacmanLoader from "react-spinners/PacmanLoader";

function App() {
  let l
  let ldata
  const kdata = useFetchData("TITAN","PCJEWELLER","TATAMOTORS")
  if (kdata) {
    l = kdata['edata']
  }
  // 'rgb(230, 0, 0)','rgb(255, 163, 26)'   'rgb(230, 0, 0, 0.5)','rgb(255, 163, 26, 0.5)'
  const bgborder = ['rgb(0, 51, 0)', 'rgb(255, 99, 132)', 'rgb(0, 51, 102)', 'rgb(230, 0, 0)']
  const bgcolor = ['rgb(0, 51, 0, 0.5)', 'rgb(255, 99, 132, 0.5)', 'rgb(0, 51, 102, 0.5)', 'rgb(230, 0, 0, 0.5)']
  let count = 0
  let ky = null
  const datasetlist = []
  if (l) {
    for (let endpoint of l) {
      let obj = endpoint['data']['Time Series (Daily)']
      var mat = {}
      //input from user---------------
      let nar = { '01': '12', '02': '14' }  //{ startmonth :startdd , endmonth:enddd}
      let years=[2005,2022]                 //start and end year
      //----------------------------

      const ar = Object.keys(nar).reverse()
      //generating keys i.e starting and ending dates for each year
      for (let x = years[0]; x < years[1]; x++) {
        mat[x] = [0, 0]
        for (let y = 0; y < 2; y++) {
          for (let z = 0; z < 6; z++) {
            let no = parseInt(nar[ar[0]])
            no = no + z
            if (no < 10) {
              no = '0' + no
            }
            let s = x + '-' + ar[y] + '-' + no
            // console.log(s) check dates
            let val = obj[s]
            if (val != null) {
              //  console.log(s,val)  // check only one data coming in interval(1,5) from each month
              mat[x][y] = val["4. close"]
              break
            }
          }
        }
      }
      //finding percent from start close and end close amount
      ky = Object.keys(mat)
      const len = ky.length
      let pr = []
      for (let i = 0; i < len; i++) {
        let sub = mat[ky[i]][1] - mat[ky[i]][0]
        //  console.log(ky[i],((sub*100)/mat[ky[i]][0]).toFixed(1))
        pr.push(((sub * 100) / mat[ky[i]][0]).toFixed(1))
      }

      // input graph data
      const labels = endpoint['data']['Meta Data']['2. Symbol']
      const datasetobj = {
        label: labels,
        data: pr,
        borderColor: bgborder[count],
        backgroundColor: bgcolor[count]
      }
      datasetlist.push(datasetobj)
      count += 1

    }
  }
  //final data for graph
  if (ky) {
    ldata = {
      labels: ky,
      datasets: datasetlist
    }
  }

  if (kdata) {
    return (

      <div className="main-container" >
       
        <h1 style={{fontSize:"46px", marginBottom:"10px"}}> Stock in view</h1>
        {
          ["TITAN","PCJEWELLER","TATAMOTORS"].map((item)=>(
            <span> {item} &nbsp; </span>
          ))
        }
        <LineChart ldata={ldata}></LineChart>
      </div>
    )
  }
  
  //loading return
  else {
    return (<div id='pac' >
    <section><PacmanLoader color="#faea55" />
    </section>
    </div>)

  }

}
export default App;
