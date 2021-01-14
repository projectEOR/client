import './Report.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));


function Report(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const renderReport = (report) => {
    const unit = props.unit ? props.unit.name : '';
    const reportEnd = props.report ? props.report.period_end.slice(0,4) : '';
    const reportId = props.report ? props.report.id : '';
    const reportBullets = props.report ? props.report.bullets : [];
    const rater = props.rater ? `${props.raterRank.symbol} ${props.rater.first_name} ${props.rater.last_name}` : '';
    //if (active) {
      return (
        <>
          <Card className={classes.root}>
      <CardHeader
        action={
          <IconButton aria-label="settings">
            {props.current ? (<Link to={`/builder/report/${reportId}`}>
              <Button >Edit</Button>
            </Link>) : null}
          </IconButton>
        }
        title={`${reportEnd} - ${unit}`}
        subheader={`Rater: ${rater}`}
      />
      <CardActions disableSpacing>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography variant='h5' component='h5'>Bullets</Typography>
          {reportBullets.map(bullet => <Typography paragraph>{bullet.content}</Typography>)}
        </CardContent>
      </Collapse>
    </Card>
        </>
      )
  }

   return (
    <div className="report">
      {renderReport(props.report)}
    </ div>
  );
}

export default Report;
