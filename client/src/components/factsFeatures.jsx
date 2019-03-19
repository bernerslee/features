import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const factLabel = {
  fontSize: "15px",
  lineHeight: "1.5",
  fontWeight: "700",
  color: "#444",
  marginBottom: '0',
};

const Facts_Features = (props) => {

    return (
      <div className="facts">

          <div id="type">
            <div style={factLabel}>Type</div> 
            <div className="icon"> <FontAwesomeIcon icon="home" size="2x"/> </div> 
              {props.type}
          </div>
     
          <div className ="yearbuilt">
                <div style={factLabel}>Year Built</div> 
                <div className="yearicon"> <FontAwesomeIcon icon= "calendar" size="2x"/> </div> 
                <div className="year">{props.yearBuilt}</div>
                
          </div>
    
          <div className="heating">
            <div style={factLabel}>Heating</div>
              <div className="icon"> <FontAwesomeIcon icon="thermometer-half" size="2x" />  </div> 
              {props.factsHeating}
          </div>
         
          <div className="cooling">
            <div style={factLabel}>Cooling</div> 
              <div className="icon"> <FontAwesomeIcon icon="snowflake" size="2x"/> </div>
              {props.factsCooling}
          </div>
     
          <div className="parking">
            <div style={factLabel}>Parking</div>
              <div className="icon"> <FontAwesomeIcon icon="parking" size="2x"/> </div>
                {props.parking}
          </div>
        
          <div className="lot">
            <div style={factLabel}>Lot</div>
              <div className="icon"> <FontAwesomeIcon icon="th-large" size="2x" /> </div>
              {props.lot}
          </div>

      </div>
    )
  }


export default Facts_Features