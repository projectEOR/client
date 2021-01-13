import {createMuiTheme} from '@material-ui/core/styles'



export default createMuiTheme({
    typography:{
        tab:{
            fontSize: "1.2rem",
            minWidth: 15,
            marginLeft: "25px"
        }
    },
    palette: {
        primary: {
            main: '#263238'
        },
        type: "dark"
    }

})