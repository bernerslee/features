import React from "react";
import ReadMoreReact from 'read-more-react';

const factFeatures = {
  fontSize: '15px',
  lineHeight: "1.5",
  fontWeight: "700",
  textTransform: "uppercase",
  color: "#444",
  borderTop: "1px solid #eee",
  paddingTop: "15px",
  marginBottom: "10px",
};

const interiorFeatures = {
  fontSize: '15px',
  fontWeight: "700",
  color: "#444",
  marginBottom: "5px",
};

const subFeatures = {
  fontSize: '15px',
  color: "#aaa",
  marginBottom: "10px",
  marginTop: "10px"
};

class InteriorFeatures extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      open: false
    };
  }


  render(){
  

   return (

      <div>
          <div style={factFeatures}>INTERIOR FEATURES</div>
          
     <div className="wrapper">

       <div className="bedrooms">
          <div style={interiorFeatures}>Bedrooms</div>
          <div style={subFeatures}>Beds: <span style={interiorFeatures}>{this.props.beds}</span></div>
        </div>

        <div className="bathroom">
          <div style={interiorFeatures}>Bathrooms</div>
          <div style={subFeatures}>Baths: <span style={interiorFeatures}>{this.props.baths}</span> </div>
        </div>  

     
          <div className="kitchen">
            <div style={interiorFeatures}>Kitchen</div>
            <div style={subFeatures}>KITCHEN FEATURES:</div>
            <span style={interiorFeatures}> {this.props.kitchen}</span>
          </div>
  
        <div className="interiorheat">
            <div style={interiorFeatures}>Heating and Cooling</div>
            <div style={subFeatures}>Heating: <span style={interiorFeatures}>{this.props.heating}</span></div>
            <div style={subFeatures}>Cooling: <span style={interiorFeatures}>{this.props.cooling}</span></div>
        </div>


        <div className="appliances">
          <div style={interiorFeatures}>Appliances</div>
          <div style={subFeatures}>Appliances included:</div>
          <div style={interiorFeatures}>{this.props.appliances} </div>
        </div>

      
        <div className="flooring">
          <div style={interiorFeatures}>Flooring</div>
          <div style={subFeatures}>Floor Size: <span style={interiorFeatures}>{this.props.flooring}</span> </div>
        </div>
       
      </div>
      
     </div>
     
   )
 } 
}
export default InteriorFeatures
