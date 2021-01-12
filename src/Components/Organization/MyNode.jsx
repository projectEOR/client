import React from "react";
import PropTypes from "prop-types";
import "./my-node.css";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

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
    const classes = useStyles();
  console.log(nodeData)  
  const selectNode = () => {
    alert("Hi All. I'm " + nodeData.first_name + ". I'm a " + nodeData.rank_id + ".");
  };

  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <Typography variant="h5" component="h2">
          {nodeData.first_name} {nodeData.last_name}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          Test
        </Typography>
        <Typography variant="body2" component="p">
          {nodeData.email}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Profile</Button>
      </CardActions>
    </Card>
  );
};

MyNode.propTypes = propTypes;

export default MyNode;