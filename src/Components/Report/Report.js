import './Report.css';
import { useState } from 'react';

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
    if (active) {
      return (
        <>
          <p>{reportStart}</p>
          <p>{reportEnd}</p>
          <p>{unit}</p>
        </>
      )
    } else {
      return (
        <>
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
