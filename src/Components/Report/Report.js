import './Report.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';

function Report(props) {

  const [active, setActive] = useState(false);

  const handleClick = (e) => {
    if (active) {
      setActive(false);
    } else {
      setActive(true);
    }
  }

  const renderReport = (report) => {
    const unit = props.unit ? props.unit.name : '';
    const reportStart = props.report ? props.report.period_start : '';
    const reportEnd = props.report ? props.report.period_end : '';
    const reportId = props.report ? props.report.id : '';
    const reportBullets = props.report ? props.report.bullets : [];
    if (active) {
      return (
        <>
          {props.current ? <Link to={`/builder/report/${reportId}`}>edit</Link> : null}
          <p>{reportStart}</p>
          <p>{reportEnd}</p>
          <p>{unit}</p>
          {reportBullets.map(bullet => <p>{bullet.content}</p>)}
        </>
      )
    } else {
      return (
        <>
          <p>{reportId}</p>
          <p>{reportEnd}</p>
          <p>{unit}</p>
        </>
      )
    }
  }

   return (
    <div className="report" onClick={handleClick}>
      {renderReport(props.report)}
    </ div>
  );
}

export default Report;
