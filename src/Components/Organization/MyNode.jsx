import React from "react";
import PropTypes from "prop-types";
import "./my-node.css";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {Link} from 'react-router-dom'
import {Avatar, CardMedia} from '@material-ui/core'
import {Grid} from '@material-ui/core'
const useStyles = makeStyles({
    root: {
      minWidth: 275,
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
  });

const propTypes = {
  nodeData: PropTypes.object.isRequired
};

const MyNode = ({ nodeData }) => {
  var closeout = new Date(nodeData.closeout)
  var today = new Date()
  var color =""
  if(Math.round((closeout-today)/ 8.64e7)> 60){
    color='green'
  }else if(Math.round((closeout-today)/ 8.64e7)> 30){
    color='yellow'
  }else {
    color='red'
  }
    const classes = useStyles();
  const selectNode = () => {
    alert("Hi All. I'm " + nodeData.first_name + ". I'm a " + nodeData.rank_id + ".");
  };
  var rank=nodeData.rank_id.toString();
  console.log(`./ranks/${rank}.png`)
  return (
    <Card className={classes.root} variant="outlined" >
      <CardMedia style={{ justifyContent: "center", display: "flex" }} ><Grid alignItems="center" justify="center"><Avatar src={`./ranks/${rank}.png`} style={{ justifyContent: "center", display: "flex" }}/></Grid></CardMedia>
      <CardContent>
        <Typography variant="h5" component="h2">
          {nodeData.first_name} {nodeData.last_name}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          O-{nodeData.rank_id}
        </Typography>
        <Typography variant="body2" component="p">
          {nodeData.email}
        </Typography>
      </CardContent>
      <CardActions>
        <Button component={Link} to={`/profile/${nodeData.id}`} size="small">Profile</Button><Typography style={{'background-color':color}}>Closeout:{closeout.toLocaleDateString('en-US')}</Typography>
      </CardActions>

    </Card>
  );
};

MyNode.propTypes = propTypes;

export default MyNode;