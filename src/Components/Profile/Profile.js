import './Profile.css';
import Report from '../Report/Report';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function Profile() {

  let { id } = useParams();

  const [reports, setReports] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [allUnits, setAllUnits] = useState([]);
  const [trackers, setTrackers] = useState([]);
  const [ranks, setRanks] = useState([]);
  const [unit, setUnit] = useState({name: 'not assigned'});
  const [rater, setRater] = useState('not assigned');
  const [additionalRater, setAdditionalRater] = useState('not assigned');
  const [updateActive, setUpdateActive] = useState(false);

  const getUsers = async () => {
    const response = await fetch('http://localhost:4000/profiles');
    const jsonResponse = await response.json();

    const usersRanks = jsonResponse.map(user => {
      const rank = ranks.find(rank => {
        return rank.id === user.rank_id;
      });
      user.rankSym = rank ? rank.symbol:'';
      return user;
    })

    setAllUsers(usersRanks);
  };

  const getUnits = async () => {
    const response = await fetch('http://localhost:4000/profiles/orgs');
    const jsonResponse = await response.json();

    setAllUnits(jsonResponse);
  };

  const getRanks = async () => {
    const response = await fetch('http://localhost:4000/profiles/ranks');
    const jsonResponse = await response.json();

    setRanks(jsonResponse);
  };

  const getReports = async () => {
    const response = await fetch(`http://localhost:4000/reports?user_id=${id}`)
    const jsonResponse = await response.json();

    setReports(jsonResponse);
  };

  const getTrackers = async () => {
    const response = await fetch(`http://localhost:4000/tracker/ratee/${id}`);
    const jsonResponse = await response.json();

    setTrackers(jsonResponse);
  };

  const getCurrentUser = () => {
    if(allUsers.length>0) {
      console.log(allUsers);
      const currentUser = allUsers.find(user => {
        console.log('findUser', user.id);
        console.log('user', id)
          return user.id === id;
      });
      console.log('currentUser', currentUser);
      const currentUnit = allUnits.find(unit => currentUser.org_id === unit.id);
      setUnit(currentUnit);

      const currentRater = allUsers.find(user => user.id === currentUser.rater_id);
      setRater(currentRater);

      const currentAdditionalRater = allUsers.find(user => user.id === currentUser.additional_rater_id);
      setAdditionalRater(currentAdditionalRater);
    }
  };

  useEffect(() => {
    getRanks();
    getUsers();
    getUnits();
    getReports();
    getTrackers();
    getCurrentUser();
  }, []);

  useEffect(() => {
    getCurrentUser();
  }, [allUsers])

  useEffect(() => {
    getUsers();
  }, [ranks])

  const handleUnitChange = async (e) => {
    const unitId = Number(e.target.value);
    const selectedUnit = allUnits.find(unit => {
      return unit.id === unitId
    });
    setUnit(selectedUnit);

    const response = await fetch(`http://localhost:4000/profiles/user/${id}`, {
      method: 'PUT', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({ org_id: unitId }) // body data type must match "Content-Type" header
    })
    const jsonResponse = await response.json();
    console.log('updated user: ', jsonResponse);
    getUsers();    
  }

  const handleRaterChange = (e) => {
    const selectedRater = allUsers.find(user => {
      return user.id === Number(e.target.value);
    });

    setRater(selectedRater);
  }

  const handleAdditionalRaterChange = (e) => {
    const selectedRater = allUsers.find(user => {
      return user.id === Number(e.target.value);
    });

    setAdditionalRater(selectedRater);
  }

  const renderProfileInfo = () =>{

    return (
      <ul>
        <li>unit: {unit.name}</li>
        <li>rater: {rater !== 'not assigned' ? `${rater.rankSym} ${rater.first_name} ${rater.last_name}`:'not assigned'}</li>
        <li>additional rater: {additionalRater !== 'not assigned' ? `${additionalRater.rankSym} ${additionalRater.first_name} ${additionalRater.last_name}`:'not assigned'}</li>
      </ul>
    )
  }

  const renderUnitOptions = () => {
    return allUnits.map(mapUnit => <option value={mapUnit.id}>{mapUnit.name}</option>)
  }

  const renderRaterOptions = () => {
    return allUsers.filter(filterUser => {
      if (unit !== 'not assigned') {
        return (filterUser.org_id === unit.id && filterUser.id !== id);
      } else {
        return true;
      }
    }).map(mapUser => <option value={mapUser.id}>{mapUser.last_name}, {mapUser.first_name}, {mapUser.rankSym}</option>)
  }

  const renderUpdateSelects = () => {
    if (updateActive) {
      return (
        <div className='updateInfoForm'>
              <select
                name="units"
                id="unitSelect"
                defaultValue={'default'} 
                onChange={handleUnitChange}>
                <option value='default' disabled>select unit</option>
                {renderUnitOptions()}
              </select>
              <select 
                name="raters"
                id="raterSelect"
                defaultValue={'default'}
                onChange={handleRaterChange}>
                  <option value='default' disabled>select rater</option>
                  {renderRaterOptions()}
              </select>
              <select 
                name="additionalRaters"
                id="additionalRaterSelect"
                defaultValue={'default'}
                onChange={handleAdditionalRaterChange}>
                  <option value='default' disabled>select additional rater</option>
                  {renderRaterOptions()}
              </select>
        </div>
      )
    }
  };

  const renderCurrentReports = () => {
    const activeTrackers = trackers.filter(tracker => tracker.action_id < 4);
    return (
      <div className="reports">      
        {activeTrackers.map(tracker => {
          const report = reports.find(findReport => {
            return findReport.id === tracker.report_id;
          });
          let unit = allUnits.find(unit => report.org_id === unit.id);
          return <Report report={report} unit={unit} />
        })}
      </div>
    )
  }

  const renderReports = () => {
    return (
      <div className="reports">      
        {reports.map(report => {
          let unit = allUnits.find(unit => report.org_id === unit.id);
          return <Report report={report} unit={unit} />
        })}
      </div>
    )
  }

  return (
    <>
      {renderProfileInfo()}
      <button onClick={() => setUpdateActive(!updateActive)}>
        {updateActive ? 'Close':'Update Profile'}
      </button>
      {renderUpdateSelects()}
      <h2>Current Report</h2>
      {renderCurrentReports()}
      <h2>All Reports</h2>
      {renderReports()}
    </>
  );
}

export default Profile;
