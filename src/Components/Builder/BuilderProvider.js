// import React from 'react' 
// import {useState} from 'react'

// export const BuilderContext = React.createContext({
//     reportsList: [],
//     activeReport: {},
//     setReportList: ()=>{},
//     setActiveReport: () =>{},
// })

// export default class BuilderProvider extends React.Component{
//     const [reportsList, setReportsList] = useState([]);
//     const [activeReport, setActiveReport] = useState({});

//     render(){
//         return (
//         <BuilderContext.Provider value={{
//             reportsList: reportsList,
//             activeReport: activeReport,
//             setReportList: this.setReportsList.bind(),
//             setActiveReport: this.setActiveReport.bind(),
//         }}>
//             {this.props.children}
//         </BuilderContext.Provider>
//     )
//     }
    

// }
